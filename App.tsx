
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  Target, 
  Sparkles, 
  Plus, 
  Trash2, 
  TrendingUp, 
  CreditCard, 
  Search, 
  Settings, 
  Menu, 
  X,
  Wallet,
  List,
  RefreshCw,
  Bell,
  UserCircle,
  ChevronRight,
  LogIn,
  ArrowLeft,
  ReceiptText,
  Plane,
  Tag,
  PawPrint,
  Monitor,
  CookingPot,
  Paintbrush,
  WashingMachine,
  Tent,
  Car,
  Book,
  Shirt,
  Footprints,
  MoreHorizontal,
  Check,
  TriangleAlert,
  Clock,
  MessageSquare,
  Building2,
  Wallet2,
  HeartPulse,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  Calendar,
  Banknote,
  ChevronUp,
  BrainCircuit,
  Lightbulb,
  Coffee,
  Pizza,
  ShoppingBasket,
  LogOut,
  Edit2,
  PlusSquare,
  QrCode,
  Share2,
  Copy
} from 'lucide-react';
import { Transaction, TransactionType, Budget, Category, FinancialInsight, RecurringPayment, Account, ActiveTab } from './types';
import { CATEGORIES as INITIAL_CATEGORIES, getCategoryIcon } from './constants';
import { getFinancialAdvice } from './services/geminiService';

// --- Helper Functions ---

const formatCurrencyParts = (value: number) => {
  return {
    amount: new Intl.NumberFormat('vi-VN').format(value)
  };
};

// --- Sub-Components ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-[32px] shadow-sm border border-amber-50 overflow-hidden ${className}`}>
    {children}
  </div>
);

const ProgressBar: React.FC<{ progress: number; color: string }> = ({ progress, color }) => (
  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
    <div 
      className="h-full transition-all duration-700 ease-out" 
      style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: color }}
    />
  </div>
);

