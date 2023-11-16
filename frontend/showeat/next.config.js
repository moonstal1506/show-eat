/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: ":/path*",
                destination: "https://developers.kakao.com/:path*",
            },
            {
                source: ":/path*",
                destination: "https://dapi.kakao.com/:path*",
            },
        ];
    },
    images: {
        domains: [
            "localhost",
            "s3.ap-northeast-2.amazonaws.com",
            "showeatbucket.s3.ap-northeast-2.amazonaws.com",
            "k.kakaocdn.net",
        ],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};

module.exports = nextConfig;
