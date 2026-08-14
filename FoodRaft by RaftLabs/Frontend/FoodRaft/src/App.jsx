import { Routes, Route } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./components/routes/RouteGuard";
import Login from "./pages/auth/Login";
import Menu from "./pages/user/Menu";
import Cart from "./pages/user/Cart";
import RootLayout from "./components/layout/RootLayout";
import Order from "./pages/user/Order";
import ViewItem from "./pages/user/ViewItem";
import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";
import NotFound from "./pages/NotFound";

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
          <Route path="/menu/:id" element={<ViewItem />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
