import { Staff } from '@/scripts/types';
import { View, Text, StyleSheet } from 'react-native';


export default function AlarmCard({ item }:{item:Staff}) {
    return (
        <View style={styles.card}>
            <Text>{item.firstName} {item.lastName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#f5f5f5', 
      marginVertical: 8,
      marginHorizontal: 8,
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3
    },
  });