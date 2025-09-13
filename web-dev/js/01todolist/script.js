document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []

    tasks.forEach((task) => renderTask(task));

    addTaskButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim()
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }
    
        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = "";
        console.log(tasks);
    })

    function renderTask(task){
        // console.log(task);
        const li = document.createElement('li');
        li.setAttribute("data-id",task.id);

        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
        <span>${task.text}</span>
        <button>Delete</button>
        `;
        li.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") return;
            task.completed = !task.completed; //!task will assign the reverse value of the task's original value
            li.classList.toggle("completed");
            saveTasks();

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();  //stop the bubbling phase (event going back up to dom phase), so that we could stop the toggle event from firing 
            tasks = tasks.filter((t) => t.id !== task.id);
            li.remove();
            saveTasks();
        })
        });
        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }


})