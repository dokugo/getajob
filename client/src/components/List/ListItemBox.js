import React from 'react';
import ListItem from './ListItem';

import styled, { keyframes } from 'styled-components/macro';

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
  animation: ${({ isAnimated }) => (isAnimated ? fadeIn : 'unset')} 1s;
`;

const ListItemBox = ({ dataStorage, isAnimated }) => {
  return (
    <React.Fragment>
      {dataStorage.items.map((item, index) => (
        <ItemBox isAnimated={isAnimated} key={item.id}>
          <ListItem item={item} index={index} />
        </ItemBox>
      ))}
    </React.Fragment>
  );
};

export default ListItemBox;
