import React from "react";
import styled from "styled-components/native";
import CustomText from "./CustomText";

const Container = styled.View`
  width: 100%;
  height: auto;
  margin-top: 15px;
`;

const CardHeader = styled.View`
  width: 100%;
  height: auto;
  flex-direction: row;
`;

const Image = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 100px;
`;

const HeaderInfo = styled.View`
  flex: 1;
  padding-left: 10px;
  flex-direction: column;
  align-items: flex-end;
`;

const MealCard = () => {
  return (
    <Container>
      <CardHeader>
        <Image
          source={{
            uri: "https://www.themealdb.com/images/media/meals/md8w601593348504.jpg/preview",
          }}
        />
        <HeaderInfo>
          <CustomText txt="Meal Title" fontWeight={500} fontSize={18} color="#1e272e" transform="capitalize" />
          <CustomText txt="Category" fontWeight={400} fontSize={16} color="#1e272e" transform="capitalize" />
          <CustomText txt="Area" fontWeight={400} fontSize={16} color="#1e272e" transform="capitalize" />
        </HeaderInfo>
      </CardHeader>
    </Container>
  );
};

export default MealCard;
