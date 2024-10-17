import { useEffect, useState } from "react";
import { FaClockRotateLeft, FaComment } from "react-icons/fa6";
import { format } from "date-fns";
import { Spinner } from "@blueprintjs/core";
import axios from "axios";
import LoadingContent from "../../util/LoadingContent";
import styles from "./forumUnreadContent.module.css";
import { Link } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;

function ForumUnreadContent() {
  const [topics, setTopics] = useState([]);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchUnreadTopics() {
      try {
        const res = await axios.get(`${VITE_API_URL}forum`);
        const { forum } = res.data;
        setTopics(() => forum);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUnreadTopics();
  }, []);

  async function handleFetchPosts() {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${VITE_API_URL}forum/unread?page=${page}&limit=1`
      );
      setPage((val) => Number(val + 1));
      const { data } = res.data;
      setTopics((curVal) => [...curVal, ...data]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function formatDate(value, type) {
    let res;
    if (type === "PostTime") {
      res = format(value, "MMMM dd, yyyy");
    } else if (type === "ReplyTime") {
      res = format(value, "MMM dd, hh:mm aaa");
    }

    return res;
  }

  function getFirstLetter(value) {
    // Using string literal
    // const data = value;
    // using split
    const data2 = value.split("", 1);
    return data2;
  }

  return (
    <>
      <section className={styles["section-unread-content"]}>
        {topics.length === 0 ? (
          <LoadingContent></LoadingContent>
        ) : (
          <div
            className={styles["forum-topic-replies-container"]}
            key={topics._id}
          >
            {topics.map((topic) => (
              <>
                <div
                  className={styles["unread-content-container"]}
                  key={topic._id}
                >
                  <div className={styles["reply-user-content"]}>
                    <span className={styles["reply-user-letter"]}>
                      {getFirstLetter(topic.createdBy[0].name)}
                    </span>
                  </div>
                  <div className={styles["reply-details"]}>
                    <span className={styles["unread-content-post"]}>
                      <Link
                        to={`forumReplies/${topic._id}`}
                        className={styles["unread-content-post"]}
                      >
                        {topic.title}
                      </Link>
                    </span>
                    <p className={styles["reply-data"]}>
                      {topic.createdBy[0].name} Posted a Topic in{" "}
                      {topic.category[0].name}
                    </p>
                    <div className={styles["unread-post-timeline"]}>
                      <span className={styles["reply-time"]}>
                        <FaClockRotateLeft
                          style={{
                            marginRight: ".5rem",
                            fontSize: "1.4rem",
                          }}
                        ></FaClockRotateLeft>

                        {formatDate(topic.createdAt, "PostTime")}
                      </span>

                      <span className={styles["reply-time"]}>
                        <FaComment
                          style={{
                            marginRight: ".5rem",
                            fontSize: "1.4rem",
                          }}
                        ></FaComment>
                        {topic.totalReviews} Replies
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ))}

            <div className={styles["unread-action-button"]}>
              <button
                className={styles["reply-button"]}
                onClick={handleFetchPosts}
              >
                {isLoading ? (
                  <Spinner size={18}></Spinner>
                ) : (
                  ` Load More Content`
                )}
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default ForumUnreadContent;
