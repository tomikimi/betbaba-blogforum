import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import AppNav from "../AppNav";
import Footer from "../Footer";
import axios from "axios";
import LoadingContent from "../../util/LoadingContent";
import styles from "./articleContent.module.css";

const { VITE_API_URL, VITE_PHOTO_PATH } = import.meta.env;

function ArticleContent() {
  const [article, setArticle] = useState([]);
  const { id } = useParams();

  useEffect(
    function () {
      async function fetchArticle() {
        try {
          const res = await axios(`${VITE_API_URL}forum/article/${id}`);
          const { forum } = res.data.data;
          console.log(forum);

          setArticle(forum);
        } catch (err) {
          console.log(err);
        }
      }
      fetchArticle();
    },
    [id]
  );

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
      <AppNav></AppNav>
      <section className={styles["section-article"]}>
        <div className={styles.article}>
          {article.length === 0 ? (
            <LoadingContent></LoadingContent>
          ) : (
            <>
              <div className={styles["article-img-box"]}>
                <img
                  src={`${VITE_PHOTO_PATH}${article[0].photo}`}
                  className={styles["article-img"]}
                />
              </div>
              <div className={styles["article-text-box"]}>
                <h2 className="heading-secondary-md">{article[0].title}</h2>
                <p className="paragraph-primary-md">
                  written by {article[0].createdBy[0].name}
                </p>
                <p className="paragraph-primary-md">
                  {formatDate(article[0].createdAt, "PostTime")}
                </p>
                <div className="logo_sm_container">
                  <img
                    src="/logo/betbaba_logo_sm.PNG"
                    className="logo-sm"
                    alt="betbaba_logo"
                  />
                  <span className="span-logo-text">BetBaba</span>
                </div>
              </div>
            </>
          )}
        </div>
        {article.length === 0 ? (
          <LoadingContent></LoadingContent>
        ) : (
          <>
            <div className={styles["article-container"]}>
              <div className={styles["article-content"]}>
                <div className={styles["article-dateStamp"]}>
                  <span className={styles["article-label"]}>Posted on -</span>
                  <span className={styles["article-date"]}>
                    {formatDate(`${article[0].createdAt}`, "ReplyTime")}
                  </span>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: article[0].content }}
                ></div>
              </div>
            </div>
          </>
        )}
      </section>
      <Footer></Footer>
    </>
  );
}

export default ArticleContent;
