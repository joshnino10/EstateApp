import { Tabs } from 'expo-router'
import React from 'react'


export default function Tablayout() {
  return (
    <Tabs screenOptions={{headerShown:false}}>


      <Tabs.Screen name='home'/>
      <Tabs.Screen name='search'/>
      <Tabs.Screen name='like'/>
      <Tabs.Screen name='profile'/>
    </Tabs>
  )
}

