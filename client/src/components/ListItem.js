import React from 'react';
import styled from 'styled-components';

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
  font-weight: 700;
  margin-bottom: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 500px;
`;

const Link = styled.a`
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
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
    outline: 0 none;
  }
  &:hover ${Title} {
    text-decoration: underline;
    color: seagreen;
  }
`;

const Date = styled.span`
  color: grey;
  font-size: 14px;
`;

const Compensation = styled.span`
  font-weight: ${props => (props.hasData ? 500 : 400)};
  color: #6aac00;
`;

const Number = styled.span`
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
          <Date>{item.date}</Date>
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
          <Number>{`№${index + 1}`}</Number>
        </Row>
      </Box>
    </Link>
  );
};

export default ListItem;
