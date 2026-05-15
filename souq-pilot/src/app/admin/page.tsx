"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  getProducts,
  saveProduct,
  deleteProduct,
  getOrders,
  Product,
  Order,
} from "@/lib/storage";

const CATEGORIES = ["قوالب", "دورات", "تصميم", "أدوات", "إنتاجية", "أخرى"];
const EMOJIS = ["🎨", "📚", "✨", "🚀", "🖋️", "📋", "💻", "🎯", "🔧", "📊", "🎵", "📱"];

interface FormState {
  name: string;
  description: string;
  price: string;
  downloadUrl: string;
  category: string;
  emoji: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  description: "",
  price: "",
  downloadUrl: "",
  category: "قوالب",
  emoji: "🎨",
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [tab, setTab] = useState<"products" | "add" | "orders">("products");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setProducts(getProducts());
    setOrders(getOrders());
  }, []);

  function validate() {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = "الاسم مطلوب";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) errs.price = "سعر صحيح مطلوب";
    if (!form.downloadUrl.trim()) errs.downloadUrl = "رابط التحميل مطلوب";
    if (!form.description.trim()) errs.description = "الوصف مطلوب";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleAdd() {
    if (!validate()) return;
    saveProduct({
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      downloadUrl: form.downloadUrl.trim(),
      category: form.category,
      emoji: form.emoji,
    });
    setProducts(getProducts());
    setForm(EMPTY_FORM);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setTab("products");
  }

  function handleDelete(id: string) {
    deleteProduct(id);
    setProducts(getProducts());
    setDeleteConfirm(null);
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.price, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">لوحة التحكم</h1>
            <p className="text-slate-500 mt-1">إدارة المنتجات والطلبات</p>
          </div>
          <Link href="/" className="btn-outline text-sm py-2.5 px-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            المتجر
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: "📦", label: "إجمالي المنتجات", value: products.length, color: "bg-sky-50 border-sky-200 text-sky-700" },
            { icon: "🛒", label: "إجمالي الطلبات", value: orders.length, color: "bg-green-50 border-green-200 text-green-700" },
            { icon: "💰", label: "إجمالي الإيرادات", value: `$${totalRevenue}`, color: "bg-blue-50 border-blue-200 text-blue-700" },
          ].map((stat, i) => (
            <div key={i} className={`card p-5 border ${stat.color} flex items-center gap-4`}>
              <div className="text-3xl">{stat.icon}</div>
              <div>
                <div className="text-2xl font-extrabold">{stat.value}</div>
                <div className="text-sm opacity-70">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-sky-100">
          {[
            { key: "products", label: "المنتجات", icon: "📦" },
            { key: "add", label: "إضافة منتج", icon: "➕" },
            { key: "orders", label: "الطلبات", icon: "🛒" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as typeof tab)}
              className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm transition-all duration-200 border-b-2 -mb-px ${
                tab === t.key
                  ? "border-sky-500 text-sky-600"
                  : "border-transparent text-slate-500 hover:text-sky-500"
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Success toast */}
        {success && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slide-up">
            <span>✅</span>
            <span>تمت إضافة المنتج بنجاح!</span>
          </div>
        )}

        {/* Products List */}
        {tab === "products" && (
          <div className="animate-fade-in">
            {products.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-3">📭</div>
                <p className="text-slate-500">لا توجد منتجات بعد. أضف منتجك الأول!</p>
                <button onClick={() => setTab("add")} className="btn-primary mt-4 text-sm">إضافة منتج</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                  <div key={p.id} className="card p-5 relative group">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-3xl">{p.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-800 text-sm leading-snug truncate">{p.name}</h3>
                        <span className="badge text-xs mt-1">{p.category}</span>
                      </div>
                      <span className="font-extrabold text-sky-600 text-lg">${p.price}</span>
                    </div>
                    <p className="text-slate-400 text-xs line-clamp-2 mb-3">{p.description}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 border-t border-sky-50 pt-3">
                      <span className="flex-1 truncate">🔗 {p.downloadUrl}</span>
                    </div>
                    {/* Delete */}
                    {deleteConfirm === p.id ? (
                      <div className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center gap-3 p-4">
                        <p className="text-slate-700 font-semibold text-sm text-center">هل تريد حذف هذا المنتج؟</p>
                        <div className="flex gap-2">
                          <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-semibold">حذف</button>
                          <button onClick={() => setDeleteConfirm(null)} className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-sm font-semibold">إلغاء</button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(p.id)}
                        className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 bg-red-50 text-red-400 hover:bg-red-100 rounded-lg flex items-center justify-center text-xs"
                      >
                        🗑
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Product Form */}
        {tab === "add" && (
          <div className="max-w-2xl animate-fade-in">
            <div className="card p-7">
              <h2 className="text-xl font-bold text-slate-700 mb-6">إضافة منتج جديد</h2>

              <div className="space-y-5">
                {/* Emoji picker */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">الأيقونة</label>
                  <div className="flex flex-wrap gap-2">
                    {EMOJIS.map((e) => (
                      <button
                        key={e}
                        onClick={() => setForm({ ...form, emoji: e })}
                        className={`w-10 h-10 rounded-xl text-xl transition-all ${
                          form.emoji === e
                            ? "bg-sky-100 ring-2 ring-sky-400 scale-110"
                            : "bg-slate-50 hover:bg-sky-50"
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">اسم المنتج *</label>
                  <input
                    type="text"
                    placeholder="مثال: قالب موقع احترافي"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`input-field ${errors.name ? "border-red-300" : ""}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">⚠️ {errors.name}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">وصف المنتج *</label>
                  <textarea
                    rows={3}
                    placeholder="اكتب وصفاً موجزاً وجذاباً للمنتج..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className={`input-field resize-none ${errors.description ? "border-red-300" : ""}`}
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">⚠️ {errors.description}</p>}
                </div>

                {/* Price & Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">السعر (USD) *</label>
                    <input
                      type="number"
                      placeholder="29"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className={`input-field ${errors.price ? "border-red-300" : ""}`}
                      min="0"
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">⚠️ {errors.price}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">التصنيف</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="input-field"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Download URL */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">رابط التحميل *</label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={form.downloadUrl}
                    onChange={(e) => setForm({ ...form, downloadUrl: e.target.value })}
                    className={`input-field ${errors.downloadUrl ? "border-red-300" : ""}`}
                    dir="ltr"
                  />
                  {errors.downloadUrl && <p className="text-red-500 text-xs mt-1">⚠️ {errors.downloadUrl}</p>}
                  <p className="text-xs text-slate-400 mt-1.5">
                    💡 يمكن استخدام Google Drive أو Dropbox أو أي رابط مباشر
                  </p>
                </div>

                {/* Preview */}
                {form.name && (
                  <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                    <p className="text-xs font-semibold text-sky-600 mb-2">معاينة المنتج:</p>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{form.emoji}</span>
                      <div>
                        <p className="font-bold text-slate-700 text-sm">{form.name}</p>
                        <p className="text-sky-600 font-bold">${form.price || "0"}</p>
                      </div>
                    </div>
                  </div>
                )}

                <button onClick={handleAdd} className="w-full btn-primary py-4 text-base flex items-center justify-center gap-2">
                  <span>➕</span>
                  <span>إضافة المنتج</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Orders */}
        {tab === "orders" && (
          <div className="animate-fade-in">
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-3">📭</div>
                <p className="text-slate-500">لا توجد طلبات بعد.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-right text-xs text-slate-500 border-b border-sky-100">
                      <th className="pb-3 pr-2 font-semibold">#</th>
                      <th className="pb-3 font-semibold">المنتج</th>
                      <th className="pb-3 font-semibold">الإيميل</th>
                      <th className="pb-3 font-semibold">الهاتف</th>
                      <th className="pb-3 font-semibold">السعر</th>
                      <th className="pb-3 font-semibold">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-50">
                    {orders.map((o) => (
                      <tr key={o.id} className="text-sm hover:bg-sky-50/50 transition-colors">
                        <td className="py-3 pr-2 text-slate-400 font-mono text-xs">#{o.id.slice(-4)}</td>
                        <td className="py-3 font-medium text-slate-700">{o.productName}</td>
                        <td className="py-3 text-slate-500" dir="ltr">{o.email}</td>
                        <td className="py-3 text-slate-500" dir="ltr">{o.phone}</td>
                        <td className="py-3 font-bold text-sky-600">${o.price}</td>
                        <td className="py-3 text-slate-400 text-xs">
                          {new Date(o.createdAt).toLocaleDateString("ar-SA")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
