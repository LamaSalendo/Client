import React, { useEffect, useState } from "react";

import { AiFillLock } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { GrCircleInformation } from "react-icons/gr";
import { LoginInformation } from "../../Types";
import { NavLink } from "react-router-dom";
import UserIcon from "../../images/user.png";

const Login = () => {
  const [InputErrorUsername, setInputErrorUsername] = useState(0);
  const [InputErrorPassword, setInputErrorPassword] = useState(0);

  const HandleSubmit = () => {
    let ErrorOccured = false;
    localStorage.setItem("loggedIn", "true");
    const username = document.getElementById(
      "username"
    ) as HTMLInputElement | null;
    const password = document.getElementById(
      "password"
    ) as HTMLInputElement | null;

    if (!username || !password) return;
    if (username.value.trim().length <= 0) {
      setInputErrorUsername(1);
      ErrorOccured = true;
    }
    if (password.value.trim().length <= 0) {
      setInputErrorPassword(1);
      ErrorOccured = true;
    }
    if (ErrorOccured) return;
    const loginInformation: LoginInformation = {
      username: username.value,
      password: password.value,
    };

    fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInformation),
    }).then(async (res) => {
      const response = await res.json();
      if (!response.success) {
        setInputErrorPassword((prev) => 1);
        setInputErrorUsername((prev) => 1);
      } else {
        window.location.href = response.redirectURI;
      }
    });
  };
  useEffect(() => {
    fetch("api/login").then(async (res) => {
      if ((await res.json()).success) {
        window.location.href = (await res.json()).redirectURI;
      }
    });
  });
  return (
    <div className="h-full">
      <div className="max-w-screen h-full bg-color-four flex items-center justify-center bg-gradient-to-br from-color-one via-color-two to-color-three">
        <div className="h-1/2 min-h-[210px] min-w-[300px] max-h-96 aspect-[150/167] lg:h-3/4 A51:h-[40%] flex flex-col justify-evenly  bg-color-four rounded-3xl">
          <div className="text-color-two text-5xl text-center font-dancingscripts">
            <h1>Cafeteria</h1>
          </div>
          <div>
            <div className="flex items-center justify-center mb-2">
              <div
                className={
                  "flex h-9 w-4/5 rounded-md border-2 " +
                  (InputErrorUsername ? "border-error" : "border-color-two")
                }
              >
                <div className="h-full aspect-square">
                  <FaUser
                    style={{ color: InputErrorUsername ? "#FF5733" : "black" }}
                    className="h-full relative left-2"
                  />
                  {/*<img src={UserIcon} className="h-full" />*/}
                </div>
                <input
                  type="text"
                  name="User"
                  className="w-full focus:shadow-none focus:outline-none focus:border-0 focus:ring-0 focus:ring-offset-0"
                  id="username"
                  placeholder="Username"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div
                className={
                  "flex h-9 w-4/5 rounded-md border-2 " +
                  (InputErrorPassword ? "border-error" : "border-color-two")
                }
              >
                <div className="h-full aspect-square">
                  <AiFillLock
                    style={{ color: InputErrorPassword ? "#FF5733" : "black" }}
                    className="h-full relative left-2 "
                  />
                </div>
                <input
                  type="password"
                  name="User"
                  className="w-full focus:shadow-none focus:outline-none focus:border-0 focus:ring-0 focus:ring-offset-0"
                  id="password"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
          <div className="h-10 flex items-center justify-center">
            <button
              onClick={HandleSubmit}
              className="h-full w-24 relative lg:bottom-5 bg-gradient-to-r from-color-one to-color-three rounded-xl text-color-four"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full flex flex-row-reverse">
        <GrCircleInformation
          size={40}
          style={{ color: "#464AA6", opacity: "40%" }}
          className="fill-current text-color-two text-opacity-50 aspect-square"
        />
      </div>
    </div>
  );
};

export default Login;
