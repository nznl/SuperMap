(function(){

    Vue.filter('c', function (value) {
        if (!value) return '';
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1) + "--过滤器1";
    });

    var md1 = new Vue({
        el: "#v1",
        data: {
            a: true,
            url: "../images/home_banner.jpg",
            c1: "btn",
            c2: "btn-primary",
            json1: {
                'btn': true,
                'btn-primary': true
            },
            num1: 123,
            cr1: "方式发大水",
            arr: ["asd", "sdadasd","jfsldfjd"],
            obj: {
                a: 123,
                b: "fdsf"
            }
        },
        methods: {
            f1: function () {
                this.arr.push("eer");
                console.log(this.arr);
            },
            f2: function (ev, value) {
                alert(value + "-" + ev.clientX);
                ev.cancelBubble = true;
            },
            f3: function (ev, value) {
                alert(value + "-" + ev.clientX);
            },
            f4: function (ev) {
                alert(123);
                ev.preventDefault();
            }
            ,
            f5: function () {
                alert(123);
            },
            f6: function (ev) {
                console.log(ev.keyCode);
                if (ev.keyCode == "65") {
                    alert(123);
                }
            },
            get: function () {
                this.$http.get('../data/test/tsconfig.json').then(function(res){
                    this.obj=res.data;
                    alert(res.data);
                },function(res){
                    alert(res.status);
                });
            },
            post: function () {
                this.$http.post('../data/test/tsconfig.json',{
                    a:1,
                    b:20
                },{
                    emulateJSON:true
                }).then(function(res){
                    alert(res.data);
                },function(res){
                    alert(res.status);
                });
            },
            jsonp: function () {
                this.$http.jsonp('../data/test/tsconfig.json',{
                    wd:'a'
                },{
                    jsonp:'cb'	//callback名字，默认名字就是"callback"
                }).then(function(res){
                    alert(res.data.s);
                },function(res){
                    alert(res.status);
                });
            }

        },
        filters: {
            b: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1) + "--过滤器2"
            }
        }
    });
})();