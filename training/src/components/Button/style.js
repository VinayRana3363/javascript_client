import styled, { css } from 'styled-components';

const ButtonField = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #0f1315;
  border-radius: 3px;
  background-color: grey;
  display: flex;
  position: absolute;
  right: 0px;
  color: black;
  ${(props) => props.submit && css`
      background-color: green;
      right: 120px;
  `}
  ${(props) => props.disabled && css`
      background-color: transparent;
      right: 120px;
  `}
`;

export { ButtonField };
