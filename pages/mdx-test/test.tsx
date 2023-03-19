// // pages/mdx-page.tsx
// import React, { ReactNode, ComponentType, HTMLAttributes } from "react";
// import { MDXProvider } from "@mdx-js/react";
// import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
// import { serialize } from "next-mdx-remote/serialize";
// import matter from "gray-matter";
// import { GetStaticProps } from "next";
// import { useState, useEffect, useContext } from "react";
// import { DataContext } from "@/context/DataContext";
// import { getPost } from "@/utils/supabase/sb-utils";

// interface MdxPageProps {
//   mdxSource: MDXRemoteSerializeResult;
// }

// interface MDXComponents {
//   [key: string]: ComponentType<any>;
// }

// const components: MDXComponents = {
//   h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
//     <h1 style={{ color: "red" }} {...props} />
//   ),
//   p: (props: HTMLAttributes<HTMLParagraphElement>) => (
//     <p style={{ fontSize: "18px" }} {...props} />
//   ),
// };

// const MdxPage: React.FC<MdxPageProps> = ({ mdxSource }) => {
//   const dataContext = useContext(DataContext);
//   const [content, setContent] = useState("");
//   return (
//     <MDXProvider components={components}>
//       <MDXRemote {...mdxSource} />
//     </MDXProvider>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const slug = context.params.slug as string;
//   const mdx = await getPost(slug);
//   const mdx0 = mdx && mdx[0];
//   const { content } = matter(mdx0?.content);
//   const mdxSource = await serialize(content);

//   return {
//     props: { mdxSource },
//   };
// };

// export default MdxPage;
