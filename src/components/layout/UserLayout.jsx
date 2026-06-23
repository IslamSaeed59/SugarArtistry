import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
