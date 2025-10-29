import { Tabs } from 'expo-router';
import React from 'react';
import { Image, View } from 'react-native';
import { BlurView } from 'expo-blur'; 

export default function Tablayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={70}
            style={{
              flex: 1,
              borderRadius: 25,
              overflow: 'hidden',
            }}
          />
        ),
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 20,
          right: 20,
          height: 70,
          paddingTop: 12,
          paddingHorizontal: 30,
          borderRadius: 25,
          overflow: 'hidden',
          borderTopWidth: 2,
          borderTopColor: '#ffffff',
          elevation: 8,
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 8,
        },
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/homeactive2.png')
                  : require('../../assets/images/homeInactive.png')
              }
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />

      {/* SEARCH */}
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/searchActive.png')
                  : require('../../assets/images/searchinactive.png')
              }
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />

      {/* LIKE */}
      <Tabs.Screen
        name="like"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/likeinactive.png')
                  : require('../../assets/images/likeinactive.png')
              }
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />

      {/* PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/Profile.png')
                  : require('../../assets/images/Apple.png')
              }
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}