import { Route, Routes } from "react-router";
import UserLayout from "./components/layout/UserLayout";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import ProductDetails from "./pages/ProductDetails";
import OurStory from "./pages/OurStory";
import Journal from "./pages/Journal";
import AdminAddProduct from "./pages/AdminAddProduct";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/story" element={<OurStory />} />
        <Route path="/journal" element={<Journal />} />
        
        {/* Admin Routes */}
        <Route path="/admin/add" element={<AdminAddProduct />} />
        
        {/* Catch-all Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
