import { View, Text, FlatList, StyleSheet } from 'react-native';


export default function AlarmCard({ item }:{item:any}) {
    return (
        <View style={styles.card}>
            <Text>{item.message}</Text>
            <Text>📅 {item.time}</Text>
            <Text>-------</Text>
            <Text>Positive</Text>
            <FlatList
            data={item.positiveResponses}
            keyExtractor={(response) => response.id}
            renderItem={({ item }) => (
                <Text>{item.staffName}</Text>
            )}
            ListEmptyComponent={<Text>No positive responses</Text>}
            />

            <Text>-------</Text>
            <Text>Negative</Text>
            <FlatList
            data={item.negativeResponses}
            keyExtractor={(response) => response.id}
            renderItem={({ item }) => (
                <Text>{item.staffName}</Text>
            )}
            ListEmptyComponent={<Text>No positive responses</Text>}
            />
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