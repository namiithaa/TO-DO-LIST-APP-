// Selecting DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from local storage when page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add event listener to the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
    const task = taskInput.value.trim();

    if (task !== "") {
        const li = document.createElement('li');
        li.textContent = task;

        // Create a delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        li.appendChild(deleteBtn);

        // Add the task to the task list
        taskList.appendChild(li);

        // Store task in local storage
        storeTaskInLocalStorage(task);

        // Clear the input field
        taskInput.value = '';

        // Add event listener to the delete button
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(li.textContent);
        });
    }
}

// Function to load tasks from local storage
function loadTasks() {
    let tasks = getTasksFromLocalStorage();

    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.textContent = task;

        // Create a delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        li.appendChild(deleteBtn);

        // Add the task to the task list
        taskList.appendChild(li);

        // Add event listener to the delete button
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(li.textContent);
        });
    });
}

// Function to store task in local storage
function storeTaskInLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to get tasks from local storage
function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

// Function to remove task from local storage
function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(function(t) {
        return t !== task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}