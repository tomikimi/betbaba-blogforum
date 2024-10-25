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
              count={4}
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              style={{
                marginBottom: "1rem",
                padding: ".5rem",
                borderRadius: "1.7rem",
              }}
            ></Skeleton>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Skeleton
              count={3}
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              width={300}
              style={{
                marginBottom: "1rem",
                padding: ".5rem",
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
              width={200}
              height={50}
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              style={{
                marginBottom: "5rem",
                marginTop: "2rem",
                borderRadius: "3rem",
              }}
            ></Skeleton>
            <Skeleton
              count={1}
              width={1150}
              height={10}
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              style={{
                marginBottom: "1.5rem",
                borderRadius: "3rem",
              }}
            ></Skeleton>
            <Skeleton
              count={1}
              width={575}
              height={10}
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              style={{
                marginBottom: "1.5rem",
                borderRadius: "3rem",
              }}
            ></Skeleton>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Skeleton
              count={20}
              width={1150}
              height={10}
              baseColor="#c1c1c1"
              highlightColor="#dcdcdc"
              style={{
                marginBottom: "1.5rem",
                borderRadius: "3rem",
              }}
            ></Skeleton>
          </div>
        </>
      )}
    </>
  );
}

export default ArticleContentSkeleton;
