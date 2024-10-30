import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingContent from "../util/LoadingContent";
import axios from "axios";
import styles from "./News.module.css";
import NewsSkeleton from "./NewsSkeleton";

const { VITE_API_URL, VITE_PHOTO_PATH } = import.meta.env;

function News() {
  const [articles, setArticles] = useState([]);

  useEffect(function () {
    async function fetchTop6Articles() {
      try {
        const res = await axios(`${VITE_API_URL}forum/top3Articles`);
        const { forum } = res.data;
        setArticles(forum);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTop6Articles();
  }, []);
  // console.log(feeds.filter((feed) => feed[0] > 1));

  return (
    <>
      {articles.length === 0 ? (
        // <LoadingContent></LoadingContent>
        <NewsSkeleton news={6}></NewsSkeleton>
      ) : (
        <section className={styles["section-news"]}>
          <div className={`${styles["news-container"]} grid grid--3-cols`}>
            {articles.map((article) => (
              <div className="content" key={article._id}>
                <Link to={`/Article/${article._id}`}>
                  <div className={styles["news-content-img-box"]}>
                    <img
                      src={`${VITE_PHOTO_PATH}${article.photo}`}
                      alt="Cashout Offer"
                      loading="lazy"
                      className={styles["news-content-img"]}
                    />
                  </div>
                </Link>
                <div className={styles["news-content-text-box"]}>
                  <span className="span-label">{article.type}</span>
                  <p className="paragraph-primary">
                    <Link
                      className={styles["news-article-link"]}
                      to={`/Article/${article._id}`}
                    >
                      {article.title}
                    </Link>
                  </p>
                  <div className={styles["news_logo_sm_container"]}>
                    <img
                      src="/logo/betbaba_logo_sm.PNG"
                      alt="betbaba_logo"
                      className="logo_sm"
                    />
                    <span className="span-logo-text">BetBaba</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default News;
