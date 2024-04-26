import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BlogPost from "./BlogPost";

const HomeScreen = ({ selectedDropdownOptionRef }) => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const postsPerPage = 10;

  const url = `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=${postsPerPage}`;

  useEffect(() => {
    setPageNumber(1);
    getPosts();
  }, [selectedDropdownOptionRef]);

  async function getPosts() {
    setIsLoading(true);
    try {
      const response = await fetch(url);

      const data = await response.json();

      // Sorting posts based on the selecting options...
      let sortedPosts;

      if (selectedDropdownOptionRef === "postAscending") {
        sortedPosts = data.sort((a, b) => a.title.localeCompare(b.title));
      } else if (selectedDropdownOptionRef === "postDescending") {
        sortedPosts = data.sort((a, b) => b.title.localeCompare(a.title));
      } else if (selectedDropdownOptionRef === "postId") {
        sortedPosts = data.sort((a, b) => a.id.localeCompare(b.id));
      } else {
        sortedPosts = data;
      }

      // Updating posts array with prev posts and sorted posts...
      setPosts(sortedPosts);

      // Incrementing page number by one...
      setPageNumber(pageNumber + 1);

      if (data.length == 0) {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  // Showing a loader...
  function renderLoader() {
    return isLoading ? (
      <ActivityIndicator size="large" color="#153448" />
    ) : null;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={({ item, index }) => {
          if (!hasMore && index === posts.length - 1) {
            return (
              <View style={styles.endMessageContainer}>
                <Text style={styles.endMessage}>No more posts available!</Text>
              </View>
            );
          } else {
            return <BlogPost item={item} />;
          }
        }}
        keyExtractor={(item) => item.id.toString() + Math.random().toString()}
        onEndReached={hasMore ? getPosts : null}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderLoader}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  endMessageContainer: {
    padding: 14,
    backgroundColor: "#153448",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  endMessage: {
    fontSize: 17,
    fontFamily: "sans-serif",
    color: "#B6C4B6",
  },
});
