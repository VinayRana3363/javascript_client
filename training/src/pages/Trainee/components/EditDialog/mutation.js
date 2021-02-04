import { gql } from 'apollo-boost';

const UPDATED_USER = gql`
 
mutation updateTrainee($name: String, $email: String, $originalId: ID!){
 
    updateTrainee(user: {originalId:$originalId , dataToUpdate: {name:$name, email:$email}}){
      _id
      name
    }
}`;

export {

  UPDATED_USER,

};
