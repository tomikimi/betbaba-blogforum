import { useEffect, useState } from "react";
import axios from "axios";
import {
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CImage,
} from "@coreui/react";
import LoadingContent from "../util/LoadingContent";
import "@coreui/coreui/dist/css/coreui.min.css";
import styles from "./Hero.module.css";
import { Link } from "react-router-dom";

const { VITE_APP_ENV, VITE_API_URL, VITE_PHOTO_PATH } = import.meta.env;

function Hero() {
  const [fliers, setFliers] = useState([]);
  console.log(VITE_APP_ENV);

  useEffect(function () {
    async function fetchMatchOfTheDay() {
      try {
        const res = await axios(`${VITE_API_URL}forum/MatchOfTheDay`);
        const { forum } = res.data;
        console.log(forum);
        setFliers(forum);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMatchOfTheDay();
  }, []);

  return (
    <>
      {fliers.length === 0 ? (
        <LoadingContent></LoadingContent>
      ) : (
        <section className={styles["section-hero"]}>
          <div className={styles.hero}>
            <CCarousel controls indicators interval={5000}>
              {fliers.map((flier) => (
                <CCarouselItem
                  key={flier.id}
                  className={styles["hero-img-box"]}
                >
                  <CImage
                    className={styles["hero-img"]}
                    src={`${VITE_PHOTO_PATH}${flier.photo}`}
                    alt={flier?.type}
                  />
                  <CCarouselCaption className={styles["hero-text-box"]}>
                    <Link
                      to={
                        "https://www.betbaba.ng/en/sports/pre-match/event-view"
                      }
                      target="_blank"
                      className={styles["hero-link"]}
                    >
                      <h2 className="heading-secondary">{flier?.title}</h2>
                      <p className="paragraph-primary">
                        <div
                          dangerouslySetInnerHTML={{ __html: flier.content }}
                        ></div>
                      </p>
                    </Link>
                  </CCarouselCaption>
                </CCarouselItem>
              ))}
            </CCarousel>
            {/* <div className={styles["hero-img-box"]}>
              <img
                src={`${photoPath}${flier[0].photo}`}
                alt={flier[0]?.type}
                className={styles["hero-img"]}
              />
            </div>
            <div className={styles["hero-text-box"]}>
              <h2 className="heading-secondary">{flier[0]?.title}</h2>
              <p className="paragraph-primary">
                <div
                  dangerouslySetInnerHTML={{ __html: flier[0].content }}
                ></div>
              </p>
              <div className="logo_sm_container">
                <img
                  src="/logo/betbaba_logo_sm.PNG"
                  className="logo-sm"
                  alt="betbaba_logo"
                />
                <span className="span-logo-text">BetBaba</span>
              </div>
            </div> */}
          </div>
        </section>
      )}
    </>
  );
}

export default Hero;
