
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  subCategories?: Category[];
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  subCategoryId?: string;
  description: string;
  date: string;
}

export interface Budget {
  categoryId: string;
  limit: number;
  spent: number;
}

export interface FinancialInsight {
  summary: string;
  tips: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface RecurringPayment {
  id: string;
  name: string;
  amount: number;
  frequency: string;
  startDate: string;
  nextDate: string;
  autoAdd: boolean;
  categoryId: string;
  subCategoryId?: string; // Thêm trường danh mục con
}

// Fixed: Added Account and ActiveTab types
export interface Account {
  id: string;
  name: string;
  balance: number;
  type: string;
  color: string;
}

export type ActiveTab = 'dashboard' | 'accounts' | 'history' | 'budgets' | 'categories' | 'recurring' | 'ai' | 'settings' | 'share';
