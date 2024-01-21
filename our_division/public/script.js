const tabsBox = document.querySelector(".tabs-box"),
allTabs = document.querySelectorAll(".tab"),   
arrowIcons = document.querySelectorAll(".icon i");

let isDragging = false; 

const handleIcons = () => {
    let scrollVal = Math.round(tabsBox.scrollLeft);
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal > 0 ? "flex" : "none";   
    arrowIcons[1].parentElement.style.display = maxScrollableWidth > scrollVal ? "flex" : "none";   

}
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        tabsBox.scrollLeft += icon.id === "left" ? -350 : 350;
        setTimeout(() => handleIcons(), 50);
    });
});
allTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabsBox.querySelector(".active").classList.remove("active");
        tab.classList.add("active");
    });
});

const dragging = (e) => {
    console.log("dragging"); 
     if(!isDragging) return; // if not dragging, do nothing
     tabsBox.classList.add("dragging"); // add grabbing cursor
    tabsBox.scrollLeft -= e.movementX; 
}

const dragstop = () => {
    isDragging = false; // stop dragging
    tabsBox.classList.remove("dragging");
}

tabsBox.addEventListener("mousedown", () => isDragging = true);
tabsBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragstop);  


