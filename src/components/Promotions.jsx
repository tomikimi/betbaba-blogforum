import { Link } from "react-router-dom";
import styles from "./Promotions.module.css";

function Promotions() {
  // const [articles, setArticles] = useState([]);

  // useEffect(function () {
  //   async function fetchTop3Articles() {
  //     try {
  //       const res = await axios(`${apiLink}forum/top3Articles`);
  //       const { forum } = res.data;
  //       setArticles(forum);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchTop3Articles();
  // }, []);
  return (
    <>
      {/* {articles.length === 0 ? (
        <LoadingContent></LoadingContent>
      ) : (
        <section className={styles["section-promotions"]}>
          <div className="container">
            <h2 className="heading-primary">Offers & Promotions</h2>
          </div>
          <div className={`${styles["promotion-container"]} grid grid--3-cols`}>
            {articles.map((article) => (
              <div className="content" key={article._id}>
                <Link to={`/Article/${article._id}`}>
                  <div className={styles["promotion-content-img-box"]}>
                    <img
                      src={`${photoPath}${article.photo}`}
                      alt="Cashout Offer"
                      className={styles["promotion-content-img"]}
                    />
                  </div>
                </Link>

                <div className={styles["promotion-content-text-box"]}>
                  <span className="span-label">{article.type}</span>
                  <p className="paragraph-primary">{article.title}</p>
                  <div className={styles["promotion_logo_sm_container"]}>
                    <img
                      src="/logo/betbaba_logo_sm.PNG"
                      alt="betbaba_logo"
                      className="logo_sm"
                    />
                    <span className="span-logo-text">BetBaba</span>
                  </div>
                </div>
              </div>
            ))} */}
      <section className={styles["section-promotions"]}>
        <div className="container">
          <h2 className="heading-primary">Offers & Promotions</h2>
        </div>
        <div className={`${styles["promotion-container"]} grid grid--3-cols`}>
          <div className="content">
            <Link to="https://www.betbaba.ng/en/promotions/sport/202653/cashout">
              <div className={styles["promotion-content-img-box"]}>
                <img
                  src="/promo/cashout_offer.webp"
                  alt="Cashout Offer"
                  loading="lazy"
                  className={styles["promotion-content-img"]}
                />
              </div>
            </Link>

            <div className={styles["promotion-content-text-box"]}>
              <span className="span-label">CashOut</span>
              <p className="paragraph-primary">
                Fast CashOut Offer within Seconds of Request
              </p>
              <div className={styles["promotion_logo_sm_container"]}>
                <img
                  src="/logo/betbaba_logo_sm.PNG"
                  alt="betbaba_logo"
                  className="logo_sm"
                />
                <span className="span-logo-text">BetBaba</span>
              </div>
            </div>
          </div>
          <div className="content">
            <Link to="https://www.betbaba.ng/en/promotions/sport/202596/first-deposit-bonus">
              <div className={styles["promotion-content-img-box"]}>
                <img
                  src="/promo/bonus_offer.webp"
                  alt="Bonus Offer"
                  loading="lazy"
                  className={styles["promotion-content-img"]}
                />
              </div>
            </Link>

            <div className={styles["promotion-content-text-box"]}>
              <span className="span-label">Bonus</span>
              <p className="paragraph-primary">
                Enjoy 150% As your first deposit Bonus
              </p>
              <div className={styles["promotion_logo_sm_container"]}>
                <img
                  src="/logo/betbaba_logo_sm.PNG"
                  alt="betbaba_logo"
                  className="logo_sm"
                />
                <span className="span-logo-text">BetBaba</span>
              </div>
            </div>
          </div>
          <div className="content">
            <Link to="https://www.betbaba.ng/en/promotions/sport/202652/accumulator-bonus">
              <div className={styles["promotion-content-img-box"]}>
                <img
                  src="/promo/accumulator_offer.webp"
                  alt="Cashout Offer"
                  loading="lazy"
                  className={styles["promotion-content-img"]}
                />
              </div>
            </Link>

            <div className={styles["promotion-content-text-box"]}>
              <span className="span-label">Accumulator</span>
              <p className="paragraph-primary">
                Combine up to 40 selections on your bet-slip and receive 400%
                Bonus
              </p>
              <div className={styles["promotion_logo_sm_container"]}>
                <img
                  src="/logo/betbaba_logo_sm.PNG"
                  alt="betbaba_logo"
                  className="logo_sm"
                />
                <span className="span-logo-text">BetBaba</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Promotions;
