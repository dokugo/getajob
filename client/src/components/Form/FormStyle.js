import styled from 'styled-components/macro';

export const FormItem = styled.form`
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 640px;
  @media (max-width: 670px) {
    width: 100%;
  }
`;

export const InputBox = styled.div`
  position: relative;

  width: 100%;
`;

export const InputItem = styled.div`
  position: relative;
`;

export const Input = styled.input`
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 18px;
  font-weight: 600;
  /* width: 300px; */
  width: 100%;
  height: 40px;
  padding: 0px 12px;
  box-sizing: border-box;
  background-color: #f5fcf5;
  border-radius: 3px;
  color: #464646;
  padding-right: 36px;
  padding-bottom: 2px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ inputState }) => {
    if (inputState === 'warning') {
      return '#faad14';
    } else if (inputState === 'error') {
      return '#dc3545';
    } else return '#28a745';
  }};
  &:focus {
    outline: 0 none;
    border-color: ${({ inputState }) => {
      if (inputState === 'warning') {
        return 'rgba(250, 166, 26, 0.749)';
      } else if (inputState === 'error') {
        return '#dc3545';
      } else return '#28a745';
    }};
    box-shadow: ${({ inputState }) => {
      if (inputState === 'warning') {
        return '0 0 0 0.2rem rgba(250, 166, 26, 0.3)';
      } else if (inputState === 'error') {
        return '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
      } else return '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
    }};
  }
`;

export const IconContainer = styled.span`
  position: absolute;
  right: 8px;
  top: 50%;
  margin-top: -12.5px;
  width: 25px;
  height: 25px;
`;

export const Tooltip = styled.span`
  position: absolute;
  font-size: 14px;
  padding: 5px 5px;
  color: ${({ inputState }) =>
    inputState === 'warning'
      ? '#b37700'
      : inputState === 'error'
      ? '#dc3545'
      : null};
`;

export const ButtonBox = styled.div`
  margin-left: 10px;
`;

export const Button = styled.button`
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 18px;
  border: 1px solid #28a745;
  background-color: #f5fcf5;
  color: #28a745;
  height: 40px;
  border-radius: 3px;
  transition: all 0.2s ease;
  font-weight: 600;
  text-align: center;
  box-sizing: border-box;
  /* width: 300px; */
  cursor: pointer;
  &:focus {
    border-color: #28a745;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
    outline: 0 none;
  }
  &:hover {
    background-color: #28a745;
    color: #f5fcf5;
  }

  padding: 0 25px 2px;
`;
