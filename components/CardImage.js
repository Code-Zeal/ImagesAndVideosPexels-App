import { TouchableOpacity, Text, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const CardImage = ({ image }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="flex w-[49.5%] m-auto justify-between border-[0] rounded-[5px]"
      onPress={() => navigation.navigate("ImageScreen", { image })}
    >
      <Image
        className="h-[180px] w-[100%]"
        source={{
          uri: image.src.portrait
            ? image.src.portrait
            : "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png",
        }}
      />
    </TouchableOpacity>
  );
};

export default CardImage;
