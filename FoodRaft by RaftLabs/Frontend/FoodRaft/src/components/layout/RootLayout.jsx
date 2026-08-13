import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { UnderlineButton } from "../ui/Button";
import { useGetMeQuery } from "../../features/auth/auth";
import { motion } from "motion/react";
import Loader from "./Loader";
import { useGetCartQuery } from "../../features/cart/cart";

const RootLayout = () => {
  const { data, isLoading } = useGetMeQuery();
  const { data: cartData } = useGetCartQuery();

  //   console.log(cartData.length);

  const [cartCount, setCartCount] = useState(cartData?.length ?? 0);

  const loading = isLoading;
  const name = data?.email?.split("")[0].toUpperCase();

  if (loading) {
    return <Loader />;
  }

  return (
    <motion.div style={{ height: "100vh" }}>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="h-[10vh] w-full bg-neutral-900 flex items-center justify-between px-6 fixed top-0 shadow-lg"
      >
        <motion.h1
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-3xl text-extrabold text-white"
        >
          FoodRaft
        </motion.h1>

        {/* Links */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="w-full h-full flex items-center justify-center gap-6 "
        >
          <UnderlineButton color="white">Menu</UnderlineButton>
          <UnderlineButton color="white">
            <div className="flex gap-2 items-center">
              Cart
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-neutral-900">
                {cartCount}
              </div>
            </div>
          </UnderlineButton>
          <UnderlineButton color="white">Order</UnderlineButton>
        </motion.div>

        {/* Profile */}
        <button className="cursor-pointer hover:scale-110 duration-300">
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="w-7 h-7 rounded-full bg-white flex items-center justify-center"
          >
            <span className="text-lg font-bold font-mono">{name}</span>
          </motion.div>
        </button>
      </motion.nav>

      <main className="h-auto min-h-[90vh] p-6 mt-28">
        <Outlet />
      </main>

      <footer className="w-full h-[50vh] bg-neutral-900 flex flex-col items-center justify-center gap-8">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-white">FoodRaft</h1>
          <p className="text-xl font-extralight text-white">by</p>
          <h2 className="text-xl font-extralight text-white">RaftLabs</h2>
        </div>

        <div className="border-b border-white w-[80%]" />

        <div className="w-full h-auto flex items-center justify-center gap-6 pb-2">
          <UnderlineButton color="white">Privacy Policy</UnderlineButton>
          <UnderlineButton color="white">© Copyright 2026</UnderlineButton>
          <UnderlineButton color="white">Terms & Condition</UnderlineButton>
        </div>
      </footer>
    </motion.div>
  );
};

export default RootLayout;
