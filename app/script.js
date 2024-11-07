let todos = [];

function addTodo() {
    const title = document.getElementById("task-input").value;
    const date = document.getElementById("date-input").value;
    const time = document.getElementById("time-input").value;  

    if(title === '' || date === '' || time === '') {
        alert('Please enter a todo item.')
        return;
    }

    todos.push({
        title: title,
        date: date,
        time: time,
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
    const h3 = document.createElement("h3");
    const date = document.createElement("span");
    const time = document.createElement("span");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    div.setAttribute("class", 'todo-item');

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
        const h3 = document.createElement("h3");
        h3.innerHTML = (index + 1) + ". " + todo.title;
        
        const editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.setAttribute("onclick", "toggleEditTitle(" + index + ")");

        h3.appendChild(editButton);
        div.appendChild(h3);
    }

    const formattedDateTime = formatDateTime(todo.date, todo.time);
    date.innerHTML = formattedDateTime.split(",")[0];
    time.innerHTML = formattedDateTime.split(",")[1];

    div.append(h3);
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