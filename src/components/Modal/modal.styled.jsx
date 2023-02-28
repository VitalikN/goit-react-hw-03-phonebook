import styled from '@emotion/styled';

export const Box = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;
export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 300px;
  max-width: 600px;
  width: 100%;
  padding: 15px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: -15px -15px 2px -5px rgb(123 51 90 / 50%),
    -15px 15px 2px -5px rgb(60 74 123 / 50%),
    15px -15px 2px -5px rgb(255 0 0 / 50%),
    15px 15px 2px -5px rgb(60 123 68 / 50%);
`;
