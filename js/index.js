var todoList = {
  todos: [],
  //logic
  
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

// the button handlers
var handlers = {
  //toggle all button
  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();
  },

  //add item button
  addItem: function () {
    var addTodoText = document.getElementById('addTodoText');
    todoList.addItem(addTodoText.value);
    addTodoText.value = '';
    view.displayTodos();
  },

  //modify button
  modifyItem: function () {
    var modifyTodoText = document.getElementById('modifyTodoText');
    var modifyTodoNumber = document.getElementById('modifyTodoNumber');
    todoList.modifyItem(modifyTodoNumber.valueAsNumber, modifyTodoText.value);
    modifyTodoText.value = '';
    modifyTodoNumber.value = '';
    view.displayTodos();
  },

  //delete button
  deleteItem: function (position) {
    todoList.delItem(position);
    view.displayTodos();
  },

  //toggle completed button
  toggleCompleted: function () {
    var toggleTodoNumber = document.getElementById('toggleTodoNumber');
    todoList.toggleCompleted(toggleTodoNumber.valueAsNumber);
    toggleTodoNumber.value = '';
    view.displayTodos();
  }
};

//the view will display the list after each interaction.
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

      todosLi.id = i;
      todosLi.textContent = todoTextWithCompletion;
      todosLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todosLi);  
    }
  },
  createDeleteButton: function () {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function () {
    debugger;
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function (event) {
      // get the element that was clicked.
      var elementClicked = event.target;

      //check if element clicked is a delete buttton.
      if (elementClicked.className === 'deleteButton'){
      //run handlers. deleteItem(position)
      handlers.deleteItem(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();

