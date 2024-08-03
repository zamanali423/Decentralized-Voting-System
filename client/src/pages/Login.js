import {
  faFacebook,
  faGoogle,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext/userContext";

const Login = () => {
  const { setToken } = useContext(userContext);
  const navigate=useNavigate()
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/users/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });
      const userExist = await response.json();
      const token = userExist.token;
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="containerLogin">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Log In</h3>
              <div className="d-flex justify-content-end social_icon">
                <span>
                  <FontAwesomeIcon icon={faFacebook} className="fab" />
                </span>
                <span>
                  <FontAwesomeIcon icon={faGoogle} className="fab" />
                </span>
                <span>
                  <FontAwesomeIcon icon={faLinkedin} className="fab" />
                </span>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon className="fas" icon={faUser} />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="email"
                    name="email"
                    value={fields.email}
                    onChange={handleInput}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faKey} className="fas" />
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    name="password"
                    value={fields.password}
                    onChange={handleInput}
                  />
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox" />
                  Remember Me
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Login"
                    className="btn float-right login_btn"
                  />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?<Link to="/signup">Sign Up</Link>
              </div>
              <div className="d-flex justify-content-center">
                <Link to="#">Forgot your password?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
