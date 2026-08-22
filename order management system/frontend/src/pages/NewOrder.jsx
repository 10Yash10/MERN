import { useEffect, useState } from "react";
import axios from "axios";

const initialForm = { name: "", email: "", sku: "", quantity: 1 };

function NewOrder() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get("/api/products?page=1");
        setProducts(response.data);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Could not load products. Check the backend.",
        );
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleChange = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");
    try {
      await axios.post("/api/create-order", {
        ...form,
        quantity: Number(form.quantity),
      });
      setForm(initialForm);
      setMessage("Order placed successfully.");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Could not place the order.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Sales</p>
        <h1>Place an order</h1>
        <p>Create a new order from your available inventory.</p>
      </section>
      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}
      <section className="content-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Customer name
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Yash Sharma"
              required
            />
          </label>
          <label htmlFor="email">
            Email address
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="yash@example.com"
              required
            />
          </label>
          <div className="form-row">
            <label htmlFor="sku">
              Product
              <select
                id="sku"
                name="sku"
                value={form.sku}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">
                  {loading ? "Loading products..." : "Select a product"}
                </option>
                {products.map((product) => (
                  <option
                    key={product._id}
                    value={product.sku}
                    disabled={product.stock < 1}
                  >
                    {product.name} ({product.stock} available)
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="quantity">
              Quantity
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                step="1"
                value={form.quantity}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button
            className="primary-button"
            type="submit"
            disabled={submitting || loading}
          >
            {submitting ? "Placing order..." : "Place order"}
            <span>→</span>
          </button>
        </form>
      </section>
    </>
  );
}

export default NewOrder;
