<template>
  <div>
    <el-row>
      <el-form ref="form" :rules="rules" :model="form" label-width="70px">
        <el-col :span="8">
          <el-form-item label="省份：" prop="province" label-width="100px">
            <el-select v-model="form.province" placeholder="请选择" @change="changeProvince" clearable>
              <el-option v-for="province in provinceList" :key="province" :label="province" :value="province">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城市：" prop="city">
            <el-select v-model="form.city" placeholder="请选择" @change="changeCity" clearable>
              <el-option v-for="city in cityList" :key="city" :label="city" :value="city"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地区：" prop="region">
            <el-input v-model="form.region" placeholder="区县" @input="changeArea" />
          </el-form-item>
        </el-col>
      </el-form>
      <el-button @click="submitForm">确定</el-button>
    </el-row>
  </div>
</template>
<script>

export default {
  name: "Region",
  props: {
    form: {
      type: Array,
      default: () => ({
        province: '',
        city: '',
        region: '',
      })
    },
    province: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    region: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      // form: {
      //   province: '',
      //   city: '',
      //   region: '',
      // },
      provinceList: [],
      cityList: [],
      areaList: [],
      rules: {
        province: [{ required: true, message: '请选择省份' }],
        city: [{ required: true, message: '请选择城市' }],
        region: [{ required: true, message: '请选择地区' }]
      }
    };
  },
  watch: {
    // list: {
    //   handler(val) {
    //     console.log('val',val)
    //     this.form = val;
    //   },
    //   deep: true,
    //   immediate: true,
    // }
  },
  computed: {
    comDiyCheck: {
      get() {
        return this.diyCheck
      },
      set(e) {
        this.$emit('update:diyCheck', e)
      }
    }

    // "form.city": {
    //   get() {
    //     return this.form.city
    //   },
    //   set(e) {
    //     this.$emit('update:form', e)
    //   }
    // },
    // "form.region": {
    //   get() {
    //     return this.form.region
    //   },
    //   set(e) {
    //     this.$emit('update:form', e)
    //   }
    // },
  },
  created() {
    this.listProvince();
  },


  methods: {
    //查询所有省
    listProvince() {
      this.provinceList = ['北京', '广东', '四川', '天津', '广西'];
    },
    //查询省的城市
    listCity() {
      this.cityList = ['广州', '深圳', '汕头', '惠州', '湛江'];
    },
    // 选择了省
    changeProvince(province) {
      this.form.city = '';
      this.form.region = '';
      this.cityList = [];
      this.areaList = [];
      this.form.province = province;
      // this.$emit("update:province", province);
      // this.$emit("update:region", this.form.city);

      this.listCity();

    },

    // 选择了市
    changeCity(city) {
      this.form.city = city;
      this.form.region = '';
      // this.$emit("update:city", city);
      // this.$emit("update:region", this.form.region);

    },

    // 选择了区域
    changeArea(region) {
      this.form.region = region;
      // this.$emit("update:region", region);
    },
    //提交表单
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log(`output->valid`, valid)
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>

</style>
