<template>
  <div class="renew">
    <h1 style="margin-bottom: 20px;">更新</h1>

    <!-- <div id="operationTimeSettingChartPieBox" class="chart-box"></div>
    <span>手术时长与各维度相关性分析</span>
    <div id="operationTimeSettingChartBarBox" class="chart-box"></div>
    <span>单一维度平均手术时长分析</span> -->

    <!-- <div class="chart" style="width:900px">
      <div id="container" class="chart-box"></div>
    </div> -->
    <pieLineChart/>
    <!-- <lineChart/> -->
    <SketchingAnimation/>
  </div>
</template>

<script>

import relationship from './relationship';
import pieLineChart from '@/views/echart/pieLineChart';
import lineChart from '@/views/echart/lineChart';
import SketchingAnimation from '@/views/echart/SketchingAnimation';


export default {
  name: "renew",
  // 注册组件
  components: {
    relationship,
    pieLineChart,
    lineChart,
    SketchingAnimation
  },
  data() {
    return {
      chartBar: null, // 柱状图
      chartPie: null, // 饼图
      // 手术时长预测数据
      operationTimeData: {
        title: '',
        // table 数据
        tableData: [{
          gender: '男',
          age: '16',
          doctor: '李阳',
          time: '2小时30分钟'
        }, {
          gender: '男',
          age: '23',
          doctor: '郑多芬',
          time: '2小时15分钟'
        }, {
          gender: '女',
          age: '16',
          doctor: '张洋',
          time: '2小时20分钟'
        }, {
          gender: '男',
          age: '42',
          doctor: '张洋',
          time: '2小时05分钟'
        }, {
          gender: '女',
          age: '67',
          doctor: '李阳',
          time: '2小时30分钟'
        },
        {
          gender: '男',
          age: '72',
          doctor: '李阳',
          time: '2小时30分钟'
        }]
      },
      // 图表数据
      textDate: {
        chartPie: [
          {
            legend: {
              top: 'bottom',
              data: [{ value: 335, name: '性别' },
              { value: 335, name: '年龄分段' },
              { value: 335, name: '手术医生' }]
            },
            data: [
              { value: 0.22, name: '性别' },
              { value: 0.38, name: '年龄分段' },
              { value: 0.5, name: '手术医生' }
            ]
          }
        ],
        chartBar: [
          {
            xAxis: {
              type: 'category',
              data: ['男', '女']
            },
            data: [{
              value: 2.3,
              type: 'bar',
              itemStyle: {
                normal: { color: '#409eff' }
              }
            }, {
              value: 3,
              type: 'bar',
              itemStyle: {
                normal: { color: '#f56c6c' }
              }
            }]
          },
          {
            xAxis: {
              type: 'category',
              data: ['未成年', '成年', '老年']
            },
            data: [{
              value: 2.3,
              type: 'bar',
              itemStyle: {
                normal: { color: '#379057' }
              }
            }, {
              value: 3.7,
              type: 'bar',
              itemStyle: {
                normal: { color: '#3c6287' }
              }
            }, {
              value: 1.2,
              type: 'bar',
              itemStyle: {
                normal: { color: '#f56c6c' }
              }
            }]
          },
          {
            xAxis: {
              type: 'category',
              data: ['李阳', '郑多芬', '张洋', '李维', '李维2', '李维3', '李维4', '李维5', '李维6', '李维7']
            },
            data: [{
              value: 19.09,
              type: 'bar',
              itemStyle: {
                normal: { color: '#bcc531' }
              }
            }, {
              value: 2.7,
              type: 'bar',
              itemStyle: {
                normal: { color: '#f56c7c' }
              }
            }, {
              value: 3.1,
              type: 'bar',
              itemStyle: {
                normal: { color: '#f56c8c' }
              }
            }, {
              value: 2.5,
              type: 'bar',
              itemStyle: {
                normal: { color: '#f56c9c' }
              }
            }, {
              value: 2.5,
              type: 'bar',
              itemStyle: {
                normal: { color: '#f56c9c' }
              }
            }, {
              value: 2.5,
              type: 'bar',
              itemStyle: {
                normal: { color: '#f56c9c' }
              }
            }, {
              value: 2.5,
              type: 'bar',
              itemStyle: {
                normal: { color: '#f56c9c' }
              }
            }, {
              value: 2.5,
              type: 'bar',
              itemStyle: {
                normal: { color: '#f56c9c' }
              }
            }, {
              value: 2.5,
              type: 'bar',
              itemStyle: {
                normal: { color: '#f56c9c' }
              }
            }, {
              value: 2.5,
              type: 'bar',
              itemStyle: {
                normal: { color: '#f56c9c' }
              }
            }]
          }]
      }
    }
  },
  mounted() {
    // 初始化图表
    // this.initChartPie()
    // this.initChartBar(this.textDate.chartBar[2])
    // this.initttt();
    const formatInt = (num, prec = 2, ceil = true) => {
      const len = String(num).length;
      if (len <= prec) { return num };
      const mult = Math.pow(10, prec);
      return ceil ?
        Math.ceil(num / mult) * mult :
        Math.floor(num / mult) * mult;
    }
    console.log(`output->formatInt(101, 2, true)`, formatInt(101, 2, true));
    this.switchDate();
  },
  activated() {
    if (this.chartBar) {
      this.chartBar.resize()
    }
    if (this.chartPie) {
      this.chartPie.resize()
    }
  },
  methods: {
    //switch基础用法
    switchDate() {
      var d = new Date().getDay();
      let x;
      switch (d) {
        case 0: x = "今天是星期日";
          break;
        case 1: x = "今天是星期一";
          break;
        case 2: x = "今天是星期二";
          break;
        case 3: x = "今天是星期三";
          break;
        case 4: x = "今天是星期四";
          break;
        case 5: x = "今天是星期五";
          break;
        case 6: x = "今天是星期六";
          break;
      }
      console.log(`output->x`, x);
      let value;
      switch ('name') {
        case 'name': value = '开始';
          break;
        default: value = '结束'
          break;
      }
      console.log(`output->value`, value)
    },
    // 饼状图
    initChartPie() {
      var option = {
        tooltip: {
          trigger: 'item'
          // formatter: '{b}:{d}'
          // formatter:function (params) {
          //   console.log(123,params);
          //   return params;
          // }
        },
        // 图例设定
        legend: {
          top: 'bottom',
          formatter: function (name) {
            return name
          },
          data: [{ name: '性别' },
          { name: '年龄分段' },
          { name: '手术医生' }]
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        // 数据
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            labelLine: {// 设置延长线的长度
              normal: {
                length: 5 // 设置延长线的长度
                // length2: 10,//设置第二段延长线的长度
              }
            },
            label: {
              normal: {
                // formatter: '{d}%, {c} \n\n',
                formatter: '{per|{b}}({c|{c}})\n{hr|}\n{a|}', // 这里最后另一行设置了一个空数据是为了能让延长线与hr线对接起来
                padding: [0, -10], // 取消hr线跟延长线之间的间隙
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 20, // 设置最后一行空数据高度，为了能让延长线与hr线对接起来
                    align: 'center'
                  },
                  hr: {// 设置hr是为了让中间线能够自适应长度
                    borderColor: 'auto', // hr的颜色为auto时候会主动显示颜色的
                    width: '105%',
                    borderWidth: 0.5,
                    height: 0.5
                  },
                  per: {// 用百分比数据来调整下数字位置，显的好看些。如果不设置，formatter最后一行的空数据就不需要
                    padding: [4, 0]
                  }
                }
              }
            },
            data: [
              {
                value: 0.22,
                name: '性别',
                itemStyle: {
                  normal: { color: '#409eff' }
                }
              },
              {
                value: 0.38,
                name: '年龄分段',
                itemStyle: {
                  normal: { color: '#379057' }
                }
              },
              {
                value: 0.5,
                name: '手术医生',
                itemStyle: {
                  normal: { color: '#bcc531' }
                }
              }
            ].sort(function (a, b) { return a.value - b.value }),
            roseType: 'radius',
            // label: {
            //   color: 'rgba(255, 255, 255, 0.3)'
            // },
            // labelLine: {
            //   lineStyle: {
            //     color: 'rgba(255, 255, 255, 0.3)'
            //   },
            //   smooth: 0.2,
            //   length: 10,
            //   length2: 20
            // },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
          }
        ]
      }
      this.chartPie = echarts.init(document.getElementById('operationTimeSettingChartPieBox'))
      this.chartPie.setOption(option)
      // 事件处理 联动柱状图
      this.chartPie.on('click', (params) => {
        console.log(params, 123)
        switch (params.name) {
          case '手术医生':
            this.initChartBar(this.textDate.chartBar[2])
            break
          case '年龄分段':
            this.initChartBar(this.textDate.chartBar[1])
            break
          case '性别':
            this.initChartBar(this.textDate.chartBar[0])
            break
          default:
            break
        }
      })
      window.addEventListener('resize', () => {
        this.chartPie.resize()
      })
    },
    // 柱状图
    initChartBar(params) {
      var option = {
        tooltip: {
          trigger: 'item'
        },
        // 处理刻度名过长
        grid: {
          containLabel: true
        },
        // 滚动条设定
        dataZoom: [
          {
            show: false,
            realtime: true,
            start: 0,
            zoomLock: true, // 禁止缩放
            end: 50
          },
          {
            type: 'inside',
            realtime: true,
            zoomLock: true,
            start: 0,
            end: 50
          }
        ],
        xAxis: params.xAxis,
        yAxis: {
          type: 'value',
          // 刻度格式化
          axisLabel: { formatter: '{value} 小时' }
        },
        series: [{
          data: params.data,
          type: 'bar'
        }]
      }
      // 超过设定条数显示滚动条
      if (option.xAxis.data.length > 5) {
        option.dataZoom[0].show = true
        // 滚动条比例
        var end = Math.floor(5 / option.xAxis.data.length * 100)
        console.log(end)
        option.dataZoom[0].end = end
        option.dataZoom[1].end = end
      }
      this.chartBar = echarts.init(document.getElementById('operationTimeSettingChartBarBox'))
      this.chartBar.setOption(option)
      window.addEventListener('resize', () => {
        this.chartBar.resize()
      })
    },

    initttt() {
      var dom = document.getElementById("container");
      var myChart = echarts.init(dom);
      var app = {};
      var option = null;
      option = {
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: false
        },
        dataset: {
          source: [
            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
          ]
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          gridIndex: 0
        },
        grid: {
          top: '55%'
        },
        series: [{
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row'
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row'
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row'
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row'
        },
        {
          type: 'pie',
          id: 'pie',
          radius: '30%',
          // center: ['50%', '25%'],
          center: ['10%', '50%'],

          label: {
            formatter: '{b}: {@2012} ({d}%)'
          },
          encode: {
            itemName: 'product',
            value: '2012',
            tooltip: '2012'
          }
        }
        ]
      };
      myChart.on('updateAxisPointer', function (event) {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          var dimension = xAxisInfo.value + 1;
          myChart.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
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
    }
  }



};
</script>

<style lang="less" scoped>
.renew {
  width: 100%;
  height: 100%;
  text-align: center;
}

.chart-box {
  min-height: 400px;
}
</style>