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
    loadTodos() {
      fetch("http://localhost:4730/todos")
        .then((response) => response.json())
        .then((todoData) => (this.todos = todoData));
    },

    addTodo() {
      if (this.newTodo.length === 0) {
        return;
      }

      const newTodo = {
        description: this.newTodo.trim(),
        done: false,
      };

      fetch("http://localhost:4730/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      this.newTodo = "";
    },

    removeDoneTodos() {
      const urls = [];
      for (let todo of this.todos) {
        id = todo.id;
        if (todo.done === true) {
          urls.push(`http://localhost:4730/todos/${id}`);
        }
      }

      Promise.all(
        urls.map((url) => {
          fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
        })
      )
        .then(() => console.log("Delete successful"))
        .then(() => this.loadTodos());
    },

    updateTodo(updatedTodo) {
      fetch(`http://localhost:4730/todos/${updatedTodo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      }).then((response) => console.log(response.status));
    },
  },
  created() {
    this.loadTodos();
  },
}).mount("#app");
