import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import MainLayout from "../components/MainLayout";
import CustomText from "../components/CustomText";
import ListItem from "../components/ListItem";
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator, FlatList, Image, Linking, ScrollView, View } from "react-native";
import CustomButton from "../components/CustomButton";

const MealScreenContainer = styled.View`
  flex: 1;
  padding-bottom: 15px;
`;

const MealDetailContainer = styled.View`
  flex: 1;
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 220px;
  background-color: transparent;
  border-radius: 7px;
  overflow: hidden;
`;

const ItemContainer = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  padding: 10px 0;
  border-bottom-color: #d2dae2;
`;

const ItemTitle = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const MealDetailScreen = ({ route, navigation }) => {
  const [meal, setMeal] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [measure, setMeasure] = useState(null);

  useEffect(() => {
    const makeCall = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${route.params.mealId}`);
      const json = await response.json();
      setMeal(json["meals"][0]);

      let ingredientsArr = [];
      let measureArr = [];
      Object.keys(json["meals"][0]).forEach((key) => {
        if (key.includes("strIngredient")) {
          if (json["meals"][0][key] !== "" && json["meals"][0][key] !== null) {
            ingredientsArr.push(json["meals"][0][key]);
          }
        }
        if (key.includes("strMeasure")) {
          if (json["meals"][0][key] !== "" && json["meals"][0][key] !== null) {
            measureArr.push(json["meals"][0][key]);
          }
        }
      });
      setIngredients(ingredientsArr);
      setMeasure(measureArr);
    };
    makeCall();
  }, [route.params.mealId]);

  const goToYoutube = () => {
    Linking.openURL(`${meal.strYoutube}`);
  };

  return (
    <MainLayout>
      <MealScreenContainer>
        {meal !== null && (
          <MealDetailContainer>
            <ScrollView>
              <ImageContainer>
                <Image
                  source={{
                    uri: `${meal.strMealThumb}`,
                  }}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </ImageContainer>
              <ItemContainer>
                <ItemTitle>
                  <CustomText txt="Meal" fontWeight={500} fontSize={16} color="#3c40c6" transform="lowercase" />
                </ItemTitle>
                <CustomText txt={meal.strMeal} fontWeight={400} fontSize={18} color="#1e272e" transform="capitalize" />
              </ItemContainer>
              <ItemContainer>
                <ItemTitle>
                  <CustomText txt="Category" fontWeight={500} fontSize={16} color="#3c40c6" transform="lowercase" />
                </ItemTitle>
                <CustomText txt={meal.strCategory} fontWeight={400} fontSize={18} color="#1e272e" transform="capitalize" />
              </ItemContainer>
              <ItemContainer>
                <ItemTitle>
                  <CustomText txt="Area" fontWeight={500} fontSize={16} color="#3c40c6" transform="lowercase" />
                </ItemTitle>
                <CustomText txt={meal.strArea} fontWeight={400} fontSize={18} color="#1e272e" transform="capitalize" />
              </ItemContainer>
              <ItemContainer>
                <ItemTitle>
                  <CustomText txt="Instructions" fontWeight={500} fontSize={16} color="#3c40c6" transform="lowercase" />
                </ItemTitle>
                <CustomText txt={meal.strInstructions} fontWeight={400} fontSize={15} color="#1e272e" transform="capitalize" />
              </ItemContainer>
              <ItemContainer>
                <ItemTitle>
                  <CustomText txt="ingredients" fontWeight={500} fontSize={16} color="#3c40c6" transform="lowercase" />
                </ItemTitle>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <View>
                    {ingredients?.map((item, key) => (
                      <CustomText key={key} txt={item} fontWeight={500} fontSize={16} color="#1e272e" transform="lowercase" />
                    ))}
                  </View>
                  <View>
                    {measure?.map((item, key) => (
                      <CustomText key={key} txt={item} fontWeight={500} fontSize={16} color="#1e272e" transform="lowercase" />
                    ))}
                  </View>
                </View>
              </ItemContainer>
              <ItemContainer>
                <CustomButton title="" bgColor="#ff3f34" iconName="youtube-play" iconSize={35} func={goToYoutube} />
              </ItemContainer>
            </ScrollView>
          </MealDetailContainer>
        )}
      </MealScreenContainer>
    </MainLayout>
  );
};

export default MealDetailScreen;
