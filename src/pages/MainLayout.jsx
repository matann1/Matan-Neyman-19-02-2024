import { Outlet } from "react-router-dom";
import { Header } from "../components";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <div className="md:block hidden fixed top-0 left-0 h-full w-full blur-[250px] -z-[1] overflow-hidden">
        <div className="bottom-0 left-0 h-[400px] w-[400px] bg-[#8e7bff] mix-blend-lighten -translate-x-[30%] translate-y-[40%] absolute rounded-[100%] "></div>
        <div className="top-0 right-0 h-[400px] w-[400px] bg-[#44f2eb] mix-blend-lighten translate-x-[20%] -translate-y-[40%] absolute rounded-[100%] "></div>
      </div>
    </>
  );
};

export default MainLayout;
