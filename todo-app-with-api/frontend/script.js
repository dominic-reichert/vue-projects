Vue.createApp({
  data() {
    return {
      todos: [],
      newTodo: "",
      filter: "all",
    };
  },
  created() {
    this.loadTodos();
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
        .then((todoData) => {
          this.todos = todoData;
        });
    },

    addTodo() {
      if (this.newTodo.length === 0) {
        return;
      }

      if (this.checkForDuplicate()) {
        return alert("Duplicate todo");
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
      }).then(this.loadTodos());

      this.newTodo = "";
    },

    removeDoneTodos() {
      const urls = [];
      for (let todo of this.todos) {
        if (todo.done === true) {
          urls.push(`http://localhost:4730/todos/${todo.id}`);
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

    checkForDuplicate() {
      for (let i = 0; i < this.todos.length; i++) {
        const todo = this.todos[i];
        if (todo.description.toLowerCase() === this.newTodo.toLowerCase()) {
          return true;
        }
      }
      return false;
    },
  },
}).mount("#app");
