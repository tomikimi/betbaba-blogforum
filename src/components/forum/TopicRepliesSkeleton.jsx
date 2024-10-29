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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Skeleton
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              width={900}
              height={500}
              style={{ borderRadius: "1rem" }}
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
                  width={60}
                  height={60}
                  baseColor="#c1c1c1"
                  highlightColor="#dcdcdc"
                ></Skeleton>
                <div>
                  <Skeleton
                    count={3}
                    style={{ marginBottom: "1rem", borderRadius: "1rem" }}
                    width={800}
                    height={15}
                    baseColor="#c1c1c1"
                    highlightColor="#dcdcdc"
                  ></Skeleton>
                  <Skeleton
                    count={2}
                    style={{ marginBottom: "1rem", borderRadius: "1rem" }}
                    width={400}
                    height={15}
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
