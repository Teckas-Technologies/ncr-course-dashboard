import { gql } from 'graphql-request';

export const FETCH_FEED_NEW = gql`
  query minsta_fetch_feed_minted_tokens(
    $contractAddress: String!
    $tokenId: String!
  ) {
    mb_views_nft_tokens(
      where: {
        nft_contract_id: { _eq: $contractAddress }
        token_id: { _eq: $tokenId }
        burned_timestamp: { _is_null: true }
        metadata_content_flag: { _is_null: true }
        nft_contract_content_flag: { _is_null: true }
      }
    ) {
      media
      reference
      token_id
    }
  }
`;
