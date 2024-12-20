import HomePage from "./pages/HomePage";
import ForumPage from "./pages/ForumPage";
import SettingsPage from "./pages/SettingsPage";
import PageNotFound from "./pages/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForumTopicReplies from "./components/forum/ForumTopicReplies";
import ForumContent from "./components/forum/ForumContent";
import ForumUnreadContent from "./components/forum/ForumUnreadContent";
import ResetPage from "./pages/ResetPage";
import EmailSettings from "./components/settings/EmailSettings";
import PasswordSettings from "./components/settings/PasswordSettings";
import Profile from "./components/settings/Profile";
import PostArticle from "./components/settings/PostArticle";
import ArticleContent from "./components/forum/ArticleContent";
import Verification from "./pages/Verification";
import DiscoverPage from "./pages/DiscoverPage";
import { SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/forum" element={<ForumPage></ForumPage>}>
              <Route index element={<ForumContent></ForumContent>}></Route>
              <Route
                path="forumReplies/:id"
                element={<ForumTopicReplies></ForumTopicReplies>}
              ></Route>
            </Route>

            <Route path="/setting" element={<SettingsPage></SettingsPage>}>
              <Route index element={<Profile></Profile>}></Route>
              <Route
                path="emailSetting"
                element={<EmailSettings></EmailSettings>}
              ></Route>
              <Route
                path="passwordSetting"
                element={<PasswordSettings></PasswordSettings>}
              ></Route>
              <Route
                path="postArticle"
                element={<PostArticle></PostArticle>}
              ></Route>
            </Route>
            <Route
              path="resetPassword/:id"
              element={<ResetPage></ResetPage>}
            ></Route>
            <Route
              path="activateAccount/:id"
              element={<Verification></Verification>}
            ></Route>
            <Route
              path="/Article/:id"
              element={<ArticleContent></ArticleContent>}
            ></Route>
            <Route
              path="Discover/unReadContent"
              element={<DiscoverPage></DiscoverPage>}
            >
              <Route
                index
                element={<ForumUnreadContent></ForumUnreadContent>}
              ></Route>
              <Route
                path="forumReplies/:id"
                element={<ForumTopicReplies></ForumTopicReplies>}
              ></Route>
            </Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
      {/* <button className="primaryBtn" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      {isOpen && <Modal setIsOpen={setIsOpen}></Modal>} */}
    </>
  );
}

export default App;
