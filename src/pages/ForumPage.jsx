import AppNav from "../components/AppNav";
import TaskBar from "../components/TaskBar";
// import CreateTopic from "../components/forum/CreateTopic";
// import ForumContent from "../components/forum/ForumContent";
// import ForumUnreadContent from "../components/forum/ForumUnreadContent";
// import ForumTopicReplies from "../components/forum/forumTopicReplies";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
function ForumPage() {
  const pathName = "Home";
  return (
    <>
      <AppNav></AppNav>
      <TaskBar path={pathName}></TaskBar>
      {/* <ForumContent></ForumContent> */}
      <Outlet></Outlet>
      {/* <CreateTopic></CreateTopic> */}
      {/* <ForumUnreadContent></ForumUnreadContent> */}
      {/* <ForumTopicReplies></ForumTopicReplies> */}
      <Footer></Footer>
    </>
  );
}

export default ForumPage;
