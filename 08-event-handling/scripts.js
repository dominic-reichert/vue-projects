Vue.createApp({
  data() {
    return {
      x: 12,
      y: 4,
      fruitBasket: [
        "🍏 Apple",
        "🍌 Banana",
        "🍉 Melon",
        "🫐 Blueberry",
        "🍓 Strawberry",
        "🍍 Ananas",
        "🥭 Mango",
      ],
    };
  },
  methods: {
    setMouseCoordinates(event) {
      this.x = event.offsetX;
      this.y = event.offsetY;
    },
    removeFruit(fruitToBeRemoved) {
      this.fruitBasket = this.fruitBasket.filter((fruit) => {
        return fruit !== fruitToBeRemoved;
      });
    },
  },
}).mount("#app");
