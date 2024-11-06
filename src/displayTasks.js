//this file should have a function that 
import { allTasks } from "./taskStorage";
import { getTaskCount } from "./taskStorage";
import { deleteTask } from "./deleteTask";
import { editTask } from "./editTask";
export function inboxDisplay() {
    // grab the main content area to prep display
    // create task elements based off of the alltasks storage
    
    
    //get necessary appending items
    const projectNameDOM = document.getElementById("project-name");
    const taskCountDOM = document.getElementById("to-dos-length");
    const toDoListDOM = document.getElementById("to-do-list");
    const mainDisplayContainerDOM = document.getElementById("main-todo-list-container");
    const headerContainerDOM = document.getElementById("header-container");

    // remove any prior tasks and project title 
   
    projectNameDOM.textContent = "inbox";
    toDoListDOM.innerHTML = "";

    taskCountDOM.textContent = `Tasks ${getTaskCount()}`;


    allTasks.forEach((task) => {
        // loop through the allTasks array to create each task
        const taskContainer = document.createElement("li");
        taskContainer.classList.add("to-do-item");
        taskContainer.dataset.id = task.taskId;
        
        const completeTaskBtn = document.createElement("button");
        completeTaskBtn.classList.add("complete-task-btn");
        completeTaskBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="black"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;
    
        const taskTitle = document.createElement("p");
        taskTitle.classList.add("to-do-title");
        taskTitle.textContent = task.taskTitle;

        const taskDate = document.createElement("p");
        taskDate.classList.add("to-do-date");
        taskDate.innerHTML = task.taskDueDate;

        const importanceBtn = document.createElement("button");
        importanceBtn.classList.add("importance-btn");
        
        importanceBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#777777"><path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;

        // Set the fill color based on priority
        let fillColor;
        switch (task.taskPriority) {
            case 'none':
                fillColor = "grey"; // Grey for 'none'
                break;
            case 'low':
                fillColor = "#A8EEA8";
                break;
            case 'medium':
                fillColor = "#F6BE00";
                break;
            case 'high':
                fillColor = "red";
                break;
            default:
                fillColor = "#777777"; // Default color
        }
    
        // Get the SVG path and set its fill color
        const svg = importanceBtn.querySelector('svg');
        svg.setAttribute('fill', fillColor);
        //append the items to the dom
        
        taskContainer.appendChild(completeTaskBtn);
        taskContainer.appendChild(taskTitle);
        taskContainer.appendChild(taskDate);
        taskContainer.appendChild(importanceBtn);
        toDoListDOM.appendChild(taskContainer);
       
    });
        
    deleteTask();
    editTask();
}
console.log(allTasks);