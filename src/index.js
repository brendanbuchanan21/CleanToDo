import sidebarAction from './toggle'
import './styles.css';
import './maincontent.css';
import './popuptask.css';
import { taskCreation } from './createTask';
import { inboxDisplay } from './displayTasks';
import { deleteTask } from './deleteTask';
import { editTask } from './editTask';
import { createProject } from './createProject';
import { inboxSidebarDisplay, projectToSidebar, todayTaskDisplay, upcomingTaskDisplay } from './projectDisplay';
import { deleteProject } from './deleteProject';
sidebarAction();
taskCreation();
inboxDisplay();
deleteTask();
editTask();
createProject();
projectToSidebar();
deleteProject();
inboxSidebarDisplay();
todayTaskDisplay();
upcomingTaskDisplay();

