import { Routes, Route } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./components/routes/RouteGuard";
import Login from "./pages/auth/Login";
import Menu from "./pages/user/Menu";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import RootLayout from "./components/layout/RootLayout";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<RootLayout />}>
        <Route element={<PrivateRoutes />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
