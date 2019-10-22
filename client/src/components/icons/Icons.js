import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

const loadingAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const Icon = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.25s ease-in-out;
  opacity: ${props => (props.show ? 1 : 0)};
  animation: ${props => (props.animated ? loadingAnimation : 'none')} 1s linear
    infinite;
`;

const IconWarning = ({ type, show }) => {
  if (type === 'filled') {
    return (
      <Icon
        show={show}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="#faad14"
          d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
        />
      </Icon>
    );
  }
  if (type === 'two-tone') {
    return (
      <Icon
        show={show}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="#000"
          d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zm-783.5-27.9L512 239.9l339.8 588.2H172.2z"
        />
        <path
          fill="#faad14"
          d="M172.2 828.1h679.6L512 239.9 172.2 828.1zM560 720a48.01 48.01 0 01-96 0 48.01 48.01 0 0196 0zm-16-304v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8z"
        />
        <path
          fill="#000"
          d="M464 720a48 48 0 1096 0 48 48 0 10-96 0zm16-304v184c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V416c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8z"
        />
      </Icon>
    );
  }
};

const IconError = ({ type, show }) => {
  if (type === 'filled') {
    return (
      <Icon
        show={show}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="#dc3545"
          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
        />
      </Icon>
    );
  }
  if (type === 'two-tone') {
    return (
      <Icon
        show={show}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="#dc3545"
          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
        />
        <path
          fill="#fff3ed"
          d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm-32 156c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"
        />
        <path
          fill="#dc3545"
          d="M488 576h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8zm-24 112a48 48 0 1 0 96 0 48 48 0 1 0-96 0z"
        />
      </Icon>
    );
  }
};

const IconLoading = ({ show }) => {
  return (
    <Icon
      show={show}
      animated
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
    >
      <path
        fill="#2e8b57"
        d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
      />
    </Icon>
  );
};

export { IconWarning, IconError, IconLoading };
