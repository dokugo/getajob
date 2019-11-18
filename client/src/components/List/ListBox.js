import React from 'react';
import ListItem from './ListItem';
import styled from 'styled-components/macro';

const ListBox = ({ dataCache }) => {
  return (
    <React.Fragment>
      {dataCache.items.map((item, index) => (
        <ItemBox key={item.id}>
          <ListItem item={item} index={index} />
        </ItemBox>
      ))}
    </React.Fragment>
  );
};

export default ListBox;

const ItemBox = styled.article`
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
`;
