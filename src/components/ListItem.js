import React from "react";
import styled from "styled-components/native";
import CustomText from "../components/CustomText";

const Item = styled.Pressable`
  flex-direction: row;
  border-width: 1px;
  border-radius: 7px;
  padding: 5px;
  border-color: #d2dae2;
  margin-bottom: 5px;
`;

const ItemLeft = styled.View`
  width: 75px;
  height: 75px;
  border-radius: 37px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const ItemRight = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 10px;
`;

const ListItem = ({ item, func }) => {
  return (
    <Item
      onPress={() => {
        func(item.idMeal || item.strCategory);
      }}
    >
      <ItemLeft>
        <Image
          source={{
            uri: `${item.strCategoryThumb || item.strMealThumb}`,
          }}
          resizeMode="contain"
        />
      </ItemLeft>
      <ItemRight>
        <CustomText txt={item.strMeal || item.strCategory} fontWeight={500} fontSize={17} color="#3d3d3d" transform="capitalize" />
      </ItemRight>
    </Item>
  );
};

export default ListItem;
