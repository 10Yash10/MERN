import React from "react";
import { motion } from "motion/react";
import { useGetMeQuery } from "../../features/auth/auth";
import Loader from "../../components/layout/Loader";

const Profile = () => {
  const { data, isLoading } = useGetMeQuery();
  return (
    <>
      {isLoading && <Loader />}

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-5xl font-extrabold text-neutral-900">
          name: {data.email.split("@")[0]}
        </h1>

        <p className="mt-2 text-neutral-500">email: {data.email}</p>
        <p className="mt-2 text-neutral-500">role: {data.role}</p>
      </motion.div>
    </>
  );
};

export default Profile;
