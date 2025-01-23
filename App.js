import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

const App = () => {
  const [myData, setMyData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Fetch Data from MySafeInfo Dog Breeds API
  useEffect(() => {
    fetch("https://mysafeinfo.com/api/data?list=dogbreeds&format=json&case=default")
        .then((response) => response.json())
        .then((json) => {
          setMyData(json);
          setOriginalData(json); // Store original data for filtering
        })
        .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter Data Function
  const filterData = (text) => {
    setSearchText(text);
    if (text === "") {
      setMyData(originalData); // Reset to original data if search is cleared
    } else {
      const filteredData = originalData.filter((item) =>
          item.Breed.toLowerCase().includes(text.toLowerCase()) // Filter by breed name
      );
      setMyData(filteredData);
    }
  };

  const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <Text style={styles.text}>Breed: {item.Breed}</Text>
        <Text style={styles.text}>Origin: {item.Origin}</Text>
      </View>
  );

  return (
      <View style={styles.container}>
        <StatusBar />
        <TextInput
            style={styles.searchBox}
            value={searchText}
            onChangeText={filterData}
            placeholder="Search dog breeds..."
        />
        <FlatList data={myData} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "lightblue",
  },
  searchBox: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 10,
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default App;
