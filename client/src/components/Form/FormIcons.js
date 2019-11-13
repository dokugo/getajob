import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

const IconLoading = () => {
  return (
    <SvgAnimated xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
      <Path
        type="loading"
        d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
      />
    </SvgAnimated>
  );
};

const IconWarning = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
      <Path
        type="warning"
        d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
      />
    </Svg>
  );
};

const IconError = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
      <Path
        type="error"
        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
      />
    </Svg>
  );
};

const IconSearch = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
      <Path
        type="search"
        d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
      />
    </Svg>
  );
};

export { IconLoading, IconWarning, IconError, IconSearch };

const loadingAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const Svg = styled.svg`
  height: 35px;
  width: 35px;
  position: absolute;
`;

const Path = styled.path`
  fill: ${({ type, theme }) =>
    type === 'loading'
      ? theme.icon.loading
      : type === 'warning'
      ? theme.icon.warning
      : type === 'error'
      ? theme.icon.error
      : type === 'search'
      ? theme.icon.search
      : null};
`;

const SvgAnimated = styled(Svg)`
  animation: ${loadingAnimation} 1s linear infinite;
`;
