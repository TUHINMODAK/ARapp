import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { Picker } from '@react-native-picker/picker';

type NavigationProp = StackNavigationProp<RootStackParamList, 'FormPage'>;
type FormPageRouteProp = RouteProp<RootStackParamList, 'FormPage'>;

const FormPage = ({ route }: { route: FormPageRouteProp }) => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [roomType, setRoomType] = useState('');
  const [furnitureType, setFurnitureType] = useState('');
  const [detectedColor, setDetectedColor] = useState<string>(''); // Define as string
  
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    // Check if detectedColor is passed through route params and extract just the color value
    if (route.params?.detectedColor && route.params?.detectedColor) {
      setDetectedColor(route.params?.detectedColor); // Extract color value
    }
  }, [route.params?.detectedColor]);

  const handleDone = () => {
    if (!length || !width || !height || !roomType || !furnitureType) {
      Alert.alert('Error', 'Please fill all fields with valid data.');
      return;
    }

    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);

    if (l <= 0 || w <= 0 || h <= 0) {
      Alert.alert('Error', 'All dimensions must be positive numbers.');
      return;
    }

    const dimensions = `${l}" x ${w}" x ${h}"`;
    // Use the detectedColor string here
    const detectedColorValue = detectedColor || 'No color detected';

    navigation.navigate('ResultPage', {
      dimensions,
      roomType,
      furnitureType,
      detectedColor: detectedColorValue,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Room Dimensions</Text>
        <Text style={styles.label}>Length:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Length"
          placeholderTextColor="#A5A5A5"
          keyboardType="numeric"
          value={length}
          onChangeText={setLength}
        />

        <Text style={styles.label}>Width:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Width"
          placeholderTextColor="#A5A5A5"
          keyboardType="numeric"
          value={width}
          onChangeText={setWidth}
        />

        <Text style={styles.label}>Height:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Height"
          placeholderTextColor="#A5A5A5"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        <Text style={styles.label}>Room Type:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={roomType}
            onValueChange={(itemValue) => setRoomType(itemValue)}
            style={styles.picker}
            dropdownIconColor="#FAFAFA"
          >
            <Picker.Item label="Select Room Type" value="" color="#000" />
            <Picker.Item label="Living Room" value="Living Room" color="#000" />
            <Picker.Item label="Bedroom" value="Bedroom" color="#000" />
            <Picker.Item label="Kitchen" value="Kitchen" color="#000" />
            <Picker.Item label="Bathroom" value="Bathroom" color="#000" />
          </Picker>
        </View>

        <Text style={styles.label}>Furniture Type:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={furnitureType}
            onValueChange={(itemValue) => setFurnitureType(itemValue)}
            style={styles.picker}
            dropdownIconColor="#FAFAFA"
          >
            <Picker.Item label="Select Furniture Type" value="" color="#000" />
            <Picker.Item label="Sofa" value="Sofa" color="#000" />
            <Picker.Item label="Table" value="Table" color="#000" />
            <Picker.Item label="Chair" value="Chair" color="#000" />
            <Picker.Item label="Bed" value="Bed" color="#000" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d7f2d5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#F3E6C9',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F2F2F',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2F2F2F',
    fontWeight: '500',
  },
  input: {
    height: 45,
    borderColor: '#BFA980',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#FAFAFA',
    color: '#2F2F2F',
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: '#BFA980',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#5D9C59',
    overflow: 'hidden',
  },
  picker: {
    height: 45,
    color: '#FAFAFA',
  },
  doneButton: {
    backgroundColor: '#D87D4A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FormPage;
