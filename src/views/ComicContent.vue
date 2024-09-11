<template>
  <div class="comiccontent">
    <h1>漫画内容</h1>
    <div class="comiccontent-nav" v-if="page">
      <div class="nav">
        <div class="nav-lt">
          <div class="logo">
            <img
              src="https://i0.hdslb.com/bfs/manga-static/manga-pc/static/img/99e0a7fae4c4f.png"
              alt=""
            />
          </div>
          <div class="text">好看漫画</div>
        </div>
        <div class="nav-cnt">
          <div class="home" @click="goHome">首页</div>
          <i class="el-icon-arrow-right"></i>
          <div class="home" @click="back">{{ comictitle }}</div>
          <i class="el-icon-arrow-right"></i>
          <div class="home1">{{ short_title }} {{ title }}</div>
        </div>
        <div class="nav-rt">
          <div class="login" v-if="isLogin == false">
            <div type="text" @click="dialogLogin = true">登录 &nbsp;</div>

            <el-dialog
              title="登录"
              width="30%"
              :modal="false"
              :visible.sync="dialogLogin"
              center
            >
              <el-form
                :label-position="labelPosition"
                label-width="80px"
                :model="Login"
              >
                <el-form-item label="用户">
                  <el-input
                    placeholder="请输入用户名"
                    v-model="Login.name"
                    width="50px"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input
                    placeholder="请输入密码"
                    v-model="Login.password"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogLogin = false">取 消</el-button>
                <el-button type="primary" @click="login()">登 录</el-button>
              </div>
            </el-dialog>
          </div>
          <div class="register" v-if="isLogin == false">
            <div type="text" @click="dialogRegister = true">注册</div>
            <el-dialog
              title="注册"
              width="30%"
              :modal="false"
              :visible.sync="dialogRegister"
              center
            >
              <el-form
                :label-position="labelPosition"
                label-width="80px"
                :model="Register"
              >
                <el-form-item label="用户">
                  <el-input
                    placeholder="请输入用户名"
                    v-model="Register.name"
                    width="50px"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input
                    type="password"
                    placeholder="请输入密码"
                    v-model="Register.password"
                  ></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                  <el-input
                    placeholder="请再次输入密码"
                    v-model="Register.repassword"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogRegister = false">取 消</el-button>
                <el-button type="primary" @click="register">注 册</el-button>
              </div>
            </el-dialog>
          </div>
          <div class="islogin" v-if="isLogin">
            <div class="img" @mouseenter="hover" @mouseleave="hover2">
              <img
                src="https://img2.baidu.com/it/u=2645019514,3718632371&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                alt=""
              />
            </div>
            <div class="username">{{ username }}</div>
          </div>
          <div
            class="islogin-box"
            :style="{ display: display }"
            @mouseenter="hover"
            @mouseleave="hover2"
          >
            <div class="user">
              <div class="lt">用户</div>
              <div class="rt">{{ username }}</div>
            </div>
            <div class="comic">
              <div class="lt">
                <div class="img">
                  <img src="@/assets/images/bi.png" alt="" />
                </div>
                漫画币
              </div>
              <div class="rt">0</div>
            </div>
            <div class="comic">
              <div class="lt">
                <div class="img">
                  <img src="@/assets/images/juan.png" alt="" />
                </div>
                优惠卷
              </div>
              <div class="rt">0</div>
            </div>
            <div class="comic">
              <div class="lt">
                <div class="img">
                  <img src="@/assets/images/ka.png" alt="" />
                </div>
                限免卡
              </div>
              <div class="rt">0</div>
            </div>
            <div class="comic">
              <div class="lt">
                <div class="img">
                  <img src="@/assets/images/daze.png" alt="" />
                </div>
                打折卡
              </div>
              <div class="rt">0</div>
            </div>
            <div class="btn" @click="Loginout">退出登录</div>
          </div>
        </div>
      </div>
    </div>
    <div class="comiccontent-list" ref="comiccontentList" @click="changePage">
      <div
        class="comiccontent-list-item"
        v-for="(items, v) in imgs"
        :key="v"
        v-if="v < hideImgs(hideImgsNum)"
      >
        <div class="img">
          <img :src="`${items.url}?token=${items.token}`" alt="" />
        </div>
      </div>
    </div>
    <div class="comiccontentPag" v-if="page">
      <div class="comiccontent-paging">
        <div class="paging-item" @click="getPagingPre">上一话</div>
        <div class="paging-item">目录</div>
        <div class="paging-item" @click="getPagingNext">下一话</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comiccontent",
  data() {
    return {
      comictitle: "",
      picturelist: [],
      //图片
      imgs: [],
      //章节列表
      ep_list: [],
      //分页隐藏或显示
      page: true,
      //登录状态
      isLogin: false,
      //用户名
      username: "",
      display: "none",
      //用户
      dialogLogin: false,
      dialogRegister: false,
      labelPosition: "right",
      Login: {
        name: "",
        password: "",
      },
      Register: {
        name: "",
        password: "",
        repassword: "",
      },
      //隐藏图片的数量
      hideImgsNum: 10,
      isStart:true,
    };
  },
  created() {
    this.epId = this.$route.params.epId;
    this.comicId = this.$route.params.comicId;
    this.lookStorage();
    this.getPictures(this.epId);
    this.getComicId(this.comicId);
    //3秒后隐藏
    setTimeout(() => {
      this.changePage();
    }, 3000);
    //登录状态
    let loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    if (loginInfo) {
      this.isLogin = true;
      this.username = loginInfo.name;
    }
  },
  mounted() {
    this.scrollWindow();
  },
  methods: {
    //获取图片地址列表
    getPictures(epId) {
      //发起请求
      this.axios({
        //请求类型
        method: "get",
        //请求路径
        url: "https://apis.netstart.cn/bcomic/GetImageIndex",
        params: {
          epId,
        },
      })
        .then((result) => {
          // console.log("result.data.data.images==>", result.data.data.images);
          result.data.data.images.forEach((v) => {
            this.picturelist.push(`https://manga.hdslb.com${v.path}`);
          });

          this.getimg(this.picturelist);
          // console.log("this.picturelist==>", this.picturelist);
        })
        .catch((err) => {});
    },
    //图片
    getimg(urls) {
      this.axios({
        //请求类型
        method: "get",
        //请求路径
        url: "https://apis.netstart.cn/bcomic/ImageToken",
        params: {
          urls: JSON.stringify(urls),
        },
      })
        .then((result) => {
          // console.log("result==>", result);
          this.imgs = result.data.data;
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },
    //获取漫画目录id
    getComicId(comicId) {
      //发起请求
      this.axios({
        //请求类型
        method: "get",
        //请求路径
        url: "https://apis.netstart.cn/bcomic/ComicDetail",
        params: {
          comicId,
        },
      })
        .then((result) => {
          // console.log("result.data==>", result.data);
          this.comictitle = result.data.data.title;
          this.ep_list = result.data.data.ep_list.reverse();
          // console.log("this.ep_list", this.ep_list);
          this.look();
        })
        .catch((err) => {});
    },
    //上一页
    getPagingPre() {
      if (this.ep_list) {
        for (let i = 0; i < this.ep_list.length; i++) {
          if (this.ep_list[i].id == this.epId) {
            if (i == 0) {
              this.message2("没有上一页了");
              return;
            }
            this.picturelist = [];
            this.imgs = [];
            let a = this.ep_list[i - 1].id;
            this.epId = a;
            this.getPictures(this.epId);
            this.localStorage(
              this.comicId,
              this.epId,
              this.ep_list[i - 1].short_title,
              this.ep_list[i - 1].title
            );
            return;
          }
        }
      }
    },
    //下一页
    getPagingNext() {
      for (let i = 0; i < this.ep_list.length; i++) {
        if (this.ep_list[i].id == this.epId) {
          if (i == this.ep_list.length - 1) {
            this.message2("没有下一页了");
            return;
          }
          this.picturelist = [];
          this.imgs = [];
          this.epId = this.ep_list[i + 1].id;
          this.getPictures(this.epId);
          this.localStorage(
            this.comicId,
            this.epId,
            this.ep_list[i + 1].short_title,
            this.ep_list[i + 1].title
          );
          return;
        }
      }
    },
    //分页隐藏或显示
    changePage() {
      this.page = !this.page;
    },
    //前往首页
    goHome() {
      this.$router.push({ name: "home" });
    },
    //返回上一级
    back() {
      this.$router.go(-1);
    },
    //存储到本地
    localStorage(comicId, epId, short_title, title) {
      localStorage.setItem(
        "comicIds",
        JSON.stringify({
          comicId: comicId,
          epId: epId,
          short_title: short_title,
          title: title,
        })
      );
      this.lookStorage();
    },
    //查看本地储存
    lookStorage() {
      let comicIds = JSON.parse(localStorage.getItem("comicIds"));
      if (!this.epId) {
        this.epId = comicIds.epId;
      }
      if (!this.comicId) {
        this.comicId = comicIds.comicId;
      }
      this.short_title = comicIds.short_title;
      this.title = comicIds.title;
    },
    hover() {
      this.display = "block";
    },
    hover2() {
      this.display = "none";
    },
    //登录
    login() {
      let registerInfo = JSON.parse(localStorage.getItem("registerInfo"));
      //如果为空则不添加
      if (this.Login.phone === "" || this.Login.password === "") {
        this.message2("输入框不能为空");
        return;
      }
      registerInfo.forEach((v) => {
        if (
          this.Login.name === v.user.name &&
          this.Login.password === v.user.password
        ) {
          this.message1("登录成功！");
          localStorage.setItem(
            "loginInfo",
            JSON.stringify({
              name: this.Login.name,
              password: this.Login.password,
            })
          );
          this.isLogin = true;
          this.username = this.Login.name;
        }
      });
    },
    //注册
    register() {
      let registerInfo = localStorage.getItem("registerInfo");
      if (!registerInfo) {
        registerInfo = [];
      } else {
        registerInfo = JSON.parse(registerInfo);
      }
      //判断是否存在重复的搜索关键字
      for (var i = 0; i < registerInfo.length; i++) {
        if (registerInfo[i].user.name === this.Register.name) {
          this.message2("账号已注册!");
          return;
        }
      }

      //如果为空则不添加
      if (this.Register.phone === "" || this.Register.password === "") {
        this.message2("输入框不能为空");
        return;
      }
      if (this.Register.password != this.Register.repassword) {
        this.message2("密码不一致，注册不了！");
        return;
      }
      registerInfo.push({ user: this.Register });
      this.message1("账号注册成功");
      this.dialogRegister = false;
      localStorage.setItem("registerInfo", JSON.stringify(registerInfo));
    },
    //成功消息提示
    message1(message) {
      this.$message({
        showClose: true,
        message: message,
        type: "success",
      });
    },
    //错误消息提示
    message2(message) {
      this.$message({
        showClose: true,
        message: message,
        type: "error",
      });
    },
    //退出登录
    Loginout() {
      localStorage.removeItem("loginInfo");
      this.isLogin = false;
      this.message1("退出登录！");
    },
    scrollWindow() {
      window.addEventListener("scroll", () => {
        this.getMainBox();
      });
    },
    getTop(obj) {
      let iTop = 0;
      while (obj) {
        iTop += obj.offsetTop;
        obj = obj.offsetParent;
      }
      return iTop;
    },
    getMainBox() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      let comicContentList = this.$refs.comiccontentList;
      if (
        this.getTop(comicContentList) + comicContentList.offsetHeight <
        top + document.documentElement.clientHeight
      ) {
        console.log("触底了，再次加载");
        if (this.hideImgsNum < this.imgs.length - 1) {
          this.hideImgsNum += 10;
          this.hideImgs(this.hideImgsNum);
        } else if (this.hideImgsNum >= this.imgs.length - 1) {
          this.hideImgsNum += this.imgs.length - 1;
          this.hideImgs(this.hideImgsNum);
        }
      }
    },
    //隐藏图片的数量
    hideImgs(Num) {
      return Num;
    },
  },
};
</script>

