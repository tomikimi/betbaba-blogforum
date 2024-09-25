import styles from "./AccountCreationSignIn.module.css";

function AccountCreationSignIn() {
  return (
    <section className={styles["section-account"]}>
      <div className={styles["accountCreation-container"]}>
        <div className={styles["accountCreation-block"]}>
          <h1 className={styles["accountCreation-h1"]}>
            Create an account or sign in to comment
          </h1>
          <p className={styles["accountCreation-paragraph"]}>
            You need to be a member in order to leave a comment
          </p>
        </div>
        <div className={styles["accountCreation-gridContainer"]}>
          <div className={styles["accountCreation-signUp"]}>
            <h2 className={styles["accountCreation-h2"]}>Create an account</h2>
            <p className={styles["accountCreation-paragraph"]}>
              Sign up for a new account👌. it&apos;s easy!
            </p>
            <button className={styles["accountCreation-btn"]}>
              Register a new account
            </button>
          </div>
          <div className={styles["accountCreation-signIn"]}>
            <h2 className={styles["accountCreation-h2"]}>Sign in</h2>
            <p className={styles["accountCreation-paragraph"]}>
              Already have an account🥳? Sign in here
            </p>
            <button className={styles["accountCreation-btn"]}>
              Sign In Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountCreationSignIn;
