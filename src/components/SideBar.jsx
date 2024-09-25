import { Link, NavLink } from "react-router-dom";
import { CIcon } from "@coreui/icons-react";
import {
  cilPeople,
  cilPaperPlane,
  cilEqualizer,
  cilFootball,
  cilPowerStandby,
  cilUser,
  cilSettings,
} from "@coreui/icons";
import Cookies from "js-cookie";
import styles from "./SideBar.module.css";
import { useState } from "react";

function SideBar({ handleSideBar, handleLogOut, handleOpenModal, myProfile }) {
  let user = myProfile ? JSON.parse(myProfile) : "";

  return (
    <>
      <div
        className={`${styles["sidebar-backdrop"]} ${styles["fade"]}`}
        onClick={handleSideBar}
      ></div>
      <div className={styles["sidebar-menu-container"]}>
        <div className={styles["sidebar-logo-container"]}>
          <img
            src="/logo/betbaba_logo_file_v2_png.png"
            alt="Betbaba Logo"
            className={styles["sidebar-logo"]}
          />
        </div>
        <ul className={styles["sidebar-menu-list"]}>
          <li className={styles["sidebar-menu-item"]}>
            <CIcon icon={cilEqualizer} size="3xl"></CIcon>
            <NavLink to="/" className={styles["sidebar-link"]}>
              Blog
            </NavLink>
          </li>
          <li className={styles["sidebar-menu-item"]}>
            <CIcon icon={cilPeople} size="3xl"></CIcon>
            <NavLink to="/forum" className={styles["sidebar-link"]}>
              Forum
            </NavLink>
          </li>
          <li className={styles["sidebar-menu-item"]}>
            <CIcon icon={cilFootball} size="3xl"></CIcon>
            <Link
              className={styles["sidebar-link"]}
              to="https://www.betbaba.ng/en/sports/pre-match/event-view"
              target="_blank"
            >
              SportsBook
            </Link>
          </li>
          <li className={styles["sidebar-menu-item"]}>
            <CIcon icon={cilPaperPlane} size="3xl"></CIcon>
            <Link
              className={styles["sidebar-link"]}
              to="https://www.betbaba.ng/en/virtual-sports/betconstruct"
              target="_blank"
            >
              Virtuals
            </Link>
          </li>
          {user && (
            <li className={styles["sidebar-menu-item"]}>
              <CIcon icon={cilSettings} size="3xl"></CIcon>
              <Link className={styles["sidebar-link"]} to="/setting">
                Settings
              </Link>
            </li>
          )}
        </ul>
        <div className={styles["sidebar-profile"]}>
          {user === "" ? (
            <>
              <div
                className={styles["sidebar-signIn"]}
                onClick={() => handleOpenModal("sign-in")}
              >
                <span>SIGN IN</span>
              </div>
              <div
                className={styles["sidebar-register"]}
                onClick={() => handleOpenModal("register")}
              >
                <span>REGISTER</span>
              </div>
            </>
          ) : (
            <>
              <div className={styles["sidebar-user"]}>
                <CIcon icon={cilUser} size="3xl"></CIcon>
                <span>{user?.displayName}</span>
              </div>
              <div onClick={handleLogOut}>
                <CIcon icon={cilPowerStandby} size="3xl"></CIcon>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SideBar;
