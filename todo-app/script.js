Vue.createApp({
  data() {
    return {
      todos: [],
      newTodo: "",
      filter: "all",
    };
  },
  computed: {
    filteredTodos() {
      return this.todos.filter((todo) => {
        if (this.filter === "all") {
          return todo;
        }
        if (this.filter === "done") {
          return todo.done === true;
        }
        if (this.filter === "open") {
          return todo.done === false;
        }
      });
    },
  },
  methods: {
    addTodo(event) {
      event.preventDefault();
      if (this.newTodo.length === 0) {
        return;
      }
      this.todos.push({
        todo: this.newTodo.trim(),
        done: false,
        id: +new Date(),
      });
      this.newTodo = "";
    },
    removeDoneTodos() {
      this.todos = this.todos.filter((todo) => todo.done === false);
    },
  },
}).mount("#app");
