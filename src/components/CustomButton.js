import React, { useState } from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import CustomText from "./CustomText";
import { Text } from "react-native";

const Button = styled.Pressable`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgColor};
  border-radius: 5px;
`;

const CustomButton = ({ title, bgColor, iconName, iconSize, func }) => {
  const [buttonIsPressed, setButtonIsPressed] = useState(false);

  return (
    <Button
      bgColor={bgColor !== "" ? (!buttonIsPressed ? bgColor : "#2f3542") : "transparent"}
      onPressIn={() => setButtonIsPressed(true)}
      onPress={() => func()}
      onPressOut={() => setButtonIsPressed(false)}
    >
      {title !== "" && <CustomText txt={title} fontSize="17" />}
      <Text>
        <FontAwesome name={iconName} size={iconSize || 22} color="#fff" />
      </Text>
    </Button>
  );
};

export default CustomButton;