<style lang="less" scoped>
.comiccontent {
  width: 100%;
  text-align: center;
  .comiccontent-nav {
    width: 100%;
    position: fixed;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
    .nav {
      width: 1800px;
      margin: 0 auto;
      display: flex;
      color: #fff;
      justify-content: space-around;
      // flex-direction: column;
      .nav-lt {
        display: flex;
        align-items: center;
        margin-right: 20px;
        .logo {
          margin-right: 20px;
        }
      }
      .nav-cnt {
        display: flex;
        align-items: center;
        .home {
          cursor: pointer;
          // margin-right: 20px;
          &:hover {
            color: #32aaff;
          }
        }
        .home1 {
          color: rgb(208, 208, 208);
        }
      }
      .nav-rt {
        position: relative;
        display: flex;
        align-items: center;
        .islogin {
          display: flex;
          align-items: center;
          padding-top: 10px;
          .img {
            margin-right: 20px;
            img {
              width: 50px;
            }
          }
        }
        .islogin-box {
          position: absolute;
          top: 70px;
          right: -40px;
          background-color: #000;
          opacity: 0.7;

          border-radius: 0px 0px 10px 10px;
          width: 200px;
          .user {
            display: flex;
            justify-content: space-around;
          }
          .comic {
            height: 50px;
            line-height: 50px;
            display: flex;
            justify-content: space-around;
            .lt {
              display: flex;
              .img {
                padding-top: 7px;
                width: 30px;
                img {
                  width: 25px;
                }
              }
            }
          }
          .btn {
            width: 100%;
            height: 50px;
            line-height: 50px;
            background-color: rgb(181, 212, 227);
            border-radius: 0px 0px 10px 10px;
            text-align: center;
          }
        }
      }
    }
  }
  .comiccontent-list {
    width: 800px;
    margin: 0 auto;
    margin-bottom: 50px;
    background-color: #777;
    .comiccontent-list-item {
      width: 800px;
      .img {
        img {
          width: 800px;
        }
      }
    }
  }
  .comiccontentPag {
    width: 100%;
    height: 70px;
    line-height: 70px;
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    bottom: 0;
    .comiccontent-paging {
      width: 800px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;

      .paging-item {
        color: #fff;
        &:hover {
          color: red;
        }
      }
    }
  }
}
</style>