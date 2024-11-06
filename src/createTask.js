import { allTasks, taskCount } from "./taskStorage";
import { projectStorage } from "./taskStorage";
import { incrementTaskCount, getTaskCount } from "./taskStorage";
import { inboxDisplay } from "./displayTasks";
import { getIsEditing, setIsEditing } from "./editTask";
// CREATES AND SAVES TASK 
export function taskCreation() {
    
    //from DOM, popup entry necessesities 
    const newToDoBtn = document.getElementById("new-to-do-btn");
    const entryTaskOverlay = document.getElementById("to-do-pop-up-overlay");
    const entryTaskContainer = document.getElementById("to-do-pop-up");
    const closeTaskEntry = document.getElementById("close-pop-up")

    function populateProjectDropdown() {
        //clear the existing options in pop up 
        projectSelection.innerHTML = "";

        // create a default option for inbox
        const inboxOption = document.createElement("option");
        inboxOption.value = "inbox";
        inboxOption.textContent = "inbox";
        projectSelection.appendChild(inboxOption);

        //loop through projectStorage to create Options 
        for (const projectTitle in projectStorage) {
            const projectOption = document.createElement("option");
            projectOption.value = projectTitle;
            projectOption.textContent = projectTitle;
            projectSelection.appendChild(projectOption);
        }
    }
    //open the task entry pop up 
    newToDoBtn.addEventListener("click", function() {
        setIsEditing(false);
        populateProjectDropdown();
        entryTaskOverlay.style.display = "flex";
        entryTaskContainer.style.display = "block";
    });

    closeTaskEntry.addEventListener("click", function() {
       entryTaskOverlay.style.display = "none";
        entryTaskContainer.style.display = "none";
    })

    

    //get the input values from the pop up 
    const taskName = document.getElementById("to-do-title");
    const description = document.getElementById("to-do-description");
    const projectSelection = document.getElementById("to-do-project");
    const dueDate = document.getElementById("to-do-date");
    const priorityChoice = document.getElementById("to-do-priority");


    //SAVING THE TASK 
    const saveTaskBtn = document.getElementById("save-to-do");
    
        saveTaskBtn.addEventListener("click", function() {
            const taskNameVal = taskName.value;
            const descriptionVal = description.value;
            const projectSelectionVal = projectSelection.value;
            const dueDateVal = dueDate.value;
            const priorityChoiceVal = priorityChoice.value;
            //new task object?????
            if (!getIsEditing()) {
        const newTask = {
             taskId: Date.now(),
             taskTitle: taskNameVal,
             taskDescription: descriptionVal,
             taskProject: projectSelectionVal,
             taskDueDate: dueDateVal,
             taskPriority: priorityChoiceVal
            }

            incrementTaskCount();
           
            // STORING THE TASK IN PROJECT OR INBOX
        if (projectSelectionVal === "inbox") {
            allTasks.push(newTask);
             //display inbox
             inboxDisplay();
            
        } else {
            if (projectStorage[projectSelectionVal]) {
                projectStorage[projectSelectionVal].push(newTask);
                allTasks.push(newTask);
                console.log(`Task added to project: ${projectSelectionVal}`);
                console.log("added to all tasks", allTasks);
            } 
        }
        // delete pop up values
        taskName.value = "";
        description.value = "";
        projectSelection.value = "";
        dueDate.value = "";
        priorityChoice.value = "";

        // close the pop up 
        entryTaskOverlay.style.display = "none";
        entryTaskContainer.style.display = "none";

     
    }
    })
    
      

}









// export function editTask() {}

