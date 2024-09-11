<template>
  <div class="comicsearch">
    <div class="search-top">
      <div class="val">
        <span class="keyword">"{{ val }}"</span>的搜索结果
      </div>
    </div>
    <div class="searchlist">
      <div class="searchlist-item" v-for="(item, i) in searchlist" :key="i">
        <div class="item-img" @click="getId(item.id)">
          <img :src="item.vertical_cover" alt="" />
        </div>
        <div class="item-text">
          <div class="title" v-html="item.title" @click="getId(item.id)"></div>
          <div class="author_name">
            <div class="author" v-for="(items, v) in item.author_name" :key="v" v-html="items"></div>
          </div>
          <div class="styles">{{ item.styles[0] }}</div>
          <div class="Serial">
            {{ item.is_finish == 0 ? "连载中" : "已完结" }}
          </div>
        </div>
      </div>
    </div>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize" @pagination="comicSearch" />
  </div>
</template>

<script>
import { comicSearch } from "@/api/comics";

export default {
  name: "comicsearch",
  data() {
    return {
      searchlist: [],
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        keyWord: '斗罗'
      },
    };
  },
  created() {
    this.val = this.$route.params.val;
    let comicSearch = JSON.parse(localStorage.getItem("comicSearch"));
    if (!this.val) {
      this.val = comicSearch.val;
    }
    this.queryParams.keyWord = this.val;

    // this.comicSearch(this.val);
    this.comicSearch();
  },
  methods: {
    //漫画搜索
    comicSearch() {
      comicSearch(this.queryParams).then(res => {
        this.searchlist = res.data.list;
        this.total = res.data.total_num
      })
    },
    //传递漫画的id
    getId(comicId) {
      this.$router.push({ name: "cartoondetail", params: { comicId } });
    },
  },
};
</script>

<style lang="less" scoped>
.comicsearch {
  width: 100%;
  height: 100%;

  .search-top {
    width: 1600px;
    margin: 0 auto;
    margin-bottom: 50px;
  }

  .searchlist {
    width: 1600px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;

    .searchlist-item {
      width: 500px;
      display: flex;
      margin-right: 20px;
      margin-bottom: 20px;

      .item-img {
        margin-right: 20px;

        img {
          width: 180px;
          height: 240px;
        }
      }

      .item-text {
        width: 300px;
        position: relative;

        .title {
          width: 300px;
          font-size: 25px;
          margin-top: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .author_name {
          width: 300px;
          display: flex;
          height: 50px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          position: absolute;
          bottom: 50px;

          .author {
            margin-right: 10px;
            font-size: 18px;
            color: rgba(0, 0, 0, 0.3);
          }
        }

        .styles {
          position: absolute;
          bottom: 32px;
          margin-bottom: 10px;
          font-size: 18px;
          color: rgba(0, 0, 0, 0.3);
        }

        .Serial {
          position: absolute;
          bottom: 10px;
          font-size: 18px;
          color: rgba(0, 0, 0, 0.3);
        }
      }

      &:last-child {
        display: none;
      }
    }
  }
}
</style>