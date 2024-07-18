import React from 'react';
import {  Text, View } from 'react-native';
import { Link } from 'expo-router'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-6xl font-pblack">Hello World</Text>
      <Link href = "/profile" style ={{color: 'blue'}}>Go to profile page</Link>
    </View>
  );
}
