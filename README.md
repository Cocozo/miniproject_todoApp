# miniproject_todoApp

vanillaJS 로 구현해보는 todo list app

# 진행하면서 배운 것(JS)

## 이벤트 위임

하위에서 발생하는 이벤트에 대해 상위 컴포넌트가 처리할 수 있도록 만듬

``` javascript

const listClickHandler = (event) => {
    // 이벤트 델리게이션 -> 상위 에서 이벤트를 받아 아래로 내려줌
    // event.target에 이벤트를 받은 컴포넌트가 나옴
    // matches를 이용하여 확인
    if (event.target.matches(".todo-list > li > div > .delete-btn")) {
        //target.colsest 를 이용하여 상위 컴포넌트중 해당 셀렉터와 부합하는 가장 가까운 컴포넌트 호출
        const item = event.target.closest('li');
        deletetodo(item.id);
        drawlist();
    }
}

...

const onLoad = () => {
    ...
    // 실제로 클릭이 발생하는 컴포넌트 -> 버튼
    // 이벤트 등록하는 컴포넌트 -> ul(버튼이 속한 div가 속한 li가 속한 리스트)
    list.addEventListener("click", listClickHandler);
    ...
}
```


## 