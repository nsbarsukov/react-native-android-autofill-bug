import {useState} from 'react';
import {StyleSheet, TextInput, View, Text, TextInputChangeEvent} from 'react-native';

export default function App() { 
  const [event, setEvent] = useState<TextInputChangeEvent['nativeEvent'] & {selection?: any} | null>(null);

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        placeholder="Phone"
        autoComplete="tel"
        onChange={e => setEvent(e.nativeEvent)}
      />

      <Text style={styles.logs}>
        [selection]: {JSON.stringify(event?.selection)}
      </Text>
      <Text style={styles.logs}>
        [value]: {event?.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    display: 'flex',
    gap: 10,
    
  },
  logs: {
    fontSize: 24,
  },
  input: {
    height: 40,
    padding: 5,
    marginHorizontal: 8,
    borderWidth: 1,
  }
});