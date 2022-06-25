/** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
// }
module.exports = {
    images: {
        loader: "akamai",
        path: "",
    },
    exportTrailingSlash: true,
    exportPathMap: function () {
        return {
            "/": { page: "/" },
        }
    },
    // nextConfig,
}

// module.exports = nextConfig
