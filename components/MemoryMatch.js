import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const images = [
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg",
  "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg",
  "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928__480.jpg",
  "https://static.vecteezy.com/packs/media/vectors/term-bg-1-3d6355ab.jpg",
  "https://media.lactualite.com/2019/12/361ba8f8-istock-1084346110-1200x675.jpg",
];

export default MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [selectedCardIds, setSelectedCardIds] = useState([]);
  const [matchedCardIds, setMatchedCardIds] = useState([]);
  const [turns, setTurns] = useState(0);
  const [showAllCards, setShowAllCards] = useState(true); // Add new state for showing all cards
  const [allowedToViewCount, setAllowedToViewCount] = useState(3);
  function viewImages() {
    if (allowedToViewCount > 0) {
      setAllowedToViewCount(allowedToViewCount - 1);
      setShowAllCards(true);
      setTimeout(() => {
        setShowAllCards(false);
      }, 1000);
    }
  }
  function initializeGame() {
    setAllowedToViewCount(3);
    setShowAllCards(true);
    const newCards = [];
    for (let i = 0; i < images.length; i++) {
      newCards.push({ id: i * 2, image: images[i], matched: false });
      newCards.push({ id: i * 2 + 1, image: images[i], matched: false });
    }
    shuffle(newCards);
    setCards(newCards);
    function removeShowAllCards() {
      setTimeout(() => {
        setShowAllCards(false);
      }, 1000);
    }
    removeShowAllCards();
  }
  useEffect(() => {
    initializeGame();
  }, []);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleCardPress = (card) => {
    if (selectedCardIds.length === 2 || matchedCardIds.includes(card.id)) {
      return;
    }
    const newSelectedCardIds = [...selectedCardIds, card.id];
    setSelectedCardIds(newSelectedCardIds);
    if (newSelectedCardIds.length === 2) {
      const [card1, card2] = newSelectedCardIds.map((id) =>
        cards.find((c) => c.id === id)
      );
      if (card1.image === card2.image) {
        setMatchedCardIds([...matchedCardIds, card1.id, card2.id]);
        setSelectedCardIds([]);
      } else {
        setTimeout(() => {
          setSelectedCardIds([]);
        }, 1000);
      }
      setTurns(turns + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.turnsText}>Turns: {turns}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.turnsText}>
          Allowed To View: {allowedToViewCount}
        </Text>
        <TouchableOpacity style={styles.viewButton} onPress={viewImages}>
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[
              styles.card,
              selectedCardIds.includes(card.id) && styles.selectedCard,
              matchedCardIds.includes(card.id) && styles.matchedCard,
            ]}
            onPress={() => handleCardPress(card)}
            disabled={matchedCardIds.includes(card.id)}
          >
            <View style={styles.cardImageContainer}>
              <Image
                source={{
                  uri:
                    showAllCards ||
                    card.matched ||
                    selectedCardIds.includes(card.id)
                      ? card.image
                      : "https://example.com/cover.png",
                }}
                style={styles.cardImage}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={initializeGame} style={styles.restartButton}>
        <Text style={styles.restartButtonText}> Restart</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  turnsText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  cardImageContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  selectedCard: {
    borderColor: "blue",
  },
  matchedCard: {
    borderColor: "green",
  },
  restartButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 200,
  },
  restartButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  viewButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    width: 70,
    marginLeft: 10,
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  restartButtonDisabled: {
    backgroundColor: "#ddd",
  },
});
