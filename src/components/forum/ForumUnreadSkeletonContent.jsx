import Skeleton from "react-loading-skeleton";
import styles from "./forumUnreadContent.module.css";
function ForumUnreadSkeletonContent({ post }) {
  return (
    <>
      <div className={styles["forum-topic-replies-container"]}>
        {Array(post)
          .fill(0)
          .map((_, i) => (
            <div className={styles["unread-content-container"]} key={i}>
              <Skeleton
                circle
                className={styles["unread-content-circle-skeleton-sm"]}
                baseColor="#c1c1c1"
                highlightColor="#dcdcdc"
              ></Skeleton>
              <div className={styles["reply-details"]}>
                <Skeleton
                  baseColor="#c1c1c1"
                  highlightColor="#dcdcdc"
                  className={styles["unread-content-skeleton-lg"]}
                ></Skeleton>
                <Skeleton
                  baseColor="#c1c1c1"
                  highlightColor="#dcdcdc"
                  className={styles["unread-content-skeleton-md"]}
                ></Skeleton>
                <Skeleton
                  baseColor="#c1c1c1"
                  highlightColor="#dcdcdc"
                  className={styles["unread-content-skeleton-sm"]}
                ></Skeleton>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default ForumUnreadSkeletonContent;
