import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { estatecategories } from './EstateType';

export default function ChooseEstate() {
  const [selectedItems, setSelectedItems] = useState([]);

  /** Toggle item selection */
  const handleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  /** Check if an item is selected */
  const isItemSelected = (id) => selectedItems.includes(id);

  const renderItem = ({ item }) => {
    const isSelected = isItemSelected(item.id);

    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => handleSelect(item.id)}
        activeOpacity={0.9}
      >
        <View
          style={[
            styles.itemContainer,
            isSelected && styles.selectedContainer,
          ]}
        >
          {/* Checkmark - always visible */}
          <View
            style={[
              styles.checkmarkContainer,
              isSelected && styles.selectedCheckmarkContainer,
            ]}
          >
            <Ionicons
              name="checkmark"
              size={10}
              color={isSelected ? 'white' : '#888'} // White when selected
            />
          </View>

          {/* Image */}
          <Image source={item.Image} style={styles.itemImage} />

          {/* Title */}
          <Text style={[styles.itemText, isSelected && styles.selectedText]}>
            {item.Title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={estatecategories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  listContent: {
    paddingBottom: 80,
  },

  itemWrapper: {
    flex: 1,
  },

  /** Default card */
  itemContainer: {
    position: 'relative',
    alignItems:'center',
    backgroundColor: '#f5f5f5', // Default background
    paddingVertical: 15,
    paddingHorizontal:15,
    borderRadius: 25,
    marginBottom:20,
  },

  /** When selected */
  selectedContainer: {
    backgroundColor: '#1F4C6B', // Highlighted background when selected
  },

  /** Image styling */
  itemImage: {
    width: 150,
    height: 160,
    resizeMode: 'cover',
    borderRadius: 20,
    marginBottom: 10,
  },

  /** Checkmark container */
  checkmarkContainer: {
    position: 'absolute',
    top: 20,
    left: 30,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0E0E0', // Default gray background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  /** Checkmark when selected */
  selectedCheckmarkContainer: {
    backgroundColor: '#8BC83F', // Green background when selected
  },

  /** Title */
  itemText: {
    fontFamily: 'latobold',
    fontSize: 12,
    fontWeight: '700',
    color: '#252B5C', 
  },

  selectedText: {
    fontFamily: 'latobold',
    fontSize: 12,
    color: '#fff', // White text when selected
    fontWeight: '700',
  },
});
