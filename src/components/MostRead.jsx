import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingContent from "../util/LoadingContent";
import styles from "./mostRead.module.css";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

function MostRead() {
  const [posts, setPosts] = useState([]);

  useEffect(function () {
    async function getMostRead() {
      const { data } = await axios.get(`${VITE_API_URL}forum/mostReadPosts`);
      setPosts(() => data.posts);
    }
    getMostRead();
  }, []);
  return (
    <section className={styles["section-mostRead"]}>
      <div className={styles["mostRead-container"]}>
        <h2 className={styles["mostRead-header"]}>Most Read</h2>
        <ul className={styles["mostRead-list"]}>
          {posts.length === 0 ? (
            <LoadingContent></LoadingContent>
          ) : (
            posts.map((post, index) => (
              <>
                <li className={styles["mostRead-item"]} key={post._id}>
                  <span className={styles["mostRead-number"]}>{index + 1}</span>
                  <Link
                    to={`forum/forumReplies/${post._id}`}
                    className={styles["mostRead-content"]}
                  >
                    {post.title}
                  </Link>
                </li>
              </>
            ))
          )}
          {/* <li className={styles["mostRead-item"]}>
            <span className={styles["mostRead-number"]}>1</span>
            <Link to={`forumReplies/`} className={styles["mostRead-content"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              accusantium dolorum nihil sequi odit facere laborum quos
              necessitatibus iste. Mollitia.
            </Link>
          </li>
          <li className={styles["mostRead-item"]}>
            <span className={styles["mostRead-number"]}>2</span>
            <Link to={`forumReplies/`} className={styles["mostRead-content"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              accusantium dolorum nihil sequi odit facere laborum quos
              necessitatibus iste. Mollitia.
            </Link>
          </li>
          <li className={styles["mostRead-item"]}>
            <span className={styles["mostRead-number"]}>3</span>
            <Link to={`forumReplies/`} className={styles["mostRead-content"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              accusantium dolorum nihil sequi odit facere laborum quos
              necessitatibus iste. Mollitia.
            </Link>
          </li>
          <li className={styles["mostRead-item"]}>
            <span className={styles["mostRead-number"]}>4</span>
            <Link to={`forumReplies/`} className={styles["mostRead-content"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              accusantium dolorum nihil sequi odit facere laborum quos
              necessitatibus iste. Mollitia.
            </Link>
          </li>
          <li className={styles["mostRead-item"]}>
            <span className={styles["mostRead-number"]}>5</span>
            <Link to={`forumReplies/`} className={styles["mostRead-content"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              accusantium dolorum nihil sequi odit facere laborum quos
              necessitatibus iste. Mollitia.
            </Link>
          </li>
          <li className={styles["mostRead-item"]}>
            <span className={styles["mostRead-number"]}>6</span>
            <Link to={`forumReplies/`} className={styles["mostRead-content"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              accusantium dolorum nihil sequi odit facere laborum quos
              necessitatibus iste. Mollitia.
            </Link>
          </li>
          <li className={styles["mostRead-item"]}>
            <span className={styles["mostRead-number"]}>7</span>
            <Link to={`forumReplies/`} className={styles["mostRead-content"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              accusantium dolorum nihil sequi odit facere laborum quos
              necessitatibus iste. Mollitia.
            </Link>
          </li>
          <li className={styles["mostRead-item"]}>
            <span className={styles["mostRead-number"]}>8</span>
            <Link to={`forumReplies/`} className={styles["mostRead-content"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              accusantium dolorum nihil sequi odit facere laborum quos
              necessitatibus iste. Mollitia.
            </Link>
          </li> */}
        </ul>
      </div>
    </section>
  );
}

export default MostRead;
