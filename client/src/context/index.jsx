import {
  useAddress,
  useContract,
  useContractWrite,
  useMetamask,
} from "@thirdweb-dev/react";
import { createContext, useContext } from "react";
import { ethers } from "ethers";
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x17F7227651952b865e1Dd875393Ac197C27DF853"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    let errorObject;
    if (!address) await connect();
    try {
      return await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(), // deadline,
          form.image,
        ],
      });
    } catch (error) {
      errorObject = error;
      console.log(error);
    }
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

  const getAllDonationsOfOne = async (id) => {
    try {
      const allDonations = await contract.call("getDonators", [id]);
      const numberOfDonations = allDonations[0].length;
      const parsedDonations = [];
      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: allDonations[0][i],
          donation: ethers.utils.formatEther(allDonations[1][i].toString()),
        });
      }
      console.log(parsedDonations);
      return parsedDonations;
    } catch (error) {
      console.log(error);
    }
  };
  const donate = async (pId, amount) => {
    if (!address) connect();
    const data = await contract.call("donateToCampaign", [pId], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  return (
    <StateContext.Provider
      value={{
        contract,
        address,
        connect,
        createCampaign: publishCampaign,
        getAllCampaigns,
        getAllDonationsOfOne,
        donate,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
