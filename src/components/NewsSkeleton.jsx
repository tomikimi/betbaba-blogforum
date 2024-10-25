import Skeleton from "react-loading-skeleton";
import styles from "./News.module.css";

function NewsSkeleton({ news }) {
  return (
    <section className={styles["section-news"]}>
      <div className={`${styles["news-container"]} grid grid--3-cols`}>
        {Array(news)
          .fill(0)
          .map((_, id) => (
            <div className="content" key={id}>
              <div className={styles["news-content-img-box"]}>
                <Skeleton
                  baseColor="#c1c1c1"
                  highlightColor="#dcdcdc"
                  className={styles["news-content-img-skeleton"]}
                />
              </div>
              <div
                className={styles["news-content-text-box"]}
                style={{ background: "#fff" }}
              >
                <Skeleton
                  count={4}
                  baseColor="#c1c1c1"
                  highlightColor="#dcdcdc"
                  style={{
                    marginBottom: ".5rem",
                    padding: "1.2rem",
                    borderRadius: "1.7rem",
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default NewsSkeleton;
