import { FaNewspaper, FaCheck } from "react-icons/fa6";
import styles from "./taskBar.module.css";
import { NavLink } from "react-router-dom";
function TaskBar({ path }) {
  return (
    <>
      <section className={styles["section-taskbar"]}>
        <div className={styles["taskbar-pageInfo"]}>
          <span className={styles["taskbar-text"]}>{path}</span>
        </div>
        <div className={styles["taskbar-actions"]}>
          <ul className={styles["taskbar-list"]}>
            <li>
              <NavLink
                to="/Discover/unReadContent"
                className={styles["taskbar-link"]}
              >
                <FaNewspaper
                  style={{
                    marginRight: ".5rem",
                    fontSize: "1.4rem",
                  }}
                />
                <span>Unread Content</span>
              </NavLink>
            </li>
            {/* <li>
              <a href="" className={styles["taskbar-link"]}>
                <FaCheck
                  style={{
                    marginRight: ".5rem",
                    fontSize: "1.4rem",
                  }}
                />{" "}
                <span>Mark Contents Read</span>
              </a>
            </li> */}
          </ul>
        </div>
      </section>
    </>
  );
}

export default TaskBar;
