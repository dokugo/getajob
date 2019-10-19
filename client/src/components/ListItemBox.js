import React from 'react';
import ListItem from './ListItem';

import styled, { keyframes } from 'styled-components';

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
  animation-duration: 1s;
  animation-name: ${props => (props.isAnimated ? fadeIn : '')};
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
