// make it so every project delete button is accessible
/* when click on button, it deletes the project, and its associate
tasks from the taskStorage */
import { projectStorage } from "./taskStorage";

export function deleteProject() {
    const project = document.querySelectorAll(".list-item-project");
    const deleteProjectBtn = document.querySelectorAll(".delete-task-btn")

   deleteProjectBtn.forEach((btn) => {
    btn.addEventListener("click", function() {
        const projectContainer = btn.closest(".project-container");
        const projectTitle = projectContainer.getAttribute("data-project-title"); // not found
        
        if (projectTitle && projectStorage[projectTitle]) {

            delete projectStorage[projectTitle];
            console.log(`Deleted project: ${projectTitle}`);
            console.log(projectStorage);

            projectContainer.parentElement.remove();
        }
   })

})


}