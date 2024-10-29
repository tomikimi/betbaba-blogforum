import Skeleton from "react-loading-skeleton";
import styles from "./articleContent.module.css";
function ArticleContentSkeleton({ type }) {
  return (
    <>
      {type === "header-skeleton" && (
        <>
          <div className={styles["article-img-box"]}>
            <Skeleton
              className={styles["article-img-skeleton"]}
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
            ></Skeleton>
          </div>
          <div
            className={styles["article-text-box"]}
            style={{ background: "#fff" }}
          >
            <Skeleton
              count={2}
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              style={{
                marginBottom: "1rem",
                padding: ".3rem",
                borderRadius: "1.7rem",
              }}
            ></Skeleton>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Skeleton
              count={2}
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              width={300}
              style={{
                marginBottom: "1rem",
                padding: ".3rem",
                borderRadius: "1.7rem",
              }}
            ></Skeleton>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Skeleton
              count={2}
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              width={200}
              style={{
                marginBottom: "1rem",
                padding: ".3rem",
                borderRadius: "1.7rem",
              }}
            ></Skeleton>
          </div>
        </>
      )}
      {type === "body-skeleton" && (
        <>
          <div className={styles["article-container"]}>
            <Skeleton
              count={1}
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              className={styles["article-skeleton-time"]}
            ></Skeleton>
            <Skeleton
              count={1}
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              className={styles["article-skeleton-lg-body"]}
            ></Skeleton>
            <Skeleton
              count={1}
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              className={styles["article-skeleton-md-body"]}
            ></Skeleton>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Skeleton
              count={20}
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              className={styles["article-skeleton-lg-body"]}
            ></Skeleton>
          </div>
        </>
      )}
    </>
  );
}

export default ArticleContentSkeleton;
