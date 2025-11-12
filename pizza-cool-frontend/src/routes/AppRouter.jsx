import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Promo from "../pages/Promo";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProductDetailPage from "../pages/ProductDetailPage";
function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
