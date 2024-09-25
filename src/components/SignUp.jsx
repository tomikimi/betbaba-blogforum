import { useState } from "react";
import { Spinner } from "@blueprintjs/core";
import NotificationBar from "../util/NotificationBar";

import styles from "./SignUp.module.css";

// function NotificationBar({ intent, status, icon, children }) {
//   return (
//     <>
//       {status && (
//         <Callout className={`bp5-callout ${intent} ${icon}`}>
//           {children}
//         </Callout>
//       )}
//     </>
//   );
// }

function SignUp({ setIsOpen }) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState({});
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDisplayName(e) {
    setDisplayName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name,
      displayName,
      email,
      password,
      confirmPassword,
    };

    try {
      setIsLoading(true);
      setError("");
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const res = await fetch(
        "http://127.0.0.1:3001/api/v1/user/signup",
        requestOptions
      );
      const result = await res.json();
      if (result.status == "error") {
        setError(true);
        setMessage(result);
      }
      setMessage(result);
      setName("");
      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.log(err.status);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {!isLoading && !error && (
        <NotificationBar intent={`bp5-intent-success`} status={message.status}>
          <h5 className="bp5-heading">{message.status}</h5>
          Account Successfully Created 🎊, An Email has been sent to your
          mailBox to verify your Account...🎁
        </NotificationBar>
      )}
      {error && (
        <NotificationBar intent={`bp5-intent-danger`} status={message.status}>
          <h5 className="bp5-heading">{message.error.name}</h5>
          {message.message}
        </NotificationBar>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="fullName" className={styles.formLabel}>
            Name
            <span className={styles.reqField}>required</span>
          </label>
          <input
            name="fullName"
            type="text"
            value={name}
            onChange={handleName}
            className={styles.formInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="displayName" className={styles.formLabel}>
            Display Name
            <span className={styles.reqField}>required</span>
          </label>
          <input
            name="displayName"
            type="text"
            value={displayName}
            onChange={handleDisplayName}
            className={styles.formInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.formLabel}>
            Email
            <span className={styles.reqField}>required</span>
          </label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleEmail}
            className={styles.formInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password" className={styles.formLabel}>
            Password
            <span className={styles.reqField}>required</span>
          </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handlePassword}
            className={styles.formInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="confirmPassword" className={styles.formLabel}>
            Confirm Password
            <span className={styles.reqField}>required</span>
          </label>
          <input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            className={styles.formInput}
          />
        </div>
        <div className={styles.modalButtonActions}>
          <div className={styles.actionsContainer}>
            <button className={styles.registerBtn} type="submit">
              {isLoading ? <Spinner size={18}></Spinner> : "Create Account"}
            </button>
            <button
              className={styles.cancelBtn}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUp;
