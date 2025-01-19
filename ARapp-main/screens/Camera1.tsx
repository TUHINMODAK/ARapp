import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices, PhotoFile } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types'; // Adjust the path as needed

type NavigationProp = StackNavigationProp<RootStackParamList, 'Cam'>;

const Cam: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const camera = useRef<Camera>(null);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    try {
      const photo = await camera.current?.takePhoto();
      if (photo) {
        await uploadPhoto(photo);
        // Redirect to FormPage after taking the photo
      }
    } catch (error) {
      console.error('Failed to take photo', error);
    }
  };

  const uploadPhoto = async (photo: PhotoFile) => {
    try {
      const response = await fetch(`file://${photo.path}`);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const base64 = base64data.split(',')[1];

        try {
          const uploadResponse = await fetch('http://192.168.1.5:5000/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64 }),
          });

          const detectedColor = await uploadResponse.json();
          console.log('Upload response:', detectedColor);

          // Extract the color string from the detected color object
          const color = detectedColor?.color || 'No color detected'; // Default to 'No color detected' if color is not available

          // Navigate to FormPage with the color as a string
          navigation.navigate('FormPage', { detectedColor: color });
        } catch (uploadError) {
          console.error('Upload failed', uploadError);
        }
      };
    } catch (error) {
      console.error('Failed to read photo', error);
    }
  };

  if (!hasPermission) return <Text>No camera permissions</Text>;
  if (!device) return <Text>No back camera device found</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(245, 13, 13, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
  },
});

export default Cam;
