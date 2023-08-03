<template>
  <header>
    <h1 class="title">To-Do App</h1>
  </header>
  <main>
    <form @submit.prevent="addTodo()">
      <div class="input-container">
        <input
          type="text"
          name="newTodo"
          id="newTodo"
          placeholder="Get sh*t done!"
          v-model.lazy="newTodoInput"
        />
        <button class="add-button" type="button" @click="addTodo()">Add</button>
      </div>
    </form>

    <section class="filter-and-options">
      <h2>Filter & Options</h2>
      <div class="filter-container">
        <input
          type="radio"
          class="radio-button"
          name="filter-radio"
          id="all"
          value="all"
          v-model="filter"
        />
        <label for="all">All</label>
        <input
          type="radio"
          class="radio-button"
          name="filter-radio"
          id="open"
          value="open"
          v-model="filter"
        /><label for="open">Open</label>
        <input
          type="radio"
          class="radio-button"
          name="filter-radio"
          id="done"
          value="done"
          v-model="filter"
        /><label for="done">Done</label>
      </div>

      <button class="delete-button" @click="removeDoneTodos">
        Remove finished To-Dos
      </button>
    </section>

    <section class="todos">
      <h2>Your To-Dos</h2>
      <ul v-if="todos.length" id="list">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          :class="{ done: todo.done }"
          @change="updateTodo(todo)"
        >
          <input
            type="checkbox"
            v-model="todo.done"
            :checked="todo.done"
            :id="'todo-' + todo.id"
          />
          <label :for="'todo-' + todo.id">{{ todo.description }}</label>
        </li>
      </ul>
      <h3 v-else>Loading Data...</h3>
      <h3 v-if="error">{{ error }}</h3>
    </section>
  </main>
</template>

<script lang="ts">
import { computed, ref } from "vue";

export default {
  name: "HomeView",
  setup() {
    const todos = ref<{ description: string; done: boolean; id: number }[]>([]);
    const newTodoInput = ref("");
    const filter = ref("all");
    const error = ref(null);

    const filteredTodos = computed(() => {
      return todos.value.filter(
        (todo: { description: string; done: boolean; id: number }) => {
          if (filter.value === "all") {
            return todo;
          }
          if (filter.value === "done") {
            return todo.done === true;
          }
          if (filter.value === "open") {
            return todo.done === false;
          }
        }
      );
    });

    const loadTodos = async () => {
      try {
        let data = await fetch("http://localhost:4730/todos");
        if (!data.ok) {
          throw Error("No Data available");
        }
        todos.value = await data.json();
      } catch (err: any) {
        error.value = err.message;
      }
    };

    const addTodo = () => {
      if (newTodoInput.value.length === 0) {
        return;
      }

      const newTodo = {
        description: newTodoInput.value.trim(),
        done: false,
      };

      fetch("http://localhost:4730/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      }).then(() => loadTodos());

      newTodoInput.value = "";
    };

    const updateTodo = async (updatedTodo: {
      description: string;
      done: boolean;
      id: number;
    }) => {
      try {
        let data = await fetch(
          `http://localhost:4730/todos/${updatedTodo.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTodo),
          }
        );
        if (!data.ok) {
          throw Error("Update was not successful");
        }
        loadTodos();
      } catch (err: any) {
        error.value = err.message;
      }
    };

    const removeDoneTodos = () => {
      const urls = [];
      for (let todo of todos.value) {
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
        .then(() => loadTodos());
    };

    loadTodos();

    return {
      removeDoneTodos,
      addTodo,
      updateTodo,
      filteredTodos,
      todos,
      filter,
      newTodoInput,
      error,
    };
  },
};
</script>

<style scoped>
.title {
  margin: 0;
  text-shadow: 2px 2px var(--light-blue), 4px 4px var(--yellow);
}

header {
  text-align: center;
  background-color: var(--pink);
  padding: 3rem 1rem;
  color: white;
}

main {
  padding: 1rem;
  max-width: 35ch;
  margin: 0 auto;
}

main > * + * {
  margin-top: 3rem;
}

button {
  all: unset;
  display: block;
  word-break: keep-all;
  word-wrap: normal;
  color: white;
  background-color: var(--light-blue);
  padding: 0.25em 0.4em;
  border-radius: 0.3em;
  border: 0.1em solid transparent;
  box-shadow: 3px 3px 0px var(--pink);
}

button:focus {
  border: 0.1em solid var(--yellow);
}

button:active {
  box-shadow: none;
}

.input-container {
  display: flex;
  gap: 1rem;
}

#newTodo {
  all: unset;
  display: inline-block;
  flex-grow: 1;
  width: auto;
  background-color: white;
  padding: 0.5em;
  border: 0.1em solid transparent;
  border-radius: 0.3em;
}
.filter-and-options > * + * {
  margin-top: 1rem;
}

#list {
  list-style-type: none;
  padding: 0;
}

#list > * + * {
  margin-top: 0.5rem;
}

#list .done {
  text-decoration: line-through;
}
</style>
