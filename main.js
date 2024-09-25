//todolist app 만들기 - 초미니 프로젝트

const input = document.querySelector(".todo-input");
const list = document.querySelector(".todo-list");
const deleteButton = document.querySelector(".delete-btn");

// 간단한 할일 json 형식으로 받기

let storage = []

let listObserver = new MutationObserver((mutations) => {
    
})

//리스트 삭제
const deletetodo = (index) => {
    storage.splice(index, 1);
}

const addtodo = (context) => {
    storage.push(context);
}

const _checkList = () => {
    console.log(list.children.length);
    if(list.children.length === 0) {
        list.classList.add("hide");
    }
    else {
        list.classList.remove("hide");
    }
}


const drawlist = () => {
    list.innerHTML = "";
    
    storage.forEach((context, index) => {
        list.innerHTML += createListItem({context, index});
    })

    _checkList();
}

// 리스트 아이템
const createListItem = ({ context, index }) => `
<li class="" id ="${index}">
    <div class="list-item">
        <label class="to-label">${context}</label>
        <button class="delete-btn">X</button>
    </div>
</li>
`;

const inputEventHandler = (event) => {
    if(event.key == "Enter") {
        addtodo(input.value);
        drawlist();
    }

}

const listClickHandler = (event) => {
    if (event.target.matches(".todo-list > li > div > .delete-btn")) {
        const item = event.target.closest('li');
        deletetodo(item.id);
        drawlist();
    }
}


const onLoad = () => {
    input.addEventListener("keypress", inputEventHandler);
    list.addEventListener("click", listClickHandler);
    _checkList();
}

window.addEventListener('load', onLoad)