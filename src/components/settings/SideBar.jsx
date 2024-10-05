import { FaTachographDigital, FaKey, FaMarker } from "react-icons/fa6";
import Cookies from "js-cookie";
import styles from "./profile.module.css";
import { NavLink } from "react-router-dom";
function SideBar() {
  const data = Cookies.get("user_profile");
  const profile = JSON.parse(data);

  return (
    <>
      <div className={styles["profile-setting-sidebar"]}>
        <ul className={styles["profile-sidebar-list"]}>
          <li>
            <NavLink
              to="/setting"
              className={({ isActive }) =>
                isActive
                  ? `${styles["sidebar-item"]} ${styles["sidebar-active"]}`
                  : `${styles["sidebar-item"]}`
              }
              end
            >
              <FaTachographDigital></FaTachographDigital> Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="emailSetting"
              className={({ isActive }) =>
                isActive
                  ? `${styles["sidebar-item"]} ${styles["sidebar-active"]}`
                  : `${styles["sidebar-item"]}`
              }
            >
              <FaMarker></FaMarker> Create Post
            </NavLink>
          </li>
          {profile.role === "admin" && (
            <li>
              <NavLink
                to="postArticle"
                className={({ isActive }) =>
                  isActive
                    ? `${styles["sidebar-item"]} ${styles["sidebar-active"]}`
                    : `${styles["sidebar-item"]}`
                }
              >
                <FaMarker></FaMarker> Post an Article
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="passwordSetting"
              className={({ isActive }) =>
                isActive
                  ? `${styles["sidebar-item"]} ${styles["sidebar-active"]}`
                  : `${styles["sidebar-item"]}`
              }
            >
              <FaKey></FaKey> Password
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
