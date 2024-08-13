import { InfiniteScrollHook } from "@/types/types";
import { proxyContractAddress } from "../../utils/Constant";
import { FETCH_FEED_NEW } from "../../utils/graphl";
import { useGraphQlQuery } from "../../utils/useGraphQlQuery";

export const useFeedDesc = () => {


    const queryObj = {
        queryName: "q_FETCH_FEED_NEW",
        query: FETCH_FEED_NEW,
        variables: {
          accountIds: [
            "sharmila_blessy.testnet"
            
          ],
          contractAddress: proxyContractAddress
        },
        queryOpts: { staleTime: Infinity },
      };
    
      const { data, isLoading } =
        useGraphQlQuery<InfiniteScrollHook>(queryObj);

    return {
        data,
        isLoading
    }
}