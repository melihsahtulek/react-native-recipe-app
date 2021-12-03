import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import ListItem from "./ListItem";
import { open, close } from "../redux/search/searchSlice";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  width: ${Dimensions.get("window").width}px;
  height: ${Dimensions.get("window").height}px;
  margin-bottom: 20px;
  flex-direction: row;
  background-color: #ffffff;
  z-index: 1;
  padding: 10px;
  flex-direction: column;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid transparent;
  border-radius: 5px;
  color: #1e272e;
  font-size: 17px;
  border-color: ${(props) => (props.focus ? "#3c40c6" : "#ddd")};
  background-color: #fafafa;
`;

const FilterResultContainer = styled.View`
  flex: 1;
  padding-top: 15px;
`;

const Search = () => {
  const [searchTxt, setSearchTxt] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [filterResult, setFilterResult] = useState(null);
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.open_search.isOpened);
  const navigation = useNavigation();

  useEffect(() => {
    const filterReq = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTxt}`);
      const data = await response.json();
      setFilterResult(data["meals"]);
    };
    filterReq();
  }, [isFocused]);

  const goToDetail = (id) => {
    dispatch(close());
    navigation.navigate("MealDetailScreen", {
      mealId: id,
    });
  };

  return (
    <Container style={[isOpened ? { display: "flex", position: "absolute" } : { display: "none", position: "static" }]}>
      <Input
        style={{ paddingLeft: 10 }}
        placeholder="search eg:egg"
        placeholderTextColor="#ababab"
        onChangeText={setSearchTxt}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        focus={isFocused}
      />
      <FilterResultContainer>
        {filterResult !== null && (
          <FlatList data={filterResult} renderItem={({ item }) => <ListItem item={item} func={goToDetail} />} keyExtractor={(item) => item.idMeal} />
        )}
      </FilterResultContainer>
    </Container>
  );
};

export default Search;
