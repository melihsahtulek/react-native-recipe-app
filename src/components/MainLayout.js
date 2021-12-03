import React from "react";
import styled from "styled-components/native";
import Search from "../components/Search";

const Main = styled.View`
  flex-basis: 100%;
  padding: 15px;
`;

const MainLayout = ({ children }) => {
  return (
    <Main>
      <Search />
      {children}
    </Main>
  );
};

export default MainLayout;
