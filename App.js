import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';

const shapes = [
  { id: 1, type: 'circle', color: 'red', target: { x: 50, y: 100 } },
  { id: 2, type: 'square', color: 'blue', target: { x: 150, y: 100 } },
];

export default function App() {
  const [positions, setPositions] = useState(
    shapes.map((shape) => ({ id: shape.id, x: 50, y: 400 }))
  );

  const handleDrag = (id, event) => {
    const { translationX, translationY } = event.nativeEvent;
    setPositions((prev) =>
      prev.map((pos) =>
        pos.id === id ? { ...pos, x: translationX + 50, y: translationY + 400 } : pos
      )
    );
  };

  const handleDragEnd = (id) => {
    const shape = shapes.find((shape) => shape.id === id);
    const position = positions.find((pos) => pos.id === id);

    const isCorrect =
      Math.abs(position.x - shape.target.x) < 30 &&
      Math.abs(position.y - shape.target.y) < 30;

    if (isCorrect) {
      Alert.alert('Parabéns!', 'Você acertou!');
    }
  };

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>

      <Text style={styles.title}>Associe as Formas!</Text>

      {/* Targets */}
      {shapes.map((shape) => (
        <View
        key={shape.id}
        style={{
          ...styles.target,
          top: shape.target.y,
          left: shape.target.x,
          backgroundColor: shape.color,
        }}
        />
      ))}

      {/* Draggable Shapes */}
      {positions.map((pos) => (
        <PanGestureHandler
        key={pos.id}
        onGestureEvent={(event) => handleDrag(pos.id, event)}
        onEnded={() => handleDragEnd(pos.id)}
        >
          <View
            style={{
              ...styles.shape,
              top: pos.y,
              left: pos.x,
              backgroundColor: shapes.find((shape) => shape.id === pos.id).color,
            }}
            />
        </PanGestureHandler>
      ))}
    </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  target: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    opacity: 0.5,
  },
  shape: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
