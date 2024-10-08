import { Spinner } from "@blueprintjs/core";
import styles from "./loadingContent.module.css";
function LoadingContent() {
  return (
    <div className={styles["loader-container"]}>
      <Spinner size={25}></Spinner>
      <p className={styles["loader-text"]}>Loading Content</p>
    </div>
  );
}

export default LoadingContent;
