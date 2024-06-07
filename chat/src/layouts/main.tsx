import React from "react";
import Header from "components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <div className="layout__header">
        <Header />
      </div>
      <main className="layout__page">{children}</main>
    </div>
  );
}

export default MainLayout;
