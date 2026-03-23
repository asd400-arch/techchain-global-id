export const ASIA_COUNTRIES = [
  // Southeast Asia
  { code: 'SG', name: 'Singapore',    currency: 'SGD', symbol: 'S$',   flag: '🇸🇬', region: 'SEA', city_examples: ['Singapore', 'Jurong', 'Tampines', 'Tuas'] },
  { code: 'ID', name: 'Indonesia',    currency: 'IDR', symbol: 'Rp',   flag: '🇮🇩', region: 'SEA', city_examples: ['Jakarta', 'Batam', 'Surabaya', 'Bali'] },
  { code: 'MY', name: 'Malaysia',     currency: 'MYR', symbol: 'RM',   flag: '🇲🇾', region: 'SEA', city_examples: ['Kuala Lumpur', 'Johor Bahru', 'Penang', 'Shah Alam'] },
  { code: 'TH', name: 'Thailand',     currency: 'THB', symbol: '฿',    flag: '🇹🇭', region: 'SEA', city_examples: ['Bangkok', 'Chiang Mai', 'Pattaya'] },
  { code: 'VN', name: 'Vietnam',      currency: 'VND', symbol: '₫',    flag: '🇻🇳', region: 'SEA', city_examples: ['Ho Chi Minh City', 'Hanoi', 'Da Nang'] },
  { code: 'PH', name: 'Philippines',  currency: 'PHP', symbol: '₱',    flag: '🇵🇭', region: 'SEA', city_examples: ['Manila', 'Cebu', 'Davao'] },
  // Northeast Asia
  { code: 'JP', name: 'Japan',        currency: 'JPY', symbol: '¥',    flag: '🇯🇵', region: 'NEA', city_examples: ['Tokyo', 'Osaka', 'Yokohama'] },
  { code: 'KR', name: 'South Korea',  currency: 'KRW', symbol: '₩',    flag: '🇰🇷', region: 'NEA', city_examples: ['Seoul', 'Busan', 'Incheon'] },
  { code: 'CN', name: 'China',        currency: 'CNY', symbol: '¥',    flag: '🇨🇳', region: 'NEA', city_examples: ['Shanghai', 'Shenzhen', 'Guangzhou', 'Beijing'] },
  { code: 'TW', name: 'Taiwan',       currency: 'TWD', symbol: 'NT$',  flag: '🇹🇼', region: 'NEA', city_examples: ['Taipei', 'Taichung', 'Kaohsiung'] },
  { code: 'HK', name: 'Hong Kong',    currency: 'HKD', symbol: 'HK$',  flag: '🇭🇰', region: 'NEA', city_examples: ['Hong Kong'] },
  // South Asia
  { code: 'IN', name: 'India',        currency: 'INR', symbol: '₹',    flag: '🇮🇳', region: 'SA',  city_examples: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'] },
  { code: 'BD', name: 'Bangladesh',   currency: 'BDT', symbol: '৳',    flag: '🇧🇩', region: 'SA',  city_examples: ['Dhaka', 'Chittagong'] },
  { code: 'LK', name: 'Sri Lanka',    currency: 'LKR', symbol: 'Rs',   flag: '🇱🇰', region: 'SA',  city_examples: ['Colombo', 'Kandy'] },
];

export const WAREHOUSE_TYPES = [
  { value: 'general',    label: 'General Storage',     icon: '🏭' },
  { value: 'cold_chain', label: 'Cold Chain / Pharma', icon: '❄️' },
  { value: 'bonded',     label: 'Bonded Warehouse',    icon: '🔒' },
  { value: 'ftz',        label: 'Free Trade Zone',     icon: '🌐' },
  { value: 'hazmat',     label: 'Hazmat / Chemical',   icon: '⚠️' },
  { value: 'high_value', label: 'High-Value / IT',     icon: '💎' },
  { value: 'fulfilment', label: 'Fulfilment Centre',   icon: '📦' },
];

export const SERVICE_TYPES = [
  'B2B Storage',
  'E-commerce Fulfilment',
  'Cross-border Logistics',
  'Cold Chain',
  'Last-mile Delivery',
  'Bonded / FTZ',
  'Customs Clearance',
  'Inventory Management',
];

export const FEATURES_LIST = [
  'Climate Control',
  '24hr Security',
  'Loading Dock',
  'Racking',
  'CCTV',
  'Bonded',
  'Cold Storage',
  'Customs On-site',
  'Biometric Access',
  'ISO Certified',
  'White Glove',
  'Insurance Ready',
  'Pick & Pack',
  'HACCP',
];

export const REGION_LABELS = {
  SEA: 'Southeast Asia',
  NEA: 'Northeast Asia',
  SA:  'South Asia',
};

export function getCountry(code) {
  return ASIA_COUNTRIES.find(c => c.code === code);
}

export function getWarehouseType(value) {
  return WAREHOUSE_TYPES.find(t => t.value === value);
}

export function formatPrice(price, currency) {
  const country = ASIA_COUNTRIES.find(c => c.currency === currency);
  const symbol = country?.symbol || currency;
  const num = Number(price);
  if (num >= 1000000) return `${symbol}${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${symbol}${(num / 1000).toFixed(0)}K`;
  return `${symbol}${num.toLocaleString()}`;
}

export function getCurrencySymbol(currency) {
  const country = ASIA_COUNTRIES.find(c => c.currency === currency);
  return country?.symbol || currency;
}

export function getVendorCategory(id) {
  return VENDOR_CATEGORIES.find(c => c.id === id);
}

export const VENDOR_CATEGORIES = [
  {
    id: 'warehouse_space',
    name: 'Warehouse Space',
    icon: '🏭',
    color: '#e8b84b',
    description: 'Find and book warehouse space across Asia',
    cta_buyer: 'Find Warehouse Space',
    cta_seller: 'List Your Business',
    subcategories: ['General Storage','Cold Chain','Bonded / FTZ','High-Value / IT','Fulfilment Centre','Hazmat'],
  },
  {
    id: 'automation',
    name: 'Automation Solutions',
    icon: '⚙️',
    color: '#3ecf8e',
    description: 'Robotics, AGV/AMR, AS/RS, conveyors for warehouse automation',
    cta_buyer: 'Find Automation Solutions',
    cta_seller: 'List Your Services',
    subcategories: ['Robotic Picking (AMR/AGV)','Conveyor Systems','AS/RS','Sortation Systems','Palletising Robots','Drone Inventory','Vision Systems','WCS'],
  },
  {
    id: 'equipment_systems',
    name: 'Equipment & Systems',
    icon: '🔧',
    color: '#60a5fa',
    description: 'WMS, ERP, RFID, barcode, IoT and management software',
    cta_buyer: 'Find Systems & Software',
    cta_seller: 'List Your Services',
    subcategories: ['WMS','ERP Integration','RFID Systems','Barcode & Scanning','Label Printing','Inventory Software','IoT Sensors','Fleet Management','Voice Picking','Pick-to-Light'],
  },
  {
    id: 'material_handling',
    name: 'Material Handling Equipment',
    icon: '🚜',
    color: '#f97316',
    description: 'Forklifts, pallet racking, shelving, MHE for sale or lease',
    cta_buyer: 'Find Equipment',
    cta_seller: 'List Your Services',
    subcategories: ['Forklifts (Electric/Gas/Diesel)','Reach Trucks','Pallet Jacks','Order Pickers','Pallet Racking','Mezzanine Floors','Shelving & Lockers','Loading Dock Equipment','Stretch Wrapping','Conveyors (Manual)'],
  },
  {
    id: 'logistics_services',
    name: 'Logistics Services',
    icon: '🚚',
    color: '#a78bfa',
    description: 'Freight, customs, cross-border, last-mile delivery',
    cta_buyer: 'Find Logistics Partner',
    cta_seller: 'List Your Services',
    subcategories: ['Air Freight','Sea Freight','Road Transport','Cross-border Logistics','Customs Clearance','Last-mile Delivery','Cold Chain Transport','Reverse Logistics','Express Courier','Project Cargo'],
  },
];

export const CERTIFICATIONS = [
  'ISO 9001','ISO 14001','ISO 45001','HACCP','GMP','GDP',
  'TAPA FSR','TAPA TSR','BizSAFE','CE Marking','UL Listed',
  'Authorized Economic Operator (AEO)','MOM Approved','NEA Licensed',
];

export const EMPLOYEE_RANGES = ['1–10','11–50','51–200','201–500','500+'];

export const VENDOR_LANGUAGES = [
  'English','Mandarin','Malay','Thai','Vietnamese',
  'Bahasa Indonesia','Japanese','Korean','Hindi','Tagalog',
];
