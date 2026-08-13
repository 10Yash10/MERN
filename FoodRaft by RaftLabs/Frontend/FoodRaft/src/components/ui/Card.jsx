import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const Card = ({
  image,
  name,
  description,
  price,
  u_key,
  index,
  cartData = [],
  handleAddUpdateToCart,
  handleQuantityUpdate,
  handleRemoveFromCart,
}) => {
  // Find this product in cart
  const cartItem = cartData.find((item) => item.productId === u_key);

  // Get quantity from cart
  const quantityFetched = cartItem?.quantity;

  // Local quantity state
  const [quantity, setQuantity] = useState(quantityFetched || 1);

  // Sync local quantity with cart data
  useEffect(() => {
    if (quantityFetched !== undefined) {
      setQuantity(Number(quantityFetched));
    }
  }, [quantityFetched]);

  const productIdsInCart = cartData.map((item) => item.productId);

  // -----------------------------------------
  // INCREASE QUANTITY
  // -----------------------------------------

  const handleIncrease = () => {
    const newQuantity = quantity + 1;

    setQuantity(newQuantity);

    handleQuantityUpdate({
      productId: u_key,
      name,
      price,
      quantity: newQuantity,
    });
  };

  // -----------------------------------------
  // DECREASE / REMOVE
  // -----------------------------------------

  const handleDecrease = () => {
    // If quantity is 1,
    // remove the product completely from cart
    if (quantity === 1) {
      handleRemoveFromCart(u_key);
      return;
    }

    // Otherwise decrease quantity
    const newQuantity = quantity - 1;

    setQuantity(newQuantity);

    handleQuantityUpdate({
      productId: u_key,
      name,
      price,
      quantity: newQuantity,
    });
  };

  return (
    <motion.div
      key={u_key}
      className="border border-neutral-900 w-76 min-h-96 h-auto flex flex-col"
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      viewport={{ once: true }}
      key={cartData.productId}
    >
      <img
        className="w-full h-[70%] bg-yellow-500 object-fill"
        src={image}
        alt={name}
      />

      <div className="w-full h-auto bg-neutral-900 text-white flex flex-col p-4">
        <h1 className="text-xl">{name}</h1>

        <p className="text-sm text-white/70">{description}</p>

        <div className="flex items-center justify-between">
          <h1 className="text-xl">${price}</h1>

          {productIdsInCart.includes(u_key) ? (
            <div className="flex items-center">
              <button
                onClick={handleDecrease}
                className="px-4 py-2 border border-white cursor-pointer hover:bg-white/30 duration-300"
              >
                -
              </button>

              <div className="w-full h-full border-b border-t border-white">
                <p className="mx-4 py-2">{quantity}</p>
              </div>

              <button
                onClick={handleIncrease}
                className="px-4 py-2 border border-white cursor-pointer hover:bg-white/30 duration-300"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                handleAddUpdateToCart({
                  productId: u_key,
                  name,
                  quantity,
                  price,
                })
              }
              className="px-4 py-2 border border-white cursor-pointer hover:bg-white/30 duration-300"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
