let showSearch = gete('.nav .search >span');
let searchBox = gete('.search .searchBox');

/**
 * 搜索板块当前显示状态
 */
let currentSearchStatus = false;

/**
 * 切换搜索框的显示状态
 */
const changeSearchStatus = () => {
    if (!currentSearchStatus) {
        setcss(searchBox, { display: 'block' })
        // 焦点
        gete('.searchOutside .search_input>div input').focus();
    } else {
        setcss(searchBox, { display: 'none' });
    }
    currentSearchStatus = !currentSearchStatus;
};

// 点击按钮显示搜索板块
showSearch.addEventListener('click', () => {
    changeSearchStatus();
});

// 监听键盘按下ctrl+m事件
document.addEventListener('keydown', (e) => {
    if (e.code == 'ControlLeft' && !e.repeat) {
        const downM = (e) => {
            if ((e.code == 'KeyM' && !e.repeat)) {
                changeSearchStatus();
                document.removeEventListener('keydown', downM)
            }
        };
        document.addEventListener('keydown', downM)
    }

    // 按下ESC改变状态
    if ((e.code == 'Escape' && !e.repeat)) {
        currentSearchStatus = false;
        setcss(searchBox, { display: 'none' })
    }
});

// 点击搜索板块空白部分改变状态
searchBox.addEventListener('click', function () {
    changeSearchStatus();
});

// 点击搜索板块内部内容禁止冒泡
let searchPage = gete('.searchBox .searchOutside');
searchPage.addEventListener('click', (e) => {
    e.stopPropagation();
})
searchPage.addEventListener('wheel', (e) => {
    e.stopPropagation();
})

let e = 0;
/* 鼠标经过搜索结果时切换类名 */
const resultLi = gete('.searchBox ul li');
if(resultLi) {
    for(let i = 0; i < resultLi.length;i++) {
        resultLi[i].addEventListener('mouseover', function() {
            if(!(this.classList == 'active')) {
                clearLiClass();
                setClass(this, 'active')
            }
        })
    }
}

/**
 * 移除所有li的active类
 */
const clearLiClass = ()=> {
    for(let i = 0; i < resultLi.length;i++) {
        removeClass(resultLi[i], 'active')
    }
};