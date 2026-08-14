import React, { useState } from "react";
import { UnderlineButton } from "./Button";
import { motion } from "motion/react";
import {
  useAddUpdateToCartMutation,
  useRemoveFromCartMutation,
} from "../../features/cart/cart";
import Loader, { MiniLoader } from "../layout/Loader";
import { useEffect } from "react";

const CardRow = ({ cartData, index }) => {
  console.log(cartData);
  const [quantity, setQuantity] = useState(cartData?.quantity);
  const [addUpdateToCart, { isLoading: isAddingUpdating }] =
    useAddUpdateToCartMutation();
  const [removeItem, { isLoading: isRemoving }] = useRemoveFromCartMutation();

  const handleRemove = async () => {
    try {
      const response = await removeItem({ productId: cartData.productId });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleFunction = async () => {
      if (quantity >= 1) {
        try {
          await addUpdateToCart({
            productId: cartData.productId,
            name: cartData.name,
            quantity: quantity.toString(),
            price: cartData.price.toString(),
            isAvailable: cartData.isAvailable,
          });
        } catch (err) {
          console.error(err);
        }
      }
    };

    console.log("useeffect");
    handleFunction();
  }, [quantity]);

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
        {/* <img
          className="w-20 h-20 bg-neutral-900"
          src={cartData.imageUrl}
          alt={cartData.name}
        /> */}
        <div className="w-7 h-20 bg-neutral-900" />
        <div>
          <h1 className="text-lg ">{cartData.name}</h1>
          <h2 className="text-lg ">${cartData.price}</h2>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center">
          <button
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            className="px-4 py-2 border border-neutral-900 cursor-pointer hover:bg-neutral-900 hover:text-white duration-300"
          >
            -
          </button>

          <div className="w-full h-full border-b border-t border-neutral-900">
            <p className="mx-4 py-2 text-sm">{quantity}</p>
          </div>

          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 border border-neutral-900 cursor-pointer hover:bg-neutral-900 hover:text-white duration-300"
          >
            +
          </button>
        </div>

        <UnderlineButton onClick={handleRemove}>
          {isRemoving ? <MiniLoader /> : "remove"}
        </UnderlineButton>
      </div>
    </motion.div>
  );
};

export default CardRow;
