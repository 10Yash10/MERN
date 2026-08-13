import React, { useMemo, useState } from "react";
import { useLogoutMutation } from "../../features/auth/auth";
import { useNavigate } from "react-router-dom";
import { useGetMenuQuery } from "../../features/menu/menu";
import Loader from "../../components/layout/Loader";
import Card from "../../components/ui/Card";

import {
  useAddUpdateToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../../features/cart/cart";

const Menu = () => {
  const [logout] = useLogoutMutation();

  const { data, isLoading } = useGetMenuQuery();

  const { data: cartData = [] } = useGetCartQuery();

  const [addUpdateToCart, { isLoading: isAddingUpdating }] =
    useAddUpdateToCartMutation();

  const [removeFromCart, { isLoading: isRemoving }] =
    useRemoveFromCartMutation();

  // SEARCH STATE

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // FILTER MENU

  const filteredMenu = useMemo(() => {
    if (!data) return [];

    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return data;
    }

    return data.filter((item) => {
      const name = item.name?.toLowerCase() || "";
      const description = item.description?.toLowerCase() || "";

      return name.includes(searchValue) || description.includes(searchValue);
    });
  }, [data, search]);

  // ADD PRODUCT

  const handleAddUpdateToCart = async (cardData) => {
    try {
      const res = await addUpdateToCart({
        productId: cardData.productId,
        name: cardData.name,
        quantity: cardData.quantity.toString(),
        price: cardData.price.toString(),
        isAvailable: true,
      }).unwrap();

      // console.log("Product added:", res);
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  // UPDATE QUANTITY

  const handleQuantityUpdate = async ({ productId, name, price, quantity }) => {
    try {
      const res = await addUpdateToCart({
        productId,
        name,
        quantity: quantity.toString(),
        price: price.toString(),
        isAvailable: true,
      }).unwrap();

      // console.log("Quantity updated:", res);
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  // REMOVE PRODUCT

  const handleRemoveFromCart = async (productId) => {
    try {
      const res = await removeFromCart({
        productId,
      }).unwrap();

      // console.log("Product removed:", res);
    } catch (err) {
      console.error("Failed to remove product:", err);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}

      {/* SEARCH */}

      <div className="w-full flex justify-center mb-10">
        <div className="w-full max-w-xl relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for food..."
            className="w-full border border-neutral-900 px-5 py-3 pr-12 outline-none focus:bg-neutral-100 duration-300"
          />

          {/* Search Icon */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.5-4.5m0 0A7.5 7.5 0 1 0 6 6a7.5 7.5 0 0 0 10.5 10.5Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* MENU */}

      <div className="flex justify-center gap-6 flex-wrap">
        {filteredMenu.map(
          (item, index) =>
            item.isAvailable && (
              <Card
                key={item._id}
                u_key={item._id}
                image={item.imageUrl}
                name={item.name}
                price={item.price}
                description={item.description}
                index={index}
                cartData={cartData}
                handleAddUpdateToCart={handleAddUpdateToCart}
                handleQuantityUpdate={handleQuantityUpdate}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            ),
        )}
      </div>

      {/* ----------------------------------------- */}
      {/* NO RESULTS */}
      {/* ----------------------------------------- */}

      {!isLoading && filteredMenu.length === 0 && (
        <div className="w-full flex justify-center mt-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-900">
              No food found
            </h2>

            <p className="text-neutral-500 mt-2">
              Try searching for something else.
            </p>
          </div>
        </div>
      )}

      {/* Logout */}

      {/*
      <button
        onClick={async () => {
          await logout().unwrap();
          navigate("/login", { replace: true });
        }}
      >
        logout
      </button>
      */}
    </div>
  );
};

export default Menu;
