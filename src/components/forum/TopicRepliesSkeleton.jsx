import Skeleton from "react-loading-skeleton";
import styles from "./topicReplies.module.css";

function TopicRepliesSkeleton({ type, post }) {
  return (
    <>
      {type === "topic-header" && (
        <div>
          <Skeleton
            baseColor="#c1c1c1"
            highlightColor="#dcdcdc"
            className={styles["topic-reply-skeleton-head-sm"]}
          ></Skeleton>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className={styles["main-post-timeline"]}>
            <Skeleton
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              className={styles["topic-reply-skeleton-head-md"]}
            ></Skeleton>
            <Skeleton
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              className={styles["topic-reply-skeleton-head-md2"]}
            ></Skeleton>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Skeleton
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              className={styles["topic-reply-skeleton-head-lg"]}
            ></Skeleton>
          </div>
        </div>
      )}
      {type === "topic-body" &&
        Array(post)
          .fill(0)
          .map((_, i) => (
            <div key={i} className={styles["main-post-user-replies"]}>
              <div className={styles["skeleton-user-reply"]}>
                <Skeleton
                  circle
                  className={styles["topic-reply-skeleton-body-circle"]}
                  baseColor="#c1c1c1"
                  highlightColor="#dcdcdc"
                ></Skeleton>
                <div>
                  <Skeleton
                    count={3}
                    className={styles["topic-reply-skeleton-body-lg"]}
                    baseColor="#c1c1c1"
                    highlightColor="#dcdcdc"
                  ></Skeleton>
                  <Skeleton
                    count={2}
                    className={styles["topic-reply-skeleton-body-md"]}
                    baseColor="#c1c1c1"
                    highlightColor="#dcdcdc"
                  ></Skeleton>
                </div>
              </div>
            </div>
          ))}
      {type === "topic-stat" &&
        Array(post)
          .fill(0)
          .map((_, i) => (
            <div key={i} className={styles["post-stat"]}>
              <Skeleton
                circle
                width={60}
                height={60}
                baseColor="#c1c1c1"
                highlightColor="#dcdcdc"
              ></Skeleton>
            </div>
          ))}
    </>
  );
}

export default TopicRepliesSkeleton;
