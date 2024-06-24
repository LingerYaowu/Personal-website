/**
 * 获取元素
 * @param {String} e css选择器
 */
const gete = e => {
    const item = document.querySelectorAll(e);
    if (!(item.length > 1)) {
        return item[0];
    }
    return item;
};

/**
 * 设置元素样式
 * @param {NodeList} obj 
 * @param {Object} styles 
 */
const setcss = (obj, styles) => {
    for (const key in styles) {
        obj.style[key] = styles[key];
    }
};

var timer;
/**
 * 节流
 * @param {Function} fun 要触发的函数
 * @param {Number} wait 等待的时间
 */
const throttle = (fun, wait, overFun) => {
    return (...arg) => {
        if (!timer) {
            fun(...arg);
            overFun();
            timer = setTimeout(() => {
                clearTimeout(timer)
                timer = null;
            }, wait);
        }
    };
};

/**
 * 设置class
 * @param {NodeList} obj 元素节点
 * @param {String} name 字符串
 */
const setClass = (obj, name) => {
    let classList = obj.className.split(' ');
    if (!(classList.indexOf(name) >= 0)) {
        classList.push(name)
        obj.className = classList.join(' ');
        return true;
    }
    return false;
};

/**
 * 删除class
 * @param {NodeList} obj 元素节点
 * @param {String} name 字符串
 */
const removeClass = (obj, name) => {
    let classList = obj.className.split(' ');
    if (classList.indexOf(name) >= 0) {
        classList.splice(classList.indexOf(name), 1)
        obj.className = classList.join(' ');
    }
};

/**
 * 切换class
 * @param {NodeList} obj 元素节点
 * @param {String} name 字符串
 */
const toggleClass = (obj, name) => {
    let classList = obj.className.split(' ');
    if (classList.indexOf(name) >= 0) {
        removeClass(obj, name);
    } else {
        setClass(obj, name)
    }
}


/**
 * 
 * @param {NodeList} dom 鼠标箭头所在的范围
 * @param {Number} deg 旋转的角度
 * @param {NodeList} targetDom 需要旋转的元素
 */
const bindMouseMove = (dom, deg, targetDom) => {
    dom.addEventListener('mousemove', function (e) {
        const [width, height] = [dom.clientWidth, dom.clientHeight];
        const [originX, originY] = [Math.round(width / 2), Math.round(height / 2)];
        const [stepX, stepY] = [+(deg / originX).toFixed(2), +(deg / originY).toFixed(2)];
        const [x, y] = [e.offsetX, e.offsetY];
        let degX, degY;
        // X
        degX = Number(((x - originX) * stepX).toFixed(1));
        // Y
        degY = Number(((y - originY) * stepY).toFixed(1));
        setcss(targetDom, {transform:`rotateX(${-degY}deg) rotateY(${degX}deg)`});
    });
};