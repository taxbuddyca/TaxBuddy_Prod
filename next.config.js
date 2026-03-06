/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dxjpkgthscrupyzigbxl.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
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
