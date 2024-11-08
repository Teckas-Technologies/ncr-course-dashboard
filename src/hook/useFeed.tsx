import { InfiniteScrollHook } from "@/types/types";
import { FETCH_FEED_NEW } from "../../utils/graphl";
import { useGraphQlQuery } from "../../utils/useGraphQlQuery";
import { NearContext } from "@/wallet/walletSelector";
import { useContext } from "react";
import { nftContrctAddress } from "../../utils/Constant";

export const useFeedDesc = () => {
  const { wallet, signedAccountId } = useContext(NearContext);

  const queryObj = {
    queryName: "q_FETCH_FEED_NEW",
    query: FETCH_FEED_NEW,
    variables: {
      contractAddress: nftContrctAddress,
      accountId: signedAccountId, // dynamically use activeAccountId
    },
    queryOpts: { staleTime: Infinity, enabled: !!signedAccountId },
  };

  const { data, isLoading } = useGraphQlQuery<InfiniteScrollHook>(queryObj);
console.log("Fetched data from usefeed:",data);

  return {
    data,
    isLoading,
  };
};
