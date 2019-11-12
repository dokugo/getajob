import React from 'react';
import ListItem from './ListItem';

import styled, { keyframes, css } from 'styled-components/macro';
import { AnimationContext } from '../../contexts/animationContext';
import { useContextSelector } from 'use-context-selector';

const fadeIn = keyframes`
  0% {
    transform: translateY(33%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ItemBox = styled.article`
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
/*   &:last-of-type {
    margin-bottom: unset;
  } */;
  ${({ isAnimated }) =>
    isAnimated &&
    css`
      animation: ${fadeIn} 1s;
    `};
  /* animation: ${({ isAnimated }) => (isAnimated ? fadeIn : 'unset')} 1s; */
`;

const NoData = styled.span`
  display: block;
  font-size: 36px;
  line-height: 1;
  text-align: center;
  margin: 20px 0 20px;
  /* transition: opacity 0.5s ease; */
  /* opacity: ${({ isOpaque }) => (isOpaque ? 1 : 0)}; */
`;

const ListItemBox = ({ dataCache }) => {
  // const { listAnimation } = useContext(AnimationContext);
  const listAnimation = useContextSelector(
    AnimationContext,
    state => state.listAnimation
  );

  return (
    <React.Fragment>
      {dataCache.items.length ? (
        dataCache.items.map((item, index) => (
          <ItemBox isAnimated={listAnimation} key={item.id}>
            <ListItem item={item} index={index} />
          </ItemBox>
        ))
      ) : (
        <ItemBox isAnimated={listAnimation}>
          <NoData>Found nothing</NoData>
        </ItemBox>
      )}
    </React.Fragment>
  );
};

export default ListItemBox;
