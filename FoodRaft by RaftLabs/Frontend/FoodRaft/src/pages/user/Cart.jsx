import React, { useState } from "react";
import { useGetBillQuery, useGetCartQuery } from "../../features/cart/cart";
import CardRow from "../../components/ui/CardRow";
import { FillButton } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/layout/Loader";
import Drawer from "../../components/layout/Drawer";

const Cart = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { data: cartData = [], isLoading: isCartDataLoading } =
    useGetCartQuery();
  const { data: billData = [], isLoading: isBillDataLoading } =
    useGetBillQuery();

  const isLoading = isCartDataLoading || isBillDataLoading;

  const handleAddress = (addressData) => {};
  return (
    <div>
      <Drawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleAddress={handleAddress}
        id={cartData.length > 0 ? cartData[0]?.userId : null}
      />
      {isLoading && <Loader />}
      {cartData?.length > 0 ? (
        <div className="w-full flex justify-between sticky top-[10vh] bg-white border-b border-b-netural-900 py-3 z-20">
          <div>
            <h1 className="text-xl">Total: ${billData.total}/-</h1>
            <div className="flex gap-3 flex-wrap">
              <p className="text-neutral-800 text-xs">
                SubTotal: ${billData.subTotal}/-
              </p>
              <p className="text-neutral-800 text-xs">
                Tax: ${billData.tax}/- {"(7%)"}
              </p>
              <p className="text-neutral-800 text-xs">
                Delivery Fee: ${billData.deliveryFee}/-
              </p>
              <p className="text-neutral-800 text-xs">
                Discount: ${billData.discount}/-
              </p>
            </div>
          </div>
          <FillButton onClick={() => setIsOpen(!isOpen)} text="Checkout" />
        </div>
      ) : (
        <p className="text-center">Cart is Empty</p>
      )}

      <div className="h-6" />

      {cartData?.map((item, index) => (
        <CardRow cartData={item} index={index} />
      ))}

      <div className="flex flex-col items-center gap-6 mt-24">
        <h1 className="text-7xl">forgetting Something?</h1>

        <FillButton onClick={() => navigate("/menu")} text="Add More" />
      </div>
    </div>
  );
};

export default Cart;
