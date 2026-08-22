import { useEffect, useState } from "react";
import axios from "axios";

const initialForm = { sku: "", newStock: 1 };

function UpdateStock() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadProducts = async () => {
    const response = await axios.get("/api/products?page=1");
    setProducts(response.data);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await loadProducts();
      } catch (requestError) {
        setError(
          requestError.response?.data?.message || "Could not load products.",
        );
      } finally {
        setLoading(false);
      }
    };
    loadData();
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
      await axios.patch("/api/update-stock", {
        sku: form.sku,
        newStock: Number(form.newStock),
      });
      await loadProducts();
      setForm(initialForm);
      setMessage("Product stock updated successfully.");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Could not update stock.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Inventory</p>
        <h1>Update product stock</h1>
        <p>Keep your product quantities accurate and up to date.</p>
      </section>
      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}
      <section className="content-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="stock-sku">
            Product
            <select
              id="stock-sku"
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
                <option key={product._id} value={product.sku}>
                  {product.name} · {product.sku} · {product.stock} units
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="newStock">
            Units to add
            <input
              id="newStock"
              name="newStock"
              type="number"
              min="1"
              step="1"
              value={form.newStock}
              onChange={handleChange}
              required
            />
          </label>
          <button
            className="primary-button"
            type="submit"
            disabled={submitting || loading}
          >
            {submitting ? "Updating stock..." : "Update stock"}
            <span>＋</span>
          </button>
        </form>
        <div className="stock-list">
          {products.map((product) => (
            <div className="stock-item" key={product._id}>
              <span>
                {product.name}
                <small>{product.sku}</small>
              </span>
              <strong>{product.stock} units</strong>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default UpdateStock;
