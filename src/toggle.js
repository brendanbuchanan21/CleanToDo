// encaspulate all toggle function into a function


function sidebarAction() {

    //grab all items needed for total task
    const sidebar = document.getElementById("sidebar");
    const sidebarOpenBtn = document.getElementById("sidebar-open-btn");
    const sidebarCloseBtn = document.getElementById("sidebar-close-btn");

    //create a close function 
    const closeSideBar = () => {
        //collapse the sidebar
        sidebar.style.width = "0";
        //show the open button 
        sidebarOpenBtn.style.display = "flex";
    };

    //create an open function 
    const openSidebar = () => {
        //open the sidebar
        sidebar.style.width = "300px";
        //hide the open sidebar button
        sidebarOpenBtn.style.display = "none";
    };

    //event listeners for the buttons
    sidebarOpenBtn.addEventListener("click", openSidebar);
    sidebarCloseBtn.addEventListener("click", closeSideBar);
};

export default sidebarAction;
