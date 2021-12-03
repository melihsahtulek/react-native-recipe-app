import React, { useState } from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import CustomText from "./CustomText";
import { Text } from "react-native";
import { open, close } from "../redux/search/searchSlice";
import { useDispatch, useSelector } from "react-redux";

const Button = styled.Pressable`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgColor};
  border-radius: 5px;
`;

const HeaderButton = ({ title, bgColor, iconName, iconSize }) => {
  const [buttonIsPressed, setButtonIsPressed] = useState(false);
  const isOpened = useSelector((state) => state.open_search.isOpened);
  const dispatch = useDispatch();

  return (
    <Button
      bgColor={bgColor !== "" ? (!buttonIsPressed ? bgColor : "#2f3542") : "transparent"}
      onPressIn={() => setButtonIsPressed(true)}
      onPress={() => (isOpened ? dispatch(close()) : dispatch(open()))}
      onPressOut={() => setButtonIsPressed(false)}
    >
      {title !== "" && <CustomText txt={title} fontSize="17" />}
      <Text>
        <FontAwesome name={iconName} size={iconSize || 22} color="#fff" />
      </Text>
    </Button>
  );
};

export default HeaderButton;
