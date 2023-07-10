/* const body = document.querySelector("body");
const color = document.getElementById("hexCode");
const slider = document.querySelectorAll("input");
const redElement = document.getElementById("red");
const greenElement = document.getElementById("green");
const blueElement = document.getElementById("blue");

function rangeValueToHex(value) {
  value = Number.parseInt(value);
  return ("0" + value.toString(16)).substr(-2);
}

function setBackgroundColor() {
  const red = redElement.value;
  const green = greenElement.value;
  const blue = blueElement.value;

  body.style.setProperty("background-color", `rgb(${red} ${green} ${blue})`);
  color.innerText =
    "#" + rangeValueToHex(red) + rangeValueToHex(green) + rangeValueToHex(blue);
}

for (let index = 0; index < slider.length; index++) {
  const element = slider[index];
  element.addEventListener("input", setBackgroundColor);
}

setBackgroundColor(); */

Vue.createApp({
  data() {
    return {
      red: 50,
      green: 50,
      blue: 50,
    };
  },
  computed: {
    rangeValueToHex() {
      const redHex = parseInt(this.red).toString(16);
      const greenHex = parseInt(this.green).toString(16);
      const blueHex = parseInt(this.blue).toString(16);

      const hexValue = "#" + redHex + greenHex + blueHex;
      return hexValue;
    },
  },
  methods: {
    setBackgroundColor(event) {
      const color = event.target.id;
      this[color] = event.target.value;
      document.body.style.setProperty(
        "background-color",
        `rgb(${this.red} ${this.green} ${this.blue})`
      );
    },
  },
  mounted() {
    document.body.style.setProperty(
      "background-color",
      `rgb(${this.red} ${this.green} ${this.blue})`
    );
  },
}).mount("#app");
