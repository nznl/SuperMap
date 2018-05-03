/**
 * Created by amkj18019 on 2018/4/17.
 */
(function () {
    var title = {
        text: ''
    };
    var subtitle = {
        text: ''
    };
    var xAxis = {
        categories: ['1', '2', '3', '4', '5', '6',
            '7', '8', '9', '11', '12', '13']
    };
    var yAxis = {
        title: {
            text: ''
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    };

    var tooltip = {
        valueSuffix: '\xB0C'
    };
    var plotOptions = {
        /* line: {
         dataLabels: {
         enabled: true
         },
         enableMouseTracking: false
         }*/
    };
    var legend = {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    };

    var series = [
        {
            name: '压力',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,
                26.5, 23.3, 18.3, 13.9, 9.6]
        },
        {
            name: '流量',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8,
                24.1, 20.1, 14.1, 8.6, 2.5]
        },
        {
            name: '流速',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0,
                16.6, 14.2, 10.3, 6.6, 4.8]
        }
        ,
        {
            name: '温度',
            data: [13.9, 4.2, 15.7, 8.5, 11.9, 15.2, 17.0,
                16.6, 14.2, 16.3, 26.6, 4.8]
        }
        ,
        {
            name: '液位',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0,
                16.6, 14.2, 10.3, 6.6, 4.8]
        }
    ];

    var json = {};

    json.title = title;
    json.subtitle = subtitle;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.tooltip = tooltip;
    json.legend = legend;
    json.series = series;
    json.plotOptions = plotOptions;

    $('#myChart1').highcharts(json);
})();
+(function () {
    var title = {
        text: ''
    };
    var subtitle = {
        text: ''
    };
    var xAxis = {
        categories: ['1', '2', '3', '4', '5', '6',
            '7', '8', '9', '11', '12', '13']
    };
    var yAxis = {
        title: {
            text: ''
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    };

    var tooltip = {
        valueSuffix: '\xB0C'
    };
    var plotOptions = {
        /* line: {
         dataLabels: {
         enabled: true
         },
         enableMouseTracking: false
         }*/
    };
    var legend = {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    };

    var series = [
        {
            name: '压力',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,
                26.5, 23.3, 18.3, 13.9, 9.6]
        },
        {
            name: '流量',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8,
                24.1, 20.1, 14.1, 8.6, 2.5]
        },
        {
            name: '流速',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0,
                16.6, 14.2, 10.3, 6.6, 4.8]
        }
        ,
        {
            name: '温度',
            data: [13.9, 4.2, 15.7, 8.5, 11.9, 15.2, 17.0,
                16.6, 14.2, 16.3, 26.6, 4.8]
        }
        ,
        {
            name: '液位',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0,
                16.6, 14.2, 10.3, 6.6, 4.8]
        }
    ];

    var json = {};

    json.title = title;
    json.subtitle = subtitle;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.tooltip = tooltip;
    json.legend = legend;
    json.series = series;
    json.plotOptions = plotOptions;

    $('#myChart1-1').highcharts(json);
})();
+(function () {
    var chart = {
        type: 'column'
    };
    var title = {
        text: ''
    };
    var subtitle = {
        text: ''
    };
    var xAxis = {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        crosshair: true
    };
    var yAxis = {
        min: 0,
        title: {
            text: ''
        }
    };
    var tooltip = {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    };
    var plotOptions = {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    };
    var credits = {
        enabled: false
    };

    var series = [{
        name: '报警次数',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }];

    var json = {};
    json.chart = chart;
    json.title = title;
    json.subtitle = subtitle;
    json.tooltip = tooltip;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.series = series;
    json.plotOptions = plotOptions;
    json.credits = credits;
    $('#myChart2').highcharts(json);
})();
+(function(){
    var chart = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    };
    var title = {
        text: ''
    };
    var tooltip = {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    };
    var plotOptions = {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    };
    var series= [{
        type: 'pie',
        name: '次数',
        data: [
            ['类别1',   45.0],
            ['类别2',       26.8],
            {
                name: '类别3',
                y: 12.8,
                sliced: false,
                selected: false
            },
            ['类别4',    8.5],
            ['类别5',     6.2]
        ]
    }];

    var json = {};
    json.chart = chart;
    json.title = title;
    json.tooltip = tooltip;
    json.series = series;
    json.plotOptions = plotOptions;
    $('#myChart3').highcharts(json);
})();
