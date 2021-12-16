import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import Navbar from "../Main Page Components/Navbar";

function CreateAccount() {
  const [user, setUser] = useState({ username: "", password: "" });
  //result means the value returned from back-end.
  let result;
  let [current_status, set_status] = useState("");
  const navigate = useNavigate();
  let usernameChange = (event) => {
    setUser({ username: event.target.value, password: user.password });
  };
  let passwordChange = (event) => {
    setUser({ username: user.username, password: event.target.value });
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    });
    result = await res.json();
    if (result.status === "account-exists") {
      await set_status(
        "The username you are trying to create already exists. Please try again!"
      );
    }

    if (result.status === "success") {
      //react-router-dom v6 way of redirecting pages
      navigate("/login");
    }
  };

  let [login, setLogin] = useState(false);

  useEffect(() => {
    async function run() {
      let status = await fetch("/loginStatus");
      let loginStatus = await status.json();
      if (loginStatus.user !== undefined) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    }
    run().catch(console.dir);
  });

  return (
    <div className="text-center  h-100">
      <Navbar login={login} />
      <img
        className="mt-4 mb-4 logo-imagerow align-items-center h-100"
        src={logo}
        alt="Service Share Logo"
      />
      <form
        // need to change this I guess (css)
        id="Login Form"
        onSubmit={handleAuth}
        className={"login-container  justify-content-center align-self-center"}
      >
        <h1 className="h2 mb-3 font-weight normal">Create an account</h1>
        <p>{current_status}</p>
        <label className="sr-only"> Email Address </label>
        <input
          type="email"
          id="emailAddress"
          className="form-control"
          placeholder="Email Address"
          name="username"
          value={user.username}
          onChange={usernameChange}
          required
          autoFocus
        />
        <label className="sr-only" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={passwordChange}
          className="form-control"
        />
        <div className="mt-3">
          <button
            id="Submit"
            className="btn btn-lg btn-primary btn-block"
            type="Submit"
            value="Submit"
          >
            Create Account
          </button>
        </div>
        <br />
        <p>
          Already have an account?{" "}
          <a href="/login" style={{ color: "black" }}>
            Log In
          </a>
        </p>
      </form>
    </div>
  );
}

export default CreateAccount;
