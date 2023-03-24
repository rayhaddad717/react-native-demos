import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextTurn, setNextTurn] = useState(Math.random() < 0.5 ? "X" : "O");
  function restart() {
    setSquares(Array(9).fill(null));
    setNextTurn(Math.random() < 0.5 ? "X" : "O");
  }
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let status;
  let gameDone = false;
  if (winner) {
    status = `Winner: ${winner}`;
    gameDone = true;
  } else if (squares.indexOf(null) === -1) {
    status = "Draw";
    gameDone = true;
  } else {
    status = `Next player: ${nextTurn}`;
  }
  const handleClick = (index) => {
    if (gameDone) return;
    if (squares[index] === null) {
      const square_copy = [...squares];
      square_copy[index] = nextTurn;
      if (nextTurn === "X") setNextTurn("O");
      else setNextTurn("X");
      setSquares(square_copy);
    }
  };
  const renderSquare = (index) => {
    return (
      <TouchableOpacity
        style={styles.square}
        onPress={() => handleClick(index)}
      >
        <Text style={squares[index] === "X" ? styles.x : styles.o}>
          {squares[index]}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.board}>
      <View>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      <Text style={[{ marginTop: 20 }, styles.statusText]}>{status}</Text>

      <TouchableOpacity
        style={[
          styles.restartButton,
          !gameDone && styles.restartButtonDisabled,
        ]}
        onPress={restart}
      >
        <Text
          style={[
            styles.restartButtonText,
            !gameDone && styles.restartButtonTextDisabled,
          ]}
        >
          Restart
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    padding: 10,
    backgroundColor: "#fff",
    flex: 3,
    justifyContent: "space-between",
    marginBottom: "3%",
  },
  row: {
    flexDirection: "row",
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  x: {
    color: "#f00",
    fontSize: 50,
    fontWeight: "bold",
  },
  o: {
    color: "#00f",
    fontSize: 50,
    fontWeight: "bold",
  },
  restartButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
  },
  restartButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  restartButtonDisabled: {
    marginTop: 20,
    backgroundColor: "#bbb",
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
  },
  restartButtonTextDisabled: {
    color: "#ddd",
    fontWeight: "bold",
    fontSize: 16,
  },
  statusText: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
