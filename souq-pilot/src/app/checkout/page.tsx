"use client";
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CheckoutContent() {
  const searchParams = useSearchParams();
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-sky-500">إتمام الدفع</h1>
      <p className="text-gray-600">يرجى الانتظار لتأكيد تفاصيل طلبك...</p>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">جاري تجهيز صفحة الدفع...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
