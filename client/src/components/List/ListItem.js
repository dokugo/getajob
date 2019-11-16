import React from 'react';
import styled from 'styled-components/macro';

const ListItem = ({ item, index }) => {
  return (
    <Link href={item.link} target="_blank" rel="noopener noreferrer">
      <Box>
        <Row>
          <Title>{item.title}</Title>
          <DateEl>{item.date}</DateEl>
        </Row>
        <Row>
          <Employer>{item.employer}</Employer>
        </Row>
        <Row>
          <Salary
            hasData={item.salary === 'Зарплата не указана' ? false : true}
          >
            {item.salary}
          </Salary>
          <NumberEl>{`№${index + 1}`}</NumberEl>
        </Row>
      </Box>
    </Link>
  );
};

export default ListItem;

const Box = styled.div`
  width: inherit;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Title = styled.h6`
  color: ${({ theme }) => theme.card.title};
  font-size: 22px;
  font-weight: 500;
  margin: 0 0 15px 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  max-width: 500px;
  flex-grow: 1;
  @media (max-width: 670px) {
    font-size: 18px;
  }
`;

const Link = styled.a`
  display: flex;
  padding: 12px 18px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.card.background};
  text-decoration: none;
  width: 640px;
  box-sizing: border-box;
  &:focus {
    box-shadow: ${({ theme }) => `0 0 0 3px ${theme.card.focus}`};
    outline: 0 none;
  }
  &:hover ${Title} {
    text-decoration: underline;
    color: ${({ theme }) => theme.card.hover};
  }
  @media (max-width: 670px) {
    width: 100%;
  }
`;

const DateEl = styled.span`
  color: ${({ theme }) => theme.card.date};
  font-size: 14px;
  margin-left: 10px;
`;

const Employer = styled.span`
  color: ${({ theme }) => theme.card.employer};
`;

const Salary = styled.span`
  font-weight: ${({ hasData }) => (hasData ? 500 : 400)};
  color: ${({ hasData, theme }) =>
    hasData ? theme.card.salary : theme.card.noSalary};
`;

const NumberEl = styled.span`
  color: ${({ theme }) => theme.card.number};
  font-size: 14px;
  margin-bottom: 2.5px;
`;
