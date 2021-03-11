Vue.component("todo-list", {
    props: {
        todos: {
            type: Array,
            required: true
        }
    },

    data: function() {
        return {
            new_todo: null,            
            error: null
        }
    },

    methods: {
        submitTodo() {
            if (this.new_todo) {
                this.$emit('submit-todo', this.new_todo);
                this.new_todo = null;

                if (this.error) {
                    this.error = null;
                }

            } else {
                this.error = "Assicurati di compilare tutti i campi del form!";
            }
        }
    },

    template: `
        <div class="mt-2">
            <div class="container">              
                <h3>{{ error }}</h3>

                <form @submit.prevent="submitTodo">                   
                    <div class="form-group">
                        <label for="todoText">Aggiungi un todo</label>
                        <input
                            class="form-control"
                            id="todoText"
                            type="text"
                            v-model="new_todo">
                        </textarea>
                    </div>                   
                </form>
                <todo
                    v-for="(todo, index) in todos"
                    :todo="todo"
                    :key="index"
                ></todo>                
            </div>
        </div>
    `
})

Vue.component("todo", {
    props: {
        todo: {
            type: String,
            required: true
        }
    },
    template: `
        <div class="comment mb-2">
            <div class="card">                
                <div class="card-body">
                    <p>{{ todo }}</p>
                </div>
            </div>
        </div>
    `
})

let app = new Vue({
    el: "#app",
    data: {
        todos: []
    },
    methods: {
        addTodo(new_todo) {
            console.log('inside addTodo', new_todo)
            this.todos.push(new_todo)
        }
    }
})