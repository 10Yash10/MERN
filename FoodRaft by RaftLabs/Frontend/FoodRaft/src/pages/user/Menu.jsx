import React, { useEffect, useMemo, useState } from "react";
import { useGetMenuQuery } from "../../features/menu/menu";
import Loader from "../../components/layout/Loader";
import Card from "../../components/ui/Card";

import {
  useAddUpdateToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../../features/cart/cart";

const Menu = () => {
  const { data, isLoading } = useGetMenuQuery();

  const { data: cartData = [] } = useGetCartQuery();

  const [addUpdateToCart] = useAddUpdateToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const [loadingOperation, setLoadingOperation] = useState(null);
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    if (!loadingOperation) return;

    const { productId, type, quantity } = loadingOperation;

    const cartItem = cartData.find((item) => item.productId === productId);

    if (type === "add" && cartItem) {
      setLoadingOperation(null);
      return;
    }

    if (
      type === "update" &&
      cartItem &&
      Number(cartItem.quantity) === Number(quantity)
    ) {
      setLoadingOperation(null);
      return;
    }

    if (type === "remove" && !cartItem) {
      setLoadingOperation(null);
    }
  }, [cartData, loadingOperation]);

  const handleAddUpdateToCart = async (cardData) => {
    setLoadingOperation({
      productId: cardData.productId,
      type: "add",
      quantity: cardData.quantity,
    });

    try {
      await addUpdateToCart({
        productId: cardData.productId,
        name: cardData.name,
        quantity: cardData.quantity.toString(),
        price: cardData.price.toString(),
        isAvailable: true,
      }).unwrap();
    } catch (err) {
      console.error("Failed to add product:", err);
      setLoadingOperation(null);
    }
  };

  const handleQuantityUpdate = async ({ productId, name, price, quantity }) => {
    setLoadingOperation({
      productId,
      type: "update",
      quantity,
    });

    try {
      await addUpdateToCart({
        productId,
        name,
        quantity: quantity.toString(),
        price: price.toString(),
        isAvailable: true,
      }).unwrap();
    } catch (err) {
      console.error("Failed to update quantity:", err);
      setLoadingOperation(null);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    setLoadingOperation({
      productId,
      type: "remove",
    });

    try {
      await removeFromCart({
        productId,
      }).unwrap();
    } catch (err) {
      console.error("Failed to remove product:", err);
      setLoadingOperation(null);
    }
  };

  const isProductLoading = (productId) => {
    return loadingOperation?.productId === productId;
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex justify-center mb-10">
        <div className="w-full max-w-xl relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for food..."
            className="w-full border border-neutral-900 px-5 py-3 pr-12 outline-none focus:bg-neutral-100 duration-300"
          />

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
                isLoading={isProductLoading(item._id)}
                handleAddUpdateToCart={handleAddUpdateToCart}
                handleQuantityUpdate={handleQuantityUpdate}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            ),
        )}
      </div>

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
    </div>
  );
};

export default Menu;
