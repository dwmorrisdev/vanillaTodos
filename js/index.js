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
    this.todos.forEach(function (todo) {
      if(todo.completed === true){
        completedTodos++
      }
    });

    this.todos.forEach(function (todo) {
      //case 1: if everything is true, make all false
      if (completedTodos === totalTodos){
        todo.completed = false;
      //case 2: otherwise, make everything true  
      } else {
        todo.completed = true;
      }
    });
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
    var addTodoText = document.getElementById('main-input');
    todoList.addItem(addTodoText.value);
    addTodoText.value = '';
    view.displayTodos();
  },

  //modify button
  modifyItem: function (position, newText){
      todoList.modifyItem(position, newText);
      newText.value = '';
      view.displayTodos();
  },

  //delete button
  deleteItem: function (position) {
    todoList.delItem(position);
    view.displayTodos();
  },

  //toggle completed button
  toggleCompleted: function (position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  }
};

//the view will display the list after each interaction.
var view = {
  displayTodos: function () { 
    var todosUl = document.getElementById('list');
    todosUl.innerHTML = '';
    
    if(todoList.todos.length > 0 ){
      //styles added when list is generated.
      todosUl.style.visibility = 'visible';
      todosUl.style.background = 'rgba(225,225,225,.8)';
      todosUl.style.padding = '30px 5px 30px 5px';
      todosUl.style.borderRadius = '3px';
    } else {
      todosUl.style.visibility = 'hidden';  
    }

    todoList.todos.forEach(function (todo, position) {
      var todosLi = document.createElement('li');
      var todoTextWithCompletion = '';
      
      if (todo.completed === true){
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }

      todosLi.id = position;
      todosLi.textContent = todoTextWithCompletion;

      todosLi.appendChild(this.createDeleteButton());
      todosLi.appendChild(this.createModifyButton());
      todosLi.appendChild(this.createCompletedButton());
      
      todosUl.appendChild(todosLi); 
    }, this);
  },
  createDeleteButton: function () {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton btn btn-danger';
    deleteButton.title = 'delete';
    return deleteButton;
  },
  createModifyButton: function () {
    var modifyButton = document.createElement('button');
    modifyButton.textContent = 'Modify';
    modifyButton.className = 'modifyButton btn btn-default';
    modifyButton.title = 'modify';
    return modifyButton;
  },
  createCompletedButton: function () {
    var completedButton = document.createElement('button');
    completedButton.textContent = 'Completed';
    completedButton.className = 'completedButton btn btn-success';
    completedButton.title = 'completed';
    return completedButton;
  },
  setUpEventListeners: function () {
    var todosUl = document.getElementById('list');

    todosUl.addEventListener('click', function (event) {
      // get the element that was clicked.
     
      var elementClicked = event.target;

      //check if element clicked is a delete buttton.
      if (elementClicked.title === 'delete'){
        handlers.deleteItem(parseInt(elementClicked.parentNode.id));
        console.log('delete handler ran');
      } else if (elementClicked.title === 'modify'){
        handlers.modifyItem(parseInt(elementClicked.parentNode.id), document.getElementById('main-input').value);
        console.log('modify handler ran');
        document.getElementById('main-input').value = '';
      } else if (elementClicked.title === 'completed'){
        handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
        console.log('completed handler ran');
      } else {
        console.log('handler did not run');
      }
    });
  }
};

view.setUpEventListeners();



