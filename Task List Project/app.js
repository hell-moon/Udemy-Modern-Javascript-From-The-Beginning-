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
	// add task event
	form.addEventListener('submit', addTask);
	// remove task event
	taskList.addEventListener('click', removeTask);
	// clear all tasks event
	clearBtn.addEventListener('click', clearTasks);
	// filter tasks
	filter.addEventListener('keyup', filterTasks);
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
		// clear the input
		taskInput.value = '';
	}
	e.preventDefault();
}

// remove task function
function removeTask(e) {
	if (e.target.parentNode.classList.contains('delete-item')) {
		if (confirm('Are you sure?')) {
			e.target.parentNode.parentNode.remove();
		}
	}
	// console.log(e.target.parentNode.parentNode);
}

// clear tasks function
function clearTasks(e) {
	if (confirm('Are you sure?')) {
		while (taskList.firstChild) {
			taskList.removeChild(taskList.firstChild);
		}
	}
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

