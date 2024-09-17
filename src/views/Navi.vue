<template>
  <div class="navi">
    <div class="navi-nav">
      <div class="navi-nav-content">
        <div class="navi-nav-left">
          <div class="logo">
            <img
              src="https://i0.hdslb.com/bfs/manga-static/manga-pc/static/img/99e0a7fae4c4f.png"
              alt=""
            />
          </div>
          <div class="text">好看漫画</div>
          <div
            class="navi-nav-item"
            v-for="(item, i) in navList"
            :key="i"
            @click="active(i, item.routeName)"
            :class="activeIndex === i ? 'active' : 'navi-nav-item'"
            :to="{ name: item.routeName }"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="navi-nav-right">
          <div class="right-lt">
            <div class="search">
              <el-input
                placeholder="请输入内容"
                v-model="value"
                class="input-with-select"
              >
                <el-button
                  slot="append"
                  type="primary"
                  icon="el-icon-search"
                  @click="Search"
                ></el-button>
              </el-input>
            </div>
          </div>
          <div class="right-rt">
            <div class="login" v-if="isLogin == false">
              <div type="text" @click="dialogLogin = true">登录</div>
            </div>
            <div class="register" v-if="isLogin == false">
              <div type="text" @click="dialogRegister = true">注册</div>
            </div>
          </div>
          <div class="history" v-if="isLogin">历史</div>
          <div class="chase" v-if="isLogin">追漫</div>
          <div
            class="islogin"
            v-if="isLogin"
            @mouseenter="hover"
            @mouseleave="hover2"
          >
            <div class="user-img">
              <img
                src="https://img2.baidu.com/it/u=2645019514,3718632371&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                alt=""
              />
            </div>
          </div>
          <div
            class="islogin-box"
            v-if="isLogin"
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

    <div class="router">
      <keep-alive :include="['home', 'classify', 'rankinglist', 'renew']">
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="navi-foot">
      <div class="nav-foot-top">
        <div class="nav-foot-top-left">
          <div class="left-cnt">
            <div class="logo">
              <img
                src="https://i0.hdslb.com/bfs/manga-static/manga-pc/static/img/99e0a7fae4c4f.png"
                alt=""
              />
            </div>
            <div class="text">好看漫画</div>
          </div>
          <div class="right-cnt">
            <div class="right-cnt-list">
              <div class="right-cnt-list-item">关于我们</div>
              <div class="right-cnt-list-item">联系我们</div>
              <div class="right-cnt-list-item">友情链接</div>
              <div class="right-cnt-list-item">加入我们</div>
            </div>
          </div>
        </div>
        <div class="nav-foot-top-right">
          <div class="right-list">
            <div class="right-list-item">
              <div class="img">
                <img src="@/assets/images/offical.svg" alt="" />
              </div>
              <div class="text">B站官网</div>
            </div>
            <div class="right-list-item">
              <div class="img">
                <img src="@/assets/images/xinlang.png" alt="" />
              </div>
              <div class="text">新浪微博</div>
            </div>
            <div class="right-list-item">
              <div class="img">
                <img src="@/assets/images/download.png" alt="" />
              </div>
              <div class="text">下载B站漫画客户端</div>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-foot-cnt">
        <div class="nav-foot-cnt-lt">
          <div class="lt-imglist">
            <div class="img">
              <img src="@/assets/images/he.png" alt="" />
            </div>
            <div class="img">
              <img src="@/assets/images/kankan.png" alt="" />
            </div>
          </div>
        </div>
        <div class="nav-foot-cnt-rt">
          <p>
            互联网 ICP 备案：沪 ICP17039440 号 - 1 | 网络文化经营许可证：沪网文
            [2020]5452-371 号
          </p>
          <p>
            全国网安备案号：31011002003092 | 增值电信业务经营许可证 沪
            B2-20190879
          </p>
          <p>12345 政务服务便民热线|上海市互联网违法和不良信息举报中心</p>
          <p>
            上海呵呵呵文化传播有限公司 | 地址：上海市杨浦区政立路485号 |
            电话：021-25099888
          </p>
        </div>
      </div>
    </div>
    <el-dialog
      title="登录"
      width="30%"
      :modal="false"
      :visible.sync="dialogLogin"
      center
    >
      <el-form
        :label-position="labelPosition"
        label-width="40px"
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
            type="password"
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
            type="password"
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
</template>

