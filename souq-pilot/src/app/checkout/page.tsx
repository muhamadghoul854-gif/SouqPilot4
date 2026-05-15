"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getProductById, saveOrder, Product } from "@/lib/storage";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [product, setProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  useEffect(() => {
    if (productId) {
      const p = getProductById(productId);
      setProduct(p || null);
    }
  }, [productId]);

  function validate() {
    const errs: { email?: string; phone?: string } = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "أدخل بريداً إلكترونياً صحيحاً";
    }
    if (!phone || phone.replace(/\D/g, "").length < 9) {
      errs.phone = "أدخل رقم هاتف صحيحاً";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit() {
    if (!product || !validate()) return;
    setLoading(true);

    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 1500));

    const order = saveOrder({
      productId: product.id,
      productName: product.name,
      email,
      phone,
      price: product.price,
    });

    router.push(
      `/success?orderId=${order.id}&name=${encodeURIComponent(product.name)}&url=${encodeURIComponent(product.downloadUrl)}`
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen mesh-bg">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
          <div className="text-5xl">😕</div>
          <h2 className="text-2xl font-bold text-slate-700">المنتج غير موجود</h2>
          <Link href="/" className="btn-primary">العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-bg">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium text-sm mb-4">
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            العودة للمتجر
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-800">إتمام الشراء</h1>
          <p className="text-slate-500 mt-1">خطوة واحدة فقط وستحصل على منتجك فوراً</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Form */}
          <div className="md:col-span-3">
            <div className="card p-7">
              <h2 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
                <span className="w-7 h-7 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                بيانات التواصل
              </h2>

              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={`input-field ${errors.email ? "border-red-300 focus:ring-red-400" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <span>⚠️</span> {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    placeholder="05xxxxxxxx"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    className={`input-field ${errors.phone ? "border-red-300 focus:ring-red-400" : ""}`}
                    dir="ltr"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <span>⚠️</span> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Trust note */}
                <div className="flex items-start gap-3 bg-sky-50 rounded-xl p-4 border border-sky-100">
                  <span className="text-xl mt-0.5">🔒</span>
                  <p className="text-sm text-sky-700 leading-relaxed">
                    بياناتك محمية ومشفرة بالكامل. سنرسل لك رابط التحميل على بريدك الإلكتروني.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full mt-7 btn-primary py-4 text-base flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    <span>جارٍ المعالجة...</span>
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    <span>تأكيد الشراء والتحميل الفوري</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="card p-6 sticky top-24">
              <h2 className="text-lg font-bold text-slate-700 mb-4">ملخص الطلب</h2>

              {/* Product */}
              <div className="flex items-start gap-4 p-4 bg-sky-50 rounded-xl border border-sky-100 mb-4">
                <div className="text-4xl">{product.emoji}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 text-sm leading-snug mb-1">
                    {product.name}
                  </h3>
                  <span className="badge text-xs">{product.category}</span>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 text-sm border-t border-sky-100 pt-4">
                <div className="flex justify-between text-slate-600">
                  <span>سعر المنتج</span>
                  <span>${product.price}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>رسوم المعالجة</span>
                  <span className="text-green-600">مجاناً</span>
                </div>
                <div className="flex justify-between font-extrabold text-xl text-slate-800 border-t border-sky-100 pt-3 mt-2">
                  <span>الإجمالي</span>
                  <span className="text-sky-600">${product.price}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mt-4 space-y-2">
                {["تحميل فوري بعد الشراء", "ضمان استعادة الأموال", "دعم فني مجاني"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
