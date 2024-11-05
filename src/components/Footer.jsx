import { SocialIcon } from "react-social-icons";
import styles from "./footer.module.css";
import { NavLink, Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className={styles["section-footer"]}>
        <div className={styles["footer-container"]}>
          <div className={styles["footer-social-icons-container"]}>
            <div className={styles["footer-regulation-content"]}>
              <span className={styles["footer-regulation"]}>18+</span>
              <h2 className={styles["footer-text"]}>Responsible Gaming</h2>
            </div>
            <div className={styles["footer-icon-container"]}>
              <SocialIcon
                style={{ width: "25px", height: "25px" }}
                url="https://instagram.com"
              ></SocialIcon>
              <SocialIcon
                style={{ width: "25px", height: "25px" }}
                url="https://facebook.com"
              ></SocialIcon>
              <SocialIcon
                style={{ width: "25px", height: "25px" }}
                url="https://x.com"
              ></SocialIcon>
              <SocialIcon
                style={{ width: "25px", height: "25px" }}
                url="https://youtube.com"
              ></SocialIcon>
              <SocialIcon
                style={{ width: "25px", height: "25px" }}
                url="https://telegram.com"
              ></SocialIcon>
            </div>
          </div>
          <div className={styles["footer-logo-container"]}>
            <img
              // className={styles["footer-logo"]}
              src="/logo/betbaba_logo_file_v2_png.png"
              alt="betbaba logo"
            />
          </div>
          <div className={styles["footer-links"]}>
            <ul className={styles["footer-link-container"]}>
              <li className={styles["footer-list-tag"]}>
                <NavLink to="/" className={styles["footer-link"]}>
                  Blog
                </NavLink>
              </li>
              <li className={styles["footer-list-tag"]}>
                <NavLink to="/forum" className={styles["footer-link"]}>
                  Forum
                </NavLink>
              </li>
              <li className={styles["footer-list-tag"]}>
                <Link
                  to="https://www.betbaba.ng/en/sports/pre-match/event-view"
                  target="_blank"
                  className={styles["footer-link"]}
                >
                  SportsBook
                </Link>
              </li>
              <li className={styles["footer-list-tag"]}>
                <Link
                  to="https://www.betbaba.ng/en/virtual-sports/betconstruct"
                  target="_blank"
                  className={styles["footer-link"]}
                >
                  Virtual
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles["footer-regulatory-logo-container"]}>
            <img
              className={styles["footer-regulatory-logo"]}
              src="/logo/nlrc_logo.png"
              alt="nlrc logo"
            />
            <p className={styles["footer-text-secondary"]}>
              One World Unity Projects Limited (BETBABA) is licensed by National
              Lottery Regulatory Commission, permit No: 00000012. Issued on the
              28th September 2023
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
