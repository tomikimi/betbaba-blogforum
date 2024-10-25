import Skeleton from "react-loading-skeleton";
import styles from "./topicReplies.module.css";

function TopicRepliesSkeleton() {
  return (
    <div>
      <Skeleton
        baseColor="#c1c1c1"
        highlightColor="#dcdcdc"
        style={{
          marginBottom: "1.5rem",
          borderRadius: "3rem",
        }}
      ></Skeleton>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <div className={styles["main-post-timeline"]}>
        <Skeleton
          baseColor="#c1c1c1"
          highlightColor="#dcdcdc"
          width={200}
          style={{
            marginBottom: "1rem",
            borderRadius: "3rem",
          }}
        ></Skeleton>
        <Skeleton
          baseColor="#c1c1c1"
          highlightColor="#dcdcdc"
          width={400}
          style={{
            marginBottom: "1.5rem",
            borderRadius: "3rem",
          }}
        ></Skeleton>
      </div>
    </div>
  );
}

export default TopicRepliesSkeleton;