<script>
export default {
  name: "navi",
  data() {
    return {
      //路由下标
      activeIndex: 0,
      value: "",
      //路由列表
      navList: [
        {
          name: "首页",
          //路由名称
          routeName: "home",
        },
        {
          name: "分类",
          //路由名称
          routeName: "classify",
        },
        {
          name: "更新",
          //路由名称
          routeName: "renew",
        },
        {
          name: "排行榜",
          //路由名称
          routeName: "rankinglist",
        },
      ],
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

      //登录状态
      isLogin: false,
      display: "none",
      //用户名
      username: "",
    };
  },
  watch: {
    routerName(newVal, oldVal) {
      if (newVal != oldVal) {
        this.getrouterName();
      }
    },
  },
  computed: {
    routerName() {
      return this.$route.name;
    },
  },
  created() {
    this.getrouterName();
    let loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    if (loginInfo) {
      this.isLogin = true;
      this.username = loginInfo.name;
    }
  },
  methods: {
    dd() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    active(i, routeName) {
      this.activeIndex = i;
      this.$router.push({ name: routeName });
    },
    //搜索
    Search() {
      if (this.value === "") {
        return;
      }
      // console.log("this.value==>", this.value);
      let val = this.value;
      //保存
      localStorage.setItem(
        "comicSearch",
        JSON.stringify({
          val: val,
        })
      );

      let routeName = this.$route.name;
      if (routeName != "comicsearch") {
        console.log("routeName==>", routeName);
        this.$router.push({ name: "comicsearch", params: { val } });
      } else {
        this.$router.go(0);
      }
      this.value = "";
    },
    //获取当前路由名称
    getrouterName() {
      let routeName = this.$route.name;
      // console.log("routeName==>", routeName);
      for (let i = 0; i < this.navList.length; i++) {
        if (routeName === this.navList[i].routeName) {
          this.activeIndex = i;
        }
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
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
      this.dialogLogin = false;
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
    hover() {
      this.display = "block";
    },
    hover2() {
      this.display = "none";
    },
    //退出登录
    Loginout() {
      localStorage.removeItem("loginInfo");
      this.isLogin = false;
      this.message1("退出登录！");
    },
  },
};
</script>

<style lang="less" scoped>
.navi {
  width: 100%;
  height: 100%;

  .router {
    background-color: #fff;
    padding: 100px 0;
    //font-size: 16px;
  }

  .navi-nav {
    z-index: 1;
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    padding: 10px;
    //border-bottom: 1px solid #999;
    box-shadow: 0px 2px 5px 1px rgba(166, 164, 164, 0.5);
    background-color: #fff;
    box-sizing: border-box;

    .navi-nav-content {
      width: 80%;
      margin: 0 auto;
      margin-bottom: 20px;
      // display: flex;
      // justify-content: space-between;

      .navi-nav-left {
        // width: 100%;
        display: flex;
        align-items: center;
        // margin-left: 50px;
        float: left;

        .logo {
          margin-right: 20px;

          img {
            width: 50px;
          }
        }

        .text {
          padding-bottom: 10px;
          line-height: 60px;
          margin-right: 30px;
        }

        .navi-nav-item {
          cursor: pointer;
          padding-bottom: 10px;
          margin-right: 40px;
        }
      }

      .navi-nav-right {
        float: right;
        // position: relative;
        // width: 50%;
        height: 60px;
        // padding-bottom: 10px;
        display: flex;
        align-items: center;
        .right-lt {
          .search {
            display: flex;
            align-items: center;
            margin-right: 40px;
          }
        }

        .right-rt {
          display: flex;

          .login {
            width: 50px;
            margin-right: 30px;

            .el-input {
              width: 400px;
            }

            .el-dialog {
              z-index: 1;
            }
          }

          .register {
            width: 50px;

            .el-input {
              width: 400px;
            }
          }
        }

        .history {
          margin-right: 20px;
        }

        .islogin {
          margin-left: 20px;

          img {
            width: 50px;
            border-radius: 10px;
          }
        }

        .islogin-box {
          position: absolute;
          top: 70px;
          right: -45px;
          background-color: #fff;
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
            background-color: rgb(181, 212, 227);
            border-radius: 0px 0px 10px 10px;

            text-align: center;
          }
        }
      }
    }
  }

  .navi-foot {
    width: 100%;
    background-color: rgb(59, 59, 59);
    color: #999;
    position: relative;
    bottom: 0;
    padding-bottom: 20px;

    .nav-foot-top {
      width: 80%;
      margin: 0 auto;
      padding-top: 60px;
      display: flex;

      .nav-foot-top-left {
        width: 50%;
        display: flex;
        align-items: center;
        padding-top: 10px;
        border-right: 1px solid #000;

        .left-cnt {
          width: 55%;
          display: flex;
          align-items: center;

          .logo {
            margin-right: 10px;
          }

          .text {
            font-size: 25px;
          }
        }

        .right-cnt {
          width: 45%;

          .right-cnt-list {
            display: flex;
            flex-wrap: wrap;

            .right-cnt-list-item {
              width: 40%;
              margin-right: 20px;
              margin-bottom: 10px;
            }

            .right-cnt-list-item:nth-child(2n) {
              margin-right: 0;
            }
          }
        }
      }

      .nav-foot-top-right {
        width: 50%;
        text-align: center;

        .right-list {
          display: flex;

          .right-list-item {
            width: 30%;

            .img {
              width: 100%;

              img {
                width: 64px;
              }
            }

            .text {
              font-size: 10px;
            }
          }
        }
      }
    }

    .nav-foot-cnt {
      width: 80%;
      margin: 0 auto;
      margin-top: 20px;
      display: flex;

      .nav-foot-cnt-lt {
        padding-top: 25px;

        .lt-imglist {
          display: flex;
          align-items: center;

          .img {
            width: 96px;
            margin-right: 16px;

            img {
              width: 100%;
            }
          }
        }
      }

      .nav-foot-cnt-rt {
        p {
          font-size: 10px;
          margin-bottom: 5px;
        }
      }
    }
  }
}

.el-dialog {
  z-index: 1;
}

.active {
  color: #32aaff;
  border-bottom: 1px solid #000;
}
</style>
