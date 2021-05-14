import styled, { css } from 'styled-components';

const invertedButtonStyles = css`
    background-color: white;
    color: black;
    border: 1px solid black;

    &:hover {
      background-color: black;
      color: white;
      border: none;
    }
`;

const googleSignInStyles = css`
    background-color: #4285f4;
    color: white;

    &:hover {
        background-color: #357ae8;
    }
`;

export const CustomButtonContainer = styled.button`
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    cursor: pointer;
    display: flex;
    justify-content: center;
    background-color: black;
    color: white;
    border: 1px solid transparent;
    transition: all 0.2s linear;

    &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
    }

    ${({ inverted }) => inverted ? invertedButtonStyles : ''}

    ${({ isGoogleSignIn }) => isGoogleSignIn ? googleSignInStyles : ''}
`;