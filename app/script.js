let todos = [];

function addTodo() {
    todos.push({
        title: document.getElementById("task-input").value,
        date: document.getElementById("date-input").value,
        time: document.getElementById("time-input").value,
        isEditing: false
    })
    render();
}

function deleteLastTodo() {
    todos.pop();
    render();
}

function deleteFirstTodo() {
    todos.splice(0, 1);
    render();
}

function deleteTodoAt(index) {
    todos.splice(index, 1);
    render();
}

function toggleEditTitle(index) {
    todos[index].isEditing = !todos[index].isEditing;
    render();
}

function saveTitle(index, newTitle) {
    todos[index].title = newTitle;
    todos[index].isEditing = false;
    render();
}

function createTodoComponets(todo, index) {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const date = document.createElement("span");
    const time = document.createElement("span");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    deleteButton.innerHTML = "Delete";
    deleteButton.setAttribute("onclick", "deleteTodoAt(" + index + ")");

    if(todo.isEditing) {
        const input = document.createElement("input");
        input.type = "text";
        input.value = todo.title;
        input.onkeydown = (event) => {
            if(event.key === 'Enter') {
                saveTitle(index, event.target.value);
            }
        };

        const saveButton = document.createElement("button");
        saveButton.innerHTML = "Save";
        saveButton.onclick = () => saveTitle(index, input.value);

        div.append(input, saveButton);
    }else {
        const h2 = document.createElement("h2");
        h2.innerHTML = (index + 1) + ". " + todo.title;
        
        const editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.setAttribute("onclick", "toggleEditTitle(" + index + ")");

        h2.appendChild(editButton);
        div.appendChild(h2);
    }

    const formattedDateTime = formatDateTime(todo.date, todo.time);
    date.innerHTML = formattedDateTime.split(",")[0];
    time.innerHTML = formattedDateTime.split(",")[1];

    div.append(h2);
    div.append(date);
    div.append(time);
    div.append(deleteButton);
    return div;
} 

function formatDateTime(date, time) {
    const dateObj = new Date(date + "T" + time);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return dateObj.toLocaleDateString(undefined, options);
}

function render() {
    document.querySelector("#todos").innerHTML = "";
    for (let i = 0; i < todos.length; i++) {
        const element = createTodoComponets(todos[i], i);
        document.querySelector("#todos").appendChild(element);
    }
    document.getElementById("task-input").value = "";
    document.getElementById("date-input").value = "";
    document.getElementById("time-input").value = "";
}