import React from "react";
import styled from "styled-components/native";
import { useFonts, Montserrat_300Light, Montserrat_400Regular, Montserrat_500Medium } from "@expo-google-fonts/montserrat";

const CustomText = styled.Text`
  color: ${(props) => (props.color ? props.color : "#fff")};
  font-size: ${(props) => props.fontSize}px;
  text-transform: ${(props) => (props.transform ? props.transform : "lowercase")};
`;

const Text = ({ txt, fontWeight, fontSize, color, transform }) => {
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
  });

  if (fontsLoaded) {
    return (
      <CustomText
        style={[
          fontWeight === 300
            ? { fontFamily: "Montserrat_300Light" }
            : fontWeight === 500
            ? { fontFamily: "Montserrat_500Medium" }
            : { fontFamily: "Montserrat_400Regular" },
        ]}
        fontSize={fontSize}
        color={color}
        transform={transform}
      >
        {txt}
      </CustomText>
    );
  } else {
    return null;
  }
};

export default Text;
