"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const name = searchParams.get("name") || "المنتج";
  const url = searchParams.get("url") || "#";

  return (
    <div className="min-h-screen mesh-bg">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        {/* Success animation */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center animate-fade-in">
            <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center">
              <span className="text-5xl animate-float">✅</span>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-sky-400 rounded-full flex items-center justify-center text-white text-sm animate-bounce">
            ✨
          </div>
        </div>

        <div className="animate-slide-up">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-3">
            تم الشراء بنجاح! 🎉
          </h1>
          <p className="text-slate-500 text-lg mb-2">
            شكراً لك! طلبك رقم{" "}
            <span className="font-bold text-sky-600 font-mono">#{orderId}</span>{" "}
            تم تأكيده.
          </p>
          <p className="text-slate-500 mb-8">
            منتجك{" "}
            <span className="font-bold text-slate-700">{decodeURIComponent(name)}</span>{" "}
            جاهز للتحميل الآن
          </p>

          {/* Download Card */}
          <div className="card p-8 mb-8 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
            <div className="text-5xl mb-4">📦</div>
            <h2 className="text-xl font-bold text-slate-700 mb-2">
              {decodeURIComponent(name)}
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              انقر على الزر أدناه لتحميل المنتج مباشرةً
            </p>

            <a
              href={decodeURIComponent(url)}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-l from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-sky-200 hover:shadow-sky-300 transition-all duration-200 text-lg active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              تحميل المنتج الآن
            </a>
          </div>

          {/* Info boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: "📧", title: "تحقق من بريدك", desc: "أرسلنا لك رابط التحميل احتياطياً" },
              { icon: "💬", title: "تحتاج مساعدة؟", desc: "فريق الدعم جاهز 24/7 لمساعدتك" },
              { icon: "⭐", title: "قيّم تجربتك", desc: "رأيك يساعدنا على التحسين" },
            ].map((item, i) => (
              <div key={i} className="card p-4 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-bold text-slate-700 text-sm mb-1">{item.title}</div>
                <div className="text-slate-400 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold transition-colors"
          >
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            العودة للتسوق
          </Link>
        </div>
      </div>
    </div>
  );
}
