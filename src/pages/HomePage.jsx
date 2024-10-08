import { useEffect, useState } from "react";
import AppNav from "../components/AppNav";
import Hero from "../components/Hero";
import News from "../components/News";
import Promotions from "../components/Promotions";
import Virtuals from "../components/Virtuals";
import Footer from "../components/Footer";
import LiveTableFeed from "../components/LiveTableFeed";
import { Outlet } from "react-router-dom";
import MostRead from "../components/MostRead";

const goalNewsKey = "1qapi5e2olfk1d8iwkli7kitltfovkd38oj7fyxa";

`https://cdn.mysitemapgenerator.com/shareapi/rss/1508793958`;

function HomePage() {
  const [feeds, setFeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function NewsFeed() {
      try {
        setIsLoading(true);

        const res = await fetch(
          `  https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcdn.mysitemapgenerator.com%2Fshareapi%2Frss%2F0309802557&api_key=${goalNewsKey}`
        );

        if (!res.ok) throw new Error("Something happened while fetching data");

        const data = await res.json();
        if (data.status !== "ok") throw new Error("Problem fetching data");
        setFeeds(data.items);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    NewsFeed();
  }, []);

  return (
    <>
      <AppNav></AppNav>
      <Outlet></Outlet>
      <Hero feeds={feeds} isLoading={isLoading}></Hero>
      <News feeds={feeds} isLoading={isLoading}></News>
      <Promotions></Promotions>
      <Virtuals></Virtuals>
      <LiveTableFeed></LiveTableFeed>
      <MostRead></MostRead>
      <Footer></Footer>
    </>
  );
}

export default HomePage;
