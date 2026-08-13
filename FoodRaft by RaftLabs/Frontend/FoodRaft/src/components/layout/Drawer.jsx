import React, { useState } from "react";
import { FillButton } from "../ui/Button";
import { AnimatePresence, motion } from "motion/react";
import InputBox from "../ui/InputBox";
import { useCompleteOrderMutation } from "../../features/order/order";
import { useClearCartByIdMutation } from "../../features/cart/cart";
import { useNavigate } from "react-router-dom";

const Drawer = ({ isOpen, setIsOpen, id }) => {
  const navigate = useNavigate();

  const [completeOrder, { isLoading: completingOrder }] =
    useCompleteOrderMutation();
  const [clearCartById, { isLoading: clearingCart }] =
    useClearCartByIdMutation();

  const isLoading = completingOrder || clearingCart || id === null;

  const initialFormData = {
    deliveryDetails: {
      name: "",
      phone: "",
      address: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
      },
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({
    phone: "",
    postalCode: "",
  });

  // -----------------------------------------
  // HANDLE INPUT CHANGE
  // -----------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    // PHONE VALIDATION
    if (name === "phone") {
      // Only allow numbers
      if (!/^\d*$/.test(value)) {
        return;
      }

      // Maximum 10 digits
      if (value.length > 10) {
        return;
      }

      setFormData((prev) => ({
        ...prev,
        deliveryDetails: {
          ...prev.deliveryDetails,
          phone: value,
        },
      }));

      // Validation
      if (value.length === 0) {
        setErrors((prev) => ({
          ...prev,
          phone: "",
        }));
      } else if (value.length !== 10) {
        setErrors((prev) => ({
          ...prev,
          phone: "Phone number must be 10 digits",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          phone: "",
        }));
      }

      return;
    }

    // POSTAL CODE VALIDATION
    if (name === "postalCode") {
      // Only allow numbers
      if (!/^\d*$/.test(value)) {
        return;
      }

      // Maximum 6 digits
      if (value.length > 6) {
        return;
      }

      setFormData((prev) => ({
        ...prev,
        deliveryDetails: {
          ...prev.deliveryDetails,
          address: {
            ...prev.deliveryDetails.address,
            postalCode: value,
          },
        },
      }));

      // Validation
      if (value.length === 0) {
        setErrors((prev) => ({
          ...prev,
          postalCode: "",
        }));
      } else if (value.length !== 6) {
        setErrors((prev) => ({
          ...prev,
          postalCode: "Postal code must be 6 digits",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          postalCode: "",
        }));
      }

      return;
    }

    // NAME
    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        deliveryDetails: {
          ...prev.deliveryDetails,
          name: value,
        },
      }));

      return;
    }

    // ADDRESS FIELDS
    setFormData((prev) => ({
      ...prev,
      deliveryDetails: {
        ...prev.deliveryDetails,
        address: {
          ...prev.deliveryDetails.address,
          [name]: value,
        },
      },
    }));
  };

  // -----------------------------------------
  // RESET FORM
  // -----------------------------------------

  const resetForm = () => {
    setFormData(initialFormData);

    setErrors({
      phone: "",
      postalCode: "",
    });
  };

  // -----------------------------------------
  // SUBMIT ORDER
  // -----------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, address } = formData.deliveryDetails;

    // Required field validation
    if (
      !name.trim() ||
      !phone ||
      !address.line1.trim() ||
      !address.city.trim() ||
      !address.state.trim() ||
      !address.postalCode
    ) {
      return;
    }

    // Phone validation
    if (phone.length !== 10) {
      setErrors((prev) => ({
        ...prev,
        phone: "Phone number must be 10 digits",
      }));

      return;
    }

    // Postal code validation
    if (address.postalCode.length !== 6) {
      setErrors((prev) => ({
        ...prev,
        postalCode: "Postal code must be 6 digits",
      }));

      return;
    }

    // -----------------------------------------
    // CALL API
    // -----------------------------------------

    try {
      const response = await completeOrder(formData).unwrap();

      // console.log("Order completed:", response);

      // Clear form
      await clearCartById({ userId: id }).unwrap();
      resetForm();

      // Close drawer
      setIsOpen(false);

      // navigate to order page
      navigate("/order");
    } catch (err) {
      console.error("Failed to complete order:", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="w-screen h-screen fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay */}
          <motion.div
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-full bg-black/50 cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute right-0 top-0 w-[40%] h-full bg-white"
          >
            {/* Close Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{
                delay: 0.3,
                duration: 0.3,
              }}
              className="flex justify-end pr-7 pt-4"
            >
              <FillButton onClick={() => setIsOpen(false)} text="x" />
            </motion.div>

            {/* Drawer Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                delay: 0.35,
                duration: 0.4,
              }}
              className="w-full h-full p-6 text-neutral-900"
            >
              <h1 className="text-3xl font-bold text-center underline underline-offset-8">
                Address
              </h1>

              <motion.form
                onSubmit={handleSubmit}
                className="flex flex-col pr-3 mt-6 gap-3"
              >
                <InputBox
                  type="text"
                  name="name"
                  placeholder="Name*"
                  value={formData.deliveryDetails.name}
                  onChange={handleChange}
                />

                <InputBox
                  type="text"
                  name="phone"
                  placeholder="Phone*"
                  value={formData.deliveryDetails.phone}
                  onChange={handleChange}
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm -mt-2">{errors.phone}</p>
                )}

                <InputBox
                  type="text"
                  name="line1"
                  placeholder="Line 1*"
                  value={formData.deliveryDetails.address.line1}
                  onChange={handleChange}
                />

                <InputBox
                  type="text"
                  name="line2"
                  placeholder="Line 2"
                  value={formData.deliveryDetails.address.line2}
                  onChange={handleChange}
                />

                <InputBox
                  type="text"
                  name="city"
                  placeholder="City*"
                  value={formData.deliveryDetails.address.city}
                  onChange={handleChange}
                />

                <InputBox
                  type="text"
                  name="state"
                  placeholder="State*"
                  value={formData.deliveryDetails.address.state}
                  onChange={handleChange}
                />

                <InputBox
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code*"
                  value={formData.deliveryDetails.address.postalCode}
                  onChange={handleChange}
                />

                {errors.postalCode && (
                  <p className="text-red-500 text-sm -mt-2">
                    {errors.postalCode}
                  </p>
                )}

                <div className="h-4" />

                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: 0.35,
                    duration: 0.4,
                  }}
                >
                  <FillButton
                    type="submit"
                    text={isLoading ? "Completing..." : "Complete Order"}
                    disabled={isLoading}
                    isLoading={isLoading}
                  />
                </motion.div>
              </motion.form>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
