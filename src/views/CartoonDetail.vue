<template>
  <div class="cartoondetail">
    <div class="cartoondetail-content">
      <div class="cartoondetail-detail">
        <div class="detail-lt">
          <div class="lt-img">
            <img :src="details.vertical_cover" alt="" />
          </div>
        </div>
        <div class="detail-rt">
          <div class="rt-title">
            <h1>{{ details.title }}</h1>
          </div>
          <div class="rt-author">{{ author }}</div>
          <div class="rt-style" v-if="styles">
            <i class="el-icon-price-tag"></i>&nbsp;{{ styles }}
          </div>
          <div class="rt-total" v-if="details.total">
            <i class="el-icon-notebook-1"></i>&nbsp;更新至
            {{ details.total }} 话
          </div>
          <div class="rt-time">
            <i class="el-icon-date"></i>&nbsp;{{ details.renewal_time }}
          </div>
          <div class="rt-synopsis">{{ details.evaluate }}</div>
          <div class="rt-button">
            <!-- <div>开始阅读 第一话</div>
          <div><i class="el-icon-star-off"></i> 追漫</div> -->

            <el-button
              type="primary"
              @click="
                getId(
                  comicId,
                  chapterlist[0][0].id,
                  chapterlist[0][0].short_title,
                  chapterlist[0][0].title
                )
              "
              >开始阅读 第一话</el-button
            >
            <div class="btn" @click="getCollection">
              <i
                class="el-icon-star-off"
                :class="collection ? 'el-icon-star-on' : 'el-icon-star-off'"
              ></i>
              追漫
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cartoondetail-chapter">
      <div class="chapterlist">
        <div class="chapterlist-lt">
          <div class="chapter1">
            <h2>章节列表</h2>
            <div class="chapter-btnlist">
              <div class="chapter-btn" v-for="(item, i) in chapterNum" :key="i">
                <div
                  class="btn"
                  :class="activeBtn === i ? 'active' : 'btn'"
                  @click="active(i)"
                >
                  {{ item.start }}-{{ item.end }}
                </div>
              </div>
            </div>
            <div class="chapter-list">
              <div
                class="chapter-list-item"
                v-for="(items, v) in chapterlist[activeBtn]"
                :key="v"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="items.short_title + ' ' + items.title"
                  placement="top-start"
                >
                  <div
                    class="chapter-list-item-text"
                    @click="
                      getId(comicId, items.id, items.short_title, items.title)
                    "
                  >
                    {{ items.short_title }}&nbsp; {{ items.title }}
                  </div>
                </el-tooltip>
                <div class="chapter-list-item-lock" v-if="items.is_locked">
                  <i class="el-icon-lock"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="chapterlist-comment">
            <h2>评论</h2>
            <div class="comment-top">
              <div class="comment-top-lt">
                <img
                  src="https://static.hdslb.com/images/member/noface.gif"
                  alt=""
                />
              </div>
              <div class="comment-top-cnt">
                <div>
                  请先&nbsp;<el-button type="primary">登录</el-button
                  >&nbsp;&nbsp;后发表评论 (・ω・)
                </div>
              </div>
              <div class="comment-top-rt">发表评论</div>
            </div>
            <div class="comment-cnt">
              <div class="comment-cnt-list">
                <div
                  class="comment-cnt-list-item"
                  v-for="(item, i) in comment"
                  :key="i"
                >
                  <div class="item-lt">
                    <img :src="item.member.avatar" alt="" />
                  </div>
                  <div class="item-rt">
                    <div class="username">{{ item.member.uname }}</div>
                    <div class="text">{{ item.content.message }}</div>
                    <div class="time">{{ parseTime(item.ctime) }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="1000"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="chapterlist-rt">
          <div class="rt-top">
            <div>
              <h2>更多推荐</h2>
            </div>
            <div>
              <el-button type="primary" round plain @click="goClassify"
                >更多<i class="el-icon-arrow-right"></i
              ></el-button>
            </div>
          </div>
          <div class="rt-list">
            <div
              class="rt-list-item"
              v-for="(item, i) in recomm"
              :key="i"
              v-if="i < 5"
            >
              <div class="item-img" @click="changeId(item.id)">
                <img :src="item.vertical_cover" alt="" />
              </div>
              <div class="item-text">
                <div class="title">{{ item.title }}</div>
                <!-- <div class="titl">{{ item.authors[0].cname }}</div> -->
                <!-- <div class="titl">{{ item.styles[0].name }}</div> -->
                <div class="titl">更新至第 {{ item.total }} 话</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getComicDetail, getRecomm, getReplyMain } from "@/api/comics";
