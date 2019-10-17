import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  width: inherit;
`;

const ListItem = ({ item, index }) => {
  return (
    <Box>
      <div className="link-item__row">
        <div className="link-item__data link-item__data-title">
          {item.title}
        </div>
        <div className="link-item__data link-item__data-date">{item.date}</div>
      </div>
      <div className="link-item__data link-item__data-employer">
        {item.employer}
      </div>
      <div className="link-item__row">
        <div
          className={
            'link-item__data link-item__data-compensation' +
            (item.compensation === 'Зарплата не указана' ? ' no-data' : '')
          }
        >
          {item.compensation}
        </div>
        <div className="link-item__data link-item__data-number">
          {`№${index + 1}`}
        </div>
      </div>
    </Box>
  );
};

export default ListItem;
