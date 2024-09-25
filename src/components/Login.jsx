import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "@blueprintjs/core";
import Cookies from "js-cookie";
import NotificationBar from "../util/NotificationBar";
import axios from "axios";
import styles from "./SignUp.module.css";

function Login({ setIsOpen, modalName }) {
  const [form, setForm] = useState(false);
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  function handleEmailValue(e) {
    setEmail(e.target.value);
  }

  function handleResetEmailValue(e) {
    setResetEmail(e.target.value);
  }

  function handlePasswordValue(e) {
    setPassword(e.target.value);
  }

  function handleFormSwitch() {
    setForm((value) => !value);
    setIsLoading((value) => !value);
    modalName("Forgot Password");
  }

  async function handleForgotPassword(e) {
    e.preventDefault();

    const data = {
      email: resetEmail,
    };

    try {
      setIsLoading(true);
      setLoader(true);
      setError("");
      const response = await axios.post(
        `http://127.0.0.1:3001/api/v1/user/forgotPassword`,
        data
      );
      setMessage(response.data);
      setResetEmail("");
    } catch (error) {
      setError(true);
      setMessage(error.response.data);
    } finally {
      setIsLoading(false);
      setLoader(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email,
      password,
    };
    try {
      setIsLoading(true);
      setError("");

      // const requestOptions = {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(credentials),
      // };

      const response = await axios.post(
        "http://127.0.0.1:3001/api/v1/user/login",
        credentials
      );
      setMessage(response.data);
      console.log("login");
      Cookies.set("user_token", response.data.token, { expires: 5 });
      setEmail("");
      setPassword("");
      setIsOpen(false);
      //   setPassword("");
      //   setIsOpen(false);
      // const res = await fetch(
      //   "http://127.0.0.1:3001/api/v1/user/login",
      //   requestOptions
      // );

      // const result = await res.json();

      // if (result.status == "fail") {
      //   setError(true);
      //   setMessage(result);
      // } else {
      //   console.log(result);
      //   setMessage(result);
      //   Cookies.set("user_token", result.token, { expires: 1 });
      //   setEmail("");
      //   setPassword("");
      //   setIsOpen(false);
      // }
      const { pathname } = location;
      navigate(`${pathname}`);
    } catch (error) {
      setError(true);
      setMessage(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {/* {error2 && (
        <NotificationBar
          intent={`bp5-intent-danger`}
          icon={`bp5-icon-cross`}
          status={message.status}
        >
          <h5 className="bp5-heading">
            {message.error.name ? message.error.name : message.error.status}
          </h5>
          {message.message}
          <h5 className="bp5-heading">
            {message.status ? message.status : ""}
          </h5>
          {message.message}
        </NotificationBar>
      )} */}

      {error && (
        <NotificationBar intent={`bp5-intent-danger`} status={message.status}>
          <h5 className="bp5-heading">
            {message.status ? message.status : ""}
          </h5>
          {message.message}
        </NotificationBar>
      )}

      {!isLoading && !error && (
        <NotificationBar intent={`bp5-intent-success`} status={message.status}>
          <h5 className="bp5-heading">
            {message.status ? message.status : ""}
          </h5>
          {message.message}
        </NotificationBar>
      )}

      {form === false ? (
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.formLabel}>
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={handleEmailValue}
              className={styles.formInput}
            />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.horizontalControl}>
              <label htmlFor="password" className={styles.formLabel}>
                Password
                <span className={styles.reqField}>required</span>
              </label>
              <Link
                to="#"
                onClick={handleFormSwitch}
                className={styles.formLink}
              >
                Forgot?
              </Link>
            </div>

            <input
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordValue}
              className={styles.formInput}
            />
          </div>
          <div className={styles.modalButtonActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.registerBtn} type="submit">
                {isLoading ? <Spinner size={18}></Spinner> : "Sign In"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={handleForgotPassword}>
          <p className="paragraph-blk">
            Enter the email address you used when you joined and we’ll send you
            instructions to reset your password.
          </p>
          <p className="paragraph-blk">
            For security reasons, we do NOT store your password. So rest assured
            that we will never send your password via email.
          </p>
          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.formLabel}>
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={resetEmail}
              onChange={handleResetEmailValue}
              className={styles.formInput}
            />
          </div>
          <div className={styles.modalButtonActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.registerBtn} type="submit">
                {loader ? (
                  <Spinner size={18}></Spinner>
                ) : (
                  "Send Reset Instructions"
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default Login;
