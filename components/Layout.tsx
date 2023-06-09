import React from "react";
import Navigation from "./Navigation";

const Layout = ({ children, title }: any) => {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main className="px-10 pt-5 screen-minus-header-footer">
        <h1 className="mb-4 text-5xl font-bold">{title}</h1>
        {children}
      </main>
      <footer className="flex justify-center p-10">
        <p>&copy; {new Date().getFullYear()} - Blog Tool</p>
      </footer>
      <style jsx global>{`
        .screen-minus-header-footer {
          min-height: calc(100vh - 185px);
        }
      `}</style>
    </div>
  );
};

export default Layout;
