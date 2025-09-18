import React from "react";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "./Navbar"; // Navbar khusus admin

export default function AdminLayout() {
  return (
    <>
      <NavbarAdmin />
      <Outlet />
    </>
  );
}
