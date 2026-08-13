import React from "react";
import { useLogoutMutation } from "../../features/auth/auth";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  return (
    <div>
      Menu
      <button
        onClick={async () => {
          await logout().unwrap();
          navigate("/login", { replace: true });
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Menu;
