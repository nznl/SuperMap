/*!
 * am.js v1.0.0
 * (c) 2018 jun liu
 * Released under the MIT License.
 */


var AM = function (objs) {
    return new Base(objs);
};

function Base(objs) {

    //创建一个数组，来保存获取的节点和节点数组
    this.elements = [];
    this.serverData = {};

    this.getId = function () {
        return this;
    };

}


Base.prototype.get = function (url, data) {
    var obj = {};
    $.ajax({
        url: url,
        type: "GET",
        data: JSON.stringify(data),
        contentType: "application/json,charset=UTF-8",
        dataType: "json",
        async: false,
        success: function (result) {
            var retStatus = result.status;
            if (retStatus === "Success") {
                obj = result.data;
            }
        }
    });
    this.serverData = obj;
    return this;
};

Base.prototype.post = function (url, data) {
    var obj = {};
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json,charset=UTF-8",
        dataType: "json",
        async: false,
        success: function (result) {
            var retStatus = result.status;
            if (retStatus === "Success") {
                obj = result.data;
            }
        }
    });
    this.serverData = obj;
    return this;
};


//插件入口
Base.prototype.extend = function (name, fn) {
    Base.prototype[name] = fn;
};

