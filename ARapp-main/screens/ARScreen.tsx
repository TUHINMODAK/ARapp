import React, { useState } from "react";
import { ViroARPlaneSelector } from "@reactvision/react-viro";
import { StyleSheet, View } from "react-native";
import {
    ViroARSceneNavigator,
    ViroARScene,
    Viro3DObject,
    ViroAmbientLight,
    ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { furnitureModels, FurnitureModelKey } from '../constants/mocks1main'; // Import from your mocks file

type Position = [number, number, number];
type Scale = [number, number, number];

type Rotation = [number, number, number];

interface HelloWorldSceneARProps {
    viroAppProps: {
        variantName?: string;
    };
    route?: RouteProp<RootStackParamList, 'ARscene'>;
    navigation?: StackNavigationProp<RootStackParamList, 'ARscene'>;
}

const HelloWorldSceneAR: React.FC<HelloWorldSceneARProps> = ({ route }) => {
    const [text, setText] = useState("Initializing AR...");
    const [scale, setScale] = useState<Scale>([0.2, 0.2, 0.2]);
    const [position, setPosition] = useState<Position>([0, -0.5, -1]);
    const [rotation, setRotation] = useState<Rotation>([0, 0, 0]);

    // Narrow the type of variantName
    const variantName = (route?.params?.variantName || 'default') as FurnitureModelKey;
    const modelSource = furnitureModels[variantName];

    const _onDrag = (dragToPos: Position) => {
        setPosition(dragToPos);
    };

    const handlePinch = (pinchState: number, scaleFactor: number) => {
        if (pinchState === 3) {
            const newScale: Scale = [
                Math.max(0.05, Math.min(scale[0] * scaleFactor, 2)),
                Math.max(0.05, Math.min(scale[1] * scaleFactor, 2)),
                Math.max(0.05, Math.min(scale[2] * scaleFactor, 2)),
            ];
            setScale(newScale);
        }
    };

    const _onRotate = (rotateState: number, rotationFactor: number) => {
    if (rotateState === 2) { // During the rotation gesture
        const newRotation: Rotation = [
            rotation[0],
            rotation[1] - rotationFactor,
            rotation[2],
        ];
        setRotation(newRotation); // Update rotation incrementally
    } else if (rotateState === 3) { // When the gesture ends
        console.log("Rotation gesture ended");
    }
};

    function onInitialized(state: any, reason: any) {
        console.log("onInitialized:", state, reason);
        if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
            setText("Place your furniture!");
        }
    }

    return (
        <ViroARScene onTrackingUpdated={onInitialized}>
            <ViroAmbientLight color={"#ffffff"} />
            <ViroARPlaneSelector>
                <Viro3DObject
                    source={modelSource}
                    type="GLB"
                    scale={scale}
                    position={position}
                    rotation={rotation}
                    dragType="FixedToWorld"
                    onDrag={_onDrag}
                    onPinch={handlePinch}
                    onRotate={_onRotate}
                    animation={{
                        name: "Take 001",
                        run: true,
                        loop: true,
                        delay: 1000,
                    }}
                />
            </ViroARPlaneSelector>
        </ViroARScene>
    );
};

const ARSceneWithOptions = ({ route, navigation }: {
    route: RouteProp<RootStackParamList, 'ARscene'>,
    navigation: StackNavigationProp<RootStackParamList, 'ARscene'>
}) => {
    const { variantName } = route.params;

    // Wrapper function to ensure proper props passing to the scene
    const HelloWorldSceneARWithProps = () => {
        return <HelloWorldSceneAR
            viroAppProps={{
                variantName: variantName
            }}
            route={route}
        />;
    };

    return (
        <View style={styles.mainView}>
            <ViroARSceneNavigator
                autofocus={true}
                initialScene={{
                    scene: HelloWorldSceneARWithProps,
                }}
                style={{ flex: 1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
});

export default ARSceneWithOptions;