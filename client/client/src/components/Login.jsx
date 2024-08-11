import React,{useState} from "react";
import logo from "../Images/logo.png";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Toaster from "./Toaster";

function Login() {
  const [showlogin, setShowLogin] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [logInStatus, setLoginStatus] = React.useState("");
  const [signInStatus, setSignInStatus] = React.useState("");

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    setLoading(true);
    console.log(data);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:8080/user/login",
        data,
        config
      );
      console.log("Login: ", response);
      setLoginStatus({ msg: "Success", key: Math.random() });
      setLoading(false);
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/app/welcome");
    } catch (error) {
      setLoginStatus({
        msg: "Invalid User name or Password",
        key: Math.random(),
      });
    }
    setLoading(false);
  };

  const signUpHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:8080/user/register/",
        data,
        config
      );
      console.log(response);
      setSignInStatus({
        msg: "Success",
        key: Math.random(),
      });
      navigate("/app/welcome");
      localStorage.setItem("userData", JSON.stringify(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response.status === 405) {
        setLoginStatus({
          msg: "User with this email ID already Exists",
          key: Math.random(),
        });
      }
      if (error.response.status === 406) {
        setLoginStatus({
          msg: "User Name already taken, please take another one",
          key: Math.random(),
        });
      }
      setLoading(false);
    }
  };
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <div className={"login-container" + (lightTheme ? "" : " dark")}>
        <div className={"image-container" + (lightTheme ? "" : " dark")}>
          <img
            src={logo}
            alt="Logo"
            className={"welcome-logo" + (lightTheme ? "" : " dark")}
          />
        </div>
        {showlogin && (
          <div className={"login-box" + (lightTheme ? "" : " dark")}>
            <p className={"login-text" + (lightTheme ? "" : " dark")}>
              Login to your Account
            </p>
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Enter User Name"
              variant="outlined"
              color="secondary"
              name="name"
              onKeyDown={(event)=>{
                if(event.code=="Enter"){
                  loginHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              color="secondary"
              name="password"
              onKeyDown={(event)=>{
                if(event.code=="Enter"){
                  loginHandler();
                }
              }}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={loginHandler}
            >
              Login
            </Button>
            <p>
              Don't hane an account?
              <span
                className="hyper"
                onClick={() => {
                  setShowLogin(false);
                }}
              >
                Sign Up
              </span>
            </p>
            {logInStatus ? (
              <Toaster key={logInStatus.key} message={logInStatus.msg} />
            ) : null}
          </div>
        )}
        {!showlogin && (
          <div className={"login-box" + (lightTheme ? "" : " dark")}>
            <p className={"login-text" + (lightTheme ? "" : " dark")}>
              Create your Account
            </p>
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Enter User Name"
              variant="outlined"
              color="secondary"
              name="name"
              helperText=""
              onKeyDown={(event)=>{
                if(event.code=="Enter"){
                  signUpHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Enter Email Address"
              variant="outlined"
              color="secondary"
              name="email"
              onKeyDown={(event)=>{
                if(event.code=="Enter"){
                  signUpHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              color="secondary"
              name="password"
              onKeyDown={(event)=>{
                if(event.code=="Enter"){
                  signUpHandler();
                }
              }}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={signUpHandler}
            >
              Sign Up
            </Button>
            <p>
              Already hane an account?
              <span
                className="hyper"
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Log In
              </span>
            </p>
            {signInStatus ? (
              <Toaster key={signInStatus.key} message={signInStatus.msg} />
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
