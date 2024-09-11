<!--  -->
<template>
  <div class='pieLineChart'>
    <div class="chart" style="width:900px">
      <div id="container" class="chart-box"></div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import * as echarts from 'echarts';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //组件参数
  props: {},
  data() {
    //这里存放数据
    return {
      yan: [56, 82, 101, 70, 83, 85, 87, 84]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.draw();
  },
  //方法集合
  methods: {
    draw() {
      var dom = document.getElementById("container");
      var myChart = echarts.init(dom);
      var option;
      setTimeout(function () {
        option = {
          color: ['#c6e8ad', '#00DDFF', '#37A2FF', '#FFBF00', '#f3a19e'],
          legend: {
            // bottom:'left'
          },
          tooltip: {
            trigger: 'axis',
            showContent: false
          },
          dataset: {
            // ['严重', '错误', '警告', '信息', '调试']
            // data: ['当前', '三小时前', '六小时前', '九小时前', '十二小时前', '十五小时前', '十八小时前', '二十一小时前']
            // dimensions: ['product', '2015', '2016', '2017'],

            source: [
              ['月份', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
              // ['时间', '当前', '三小时前', '六小时前', '九小时前', '十二小时前', '十五小时前', '十八小时前', '二十一小时前'],
              ['调试', 56, 82, 101, 70, 83, 85, 87, 84],
              ['信息', 51, 51, 55, 53, 73, 68, 69, 73],
              ['警告', 12, 15, 30, 25, 0, 23, 15, 18],
              ['错误', 3, 7, 2, 6, 6, 8, 3, 2],
              ['严重', 5, 1, 0, 0, 0, 2, 0, 2]
            ]
            // source: [
            //   { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
            //   { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
            //   { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
            //   { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 }
            // ]
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],

          yAxis: { gridIndex: 0 },
          grid: [
            {
              width: '60%',
              right: '3%',
              bottom: '3%',
              containLabel: true
            }
          ],
          series: [
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'pie',
              id: 'pie',
              center: ['15%', '50%'],
              radius: ['25%', '55%'],
              radius: '30%',
              // itemStyle: {
              //   borderRadius: 10,
              //   borderColor: '#fff',
              //   borderWidth: 2
              // },
              label: {
                position: 'inside',
                formatter: '{d}%'
                // formatter: function (params) {
                //   if (params.name == "调试") {
                //     return '10个' + '\n' + params.percent + '%'
                //   } else {
                //     return '0个' + '\n' + params.percent + '%'
                //   }
                // }
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '18',
                  fontWeight: 'bold',
                  formatter: '{d}%'


                  // formatter: function (params) {
                  //   // console.log(`output->params`, params)
                  //   return '0个' + '\n' + params.percent + '%'
                  // }
                }
              },
              encode: {
                itemName: '月份',
                value: '1',
                tooltip: '1'
              }
            }
          ]
        };
        myChart.on('updateAxisPointer', function (event) {
          const xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: 'pie',
                label: {
                  formatter: '{d}%'
                  // formatter: function (params) {
                  //   if (params.name == '严重') {
                  //     console.log(`output->params`, params)
                  //     return '10个' + '\n' + params.percent + '%'
                  //   } else {
                  //     return '0个' + '\n' + params.percent + '%'
                  //   }
                  // }
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            });
          }
        });
        myChart.setOption(option);
      });


    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
.chart {
    width: 900px;
    margin: 0 auto;

    .chart-box {
        min-height: 400px;
    }
}
</style>