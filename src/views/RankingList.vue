<template>
  <div class="rankinglist">
    <div class="tablist">
      <div class="tablist-lt">
        <div class="lt-list">
          <div
            class="list-item"
            v-for="(item, i) in tablist"
            :key="i"
            :class="activeIndex === i ? 'active' : ''"
            @click="active(i, item.id)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="tablist-rt">
        <h2>
          {{ tablist[activeIndex].name }}
          <span>{{ tablist[activeIndex].description }}</span>
        </h2>
        <div class="rt-list">
          <div
            class="rt-list-item"
            v-for="(item, i) in comiclist"
            :key="i"
            @click="getId(item.comic_id)"
          >
            <div class="rt-list-item-img">
              <img :src="item.vertical_cover" alt="" />
            </div>
            <div class="text">{{ item.title }}</div>
            <div
              class="type"
              v-for="(items, index) in item.styles"
              :key="index"
            >
              {{ items.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getRankInfo } from "@/api/comics";
export default {
  name: "rankinglist",
  data() {
    return {
      activeIndex: 0,
      tablist: [
        {
          id: 7,
          type: 0,
          description: "前7日综合指标最高的三个月内上线漫画作品排行",
          name: "新作榜",
        },
        {
          id: 11,
          type: 0,
          description: "前7日综合指标最高的男性向漫画作品排行",
          name: "男生榜",
        },
        {
          id: 12,
          type: 0,
          description: "前7日综合指标最高的女性向漫画作品排行",
          name: "女生榜",
        },
        {
          id: 1,
          type: 0,
          description: "前7日人气最高的国漫作品排行，每日更新",
          name: "国漫榜",
        },
        {
          id: 0,
          type: 0,
          description: "前7日人气最高的日漫作品排行，每日更新",
          name: "日漫榜",
        },
        {
          id: 2,
          type: 0,
          description: "前7日人气最高的韩漫作品排行，每日更新",
          name: "韩漫榜",
        },
        {
          id: 5,
          type: 0,
          description: "前7日人气最高的官方精选漫画作品排行，每日更新",
          name: "宝藏榜",
        },
        {
          id: 8,
          type: 0,
          description: "前7日人气最高的免费漫画作品排行，每日更新",
          name: "免费榜",
        },
        {
          id: 13,
          type: 2,
          description: "前365日综合指标最高的完结漫画作品排行",
          name: "完结榜",
        },
      ],
      comiclist: [],
    };
  },
  created() {
    this.get(this.tablist[0].id);
  },
  methods: {
    active(i, id) {
      this.activeIndex = i;
      this.get(id);
    },
    //获取排行榜
    get(id) {
      let params = {
        id,
        pageNum: 2,
      };
      getRankInfo(params).then((result) => {
          console.log("result==>", result);
          this.comiclist = result.data.list;
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },
    //传递漫画的id
    getId(comicId) {
      // console.log("comicId ==> ", comicId);
      this.$router.push({ name: "cartoondetail", params: { comicId } });
    },
  },
};
</script>

<style lang="less" scoped>
.rankinglist {
  width: 100%;
  height: 100%;

  .tablist {
    width: 80%;
    margin: 0 auto;
    display: flex;
    .tablist-lt {
      width: 18.75%;
      // width: 300px;
      height: 610px;
      // padding-right: 50px;
      border-right: 1px solid #000;
      .lt-list {
        width: 100px;
        .list-item {
          height: 50px;
          line-height: 50px;
          margin-bottom: 20px;
        }
      }
      .active {
        color: #32aaff;
      }
    }
    .tablist-rt {
      // width: 81.25%;
      padding-left: 30px;
      h2 {
        margin-bottom: 50px;
        span {
          font-size: 20px;
          color: rgb(174, 170, 170);
        }
      }
      .rt-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .rt-list-item {
          width: 19%;
          margin-right: 1.25%;
          // width: 250px;
          // margin-right: 20px;
          margin-bottom: 20px;
          &:nth-child(5n) {
            margin-right: 0;
          }
          .rt-list-item-img {
            width: 100%;
          }
          .text {
            .text_overflow;
            margin-bottom: 10px;
          }
          .type {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
  }
}
</style>
