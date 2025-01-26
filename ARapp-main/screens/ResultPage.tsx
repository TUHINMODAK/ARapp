import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, FlatList, SafeAreaView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Mocks1 } from '../constants/Mocks1';

type ResultPageRouteProp = RouteProp<RootStackParamList, 'ResultPage'>;

interface ResultPageProps {
  route: ResultPageRouteProp;
}

const ResultPage: React.FC<ResultPageProps> = ({ route }) => {
  const { dimensions, roomType, furnitureType, detectedColor } = route.params || {};
  const { sofaDetails } = useContext(Mocks1);

  if (!dimensions || !roomType || !furnitureType || !detectedColor) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>
          Error: Required information is missing.
        </Text>
      </SafeAreaView>
    );
  }

  const filteredFurniture = Object.values(sofaDetails)
    .flat()
    .filter(
      (item) =>
        item.roomType.toLowerCase() === roomType.toLowerCase() &&
        item.furnitureType.toLowerCase() === furnitureType.toLowerCase()
    );

  if (!filteredFurniture || filteredFurniture.length === 0) {
    console.log('No results for:', { roomType, furnitureType });
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>
          No furniture found for the selected criteria.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Detected Color:</Text>
        <View style={[styles.colorPreview, { backgroundColor: detectedColor }]} />
        <Text style={styles.detectedColorText}>{detectedColor}</Text>
      </View>
      <FlatList
        data={filteredFurniture}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.color}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2F2F',
  },
  header: {
    padding: 16,
    backgroundColor: '#F3E6C9',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F2F2F',
    marginBottom: 8,
  },
  colorPreview: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  detectedColorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5D9C59',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 15,
    backgroundColor: '#FAFAFA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D9C59',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#808080',
    lineHeight: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#D87D4A',
    textAlign: 'center',
    marginTop: 20,
    padding: 16,
  },
});

export default ResultPage;
