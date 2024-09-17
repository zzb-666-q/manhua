<template>
  <div class="home">
    <div class="homeBanner">
      <el-carousel :interval="3000" type="card" height="370px">
        <el-carousel-item v-for="(item, i) in banners" :key="i">
          <img
            :src="item.img"
            alt=""
            @click="getId(item.jump_value.match(reg)[0])"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="home-classifys">
      <div class="home-classifys-list">
        <div
          class="home-classifys-list-item"
          v-for="(item, i) in classifys"
          :key="i"
          @click="goClassify(item.id)"
        >
          {{ item.name }}
        </div>
        <div class="home-classifys-list-item" @click="goClassify(-1)">全部</div>
      </div>
    </div>
    <div class="home-commend">
      <h2>为你推荐</h2>
      <comicList :list.sync="commend"></comicList>
    </div>
    <div class="home-hot">
      <div class="home-hot-top">
        <div class="home-hot-top-left">
          <div class="hot-top-title">
            <h2>热门速递</h2>
          </div>
          <div class="hot-top-list">
            <div
              class="hot-top-list-item"
              v-for="(item, i) in hot"
              :key="i"
              @click="active(i, item.id)"
              :class="activeIndex === i ? 'active' : 'hot-top-list-item'"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="home-hot-top-right">
          <el-row>
            <el-button
              type="primary"
              icon="el-icon-refresh"
              round
              plain
              @click="changeHotlist"
              >换一批</el-button
            >
          </el-row>
        </div>
      </div>
      <comicList :list.sync="hotlist"></comicList>
    </div>

    <!-- 玄幻 -->
    <div class="home-classify">
      <div class="home-classify-top">
        <div class="home-classify-top-left">
          <div class="classify-top-title">
            <h2>玄幻</h2>
          </div>
        </div>
        <div class="home-classify-top-right">
          <el-row>
            <el-button type="primary" round plain @click="goClassify(-1)"
              >更多<i class="el-icon-arrow-right"></i
            ></el-button>
          </el-row>
        </div>
      </div>
      <comicList :list.sync="fantasy"></comicList>
    </div>
    <!-- 武侠仙侠 -->
    <div class="home-classify">
      <div class="home-classify-top">
        <div class="home-classify-top-left">
          <div class="classify-top-title">
            <h2>武侠仙侠</h2>
          </div>
        </div>
        <div class="home-classify-top-right">
          <el-row>
            <el-button type="primary" round plain @click="goClassify(-1)(-1)"
              >更多<i class="el-icon-arrow-right"></i
            ></el-button>
          </el-row>
        </div>
      </div>
      <comicList :list.sync="martialArts"></comicList>
    </div>
    <!-- 都市生活 -->
    <div class="home-classify">
      <div class="home-classify-top">
        <div class="home-classify-top-left">
          <div class="classify-top-title">
            <h2>都市生活</h2>
          </div>
        </div>
        <div class="home-classify-top-right">
          <el-row>
            <el-button type="primary" round plain @click="goClassify(-1)"
              >更多<i class="el-icon-arrow-right"></i
            ></el-button>
          </el-row>
        </div>
      </div>
      <comicList :list.sync="urban"></comicList>
    </div>
  </div>
</template>

