document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskDateTime = document.getElementById('task-datetime');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value, taskDateTime.value);
        taskInput.value = '';
        taskDateTime.value = '';
    });

    function addTask(taskText, taskDateTime) {
        const task = document.createElement('li');
        task.className = 'task';
        
        const taskContent = document.createElement('span');
        taskContent.textContent = `${taskText} (Due: ${new Date(taskDateTime).toLocaleString()})`;

        const taskButtons = document.createElement('div');
        taskButtons.className = 'task-buttons';

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            task.classList.toggle('completed');
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            const newTaskText = prompt('Edit task:', taskText);
            const newTaskDateTime = prompt('Edit due date and time (YYYY-MM-DDTHH:MM):', taskDateTime);
            if (newTaskText !== null && newTaskDateTime !== null) {
                taskContent.textContent = `${newTaskText} (Due: ${new Date(newTaskDateTime).toLocaleString()})`;
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            task.remove();
        });

        taskButtons.appendChild(completeButton);
        taskButtons.appendChild(editButton);
        taskButtons.appendChild(deleteButton);
        
        task.appendChild(taskContent);
        task.appendChild(taskButtons);

        taskList.appendChild(task);
    }
});
