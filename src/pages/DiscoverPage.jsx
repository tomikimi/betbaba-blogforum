import AppNav from "../components/AppNav";
import TaskBar from "../components/TaskBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
function DiscoverPage() {
  const pathName = "Home";
  return (
    <>
      <AppNav></AppNav>
      <TaskBar path={pathName}></TaskBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default DiscoverPage;
