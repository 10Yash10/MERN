import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UnderlineButton } from "../ui/Button";
import { useGetMeQuery, useLogoutMutation } from "../../features/auth/auth";
import { motion, AnimatePresence } from "motion/react";
import Loader from "./Loader";
import { useGetCartQuery } from "../../features/cart/cart";
import { useGetOrdersByIdQuery } from "../../features/order/order";

const RootLayout = () => {
  const { data, isLoading } = useGetMeQuery();
  const { data: cartData } = useGetCartQuery();
  const { data: orderData } = useGetOrdersByIdQuery();

  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  // -----------------------------------------
  // PROFILE DROPDOWN STATE

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // CLOSE PROFILE WHEN CLICKING OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // LOGOUT

  const handleLogout = async () => {
    try {
      await logout().unwrap();

      setIsProfileOpen(false);

      navigate("/login", {
        replace: true,
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

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
        transition={{
          delay: 0.3,
          duration: 0.7,
        }}
        className="h-[10vh] w-full bg-neutral-900 flex items-center justify-between px-6 fixed top-0 shadow-lg z-50"
      >
        {/* LOGO */}

        <motion.h1
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.4,
          }}
          className="text-3xl text-extrabold text-white"
        >
          FoodRaft
        </motion.h1>

        {/* LINKS */}

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.7,
            duration: 0.4,
          }}
          className="w-full h-full flex items-center justify-center gap-6"
        >
          <UnderlineButton onClick={() => navigate("/menu")} color="white">
            Menu
          </UnderlineButton>

          <UnderlineButton onClick={() => navigate("/cart")} color="white">
            <div className="flex gap-2 items-center">
              Cart
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-neutral-900 text-xs">
                {cartData?.length ?? 0}
              </div>
            </div>
          </UnderlineButton>

          <UnderlineButton onClick={() => navigate("/order")} color="white">
            <div className="flex gap-2 items-center">
              Order
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-neutral-900 text-xs">
                {orderData?.length ?? 0}
              </div>
            </div>
          </UnderlineButton>
        </motion.div>

        {/* PROFILE */}

        <div ref={profileRef} className="relative">
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="cursor-pointer hover:scale-110 duration-300"
          >
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.7,
                duration: 0.4,
              }}
              className="w-7 h-7 rounded-full bg-white flex items-center justify-center"
            >
              <span className="text-lg font-bold font-mono">{name}</span>
            </motion.div>
          </button>

          {/* PROFILE DROPDOWN */}

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="absolute right-0 top-12 w-52 bg-white border border-neutral-900 shadow-xl overflow-hidden"
              >
                {/* Profile */}
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full px-5 py-3 text-left text-neutral-900 hover:bg-neutral-900 hover:text-white duration-200 cursor-pointer"
                >
                  Profile
                </button>

                {/* Settings */}
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/settings");
                  }}
                  className="w-full px-5 py-3 text-left text-neutral-900 hover:bg-neutral-900 hover:text-white duration-200 cursor-pointer"
                >
                  Settings
                </button>

                {/* Orders */}
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/order");
                  }}
                  className="w-full px-5 py-3 text-left text-neutral-900 hover:bg-neutral-900 hover:text-white duration-200 cursor-pointer"
                >
                  Orders
                </button>

                {/* Divider */}
                <div className="border-t border-neutral-200" />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full px-5 py-3 text-left text-red-600 hover:bg-red-600 hover:text-white duration-200 cursor-pointer"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* MAIN */}

      <main className="h-auto min-h-[90vh] p-6 mt-20">
        <Outlet />
      </main>

      {/* FOOTER */}

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
