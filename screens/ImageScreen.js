import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import ImageList from "../components/ImageList";
import { getImages } from "../api/pexels";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
const ImageScreen = ({ route }) => {
  const [photos, setPhotos] = useState([]);
  const { image } = route.params;
  const handlePress = async () => {
    let result = await WebBrowser.openBrowserAsync(image.photographer_url);

    console.log(result);
  };
  const loadImages = async () => {
    const response = await getImages();
    setPhotos(response.data.photos);
    return response;
  };

  useEffect(() => {
    loadImages();
  }, []);
  const downloadFile = async () => {
    try {
      let fileUri = FileSystem.documentDirectory + image.id + ".jpg";
      const { uri } = await FileSystem.downloadAsync(
        image.src.large2x,
        fileUri
      );
      saveFile(uri);
    } catch (error) {
      console.log(error);
    }
  };
  const saveFile = async (fileUri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
      alert("File saved");
    }
  };
  const handleDownload = async () => {
    await downloadFile();
  };

  return (
    <View className="bg-[#171717]  flex-1 flex-col p-[10px]">
      <Image
        className="h-[350px] w-[90%] mx-auto my-2"
        source={{
          uri: image.src.large2x
            ? image.src.large2x
            : "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png",
        }}
      />
      <View className="flex py-[16px] justify-between flex-row items-center w-full">
        <View className="flex-row items-center ">
          <Avatar
            title={image.photographer
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
            className="w-[50px] h-[50px] bg-blue-600 rounded-full "
          />
          <TouchableOpacity onPress={handlePress}>
            <Text className="text-white text-lg ml-2 font-bold  ">
              {" "}
              {image.photographer}
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          onPress={handleDownload}
          title="Download"
          buttonStyle={{ backgroundColor: "#229783", marginBottom: 27 }}
        />
      </View>
      <View>
        <ImageList photos={photos} />
      </View>
    </View>
  );
};

export default ImageScreen;
