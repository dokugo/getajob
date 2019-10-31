import React from 'react';
import ListItem from './ListItem';

import styled, { keyframes, css } from 'styled-components/macro';
import { AnimationContext } from '../../contexts/animationContext';
import { useContextSelector } from 'use-context-selector';

const fadeIn = keyframes`
  0% {
    /* transform: translateY(100%); */
    opacity: 0;
  }
  100% {
    /* transform: translateY(0); */
    opacity: 1;
  }
`;

const ItemBox = styled.article`
  display: flex;
  justify-content: center;
  ${({ isAnimated }) =>
    isAnimated &&
    css`
      animation: ${fadeIn} 1s;
    `};
  /* animation: ${({ isAnimated }) => (isAnimated ? fadeIn : 'unset')} 1s; */
`;

const ListItemBox = ({ dataCache }) => {
  // const { listAnimation } = useContext(AnimationContext);
  const listAnimation = useContextSelector(
    AnimationContext,
    state => state.listAnimation
  );

  return (
    <React.Fragment>
      {dataCache.items.map((item, index) => (
        <ItemBox isAnimated={listAnimation} key={item.id}>
          <ListItem item={item} index={index} />
        </ItemBox>
      ))}
    </React.Fragment>
  );
};

export default ListItemBox;
