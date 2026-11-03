/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole =
  | 'super_admin'
  | 'tenant_admin'
  | 'general_manager'
  | 'financial_manager'
  | 'financial_accountant'
  | 'cost_accountant'
  | 'tax_accountant'
  | 'store_manager'
  | 'cashier'
  | 'hr_manager'
  | 'public_relations'
  | 'kitchen_manager'
  | 'bar_manager'
  | 'waiter';

export type BusinessType =
  | 'restaurant'
  | 'cafe'
  | 'restaurant_cafe'
  | 'take_away'
  | 'fast_food'
  | 'bakery'
  | 'pastry'
  | 'hotel'
  | 'resort'
  | 'tourist_village'
  | 'food_beverage_outlet'
  | 'other';

export type EstablishmentStatus = 'active' | 'suspended' | 'blocked' | 'trial';

export interface Establishment {
  id: string;
  code: string; // e.g. "R.0001", "C.0001"
  prefix: string;
  number: string;
  name: string;
  ownerName: string;
  businessType: BusinessType;
  nationalId: string;
  crNumber?: string;
  taxNumber?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  secondaryPhone?: string;
  email: string;
  language: 'en' | 'ar' | 'fr' | 'nl' | 'tr';
  currency: string;
  timezone: string;
  branchesCount: number;
  usersCount: number;
  status: EstablishmentStatus;
  createdAt: string;
  lastActivity: string;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  establishmentId: string;
  establishmentCode: string;
  establishmentName: string;
  avatarUrl?: string;
  branchName?: string;
}

// POS & Table Management Types
export type TableStatus = 'available' | 'occupied' | 'reserved' | 'waiting_payment' | 'closed';

export interface PosTable {
  id: string;
  tableNumber: string;
  section: string; // e.g. "Main Dining", "Terrace", "VIP Lounge", "Bar"
  capacity: number;
  status: TableStatus;
  customerName?: string;
  guests?: number;
  waiter?: string;
  openTime?: string;
  orderTotal?: number;
  currentOrderId?: string;
}

export type PosOrderMode = 'dine_in' | 'take_away' | 'delivery';

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  department: string;
  notes?: string;
  selectedModifiers?: string[];
}

export interface PosOrder {
  id: string;
  orderNumber: string;
  mode: PosOrderMode;
  tableId?: string;
  tableNumber?: string;
  customerName?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'open' | 'sent_to_kitchen' | 'served' | 'paid' | 'cancelled';
  createdAt: string;
  waiterName?: string;
}

// Menu, Ingredients & Recipe Types
export type ProductionDepartment = 'Kitchen' | 'Bar' | 'Bakery' | 'Pastry' | 'Grill' | 'Preparation';

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  costPerUnit: number;
  currentStock: number;
  minimumStock: number;
  warehouse: string;
}

export interface RecipeItem {
  ingredientId: string;
  ingredientName: string;
  quantity: number;
  unit: string;
  cost: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  department: ProductionDepartment;
  sellingPrice: number;
  taxRate: number;
  unit: string;
  barcode: string;
  image?: string;
  isAvailable: boolean;
  availableDineIn: boolean;
  availableTakeAway: boolean;
  availableDelivery: boolean;
  recipeCost: number;
  foodCostPercentage: number;
  recipe: RecipeItem[];
  modifiers: string[];
  notes?: string;
}

// Cost Control Types
export interface CostKpi {
  title: string;
  currentPercent: number;
  targetPercent: number;
  status: 'normal' | 'warning' | 'critical';
  variancePercent: number;
  monthlyAmount: number;
}

export interface ConsumptionVariance {
  ingredientId: string;
  name: string;
  unit: string;
  theoreticalConsumption: number;
  actualConsumption: number;
  varianceQuantity: number;
  varianceValue: number;
  wasteQuantity: number;
  yieldPercent: number;
  status: 'normal' | 'warning' | 'critical';
}

// Inventory Types
export interface Warehouse {
  id: string;
  code: string;
  name: string;
  location: string;
  manager: string;
  totalItems: number;
  totalValue: number;
}

export interface StockBalanceItem {
  id: string;
  code: string;
  name: string;
  warehouseId: string;
  warehouseName: string;
  unit: string;
  costPerUnit: number;
  theoreticalStock: number;
  bookStock: number;
  physicalStock: number;
  variance: number;
  totalValuation: number;
  reorderPoint: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'variance_detected';
}

// Purchasing Types
export interface Supplier {
  id: string;
  code: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  category: string;
  rating: number;
  paymentTerms: string;
  balanceDue: number;
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplierName: string;
  issueDate: string;
  deliveryDate: string;
  status: 'draft' | 'requested' | 'approved' | 'received' | 'invoiced' | 'paid';
  totalAmount: number;
  itemsCount: number;
}

// Finance & Tax Types
export interface AccountItem {
  code: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  balance: number;
  currency: string;
}

export interface JournalEntry {
  id: string;
  entryNumber: string;
  date: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  sourceModule: 'POS' | 'Inventory' | 'Purchasing' | 'Payroll' | 'Manual';
}

export interface TaxRecord {
  period: string;
  totalSales: number;
  outputVat: number;
  totalPurchases: number;
  inputVat: number;
  taxPayable: number;
  status: 'draft' | 'reconciled' | 'submitted';
  eDocReference: string;
}

// HR & Payroll Types
export interface Employee {
  id: string;
  code: string;
  name: string;
  department: string;
  position: string;
  laborType: 'direct' | 'indirect';
  baseSalary: number;
  hireDate: string;
  currentShift: string;
  attendanceRate: number;
  status: 'active' | 'on_leave' | 'terminated';
}

// CRM & Loyalty Types
export interface Customer {
  id: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  loyaltyTier: 'Platinum' | 'Gold' | 'Silver' | 'Standard';
  loyaltyPoints: number;
  totalVisits: number;
  totalSpent: number;
  lastVisit: string;
  satisfactionRating: number;
  favoriteDish: string;
}

// Internal Chat Types
export interface ChatChannel {
  id: string;
  name: string;
  type: 'department' | 'branch' | 'direct' | 'announcement';
  description?: string;
  unreadCount: number;
  lastMessageSnippet: string;
  lastMessageTime: string;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderName: string;
  senderRole: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
  reactions?: { emoji: string; count: number }[];
  attachmentName?: string;
}

// Sync & Offline Types
export type SyncStatus = 'online' | 'offline' | 'synchronizing' | 'synced' | 'pending_changes' | 'sync_error';

export interface PendingSyncItem {
  id: string;
  type: 'POS_ORDER' | 'STOCK_MOVEMENT' | 'WASTE_LOG' | 'ATTENDANCE_CHECK';
  description: string;
  timestamp: string;
  status: 'queued' | 'syncing' | 'failed';
}

// Super Admin Maintenance Access
export interface MaintenanceSession {
  id: string;
  targetEstablishmentCode: string;
  targetEstablishmentName: string;
  adminUsername: string;
  durationMinutes: number;
  reason: string;
  startedAt: string;
  expiresAt: string;
  status: 'active' | 'expired' | 'terminated';
}
