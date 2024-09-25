//todolist app 만들기 - 초미니 프로젝트

const input = document.querySelector(".todo-input");
const list = document.querySelector(".todo-list");

// 간단한 할일 json 형식으로 받기

let storage = [];

let listObserver = new MutationObserver((mutations) => {});

const _checkList = () => {
  console.log(list.children.length);
  if (list.children.length === 0) {
    list.classList.add("hide");
  } else {
    list.classList.remove("hide");
  }
};

const create = (event) => {
  if (event.key == "Enter") {
    const li = document.createElement("li");
    li.setAttribute("class", "");

    const div = document.createElement("div");
    div.setAttribute("class", "list-item");

    const label = document.createElement("label");
    label.setAttribute("class", "to-label");
    label.innerHTML = input.value;

    const button = document.createElement("button");
    button.setAttribute("class", "btn");
    button.innerHTML = "X";

    div.appendChild(label);
    div.appendChild(button);
    li.appendChild(div);

    // const list = document.querySelector(".todo-list");
    list.appendChild(li);

    input.value = "";
    input.focus();
    _checkList();
  }
};
