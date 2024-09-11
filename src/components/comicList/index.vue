<template>
    <div class="comic-classify">
        <!-- <div class="comic-classify-top">
            <div class="comic-classify-top-left">
                <div class="classify-top-title">
                    <h2>{{ title }}</h2>
                </div>
            </div>
            <div class="comic-classify-top-right">
                <el-row>
                    <el-button type="primary" round plain @click="goClassify">更多<i
                            class="el-icon-arrow-right"></i></el-button>
                </el-row>
            </div>
        </div> -->

        <div class="comic-classify-list">
            <div class="comic-classify-list-item" v-for="(item, i) in list" :key="i" @click="getId(item.comic_id)">
                <div class="comic-classify-list-item-img">
                    <img :src="item.vertical_cover" alt="" />
                </div>
                <div class="text">{{ item.title }}</div>
                <div class="type" v-if="item.is_finish == null">
                    <div  v-if="item.sub_title">更新至&nbsp;&nbsp;{{ item.sub_title }}&nbsp;话</div>
                    <div  v-if="item.total">更新至&nbsp;&nbsp;{{ item.total }}&nbsp;话</div>
                </div>
                <div class="type" v-else>
                    {{ item.is_finish == 0 ? "更新至" : "[完结] 共" }}
                    {{ item.last_ord }} 话
                </div>

            </div>
            <div class="comic-classify-list-item" v-for="(item, i) in 5 - (list.length % 5)"></div>
        </div>
    </div>
</template>

<script>
export default {
    // 组件名称
    name: 'comicList',
    // 组件参数 接收来自父组件的数据
    props: {
        //标题
        title: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper'
        },
        pagerCount: {
            type: Number,
            default: document.body.clientWidth < 992 ? 5 : 7
        },
        list: {
            type: Array,
        },

        background: {
            type: Boolean,
            default: true
        },
    },
    // 局部注册的组件
    components: {},
    // 组件状态值
    data() {
        return {

        }
    },
    // 计算属性
    computed: {},
    // 侦听器
    watch: {},
    // 组件方法
    methods: {
        //传递漫画的id
        getId(comicId) {
            // console.log("comicId ==> ", comicId);
            // console.log("this.list ==> ", this.list);
            this.$router.push({ name: "cartoondetail", params: { comicId } });
        },
    },
    // 以下是生命周期钩子   注：没用到的钩子请自行删除
    /**
    * 在实例初始化之后，组件属性计算之前，如data属性等
    */
    beforeCreate() {
    },
    /**
    * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
    */
    created() {
    },
    /**
    * 在挂载开始之前被调用：相关的 render 函数首次被调用。
    */
    beforeMount() {
    },
    /**
    * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
    * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
    */
    mounted() {
    },
    /**
    * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
    * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
    */
    beforeUpdate() {
    },
    /**
    * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
    * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
    */
    updated() {
    },
    /**
    * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
    */
    activated() {
    },
    /**
    * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
    */
    deactivated() {
    },
    /**
    * 实例销毁之前调用。在这一步，实例仍然完全可用。
    */
    beforeDestroy() {
    },
    /**
    * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
    * 所有的事件监听器会被移除，所有的子实例也会被销毁。
    */
    destroyed() {
    }
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style lang="less" scoped>
.comic-classify {
    width: 100%;
    // margin: 0 auto;

    .comic-classify-top {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 20px;

        .comic-classify-top-left {
            width: 90%;
        }

        .comic-classify-top-right {
            width: 10%;
        }
    }

    .comic-classify-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;


        .comic-classify-list-item {
            width: 18%;
            //margin-right: 1.25%;
            margin-bottom: 10px;

            // &:nth-child(5n) {
            //   margin-right: 0;
            //}

            .text_overflow(2);


            .comic-classify-list-item-img {
                width: 100%;
                margin-bottom: 10px;

                img {
                    width: 100%;
                }
            }

            .text {
                .text_overflow;

            }

            .type {
                margin-top: 6px;
                font-size: 15px;
                color: #999;
                .text_overflow;

            }
        }

        .comic-classify-list-item:nth-child(5n) {
            margin-right: 0;
        }
    }
}
</style>
