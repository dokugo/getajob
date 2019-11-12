import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { Transition } from 'react-transition-group';

const fadeOut = keyframes`
  0% {
    transform: translateY(0%);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
    display: none;
  }

`;

const StartContainer = styled.section`
  /* animation-name: ${({ isOpaque }) =>
    isOpaque === true ? fadeOut : 'none'}; */
  /* opacity: ${({ isOpaque }) => (isOpaque === true ? 0 : 1)}; */
  /* animation-duration: 1s; */
  /* transition: all 0.75s ease-in-out; */
  /* display: ${({ isOpaque }) => (isOpaque === true ? 'none' : 'flex')}; */
  transition: 1.5s;
  /* opacity: ${({ state }) => (state === 'exited' ? 1 : 0)}; */
  /* display: ${({ state }) => (state === 'exited' ? 'block' : 'none')}; */

/*   transform: ${({ state }) =>
  state === 'entered' ? 'none' : 'translateY(-100%)'}; */
  left: ${({ state }) => (state === 'entered' ? 0 : '120px')};
  top: 0;
  /* opacity: ${({ state }) => (state === 'entered' ? 1 : 0)}; */
  position: ${({ state }) => (state === 'entered' ? 'relative' : 'absolute')};
  
  width: 640px;
  /* height: 320px; */
  background-color: #e5f0e5;
  margin: 0 auto;
  box-sizing: border-box;
  border-radius: 8px;
  color: #464646;
  font-size: 24px;
  padding: 20px;
  /* margin-top: -20px; */
  /* margin-top: 20px; */
  margin-bottom: 20px;
`;

const Start = ({ isOpaque }) => {
  console.log(isOpaque);
  return (
    <Transition in={!isOpaque} timeout={1500}>
      {state => (
        <StartContainer state={state}>
          {/* Hi! This is the xtractor app.  */}Try to search keywords such as
          'js', 'react', 'node'.
        </StartContainer>
      )}
    </Transition>
  );
};

export default Start;
