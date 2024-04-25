import React from "react";
import { Text, View } from "react-native";
import { commonStyles } from "./Styles";

const BlogDetails = ({ route }) => {
  const blogPosts = route.params.item;

  return (
    <View style={[commonStyles.blogItem, specificeStyles.blogDetailContainer]}>
      <Text style={commonStyles.title}>{blogPosts.title}</Text>
      <Text style={commonStyles.desc}>{blogPosts.body}</Text>
    </View>
  );
};

export default BlogDetails;

const specificeStyles = {
  blogDetailContainer: {
    marginVertical: 10,
  },
};
