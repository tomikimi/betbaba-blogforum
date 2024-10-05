import styles from "./createTopic.module.css";
import input from "../settings/emailSettings.module.css";
function CreateTopic() {
  return (
    <>
      <section className={styles["section-topic"]}>
        <h1 className={styles["topic-header"]}>Create New Topic</h1>
        <div className={styles["topic-container"]}>
          <form action="">
            <div className={input.formController}>
              <label htmlFor="title" className={input.formLabel}>
                Title
                <span className={input.reqField}>required</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className={styles.formInput}
              />
            </div>
            <div className={input.formController}>
              <label htmlFor="category" className={input.formLabel}>
                Category
                <span className={input.reqField}>required</span>
              </label>
              <select className={styles.formInput}>
                <option>--Select--</option>
                <option>General</option>
                <option>SportsBook</option>
                <option>Virtual</option>
              </select>
            </div>
            <div className={input.formController}>
              <label htmlFor="content" className={input.formLabel}>
                Content
                <span className={input.reqField}>required</span>
              </label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className={styles.formInput}
              ></textarea>
            </div>
          </form>
          <div className={styles.buttonAction}>
            <button className={styles.registerBtn}>Submit Topic</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default CreateTopic;
