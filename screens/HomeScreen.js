import { View, Text } from "react-native";

import React, { useEffect, useState } from "react";
import { getImages } from "../api/pexels";
import ImageList from "../components/ImageList";
import { Input, Button } from "react-native-elements";
const HomeScreen = ({ openSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [photos, setPhotos] = useState([]);
  const loadImages = async (searchTerm) => {
    const response = await getImages(searchTerm);
    setPhotos(response.data.photos);
    return response;
  };
  useEffect(() => {
    loadImages();
  }, []);
  const HandleSearch = async (input) => {
    await loadImages(input);
  };
  return (
    <>
      {openSearch && (
        <View className="bg-[#171717] w-full pl-[10px] flex-[1/5] flex-row pr-[80px] items-center ">
          <Input
            leftIcon={{ type: "font-awesome", name: "search", color: "white" }}
            leftIconContainerStyle={{
              marginRight: 7,
              paddingStart: 10,
            }}
            placeholder="Search a Term"
            className="bg-[#2c292c] text-white "
            inputContainerStyle={{
              borderBottomWidth: 0,
              paddingHorizontal: 5,
              backgroundColor: "#2c292c",
            }}
            onChangeText={(event) => {
              setSearchTerm(event);
            }}
          />
          <Button
            onPress={() => HandleSearch(searchTerm)}
            title="Search"
            buttonStyle={{ backgroundColor: "#229783", marginBottom: 27 }}
          />
        </View>
      )}
      <View className="flex-1 bg-[#171717] items-center justify-center">
        <Text className="text-white w-full text-right mt-5">
          1000 Resultados
        </Text>
        <ImageList photos={photos} />
      </View>
    </>
  );
};

export default HomeScreen;
