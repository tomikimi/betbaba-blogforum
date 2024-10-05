import styles from "./liveTableFeed.module.css";
function LiveTableFeed() {
  return (
    <>
      <section className={styles["section-feeds"]}>
        <div className="container">
          <h2 className={styles["feeds-header"]}>Live League Tables</h2>
        </div>
        <div className={`${styles["feeds-container"]} grid grid--2-cols`}>
          <div>
            <iframe
              className={styles["feeds-board"]}
              src="https://www.scorebing.com/widgets/table?lid=0&c=2F8162&f=FFF"
              scrolling="auto"
              border="0"
            ></iframe>
          </div>
          <div>
            <iframe
              className={styles["feeds-board"]}
              src="https://www.scorebing.com/widgets/live?lid=0&c=2F8162&f=FFF"
              scrolling="auto"
              border="0"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}

export default LiveTableFeed;
