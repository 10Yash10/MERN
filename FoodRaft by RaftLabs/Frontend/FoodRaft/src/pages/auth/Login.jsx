import React, { useEffect, useState } from "react";
import InputBox from "../../components/ui/InputBox";
import { FillButton, UnderlineButton } from "../../components/ui/Button";
import { AnimatePresence, motion } from "motion/react";
import { useMouseMovement } from "../../components/animations/mouseMovement";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../features/auth/auth";

const Login = () => {
  // HOOKS

  const { x, y } = useMouseMovement();

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  // STATE

  const [toggleForm, setToggleForm] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [error, setError] = useState("");

  // FORM VALUES

  const { username, email, password, phone } = formData;

  // RESET FORM

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      password: "",
    }));

    setError("");
  }, [toggleForm]);

  // INPUT HANDLER

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // PHONE HANDLER

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    const onlyNumbers = value.replace(/\D/g, "");

    if (onlyNumbers.length <= 10) {
      setFormData((prev) => ({
        ...prev,
        phone: onlyNumbers,
      }));
    }
  };

  // API ERROR PARSER

  const getErrorMessage = (error) => {
    const message = error?.data?.message;

    if (!message) {
      return "Something went wrong. Please try again.";
    }

    // Backend returned validation errors as JSON string
    if (typeof message === "string" && message.startsWith("[")) {
      try {
        const parsedMessage = JSON.parse(message);

        if (Array.isArray(parsedMessage)) {
          return parsedMessage.map((item) => item.message).join(", ");
        }
      } catch {
        return message;
      }
    }

    return message;
  };

  // LOGIN

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and Password are required.");
      return;
    }

    try {
      await login({
        email,
        password,
      }).unwrap();

      // Login successful
      // RTK Query / auth state can handle navigation
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  // REGISTER

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !phone.trim()
    ) {
      setError("All fields are required.");
      return;
    }

    if (phone.length !== 10) {
      setError("Phone number must be 10 digits.");
      return;
    }

    try {
      await register({
        username,
        email,
        password,
        phone,
      }).unwrap();

      // Registration successful
      // Switch to login
      setToggleForm(false);

      // Optional: clear registration fields
      setFormData({
        username: "",
        email: "",
        password: "",
        phone: "",
      });
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  // SWITCH FORM

  const switchForm = (isRegister) => {
    setError("");
    setToggleForm(isRegister);
  };

  // ANIMATION

  const formVariants = {
    initial: {
      opacity: 0,
      x: toggleForm ? 50 : -50,
    },

    animate: {
      opacity: 1,
      x: 0,
    },

    exit: {
      opacity: 0,
      x: toggleForm ? -50 : 50,
    },
  };

  // RENDER

  return (
    <section className="w-screen h-screen flex overflow-hidden">
      {/* LEFT SECTION */}

      <motion.div
        initial={{ x: -1200 }}
        animate={{ x: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.7,
        }}
        className="w-[70%] h-full bg-neutral-900 flex flex-col items-center justify-center"
      >
        <motion.h1
          style={{ x, y }}
          className="text-9xl font-extrabold text-white"
        >
          FoodRaft
        </motion.h1>

        <p className="text-xl font-extralight text-white">by</p>

        <h2 className="text-xl font-extralight text-white">RaftLabs</h2>
      </motion.div>

      {/* RIGHT SECTION */}

      <motion.div
        initial={{ x: 500 }}
        animate={{ x: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.7,
        }}
        className="w-[30%] h-auto flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {!toggleForm ? (
            /* LOGIN FORM */

            <motion.form
              key="login"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="px-6 w-full flex flex-col gap-4"
              onSubmit={handleLogin}
            >
              <InputBox
                name="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={handleInputChange}
              />

              <InputBox
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={handleInputChange}
              />

              {/* Error */}
              {error && <p className="text-sm text-red-500">{error}</p>}

              <FillButton
                type="submit"
                text="Login"
                style="mt-4"
                isLoading={isLoginLoading}
                disabled={isLoginLoading}
              />

              {/* Switch */}
              <div className="flex items-center justify-center gap-4">
                <p className="text-xs text-neutral-600">
                  Don't have an Account?
                </p>

                <UnderlineButton
                  width="100px"
                  onClick={(e) => {
                    e.preventDefault();
                    switchForm(true);
                  }}
                >
                  Register
                </UnderlineButton>
              </div>
            </motion.form>
          ) : (
            /* REGISTER FORM */

            <motion.form
              key="register"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="px-6 w-full flex flex-col gap-4"
              onSubmit={handleRegister}
            >
              <InputBox
                name="username"
                placeholder="Username"
                type="text"
                value={username}
                onChange={handleInputChange}
              />

              <InputBox
                name="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={handleInputChange}
              />

              <InputBox
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={handleInputChange}
              />

              <InputBox
                name="phone"
                placeholder="Phone"
                type="text"
                value={phone}
                onChange={handlePhoneChange}
              />

              {/* Error */}
              {error && <p className="text-sm text-red-500">{error}</p>}

              <FillButton
                type="submit"
                text="Register"
                style="mt-4"
                isLoading={isRegisterLoading}
                disabled={isRegisterLoading}
              />

              {/* Switch */}
              <div className="flex items-center justify-center gap-4">
                <p className="text-xs text-neutral-600">
                  Already Have an Account?
                </p>

                <UnderlineButton
                  width="100px"
                  onClick={(e) => {
                    e.preventDefault();
                    switchForm(false);
                  }}
                >
                  Login
                </UnderlineButton>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Login;