export default {
  name: "cartoondetail",
  data() {
    return {
      //收藏
      collection: false,
      //漫画详情
      details: [],
      //作者
      author: "",
      //漫画类型
      styles: "",
      chapterNum: [],
      //章节列表
      chapterlist: [],
      //按钮点击
      activeBtn: 0,
      //更多推荐
      recomm: [],
      //分页
      next: 1,
      //评论
      comment: [],
    };
  },
  created() {
    this.comicId = this.$route.params.comicId;
    let comicIds = JSON.parse(localStorage.getItem("comicIds"));
    if (!this.comicId) {
      this.comicId = comicIds.comicId;
    } else {
      this.localStorage(this.comicId);
    }
    this.getCartoonDetail(this.comicId);
    this.getRecomm(this.comicId);
    this.getComment(this.next);
  },
  mounted() {
    console.log("mounted");
    console.log(`output->window`, window);
    window.scrollY = 0;
  },
  destroyed() {
    console.log("destroyed");
  },
  methods: {
    //漫画详情
    getCartoonDetail(comicId) {
      let params = {
        comicId,
      };
      getComicDetail(params).then((result) => {
          this.details = result.data;
          this.author = result.data.author_name[0];
          this.styles = result.data.styles[0];
          let ep_list = result.data.ep_list.reverse();
          this.listlength = ep_list.length;
          for (let index = 0; index < ep_list.length; index += 50) {
            this.chapterNum.push({
              start: index + 1,
              end: index + 50,
            });
            this.chapterlist.push(ep_list.slice(index, index + 50));
          }
        })
        .catch((err) => {});
    },
    //点击收藏
    getCollection() {
      this.collection = !this.collection;
      if (this.collection) {
        //成功消息提示
        this.$message({
          showClose: true,
          message: "已成功添加进追漫！",
          type: "success",
        });
      } else {
      }
    },
    //章节选项
    active(i) {
      this.activeBtn = i;
    },
    //更多推荐
    getRecomm(comicId) {
      let params = {
        comicId,
      };
      getRecomm(params).then((result) => {
          this.recomm = result.data.recommend_comics;
          console.log("this.recomm", this.recomm);
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },
    //点击变更为其他漫画
    changeId(comicId) {
      //漫画详情
      (this.details = []),
        //章节列表
        (this.chapterlist = []),
        //更多推荐
        (this.recomm = []),
        (this.chapterNum = []),
        (this.comicId = comicId);

      this.getCartoonDetail(comicId);
      this.getRecomm(comicId);
      this.localStorage(comicId);
      window.scrollTo(0, 0);
    },
    //传递id到漫画内容页面
    getId(comicId, epId, short_title, title) {
      console.log("comicId ==> ", comicId);
      this.$router.push({ name: "comiccontent", params: { epId, comicId } });

      //存储到本地
      localStorage.setItem(
        "comicIds",
        JSON.stringify({
          comicId: comicId,
          epId: epId,
          short_title: short_title,
          title: title,
        })
      );
    },
    //评论
    getComment(next) {
      let params = {
        oid: this.comicId,
          ps: 10,
          next,
      };
      getReplyMain(params).then((result) => {
          this.comment = result.data.replies;
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },
    //存储到本地
    localStorage(comicId) {
      localStorage.setItem(
        "comicIds",
        JSON.stringify({
          comicId: comicId,
        })
      );
    },
    //前往分类页面
    goClassify() {
      this.$router.push({ name: "classify" });
      setTimeout(() => {
        this.$router.go(0);
      }, 1000);
    },
    //分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.next = val;
      this.comment = [];
      this.getComment(this.next);
    },
  },
};
</script>

<style lang="less" scoped>
.cartoondetail {
  width: 100%;
  height: 100%;

  h2 {
    .text_overflow;
  }

  .cartoondetail-content {
    // width: 1400px;
    width: 72.9%;
    margin: 0 auto;
    box-shadow: 0px 0px 2px 2px rgba(200, 200, 200, 0.5);
    margin-bottom: 20px;

    .cartoondetail-detail {
      display: flex;
      padding: 20px;

      .detail-lt {
        width: 340px;

        .lt-img {
          img {
            width: 300px;
          }
        }
      }

      .detail-rt {
        width: 1000px;
        padding-left: 20px;
        position: relative;

        .rt-title {
          margin-bottom: 20px;
        }

        .rt-author {
          margin-bottom: 20px;
          color: rgba(0, 0, 0, 0.56);
        }

        .rt-style {
          margin-bottom: 20px;
          color: rgba(0, 0, 0, 0.34);
        }

        .rt-total {
          margin-bottom: 20px;
          color: rgba(0, 0, 0, 0.34);
        }

        .rt-time {
          margin-bottom: 20px;
          color: rgba(0, 0, 0, 0.34);
        }

        .rt-synopsis {
          // margin-bottom: 30px;
          color: rgba(0, 0, 0, 0.56);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .rt-button {
          display: flex;
          position: absolute;
          bottom: 2px;

          .el-button {
            font-size: 20px;
          }

          .btn {
            text-align: center;
            width: 100px;
            height: 45px;
            line-height: 45px;
            margin-left: 30px;
            border: 1px solid #000;
            border-radius: 5px;
            cursor: pointer;
          }
        }
      }
    }
  }

  .cartoondetail-chapter {
    // width: 1400px;
    width: 72.9%;
    margin: 0 auto;

    .chapterlist {
      display: flex;

      .chapterlist-lt {
        // width: 1000px;
        width: 71.4%;
        margin-right: 30px;
        box-shadow: 0px 0px 2px 2px rgba(200, 200, 200, 0.5);
        padding: 20px;

        h2 {
          margin-left: 20px;
        }

        .chapter1 {
          width: 100%;
          margin-bottom: 20px;

          .chapter-btnlist {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            padding-left: 15px;
            margin-bottom: 10px;

            .chapter-btn {
              text-align: center;
              margin-right: 20px;
              margin-bottom: 20px;

              .btn {
                font-size: 15px;
                width: 120px;
                height: 40px;
                line-height: 40px;
                background-color: #f5f7f8;
                border-radius: 20px;
                cursor: pointer;
                &.active,
                &:hover {
                  background-color: rgb(186, 240, 231);
                }
              }
            }
          }

          .chapter-list {
            // width: 1100px;

            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding-left: 10px;

            .chapter-list-item {
              // width: 200px;
              width: 24%;
              height: 42px;
              line-height: 42px;
              // margin-right: 25px;
              margin-bottom: 20px;
              padding-left: 10px;
              padding-right: 10px;
              box-shadow: 0px 0px 2px 2px rgba(200, 200, 200, 0.5);
              box-sizing: border-box;
              display: flex;
              cursor: pointer;

              &:last-child:nth-child(4n - 1) {
                margin-right: calc(24% + 4% / 3);
              }

              &:last-child:nth-child(4n - 2) {
                margin-right: calc(48% + 8% / 3);
              }

              .chapter-list-item-text {
                font-size: 18px;
                width: 180px;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }

              &:hover {
                background-color: rgb(186, 240, 231);
                cursor: pointer;
              }

              .el-icon-lock {
                color: gold;
              }
            }
          }
        }

        .chapterlist-comment {
          box-sizing: border-box;

          .comment-top {
            margin-top: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 80px;
            margin-bottom: 50px;

            .comment-top-lt {
              width: 12%;

              img {
                width: 70px;
                border-radius: 100%;
              }
            }

            .comment-top-cnt {
              // width: 800px;
              width: 75%;

              height: 80px;
              line-height: 80px;
              text-align: center;
              background-color: #eee;
              margin-right: 20px;
              border-radius: 10px;
            }

            .comment-top-rt {
              width: 70px;
              // width: 5%;

              // height: 80px;
              background-color: #eee;
              // margin-right: 20px;
              padding: 15px;
              border-radius: 10px;
              line-height: 1.3;
            }
          }

          .comment-cnt {
            display: flex;
            align-items: center;

            .comment-cnt-list {
              .comment-cnt-list-item {
                display: flex;
                margin-bottom: 50px;

                .item-lt {
                  margin-right: 20px;

                  img {
                    width: 70px;
                    border-radius: 100%;
                  }
                }

                .item-rt {
                  .username {
                    color: #6d757a;
                    margin-bottom: 5px;
                  }

                  .text {
                    margin-bottom: 10px;
                    // margin-right: 20px;
                    // .text_overflow(3);
                  }

                  .time {
                    color: #99a2aa;
                  }
                }
              }
            }
          }

          .btn {
            text-align: center;

            /deep/.el-pager li {
              width: 40px;
              height: 40px;
              line-height: 40px;
            }

            /deep/.btn-prev {
              width: 40px;
              height: 40px;
            }

            /deep/.btn-next {
              width: 40px;
              height: 40px;
            }
          }
        }
      }

      .chapterlist-rt {
        // width: 400px;
        width: calc(100% - 71.4%);
        height: 930px;
        padding: 20px 30px 20px 30px;
        box-shadow: 0px 0px 2px 2px rgba(200, 200, 200, 0.5);

        .rt-top {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        .rt-list {
          margin-top: 20px;

          .rt-list-item {
            display: flex;
            margin-bottom: 20px;

            .item-img {
              margin-right: 20px;

              img {
                width: 120px;
                height: 150px;
              }
            }

            .item-text {
              // padding-left: 10px;
              .title {
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                font-size: 20px;
                margin-bottom: 30px;
              }

              .titl {
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                font-size: 15px;
                color: rgba(0, 0, 0, 0.56);
                margin-top: 15px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
