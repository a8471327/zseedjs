# zseedjs
巩固原生js基础写的一个组件库，仅支持PC端。
目录:

[TOC]

使用方法
-------------
首先引入zseed.css和zseed.js文件

**允许链式操作:**
```
ZS.XXX({    //xxx为组件方法名
    ...
}).XXX({
    ...
});
```

Carousel 组件（轮播图）
-------------
**HTML:**
```
<div class="carousel" id="xxx">
</div>
```
**JS:**
```
ZS.carousel({
    id: 'xxx',    //对应HTML元素的id
    width: 400,   //图片宽
    height: 224,  //图片高
    auto: true,   //是否自动播放，默认为false
    speed: 4,     //设为自动播放时的速度，单位为秒，默认为3秒
    img: [        //图片路径
        'xxx.jpg',
        'xxx.jpg',
        'xxx.jpg'
    ]
})
```

SearchSelect 组件（可搜索的下拉框）
-------------
**HTML:**
```
<input type="text" id="xxx">
```
**JS:**
```
ZS.searchSelect({
    id: 'xxx',         //对应HTML元素的id
    data: [...]        //数据，['sadly', '收到了', '王企鹅哦', '亲生的健康', '阿苏为空']
})
```

collapse 组件（手风琴）
-------------
**HTML:**
```
<div class="collapse-group" id="xxx">
    <div class="collapse">
        <p class="collapse-title">collapse-title1</p>
        <div class="collapse-content">
            collapse-content1.collapse-content1.collapse-content1.collapse-content1.collapse-content1.collapse-content1.collapse-content1.collapse-content1.collapse-content1.collapse-content1.collapse-content1.collapse-content1.collapse-content1.collapse-content1
        </div>
    </div>
    <div class="collapse">
        <p class="collapse-title">collapse-title2</p>
        <div class="collapse-content">
            collapse-content2.collapse-content2.collapse-content2.collapse-content2.collapse-content2.collapse-content2.collapse-content2.collapse-content2.collapse-content2.collapse-content2.collapse-content2.collapse-content2.collapse-content2.collapse-content2
        </div>
    </div>
    <div class="collapse">
        <p class="collapse-title">collapse-title3</p>
        <div class="collapse-content">
            collapse-content3.collapse-content3.collapse-content3.collapse-content3.collapse-content3.collapse-content3.collapse-content3.collapse-content3.collapse-content3.collapse-content3.collapse-content3.collapse-content3.collapse-content3.collapse-content3
        </div>
    </div>
</div>
```
**JS:**
```
ZS.collapse('xxx');     //对应HTML元素的id
```

dropdown 组件（下拉菜单）
-------------
**HTML:**
```
<div class="dropdown" id="xxx">
    <a href="#" class="dropdown-btn">
        Dropdown test
        <span class="caret"></span>
    </a>
    <ul class="dropdown-menu">
        <li><a href="#">菜单1</a></li>
        <li><a href="#">菜单2</a></li>
        <li><a href="#">菜单3</a></li>
        <li><a href="#">菜单4</a></li>
    </ul>
</div>
```
**JS:**
```
ZS.dropdown('xxx');     //对应HTML元素的id
```

modal 组件（弹出框）
-------------
**HTML:**
```
<div class="modal" id="xxx">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close"><span>&times;</span></button>
                <h4 class="modal-title">myModal title</h4>
            </div>
            <div class="modal-body">
                <p>myModal body&hellip;</p>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
```
**JS:**
```
ZS.modal('xxx', type);     //对应HTML元素的id。type值可设为'hide'或'show'，分别对应弹出框的“弹出”和“隐藏”，默认值为'show'
```

tab 组件（选项卡）
-------------
**HTML:**
```
<div class="tab" id="xxx">
    <ul class="tab-title">
        <li>tab1</li>
        <li>tab2</li>
        <li>tab3</li>
    </ul>
    <div class="tab-content">
        <div class="content">
            content1
        </div>
        <div class="content">
            content2
        </div>
        <div class="content">
            content3
        </div>
    </div>
</div>
```
**JS:**
```
ZS.tab('xxx');     //对应HTML元素的id
```