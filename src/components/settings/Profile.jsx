import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./profile.module.css";
import forumStyle from "../forum/ForumTopicReplies.module.css";
// import SideBar from "./SideBar";

function Profile() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const token = Cookies.get("user_token");
  useEffect(
    function () {
      async function fetchProfile() {
        try {
          const res = await axios.get("http://127.0.0.1:3001/api/v1/user/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { user } = res.data.data;
          setDisplayName(user.displayName);
          setEmail(user.email);
        } catch (err) {
          console.log(err);
        }
      }
      fetchProfile();
    },
    [token]
  );
  // if (!token) {
  //   return (
  //     <section className={forumStyle["section-forum-topic"]}>
  //       <div className={forumStyle["forum-topic-container"]}>
  //         <div className={forumStyle["forum-no-token"]}>
  //           <p>Awww...😥 So Sorry...😞😞😞</p>
  //           <p>
  //             You need to create an Account to be able to view this content...🔎
  //           </p>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }
  return (
    <>
      {/* <section className={styles["section-profile"]}>
        <div className={styles["profile-header-container"]}>
          <h1 className={styles["profile-header"]}>Profile</h1>
          <p className={styles["profile-paragraph"]}>
            Manage your account profile and settings
          </p>
        </div>
        <div className={styles["profile-setting-container"]}>
          <SideBar></SideBar> */}
      <div className={styles["profile-setting-actions"]}>
        <ul className={styles["profile-setting-sidebarRight"]}>
          <li className={styles["profile-setting-fieldList"]}>
            <div className={styles["profile-setting-fieldContainer"]}>
              <h4 className={styles["profile-setting-field"]}>Display Name</h4>
              <span className={styles["profile-setting-field2"]}>
                {displayName}
              </span>
            </div>
          </li>
          <li className={styles["profile-setting-fieldList"]}>
            <div className={styles["profile-setting-fieldContainer"]}>
              <h4 className={styles["profile-setting-field"]}>Email Address</h4>
              <span className={styles["profile-setting-field2"]}>{email}</span>
            </div>
          </li>
          <li className={styles["profile-setting-fieldList"]}>
            <div className={styles["profile-setting-fieldContainer"]}>
              <h4 className={styles["profile-setting-field"]}>Password</h4>
              <span className={styles["profile-setting-field2"]}>
                ****************
              </span>
            </div>
          </li>
        </ul>
      </div>
      {/* </div>
      </section> */}
    </>
  );
}

export default Profile;
