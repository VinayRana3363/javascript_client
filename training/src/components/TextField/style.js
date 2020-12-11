import styled from 'styled-components';

const Border = styled.div`
border: 1px solid black;
padding: 2px;
margin: 5%;
`;

const Input = styled.input`
width: 99%;
height: 32px;
`;

const InputBrown = styled.input`
width: 99%;
height: 32px;
border: 1px solid brown;
`;

const InputRed = styled.input`
width: 99%;
height: 32px;
border: 1px solid red;
`;

const Error = styled.p`
color: red;
margin-bottom: 20px;
`;

export {
  Border, Input, InputBrown, InputRed, Error,
};
