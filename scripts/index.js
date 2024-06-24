const outside = gete('.outside');
const outsideChildren = [
    [
        gete('.outside >.nav'),
        gete('.outside >.home_page')
    ],
    gete('.outside >.article'),
    gete('.outside >.resource_share')
];

/**
 * 当前处于哪个板块
 */
let currentPage = 0;
// outside.scrollTop = currentPage * document.body.clientHeight; //设置页面初始板块

outside.addEventListener('wheel', throttle((e) => {
    e.preventDefault();
    let changePage = e.wheelDelta > 0 ? true : false;
    if (changePage) {
        if (!(currentPage - 1 < 0)) {
            moveScroll(--currentPage * outside.clientHeight, 11, 1);
        }
    } else {
        if (!(currentPage + 1 >= outsideChildren.length)) {
            moveScroll(++currentPage * outside.clientHeight, 11, 1)
        }
    }
}, 600, () => {
    outside.addEventListener('wheel', (e) => {
        e.preventDefault();
    })
}));

/**
 * 移动板块定时器
 */
var moveScrollTimer;

/**轮播图自动轮播定时器 */
var carouselTimer;

/**资源分享中的轮播图定时器 */
let share_timer;
let share_current = 0;

/**
 * 
 * @param target 目标数值
 * @param step 每一步所加的数值
 * @param wait 定时器更新时间
 */
const moveScroll = (target, step, wait) => {

    if (!moveScrollTimer) {
        if (target < 0) {
            target = 0;
        }
        moveScrollTimer = setInterval(() => {
            if (target > outside.scrollTop) {
                outside.scrollTop += step;
                if (outside.scrollTop + step > target) {
                    outside.scrollTop = target;
                    clearInterval(moveScrollTimer);
                    moveScrollTimer = null;
                }
            } else if (target < outside.scrollTop) {
                outside.scrollTop -= step;
                if (outside.scrollTop - step < target) {
                    outside.scrollTop = target;
                    clearInterval(moveScrollTimer);
                    moveScrollTimer = null;
                }
            }
        }, wait);
    }

    if (currentPage == 1) {
        if (!carouselTimer) {
            carouselTimer = setInterval(autoCarousel, 5000);
        }
    } else {
        clearInterval(carouselTimer)
        carouselTimer = null;
    }

    if (currentPage == 2) {
        setClass(res_share_doms.share_tit, 'start_animate');
        if (!share_timer) {
            share_timer = setInterval(()=> {
                change_share(++share_current);
            }, 4000);
        }
    } else {
        clearInterval(share_timer);
        share_timer = null;
    }
};