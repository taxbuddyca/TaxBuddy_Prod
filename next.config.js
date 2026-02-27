/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/blog/:slug*.html',
                destination: '/blog/:slug*',
                permanent: true,
            },
            {
                source: '/industries/ecommerce-tax-accounting',
                destination: '/industries/ecommerce',
                permanent: true,
            },
        ];
    },
}

export default nextConfig
