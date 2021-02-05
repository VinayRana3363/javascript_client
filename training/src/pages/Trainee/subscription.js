import { gql } from 'apollo-boost';

const UPDATED_TRAINEE_SUB = gql`
    subscription{
        traineeUpdated{
        name
        email
        originalId
        _id
        password
        }
    }
`;

const DELETED_TRAINEE_SUB = gql`
    subscription{
        traineeDeleted{
            name
            email
            originalId
            _id
            password
            }
    } 
`;

const ADDED_TRAINEE_SUB = gql`
subscription{
    traineeAdded{
        name
        email
        originalId
        _id
        password
    }
  }
`;

export {
  UPDATED_TRAINEE_SUB,
  DELETED_TRAINEE_SUB,
  ADDED_TRAINEE_SUB,
};
