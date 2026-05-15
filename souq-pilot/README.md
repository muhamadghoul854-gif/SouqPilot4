# 🚀 Souq Pilot - سوق بايلوت

منصة متخصصة في بيع المنتجات الرقمية مبنية بـ Next.js 14 + Tailwind CSS.

## 📁 هيكل المجلدات

```
souq-pilot/
├── src/
│   ├── app/
│   │   ├── page.tsx          # الصفحة الرئيسية
│   │   ├── layout.tsx        # Layout عام
│   │   ├── globals.css       # CSS عام
│   │   ├── admin/page.tsx    # لوحة التحكم
│   │   ├── checkout/page.tsx # صفحة الشراء
│   │   └── success/page.tsx  # صفحة النجاح
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ProductCard.tsx
│   └── lib/
│       └── storage.ts        # إدارة LocalStorage
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── next.config.js
```

## 🛠 تشغيل محلي

```bash
npm install
npm run dev
```

## 🚀 الرفع على Vercel

### الطريقة 1: عبر Vercel CLI
```bash
npm i -g vercel
vercel
```

### الطريقة 2: عبر GitHub
1. ارفع المشروع على GitHub
2. اذهب إلى vercel.com وسجّل دخول
3. اضغط "New Project" واختر المستودع
4. اضغط "Deploy" — بدون أي إعدادات إضافية!

## ✨ الصفحات

| الصفحة | الرابط |
|--------|--------|
| الرئيسية | `/` |
| الشراء | `/checkout?id=PRODUCT_ID` |
| نجاح الشراء | `/success` |
| لوحة التحكم | `/admin` |

## 🔧 إضافة منتجات
اذهب إلى `/admin` ← تبويب "إضافة منتج" وأدخل:
- اسم المنتج
- الوصف  
- السعر
- رابط التحميل (Google Drive / Dropbox / رابط مباشر)
- التصنيف والأيقونة
