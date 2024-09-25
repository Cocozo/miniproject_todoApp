# miniproject_todoApp

vanillaJS 로 구현해보는 todo list app

# 진행하면서 배운 것(JS)

## 이벤트 위임

``` javascript

하위에서 발생하는 이벤트에 대해 상위 컴포넌트가 처리할 수 있도록 만듬

const listClickHandler = (event) => {
    // 이벤트 델리게이션 -> 상위 에서 이벤트를 받아 아래로 내려줌
    if (event.target.matches(".todo-list > li > div > .delete-btn")) {
        const item = event.target.closest('li');
        deletetodo(item.id);
        drawlist();
    }
}

...

const onLoad = () => {
    ...
    list.addEventListener("click", listClickHandler);
    ...
}
```


## 