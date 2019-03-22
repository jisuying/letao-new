$(function () {
    //柱状图
    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('pl'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [500, 2000, 3006, 1000, 1500, 2060]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);

    // 饼图
    var myChart2 = echarts.init(document.getElementById('pr'));
    var option2 = {
        title: {
            text: '热门品牌热销',
            subtext: '2019年10月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['阿迪', '新百伦', '阿迪达斯', '阿宁', '阿迪王']
        },
        series: [
            {
                name: '品牌',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '阿迪' },
                    { value: 310, name: '新百伦' },
                    { value: 234, name: '阿迪达斯' },
                    { value: 135, name: '阿宁' },
                    { value: 1548, name: '阿迪王' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart2.setOption(option2);
})