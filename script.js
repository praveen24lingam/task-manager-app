let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingIndex = null;

/* -------- AUTH -------- */
function registerUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;

  if (!email || !pass || !name) return alert("Please fill all fields");

  localStorage.setItem("user", JSON.stringify({ name, email, pass }));
  localStorage.setItem("loggedIn", "true");

  showApp();
}

function showApp() {
  document.getElementById("auth-container").style.display = "none";
  document.getElementById("main-app").style.display = "block";
  renderTasks();
}

function logout() {
  localStorage.setItem("loggedIn", "false");
  location.reload();
}

if (localStorage.getItem("loggedIn") === "true") {
  showApp();
}

/* ------- TASK FUNCTIONS -------- */
function openPopup(index = null) {
  editingIndex = index;
  document.getElementById("popup").style.display = "flex";

  if (index !== null) {
    document.getElementById("task-title").value = tasks[index].title;
    document.getElementById("task-desc").value = tasks[index].desc;
  } else {
    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";
  }
}

function saveTask() {
  let title = document.getElementById("task-title").value;
  let desc = document.getElementById("task-desc").value;

  if (!title) return alert("Title cannot be empty");

  if (editingIndex !== null) {
    tasks[editingIndex].title = title;
    tasks[editingIndex].desc = desc;
  } else {
    tasks.push({ title, desc, status: "pending" });
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("popup").style.display = "none";
  renderTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function markComplete(i) {
  tasks[i].status = "completed";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

/* ---------- RENDER ---------- */
function renderTasks() {
  let pendingBox = document.getElementById("pending");
  let completeBox = document.getElementById("completed");

  pendingBox.innerHTML = "<h2>Pending Tasks</h2>";
  completeBox.innerHTML = "<h2>Completed Tasks</h2>";

  tasks.forEach((t, i) => {
    let box = t.status === "pending" ? pendingBox : completeBox;

    box.innerHTML += `
      <div class="task">
        <h3>#${i + 1} - ${t.title}</h3>
        <p>${t.desc}</p>

        <div class="task-buttons">
          <button class="edit-btn" onclick="openPopup(${i})">Edit</button>
          ${t.status === "pending" ? `<button class="complete-btn" onclick="markComplete(${i})">Complete</button>` : ""}
          <button class="delete-btn" onclick="deleteTask(${i})">Delete</button>
        </div>
      </div>
    `;
  });
}

