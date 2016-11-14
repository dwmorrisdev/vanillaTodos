var todoList = {
  todos: [],
  
  //add an item to the list
  addItem: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  
  // make changes to an item
  modifyItem: function(selection, todoText) {
    this.todos[selection].todoText = todoText;
  },
  
  //delete an item
  delItem: function(selection) {
    this.todos.splice(selection, 1);
  },
  
  // allow each item to be set as completed or incomplete
  toggleCompleted: function(selection) {
    var todo = this.todos[selection];
    todo.completed = !todo.completed;
  },
  
  //create function that switches between all complete and all incomplete.
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    //get number of completed todos
    for (var i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    //make all false
    if (completedTodos === totalTodos) {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
  }
};

var handlers = {
  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();
  },
  addItem: function () {
    var addTodoText = document.getElementById('addTodoText');
    todoList.addItem(addTodoText.value);
    addTodoText.value = '';
    view.displayTodos();
  },
  modifyItem: function () {
    var modifyTodoText = document.getElementById('modifyTodoText');
    var modifyTodoNumber = document.getElementById('modifyTodoNumber');
    todoList.modifyItem(modifyTodoNumber.valueAsNumber, modifyTodoText.value);
    modifyTodoText.value = '';
    modifyTodoNumber.value = '';
    view.displayTodos();
  },
  deleteItem: function () {
    var deleteTodoNumber = document.getElementById('deleteTodoNumber');
    todoList.delItem(deleteTodoNumber.valueAsNumber);
    deleteTodoNumber.value = '';
    view.displayTodos();
  },
  toggleCompleted: function () {
    var toggleTodoNumber = document.getElementById('toggleTodoNumber');
    todoList.toggleCompleted(toggleTodoNumber.valueAsNumber);
    toggleTodoNumber.value = '';
    view.displayTodos();
  }
};

var view = {
  displayTodos: function () { 
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    
    for (var i=0; i < todoList.todos.length; i++){
      var todosLi = document.createElement('li');
      var todo = todoList.todos[i];
      var todoTextWithCompletion = '';
      
      if (todo.completed === true){
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      
      todosLi.textContent = todoTextWithCompletion;
      todosUl.appendChild(todosLi);  
    }
  }
}