import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TicTacToe from "./components/TicTacToe";
import MemoryMatch from "./components/MemoryMatch";
import { useState } from "react";
// import Game from "./components/Game";
export default function App() {
  const [gameNo, setGameNo] = useState(0);
  function nextGame() {
    if (gameNo) setGameNo(0);
    else setGameNo(1);
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} onPress={nextGame}>
          {gameNo === 0 ? "Tic Tac Toe" : "Memory Match"} NEXT
        </Text>
      </View>
      <StatusBar style="auto" />
      {gameNo === 0 ? <TicTacToe /> : <MemoryMatch />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    marginBottom: 30,

    width: "80%",
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "left",
  },
});
