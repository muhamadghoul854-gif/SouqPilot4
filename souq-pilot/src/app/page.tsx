"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProducts, Product } from "@/lib/storage";

const CATEGORIES = ["الكل", "قوالب", "دورات", "تصميم", "أدوات", "إنتاجية"];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const p = getProducts();
    setProducts(p);
    setFiltered(p);
    setLoaded(true);
  }, []);

  useEffect(() => {
    let result = products;
    if (activeCategory !== "الكل") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      result = result.filter(
        (p) =>
          p.name.includes(search) || p.description.includes(search)
      );
    }
    setFiltered(result);
  }, [activeCategory, search, products]);

  return (
    <div className="min-h-screen flex flex-col mesh-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-sky-200/30 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-200/20 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-sky-100/40 blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="animate-float inline-block">✨</span>
            <span>أفضل المنتجات الرقمية</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 leading-tight mb-6">
            تسوق رقمي{" "}
            <span className="bg-gradient-to-l from-sky-500 to-blue-600 bg-clip-text text-transparent">
              ذكي وسريع
            </span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            اكتشف مئات المنتجات الرقمية عالية الجودة من قوالب وكورسات وأدوات احترافية. 
            احصل على ما تحتاجه فور الشراء.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pr-12 text-lg py-4 shadow-lg shadow-sky-100"
            />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-10">
            {[
              { value: `${products.length}+`, label: "منتج رقمي" },
              { value: "100%", label: "تحميل فوري" },
              { value: "24/7", label: "دعم فني" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-extrabold text-sky-600">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
        {/* Category Filter */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-sky-500 text-white shadow-md shadow-sky-200"
                  : "bg-white text-slate-600 border border-sky-100 hover:border-sky-300 hover:text-sky-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        {loaded && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-700">
              {activeCategory === "الكل" ? "جميع المنتجات" : activeCategory}
              <span className="mr-2 text-sm font-normal text-slate-400">
                ({filtered.length} منتج)
              </span>
            </h2>
          </div>
        )}

        {/* Products Grid */}
        {!loaded ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="h-40 shimmer"></div>
                <div className="p-5 space-y-3">
                  <div className="h-4 shimmer rounded-lg"></div>
                  <div className="h-3 shimmer rounded-lg w-3/4"></div>
                  <div className="h-8 shimmer rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-600 mb-2">لا توجد منتجات</h3>
            <p className="text-slate-400">جرب البحث بكلمة مختلفة أو اختر تصنيفاً آخر</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
