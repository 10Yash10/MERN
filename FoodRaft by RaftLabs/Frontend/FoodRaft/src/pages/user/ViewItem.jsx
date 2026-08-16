import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useGetMenuItemByIdQuery } from "../../features/menu/menu";
import Loader, { MiniLoader } from "../../components/layout/Loader";
import { FillButton, UnderlineButton } from "../../components/ui/Button";
import {
  useAddUpdateToCartMutation,
  useGetCartQuery,
} from "../../features/cart/cart";

const ViewItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data = [],
    isLoading,
    isError,
  } = useGetMenuItemByIdQuery(id, {
    skip: !id,
  });

  const { data: cartData = [], isLoading: isCartDataLoading } =
    useGetCartQuery();

  const [addUpdateToCart, { isLoading: isAddingUpdating }] =
    useAddUpdateToCartMutation();

  const filteredCartData =
    cartData.find((val) => val?.productId === id) ?? null;

  const [quantity, setQuantity] = useState(filteredCartData?.quantity ?? 1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAdd = async () => {
    try {
      await addUpdateToCart({
        productId: data._id,
        name: data.name,
        quantity: quantity.toString(),
        price: data.price.toString(),
        isAvailable: data.isAvailable,
      }).unwrap();
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900">
            Item not found
          </h1>

          <p className="text-neutral-500 mt-2">
            The food item you're looking for could not be found.
          </p>

          <FillButton onClick={() => navigate("/menu")} text="Back to Menu" />
        </div>
      </div>
    );
  }

  const item = data;

  return (
    <div className="min-h-screen bg-neutral-50 px-4 pb-8 md:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <UnderlineButton
          onClick={() => navigate("/menu")}
          children={
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://w3.org"
                viewBox="0 0 30 20"
                width="30"
                height="20"
                fill="none"
                stroke="currentColor"
                // stroke-width="1"
                // stroke-linecap="round"
                // stroke-linejoin="round"
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 6L6 12L12 18" />
                <path d="M6 12H34" />
              </svg>
              <p>Back to Menu</p>
            </div>
          }
        />
      </motion.div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute top-5 left-5 z-10">
              <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-neutral-900 shadow-lg">
                {item.category}
              </span>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-neutral-200 aspect-square lg:aspect-[4/4.5]">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                {item.category}
              </span>

              <span className="w-1 h-1 rounded-full bg-neutral-400" />

              <span
                className={`text-xs uppercase tracking-[0.2em] font-medium ${
                  item.isAvailable ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 leading-[1.05]">
              {item.name}
            </h1>

            <div className="mt-6">
              <span className="text-3xl md:text-4xl font-semibold text-neutral-900">
                ${item.price}
              </span>
            </div>

            <div className="w-full h-px bg-neutral-200 my-8" />

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-3">
                Description
              </p>

              <p className="text-lg leading-8 text-neutral-600 max-w-xl">
                {item.description}
              </p>
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-white border border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-400">
                    Quantity
                  </p>

                  <p className="text-sm text-neutral-500 mt-1">
                    Select quantity
                  </p>
                </div>

                <div className="flex items-center border border-neutral-300">
                  <button
                    onClick={handleDecrease}
                    disabled={quantity === 1}
                    className="w-12 h-12 flex items-center justify-center text-xl hover:bg-neutral-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:text-white cursor-pointer"
                  >
                    −
                  </button>

                  <div className="w-14 h-12 flex items-center justify-center border-x border-neutral-300 font-semibold">
                    {quantity}
                  </div>

                  <button
                    onClick={handleIncrease}
                    className="w-12 h-12 flex items-center justify-center text-xl hover:bg-neutral-900 transition-colors hover:text-white cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-400">
                  Total
                </p>

                <p className="text-2xl font-bold text-neutral-900 mt-1">
                  ${item.price * quantity}
                </p>
              </div>

              {/* {filteredCartData ? (
                <FillButton
                  onClick={() => navigate("/cart")}
                  text="View Cart"
                />
              ) : (
                <FillButton onClick={handleAdd} text="Add to Cart" />
                )} */}

              <FillButton
                onClick={handleAdd}
                disabled={isAddingUpdating}
                isLoading={isAddingUpdating}
                text={filteredCartData ? "Update Cart" : "Add to Cart"}
              />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="p-4 rounded-xl bg-white border border-neutral-200">
                <p className="text-lg">🍕</p>
                <p className="text-xs text-neutral-500 mt-2">
                  Freshly Prepared
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-neutral-200">
                <p className="text-lg">⚡</p>
                <p className="text-xs text-neutral-500 mt-2">Quick Delivery</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-neutral-200">
                <p className="text-lg">✓</p>
                <p className="text-xs text-neutral-500 mt-2">Quality Food</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-neutral-200"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Product Information
              </p>

              <p className="text-sm text-neutral-500 mt-2">
                Product ID: {item._id}
              </p>
            </div>

            <div className="text-sm text-neutral-400">
              Added on{" "}
              {new Date(item.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewItem;
