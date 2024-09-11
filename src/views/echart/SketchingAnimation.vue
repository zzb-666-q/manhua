<!-- 关键帧描边动画 -->
<template>
    <div class='SketchingAnimation'>
        <h2>关键帧描边动画</h2>
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
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    created() {
        this.draw();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    //方法集合
    methods: {
        draw() {
            var dom = document.getElementById("container");
            var myChart = echarts.init(dom);
            var option;
            setTimeout(() => {
                option = {
                    graphic: {
                        elements: [
                            {
                                type: 'text',
                                left: 'center',
                                top: 'center',
                                style: {
                                    text: 'Apache ECharts',
                                    fontSize: 80,
                                    fontWeight: 'bold',
                                    lineDash: [0, 200],
                                    lineDashOffset: 0,
                                    fill: 'transparent',
                                    stroke: '#000',
                                    lineWidth: 1
                                },
                                keyframeAnimation: {
                                    duration: 3000,
                                    loop: true,
                                    keyframes: [
                                        {
                                            percent: 0.7,
                                            style: {
                                                fill: 'transparent',
                                                lineDashOffset: 200,
                                                lineDash: [200, 0]
                                            }
                                        },
                                        {
                                            // Stop for a while.
                                            percent: 0.8,
                                            style: {
                                                fill: 'transparent'
                                            }
                                        },
                                        {
                                            percent: 1,
                                            style: {
                                                fill: 'black'
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                };

                myChart.setOption(option);
            }, 50);
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
    // background-color: red;

    .chart-box {
        min-height: 400px;
    }
}
</style>