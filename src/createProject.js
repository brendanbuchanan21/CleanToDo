import { projectToSidebar } from "./projectDisplay";
import { allTasks } from "./taskStorage";
import { projectStorage } from "./taskStorage";
// get side bar add project button from DOM
// add event listener to add project button
// once clicked, display project pop up 
// get necessary elements from DOM in popup & sidebar
// take project name value
// add event listener to the addnewproject button 
// projectName gets stored in projectTasks
// display the project in side bar 
// allow for click of project in sidebar
// allow for delete of project in display and storage
// display the associated projects task in main display 

export function createProject() {
    // DOM POP UP VALUES 
    const newProjectBtn = document.getElementById("add-new-project-btn");
    const projectEntryOverlay = document.getElementById("project-pop-up-overlay");
    const projectEntry = document.getElementById("project-pop-up");
    const newProjectInput = document.getElementById("project-title-input");
    const deleteProjectEntryBtn = document.getElementById("delete-new-project");
    const submitNewProjectBtn = document.getElementById("submit-new-project");

    newProjectBtn.addEventListener("click", function() {
        projectEntryOverlay.style.display = "flex";
        projectEntry.style.display = "flex";
    })

    //event listener to close projectPOPUP
    deleteProjectEntryBtn.addEventListener("click", function() {
        projectEntryOverlay.style.display = "none";
        projectEntry.style.display = "none";
        newProjectInput.value = "";
    })

    
    
    //event listener to submit new project
    submitNewProjectBtn.addEventListener("click", function() {
        // inside of the save, we need to put the input value 
        // into the projectStorage object
        const projectTitle = newProjectInput.value;
        
        //check if project already exists 
       if (!projectStorage[projectTitle]) {
        projectStorage[projectTitle] = [];
       } else {
        alert("Project already exists. Please choose another name");
       }
       newProjectInput.value = "";

       projectEntryOverlay.style.display = "none";
       projectEntry.style.display = "none";

       console.log("wtf is going on here", projectStorage);
       // CALL THE DISPLAY OF STORED PROJECT
       projectToSidebar();
       
    })

//call projectDisplay when the submit button is pressed 








}
