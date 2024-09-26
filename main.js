//todolist app 만들기 - 초미니 프로젝트

// 09-25 해야할 일  - 각 기능을 mvc 패턴에 맞게 재설계

const input = document.querySelector(".todo-input");
const list = document.querySelector(".todo-list");
// 간단한 할일 json 형식으로 받기

function Todo(context, position) {
  this.context = context;
  this.position = position;
}


let storage = []

let listObserver = new MutationObserver((mutations) => {
    
})

//리스트 삭제
const deleteTodo = (index) => {
    storage.splice(index, 1);
}

//리스트 추가
// 추가하는 데이터 -> Todoobject
const addTodo = (context) => {
    let todoObject = new Todo(context, storage.length)
    storage.push(todoObject);
}

//리스트 업데이트
const updateTodo = (context, index) => {
    storage[index].context = context;
}

const updateTodoPosition = (position, index) => {
    
    if(index > position) {
        storage.forEach((value) => {
            if(value.position >= position && value.position < index) value.position += 1
        });
    }
    else if (index < position) {
        storage.forEach((value) => {
            if (value.position > index && value.position <= position) value.position -= 1;
        });
        console.log("a")
    }
    storage[index].position = position;
};
// 임시 저장소 -> model.js 로 이주예정

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
    
    storage.sort((a, b) => {
        return a.position - b.position;
    });

    storage.forEach((context, index) => {
        list.innerHTML += createListItem({context, index});
    });

    list.querySelectorAll(".item").forEach(item => {
        item.addEventListener('dragstart', () => {
            setTimeout(() => item.classList.add("dragging"), 0);
        });

        item.addEventListener("dragend", (event) => {
            const items = [...list.querySelectorAll(".item")]
            console.log(items.findIndex(value => value.classList.contains('dragging')));
            updateTodoPosition(position =  items.findIndex(value => value.classList.contains('dragging')), index = event.target.id)
            // console.log(storage[items.findIndex(value => value.classList.contains('dragging'))].position)
            item.classList.remove("dragging");
            drawlist();
        });

    });
    _checkList();
}

// 리스트 아이템
const createListItem = ({ context, index }) => `
<li class="item" id ="${index}" draggable="true">
    <div class="list-item">
        <label class="to-label">${context.context}</label>
        <button class="delete-btn">X</button>
    </div>
</li>
`;

const initSortableList = (event) => {
    event.preventDefault();
    const target = document.querySelector(".dragging");

    let siblings = [...list.querySelectorAll(".item:not(.dragging)")];

    let nextSibling = siblings.find((sibling) => {
      return event.clientY + window.scrollY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });    
    list.insertBefore(target, nextSibling);
};

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
        inputText.value = storage[item.id].context;
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
    list.addEventListener("dragover", initSortableList);
    list.addEventListener("dragenter", event => event.preventDefault());
    
    _checkList();
}

window.addEventListener('load', onLoad)