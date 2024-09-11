<!--  -->
<template>
  <div>
    <div id="main" style="width:100%;height:500px"></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import * as echarts from 'echarts';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {

    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    init() {
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          // text: "流程",
        },
        series: [
          {
            type: 'graph', //关系图
            layout: 'none', // 图的布局 'none' 不采用任何布局，使用节点中提供的 x， y 作为节点的位置。
            // 'circular' 采用环形布局;'force' 采用力引导布局.
            symbolSize: 100,
            roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            color: '#6A5ACD',
            label: {
              // 关系对象上的标签
              show: true, // 是否显示标签
              fontSize: 16, // 文本样式
              color: '#FFF'
              //backgroundColor:'white'
            },
            symbol: 'roundRect', //形状
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10], // 关系图节点标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [4, 10] 表示标记宽为4，高为10。
            edgeLabel: {
              // 连接两个关系对象的线上的标签
              fontSize: 25
            },
            // 图
            data: [
              {
                name: 'A',
                x: 100,
                y: 100
              },
              {
                name: 'B',
                x: 450,
                y: 100,
                tooltip: {
                  //鼠标悬停在节点上时显示的内容
                  show: true,
                  position: 'right', //标签位置
                  textStyle: {
                    width: 20
                  },
                  formatter: function (params) {
                    //formatter这个参数是用来设置鼠标悬停时显示的内容的。
                    return params.dataType == 'node' ? '鼠标悬停的显示的内容' : '';
                  }
                }
              },
              {
                name: 'C',
                x: 800,
                y: 100
              },
              {
                name: 'D',
                x: 450,
                y: 450
              },
              {
                name: 'E',
                x: 100,
                y: 800
              },
              {
                name: 'F',
                x: 450,
                y: 800
              },
              {
                name: 'G',
                x: 800,
                y: 800
              }
            ],
            // 线
            links: [
              {
                source: 'A',
                target: 'D',
                lineStyle: {
                  color: '#473C8B',
                  width: 3
                }
              },
              {
                source: 'B',
                target: 'D',
                lineStyle: {
                  color: '#473C8B',
                  width: 3
                },
                label: {
                  //线上面显示内容
                  show: true,
                  position: 'middle',
                  formatter: '有疑问',
                  fontSize: 15
                }
              },
              {
                source: 'C',
                target: 'D',
                lineStyle: {
                  color: '#473C8B',
                  width: 3
                },
                label: {
                  show: true,
                  position: 'middle',
                  formatter: '完成',
                  fontSize: 15
                }
              },
              {
                source: 'F',
                target: 'D',
                lineStyle: {
                  color: '#473C8B',
                  width: 3
                }
              },
              {
                source: 'G',
                target: 'D',
                lineStyle: {
                  color: '#473C8B',
                  width: 3
                }
              },
              {
                source: 'E',
                target: 'D',
                lineStyle: {
                  color: '#473C8B',
                  width: 3
                }
              },
              {
                source: 'E',
                target: 'D',
                lineStyle: {
                  color: '#473C8B',
                  width: 3
                }
              }
            ]
          }
        ]
      };

      myChart.setOption(option);

    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init();

  },
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

</style>