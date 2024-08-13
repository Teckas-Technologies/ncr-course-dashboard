import { proxyContractAddress } from "./Constant";
import { FETCH_FEED_NEW } from "./graphl";
import { graphqlQLServiceNew } from "./graphqlService";
import { InfiniteScrollHook,InfiniteScrollHookResult } from "@/types/types";
const variables = {
  contractAddress: proxyContractAddress,
  tokenId: "0",
};

async function fetchData() {
  const result = (await graphqlQLServiceNew<InfiniteScrollHook>({
    query: FETCH_FEED_NEW,
    variables: {
      contractAddress: variables.contractAddress,
      tokenId: variables.tokenId,
    },
  })) as InfiniteScrollHookResult;

  return result;
}