// --- Auth Screen Component ---
const AuthScreen: React.FC<{ onLogin: (user: any) => void }> = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin({ 
        name: email.split('@')[0] || 'Thành viên FinFlow', 
        email: email,
        avatar: null 
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (platform: string) => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin({ 
        name: `${platform} User`, 
        email: `${platform.toLowerCase()}@example.com`,
        avatar: null 
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[300] bg-[#fffbeb] flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md py-8">
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="w-20 h-20 bg-[#f59e0b] rounded-[28px] flex items-center justify-center text-white mx-auto mb-6 shadow-2xl shadow-amber-900/20 rotate-3">
            <TrendingUp size={40} strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-black text-amber-900 tracking-tight">FinFlow</h1>
          <p className="text-amber-700/60 mt-2 font-bold uppercase tracking-widest text-[10px]">Quản lý tài chính thông minh</p>
        </div>

        <div className="bg-white/70 backdrop-blur-2xl rounded-[40px] p-8 shadow-2xl border border-white animate-in zoom-in duration-500">
          <div className="space-y-4 mb-8">
            <button 
              onClick={() => handleSocialLogin('Google')}
              className="w-full flex items-center justify-center gap-4 py-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 shadow-sm active:scale-95"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Tiếp tục với Google
            </button>
            <button 
              onClick={() => handleSocialLogin('Facebook')}
              className="w-full flex items-center justify-center gap-4 py-4 bg-[#1877F2] text-white rounded-2xl hover:bg-[#166fe5] transition-all font-bold shadow-lg shadow-blue-500/20 active:scale-95"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Đăng nhập bằng Facebook
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-slate-400">
              <span className="bg-white px-4">Hoặc sử dụng Email</span>
            </div>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-5">
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="Email"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-4 ring-amber-100 transition-all font-bold text-slate-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="Mật khẩu"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-12 py-4 outline-none focus:ring-4 ring-amber-100 transition-all font-bold text-slate-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-amber-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white py-5 rounded-[24px] font-black shadow-xl shadow-amber-500/20 transition-all active:scale-95 text-lg flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isLoading ? (
                <RefreshCw className="animate-spin" size={20} />
              ) : (
                <>
                  {isLoginMode ? 'ĐĂNG NHẬP' : 'TẠO TÀI KHOẢN'}
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm font-bold text-slate-400 mt-8">
            {isLoginMode ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            <button 
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="ml-2 text-amber-600 font-black hover:underline underline-offset-4"
            >
              {isLoginMode ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 'acc-1', name: 'Tiền mặt', balance: 5000000, type: 'Cash', color: '#f59e0b' },
    { id: 'acc-2', name: 'Vietcombank', balance: 25000000, type: 'Bank', color: '#059669' },
  ]);
  
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedSettingCatId, setSelectedSettingCatId] = useState<string | null>(null);
  const [newSubCatName, setNewSubCatName] = useState('');

  const [expandedBudget, setExpandedBudget] = useState<string | null>(null);
  const [isCreatingReminder, setIsCreatingReminder] = useState(false);
  
  const [recurringPayments, setRecurringPayments] = useState<RecurringPayment[]>([
    { id: 'rec-1', name: 'Netflix', amount: 260000, frequency: 'Hàng tháng', startDate: '2025-01-15', nextDate: '2025-02-15', autoAdd: true, categoryId: 'cat-8', subCategoryId: '' },
    { id: 'rec-2', name: 'Tiền mạng Internet', amount: 350000, frequency: 'Hàng tháng', startDate: '2025-01-20', nextDate: '2025-02-20', autoAdd: false, categoryId: 'cat-5', subCategoryId: 'sub-5-3' },
  ]);

  const [aiInsight, setAiInsight] = useState<FinancialInsight | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const [formData, setFormData] = useState({
    amount: '',
    type: TransactionType.EXPENSE,
    categoryId: INITIAL_CATEGORIES[0].id,
    subCategoryId: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    accountId: accounts[0].id
  });

  const selectedCategory = useMemo(() => categories.find(c => c.id === formData.categoryId), [categories, formData.categoryId]);

  const [reminderForm, setReminderForm] = useState({
    name: '',
    amount: '',
    frequency: 'Hàng tháng',
    autoAdd: false,
    categoryId: 'cat-1',
    subCategoryId: ''
  });

  useEffect(() => {
    const savedTx = localStorage.getItem('finflow_transactions');
    const savedBudgets = localStorage.getItem('finflow_budgets');
    const savedAuth = localStorage.getItem('finflow_auth');
    const savedCats = localStorage.getItem('finflow_categories');
    
    if (savedTx) setTransactions(JSON.parse(savedTx));
    if (savedCats) setCategories(JSON.parse(savedCats));
    
    if (savedBudgets) setBudgets(JSON.parse(savedBudgets));
    else setBudgets(INITIAL_CATEGORIES.map(c => ({ categoryId: c.id, limit: 3000000, spent: 0 })));
    
    if (savedAuth) {
      setCurrentUser(JSON.parse(savedAuth));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('finflow_transactions', JSON.stringify(transactions));
    localStorage.setItem('finflow_budgets', JSON.stringify(budgets));
    localStorage.setItem('finflow_categories', JSON.stringify(categories));
    if (currentUser) localStorage.setItem('finflow_auth', JSON.stringify(currentUser));
  }, [transactions, budgets, currentUser, categories]);

  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === TransactionType.INCOME).reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === TransactionType.EXPENSE).reduce((sum, t) => sum + t.amount, 0);
    const baseBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    return { income, expense, balance: baseBalance + income - expense };
  }, [transactions, accounts]);

  const activeBudgets = useMemo(() => {
    return budgets.map(b => {
      const spent = transactions
        .filter(t => t.categoryId === b.categoryId && t.type === TransactionType.EXPENSE)
        .reduce((sum, t) => sum + t.amount, 0);
      return { ...b, spent };
    });
  }, [transactions, budgets]);

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount) return;
    const amountVal = parseFloat(formData.amount);
    const newTx: Transaction = {
      id: crypto.randomUUID(),
      amount: amountVal,
      type: formData.type,
      categoryId: formData.categoryId,
      subCategoryId: formData.subCategoryId,
      description: formData.description || categories.find(c => c.id === formData.categoryId)?.name || 'Giao dịch mới',
      date: formData.date
    };
    setTransactions([newTx, ...transactions]);
    setAccounts(accounts.map(acc => {
      if (acc.id === formData.accountId) {
        return { ...acc, balance: formData.type === TransactionType.INCOME ? acc.balance + amountVal : acc.balance - amountVal };
      }
      return acc;
    }));
    setShowAddModal(false);
    setFormData({ ...formData, amount: '', description: '', date: new Date().toISOString().split('T')[0], subCategoryId: '' });
  };

  const handleSaveReminder = () => {
    if (!reminderForm.name || !reminderForm.amount) return;
    const newRec: RecurringPayment = {
      id: crypto.randomUUID(),
      name: reminderForm.name,
      amount: parseFloat(reminderForm.amount),
      frequency: reminderForm.frequency,
      startDate: new Date().toISOString().split('T')[0],
      nextDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      autoAdd: reminderForm.autoAdd,
      categoryId: reminderForm.categoryId,
      subCategoryId: reminderForm.subCategoryId
    };
    setRecurringPayments([...recurringPayments, newRec]);
    setIsCreatingReminder(false);
  };

  const generateAiInsight = async () => {
    setIsAiLoading(true);
    const insight = await getFinancialAdvice(transactions, budgets, categories);
    setAiInsight(insight);
    setIsAiLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('finflow_auth');
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleAddSubCategory = (catId: string) => {
    if (!newSubCatName.trim()) return;
    const updatedCats = categories.map(cat => {
      if (cat.id === catId) {
        const newSub = {
          id: `sub-${catId}-${Date.now()}`,
          name: newSubCatName,
          icon: cat.icon,
          color: cat.color
        };
        return { ...cat, subCategories: [...(cat.subCategories || []), newSub] };
      }
      return cat;
    });
    setCategories(updatedCats);
    setNewSubCatName('');
  };

  const handleDeleteSubCategory = (catId: string, subId: string) => {
    const updatedCats = categories.map(cat => {
      if (cat.id === catId) {
        return { ...cat, subCategories: (cat.subCategories || []).filter(s => s.id !== subId) };
      }
      return cat;
    });
    setCategories(updatedCats);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopyFeedback(true);
    setTimeout(() => setShowCopyFeedback(false), 2000);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Trang chủ', icon: <LayoutDashboard size={20} /> },
    { id: 'accounts', label: 'Tài khoản', icon: <Wallet size={20} /> },
    { id: 'history', label: 'Giao dịch', icon: <History size={20} /> },
    { id: 'budgets', label: 'Ngân sách', icon: <Target size={20} /> },
    { id: 'categories', label: 'Danh mục', icon: <List size={20} /> },
    { id: 'recurring', label: 'Thanh toán định kỳ', icon: <RefreshCw size={20} /> },
    { id: 'ai', label: 'Trợ lý AI Gemini', icon: <Sparkles size={20} /> },
    { id: 'share', label: 'Mã QR truy cập', icon: <QrCode size={20} /> },
    { id: 'settings', label: 'Cài đặt', icon: <Settings size={20} /> },
  ];

  const headerColor = activeTab === 'settings' || activeTab === 'share' ? 'bg-[#334155]' : (activeTab === 'ai' ? 'bg-[#334155]' : 'bg-[#f59e0b]');

  if (!isLoggedIn) return <AuthScreen onLogin={(user) => { setCurrentUser(user); setIsLoggedIn(true); }} />;

  const reminderCategory = categories.find(c => c.id === reminderForm.categoryId);

  return (
    <div className="min-h-screen flex bg-white font-sans relative overflow-hidden">
      {isSidebarOpen && <div className="fixed inset-0 bg-amber-950/40 z-[150] lg:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />}

      <aside className={`fixed lg:static inset-y-0 left-0 w-72 bg-[#f59e0b] text-white z-[160] transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out shadow-2xl flex flex-col`}>
        <div className="p-6 border-b border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner">
            {currentUser?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 overflow-hidden">
            <h2 className="font-bold truncate">{currentUser?.name || 'User'}</h2>
            <p className="text-[10px] text-amber-100 uppercase font-black tracking-widest">Premium Member</p>
          </div>
        </div>
        <nav className="p-2 space-y-1 flex-1">
          {menuItems.map(item => (
            <button 
              key={item.id} 
              onClick={() => { setActiveTab(item.id as ActiveTab); setIsSidebarOpen(false); setEditingCategory(null); setIsCreatingReminder(false); setSelectedSettingCatId(null); }} 
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${activeTab === item.id ? 'bg-white/25 font-bold shadow-inner scale-105' : 'text-white/80 hover:bg-white/10'}`}
            >
              {item.icon} <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-rose-100 hover:bg-rose-500/20 transition-all font-bold text-sm"
          >
            <LogOut size={20} /> Đăng xuất
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen relative overflow-hidden bg-slate-50/30">
        <header className={`${headerColor} text-white pt-6 pb-12 rounded-b-[45px] relative z-10 transition-all shadow-lg`}>
          <div className="flex items-center justify-between px-6">
            {(activeTab === 'settings' && selectedSettingCatId) ? (
              <button onClick={() => setSelectedSettingCatId(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors"><ArrowLeft size={28} /></button>
            ) : (
              <button onClick={() => setIsSidebarOpen(true)} className="p-1 hover:bg-white/10 rounded-full transition-colors"><Menu size={28} /></button>
            )}
            <h1 className="text-2xl font-black tracking-tight drop-shadow-sm">
              {activeTab === 'settings' ? (selectedSettingCatId ? 'Quản lý danh mục con' : 'Cài đặt hệ thống') : 
               activeTab === 'ai' ? 'Trợ lý AI Gemini' :
               activeTab === 'history' ? 'Lịch sử giao dịch' :
               activeTab === 'budgets' ? 'Quản lý ngân sách' :
               activeTab === 'accounts' ? 'Tài khoản & Ví' :
               activeTab === 'share' ? 'Mã QR truy cập' :
               activeTab === 'categories' ? 'Tất cả danh mục' :
               'Trang chủ'}
            </h1>
            <div className="w-10" />
          </div>
        </header>

        <div className={`flex-1 ${activeTab === 'dashboard' ? '-mt-10' : 'mt-4'} px-4 pb-24 overflow-y-auto relative z-20`}>
          
          {activeTab === 'dashboard' && (
            <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-500">
               <Card className="p-8 border-none shadow-2xl relative bg-white/80 backdrop-blur-md">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-xs font-black text-amber-500 uppercase tracking-widest mb-1">Số dư hiện tại</p>
                      <h2 className="text-4xl font-black text-slate-800 tracking-tight">{formatCurrencyParts(stats.balance).amount}đ</h2>
                    </div>
                    <div className="p-3 bg-amber-100 rounded-2xl text-amber-600"><TrendingUp size={24} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-50 p-4 rounded-3xl border border-emerald-100">
                       <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Thu nhập</p>
                       <p className="text-lg font-black text-emerald-700">+{formatCurrencyParts(stats.income).amount}đ</p>
                    </div>
                    <div className="bg-rose-50 p-4 rounded-3xl border border-rose-100">
                       <p className="text-[10px] font-black text-rose-600 uppercase mb-1">Chi tiêu</p>
                       <p className="text-lg font-black text-rose-700">-{formatCurrencyParts(stats.expense).amount}đ</p>
                    </div>
                  </div>
               </Card>
               
               <div className="space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Giao dịch gần đây</h3>
                    <button onClick={() => setActiveTab('history')} className="text-amber-600 text-xs font-black uppercase hover:underline">Xem thêm</button>
                  </div>
                  {transactions.slice(0, 5).map(t => {
                    const cat = categories.find(c => c.id === t.categoryId);
                    const subCat = cat?.subCategories?.find(s => s.id === t.subCategoryId);
                    return (
                      <div key={t.id} className="flex items-center justify-between p-5 bg-white rounded-[28px] border border-amber-50 shadow-sm hover:translate-x-1 transition-transform">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-inner" style={{ backgroundColor: cat?.color }}>
                            {getCategoryIcon(cat?.icon || '')}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 leading-tight">{t.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                               <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest">{cat?.name}</span>
                               {subCat && (
                                 <span className="text-[10px] font-bold text-teal-600 px-2 py-0.5 bg-teal-50 rounded-md">{subCat.name}</span>
                               )}
                            </div>
                          </div>
                        </div>
                        <p className={`font-black text-lg ${t.type === TransactionType.INCOME ? 'text-emerald-600' : 'text-slate-800'}`}>
                          {t.type === TransactionType.INCOME ? '+' : '-'}{formatCurrencyParts(t.amount).amount}đ
                        </p>
                      </div>
                    );
                  })}
               </div>
               <button onClick={() => setShowAddModal(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-[#fcc633] rounded-full shadow-2xl flex items-center justify-center text-slate-800 border-4 border-white active:scale-90 transition-transform z-50"><Plus size={36} strokeWidth={3} /></button>
            </div>
          )}

          {activeTab === 'share' && (
            <div className="max-w-xl mx-auto space-y-8 pt-4 animate-in zoom-in duration-500">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-[28px] flex items-center justify-center mx-auto shadow-inner">
                  <Share2 size={40} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800">Chia sẻ FinFlow</h2>
                  <p className="text-sm font-bold text-slate-400">Cho phép bạn bè hoặc chính bạn truy cập nhanh ứng dụng</p>
                </div>
              </div>

              <Card className="p-8 flex flex-col items-center gap-8 border-none shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-amber-400"></div>
                
                <div className="bg-white p-4 rounded-[32px] shadow-xl border border-amber-50">
                   <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(window.location.href)}&bgcolor=ffffff&color=d97706`} 
                    alt="Mã QR Truy Cập" 
                    className="w-56 h-56"
                   />
                </div>

                <div className="w-full space-y-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-4">
                    <p className="text-xs font-bold text-slate-400 truncate flex-1">{window.location.href}</p>
                    <button 
                      onClick={handleCopyLink}
                      className="p-3 bg-white text-amber-600 rounded-xl shadow-sm border border-amber-50 active:scale-90 transition-transform relative"
                    >
                      {showCopyFeedback ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                      {showCopyFeedback && (
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-lg font-black whitespace-nowrap">Đã sao chép!</span>
                      )}
                    </button>
                  </div>

                  <p className="text-[10px] text-center font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                    Quét mã QR bằng Camera điện thoại hoặc Zalo<br/>để đăng nhập nhanh vào tài khoản của bạn.
                  </p>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-emerald-50 rounded-[32px] border border-emerald-100 flex flex-col items-center gap-2">
                   <div className="p-3 bg-white rounded-2xl text-emerald-500 shadow-sm"><Zap size={24} /></div>
                   <p className="text-[10px] font-black text-emerald-700 uppercase">Truy cập nhanh</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-[32px] border border-blue-100 flex flex-col items-center gap-2">
                   <div className="p-3 bg-white rounded-2xl text-blue-500 shadow-sm"><Lock size={24} /></div>
                   <p className="text-[10px] font-black text-blue-700 uppercase">Bảo mật cao</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
             <div className="max-w-xl mx-auto space-y-4 pt-4 animate-in fade-in">
                <div className="relative">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                   <input type="text" placeholder="Tìm kiếm giao dịch..." className="w-full bg-white border border-slate-100 pl-12 pr-4 py-4 rounded-2xl font-medium outline-none shadow-sm focus:ring-2 ring-amber-100" />
                </div>
                {transactions.map(t => {
                   const cat = categories.find(c => c.id === t.categoryId);
                   const subCat = cat?.subCategories?.find(s => s.id === t.subCategoryId);
                   return (
                    <div key={t.id} className="flex items-center justify-between p-5 bg-white rounded-[28px] border border-amber-50 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-inner" style={{ backgroundColor: cat?.color }}>
                          {getCategoryIcon(cat?.icon || '')}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 leading-tight">{t.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest">{cat?.name}</span>
                             {subCat && <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 rounded-md">{subCat.name}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-black text-lg ${t.type === TransactionType.INCOME ? 'text-emerald-600' : 'text-slate-800'}`}>
                          {formatCurrencyParts(t.amount).amount}đ
                        </p>
                        <p className="text-[10px] font-medium text-slate-400">{new Date(t.date).toLocaleDateString('vi-VN')}</p>
                      </div>
                    </div>
                   );
                })}
             </div>
          )}

          {activeTab === 'budgets' && (
            <div className="max-w-xl mx-auto space-y-6 pt-4 animate-in fade-in">
              <div className="bg-teal-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
                 <div className="relative z-10">
                    <p className="text-teal-200 font-bold uppercase tracking-widest text-[10px] mb-2">Hạn mức ngân sách</p>
                    <h2 className="text-3xl font-black">
                      {formatCurrencyParts(activeBudgets.reduce((sum, b) => sum + b.limit, 0)).amount}đ
                    </h2>
                    <div className="mt-6 space-y-2">
                       <div className="flex justify-between text-xs font-bold">
                          <span>Đã dùng: {formatCurrencyParts(activeBudgets.reduce((sum, b) => sum + b.spent, 0)).amount}đ</span>
                          <span>{Math.round((activeBudgets.reduce((sum, b) => sum + b.spent, 0) / activeBudgets.reduce((sum, b) => sum + b.limit, 0)) * 100)}%</span>
                       </div>
                       <ProgressBar 
                        progress={(activeBudgets.reduce((sum, b) => sum + b.spent, 0) / activeBudgets.reduce((sum, b) => sum + b.limit, 0)) * 100} 
                        color="#4ade80" 
                       />
                    </div>
                 </div>
                 <Target className="absolute -right-4 -bottom-4 text-white/5" size={160} />
              </div>

              <div className="space-y-4">
                 {activeBudgets.map(budget => {
                   const cat = categories.find(c => c.id === budget.categoryId);
                   const isExpanded = expandedBudget === budget.categoryId;
                   const progress = (budget.spent / budget.limit) * 100;
                   const subCatSpending = cat?.subCategories?.map(sc => ({
                      ...sc,
                      spent: transactions
                        .filter(t => t.subCategoryId === sc.id && t.type === TransactionType.EXPENSE)
                        .reduce((sum, t) => sum + t.amount, 0)
                   })).filter(sc => sc.spent > 0) || [];

                   return (
                     <div key={budget.categoryId} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setExpandedBudget(isExpanded ? null : budget.categoryId)}>
                           <div className="flex items-center gap-4 flex-1">
                              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: cat?.color }}>
                                 {getCategoryIcon(cat?.icon || '')}
                              </div>
                              <div className="flex-1 pr-4">
                                 <div className="flex justify-between items-end mb-1">
                                    <span className="font-bold text-slate-800">{cat?.name}</span>
                                    <span className="text-[10px] font-black text-slate-400">{formatCurrencyParts(budget.spent).amount} / {formatCurrencyParts(budget.limit).amount}</span>
                                 </div>
                                 <ProgressBar progress={progress} color={progress > 90 ? '#ef4444' : cat?.color || '#ccc'} />
                              </div>
                           </div>
                           <ChevronDown size={20} className={`text-slate-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                        {isExpanded && (
                          <div className="px-5 pb-5 pt-2 space-y-3 bg-slate-50 animate-in slide-in-from-top-2">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chi tiêu theo danh mục con</p>
                             {subCatSpending.length > 0 ? subCatSpending.map(sc => (
                               <div key={sc.id} className="flex justify-between text-xs font-bold border-b border-slate-100 pb-1">
                                  <span className="text-slate-600">{sc.name}</span>
                                  <span className="text-slate-800">{formatCurrencyParts(sc.spent).amount}đ</span>
                               </div>
                             )) : (
                               <p className="text-[10px] italic text-slate-400">Không có chi tiêu cụ thể</p>
                             )}
                             <button className="w-full py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 uppercase mt-2 shadow-sm">Điều chỉnh hạn mức</button>
                          </div>
                        )}
                     </div>
                   );
                 })}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-xl mx-auto space-y-6 pt-4 animate-in slide-in-from-right duration-300">
               {!selectedSettingCatId ? (
                 <>
                   <div className="bg-slate-800 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden mb-8">
                      <div className="relative z-10">
                        <h2 className="text-2xl font-black mb-2">Tùy chỉnh hệ thống</h2>
                        <p className="text-slate-400 text-sm font-medium">Quản lý các danh mục chi tiêu và cài đặt tài khoản của bạn.</p>
                      </div>
                      <Settings className="absolute -right-8 -bottom-8 text-white/5" size={180} />
                   </div>

                   <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2 mb-4">Quản lý danh mục con</h3>
                   <div className="grid grid-cols-1 gap-3">
                      {categories.map(cat => (
                        <button 
                          key={cat.id}
                          onClick={() => setSelectedSettingCatId(cat.id)}
                          className="flex items-center justify-between p-5 bg-white rounded-[28px] border border-slate-100 hover:shadow-md transition-all active:scale-98"
                        >
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-inner" style={{ backgroundColor: cat.color }}>
                                 {getCategoryIcon(cat.icon)}
                              </div>
                              <div className="text-left">
                                 <p className="font-bold text-slate-800 leading-tight">{cat.name}</p>
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cat.subCategories?.length || 0} danh mục con</p>
                              </div>
                           </div>
                           <ChevronRight className="text-slate-300" size={20} />
                        </button>
                      ))}
                   </div>
                 </>
               ) : (
                 <div className="space-y-6">
                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                       <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: categories.find(c => c.id === selectedSettingCatId)?.color }}>
                             {getCategoryIcon(categories.find(c => c.id === selectedSettingCatId)?.icon || '')}
                          </div>
                          <div>
                             <h3 className="text-xl font-black text-slate-800">{categories.find(c => c.id === selectedSettingCatId)?.name}</h3>
                             <p className="text-xs font-bold text-slate-400">Danh sách các danh mục con</p>
                          </div>
                       </div>
                    </div>

                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                       <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Thêm danh mục con mới</p>
                       <div className="flex gap-2">
                          <input 
                             type="text" 
                             placeholder="Nhập tên..."
                             className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 font-bold text-slate-700 outline-none focus:ring-2 ring-amber-100"
                             value={newSubCatName}
                             onChange={e => setNewSubCatName(e.target.value)}
                             onKeyPress={e => e.key === 'Enter' && handleAddSubCategory(selectedSettingCatId)}
                          />
                          <button 
                             onClick={() => handleAddSubCategory(selectedSettingCatId)}
                             className="bg-amber-400 text-white p-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
                          >
                             <Plus size={24} strokeWidth={3} />
                          </button>
                       </div>
                    </div>

                    <div className="space-y-3">
                       <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Các danh mục hiện có</p>
                       {categories.find(c => c.id === selectedSettingCatId)?.subCategories?.map(sub => (
                         <div key={sub.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 animate-in slide-in-from-left">
                            <span className="font-bold text-slate-700 ml-2">{sub.name}</span>
                            <button 
                               onClick={() => handleDeleteSubCategory(selectedSettingCatId, sub.id)}
                               className="p-2 text-rose-400 hover:bg-rose-50 rounded-xl transition-colors"
                            >
                               <Trash2 size={18} />
                            </button>
                         </div>
                       ))}
                       {(!categories.find(c => c.id === selectedSettingCatId)?.subCategories || categories.find(c => c.id === selectedSettingCatId)!.subCategories!.length === 0) && (
                         <div className="text-center py-10 opacity-30">
                            <PlusSquare className="mx-auto mb-2" size={32} />
                            <p className="text-sm font-bold">Chưa có danh mục con nào</p>
                         </div>
                       )}
                    </div>
                 </div>
               )}
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="max-w-xl mx-auto pt-8 grid grid-cols-3 gap-y-12 gap-x-4 animate-in fade-in">
              {categories.map((cat, idx) => (
                <div key={idx} onClick={() => { setActiveTab('settings'); setSelectedSettingCatId(cat.id); }} className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:shadow-amber-200 transition-all duration-300 shadow-inner" style={{ backgroundColor: cat.color }}>{getCategoryIcon(cat.icon)}</div>
                  <span className="text-xs font-black text-amber-900/60 uppercase tracking-tight text-center group-hover:text-amber-600 transition-colors">{cat.name}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="max-w-xl mx-auto space-y-6 pt-4 animate-in fade-in duration-500">
              <div className="bg-slate-800 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                 <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 bg-amber-400 rounded-2xl flex items-center justify-center text-slate-900 shadow-lg rotate-3"><BrainCircuit size={32} /></div>
                       <div>
                          <h2 className="text-xl font-black">Phân tích chuyên sâu</h2>
                          <p className="text-slate-400 text-sm">Gemini AI 3.0 Pro</p>
                       </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed font-medium">Tư vấn tài chính thông minh dựa trên hành vi chi tiêu thực tế từ các danh mục nhỏ nhất.</p>
                    <button 
                      onClick={generateAiInsight}
                      disabled={isAiLoading}
                      className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-lg shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 transition-all"
                    >
                      {isAiLoading ? <RefreshCw className="animate-spin" /> : <Sparkles className="text-amber-500" />}
                      {isAiLoading ? 'ĐANG PHÂN TÍCH...' : 'BẮT ĐẦU PHÂN TÍCH'}
                    </button>
                 </div>
                 <Sparkles className="absolute -right-10 -top-10 text-white/5" size={200} />
              </div>

              {aiInsight && (
                <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-700">
                   <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><MessageSquare size={16} /> NHẬN XÉT CỦA GEMINI</h3>
                      <p className="text-slate-700 font-bold leading-relaxed">{aiInsight.summary}</p>
                   </div>
                   <div className="grid grid-cols-1 gap-4">
                      {aiInsight.tips.map((tip, i) => (
                        <div key={i} className="bg-amber-50 p-6 rounded-[32px] border border-amber-100 flex gap-4">
                           <div className="w-10 h-10 bg-amber-400 rounded-xl shrink-0 flex items-center justify-center text-white"><Lightbulb size={20} /></div>
                           <p className="text-amber-900 font-bold text-sm leading-relaxed">{tip}</p>
                        </div>
                      ))}
                   </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'recurring' && !isCreatingReminder && (
            <div className="max-w-xl mx-auto space-y-6 pt-4 animate-in fade-in">
               <div className="bg-orange-50 rounded-[32px] p-6 border border-orange-100 flex gap-4">
                  <TriangleAlert className="text-orange-500 shrink-0" size={24} />
                  <p className="text-orange-900 font-bold text-sm">Các khoản thanh toán sẽ được tự động cập nhật khi đến ngày.</p>
               </div>
               <div className="space-y-4">
                 {recurringPayments.map(p => {
                    const cat = categories.find(c => c.id === p.categoryId);
                    const subCat = cat?.subCategories?.find(s => s.id === p.subCategoryId);
                    return (
                      <Card key={p.id} className="p-5 flex items-center justify-between border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-inner" style={{ backgroundColor: cat?.color }}>
                            {getCategoryIcon(cat?.icon || 'Tag')}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{p.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.frequency}</span>
                              {subCat && <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 rounded-md">{subCat.name}</span>}
                            </div>
                          </div>
                        </div>
                        <p className="font-black text-slate-800 text-lg">{formatCurrencyParts(p.amount).amount}đ</p>
                      </Card>
                    );
                 })}
               </div>
               <button onClick={() => setIsCreatingReminder(true)} className="w-full py-5 bg-[#4c8c74] text-white rounded-[32px] font-black text-xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-transform">
                 <Plus size={28} strokeWidth={3} /> TẠO THANH TOÁN MỚI
               </button>
            </div>
          )}

          {isCreatingReminder && (
            <div className="max-w-xl mx-auto space-y-8 pt-4 pb-20 animate-in slide-in-from-right">
               <div className="space-y-4 px-2">
                  <div className="border-b-2 border-slate-100 pb-2 focus-within:border-amber-400 transition-all">
                     <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Tên thanh toán</p>
                     <input type="text" className="w-full bg-transparent outline-none font-black text-slate-800 text-2xl placeholder-slate-200" placeholder="VD: Tiền phòng, Netflix..." value={reminderForm.name} onChange={e => setReminderForm({...reminderForm, name: e.target.value})} />
                  </div>
                  <div className="border-b-2 border-slate-100 pb-2 focus-within:border-emerald-400 transition-all">
                     <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Số tiền mỗi kỳ</p>
                     <input type="number" className="w-full bg-transparent outline-none font-black text-[#4c8c74] text-4xl" placeholder="0" value={reminderForm.amount} onChange={e => setReminderForm({...reminderForm, amount: e.target.value})} />
                  </div>
               </div>
               <div className="space-y-4 px-2">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Danh mục chính</p>
                  <div className="grid grid-cols-4 gap-4">
                     {categories.map(cat => (
                       <button key={cat.id} onClick={() => setReminderForm({...reminderForm, categoryId: cat.id, subCategoryId: ''})} className={`flex flex-col items-center gap-2 group p-2 rounded-2xl transition-all ${reminderForm.categoryId === cat.id ? 'bg-amber-50 ring-2 ring-amber-400' : ''}`}>
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm`} style={{ backgroundColor: cat.color }}>{getCategoryIcon(cat.icon)}</div>
                         <span className={`text-[9px] font-black uppercase text-center ${reminderForm.categoryId === cat.id ? 'text-amber-600' : 'text-slate-400'}`}>{cat.name}</span>
                       </button>
                     ))}
                  </div>
               </div>
               {reminderCategory?.subCategories && reminderCategory.subCategories.length > 0 && (
                 <div className="space-y-4 animate-in fade-in px-2">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Danh mục con</p>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                       {reminderCategory.subCategories.map(sub => (
                         <button key={sub.id} onClick={() => setReminderForm({...reminderForm, subCategoryId: sub.id})} className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${reminderForm.subCategoryId === sub.id ? 'bg-[#4c8c74] text-white' : 'bg-slate-100 text-slate-500'}`}>{sub.name}</button>
                       ))}
                    </div>
                 </div>
               )}
               <button onClick={handleSaveReminder} className="w-full bg-[#fcc633] text-slate-800 py-5 rounded-[32px] font-black text-xl shadow-2xl active:scale-95 transition-transform">LƯU NHẮC NHỞ</button>
            </div>
          )}

          {activeTab === 'accounts' && (
            <div className="max-w-xl mx-auto pt-4 space-y-6 animate-in fade-in duration-500">
               <div className="text-center p-10 bg-gradient-to-br from-amber-50 to-orange-50 rounded-[40px] border border-amber-100 shadow-inner">
                  <p className="text-amber-600 font-black uppercase tracking-widest text-[10px] mb-2">Tài sản hiện có</p>
                  <h2 className="text-5xl font-black text-slate-800 tracking-tight">{formatCurrencyParts(stats.balance).amount}đ</h2>
               </div>
               <div className="space-y-4">
                  {accounts.map(acc => (
                    <Card key={acc.id} className="p-6 flex items-center justify-between border-slate-100 hover:shadow-lg transition-shadow">
                       <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-inner" style={{ backgroundColor: acc.color }}>
                             {acc.type === 'Bank' ? <Building2 size={28} /> : <Wallet2 size={28} />}
                          </div>
                          <div><p className="font-black text-slate-800 text-lg leading-tight">{acc.name}</p></div>
                       </div>
                       <p className={`text-xl font-black ${acc.balance < 0 ? 'text-rose-500' : 'text-slate-800'}`}>{formatCurrencyParts(acc.balance).amount}đ</p>
                    </Card>
                  ))}
               </div>
            </div>
          )}

        </div>
      </main>

      {/* --- ADD MODAL --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-[400] flex flex-col bg-white animate-in slide-in-from-bottom duration-500">
          <header className={`pt-8 pb-6 px-6 ${formData.type === TransactionType.INCOME ? 'bg-emerald-500' : 'bg-rose-500'} text-white flex items-center justify-between transition-colors`}>
             <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-white/10 rounded-full"><X size={28} /></button>
             <div className="flex bg-white/20 p-1 rounded-2xl">
                <button onClick={() => setFormData({...formData, type: TransactionType.EXPENSE})} className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${formData.type === TransactionType.EXPENSE ? 'bg-white text-rose-500 shadow-lg' : 'text-white'}`}>Chi phí</button>
                <button onClick={() => setFormData({...formData, type: TransactionType.INCOME})} className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${formData.type === TransactionType.INCOME ? 'bg-white text-emerald-500 shadow-lg' : 'text-white'}`}>Thu nhập</button>
             </div>
             <div className="w-10" />
          </header>

          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10 max-w-xl mx-auto w-full">
             <div className="text-center space-y-2">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Nhập số tiền</p>
                <div className="flex items-center justify-center gap-2">
                   <span className="text-3xl font-black text-slate-300">đ</span>
                   <input type="number" placeholder="0" autoFocus className="w-full text-7xl font-black text-center border-none outline-none text-slate-800 placeholder-slate-100 bg-transparent" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                </div>
             </div>

             <div className="space-y-4 px-2">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Danh mục chính</p>
                <div className="grid grid-cols-4 gap-4">
                   {categories.map(cat => (
                     <button key={cat.id} onClick={() => setFormData({...formData, categoryId: cat.id, subCategoryId: ''})} className="flex flex-col items-center gap-2 group">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${formData.categoryId === cat.id ? 'ring-4 ring-amber-400 shadow-lg scale-110 text-white shadow-inner' : 'bg-slate-50 text-slate-400'} shadow-sm`} style={{ backgroundColor: formData.categoryId === cat.id ? cat.color : undefined }}>{getCategoryIcon(cat.icon)}</div>
                       <span className={`text-[10px] font-black uppercase tracking-tighter text-center leading-tight ${formData.categoryId === cat.id ? 'text-amber-600' : 'text-slate-400'}`}>{cat.name}</span>
                     </button>
                   ))}
                </div>
             </div>

             {selectedCategory?.subCategories && selectedCategory.subCategories.length > 0 && (
               <div className="space-y-3 animate-in fade-in slide-in-from-top-2 px-2">
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Danh mục con</p>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {selectedCategory.subCategories.map(sub => (
                      <button key={sub.id} onClick={() => setFormData({...formData, subCategoryId: sub.id})} className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all border ${formData.subCategoryId === sub.id ? 'bg-amber-400 text-white border-amber-400 shadow-md' : 'bg-white text-slate-500 border-slate-100'}`}>{sub.name}</button>
                    ))}
                  </div>
               </div>
             )}

             <div className="grid grid-cols-2 gap-4 px-2 pb-10">
                <div className="space-y-2">
                   <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Ghi chú</p>
                   <input type="text" placeholder="Nhập ghi chú..." className="w-full bg-slate-50 p-4 rounded-2xl outline-none font-bold text-slate-700 focus:ring-4 ring-slate-100 border border-transparent focus:border-slate-100" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="space-y-2">
                   <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Ngày giao dịch</p>
                   <input type="date" className="w-full bg-slate-50 p-4 rounded-2xl outline-none font-bold text-slate-700" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
             </div>

             <div className="px-2 pb-20">
               <button onClick={handleAddTransaction} className={`w-full py-6 rounded-[28px] font-black text-xl text-white shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${formData.type === TransactionType.INCOME ? 'bg-emerald-500' : 'bg-rose-500'}`}>LƯU GIAO DỊCH <ChevronRight size={24} /></button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
