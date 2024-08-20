import { InfiniteScrollHook } from "@/types/types";
import { proxyContractAddress } from "../../utils/Constant";
import { FETCH_FEED_NEW } from "../../utils/graphl";
import { useGraphQlQuery } from "../../utils/useGraphQlQuery";
import { useMbWallet } from "@mintbase-js/react";
import AccountId from "../../model/AccountId";
export const useFeedDesc = () => {
  console.log("useFeedDesc hook is called");
  const { isConnected, activeAccountId } = useMbWallet();
  const queryObj = {
    queryName: "q_FETCH_FEED_NEW",
    query: FETCH_FEED_NEW,
    variables: {
      contractAddress: proxyContractAddress,
      accountId: activeAccountId,
    },
    queryOpts: { staleTime: Infinity },
  };

  console.log("Query Object:", queryObj);
  const { data, isLoading } = useGraphQlQuery<InfiniteScrollHook>(queryObj);
  console.log("Fetched data:", data);

  return {
    data,
    isLoading,
  };
};
