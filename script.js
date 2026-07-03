const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {

    taskList.innerHTML = "";

    let filtered = tasks.filter(task => {

        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;

    });

    filtered.forEach((task, index) => {

        const li = document.createElement("li");

        li.className = task.completed ? "task completed" : "task";

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">

                <button class="complete">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="edit">
                    Edit
                </button>

                <button class="delete">
                    Delete
                </button>

            </div>
        `;

        li.querySelector(".complete").onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        };

        li.querySelector(".delete").onclick = () => {
            tasks.splice(index,1);
            saveTasks();
            renderTasks();
        };

        li.querySelector(".edit").onclick = () => {

            const updated = prompt("Edit Task", task.text);

            if(updated && updated.trim() !== ""){

                task.text = updated.trim();

                saveTasks();

                renderTasks();

            }

        };

        taskList.appendChild(li);

    });

}

addTaskBtn.onclick = () => {

    const text = taskInput.value.trim();

    if(text==="") return;

    tasks.push({

        text:text,

        completed:false

    });

    taskInput.value="";

    saveTasks();

    renderTasks();

};

filterButtons.forEach(button=>{

    button.onclick=()=>{

        filterButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        currentFilter=button.dataset.filter;

        renderTasks();

    };

});

renderTasks();