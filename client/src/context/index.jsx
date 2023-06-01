import {
  useAddress,
  useContract,
  useContractWrite,
  useMetamask,
} from "@thirdweb-dev/react";
import { createContext, useContext } from "react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const contract = useContract("0x17F7227651952b865e1Dd875393Ac197C27DF853");
  const {
    mutateAsync: createCampaign,
    isLoading,
    isError,
    isSuccess,
  } = useContractWrite(contract, "createCampaign");
  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async () => {
    let errorObject;
    try {
      const data = await createCampaign([
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image,
      ]);
      console.log(data);
    } catch (error) {
      errorObject = error;
      console.log(error);
    }
    return { data, isLoading, error: errorObject };
  };
  const getAllCampaigns = async () => {
    const allCampaigns = await contract.call("getCampaigns");
    console.log(allCampaigns);
    return allCampaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));
  };
  return (
    <StateContext.Provider
      value={{
        contract,
        address,
        connect,
        createCampaign: publishCampaign,
        getAllCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
