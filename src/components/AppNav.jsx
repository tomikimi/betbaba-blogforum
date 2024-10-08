import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Icon, Spinner } from "@blueprintjs/core";
import { CIcon } from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";
import Modal from "../util/Modal";
import SignUp from "./SignUp";
import Login from "./Login";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./AppNav.module.css";
import SideBar from "./SideBar";

const { VITE_API_URL } = import.meta.env;

function AppNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const [option, setOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();

  let token = Cookies.get("user_token");
  let myProfile = Cookies.get("user_profile");

  useEffect(
    function () {
      async function fetchUserDetail() {
        try {
          if (token) {
            const response = await axios.get(`${VITE_API_URL}user/me`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const { data } = response.data;
            const profile = JSON.stringify(data.user);
            Cookies.set("user_profile", profile);
            setProfile(data.user.displayName);
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchUserDetail();
    },
    [token]
  );

  function handleOpenModal(value) {
    setIsOpen(true);
    setOption(() => value);
  }

  function handleSideBar() {
    console.log(sideBar);
    setSideBar(() => !sideBar);
  }

  function handleModalName(value) {
    setOption(() => value);
  }

  function handleLogOut(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        Cookies.remove("user_token");
        Cookies.remove("user_profile");
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {isOpen && (
        <Modal setIsOpen={setIsOpen} setOption={option}>
          {option === "register" ? (
            <SignUp setIsOpen={setIsOpen}></SignUp>
          ) : (
            <Login setIsOpen={setIsOpen} modalName={handleModalName}></Login>
          )}
        </Modal>
      )}
      <header className={styles.header}>
        <Link to="/">
          <img
            src="/logo/betbaba_logo_file_v2_png.png"
            alt="Betbaba Logo"
            className={styles.logo}
          />
        </Link>
        <nav className={styles["main-nav"]}>
          <ul className={styles["main-nav-list"]}>
            <li className={styles.tag}>
              <NavLink to="/" className={styles["main-nav-link"]}>
                Blog
              </NavLink>
            </li>
            <li className={styles.tag}>
              <NavLink to="/forum" className={styles["main-nav-link"]}>
                Forum
              </NavLink>
            </li>
            <li className={styles.tag}>
              <Link
                to="https://www.betbaba.ng/en/sports/pre-match/event-view"
                target="_blank"
                className={styles["main-nav-link"]}
              >
                SportsBook
              </Link>
            </li>
            <li className={styles.tag}>
              <Link
                to="https://www.betbaba.ng/en/virtual-sports/betconstruct"
                target="_blank"
                className={styles["main-nav-link"]}
              >
                Virtuals
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles["main-nav-setting"]}>
          {token ? (
            <>
              <Link to="/setting" className={`btn-sm ${styles["btn--signIn"]}`}>
                <Icon icon="user" size={20} intent="success"></Icon>
                {"  "}
                {profile == "" ? <Spinner size={18}></Spinner> : profile}
              </Link>
              <button
                type="button"
                onClick={handleLogOut}
                className={`btn-sm ${styles["btn--logout"]}`}
              >
                {isLoading ? <Spinner size={18}></Spinner> : `LOGOUT`}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleOpenModal("sign-in")}
                className={`btn-sm ${styles["btn--signIn"]}`}
              >
                SIGN IN <Icon icon="input" size={20} intent="success"></Icon>
              </button>
              <button
                type="button"
                onClick={() => handleOpenModal("register")}
                className={`btn-sm ${styles["btn--logout"]}`}
              >
                REGISTER
              </button>
            </>
          )}
        </div>

        {!sideBar && (
          <div className={styles["main-nav-mobile"]}>
            <CIcon
              icon={cilHamburgerMenu}
              size="4xl"
              className="text-success"
              onClick={handleSideBar}
            ></CIcon>
          </div>
        )}

        {sideBar && (
          <SideBar
            handleSideBar={handleSideBar}
            handleLogOut={handleLogOut}
            handleOpenModal={handleOpenModal}
            myProfile={myProfile ? myProfile : ""}
          ></SideBar>
        )}
      </header>
    </>
  );
}

export default AppNav;
