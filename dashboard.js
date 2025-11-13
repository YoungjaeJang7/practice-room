// =====================
// 🕒 시계 기능
// =====================
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString("ko-KR", { hour12: false });
  document.getElementById("clock").textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

// =====================
// 💬 명언
// =====================
const quotes = [
    "작은 습관이 큰 변화를 만든다.",
  "오늘의 노력은 내일의 나를 만든다.",
  "완벽보다 꾸준함이 더 중요하다.",
  "시작이 반이다.",
  "포기하지 마라, 지금이 가장 빠른 때다.",
  "실패는 새로운 시작이다",
  "계획 없는 목표는 그냥 바램에 불과하다",
  "네 자신을 믿어라",
  "성공은 준비된 사람을 만나게 된다",
  "끝은 어디서든 시작할 수 있다",
  "인생은 짧다",
  "생각이 힘이다",
  "목적 없는 삶은 허전하다",
  "변화는 생존의 법칙이다",
  "삶이 있는 한 희망은 있다"
];
document.getElementById("quote").textContent =
  quotes[Math.floor(Math.random() * quotes.length)];

// =====================
// ✅ To-Do 기능
// =====================
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

// 저장된 할 일 불러오기
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 할 일 렌더링
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>${todo}</span>
      <button class="btn btn-sm btn-outline-danger" data-index="${index}">
        <i class="bi bi-trash"></i>
      </button>
    `;
    todoList.appendChild(li);
  });
}
renderTodos();

// 할 일 추가
function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return;
  todos.push(text);
  localStorage.setItem("todos", JSON.stringify(todos));
  todoInput.value = "";
  renderTodos();
}
addTodoBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

// 할 일 삭제
todoList.addEventListener("click", (e) => {
  if (e.target.closest("button")) {
    const index = e.target.closest("button").dataset.index;
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }
});

// =====================
// 📝 메모 자동 저장
// =====================
const memo = document.getElementById("memo");

// 저장된 메모 불러오기
memo.value = localStorage.getItem("memo") || "";

// 메모가 입력될 때마다 저장
memo.addEventListener("input", () => {
  localStorage.setItem("memo", memo.value);
});
// 📅 달력 생성
function renderCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  // 요일 표시
  dayNames.forEach(day => {
    const div = document.createElement("div");
    div.textContent = day;
    div.className = "day-name";
    calendar.appendChild(div);
  });

  // 빈 칸 채우기
  for (let i = 0; i < firstDay.getDay(); i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }

  // 날짜 표시
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const div = document.createElement("div");
    div.textContent = i;

    if (
      i === now.getDate() &&
      month === now.getMonth() &&
      year === now.getFullYear()
    ) {
      div.classList.add("today");
    }

    calendar.appendChild(div);
  }
}
renderCalendar();