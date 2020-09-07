let toDo;
if (localStorage.getItem("toDo") !== null) {
  toDo = localStorage.getItem("toDo");

  document.getElementById("todo").textContent = toDo;
} else {
  toDo = 0;
}

let done;
if (localStorage.getItem("done") !== null) {
  done = localStorage.getItem("done");
  console.log(done);
  document.getElementById("done").textContent = done;
} else {
  done = 0;
}

let doneArr = [];
let taskArr = [];
let id;
if (localStorage.getItem("tasks") !== null) {
  id = JSON.parse(localStorage.getItem("tasks")).length + 1;
  const storageTask = JSON.parse(localStorage.getItem("tasks"));
  storageTask.forEach((element) =>
    addTask(element.id, element.task, element.assignee)
  );
} else {
  id = 0;
}

document.getElementById("addButton").onclick = function () {
  const task = document.getElementById("taskText").value;
  const assignee = document.getElementById("assigneeText").value;
  taskArr.push({ id, task, assignee });
  window.localStorage.setItem("tasks", JSON.stringify(taskArr));
  id += 1;
  addTask(id, task, assignee);
  // reset input
  resetInput();
  //increment todo
  toDo = parseInt(toDo);
  toDo += 1;
  document.getElementById("todo").textContent = toDo;
  window.localStorage.setItem("toDo", toDo);
  window.localStorage.setItem("done", done);
};

function resetInput(){
  document.getElementById("taskText").value = "";
  document.getElementById("assigneeText").value = "";

}
function handleTaskDoneClick(event) {
  done = parseInt(done);
  toDo = parseInt(toDo);
  done += 1;
  toDo -= 1;

 
  if (doneArr.includes(event.parentNode.parentNode.id) === false) {
  
    doneArr.push(event.parentNode.parentNode.id);
    document.getElementById("done").textContent = done;
    document.getElementById("todo").textContent = toDo;
    event.style.color = "green";
  } else alert("you done this");
}

function deleteFun(y) {
  const confirmationAnswer = confirm("Are you sure Delete This Task ?");
  if (confirmationAnswer == true) {
    document.getElementById(y.parentNode.parentNode.id).remove();
    toDo -= 1;
    document.getElementById("done").textContent = done;
    document.getElementById("todo").textContent = toDo;
  } else {
    return;
  }
}

function searchFun() {
  const input = document.getElementById("search").value;
  const node = document.querySelectorAll(".task");
  for (let i = 0; i < node.length; i++) {
    let task = node[i].querySelector(".taskDemo").textContent;
    let assignee = node[i].querySelector(".assigneeDemo").textContent;
    if (task.indexOf(input) > -1 || assignee.indexOf(input) > -1) {
      node[i].style.display = "";
    } else {
      node[i].style.display = "none";
    }
  }
}

function addTask(id, task, assignee) {
  const node = document.querySelector("#parentTask"); 
  const newNode = document.getElementById("task").content.firstElementChild.cloneNode(true);
  newNode.id = id;
  node.appendChild(newNode);
  document.getElementById(id).querySelector(".taskDemo").innerText = task;
  document.getElementById(id).querySelector(".assigneeDemo").innerText = assignee;
}
