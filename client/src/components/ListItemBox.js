import React from 'react';
import ListItem from './ListItem';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`{
  0% {
    /* transform: translateY(100%); */
    opacity: 0;
  }
  100% {
    /* transform: translateY(0); */
    opacity: 1;
  }
}`;

const Box = styled.a`
  display: flex;
  margin-bottom: 10px;
  padding: 12px 18px;
  border-radius: 5px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  background-color: #dff1e6;
  text-decoration: none;
  color: #000;
  width: 640px;
  box-sizing: border-box;
  animation-duration: 1s;
  animation-name: ${props => (props.isAnimated ? fadeIn : '')};

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
    outline: 0 none;
  }
`;

const ListItemBox = ({ dataStorage, isAnimated }) => {
  return (
    <React.Fragment>
      {dataStorage.items.map((item, index) => (
        <Box
          isAnimated={isAnimated}
          href={item.link}
          key={item.id}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItem item={item} index={index} />
        </Box>
      ))}
    </React.Fragment>
  );
};

export default ListItemBox;
