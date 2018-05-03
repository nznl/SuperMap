/**
 * Created by amkj18019 on 2018/4/11.
 */

function onload(Cesium) {
//初始化viewer部件
    var viewer = new Cesium.Viewer('cesiumContainer');
    var globe = viewer.scene.globe;
    var scene = viewer.scene;
    scene.skyAtmosphere.show = false;
    scene.skyBox.show = false;
//设置开启地下场景
    viewer.scene.undergroundMode = true;
    viewer.scene.screenSpaceCameraController.minimumZoomDistance = -1000;//设置相机最小缩放距离,距离地表-1000米
//关闭裙边
    viewer.scene.terrainProvider.isCreateSkirt = false;

//添加S3M图层服务
    /*   var promise = viewer.scene.addS3MTilesLayerByScp('http://localhost:8060/iserver/services/3D-gx_qzyk/rest/realspace/datas/CC@JG_CC/config', {
     name: 'CC@JG_CC'
     });*/

    /* var promise1 = viewer.scene.addS3MTilesLayerByScp('http://localhost:8060/iserver/services/3D-gx_qzyk/rest/realspace/datas/Config/config', {
     name: 'Config'
     });*/
    /* var promise2 = viewer.scene.addS3MTilesLayerByScp('http://localhost:8060/iserver/services/3D-gx_qzyk/rest/realspace/datas/DX@JG_DX/config', {
     name: 'DX@JG_DX'
     });*/
//        var um = [promise, promise1, promise2];
    var proe = scene.open('http://localhost:8060/iserver/services/3D-szcx/rest/realspace');
    //var proe = scene.open('http://192.168.18.18:8090/iserver/services/3D-gx_qzyk/rest/realspace');
    proe.then(function (layers) {
        scene.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(111.0312600000000000, 25.9702400000000000, 130.000000000000000),
            orientation: {
                heading: 5.154573786584606,
                pitch: -0.14229615865957967,
                roll: 3.2294167340296553e-12
            }
        });

    });
    /* promise.then(function () {
     //设置相机视角
     scene.camera.setView({
     destination: Cesium.Cartesian3.fromDegrees(116.384, 39.992, 100),
     orientation: {
     heading: 1.6105,
     pitch: -0.2885,
     roll: 0
     }
     });
     globe.globeAlpha = 0.1;
     });*/
    /*
     pro.then(function () {
     //设置相机视角
     scene.camera.setView({
     destination: Cesium.Cartesian3.fromDegrees(13.051864071400001, 47.817918975900000, 120),
     orientation: {
     heading: 5.154573786584606,
     pitch: -0.14229615865957967,
     roll: 3.2294167340296553e-12
     }
     });
     });
     */
    /*
     Cesium.when(promise, function (layer) {
     //设置相机视角
     scene.camera.setView({
     destination: Cesium.Cartesian3.fromDegrees(111.0335014039630900, 25.9725832281961220, 100.000000000000000),
     orientation: {
     heading: 5.154573786584606,
     pitch: -0.14229615865957967,
     roll: 3.2294167340296553e-12
     }
     });

     });
     */


//监听滑动条变化，改变alpha的值，设置地表透明度
    var viewModel = {
        globeAlpha: 0.0
    };
    Cesium.knockout.track(viewModel);
    var toolbar = document.getElementById('toolbar');
    Cesium.knockout.applyBindings(viewModel, toolbar);
    Cesium.knockout.getObservable(viewModel, 'globeAlpha').subscribe(
        function (newValue) {

//                    globe.globeAlpha = parseFloat(newValue);//设置地表透明度

            var S3MTilesLayer = scene.layers.find('Config');
            //设置图层风格
            var style3D = new Cesium.Style3D();
            var color = new Cesium.Color(1.0, 1.0, 1.0, parseFloat(newValue));
            style3D.fillForeColor = color;
            S3MTilesLayer.style3D = style3D;
            //设置后需刷新图层
            S3MTilesLayer.refresh();
        }
    );
    $('#toolbar').show();
    $('#loadingbar').remove();


}



