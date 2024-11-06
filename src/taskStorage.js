export let allTasks = [];
export let projectStorage = {};
export let taskCount = 0;
let todayTasks = [];
let upcomingTasks = [];

export function incrementTaskCount() {
    taskCount++;
}

export function decrementTaskCount() {
    taskCount--;
}

export function getTaskCount() {
    return taskCount;
}


