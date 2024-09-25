//todolist app 만들기 - 초미니 프로젝트

const input = document.querySelector(".todo-input");
const list = document.querySelector(".todo-list");
// 간단한 할일 json 형식으로 받기

let storage = []

let listObserver = new MutationObserver((mutations) => {
    
})

//리스트 삭제
const deleteTodo = (index) => {
    storage.splice(index, 1);
}

//리스트 추가
const addTodo = (context) => {
    storage.push(context);
}

//리스트 업데이트
const updateTodo = (context, index) => {
    storage[index] = context
}

// 리스트 가 비어있는지 확인 후, 리스트 숨김처리
const _checkList = () => {
    // console.log(list.children.length);
    if(list.children.length === 0) {
        list.classList.add("hide");
    }
    else {
        list.classList.remove("hide");
    }
}

//리스트 draw
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

// 엔터키에 따른 이벤트 헨들러
const inputEventHandler = (event) => {
    if(event.key == "Enter") {
        addTodo(input.value);
        input.value = ''
        drawlist();
    }

}

const listClickHandler = (event) => {
    // 이벤트 델리게이션 -> 상위 에서 이벤트를 받아 아래로 내려줌
    if (event.target.matches(".todo-list > li > div > .delete-btn")) {
        const item = event.target.closest('li');
        deleteTodo(item.id);
        drawlist();
    }
}

// 더블클릭시 인풋텍스트필드가 생성되는 이벤트 처리 
const doubleClickEventHandler = (event) => {
    const item = event.target.closest('li');
    if(item){
        // console.log(item.id)
        const inputText = document.createElement("input");
        inputText.value = storage[item.id];
        item.innerHTML = ''
        item.appendChild(inputText);
        inputText.classList.add("edit-input");
        inputText.focus()

        // blur, keypress 이벤트 등록 - id를 사용해야하므로 콜백으로 등록
        inputText.addEventListener("keypress", (event) => {
          if (event.key == "Enter") {
            updateTodo(inputText.value, item.id);
            drawlist();
          }
        });

        inputText.addEventListener("blur", (event) => {
          updateTodo(inputText.value, item.id);
          drawlist();
        });
    }
    
}


const onLoad = () => {
    input.addEventListener("keypress", inputEventHandler);
    list.addEventListener("click", listClickHandler);
    list.addEventListener("dblclick", doubleClickEventHandler);
    _checkList();
}

window.addEventListener('load', onLoad)