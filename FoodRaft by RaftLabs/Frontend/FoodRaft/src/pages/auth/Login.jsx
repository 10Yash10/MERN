import React, { useEffect, useState } from "react";
import InputBox from "../../components/ui/InputBox";
import { FillButton, UnderlineButton } from "../../components/ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { useMouseMovement } from "../../components/animations/mouseMovement";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../features/auth/auth";

const Login = () => {
  const { x, y } = useMouseMovement();
  const [login, { isLoading }] = useLoginMutation();
  const [
    register,
    {
      isLoading: isRegisterLoading,
      //   isError: isRegisterError,
      //   error: registerError,
    },
  ] = useRegisterMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [toggleForm, setToggleForm] = useState(false);

  useEffect(() => {
    // setEmail("");
    setPassword("");
    // setUsername("");
    // setPhone("");
    setError("");
  }, [toggleForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and Password is required.");
      return;
    }

    try {
      const result = await login({ email, password });

      if (result?.error?.data?.status === "error") {
        const mes = result?.error?.data?.message;

        if (!mes.includes("[")) {
          setError(mes);
          return;
        }

        const parsedMessage = JSON.parse(mes);

        if (Array.isArray(parsedMessage)) {
          const messages = parsedMessage.map((item) => item.message).toString();
          setError(messages);
        }
        return;
      }
    } catch (err) {
      setError(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !username || !phone) {
      setError("Fields are required");
      return;
    }

    try {
      const result = await register({ username, email, password, phone });

      if (result?.error?.data?.status === "error") {
        const mes = result?.error?.data?.message;
        const parsedMessage = JSON.parse(mes);

        const messages = parsedMessage.map((item) => item.message).toString();
        setError(messages);
        return;
      }

      setToggleForm(false);
    } catch (err) {
      setError(err);
    }
  };

  // form variants
  const formVariants = {
    hidden: { opacity: 0, x: toggleForm ? -50 : 50 }, // Enters from the side
    visible: { opacity: 1, x: 0 }, // Centers on screen
    exit: { opacity: 0, x: toggleForm ? 50 : -50 }, // Exits to the opposite side
  };

  return (
    <section className="w-screen h-screen flex overflow-hidden">
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

      {/* login form wrapper */}
      <motion.div
        initial={{ x: 500 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="w-[30%] h-auto flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {!toggleForm ? (
            <motion.form
              key="login-key"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="px-6 w-full flex flex-col gap-4 "
              onSubmit={handleSubmit}
            >
              <InputBox
                placeholder="Email"
                type="email"
                value={email}
                onChange={(val) => setEmail(val.target.value)}
              />
              <InputBox
                placeholder="Password"
                type="password"
                value={password}
                onChange={(val) => setPassword(val.target.value)}
              />

              {error && <p className="text-sm text-red-500 ">{error}</p>}
              <FillButton
                type="submit"
                text="Login"
                style="mt-4"
                isLoading
                disabled={isLoading}
              />

              <div className="flex items-center justify-center gap-4">
                <p className="text-xs text-neutral-600">
                  Don't have an Account?
                </p>
                <UnderlineButton
                  width="100px"
                  onClick={(e) => {
                    e.preventDefault();
                    setToggleForm(true);
                  }}
                >
                  Register
                </UnderlineButton>
              </div>
            </motion.form>
          ) : (
            <motion.form
              key="register-key"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="px-6 w-full flex flex-col gap-4 "
              onSubmit={handleRegister}
            >
              <InputBox
                placeholder="Username"
                type="text"
                value={username}
                onChange={(val) => setUsername(val.target.value)}
              />
              <InputBox
                placeholder="Email"
                type="email"
                value={email}
                onChange={(val) => setEmail(val.target.value)}
              />
              <InputBox
                placeholder="Password"
                type="password"
                value={password}
                onChange={(val) => setPassword(val.target.value)}
              />
              <InputBox
                placeholder="Phone"
                type="text"
                value={phone}
                onChange={(val) => {
                  const input = val.target.value;
                  const onlyNums = input.replace(/[^0-9]/g, "");
                  if (onlyNums.length <= 10) {
                    setPhone(onlyNums);
                  }
                }}
              />

              {error && <p className="text-sm text-red-500 ">{error}</p>}
              <FillButton
                type="submit"
                text="Register"
                style="mt-4"
                isLoading
                disabled={isLoading}
              />

              <div className="flex items-center justify-center gap-4">
                <p className="text-xs  text-neutral-600 ">
                  Aready Have an Account?
                </p>
                <UnderlineButton
                  width="100px"
                  onClick={(e) => {
                    e.preventDefault();
                    setToggleForm(false);
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
