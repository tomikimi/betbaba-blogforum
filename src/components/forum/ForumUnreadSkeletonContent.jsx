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
                width={60}
                height={60}
                baseColor="#c1c1c1"
                highlightColor="#dcdcdc"
              ></Skeleton>
              <div className={styles["reply-details"]}>
                <Skeleton
                  baseColor="#c1c1c1"
                  highlightColor="#dcdcdc"
                  style={{ marginBottom: "1rem", borderRadius: "1rem" }}
                  width={800}
                  height={15}
                ></Skeleton>
                <Skeleton
                  baseColor="#c1c1c1"
                  highlightColor="#dcdcdc"
                  style={{ marginBottom: "1rem", borderRadius: "1rem" }}
                  width={600}
                  height={15}
                ></Skeleton>
                <Skeleton
                  baseColor="#c1c1c1"
                  highlightColor="#dcdcdc"
                  style={{ marginBottom: "1rem", borderRadius: "1rem" }}
                  width={400}
                  height={15}
                ></Skeleton>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default ForumUnreadSkeletonContent;
