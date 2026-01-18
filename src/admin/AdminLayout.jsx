import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import VehicleManager from "./VehicleManager";
import CategoryManager from "./CategoryManager";
import GalleryManager from "./GalleryManager";
import DashboardHome from "./DashboardHome";
import PackagesManager from "./PackagesManager";
import AdminContacts from "./AdminContacts";
import ReviewManager from "./ReviewManager";

export default function AdminLayout() {
  const [active, setActive] = useState("home");

  return (
    <div className="admin-layout">
      <AdminSidebar setActive={setActive} />

      <main className="admin-content">
        {active === "home" && <DashboardHome />}
        {active === "gallery" && <GalleryManager />}
        {active === "vehicles" && <VehicleManager />}
        {active === "categories" && <CategoryManager />}
        {active === "Packages" && <PackagesManager />}
        {active === "Contacts" && <AdminContacts />}
        {active === "reviews" && <ReviewManager />}
      </main>
    </div>
  );
}
