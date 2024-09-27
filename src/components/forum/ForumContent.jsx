import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import styles from "./ForumContent.module.css";
import LoadingContent from "../../util/LoadingContent";
import { Spinner } from "@blueprintjs/core";

const apiLink = "http://127.0.0.1:3001/api/v1/";

function ForumContent() {
  const [topics, setTopics] = useState([]);
  const [topicReview, setTopicReview] = useState([]);
  const [userStats, setUserStats] = useState([]);
  useEffect(function () {
    async function fetchTopics() {
      try {
        const res = await axios.get(`${apiLink}forum`);
        const { forum } = res.data;
        setTopics(() => forum);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTopics();
  }, []);

  useEffect(function () {
    async function fetchForumReviewStats() {
      try {
        const res = await axios.get(`${apiLink}forum/forumReviewStats`);
        const { data } = res;
        setTopicReview(() => data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchForumReviewStats();
  }, []);

  useEffect(function () {
    async function fetchUserStats() {
      try {
        const res = await axios.get(`${apiLink}forum/userStats`);
        const { data } = res;
        console.log(data);
        setUserStats(() => data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserStats();
  }, []);

  function formatDate(value, type) {
    let res;
    if (type === "PostTime") {
      res = format(value, "MMMM dd, yyyy");
    } else if (type === "ReplyTime") {
      res = format(value, "MMM dd, hh:mm aaa");
    }

    return res;
  }
  return (
    <>
      <section className={styles["section-forum"]}>
        {topics.length === 0 ? (
          <LoadingContent></LoadingContent>
        ) : (
          <div className={styles["forum-container"]}>
            <div className={styles["forum-header-container"]}>
              <h3 className={styles["forum-header"]}>Recent Discussions</h3>
            </div>
            <ul className={styles["forum-list-container"]}>
              {topics.map((topic) => (
                <li className={styles["forum-list"]} key={topic._id}>
                  <div>
                    <h4>
                      <Link
                        to={`forumReplies/${topic._id}`}
                        className={styles["forum-topic"]}
                      >
                        {topic.title}
                      </Link>
                    </h4>
                    <p className={styles["forum-date"]}>
                      By {topic.createdBy[0].name},{" "}
                      {formatDate(topic.createdAt, "PostTime")} in{" "}
                      {topic.category[0].name}
                    </p>
                  </div>
                  <div className={styles["forum-actions"]}>
                    <span className={styles["forum-action"]}>
                      {topic.totalReviews} replies
                    </span>
                    <span className={styles["forum-action"]}>
                      {topic.totalViews ? topic.totalViews : 0} views
                    </span>
                  </div>
                  <div className={styles["forum-actions"]}>
                    <span className={styles["forum-action"]}>
                      recent reply:{" "}
                      {topic.review.length > 0
                        ? topic.review[0].postBy[0].displayName
                        : "None"}
                    </span>
                    <span className={styles["forum-action"]}>
                      {topic.review.length > 0
                        ? formatDate(topic.review[0].createdAt, "ReplyTime")
                        : "00:00:00"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles["forum-social-links"]}>
          <div className={styles["forum-stat-card"]}>
            <div className={styles["forum-header-container"]}>
              <h3 className={styles["forum-header"]}>Forum Statistics</h3>
            </div>

            <ul className={styles["forum-stat-list"]}>
              <li className={styles["forum-stat-listItem"]}>
                <span className={styles["stat-tag"]}>Total Topics</span>
                <span className={styles["stat-figure"]}>
                  {topicReview.length === 0 ? (
                    <Spinner size={18}></Spinner>
                  ) : (
                    topicReview.topic[0].totalTopics
                  )}
                </span>
              </li>
              <li className={styles["forum-stat-listItem"]}>
                <span className={styles["stat-tag"]}>Total Posts</span>
                <span className={styles["stat-figure"]}>
                  {topicReview.length === 0 ? (
                    <Spinner size={18}></Spinner>
                  ) : (
                    topicReview.review[0].totalReviews
                  )}
                </span>
              </li>
            </ul>
          </div>
          <div className={styles["forum-stat-card"]}>
            <div className={styles["forum-header-container"]}>
              <h3 className={styles["forum-header"]}>Member Statistics</h3>
            </div>
            <ul className={styles["forum-stat-list"]}>
              <li className={styles["forum-stat-listItem"]}>
                <span className={styles["stat-tag"]}>Total Members</span>
                <span className={styles["stat-figure"]}>
                  {userStats.length === 0 ? (
                    <Spinner size={18}></Spinner>
                  ) : (
                    userStats.users[0].totalUsers
                  )}
                </span>
              </li>
              <li className={styles["forum-stat-listItem"]}>
                <span className={styles["stat-tag"]}>Newest Member</span>
                <span className={styles["stat-figure"]}>
                  {" "}
                  {userStats.length === 0 ? (
                    <Spinner size={18}></Spinner>
                  ) : (
                    userStats.member[0].displayName
                  )}
                </span>
              </li>
            </ul>
          </div>
          <div>
            <a href="#">
              <img
                src="/promo/telegram_banner.png"
                alt="betbaba telegram channel"
                className={styles["forum-social-icon"]}
              />
            </a>
          </div>
          <div>
            <a href="#">
              <img
                src="/promo/instagram_banner.png"
                alt="betbaba instagram channel"
                className={styles["forum-social-icon"]}
              />
            </a>
          </div>
          <div>
            <a href="#">
              <img
                src="/promo/youtube_banner.png"
                alt="betbaba youtube channel"
                className={styles["forum-social-icon"]}
              />
            </a>
          </div>
          <div>
            <a href="#">
              <img
                src="/promo/facebook_banner.png"
                alt="betbaba facebook channel"
                className={styles["forum-social-icon"]}
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForumContent;