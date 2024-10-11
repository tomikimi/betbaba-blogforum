import styles from "./Virtuals.module.css";
import { Link } from "react-router-dom";

function Virtuals() {
  return (
    <>
      <div className="container">
        <h2 className="heading-primary">Virtuals on BetBaba</h2>
      </div>
      <div className={`${styles["virtual-container"]} grid grid--3-cols`}>
        <div className="content">
          <Link to="https://www.betbaba.ng/en/virtual-sports/betconstruct">
            <div className={styles["virtual-content-img-box"]}>
              <img
                src="/virtuals/drag_racing.jpg"
                alt="Drag Racing"
                loading="lazy"
                className={styles["virtual-content-img"]}
              />
            </div>
          </Link>

          <div className={styles["virtual-content-text-box"]}>
            <span className="span-label">Drag Racing</span>
            <p className="paragraph-primary">
              Enjoy the Virtual Reality of Drag Racing
            </p>
            <div className={styles["virtual_logo_sm_container"]}>
              <img
                src="/logo/betbaba_logo_sm.PNG"
                alt="betbaba_logo"
                className="logo_sm"
              />
              <span className="span-logo-text">BetBaba</span>
            </div>
          </div>
        </div>
        <div className="content">
          <Link to="https://www.betbaba.ng/en/virtual-sports/betconstruct">
            <div className={styles["virtual-content-img-box"]}>
              <img
                src="/virtuals/virtual_racing.jpg"
                alt="Virtual Racing"
                loading="lazy"
                className={styles["virtual-content-img"]}
              />
            </div>
          </Link>

          <div className={styles["virtual-content-text-box"]}>
            <span className="span-label">Virtual Racing</span>
            <p className="paragraph-primary">
              Speed has no limits in our Virtual Racing.
            </p>
            <div className={styles["virtual_logo_sm_container"]}>
              <img
                src="/logo/betbaba_logo_sm.PNG"
                alt="betbaba_logo"
                className="logo_sm"
              />
              <span className="span-logo-text">BetBaba</span>
            </div>
          </div>
        </div>
        <div className="content">
          <Link to="https://www.betbaba.ng/en/virtual-sports/betconstruct">
            <div className={styles["virtual-content-img-box"]}>
              <img
                src="/virtuals/virtual_tennis.jpg"
                alt="Virtual Tennis"
                loading="lazy"
                className={styles["virtual-content-img"]}
              />
            </div>
          </Link>

          <div className={styles["virtual-content-text-box"]}>
            <span className="span-label">Virtual Tennis</span>
            <p className="paragraph-primary">
              Experience Virtual Tennis like a Player on a Tennis Court.
            </p>
            <div className={styles["virtual_logo_sm_container"]}>
              <img
                src="/logo/betbaba_logo_sm.PNG"
                alt="betbaba_logo"
                className="logo_sm"
              />
              <span className="span-logo-text">BetBaba</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Virtuals;
