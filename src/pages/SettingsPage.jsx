import { Outlet } from "react-router-dom";
import AppNav from "../components/AppNav";
import Footer from "../components/Footer";
import TaskBar from "../components/TaskBar";
import SideBar from "../components/settings/SideBar";
import styles from "../components/settings/profile.module.css";
// import EmailSettings from "../components/settings/EmailSettings";
// import Profile from "../components/settings/Profile";
// import PasswordSettings from "../components/settings/passwordSettings";

function SettingsPage() {
  const pathName = "Profile";
  return (
    <>
      <AppNav></AppNav>
      <TaskBar path={pathName}></TaskBar>
      <section className={styles["section-profile"]}>
        <div className={styles["profile-header-container"]}>
          <h1 className={styles["profile-header"]}>Profile</h1>
          <p className={styles["profile-paragraph"]}>
            Manage your account profile and settings
          </p>
        </div>
        <div className={styles["profile-setting-container"]}>
          <SideBar></SideBar>
          <Outlet></Outlet>
        </div>
      </section>

      <Footer></Footer>
    </>
  );
}

export default SettingsPage;
