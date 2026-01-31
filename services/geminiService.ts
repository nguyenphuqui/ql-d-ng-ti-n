
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, Budget } from "../types";

export const getFinancialAdvice = async (
  transactions: Transaction[],
  budgets: Budget[],
  categories: any[]
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const summary = transactions.map(t => {
    const cat = categories.find(c => c.id === t.categoryId);
    const subCat = cat?.subCategories?.find((s: any) => s.id === t.subCategoryId);
    return {
      amount: t.amount,
      type: t.type,
      category: cat?.name,
      subCategory: subCat?.name || 'Không có',
      description: t.description,
      date: t.date
    };
  });

  const prompt = `
    Dựa trên lịch sử giao dịch sau đây, hãy đóng vai một chuyên gia tư vấn tài chính cá nhân.
    Lịch sử giao dịch chi tiết (bao gồm cả danh mục con): ${JSON.stringify(summary.slice(0, 60))}
    Ngân sách hiện tại: ${JSON.stringify(budgets)}

    Hãy phân tích sâu vào các danh mục con (ví dụ: chi phí Cà phê trong mục Ăn uống) để đưa ra lời khuyên cực kỳ chi tiết và hữu ích bằng tiếng Việt.
    Định dạng kết quả trả về là JSON với cấu trúc:
    {
      "summary": "Nhận xét tổng quan và chi tiết về các mục chi tiêu nhỏ",
      "tips": ["Lời khuyên cụ thể cho danh mục con", "Lời khuyên tiết kiệm", "Lời khuyên đầu tư"],
      "riskLevel": "Low" | "Medium" | "High"
    }
  `;

  const maxRetries = 3;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: {
                type: Type.STRING,
                description: 'Detailed analysis including sub-category habits.',
              },
              tips: { 
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'List of specific actionable financial advice.',
              },
              riskLevel: { 
                type: Type.STRING,
                description: 'The overall risk level: Low, Medium, or High.',
              }
            },
            required: ["summary", "tips", "riskLevel"]
          }
        }
      });

      const resultText = response.text || '{}';
      return JSON.parse(resultText);
    } catch (error) {
      retryCount++;
      console.error(`Gemini Error (Attempt ${retryCount}):`, error);
      if (retryCount >= maxRetries) return null;
      const delay = Math.pow(2, retryCount) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return null;
};
