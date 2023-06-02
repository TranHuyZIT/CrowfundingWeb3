import DisplayCampaigns from "../components/DisplayCampaigns";

const Home = () => {
  return (
    <DisplayCampaigns title="All campaigns" isLoading={false} campaigns={[]} />
  );
};
export default Home;
