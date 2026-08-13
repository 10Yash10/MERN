import { Routes, Route } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./components/routes/RouteGuard";
import Login from "./pages/auth/Login";
import Menu from "./pages/user/Menu";
import Cart from "./pages/user/Cart";
import RootLayout from "./components/layout/RootLayout";
import Order from "./pages/user/Order";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<RootLayout />}>
        <Route element={<PrivateRoutes />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
        </Route>
      </Route>

      <Route path="*" element={<div>not found</div>} />
    </Routes>
  );
}

export default App;
