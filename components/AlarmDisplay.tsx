import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import {Alarm} from "@/scripts/types";


export default function AlarmDisplay({ alarm }: { alarm: Alarm | null }) {
    if (!alarm) {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Kein Alarm vorhanden</Text>
            </View>
        );
    }

    const date = new Date(alarm.time);
    const formattedDate = format(date, 'dd.MM.yyyy HH:mm');


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aktueller Alarm</Text>
            <Text style={styles.label}>Zeit: {formattedDate}</Text>
            <Text style={styles.label}>Nachricht: {alarm.message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 8,
    },
    noAlarmText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        padding: 20,
    },
});
