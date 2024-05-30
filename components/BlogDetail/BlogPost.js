import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { commonStyles } from "../Style/Styles";

const BlogPost = ({ item }) => {
  const navigation = useNavigation();

  function onPress() {
    navigation.navigate("BlogDetails", {
      item: item,
    });
  }

  const shortDesc = item.body.split("");

  return (
    <View style={[commonStyles.container, { zIndex: 5 }]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          commonStyles.blogItem,
          pressed && commonStyles.pressed,
          { zIndex: 5 },
        ]}
      >
        <Text style={commonStyles.title}>{item.title}</Text>
        <Text style={commonStyles.desc}>{shortDesc.slice(0, 20)}...</Text>
      </Pressable>
    </View>
  );
};

export default BlogPost;
