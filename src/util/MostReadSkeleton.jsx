import Skeleton from "react-loading-skeleton";
import styles from "../components/mostRead.module.css";

function MostReadSkeleton({ posts }) {
  return Array(posts)
    .fill(0)
    .map((_, id) => (
      <div className={styles["mostRead-item-skeleton"]} key={id}>
        <Skeleton></Skeleton>
      </div>
    ));
}

export default MostReadSkeleton;
