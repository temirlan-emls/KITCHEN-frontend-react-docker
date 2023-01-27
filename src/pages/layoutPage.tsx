import * as React from 'react';
import Nav  from "../components/nav";
import Footer from "../components/footer";
import { Outlet } from 'react-router-dom'

export interface ILayoutPageProps {
}

export default function LayoutPage (props: ILayoutPageProps) {
  return (
      <div className="container mx-auto h-screen">
          <Nav />
          <Outlet />
          <Footer />
      </div>
  );
}
