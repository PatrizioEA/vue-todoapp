const app = Vue.createApp({})

app.component("todo-list", {
    data: function() {
        return {
            new_todo: "",
            todos: [],            
            error: null
        }
    },

    methods: {
        submitTodo() {
            if (this.new_todo) {
                this.todos.push(this.new_todo);
                this.new_todo = null;

                if (this.error) {
                    this.error = null;
                }

            } else {
                this.error = "Assicurati di compilare tutti i campi del form!";
            }
        },
        deleteTodo(element) {
            let index = this.todos.indexOf(element);
            this.todos.splice(index, 1);
        }
    },

    template: `
        <div class="mt-2">
            <div class="container">              
                <h3>{{ error }}</h3>

                <form @submit.prevent="submitTodo">                   
                    <div class="form-group">
                        <label for="todoText">Task rimanenti {{ todos.length }}</label>
                        <input
                            placeholder="Aggiungi un todo"
                            class="form-control"
                            id="todoText"
                            type="text"
                            v-model="new_todo">
                        </input>
                    </div>                   
                </form>
                <todo
                    v-for="(todo, index) in todos"
                    :todo="todo"
                    :key="index"
                    @delete-todo="deleteTodo"
                ></todo>                
            </div>
        </div>
    `
})

app.component("todo", {
    props: {
        todo: {
            type: String,
            required: true
        }
    },
    template: `               
        <div class="alert alert-success">
            {{ todo }}
            <button
              type="button"
              class="close"
              @click="this.$emit('delete-todo', this.todo)">
              <span>&times;</span>
            </button>
          </div>
    `
})

app.mount('#app')