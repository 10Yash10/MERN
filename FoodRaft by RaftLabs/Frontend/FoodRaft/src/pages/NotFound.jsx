import React from "react";
import { FillButton } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-neutral-900">Food not found</h1>

        <p className="text-neutral-500 mt-2">
          The food item you're looking is not on this place.
        </p>
        <div className="h-6" />
        <FillButton onClick={() => navigate("/")} text="Back to Home" />
      </div>
    </div>
  );
};

export default NotFound;
