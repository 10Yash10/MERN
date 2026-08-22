import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState({ search: "", date: "all" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTime] = useState(() => Date.now());

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message || "Could not load orders.",
        );
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const search = filter.search.toLowerCase();
    const matchesSearch =
      !search ||
      order.customerName.toLowerCase().includes(search) ||
      order.customerEmail.toLowerCase().includes(search);
    if (filter.date === "all") return matchesSearch;
    return (
      matchesSearch &&
      new Date(order.createdAt).getTime() >=
        currentTime - Number(filter.date) * 86400000
    );
  });

  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Activity</p>
        <h1>All orders</h1>
        <p>Search and review every order created.</p>
      </section>
      {error && <div className="alert error">{error}</div>}
      <section className="content-card orders-card">
        <div className="filters">
          <input
            aria-label="Search orders"
            placeholder="Search customer or email"
            value={filter.search}
            onChange={(event) =>
              setFilter({ ...filter, search: event.target.value })
            }
          />
          <select
            aria-label="Filter by date"
            value={filter.date}
            onChange={(event) =>
              setFilter({ ...filter, date: event.target.value })
            }
          >
            <option value="all">All time</option>
            <option value="1">Today</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>
        <div className="order-list">
          {loading ? (
            <p className="empty">Loading orders...</p>
          ) : filteredOrders.length === 0 ? (
            <p className="empty">No matching orders found.</p>
          ) : (
            filteredOrders.map((order) => (
              <article className="order-item" key={order._id}>
                <div>
                  <strong>{order.customerName}</strong>
                  <span>{order.customerEmail}</span>
                </div>
                <div>
                  <span>Quantity</span>
                  <strong>{order.quantity}</strong>
                </div>
                <div>
                  <span>Date</span>
                  <strong>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </strong>
                </div>
                <b>₹{order.totalAmount.toLocaleString("en-IN")}</b>
              </article>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default Orders;
