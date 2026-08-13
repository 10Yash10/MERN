import React, { useState } from "react";
import { UnderlineButton } from "./Button";
import { motion } from "motion/react";
import { useRemoveFromCartMutation } from "../../features/cart/cart";

const CardRow = ({ cartData, index }) => {
  const [quantity, setQuantity] = useState(cartData?.quantity);
  const [removeItem, { isLoading: isRemoving }] = useRemoveFromCartMutation();

  const handleRemove = async () => {
    try {
      const response = await removeItem({ productId: cartData.productId });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: index <= 6 ? index * 0.1 : 0.3, duration: 0.7 }}
      viewport={{ once: true }}
      key={cartData.productId}
      className="flex items-center justify-between border-b border-b-neutral-900 mb-6"
    >
      <div className="flex items-center gap-4">
        <img
          className="w-20 h-20 bg-neutral-900"
          src={cartData.imageUrl}
          alt={cartData.name}
        />
        <div>
          <h1 className="text-lg ">{cartData.name}</h1>
          <h2 className="text-lg ">${cartData.price}</h2>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center">
          <button
            //   onClick={handleDecrease}
            className="px-4 py-2 border border-neutral-900 cursor-pointer hover:bg-neutral-900 hover:text-white duration-300"
          >
            -
          </button>

          <div className="w-full h-full border-b border-t border-neutral-900">
            <p className="mx-4 py-2 text-sm">{quantity}</p>
          </div>

          <button
            //   onClick={handleIncrease}
            className="px-4 py-2 border border-neutral-900 cursor-pointer hover:bg-neutral-900 hover:text-white duration-300"
          >
            +
          </button>
        </div>

        <UnderlineButton onClick={handleRemove}>remove</UnderlineButton>
      </div>
    </motion.div>
  );
};

export default CardRow;
