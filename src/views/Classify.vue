<template>
  <div class="classify">
    <div class="classify-top">
      <div
        class="classify-top-list"
        v-for="(items, index) in classifys"
        :key="index"
        :class="items.type"
      >
        <div class="classify-top-list-item a1">
          {{ index === 0 ? "题材" : "" }}{{ index === 1 ? "地区" : ""
          }}{{ index === 2 ? "进度" : "" }}{{ index === 3 ? "排序" : ""
          }}{{ index === 4 ? "收费" : "" }}
        </div>
        <div
          class="classify-top-list-item"
          v-for="(item, i) in items.list"
          :key="i"
          @click="activeCondition(items.type, item.id, '', $event)"
          :class="{ active: i === 0 }"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="classify-result">
      <comicList :list.sync="classifyResult"></comicList>
    </div>
    <div class="empty">
      <el-empty
        v-if="classifyResult.length == 0"
        description="暂无数据"
      ></el-empty>
    </div>
    <pagination
      align="center"
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getClassPage"
    />
  </div>
</template>

<script>
import { ClassPage, getClassify } from "@/api/comics";
export default {
  name: "classify",
  data() {
    return {
      classifys: [],
      xuan: [],
      classifyResult: [],
      pageSize: 39,
      total: 100,
      classifyslist: [],
      queryParams: {
        styleId: "",
        areaId: "",
        isFinish: "",
        order: "",
        isFree: "",
        pageNum: 1,
        pageSize: 10,
      },
      classID: this.$store.state.classID ? this.$store.state.classID : -1,
    };
  },
  watch: {
    getclassID(newVal, oldVal) {
      if (newVal != oldVal) {
        this.queryParams.styleId = newVal;
        this.activeCondition("styles", this.queryParams.styleId);
      }
    },
  },
  computed: {
    getclassID() {
      return this.$store.state.classID;
    },
  },
  created() {},

  async mounted() {
    this.getClassPage();
    let list = await this.getClassify();
    this.queryParams.styleId = this.classID;
    if (this.queryParams.styleId != -1) {
      this.activeCondition("styles", this.queryParams.styleId, list);
    }
  },

  methods: {
    //获取分类列表
    getClassify() {
      return new Promise((resolve, reject) => {
        getClassify().then((result) => {
          let arr = { id: -1, name: "全部" };
          let a = result.data;
          let i = 0;
          for (const key in a) {
            if (key != "orders") {
              a[key].unshift(arr);
            }
            this.classifys.push({ classifysId: i++, type: key, list: a[key] });
          }

          this.classifys.forEach((ele) => {
            if (ele.type == "orders") {
              ele.classifysId = 4;
            }
            if (ele.type == "prices") {
              ele.classifysId = 3;
            }
          });
          resolve(this.classifys);
        });
      });
    },
    //点击切换条件
    activeCondition(type, id, list, event) {
      let active = document.querySelectorAll(
        `.${type}>.classify-top-list-item`
      );
      active.forEach((v) => {
        v.classList.remove("active");
      });
      if (event) {
        event.srcElement.classList.add("active");
      }
      if (list) {
        list[0].list.forEach((ele, i) => {
          if (ele.id == id) {
            active[i + 1].classList.add("active");
            return (this.xuan[type] = id);
          }
        });
      }
      if (this.classifys[0]) {
        this.classifys[0].list.forEach((ele, i) => {
          if (ele.id == id) {
            active[i + 1].classList.add("active");
            return (this.xuan[type] = id);
          }
        });
      }
      if (type) {
        this.xuan[`${type}`] = id;
        this.queryParams.styleId = this.xuan.styles;
        this.queryParams.areaId = this.xuan.areas;
        this.queryParams.isFinish = this.xuan.status;
        this.queryParams.isFree = this.xuan.prices;
        this.queryParams.order = this.xuan.orders;
        this.getClassPage(
          this.xuan.styles,
          this.xuan.areas,
          this.xuan.status,
          this.xuan.prices,
          this.xuan.orders
        );
      }
    },
    //分类筛选结果列表
    getClassPage(styleId, areaId, isFinish, isFree, order) {
      this.classifyResult = [];
      ClassPage(this.queryParams).then((res) => {
        this.classifyResult = res.data;
      });
    },
    //传递漫画的id
    getId(comicId) {
      this.$router.push({ name: "cartoondetail", params: { comicId } });
    },
    /** 更多加载 */
    jiazai() {
      this.pageSize += 37;
      this.getClassPage(
        this.xuan.styles,
        this.xuan.areas,
        this.xuan.status,
        this.xuan.prices,
        this.xuan.orders
      );
    },
  },
};
</script>

<style lang="less" scoped>
.classify {
  .classify-top {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 30px;

    .classify-top-list {
      display: flex;
      margin-bottom: 20px;

      .classify-top-list-item {
        cursor: pointer;
        margin-right: 20px;
        &:hover {
          color: #32aaff;
        }
      }

      .a1 {
        color: rgb(184, 187, 187);
        cursor: default;
        &:hover {
          color: rgb(184, 187, 187);
          cursor: default;
        }
      }
    }
  }

  .classify-result {
    width: 80%;
    margin: 0 auto;

    .classify-result-list {
      display: flex;
      flex-wrap: wrap;

      .classify-result-list-item {
        width: 19%;
        margin-right: 1.25%;
        margin-bottom: 30px;
        &:nth-child(5n) {
          margin-right: 0;
        }
        .classify-result-list-item-img {
          width: 100%;

          img {
            width: 100%;
          }
        }

        .text {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 5px;
        }

        .ord {
          font-size: 15px;
          color: rgba(0, 0, 0, 0.34);
        }
      }
    }
  }

  .empty {
    width: 1000px;
    margin: 0 auto;
    text-align: center;

    .el-empty {
      .el-empty__image {
        width: 500px;
      }

      /deep/p {
        font-size: 20px;
      }
    }
  }

  .btn {
    text-align: center;
  }
}

.active {
  color: #32aaff;
}
</style>
