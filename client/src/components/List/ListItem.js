import React from 'react';
import styled from 'styled-components/macro';

const Box = styled.div`
  width: inherit;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Title = styled.span`
  color: #464646;
  font-size: 21px;
  font-weight: 500;
  margin-bottom: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  /* width: 500px; */
  width: 100%;
  max-width: 500px;
  flex-grow: 1;
`;

const Link = styled.a`
  display: flex;
  padding: 12px 18px;
  border-radius: 8px;
  /* background-color: #dff1e6; */

  background-color: #e5f0e5;

  /* background-color: #e5efe0; */

  /* background-color: #e5efe5; */
  /* background-color: #e3f1e3; */
  text-decoration: none;
  color: #000;
  width: 640px;
  box-sizing: border-box;
  &:focus {
    /* box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.25); */
    box-shadow: 0 0 0 3px rgba(78, 169, 49, 0.35);
    outline: 0 none;
  }
  &:hover ${Title} {
    text-decoration: underline;
    /* color: seagreen; */
    /* color: rgba(40, 167, 69, 1); */
    color: rgba(78, 169, 49, 1);
  }
  @media (max-width: 670px) {
    width: 100%;
  }
`;

const DateEl = styled.span`
  color: grey;
  font-size: 14px;
  margin-left: 10px;
`;

const Compensation = styled.span`
  font-weight: ${({ hasData }) => (hasData ? 500 : 400)};
  color: ${({ hasData }) => (hasData ? '#6aac00' : 'grey')};
`;

const NumberEl = styled.span`
  color: #8fbc8f;
  /* color: darkseagreen; */
  font-size: 14px;

  margin-bottom: 2.5px;
`;

const ListItem = ({ item, index }) => {
  return (
    <Link href={item.link} target="_blank" rel="noopener noreferrer">
      <Box>
        <Row>
          <Title>{item.title}</Title>
          <DateEl>{item.date}</DateEl>
        </Row>
        <Row>
          <div>{item.employer}</div>
        </Row>
        <Row>
          <Compensation
            hasData={item.compensation === 'Зарплата не указана' ? false : true}
          >
            {item.compensation}
          </Compensation>
          <NumberEl>{`№${index + 1}`}</NumberEl>
        </Row>
      </Box>
    </Link>
  );
};

export default ListItem;
