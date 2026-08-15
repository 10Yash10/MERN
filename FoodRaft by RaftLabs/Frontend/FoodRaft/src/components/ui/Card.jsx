import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { MiniLoader } from "../layout/Loader";
import { useNavigate } from "react-router-dom";

const Card = ({
  image,
  name,
  description,
  price,
  u_key,
  index,
  isLoading,
  cartData = [],
  handleAddUpdateToCart,
  handleQuantityUpdate,
  handleRemoveFromCart,
}) => {
  const navigate = useNavigate();
  const cartItem = cartData.find((item) => item.productId === u_key);

  const quantityFetched = cartItem?.quantity;
  const timerRef = useRef(null);

  const [quantity, setQuantity] = useState(
    quantityFetched !== undefined ? Number(quantityFetched) : 1,
  );

  useEffect(() => {
    if (quantityFetched !== undefined) {
      setQuantity(Number(quantityFetched));
    }
  }, [quantityFetched]);

  // const isInCart = Boolean(cartItem);
  const [isInCart, setIsInCart] = useState(Boolean(cartItem));

  const debouncedApiRequest = (nextQuantity) => {
    console.log(nextQuantity);
    if (timerRef.current) {
      // here we are clearing the previous pending api for calling upon click of increase or decrease
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      handleQuantityUpdate({
        productId: u_key,
        name,
        price,
        quantity: nextQuantity,
      });
    }, 500); // delay passing the data by 500 milli seconds
  };

  // clear timerRef

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleIncrease = (e) => {
    e.stopPropagation();
    if (isLoading) return;

    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    debouncedApiRequest(newQuantity);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (isLoading) return;

    if (quantity === 1) {
      setIsInCart(false);
      handleRemoveFromCart(u_key);
      return;
    }

    const newQuantity = quantity - 1;
    setQuantity(newQuantity);

    debouncedApiRequest(newQuantity);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    if (isLoading) return;

    setIsInCart(true);

    handleAddUpdateToCart({
      productId: u_key,
      name,
      quantity,
      price,
    });
  };

  return (
    <motion.div
      aria-label="button"
      onClick={() => navigate(`/menu/${u_key}`)}
      className="border border-neutral-900 w-76 min-h-96 h-auto flex flex-col group cursor-pointer hover:-translate-y-1 hover:shadow-sm hover:shadow-black duration-300"
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="w-full h-[70%] overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-125 duration-300"
          src={image}
          alt={name}
        />
      </div>

      <div className="w-full h-auto bg-neutral-900 text-white flex flex-col p-4">
        <h1 className="text-xl">{name}</h1>

        <p className="text-sm text-white/70">{description}</p>

        <div className="flex items-center justify-between gap-4 mt-3">
          <h1 className="text-xl">${price}</h1>

          {isInCart ? (
            <div
              className="flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                disabled={isLoading}
                onClick={handleDecrease}
                className="h-10 w-10 border border-white cursor-pointer hover:bg-white/30 duration-300  disabled:cursor-not-allowed"
              >
                -
              </button>

              <div className="h-10 w-10 min-w-12 border-b border-t border-white flex items-center justify-center">
                <p className="px-3 py-2">
                  {isLoading ? (
                    <div className="py-1">
                      <MiniLoader theme="dark" />
                    </div>
                  ) : (
                    quantity
                  )}
                </p>
              </div>

              <button
                disabled={isLoading}
                onClick={handleIncrease}
                className="h-10 w-10 border border-white cursor-pointer hover:bg-white/30 duration-300  disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          ) : (
            <button
              disabled={isLoading}
              onClick={handleAdd}
              className="min-w-20 h-10 px-4 py-2 border border-white flex items-center justify-center cursor-pointer hover:bg-white/30 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <MiniLoader theme="dark" /> : "Add"}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
