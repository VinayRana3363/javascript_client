import { gql } from 'apollo-boost';

const STORED_USERS = gql`
  query getAllTrainees($skip: String, $limit: String, $sort: String)
  {
    getAllTrainees(payload: {skip:$skip, limit: $limit, sort: $sort}){
      TraineeCount
      data {
        name
        email
        createdAt
        originalId
        _id
      }
    }
  }
`;

export {
  STORED_USERS,
};
