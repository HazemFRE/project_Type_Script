interface Task {
    id: number;
    title: string;
    state: string;
    startDate: string;
    endDate: string;
}

class ToDoList {
    tasks: Task[] = [];
    editTaskId: number | null = null;

    constructor() {
        this.loadTasks();
        this.displayTasks();
    }

    addOrEditTask(): void {
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const state = (document.getElementById('state') as HTMLInputElement).value;
        const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
        const endDate = (document.getElementById('endDate') as HTMLInputElement).value;

        if (!title || !state || !startDate || !endDate) {
            alert('Please fill in all fields.');
            return;
        }

        if (this.editTaskId !== null) {
            const taskIndex = this.tasks.findIndex(task => task.id === this.editTaskId);
            if (taskIndex !== -1) {
                this.tasks[taskIndex] = { id: this.editTaskId, title, state, startDate, endDate };
            }
            this.editTaskId = null;
            document.getElementById('addOrEditButton')!.textContent = 'Add Task';
        } else {
            const newTask: Task = {
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
        (document.getElementById('taskForm') as HTMLFormElement).reset();
    }

    editTask(id: number): void {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            (document.getElementById('title') as HTMLInputElement).value = task.title;
            (document.getElementById('state') as HTMLInputElement).value = task.state;
            (document.getElementById('startDate') as HTMLInputElement).value = task.startDate;
            (document.getElementById('endDate') as HTMLInputElement).value = task.endDate;
            this.editTaskId = id;
            document.getElementById('addOrEditButton')!.textContent = 'Edit Task';
        }
    }

    deleteTask(id: number): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.displayTasks();
    }

    displayTasks(): void {
        const taskListDiv = document.getElementById('taskList');
        if (taskListDiv) {
            taskListDiv.innerHTML = '';
            this.tasks.forEach(task => {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'card mt-3';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const cardTitle = document.createElement('h5');
                cardTitle.className = 'card-title';
                cardTitle.textContent = task.title;

                const cardText = document.createElement('p');
                cardText.className = 'card-text';
                cardText.textContent = `ID: ${task.id} - State: ${task.state} - Start: ${task.startDate} - End: ${task.endDate}`;

                const editButton = document.createElement('button');
                editButton.className = 'btn btn-warning mr-2';
                editButton.textContent = 'Edit';
                editButton.onclick = () => this.editTask(task.id);

                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-danger';
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => this.deleteTask(task.id);

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
                cardBody.appendChild(editButton);
                cardBody.appendChild(deleteButton);
                cardDiv.appendChild(cardBody);
                taskListDiv.appendChild(cardDiv);
            });
        } else {
            console.error('Task list element not found!');
        }
    }

    saveTasks(): void {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks(): void {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            this.tasks = JSON.parse(tasks);
        }
    }
}

const toDoList = new ToDoList();
