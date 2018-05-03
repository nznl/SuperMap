(function () {

    //自定义键盘事件
    Vue.config.keyCodes.a = 65;
    //过滤器
    Vue.filter('toDou', function (n, a, b) {
        console.log(a + ',' + b);
        //alert(input);
        return n < 10 ? '0' + n : '' + n;
    });
    //数据结构
    var data1 = {
        message: "rrrrr"
    };
    //全局组件
    Vue.component('my-aaa', {
        data: function () {
            return data1;
        },
        props: ['myMessage', 'message2'],
        template: '<div>' +
        '<h3>标题</h3><strong>{{myMessage}}-{{message2}}-{{message}}</strong>' +
        '</div>'
    });
    //局部组件
    var home = {
        template: '<div>A custom component!</div>'
    };

    var body = {
        template: '<div>' +
        '<h3>我是子组件</h3>' +
        '<input type="button" value="按钮" @click="change1">' +
        '<input type="button" value="按钮" @click="change2">' +
        '<strong>{{msg1.a}}--{{b}}</strong>' +
        '</div>',
        data: function () {
            return {
                b: ''
            }
        },
        props: ['msg1', 'msg2'],
        mounted: function () {
            this.b = this.msg2;
        },
        methods: {
            change1: function () {
                this.msg1.a = '1被改了';
            },
            change2: function () {
                this.b = '2被改了';
            }
        }
    };

    //准备一个空的实例对象
    var Event = new Vue();

    var A = {
        template: '<div>' +
        '<span>我是A组件</span> ->{{a}}' +
        '<input type="button" value="把A数据给C" @click="send">' +
        '</div>',
        methods: {
            send: function () {
                Event.$emit('a-msg', this.a);
            }
        },
        data: function () {
            return {
                a: '我是a数据'
            }
        }
    };
    var B = {
        template: '<div>' +
        '<span>我是B组件</span> -> {{a}}' +
        '<input type="button" value="把B数据给C" @click="send">' +
        '</div>',
        data: function () {
            return {
                a: '我是b数据'
            }
        },
        methods: {
            send: function () {
                Event.$emit('b-msg', this.a);
            }
        }

    };
    var C = {
        template: '<div>' +
        '<h3>我是C组件</h3>' +
        '<span>接收过来的A的数据为: {{a}}{{b}}</span>' +
        '</div>',
        data: function () {
            return {
                a: '',
                b: ''
            }
        },
        mounted: function () {
            //var _this=this;
            //接收A组件的数据
            Event.$on('a-msg', function (a) {
                this.a = a;
            }.bind(this));

            //接收B组件的数据
            Event.$on('b-msg', function (a) {
                this.b = a;
            }.bind(this));
        }
    };

    var v2 = new Vue({
        el: '#v2',
        data: {
            a: "我是父组件数据2",
            giveData: {
                a: '我是父组件数据1'
            },
            show: '',
            show1: '',
            msg: "welcome vue2.0",
            num: 12,
            list: ["sdf1", "werwer2", "sdfd3"],
            list1: {
                a: 'wwrre',
                b: 'wrree',
                c: 'wrdre'
            },
            anList: ['apple', 'banana', 'orange', 'pear']
        },
        computed: {
            anLists: function () {
                var arr = [];
                this.anList.forEach(function (val) {
                    if (val.indexOf(this.show1) != -1) {
                        arr.push(val);
                    }
                }.bind(this));
                return arr;
            }
        },
        methods: {
            update: function () {
                this.msg = '大家好';
            },
            destroy: function () {
                this.$destroy();
            },
            add: function () {
                this.list.push('background');
            },
            change: function () {
                console.log('自定义键盘事件');
            },
            beforeEnter: function (el) {
                console.log('动画enter之前');
            },
            enter: function (el) {
                console.log('动画enter进入');
            },
            afterEnter: function (el) {
                console.log('动画进入之后');
                el.style.background = 'blue';
            },
            beforeLeave: function (el) {
                console.log('动画leave之前');
            },
            leave: function (el) {
                console.log('动画leave');
            },
            afterLeave: function (el) {
                console.log('动画leave之后');
                el.style.background = 'red';
            }
        },
        components: {
            // <my-component> 将只在父组件模板中可用
            'my-c1': home,
            'my-c2': body,
            'com-a': A,
            'com-b': B,
            'com-c': C
        },
        beforeCreate: function () {
            console.log('组件实例刚刚被创建');
        },
        created: function () {
            console.log('实例已经创建完成');
        },
        beforeMount: function () {
            console.log('模板编译之前');
        },
        mounted: function () {
            console.log('模板编译完成');
        },
        beforeUpdate: function () {
            console.log('组件更新之前');
        },
        updated: function () {
            console.log('组件更新完毕');
        },
        beforeDestroy: function () {
            console.log('组件销毁之前');
        },
        destroyed: function () {
            console.log('组件销毁之后');
        }
    });
})();