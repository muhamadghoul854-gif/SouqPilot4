export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  downloadUrl: string;
  category: string;
  emoji: string;
  createdAt: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  email: string;
  phone: string;
  price: number;
  createdAt: string;
}

const PRODUCTS_KEY = "souq_pilot_products";
const ORDERS_KEY = "souq_pilot_orders";

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "قالب موقع إلكتروني احترافي",
    description: "قالب HTML/CSS/JS كامل وجاهز للاستخدام مع تصميم عصري ومتجاوب",
    price: 49,
    downloadUrl: "https://example.com/template.zip",
    category: "قوالب",
    emoji: "🎨",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "كورس تعلم البرمجة بالعربية",
    description: "دورة تدريبية شاملة لتعلم البرمجة من الصفر مع أمثلة تطبيقية",
    price: 99,
    downloadUrl: "https://example.com/course.zip",
    category: "دورات",
    emoji: "📚",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "حزمة أيقونات SVG - 500 أيقونة",
    description: "مجموعة ضخمة من الأيقونات المتجهية القابلة للتخصيص بالكامل",
    price: 29,
    downloadUrl: "https://example.com/icons.zip",
    category: "تصميم",
    emoji: "✨",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "أداة تحليل منافسين SEO",
    description: "سكريبت Python لتحليل المنافسين وتقرير SEO مفصل",
    price: 79,
    downloadUrl: "https://example.com/seo-tool.zip",
    category: "أدوات",
    emoji: "🚀",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "باقة خطوط عربية مميزة",
    description: "مجموعة خطوط عربية احترافية للاستخدام في المشاريع التجارية",
    price: 19,
    downloadUrl: "https://example.com/fonts.zip",
    category: "تصميم",
    emoji: "🖋️",
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "نظام إدارة مشاريع - Notion Template",
    description: "قالب Notion متكامل لإدارة المشاريع والمهام والفرق",
    price: 35,
    downloadUrl: "https://example.com/notion.zip",
    category: "إنتاجية",
    emoji: "📋",
    createdAt: new Date().toISOString(),
  },
];

export function getProducts(): Product[] {
  if (typeof window === "undefined") return DEFAULT_PRODUCTS;
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (!stored) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  return JSON.parse(stored);
}

export function saveProduct(product: Omit<Product, "id" | "createdAt">): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  products.unshift(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return newProduct;
}

export function deleteProduct(id: string): void {
  const products = getProducts().filter((p) => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(ORDERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveOrder(order: Omit<Order, "id" | "createdAt">): Order {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  orders.unshift(newOrder);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return newOrder;
}
