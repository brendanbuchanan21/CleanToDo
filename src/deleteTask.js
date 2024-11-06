import { allTasks, decrementTaskCount, taskCount } from "./taskStorage";
import { projectStorage } from "./taskStorage";
import { inboxDisplay } from "./displayTasks";
// lets do a delete task function 
// the complete task button will remove the element from array and display

export function deleteTask() {
// get necessary elements from the DOM
// add event listener
// search for the id 
// remove task from array 
// remove task from the UI 
//update task counter
const completeTaskBtns = document.querySelectorAll(".complete-task-btn");

completeTaskBtns.forEach((btn) => {
btn.addEventListener("click", function(event) {
    event.stopPropagation();
    const taskContainer = btn.closest(".to-do-item"); // Get the closest task container
    const taskIdToDelete = Number(taskContainer.dataset.id); // Retrieve the taskId

    // Remove the task from allTasks
    allTasks.splice(allTasks.findIndex(task => task.taskId === taskIdToDelete), 1);

    deleteTaskFromProject(taskIdToDelete);
    
    

    // Optionally, also remove the task from the DOM
    taskContainer.remove(); 
    decrementTaskCount();
   // when the item taks is removed redisplay the entire UI
    inboxDisplay();
})
})
}

function deleteTaskFromProject(taskIdToDelete) {
    // Loop over each project in projectStorage to find the task
    for (const projectTitle in projectStorage) {
        const projectTasks = projectStorage[projectTitle];

        // Find the index of the task in the project array
        const taskIndex = projectTasks.findIndex(task => task.taskId === taskIdToDelete);

        // If task found, remove it
        if (taskIndex !== -1) {
            projectTasks.splice(taskIndex, 1); // Remove the task from the array
            console.log(`Task with ID ${taskIdToDelete} deleted from project "${projectTitle}"`);
            break; // Exit once the task is found and deleted
        }
    }
}



