import React, { useEffect, useState } from "react";
import { userContext } from "./userContext/userContext";

const Provider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState({});
  const [account, setAccount] = useState(""); // State to store MetaMask account
  const isLogin = !!token;

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const getUser = async () => {
    if (!token) return; // Exit if there's no token

    try {
      const response = await fetch("http://localhost:3001/auth/users/getUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Network response was not ok. Status: ${response.status}. Text: ${errorText}`
        );
      }

      const user = await response.json();
      console.log("get user", user);
      setUser(user);
    } catch (error) {
      console.log("Error fetching user:", error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <userContext.Provider
      value={{ token, setToken, user, setUser, isLogin, logout,account,setAccount }}
    >
      {children}
    </userContext.Provider>
  );
};

export default Provider;
