var ToDoList = /** @class */ (function () {
    function ToDoList() {
        this.tasks = [];
        this.editTaskId = null;
        this.loadTasks();
        this.displayTasks();
    }
    ToDoList.prototype.addOrEditTask = function () {
        var _this = this;
        var title = document.getElementById('title').value;
        var state = document.getElementById('state').value;
        var startDate = document.getElementById('startDate').value;
        var endDate = document.getElementById('endDate').value;
        if (!title || !state || !startDate || !endDate) {
            alert('Please fill in all fields.');
            return;
        }
        if (this.editTaskId !== null) {
            var taskIndex = this.tasks.findIndex(function (task) { return task.id === _this.editTaskId; });
            if (taskIndex !== -1) {
                this.tasks[taskIndex] = { id: this.editTaskId, title: title, state: state, startDate: startDate, endDate: endDate };
            }
            this.editTaskId = null;
            document.getElementById('addOrEditButton').textContent = 'Add Task';
        }
        else {
            var newTask = {
                id: this.tasks.length + 1,
                title: title,
                state: state,
                startDate: startDate,
                endDate: endDate
            };
            this.tasks.push(newTask);
        }
        this.saveTasks();
        this.displayTasks();
        document.getElementById('taskForm').reset();
    };
    ToDoList.prototype.editTask = function (id) {
        var task = this.tasks.find(function (task) { return task.id === id; });
        if (task) {
            document.getElementById('title').value = task.title;
            document.getElementById('state').value = task.state;
            document.getElementById('startDate').value = task.startDate;
            document.getElementById('endDate').value = task.endDate;
            this.editTaskId = id;
            document.getElementById('addOrEditButton').textContent = 'Edit Task';
        }
    };
    ToDoList.prototype.deleteTask = function (id) {
        this.tasks = this.tasks.filter(function (task) { return task.id !== id; });
        this.saveTasks();
        this.displayTasks();
    };
    ToDoList.prototype.displayTasks = function () {
        var _this = this;
        var taskListDiv = document.getElementById('taskList');
        if (taskListDiv) {
            taskListDiv.innerHTML = '';
            this.tasks.forEach(function (task) {
                var cardDiv = document.createElement('div');
                cardDiv.className = 'card mt-3';
                var cardBody = document.createElement('div');
                cardBody.className = 'card-body';
                var cardTitle = document.createElement('h5');
                cardTitle.className = 'card-title';
                cardTitle.textContent = task.title;
                var cardText = document.createElement('p');
                cardText.className = 'card-text';
                cardText.textContent = "ID: ".concat(task.id, " - State: ").concat(task.state, " - Start: ").concat(task.startDate, " - End: ").concat(task.endDate);
                var editButton = document.createElement('button');
                editButton.className = 'btn btn-warning mr-2';
                editButton.textContent = 'Edit';
                editButton.onclick = function () { return _this.editTask(task.id); };
                var deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-danger';
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function () { return _this.deleteTask(task.id); };
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
                cardBody.appendChild(editButton);
                cardBody.appendChild(deleteButton);
                cardDiv.appendChild(cardBody);
                taskListDiv.appendChild(cardDiv);
            });
        }
        else {
            console.error('Task list element not found!');
        }
    };
    ToDoList.prototype.saveTasks = function () {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    };
    ToDoList.prototype.loadTasks = function () {
        var tasks = localStorage.getItem('tasks');
        if (tasks) {
            this.tasks = JSON.parse(tasks);
        }
    };
    return ToDoList;
}());
var toDoList = new ToDoList();
