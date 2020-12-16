import styled, { css } from 'styled-components';

const Border = styled.div`
border: 1px solid black;
padding: 2px;
margin: 5%;
`;
// console.log('inside style', this);
const Input = styled.input`
width: 99%;
height: 32px;
${(props) => props.valid && css`
  border: 1px solid brown;
  `}
${(props) => props.errors && css`
  border: 1px solid red;
`}
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
