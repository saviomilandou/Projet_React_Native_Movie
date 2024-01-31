import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
 
const MovieDetail = ({ route }) => {
    const { movieId } = route.params;
    const [movieDetails, setMovieDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
 
    useEffect(() => {
        fetchMovieDetails();
    }, []);
 
    const fetchMovieDetails = async () => {
        const apiURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=bfa54ab3befb5308a6b579f674f43b09`;
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            setMovieDetails(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
 
    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
 
    if (!movieDetails) {
        return <Text>Unable to load details.</Text>;
    }
 
    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/original${movieDetails.poster_path}` }}
                style={styles.image}
            />
            <View style={styles.details}>
                <Text style={styles.title}>{movieDetails.title}</Text>
                <Text style={styles.subtitle}>{movieDetails.tagline}</Text>
                <Text style={styles.overview}>{movieDetails.overview}</Text>
                <View style={styles.additionalDetails}>
                    <Text style={styles.detail}>Release Date: {movieDetails.release_date}</Text>
                    <Text style={styles.detail}>Rating: {movieDetails.vote_average}</Text>
                </View>
            </View>
        </ScrollView>
    );
};
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 500,
        resizeMode: 'cover',
    },
    details: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 10,
    },
    overview: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    additionalDetails: {
        marginTop: 20,
    },
    detail: {
        fontSize: 16,
        marginTop: 10,
    },
});
 
export default MovieDetail;