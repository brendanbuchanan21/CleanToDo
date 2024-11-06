// replace old display with new 
//close pop up and clear data entry in pop up
import { inboxDisplay } from "./displayTasks";
import { allTasks } from "./taskStorage";
export let isEditing = false;
export function setIsEditing(value) {
    isEditing = value;
}

export function getIsEditing() {
    return isEditing;
}


export function editTask() {
    let taskToEdit = null;
    let taskInProject = null;
    const taskContainer = document.querySelectorAll(".to-do-item");
    const saveTaskBtn = document.getElementById("save-to-do");
    const entryTaskOverlay = document.getElementById("to-do-pop-up-overlay");
    const entryTaskContainer = document.getElementById("to-do-pop-up");

    taskContainer.forEach((task) => {
        task.addEventListener("click", function(event) {
             // Set isEditing to true to indicate we're in edit mode
            setIsEditing(true);
            entryTaskOverlay.style.display = "flex";
            entryTaskContainer.style.display = "block";

            taskToEdit = null;
            taskInProject = null;
            //retrieve the task ID from the clicked task container
           const taskId = task.dataset.id;
           // find the task object in allTasks based on the taskId
            taskToEdit = allTasks.find(task => task.taskId === Number(taskId));

            
           // if the task is found, then populate the input
           if (taskToEdit) {
            // populate the popup with the task values 
            document.getElementById("to-do-title").value = taskToEdit.taskTitle;
            document.getElementById("to-do-description").value = taskToEdit.taskDescription;
            document.getElementById("to-do-project").value = taskToEdit.taskProject;
            document.getElementById("to-do-date").value = taskToEdit.taskDueDate;
            document.getElementById("to-do-priority").value = taskToEdit.taskPriority;
           }
          
        })
    })
     // SAVE UPDATED TASK
     saveTaskBtn.addEventListener("click", function() {
      // update the task objects values
      if (getIsEditing() && taskToEdit) {
          taskToEdit.taskTitle = document.getElementById("to-do-title").value;
          taskToEdit.taskDescription = document.getElementById("to-do-description").value;
          taskToEdit.taskProject =  document.getElementById("to-do-project").value;
          taskToEdit.taskDueDate = document.getElementById("to-do-date").value;
          taskToEdit.taskPriority = document.getElementById("to-do-priority").value;

          const taskElement = document.querySelector(`.to-do-item[data-id="${taskToEdit.taskId}"]`);
            // find the dom element and the remove from UI
            if (taskElement) {
               taskElement.remove();
            }
          // redisplay the allTasks
          inboxDisplay();
      // delete pop up values
            document.getElementById("to-do-title").value = "";
            document.getElementById("to-do-description").value = "";
            document.getElementById("to-do-project").value = "";
            document.getElementById("to-do-date").value = "";
            document.getElementById("to-do-priority").value = "";
      entryTaskOverlay.style.display = "none";
      entryTaskContainer.style.display = "none";

      setIsEditing(false);
        }
     })
}





/*
export function editTask() {
    let taskToEdit = null;
    const taskContainer = document.querySelectorAll(".to-do-item");
    const saveTaskBtn = document.getElementById("save-to-do");
    const entryTaskOverlay = document.getElementById("to-do-pop-up-overlay");
    const entryTaskContainer = document.getElementById("to-do-pop-up");

    taskContainer.forEach((task) => {
        task.addEventListener("click", function(event) {
             // Set isEditing to true to indicate we're in edit mode
            setIsEditing(true);
            // display entry area
            entryTaskOverlay.style.display = "flex";
            entryTaskContainer.style.display = "block";

            taskToEdit = null;
            //retrieve the task ID from the clicked task container
           const taskId = task.dataset.id;
           
           // find the task object in allTasks based on the taskId
            taskToEdit = allTasks.find(task => task.taskId === Number(taskId));

           // if the task is found, then populate the input
           if (taskToEdit) {
            // populate the popup with the task values 
            document.getElementById("to-do-title").value = taskToEdit.taskTitle;
            document.getElementById("to-do-description").value = taskToEdit.taskDescription;
            document.getElementById("to-do-project").value = taskToEdit.taskProject;
            document.getElementById("to-do-date").value = taskToEdit.taskDueDate;
            document.getElementById("to-do-priority").value = taskToEdit.taskPriority;
           }
          
        })
    })
     // SAVE UPDATED TASK
     saveTaskBtn.addEventListener("click", function() {
      // update the task objects values
      if (getIsEditing() && taskToEdit) {
          taskToEdit.taskTitle = document.getElementById("to-do-title").value;
          taskToEdit.taskDescription = document.getElementById("to-do-description").value;
          taskToEdit.taskProject =  document.getElementById("to-do-project").value;
          taskToEdit.taskDueDate = document.getElementById("to-do-date").value;
          taskToEdit.taskPriority = document.getElementById("to-do-priority").value;

          const taskElement = document.querySelector(`.to-do-item[data-id="${taskToEdit.taskId}"]`);
            // find the dom element and the remove from UI
            if (taskElement) {
               taskElement.remove();
            }
          // redisplay the allTasks
          inboxDisplay();
      // delete pop up values
            document.getElementById("to-do-title").value = "";
            document.getElementById("to-do-description").value = "";
            document.getElementById("to-do-project").value = "";
            document.getElementById("to-do-date").value = "";
            document.getElementById("to-do-priority").value = "";
      entryTaskOverlay.style.display = "none";
      entryTaskContainer.style.display = "none";

      setIsEditing(false);
        }
     })
}
     */