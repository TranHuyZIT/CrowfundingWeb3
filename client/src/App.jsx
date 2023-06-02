import { ConnectWallet } from "@thirdweb-dev/react";
import { Routes, Route } from "react-router-dom";
import "./styles/Home.css";
import Sidebar from "./components/SideBar";
import Home from "./pages/Home";
import CreateCampaign from "./pages/CreateCampaigns";
export default function App() {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create-campaign" element={<CreateCampaign />} />
        </Routes>
      </div>
    </div>
  );
}
