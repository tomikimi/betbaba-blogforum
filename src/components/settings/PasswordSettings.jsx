import { useState } from "react";
import { Spinner } from "@blueprintjs/core";
import { OverlayToaster } from "@blueprintjs/core";
import Cookies from "js-cookie";
import NotificationBar from "../../util/NotificationBar";
import axios from "axios";
import styles from "./emailSettings.module.css";

// import profile from "./profile.module.css";
// import SideBar from "./SideBar";

const toasterInstance = OverlayToaster.create({ position: "bottom-right" });

function PasswordSettings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function showToast() {
    toasterInstance.show({
      message: "You are not logged in...",
      intent: "warning",
      timeout: "3000",
      isCloseButtonShown: false,
      icon: "offline",
    });
  }

  function handleOldPassword(e) {
    setOldPassword(e.target.value);
  }

  function handleNewPassword(e) {
    setNewPassword(e.target.value);
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let token = Cookies.get("user_token");

    try {
      setIsLoading(true);
      setError("");

      const data = { password: oldPassword, newPassword, confirmPassword };

      const res = await axios.patch(
        "http://127.0.0.1:3001/api/v1/user/updatePassword",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.status === "success") {
        Cookies.remove("user_token");
        Cookies.set("user_token", res.data.token);
      }
      setMessage(res.data);

      if (!token) {
        showToast();
      }
    } catch (err) {
      setError(true);
      setMessage(err.response.data);
    } finally {
      setIsLoading(false);
    }

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <>
      {/* <section className={styles.emailSettings}>
        <div className={profile["profile-header-container"]}>
          <h1 className={profile["profile-header"]}>Profile</h1>
          <p className={profile["profile-paragraph"]}>
            Manage your account profile and settings
          </p>
        </div>
        <div className={profile["profile-setting-container"]}>
          <SideBar></SideBar> */}
      <div className={styles["emailSettings-actions"]}>
        <div className={styles["emailSettings-header-container"]}>
          <h2 className={styles["emailSettings-header"]}>Change password</h2>
        </div>
        <div className={styles["emailSettings-sub-container"]}>
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
          {!isLoading && !error && (
            <NotificationBar
              intent={`bp5-intent-success`}
              status={message.status}
            >
              <h5 className="bp5-heading">
                {message.status ? message.status : ""}
              </h5>
              {`Password Updated Successfully...`}
            </NotificationBar>
          )}
          <form
            onSubmit={handleSubmit}
            className={styles["emailSettings-form"]}
          >
            <div className={styles.formController}>
              <label htmlFor="currentPassword" className={styles.formLabel}>
                Current password
                <span className={styles.reqField}>required</span>
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                value={oldPassword}
                onChange={handleOldPassword}
                className={styles.formInput}
              />
            </div>
            <div className={styles.formController}>
              <label htmlFor="newPassword" className={styles.formLabel}>
                New password
                <span className={styles.reqField}>required</span>
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                value={newPassword}
                onChange={handleNewPassword}
                className={styles.formInput}
              />
            </div>
            <div className={styles.formController}>
              <label htmlFor="confirmNewPassword" className={styles.formLabel}>
                Confirm new password
                <span className={styles.reqField}>required</span>
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                className={styles.formInput}
              />
            </div>
            <div className={styles.buttonAction}>
              <button className={styles.registerBtn}>
                {isLoading ? <Spinner size={18}></Spinner> : `Save`}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* </div>
      </section> */}
    </>
  );
}

export default PasswordSettings;
