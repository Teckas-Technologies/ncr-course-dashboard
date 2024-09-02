import { gql } from "graphql-request";

export const FETCH_FEED_NEW = gql`
  query _fetch_feed_minted_tokens(
    $contractAddress: String!
    $accountId: String!
    
  ) {
    mb_views_nft_tokens(
      where: {
        nft_contract_id: { _eq: $contractAddress }
        owner: { _eq: $accountId }
        
        burned_timestamp: { _is_null: true }
        metadata_content_flag: { _is_null: true }
        nft_contract_content_flag: { _is_null: true }
      }
    ) {
      media
      reference
     
    }
  }
`;
