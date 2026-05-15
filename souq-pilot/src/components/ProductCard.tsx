"use client";
import Link from "next/link";
import { Product } from "@/lib/storage";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card card overflow-hidden group animate-slide-up">
      {/* Product header */}
      <div className="relative h-40 bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-4 w-16 h-16 rounded-full bg-sky-300"></div>
          <div className="absolute bottom-2 left-4 w-10 h-10 rounded-full bg-blue-300"></div>
        </div>
        <span className="text-6xl animate-float z-10 group-hover:scale-110 transition-transform duration-300">
          {product.emoji}
        </span>
        <div className="absolute top-3 left-3">
          <span className="badge">{product.category}</span>
        </div>
      </div>

      {/* Product content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-slate-800 mb-2 leading-snug line-clamp-2 group-hover:text-sky-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price & Buy */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">السعر</span>
            <span className="text-2xl font-extrabold text-sky-600">
              ${product.price}
            </span>
          </div>
          <Link
            href={`/checkout?id=${product.id}`}
            className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2"
          >
            <span>🛒</span>
            <span>شراء الآن</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
