/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.(mov|mp4|webm|html)$/,
  //     use: [
  //       {
  //         loader: "file-loader",
  //         options: {
  //           publicPath: "/_next/static/videos/",
  //           outputPath: "static/videos/",
  //           name: "[name].[hash].[ext]",
  //           esModule: false,
  //         },
  //       },
  //       {
  //         loader: "html-loader",
  //         options: { minimize: true },
  //       },
  //     ],
  //   });
  //   config.resolve.fallback = {
  //     // if you miss it, all the other options in fallback, specified
  //     // by next.js will be dropped.
  //     ...config.resolve.fallback,
  //     child_process: false, // the solution
  //     fs: false, // the solution
  //   };

  //   return config;
  // },
};

export default nextConfig;
