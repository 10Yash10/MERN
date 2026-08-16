import React, { use, useState } from "react";
import { motion } from "motion/react";
import {
  useCancelOrderMutation,
  useGetOrdersByIdQuery,
} from "../../features/order/order";
import Loader from "../../components/layout/Loader";
import { UnderlineButton } from "../../components/ui/Button";
import { mapStatus } from "../../utils/mapStatus";

const Order = () => {
  const { data: orders = [], isLoading, isError } = useGetOrdersByIdQuery();
  const [cancelOrder, { isLoading: isCancellingOrder }] =
    useCancelOrderMutation();
  const [showCancel, setShowCancel] = useState();

  // FORMAT DATE

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCancel = async (orderId) => {
    try {
      await cancelOrder({ orderId });
    } catch (err) {
      console.error(err);
    }
  };

  // LOADING

  if (isLoading) {
    return <Loader />;
  }

  // ERROR

  if (isError) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900">
            Something went wrong
          </h1>

          <p className="mt-2 text-neutral-500">We couldn't load your orders.</p>
        </div>
      </div>
    );
  }

  // EMPTY ORDERS

  if (!orders.length) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-neutral-900">
            No Orders Yet
          </h1>

          <p className="mt-3 text-neutral-500">
            Your delicious orders will appear here.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto pb-20">
      {/* PAGE HEADER */}

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-5xl font-extrabold text-neutral-900">
          Your Orders
        </h1>

        <p className="mt-2 text-neutral-500">
          Track your previous orders and their details.
        </p>
      </motion.div>

      {/* ORDERS */}

      <div className="flex flex-col gap-8">
        {orders.map((order, index) => (
          <div key={order._id}>
            {/* cancel order button */}
            {order?.status === "RECEIVED" && (
              <div
                className="mb-2"
                // key={order._id}
              >
                <UnderlineButton
                  isLoading={isCancellingOrder}
                  onClick={() => handleCancel(order.orderId)}
                >
                  {isCancellingOrder ? "cancelling..." : "cancel order"}
                </UnderlineButton>
              </div>
            )}

            <motion.div
              // key={order._id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              className="w-full border border-neutral-900 bg-white"
            >
              {/* ORDER HEADER */}

              <div className="bg-neutral-900 text-white p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">
                    Order ID
                  </p>

                  <h2 className="text-xl font-bold mt-1">{order.orderId}</h2>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/50">
                      Ordered On
                    </p>

                    <p className="text-sm mt-1">
                      {formatDate(order.createdAt)}
                    </p>

                    <p className="text-xs text-white/50">
                      {formatTime(order.createdAt)}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="px-4 py-2 border border-white">
                    <span className="text-sm font-semibold">
                      {mapStatus(order.status).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* ORDER CONTENT */}

              <div className="p-6">
                {/* ITEMS */}

                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">
                    Items
                  </h3>

                  <div className="flex flex-col">
                    {order.cartItems?.map((item, itemIndex) => (
                      <motion.div
                        key={`${order._id}-${item.productId}`}
                        initial={{
                          opacity: 0,
                          x: -15,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: index * 0.1 + itemIndex * 0.05,
                          duration: 0.3,
                        }}
                        className={`flex items-center justify-between py-4 ${
                          itemIndex !== order.cartItems.length - 1
                            ? "border-b border-neutral-200"
                            : ""
                        }`}
                      >
                        {/* Product */}
                        <div>
                          <h4 className="font-semibold text-neutral-900">
                            {item.name}
                          </h4>

                          <p className="text-sm text-neutral-500 mt-1">
                            ₹{Number(item.price).toFixed(2)} × {item.quantity}
                          </p>
                        </div>

                        {/* Total */}
                        <div className="text-right">
                          <p className="font-bold text-neutral-900">
                            ₹
                            {(
                              Number(item.price) * Number(item.quantity)
                            ).toFixed(2)}
                          </p>

                          <p className="text-xs text-neutral-400">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* BOTTOM SECTION */}

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* DELIVERY DETAILS */}

                  <div className="border border-neutral-200 p-5">
                    <h3 className="text-xl font-bold text-neutral-900 mb-5">
                      Delivery Details
                    </h3>

                    <div className="flex flex-col gap-3 text-sm">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-neutral-400">
                          Name
                        </p>

                        <p className="font-medium mt-1">
                          {order.deliveryDetails?.name}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-neutral-400">
                          Phone
                        </p>

                        <p className="font-medium mt-1">
                          {order.deliveryDetails?.phone}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-neutral-400">
                          Address
                        </p>

                        <p className="font-medium mt-1">
                          {order.deliveryDetails?.address?.line1}
                        </p>

                        {order.deliveryDetails?.address?.line2 && (
                          <p className="font-medium">
                            {order.deliveryDetails.address.line2}
                          </p>
                        )}

                        <p className="font-medium">
                          {order.deliveryDetails?.address?.city},{" "}
                          {order.deliveryDetails?.address?.state}
                        </p>

                        <p className="font-medium">
                          PIN - {order.deliveryDetails?.address?.postalCode}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* BILL */}

                  <div className="border border-neutral-200 p-5">
                    <h3 className="text-xl font-bold text-neutral-900 mb-5">
                      Bill Details
                    </h3>

                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-500">Subtotal</span>

                        <span className="font-medium">
                          ₹{Number(order.pricing?.subTotal).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-500">Delivery Fee</span>

                        <span className="font-medium">
                          ₹{Number(order.pricing?.deliveryFee).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-500">GST</span>

                        <span className="font-medium">
                          ₹{Number(order.pricing?.tax).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-500">Discount</span>

                        <span className="font-medium">
                          - ₹{Number(order.pricing?.discount).toFixed(2)}
                        </span>
                      </div>

                      <div className="border-t border-neutral-200 pt-4 mt-2 flex justify-between">
                        <span className="text-lg font-bold">Total</span>

                        <span className="text-2xl font-extrabold">
                          ₹{Number(order.pricing?.total).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* STATUS HISTORY */}

                {/* {order.statusHistory?.length > 0 && (
                <div className="mt-8 border-t border-neutral-200 pt-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-5">
                    Order Status
                  </h3>

                  <div className="flex flex-wrap gap-4">
                    {order.statusHistory.map((history, historyIndex) => (
                      <div
                        key={`${order._id}-${historyIndex}`}
                        className="flex items-center gap-3"
                      >
                        <div className="w-3 h-3 rounded-full bg-neutral-900" />

                        <div>
                          <p className="text-sm font-semibold">
                            {history.status}
                          </p>

                          <p className="text-xs text-neutral-400">
                            {formatDate(history.changedAt)}{" "}
                            {formatTime(history.changedAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
