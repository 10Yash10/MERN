import { useState } from "react";
import "./App.css";
import NewOrder from "./pages/NewOrder.jsx";
import UpdateStock from "./pages/UpdateStock.jsx";
import Orders from "./pages/Orders.jsx";

function App() {
  const [route, setRoute] = useState("order");

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="logo">OM</span>
          <span>Order management</span>
        </div>
        <nav aria-label="Main navigation">
          <button
            className={route === "order" ? "nav-link active" : "nav-link"}
            onClick={() => setRoute("order")}
          >
            New order
          </button>
          <button
            className={route === "stock" ? "nav-link active" : "nav-link"}
            onClick={() => setRoute("stock")}
          >
            Update stock
          </button>
          <button
            className={route === "orders" ? "nav-link active" : "nav-link"}
            onClick={() => setRoute("orders")}
          >
            All orders
          </button>
        </nav>
      </header>
      {route === "order" && <NewOrder />}
      {route === "stock" && <UpdateStock />}
      {route === "orders" && <Orders />}
    </main>
  );
}

export default App;
