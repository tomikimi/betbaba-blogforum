import styles from "./modal.module.css";
import { RiCloseLine } from "react-icons/ri";

function Modal({ setIsOpen, setOption, children }) {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>
              {setOption !== "" ? setOption : "Message Dialog"}
            </h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }}></RiCloseLine>
          </button>
          {/* <div className={styles.modalContent}>
            Are you sure you want to delete the item?
          </div> */}
          {children}

          {/* <div className={styles.modalButtonActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.registerBtn}
                onClick={() => setIsOpen(false)}
              >
                Create Account
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Modal;
