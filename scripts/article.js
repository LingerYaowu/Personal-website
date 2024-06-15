// 图片懒加载
let carousel_items = [...gete('.article .bg>div'), ...gete('.top .select .selt_items >div')];
const imgCallback = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const item = entry.target;
            const data_src = item.getAttribute('data-src');
            setcss(item, { "background-image": `url("${data_src}")` })
            observer.unobserve(item)
        }
    })
};
const observer = new IntersectionObserver(imgCallback);
carousel_items.forEach(item => {
    observer.observe(item)
});

const carouselItem = gete('.top .select .selt_items>div');
const carouselBigItem = gete('.article .bg>div');
const carouselInfo = gete('.article .bottom .img_info div');
let current_carousel_id = 0; // 当前轮播图

/* 切换图片 */
for (let i = 0; i < carouselItem.length; i++) {
    carouselItem[i].addEventListener('click', function () {
        current_carousel_id = i;
        changeCarousel(i);
    })
}

/**切换图片函数 */
const changeCarousel = (cur) => {
    clearCarouselClass();
    setClass(carouselItem[cur], 'active')
    setClass(carouselBigItem[cur], 'active')
    setClass(carouselInfo[cur], 'active')
};

/**清除所有类名 */
const clearCarouselClass = () => {
    carouselItem.forEach(item => {
        removeClass(item, 'active')
    })
    carouselBigItem.forEach(item => {
        removeClass(item, 'active')
    })
    carouselInfo.forEach(item => {
        removeClass(item, 'active')
    })
};

/* 左右按钮切换图片 */
let carousel_left = gete('.top .select .top_btn');
let carousel_right = gete('.top .select .bottom_btn');

carousel_left.addEventListener('click', () => {
    if (current_carousel_id - 1 < 0) {
        current_carousel_id = carouselBigItem.length - 1;
    } else {
        current_carousel_id--;
    }
    changeCarousel(current_carousel_id);
})

carousel_right.addEventListener('click', () => {
    if (current_carousel_id + 1 > carouselBigItem.length - 1) {
        current_carousel_id = 0;
    } else {
        current_carousel_id++;
    }
    changeCarousel(current_carousel_id);
})

/* 自动轮播 */
setInterval(() => {
    if (current_carousel_id + 1 > carouselBigItem.length - 1) {
        current_carousel_id = 0;
    } else {
        current_carousel_id++;
    }
    changeCarousel(current_carousel_id);
}, 5000)