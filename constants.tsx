
import React from 'react';
import { 
  ShoppingBag, 
  Utensils, 
  Car, 
  Home, 
  Zap, 
  HeartPulse, 
  GraduationCap, 
  Gamepad2, 
  Wallet, 
  TrendingUp,
  ReceiptText,
  Plane,
  Tag,
  PawPrint,
  Monitor,
  CookingPot,
  Paintbrush,
  WashingMachine,
  Tent,
  PlusSquare,
  Book,
  Shirt,
  Footprints,
  Coffee,
  Pizza,
  ShoppingBasket,
  Gift,
  Bus,
  Stethoscope,
  Pill,
  Smartphone,
  Wifi
} from 'lucide-react';
import { Category, TransactionType } from './types';

export const CATEGORIES: Category[] = [
  { 
    id: 'cat-1', 
    name: 'Ăn uống', 
    icon: 'Utensils', 
    color: '#f87171',
    subCategories: [
      { id: 'sub-1-1', name: 'Nhà hàng', icon: 'Utensils', color: '#f87171' },
      { id: 'sub-1-2', name: 'Cà phê', icon: 'Coffee', color: '#fb923c' },
      { id: 'sub-1-3', name: 'Đồ ăn nhanh', icon: 'Pizza', color: '#facc15' },
    ]
  },
  { 
    id: 'cat-2', 
    name: 'Mua sắm', 
    icon: 'ShoppingBag', 
    color: '#fb923c',
    subCategories: [
      { id: 'sub-2-1', name: 'Quần áo', icon: 'Shirt', color: '#fb923c' },
      { id: 'sub-2-2', name: 'Đồ điện tử', icon: 'Monitor', color: '#3b82f6' },
      { id: 'sub-2-3', name: 'Đồ gia dụng', icon: 'ShoppingBasket', color: '#4ade80' },
    ]
  },
  { 
    id: 'cat-3', 
    name: 'Di chuyển', 
    icon: 'Car', 
    color: '#facc15',
    subCategories: [
      { id: 'sub-3-1', name: 'Xăng xe', icon: 'Car', color: '#facc15' },
      { id: 'sub-3-2', name: 'Taxi/Grab', icon: 'Bus', color: '#fb923c' },
      { id: 'sub-3-3', name: 'Bảo dưỡng', icon: 'Paintbrush', color: '#94a3b8' },
    ]
  },
  { 
    id: 'cat-4', 
    name: 'Nhà cửa', 
    icon: 'Home', 
    color: '#4ade80',
    subCategories: [
      { id: 'sub-4-1', name: 'Tiền thuê', icon: 'Home', color: '#4ade80' },
      { id: 'sub-4-2', name: 'Sửa chữa', icon: 'Paintbrush', color: '#fb923c' },
      { id: 'sub-4-3', name: 'Nội thất', icon: 'ShoppingBasket', color: '#facc15' },
    ]
  },
  { 
    id: 'cat-5', 
    name: 'Hóa đơn', 
    icon: 'Zap', 
    color: '#22d3ee',
    subCategories: [
      { id: 'sub-5-1', name: 'Điện', icon: 'Zap', color: '#22d3ee' },
      { id: 'sub-5-2', name: 'Nước', icon: 'Pill', color: '#3b82f6' },
      { id: 'sub-5-3', name: 'Internet', icon: 'Wifi', color: '#818cf8' },
    ]
  },
  { 
    id: 'cat-6', 
    name: 'Sức khỏe', 
    icon: 'HeartPulse', 
    color: '#ef4444',
    subCategories: [
      { id: 'sub-6-1', name: 'Khám bệnh', icon: 'Stethoscope', color: '#ef4444' },
      { id: 'sub-6-2', name: 'Thuốc', icon: 'Pill', color: '#f87171' },
      { id: 'sub-6-3', name: 'Bảo hiểm', icon: 'HeartPulse', color: '#4ade80' },
    ]
  },
  { id: 'cat-7', name: 'Giáo dục', icon: 'GraduationCap', color: '#818cf8', subCategories: [] },
  { id: 'cat-8', name: 'Giải trí', icon: 'Gamepad2', color: '#a78bfa', subCategories: [] },
  { id: 'cat-9', name: 'Lương thưởng', icon: 'Wallet', color: '#2dd4bf', subCategories: [] },
  { id: 'cat-10', name: 'Đầu tư', icon: 'TrendingUp', color: '#34d399', subCategories: [] },
];

export const getCategoryIcon = (iconName: string) => {
  const size = 30;
  const stroke = 2;
  switch (iconName) {
    case 'Utensils': return <Utensils size={size} strokeWidth={stroke} />;
    case 'ShoppingBag': return <ShoppingBag size={size} strokeWidth={stroke} />;
    case 'Car': return <Car size={size} strokeWidth={stroke} />;
    case 'Home': return <Home size={size} strokeWidth={stroke} />;
    case 'Zap': return <Zap size={size} strokeWidth={stroke} />;
    case 'HeartPulse': return <HeartPulse size={size} strokeWidth={stroke} />;
    case 'GraduationCap': return <GraduationCap size={size} strokeWidth={stroke} />;
    case 'Gamepad2': return <Gamepad2 size={size} strokeWidth={stroke} />;
    case 'Wallet': return <Wallet size={size} strokeWidth={stroke} />;
    case 'TrendingUp': return <TrendingUp size={size} strokeWidth={stroke} />;
    case 'ReceiptText': return <ReceiptText size={size} strokeWidth={stroke} />;
    case 'Plane': return <Plane size={size} strokeWidth={stroke} />;
    case 'Tag': return <Tag size={size} strokeWidth={stroke} />;
    case 'PawPrint': return <PawPrint size={size} strokeWidth={stroke} />;
    case 'Monitor': return <Monitor size={size} strokeWidth={stroke} />;
    case 'CookingPot': return <CookingPot size={size} strokeWidth={stroke} />;
    case 'Paintbrush': return <Paintbrush size={size} strokeWidth={stroke} />;
    case 'WashingMachine': return <WashingMachine size={size} strokeWidth={stroke} />;
    case 'Tent': return <Tent size={size} strokeWidth={stroke} />;
    case 'PlusSquare': return <PlusSquare size={size} strokeWidth={stroke} />;
    case 'Book': return <Book size={size} strokeWidth={stroke} />;
    case 'Shirt': return <Shirt size={size} strokeWidth={stroke} />;
    case 'Footprints': return <Footprints size={size} strokeWidth={stroke} />;
    case 'Coffee': return <Coffee size={size} strokeWidth={stroke} />;
    case 'Pizza': return <Pizza size={size} strokeWidth={stroke} />;
    case 'ShoppingBasket': return <ShoppingBasket size={size} strokeWidth={stroke} />;
    case 'Gift': return <Gift size={size} strokeWidth={stroke} />;
    case 'Bus': return <Bus size={size} strokeWidth={stroke} />;
    case 'Stethoscope': return <Stethoscope size={size} strokeWidth={stroke} />;
    case 'Pill': return <Pill size={size} strokeWidth={stroke} />;
    case 'Smartphone': return <Smartphone size={size} strokeWidth={stroke} />;
    case 'Wifi': return <Wifi size={size} strokeWidth={stroke} />;
    default: return <Wallet size={size} strokeWidth={stroke} />;
  }
};
