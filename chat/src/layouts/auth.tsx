import React from "react";
import Header from "components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <div className="layout__header">
        <Header />
      </div>
      <main className="layout__page">
        <div className="layout-auth shadow">
          <div className="layout-auth__page">{children}</div>
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
