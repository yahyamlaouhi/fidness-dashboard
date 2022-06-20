import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

import React, { Component } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);
  let history = useHistory();

  let loginUser = async (loginForm) => {
    const { username, password } = loginForm;
      console.log({ username, password })

    let response = await fetch("http://127.0.0.1:8000/auth/token/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    try {
      const data = await response.json();
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/dashboard");
    } catch (error) {
      alert("wrong credentials!");
    }
  };

  const updateToken = async () => {
    const token = localStorage.authTokens;
    console.log(token);
    if (token) {
      let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh:authTokens?.refresh
        }),
      });
      try {
        let data = await response.json();
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } catch (err) {
        logoutUser();
      }
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history.push("/login");
  };

  const contextData = {
    loginUser: loginUser,
    user: user,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    updateToken();
  }, []);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
