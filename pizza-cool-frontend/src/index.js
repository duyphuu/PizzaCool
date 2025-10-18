import React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <AppRouter />
    </CartProvider>
  </AuthProvider>
);
