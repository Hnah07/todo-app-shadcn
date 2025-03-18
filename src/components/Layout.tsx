import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto mt-4 flex min-h-screen max-w-screen-sm flex-col px-4 sm:px-0">
      <Header />
      <main className="container mx-auto flex-1 py-4">{children}</main>
    </div>
  );
};

export default Layout;
