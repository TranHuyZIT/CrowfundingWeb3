import { Link } from "react-router-dom";
import { loader } from "../assets";
import FundCard from "./FundCard";
const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left ">
        {title} {campaigns.length}
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            alt="loading..."
            className="w-[100px] h-[100px] object-contain m-auto"
            src={loader}
          />
        )}
        {!isLoading && campaigns.length == 0 && (
          <div className="flex justify-center flex-col w-full">
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183] text-center">
              You have not created any campaigns yet
            </p>
            <button className="rounded bg-[#1ed5ae] text-white p-2 shadow-secondary m-auto">
              <Link to="/create-campaign">
                <p className="font-epilogue">Create Campaign</p>
              </Link>
            </button>
          </div>
        )}
        {!isLoading &&
          campaigns.map((campaign, index) => (
            <FundCard key={index} campaign={campaign} />
          ))}
        {}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
