export default function Footer() {
  return (
    <footer className="bg-white border-t border-sky-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">SP</span>
              </div>
              <span className="font-bold text-sky-600 text-lg">Souq Pilot</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              منصة متخصصة في بيع المنتجات الرقمية عالية الجودة بأسعار منافسة.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-slate-700 mb-3">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="/" className="hover:text-sky-600 transition-colors">الرئيسية</a></li>
              <li><a href="/#products" className="hover:text-sky-600 transition-colors">المنتجات</a></li>
              <li><a href="/admin" className="hover:text-sky-600 transition-colors">لوحة التحكم</a></li>
            </ul>
          </div>

          {/* Trust badges */}
          <div>
            <h4 className="font-bold text-slate-700 mb-3">لماذا سوق بايلوت؟</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-2"><span>✅</span> تحميل فوري بعد الشراء</li>
              <li className="flex items-center gap-2"><span>🔒</span> معاملات آمنة ومشفرة</li>
              <li className="flex items-center gap-2"><span>⭐</span> منتجات مراجعة بعناية</li>
              <li className="flex items-center gap-2"><span>💬</span> دعم فني على مدار الساعة</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sky-100 mt-8 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Souq Pilot — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}
