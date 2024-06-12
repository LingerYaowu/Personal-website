const outside = gete('.outside');
const outsideChildren = [
    [
        gete('.outside >.nav'),
        gete('.outside >.home_page')
    ],
    gete('.outside >.article')
];

/**
 * 当前处于哪个板块
 */
let currentPage = 0;
// outside.scrollTop = currentPage*document.body.clientHeight; 设置页面初始板块

outside.addEventListener('wheel', throttle((e) => {
    let changePage = e.wheelDelta > 0 ? true : false;
    if (changePage) {
        if (!(currentPage - 1 < 0)) {
            moveScroll(--currentPage * outside.clientHeight, 30, 10);
        }
    } else {
        if (!(currentPage + 1 >= outsideChildren.length)) {
            moveScroll(++currentPage * document.body.clientHeight, 30, 10)
        }
    }
}, 300));

/**
 * 移动板块定时器
 */
var moveScrollTimer;

/**
 * 
 * @param target 目标数值
 * @param step 每一步所加的数值
 * @param wait 定时器更新时间
 */
const moveScroll = (target, step, wait) => {

    if (!moveScrollTimer) {
        if (target > outside.clientHeight) {
            target = outside.clientHeight;
        }
        if (target < 0) {
            target = 0;
        }
        moveScrollTimer = setInterval(() => {
            if (target > outside.scrollTop) {
                outside.scrollTop += step;
                if (target <= outside.scrollTop) {
                    clearInterval(moveScrollTimer);
                    moveScrollTimer = null;
                }
            } else if (target < outside.scrollTop) {
                outside.scrollTop -= step;
                if (target >= outside.scrollTop) {
                    clearInterval(moveScrollTimer);
                    moveScrollTimer = null;
                }
            }
        }, wait);
    }
};