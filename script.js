
const inputValue = document.getElementById("inputValue");
const btn = document.querySelector(".btn");
const mainsection = document.querySelector(".mainsection");

// Load previous data from localStorage
let toDoList = JSON.parse(localStorage.getItem("myToDoItems")) || [];

// Show existing data on page load
const showData = () => {
  toDoList.forEach(task => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("myTask");
    newDiv.innerHTML = `<li>${task}</li><button class="deletebtn">Delete</button>`;
    mainsection.append(newDiv);
  });
};

// Add new task
const toDoData = (e) => {
  e.preventDefault();
  const task = inputValue.value.trim();
  if (task === "") return;

  if (!toDoList.includes(task)) {
    toDoList.push(task);
    localStorage.setItem("myToDoItems", JSON.stringify(toDoList));

    const newDiv = document.createElement("div");
    newDiv.classList.add("myTask");
    newDiv.innerHTML = `<li>${task}</li><button class="deletebtn">Delete</button>`;
    mainsection.append(newDiv);  
  }
   
  inputValue.value = "";
};

// Delete task
const removetodoElem = (e) => {
  const toDoremove = e.target;
  if (!toDoremove.classList.contains("deletebtn")) return;

  const parentElem = toDoremove.parentElement;
  const taskText = toDoremove.previousElementSibling.textContent;

  // Remove from array
  toDoList = toDoList.filter(task => task.toLowerCase() !== taskText.toLowerCase());

  // Update localStorage
  localStorage.setItem("myToDoItems", JSON.stringify(toDoList));

  // Remove from DOM
  parentElem.remove();
};

// Event listeners
btn.addEventListener("click", toDoData);
mainsection.addEventListener("click", removetodoElem);
window.addEventListener("DOMContentLoaded", showData);
