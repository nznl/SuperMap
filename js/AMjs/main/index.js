//事件对象
var Event = new Vue();

//自定义键盘事件
Vue.config.keyCodes.a = 65;
//过滤器
Vue.filter('toDou', function (n, a, b) {
    console.log(a + ',' + b);
    //alert(input);
    return n < 10 ? '0' + n : '' + n;
});
// 全局自定义指令
Vue.directive('drag', function (el, binding) {
    //el.style.backgroundColor = binding.value;
    var _drag = {};
    _drag.top = 0; //拖动过的位置距离上边
    _drag.left = 0; //拖动过的位置距离左边
    _drag.maxLeft; //距离左边最大的距离
    _drag.maxTop; //距离上边最大的距离
    _drag.dragging = false; //是否拖动标志
    //拖动函数
    function bindDrag(el) {
        var winWidth = $(window).width(),
            winHeight = $(window).height(),
            objWidth = $(el).outerWidth(),
            objHeight = $(el).outerHeight();
        _drag.maxLeft = winWidth - objWidth,
            _drag.maxTop = winHeight - objHeight;
        var els = el.style,
            x = 0,
            y = 0;
        var objTop = $(el).offset().top,
            objLeft = $(el).offset().left;
        if ($(el).find(".modal-header").html() == undefined) {
            $(el).mousedown(function (e) {
                _drag.dragging = true;
                _drag.isDragged = true;
                x = e.clientX - el.offsetLeft;
                y = e.clientY - el.offsetTop;
                el.setCapture && el.setCapture();
                $(document).bind('mousemove', mouseMove).bind('mouseup', mouseUp);
                return false;
            });

        } else {
            $(el).find('.modal-header').mousedown(function (e) {
                _drag.dragging = true;
                _drag.isDragged = true;
                x = e.clientX - el.offsetLeft;
                y = e.clientY - el.offsetTop;
                el.setCapture && el.setCapture();
                $(document).bind('mousemove', mouseMove).bind('mouseup', mouseUp);
                return false;
            });
        }

        function mouseMove(e) {
            e = e || window.event;
            if (_drag.dragging) {
                _drag.top = e.clientY - y;
                _drag.left = e.clientX - x;
                _drag.top = _drag.top > _drag.maxTop ? _drag.maxTop : _drag.top;
                _drag.left = _drag.left > _drag.maxLeft ? _drag.maxLeft : _drag.left;
                _drag.top = _drag.top < 0 ? 0 : _drag.top;
                _drag.left = _drag.left < 0 ? 0 : _drag.left;
                els.top = _drag.top + 'px';
                els.left = _drag.left + 'px';
                return false;
            }
        }

        function mouseUp(e) {
            _drag.dragging = false;
            el.releaseCapture && el.releaseCapture();
            e.cancelBubble = true;
            $(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
        }

        $(window).resize(function () {
            var winWidth = $(window).width(),
                winHeight = $(window).height(),
                el = $(el),
                elWidth = el.outerWidth(),
                elHeight = el.outerHeight(),
                elLeft = parseFloat(el.css('left')),
                elTop = parseFloat(el.css('top'));
            _drag.maxLeft = winWidth - elWidth;
            _drag.maxTop = winHeight - elHeight;
            _drag.top = _drag.maxTop < elTop ? _drag.maxTop : elTop;
            _drag.left = _drag.maxLeft < elLeft ? _drag.maxLeft : elLeft;
            el.css({
                top: _drag.top,
                left: _drag.left
            })
        })
    }

    bindDrag(el);
});

// 混入
var myMixin = {
    computed: {//计算属性
        Items: function () {//表信息显示
            var rows = [];
            for (var i = this.PageRows * (this.CurrentPage - 1); i < this.PageRows * this.CurrentPage; i++) {
                if (this.table.items[i] != undefined) {
                    rows.push(this.table.items[i]);
                }
            }
            return rows;
        },
        PageCount: function () {//总页数
            var num;
            num = parseInt(this.table.items.length / this.PageRows);
            if (this.table.items.length % this.PageRows > 0) {
                num += 1;
            }
            return num;
        }
    },
    methods: {
        showBox: function (box) {
            Event.$emit('show', box);
        },
        pageBtn: function (num) {
            this.CurrentPage += num;
            if (this.CurrentPage < 1) {//当前页小于1
                this.CurrentPage = this.PageCount;
            }
            if (this.CurrentPage > this.PageCount) {//当前页大于总页数
                this.CurrentPage = 1;
            }
            console.log(this.table.items.length);
        }

    },
    mounted: function () {
        this.boxID = this.boxMessage.boxID;
        this.boxTitle = this.boxMessage.boxTitle;
        this.layout = this.boxMessage.layout;
        this.urls = this.boxMessage.urls;

    },
    updated: function () {
        $('#' + this.boxID).modal('show');
        console.log('组件更新完毕');
    }
};
//局部组件
var v1 = {
    mixins: [myMixin],
    template: '#box-v1',
    data: function () {
        return {
            boxID: '',
            boxTitle: '',
            layout: '',
            urls: {},
            classify: {
                title: '分类',
                options: [
                    {
                        "text": "ee",
                        "values": "ee",
                        "dataUrl": "data/am/test.json"
                    },
                    {
                        "text": "eee",
                        "values": "eee",
                        "dataUrl": "data/am/test.json"
                    },
                    {
                        "text": "eeee",
                        "values": "eeee",
                        "dataUrl": "data/am/test.json"
                    }
                ]
            },
            selected: '',
            table: {
                ths: ['序号', '名称', '编码', '状态', '备注'],

                items: [
                    {id: '1', name: 'ad', code: 'asd', status: 'as', remarks: 'asd'}
                ]
            },
            checkedNames: [],
            PageRows: 5,
            CurrentPage: 1
        }
    },
    props: ['boxMessage'],
    computed: {//计算属性

    },
    methods: {
        selectFn: function () {
            for (var i = 0; i < this.classify.options.length; i++) {
                if (this.selected === this.classify.options[i].value) {
                    this.table = AM().post(this.classify.options[i].dataUrl, {
                        boxID: this.boxID,
                        selected: this.selected
                    }).serverData.table;
                }
            }
            this.CurrentPage = 1;
            console.log(this.selected);
        }
    },
    mounted: function () {
        this.classify.options = AM().post(this.urls.classify.url, {boxID: this.boxID}).serverData.classify.options;
        this.table = AM().post(this.urls.table.url, {boxID: this.boxID}).serverData.table;
        $('#' + this.boxID).modal('show');

        Event.$on('menuShow', function (a) {
            if (this.boxMessage.template == a.template && this.boxID != a.boxID) {
                this.boxID = a.boxID;
                this.boxTitle = a.boxTitle;
                this.layout = a.layout;
                this.urls = a.urls;
            }
        }.bind(this));
        console.log('模板编译完成');
    },
    updated: function () {

    }
};
var v2 = {
    mixins: [myMixin],
    template: '#box-v2',
    data: function () {
        return {
            boxID: '',
            boxTitle: '',
            layout: '',
            urls: {},
            table: {
                ths: ['序号', '名称', '编码', '状态', '备注'],
                items: [
                    {id: '1', name: 'ad', code: 'asd', status: 'as', remarks: 'asd'}
                ]
            },
            checkedNames: [],
            PageRows: 5,
            CurrentPage: 1
        }
    },
    props: ['boxMessage'],
    methods: {
        send: function () {

        }
    },
    mounted: function () {
        this.table = AM().post(this.urls.table.url, {boxID: this.boxID}).serverData.table;
        $('#' + this.boxID).modal('show');

        Event.$on('menuShow', function (a) {
            if (this.boxMessage.template == a.template && this.boxID != a.boxID) {
                this.boxID = a.boxID;
                this.boxTitle = a.boxTitle;
                this.layout = a.layout;
                this.urls = a.urls;
            }
        }.bind(this));
        console.log('模板编译完成');
    },
    updated: function () {

    }
};
var v3 = {
    mixins: [myMixin],
    template: '#box-v3',
    data: function () {
        return {
            boxID: '',
            boxTitle: '',
            layout: '',
            urls: [
                {name: 'A', url: '', type: 'post', data: {a: '', b: ''}}
            ]
        };
    },
    props: ['boxMessage'],
    methods: {
        send: function () {

        }
    },
    mounted: function () {


        $('#' + this.boxID).modal('show');

        Event.$on('menuShow', function (a) {
            if (this.boxMessage.template == a.template && this.boxID != a.boxID) {
                this.boxID = a.boxID;
                this.boxTitle = a.boxTitle;
                this.layout = a.layout;
                this.urls = a.urls;
            }
        }.bind(this));
        console.log('模板编译完成');
    },
    updated: function () {

    }
};
var v4 = {
    mixins: [myMixin],
    template: '#box-v4',
    data: function () {
        return {
            boxID: '',
            boxTitle: '',
            layout: '',
            urls: [
                {name: 'A', url: '', type: 'post', data: {a: '', b: ''}}
            ]
        };
    },
    props: ['boxMessage'],
    methods: {
        forceUpdate: function () {
            this.$forceUpdate();
        }
    },
    mounted: function () {
        $('#' + this.boxID).modal('show');

        Event.$on('menuShow', function (a) {
            if (this.boxMessage.template == a.template && this.boxID != a.boxID) {
                this.boxID = a.boxID;
                this.boxTitle = a.boxTitle;
                this.layout = a.layout;
                this.urls = a.urls;
            }
        }.bind(this));
        console.log('模板编译完成');

    },
    updated: function () {

    }
};

var v5 = {
    mixins: [myMixin],
    template: '#box-v5',
    data: function () {
        return {
            boxID: '',
            boxTitle: '',
            layout: '',
            urls: [
                {name: 'A', url: '', type: 'post', data: {a: '', b: ''}}
            ]
        };
    },
    props: ['boxMessage'],
    methods: {
        forceUpdate: function () {

        }
    },
    mounted: function () {
        $('#' + this.boxID).modal('show');

        Event.$on('menuShow', function (a) {
            if (this.boxMessage.template == a.template && this.boxID != a.boxID) {
                this.boxID = a.boxID;
                this.boxTitle = a.boxTitle;
                this.layout = a.layout;
                this.urls = a.urls;
            }
        }.bind(this));
        console.log('模板编译完成');

    },
    updated: function () {

    }
};
//配置路由控制场景
const routes = [
    {path: '/home', component: ''},
    {
        path: '/user',
        component: '',
        children: [
            {path: ':username/age/:age', component: ''}
        ]
    },
    {path: '*', redirect: '/home'}  //404
];

//生成路由实例
const router = new VueRouter({
    routes: routes
});

var sz = new Vue({
    router: router,
    el: '#AM',
    data: {
        nav: [],//菜单链接配置
        boxMessage: {
            c1: '',
            c2: '',
            c3: '',
            c4: '',
            c5: '',
            c6: ''
        },
        currentViews: {
            currentView1: "",
            currentView2: "",
            currentView3: "",
            currentView4: "",
            currentView5: "",
            currentView6: ""
        }
    },
    components: {
        // <my-component> 将只在父组件模板中可用
        'box-v1': v1,
        'box-v2': v2,
        'box-v3': v3,
        'box-v4': v4,
        'box-v5': v5
    },
    created: function () {//初始化时执行
        $('#main_menu').modal('show');//显示主菜单

    },
    methods: {
        fn: function (boxMessage) {//窗口显示

            if (boxMessage.component == "com1") {
                this.currentViews.currentView1 = boxMessage.template;
                this.boxMessage.c1 = boxMessage;
            } else if (boxMessage.component == "com2") {
                this.currentViews.currentView2 = boxMessage.template;
                this.boxMessage.c2 = boxMessage;
            } else if (boxMessage.component == "com3") {
                this.currentViews.currentView3 = boxMessage.template;
                this.boxMessage.c3 = boxMessage;
            } else if (boxMessage.component == "com4") {
                this.currentViews.currentView4 = boxMessage.template;
                this.boxMessage.c4 = boxMessage;
            } else if (boxMessage.component == "com5") {
                this.currentViews.currentView4 = boxMessage.template;
                this.boxMessage.c4 = boxMessage;
            } else if (boxMessage.component == "com6") {
                this.currentViews.currentView4 = boxMessage.template;
                this.boxMessage.c4 = boxMessage;
            }

            Event.$emit('menuShow', boxMessage);
            console.log(this.boxMessage);
            $('#' + boxMessage.boxID).modal('toggle');
        }

    },
    mounted: function () {
        console.log(AM().post('data/am/serverUrl.json', {}).serverData);
        this.nav = AM().post('data/am/serverUrl.json', {}).serverData.nav;//总控制信息
        Event.$on('show', function (a) {
            console.log(a);
            this.fn(a);
        }.bind(this));
    }
});


