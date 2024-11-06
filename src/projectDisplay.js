import { allTasks, projectStorage } from "./taskStorage";
import { deleteProject } from "./deleteProject";
import { inboxDisplay } from "./displayTasks";
import { deleteTask } from "./deleteTask";
import { editTask } from "./editTask";
// be able to click the project on side bar
// and display its tasks from projectStorage

// for every projectTitle, display list of projects in side bar

/* inside of the for loop of each project title, 
create the necessary list item elements */
export function projectToSidebar() {
const projectsUl = document.querySelector(".projects-sidebar-list");

// clear project display for every new task that is added, so no duplicate display
projectsUl.innerHTML = "";


for (const projectTitle in projectStorage) {
    //create--or grab the necessary elements in sidebar
   
    const parentLiForProjectContainer = document.createElement("li");

    const projectSidebarContainer = document.createElement("div");
    projectSidebarContainer.classList.add("project-container");
    projectSidebarContainer.setAttribute("data-project-title", projectTitle);

    const projectSidebarBtn = document.createElement("button");
    projectSidebarBtn.classList.add("project-btn");
    projectSidebarBtn.type = "button";

    const projectSidebarTitle = document.createElement("span");
    projectSidebarTitle.textContent = projectTitle;

    const deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.classList.add("delete-task-btn");
    deleteProjectBtn.type = "button";

    deleteProjectBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#777777"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`

// now append the items to the display
projectsUl.appendChild(parentLiForProjectContainer);
parentLiForProjectContainer.appendChild(projectSidebarContainer);
projectSidebarContainer.appendChild(projectSidebarBtn);
projectSidebarBtn.appendChild(projectSidebarTitle);

projectSidebarContainer.appendChild(deleteProjectBtn);

projectSidebarBtn.addEventListener("click", () => {
    displayProjectTasks(projectTitle);
});
console.log("it stored!", projectStorage);
//call the function that deletes project and associated tasks
deleteProject();

}


}



export function displayProjectTasks(projectTitle) {
    // when i click on a project container it should 
    // remove the main display title and tasks
    // then display the storage of each projects associated tasks
    const projectTitleHeader = document.getElementById("project-name");
    projectTitleHeader.textContent = "";
    projectTitleHeader.textContent = projectTitle;

    const mainDisplayTaskList = document.getElementById("to-do-list");
    mainDisplayTaskList.innerHTML = "";

    // create the display for each task in associated project...
    // take projectStorage, filter throught the project title, a
    // and then display the projectTitles tasks

    //get the tasks for the selected project from projectStorage
    const projectTasks = projectStorage[projectTitle];

    if (projectTasks) {
    projectTasks.forEach(task => {
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
     mainDisplayTaskList.appendChild(taskContainer);
    
    })
}
 deleteTask();
 editTask();
}

// DISPLAY THE INBOX FROM SIDEBAR
export function inboxSidebarDisplay() {
    // get inbox sidebar element 
    // add event listener to it
    // then use inboxDisplay();
    const inboxBtn = document.getElementById("inbox-btn");
    inboxBtn.addEventListener("click", function() {
        //clear the title again
        //remove prior task list
        const projectTitleHeader = document.getElementById("project-name");
        projectTitleHeader.textContent = "";
        projectTitleHeader.textContent = "inbox";
        const mainDisplayTaskList = document.getElementById("to-do-list");
        mainDisplayTaskList.innerHTML = "";

        inboxDisplay();
        console.log(projectStorage);
    })
}


// create a function that allows the display of any tasks that have the dueDate of today..
// get elements necessary from side bar
// add event listener to the today button 
// inside of event listener, display all tasks with the barrier being todays date from allTasks
// remember to include editTask()
// also delete task as well

export function todayTaskDisplay() {
    const todayBtn = document.getElementById("today-btn");

    todayBtn.addEventListener("click", function() {
        const projectTitleHeader = document.getElementById("project-name");
        projectTitleHeader.textContent = "";
        projectTitleHeader.textContent = "Due Today";

        const mainDisplayTaskList = document.getElementById("to-do-list");
        mainDisplayTaskList.innerHTML = "";

        // if tasks date equals today, then display the tasks 
        const today = new Date();
        const formattedToday = today.toISOString().split("T")[0];

        const tasksDueToday = allTasks.filter(task => task.taskDueDate === formattedToday);

        if (tasksDueToday) {
            tasksDueToday.forEach(task => {
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
            mainDisplayTaskList.appendChild(taskContainer);
            deleteTask();
            editTask();
           })
       }
        })
     
    }

    export function upcomingTaskDisplay() {
        // same as todayTaskDisplay except for any date that is in the future
        const upcomingBtn = document.getElementById("upcoming-btn");
        upcomingBtn.addEventListener("click", function() {
            const projectTitleHeader = document.getElementById("project-name");
            projectTitleHeader.textContent = "";
            projectTitleHeader.textContent = "Upcoming Todos";
    
            const mainDisplayTaskList = document.getElementById("to-do-list");
            mainDisplayTaskList.innerHTML = "";

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const upcomingTasks = allTasks.filter(task => new Date(task.taskDueDate) > today);

            if (upcomingTasks) {
                upcomingTasks.forEach(task => {
                    // Create each task element and its components
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
    
                    importanceBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#777777"><path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-320Z"/></svg>`;
    
                    // Set fill color based on priority
                    let fillColor;
                    switch (task.taskPriority) {
                        case 'none':
                            fillColor = "grey";
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
                            fillColor = "#777777";
                    }
    
                    const svg = importanceBtn.querySelector('svg');
                    svg.setAttribute('fill', fillColor);
    
                    // Append items to DOM
                    taskContainer.appendChild(completeTaskBtn);
                    taskContainer.appendChild(taskTitle);
                    taskContainer.appendChild(taskDate);
                    taskContainer.appendChild(importanceBtn);
                    mainDisplayTaskList.appendChild(taskContainer);
                });
    
                // Attach delete and edit functionality after rendering tasks
                deleteTask();
                editTask();
            }
        })
    }

