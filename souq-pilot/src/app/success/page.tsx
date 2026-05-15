"use client";
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-sky-500">تمت العملية بنجاح!</h1>
      <p className="mt-4 text-gray-600">شكراً لك، سيصلك المنتج الرقمي قريباً عبر البريد.</p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">جاري التحميل...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
