import * as React from 'react';
import NavWrapper from "../components/navWrapper";
import { Outlet } from 'react-router-dom'
import FooterWrapper from "../components/footerWrapper";

export interface ILayoutPageProps {
}

export default function LayoutPage (props: ILayoutPageProps) {
  return (
      <div className="container mx-auto">
          <NavWrapper />
          <Outlet />
          <FooterWrapper />
      </div>
  );
}
