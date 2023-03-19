module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
};

// // next.config.js
// const withMDX = require("@next/mdx")({
//   extension: /\.mdx?$/,
// });

// module.exports = withMDX({
//   reactStrictMode: true,
//   pageExtensions: ["js", "jsx", "md", "mdx"],

//   webpack(config, options) {
//     // Modify the `config` object as needed
//     return config;
//   },

//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers: [
//           {
//             key: "X-Content-Type-Options",
//             value: "nosniff",
//           },
//         ],
//       },
//     ];
//   },

//   async rewrites() {
//     return [
//       {
//         source: "/about",
//         destination: "/about-us", // Rewrite '/about' to '/about-us'
//       },
//     ];
//   },

//   async redirects() {
//     return [
//       {
//         source: "/old-path",
//         destination: "/new-path", // Redirect from '/old-path' to '/new-path'
//         permanent: true,
//       },
//     ];
//   },
// });
