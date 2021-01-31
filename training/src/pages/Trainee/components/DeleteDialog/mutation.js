import { gql } from 'apollo-boost';

const DELETE_USER = gql`
mutation deleteTrainee($id: ID!){
    deleteTrainee(id: $id){
        name
    }
}
`;

export {
  DELETE_USER,
};
