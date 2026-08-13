import React from "react";
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

  const navigate = useNavigate();

  // -----------------------------------------
  // ADD PRODUCT
  // -----------------------------------------

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

  // -----------------------------------------
  // UPDATE QUANTITY
  // -----------------------------------------

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

  // -----------------------------------------
  // REMOVE PRODUCT
  // -----------------------------------------

  const handleRemoveFromCart = async (productId) => {
    try {
      // console.log("Removing product:", productId);

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

      <div className="flex justify-center gap-6 flex-wrap">
        {data?.map(
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
