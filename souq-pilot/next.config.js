/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // هيدا السطر بيخلي فيرسيل يتجاهل أخطاء التايب سكريبت ويكمّل بناء
    ignoreBuildErrors: true,
  },
  eslint: {
    // هيدا السطر بيخليه يتجاهل أخطاء التنسيق (Linting)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
