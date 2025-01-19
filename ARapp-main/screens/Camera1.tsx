import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Camera, useCameraDevices, PhotoFile } from 'react-native-vision-camera';
import { encode } from 'base-64';

const Cam: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const camera = useRef<Camera>(null);
  
  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    try {
      const photo = await camera.current?.takePhoto({
       // quality: 'balanced'
      });

      if (photo) {
        // Handle the photo, e.g., upload or save
        await uploadPhoto(photo);
      }
    } catch (error) {
      console.error('Failed to take photo', error);
    }
  };

  const uploadPhoto = async (photo: PhotoFile) => {
    try {
      // Read file and convert to base64 using fetch for web/file API
      const response = await fetch(`file://${photo.path}`);
      const blob = await response.blob();
      
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        // Remove the data URL prefix
        const base64 = base64data.split(',')[1];

        try {
          const uploadResponse = await fetch('http://192.168.1.5:5000/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64 }),
          });

          const data = await uploadResponse.json();
          console.log('Upload response:', data);
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
    <View style={{flex:1}}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.captureButton}
          onPress={takePicture}
        >
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