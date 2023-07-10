Vue.createApp({
  data() {
    return {};
  },
  methods: {
    toggleTitle() {
      let title = document.title;
      if (title === "Good Morning" || title === "Light Switch") {
        document.title = "Good Night";
      } else {
        document.title = "Good Morning";
      }
    },
    toggleDarkMode(event) {
      document.body.classList.toggle("dark-mode");
      event.target.classList.toggle("dark-mode");
      event.target.classList.toggle("glow");
      this.toggleTitle();
    },
  },
}).mount("#app");
