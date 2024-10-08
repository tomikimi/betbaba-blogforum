import { FaEnvelope } from "react-icons/fa6";
import styles from "./emailVerification.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Spinner } from "@blueprintjs/core";

const { VITE_API_URL } = import.meta.env;

function EmailVerification() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  async function handleEmailActivation() {
    try {
      setIsLoading(true);
      const res = await axios.get(`${VITE_API_URL}user/activateAccount/${id}`);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <section className={styles["section-verification"]}>
      <div className={styles["emailVerification-container"]}>
        <div className={styles["emailVerification-header"]}>
          <div className={styles["emailVerification-icon"]}>
            <FaEnvelope></FaEnvelope>
          </div>
          <h2>Email Activation</h2>
        </div>
        <div className={styles["emailVerification-body"]}>
          <p className={styles["emailVerification-paragraph"]}>
            Hi Boss👋🏽, Kindly Activate your email to complete your sign-up
            process.
          </p>
          <button
            className={styles["emailVerification-button"]}
            onClick={handleEmailActivation}
          >
            {isLoading ? <Spinner size={18}></Spinner> : `Activate Email`}
          </button>
        </div>
      </div>
    </section>
  );
}

export default EmailVerification;
