import { useState } from "react";
import NotificationBar from "../util/NotificationBar";
import axios from "axios";
import { Spinner } from "@blueprintjs/core";
import styles from "./settings/EmailSettings.module.css";
import styles2 from "./resetPassword.module.css";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();

  function handleNewPassword(e) {
    setNewPassword(e.target.value);
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  async function handleResetPassword(e) {
    e.preventDefault();

    const data = { password: newPassword, confirmPassword };

    try {
      setIsLoading(true);
      setError("");
      const response = await axios.patch(
        `http://127.0.0.1:3001/api/v1/user/resetPassword/${id}`,
        data
      );
      setMessage(response.data);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.log(err);
      setError(true);
      setMessage(err.response.data);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <section className={styles2["section-reset"]}>
        <div className={styles2["reset-container"]}>
          <div className={styles["emailSettings-actions"]}>
            <div className={styles["emailSettings-header-container"]}>
              <h2 className={styles["emailSettings-header"]}>Reset password</h2>
            </div>
            <div className={styles["emailSettings-sub-container"]}>
              {!isLoading && !error && (
                <NotificationBar
                  intent={`bp5-intent-success`}
                  status={message.status}
                >
                  <h5 className="bp5-heading">
                    {message.status ? message.status : ""}
                  </h5>
                  {message.message}
                </NotificationBar>
              )}
              {error && (
                <NotificationBar
                  intent={`bp5-intent-danger`}
                  status={message.status}
                >
                  <h5 className="bp5-heading">
                    {message.status ? message.status : ""}
                  </h5>
                  {message.message}
                </NotificationBar>
              )}
              <form
                onSubmit={handleResetPassword}
                className={styles["emailSettings-form"]}
              >
                <div className={styles2.formController}>
                  <label htmlFor="newPassword" className={styles2.formLabel}>
                    New password
                    <span className={styles2.reqField}>required</span>
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    value={newPassword}
                    onChange={handleNewPassword}
                    className={styles2.formInput}
                  />
                </div>
                <div className={styles2.formController}>
                  <label
                    htmlFor="confirmNewPassword"
                    className={styles2.formLabel}
                  >
                    Confirm new password
                    <span className={styles2.reqField}>required</span>
                  </label>
                  <input
                    type="password"
                    name="confirmNewPassword"
                    id="confirmNewPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    className={styles2.formInput}
                  />
                </div>
                <div className={styles.buttonAction}>
                  <button className={styles.registerBtn}>
                    {isLoading ? (
                      <Spinner size={18}></Spinner>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResetPassword;
