// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
	// DOM load event
	document.addEventListener('DOMContentLoaded', getTasks);
	// add task event
	form.addEventListener('submit', addTask);
	// remove task event
	taskList.addEventListener('click', removeTask);
	// clear all tasks event
	clearBtn.addEventListener('click', clearTasks);
	// filter tasks
	filter.addEventListener('keyup', filterTasks);
}

// get tasks from local storage
function getTasks(e) {
	let tasks;
	// check if local storage already has a list of 'tasks'
	// if it does, get and parse 'tasks' into JSON format, if not, then set tasks to empty array
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	// loop through the tasks that are there
	tasks.forEach((task) => {
		// create li element
		const li = document.createElement('li');
		// add class
		li.className = 'collection-item';  //materialize requires ul to have class 'collection', and li to have class 'collection-item'
		// create text node and append to li
		li.appendChild(document.createTextNode(task));
		// create new link element
		const link = document.createElement('a');
		// add class
		link.className = 'delete-item secondary-content';	//materialize requires class 'secondary-content' to show up next to a list item
		// add icon html
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// append link to li
		li.appendChild(link);
		// append li to ul
		taskList.appendChild(li);
	})
}

// add task function
function addTask(e) {
	if (taskInput.value === '') {
		alert('Add a task');
	} else {
		// create li element
		const li = document.createElement('li');
		// add class
		li.className = 'collection-item';  //materialize requires ul to have class 'collection', and li to have class 'collection-item'
		// create text node and append to li
		li.appendChild(document.createTextNode(taskInput.value));
		// create new link element
		const link = document.createElement('a');
		// add class
		link.className = 'delete-item secondary-content';	//materialize requires class 'secondary-content' to show up next to a list item
		// add icon html
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// append link to li
		li.appendChild(link);
		// append li to ul
		taskList.appendChild(li);

		// store in local storage
		storeTaskInLocalStorage(taskInput.value);

		// clear the input
		taskInput.value = '';
	}
	e.preventDefault();
}

// store task in local storage function
function storeTaskInLocalStorage(task) {
	let tasks;
	// check if local storage already has a list of 'tasks'
	// if it does, get and parse 'tasks' into JSON format, if not, then set tasks to empty array
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task function
function removeTask(e) {
	if (e.target.parentNode.classList.contains('delete-item')) {
		if (confirm('Are you sure?')) {
			e.target.parentNode.parentNode.remove();
			// remove from local storage
			removeTaskFromLocalStorage(e.target.parentNode.parentNode);
		}
	}
	// console.log(e.target.parentNode.parentNode);
}

// remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	// check if local storage already has a list of 'tasks'
	// if it does, get and parse 'tasks' into JSON format, if not, then set tasks to empty array
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach((task, index) => {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
	console.log(taskItem);
}

// clear tasks function
function clearTasks(e) {
	if (confirm('Are you sure?')) {
		while (taskList.firstChild) {
			taskList.removeChild(taskList.firstChild);
		}
		clearTasksFromLocalStorage();
	}
}
// clear all tasks from local storage
function clearTasksFromLocalStorage() {
	let tasks = [];
	localStorage.setItem('tasks', JSON.stringify(tasks));

}

// filter tasks function
function filterTasks(e) {
	const text = e.target.value.toLowerCase();	//store what is typed-in, into text

	// loop through the collection-item NodeList, and check if text in filter input matches any of the items
	document.querySelectorAll('.collection-item').forEach((task) => {
		const item = task.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {	//indexOf() returns position of first occurence of a specified value in a string
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	})
	console.log(text);
}

