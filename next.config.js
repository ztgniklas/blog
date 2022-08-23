module.exports = {
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
        ]
    },
    reactStrictMode: true,
    images: {
        loader: "default",
        domains: ["localhost"],
    },
}