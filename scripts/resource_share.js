const res_share_doms = {
    that: gete('.resource_share'),
    big_mask: gete('.resource_share .images div.big_mask'),
    img_box: gete('.resource_share .images >div:not(.big_mask)'),
    imgs: gete('.resource_share .images >div:not(.big_mask) >div'),
    ctrl_btn: gete('.control_btns ul li'),
    share_tit: gete('.resource_share .title >div')
};

bindMouseMove(res_share_doms.big_mask, 15, res_share_doms.img_box);

const degs = [
    'translateZ(200px)',
    'translateX(320px) scale(0.8)',
    'translateZ(-200px) scale(0.8)',
    'translateX(-320px) scale(0.8)'
];

const change_share = (id)=> {
    id %= 4;
    let cur = 0;
    for(let i = id;i < res_share_doms.imgs.length;i++) {
        res_share_doms.imgs[i].style.transform = degs[cur++];
    }
    for(let i = 0;i < id; i++) {
        res_share_doms.imgs[i].style.transform = degs[cur++];
    }
    res_share_doms.imgs.forEach(item=> {
        removeClass(item, 'active')
    })
    setClass(res_share_doms.imgs[id], 'active')
    // 控件
    res_share_doms.ctrl_btn.forEach(item=> {
        removeClass(item, 'active')
    })
    setClass(res_share_doms.ctrl_btn[id], 'active');
};

for (let i = 0; i < res_share_doms.ctrl_btn.length; i++) {
    res_share_doms.ctrl_btn[i].addEventListener('click', ()=> {
        share_current = i;
        change_share(share_current);
    });
}
