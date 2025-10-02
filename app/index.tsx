import NetInfo from "@react-native-community/netinfo";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNetworkSync } from "./getNetInfo/useNetworkSync";
import useOfflineStore from "./store/useOfflineStore";
import addToFirebase from "./utils/firebaseHelper";


export default function Index() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const addPending = useOfflineStore((state) => state.addPending);
  useNetworkSync();

  const handleSubmit = async () => {
    if (!name || !age) {
      alert("Please enter both name and age");
      return;
    }
    const newData = {
      name,
      age,
      createdAt: new Date().toISOString(),
    };

    const state = await NetInfo.fetch();

    if (state.isConnected) {
      try {
        await addToFirebase(newData);
        alert("Data submitted!");
        setName("");
        setAge("");
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong while submitting!");
      }
    } else {
      const id = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
      alert("No internet! Data saved locally and will sync later.");
      addPending({ id, payload: newData });
      setName("");
      setAge("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Data to Submit</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