<script>
import {
  getBanner,
  getClassify,
  getCommend,
  getHotlist,
  ClassPage,
} from "@/api/comics";
export default {
  name: "home",
  data() {
    return {
      activeIndex: 0,
      //轮播图
      banners: [],
      classifys: [],
      commend: [],
      hot: [
        {
          type: 3,
          id: 1012,
          name: "今日热门速递",
          color: "",
        },
        {
          type: 3,
          id: 1023,
          name: "前方在线炒股！",
          color: "",
        },
        {
          type: 3,
          id: 1035,
          name: "征服，异世界！",
          color: "",
        },
      ],
      hotlist: [],
      //页码
      pageNum: 1,
      titlelist: [
        {
          id: 1016,
          name: "玄幻",
        },
        {
          id: 1092,
          name: "武侠仙侠",
        },
        {
          id: 1002,
          name: "都市生活",
        },
      ],
      //都市
      urban: [],
      //玄幻
      fantasy: [],
      //武侠
      martialArts: [],
      reg: /\d{5}/gi,
    };
  },
  created() {
    this.bannerlist();
    this.getClassify();
    this.getCommend();
    this.getHotlist(1012, this.pageNum, 10);
    this.getClassifyList(this.titlelist[0].id, this.pageNum, 11);
    this.getClassifyList(this.titlelist[1].id, this.pageNum, 10);
    this.getClassifyList(this.titlelist[2].id, this.pageNum, 11);
  },

  methods: {
    //获取轮播图
    bannerlist() {
      getBanner()
        .then((result) => {
          // console.log("result.data==>", result.data);
          this.banners = result.data;
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },
    //获取分类列表
    getClassify() {
      getClassify()
        .then((result) => {
          this.classifys = result.data.styles;
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },
    //获取为你推荐列表
    getCommend() {
      getCommend()
        .then((result) => {
          // console.log("result.data.list==>", result.data.list);
          this.commend = result.data.list;
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },
    //热门速递列表
    getHotlist(id, pageNum, pageSize) {
      let params = {
        id,
        pageNum,
        pageSize,
        isAll: 1,
      };
      getHotlist(params)
        .then((result) => {
          this.hotlist = result.data.roll_six_comics;
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },
    //点击跳转
    active(i, id) {
      this.activeIndex = i;
      this.getHotlist(id, 1, 10);
      this.pageNum = 1;
    },
    //点击换一批
    changeHotlist() {
      this.pageNum++;
      if (this.pageNum > 6) {
        this.pageNum = 1;
      }
      let i = this.activeIndex;
      let id = this.hot[i].id;
      this.getHotlist(id, this.pageNum, 10);
    },
    //获取都市，玄幻等的列表
    getClassifyList(styleId, pageNum, pageSize) {
      let params = {
        styleId,
        pageNum,
        pageSize,
      };
      ClassPage(params)
        .then((result) => {
          if (styleId === 1016) {
            this.fantasy = result.data;
          }
          if (styleId === 1092) {
            this.martialArts = result.data;
          }
          if (styleId === 1002) {
            this.urban = result.data;
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },
    //传递漫画的id
    getId(comicId) {
      this.$router.push({ name: "cartoondetail", params: { comicId } });
    },
    //前往分类页面
    goClassify(styleId) {
      this.$router.push({ name: "classify" });
      if (styleId) {
        this.$store.commit("setClassID", styleId);
      } 
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;

  .homeBanner {
    margin-top: 20px;

    .el-carousel {
      z-index: 0;
    }
  }

  .home-classifys {
    width: 100%;
    background-color: rgb(86, 83, 83);

    .home-classifys-list {
      width: 80%;
      height: 50px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      /* padding-left: 10px;
       overflow: scroll;*/
      overflow-x: auto;
      overflow-y: hidden;
      flex-direction: space-between;

      .home-classifys-list-item {
        color: #fff;
        display: inline-block;
        padding: 15px;
        flex-shrink: 0;
      }
    }
    v-deep ::-webkit-scrollbar {
      width: 4px;
      height: 1px;
      color: #000;
    }
  }

  .home-commend {
    width: 80%;
    margin: 0 auto;
    margin-top: 50px;

    h2 {
      margin-bottom: 20px;
    }

    .home-commend-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .home-commend-list-item {
        width: 19%;
        margin-right: 1.25%;
        margin-bottom: 10px;
        &:nth-child(5n) {
          margin-right: 0;
        }
        .home-commend-list-item-img {
          width: 100%;

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

      .home-commend-list-item:nth-child(5n) {
        margin-right: 0;
      }
    }
  }

  .home-hot {
    width: 80%;
    margin: 0 auto;
    margin-top: 50px;

    .home-hot-top {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 20px;

      .home-hot-top-left {
        width: 90%;
        display: flex;

        .hot-top-title {
          margin-right: 20px;
        }

        .hot-top-list {
          display: flex;
          align-items: center;

          .hot-top-list-item {
            margin-right: 25px;
            /* .text_overflow; */
          }
        }
      }

      .home-hot-top-right {
        width: 10%;
      }
    }

    .home-hot-list {
      width: 100%;
      display: flex;

      flex-wrap: wrap;

      .home-hot-list-item {
        width: 19%;
        margin-right: 1.25%;
        margin-bottom: 10px;
        &:nth-child(5n) {
          margin-right: 0;
        }

        .home-hot-list-item-img {
          width: 100%;

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

      .home-hot-list-item:nth-child(5n) {
        margin-right: 0;
      }
    }
  }

  .home-classify {
    width: 80%;
    margin: 0 auto;
    margin-top: 50px;

    .home-classify-top {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 20px;

      .home-classify-top-left {
        width: 90%;
      }

      .home-classify-top-right {
        width: 10%;
      }
    }

    .home-classify-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .home-classify-list-item {
        width: 19%;
        margin-right: 1.25%;
        margin-bottom: 10px;
        &:nth-child(5n) {
          margin-right: 0;
        }
        // .text_overflow(2);

        .home-classify-list-item-img {
          width: 100%;

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

      .home-classify-list-item:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}

/* ::--webkit-scrollbar {
   width: 4px;
   height: 1px;
   color: #000;
   display:none;
 }
 ::--webkit-scrollbar-thumb {
   border-radius: 5px;
   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
   background: rgba(0, 0, 0, 0.2);
 }*/
.el-carousel__item {
  img {
    width: 100%;
    height: 100%;
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.active {
  color: red;
}
</style>
