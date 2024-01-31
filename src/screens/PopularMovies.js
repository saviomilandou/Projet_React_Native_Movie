import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
 
const PopularMovies = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
 
    useEffect(() => {
        fetchPopularMovies();
    }, []);
 
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button style={styles.btnsearch}
                    onPress={() => navigation.navigate('Search')}
                    title="Search"
                />
            ),
        });
    }, [navigation]);
 
    const fetchPopularMovies = async () => {
        const apiURL = 'https://api.themoviedb.org/3/movie/popular?api_key=bfa54ab3befb5308a6b579f674f43b09';
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            console.error(error);
        }
    };
 
    const renderItem = ({ item }) => {
 
        const truncatedOverview = item.overview.length > 100
    ? item.overview.substring(0, 100) + '...see more'
    : item.overview;
 
    return (
        <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}>
          <View style={styles.item}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
            <View style={styles.nameNdes}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.dte}>Release Date: {item.release_date}</Text>
              <Text style={styles.vote}>Rating: {item.vote_average}</Text>
              <Text style={styles.overview}>{truncatedOverview}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
 
    return (
        <FlatList
            data={movies}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};
 
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      },
      title: {
        fontWeight: 'bold',
        fontSize: 18,
        margin: 10,
        flexShrink: 1,
      },
      overview: {
        fontSize: 14,
        margin: 10,
        flexShrink: 1,
      },
      image: {
        width: 100,
        height: 150,
        resizeMode: 'cover',
        alignSelf: 'center',
      },
      nameNdes: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
      },
      dte: {
        fontSize: 12,
        marginBottom: 1,
        marginLeft: 10,
      },
      vote: {
        fontSize: 12,
        marginBottom: 1,
        marginLeft: 10,
      },
      btnsearch: {
        margin: 4,
      },
});
 
export default PopularMovies;