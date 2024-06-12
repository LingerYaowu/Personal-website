/**
 * 获取元素
 * @param {String} e css选择器
 */
const gete = (e) => {
    const item = document.querySelectorAll(e);
    if (!(item.length > 1)) {
        return item[0];
    }
    return item;
};

/**
 * 设置元素样式
 * @param {NodeList} obj 
 * @param {object} styles 
 */
const setcss = (obj, styles)=> {
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
const throttle = (fun, wait) => {
    return (...arg) => {
        if (!timer) {
            fun(...arg);
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
const setClass = (obj, name)=> {
    let classList = obj.className.split(' ');
    if(!(classList.indexOf(name) >= 0)) {
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
const removeClass = (obj, name)=> {
    let classList = obj.className.split(' ');
    if(classList.indexOf(name) >= 0) {
        classList.splice(classList.indexOf(name), 1)
        obj.className = classList.join(' ');
    }
};

/**
 * 切换class
 * @param {NodeList} obj 元素节点
 * @param {String} name 字符串
 */
const toggleClass = (obj, name)=> {
    let classList = obj.className.split(' ');
    if(classList.indexOf(name) >= 0) {
        removeClass(obj, name);
    } else {
        setClass(obj, name)
    }
}