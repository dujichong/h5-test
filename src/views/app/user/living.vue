<!--居住信息-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="living-information">
    <c-title :text="title" :hide="false"></c-title>

    <c-loading :show="loading"></c-loading>
    <c-msg :msg="msg"></c-msg>
    <div class="border"></div>
    <div class="ui-form">
      <form>
        <ul>
          <li @click="sheetVisible = true" v-bind:class="{ unique: livingType=='其他' }">
            <label>居住情况</label>
            <span v-bind:class="{ blackColor: livingType!='请选择您的居住情况'}">{{livingType}}</span>
          </li>
          <li v-if="livingType=='其他'">
            <label>其他情况</label>
            <input v-model="livingTypeOther" placeholder="请输入其他居住情况">
          </li>

          <li @click="getChildProvince">
            <label>现居住地</label>
            <span class="paddingRight" v-bind:class="{ blackColor: livingPlace!='请选择您的现居住地'}">{{livingPlace}}</span>
          </li>

          <li>
            <label>详细地址</label>
            <input v-model="housenumber" placeholder="地址具体到门牌号码">
          </li>
          <li class="noBorder">
            <label>生活年限(年)</label>
            <input v-model="lifeYears" placeholder="请填写您的居住年限">
          </li>
        </ul>
      </form>
    </div>
    <div class="submit" v-if="ok" @click="commit">
      <p style="color: #fff;">确认并提交</p>
    </div>
    <div class="submit" v-else>
      <p style="color: #9cd2ff;">确认并提交</p>
    </div>
    <Actionsheet :actions="actions" v-model="sheetVisible"></Actionsheet>
    <c-cityOptions :provinceList="cityOptionsVisible"
                   ref="childMethod"
                   @closeCity="closeCity"
                   @chooseDist="chooseDist"
                   @showCity="showCity"
                   @showDist="showDist"
    ></c-cityOptions>
  </div>
</template>

<script>
  import cTitle from 'components/title';
  import cLoading from 'components/loading';
  import cMsg from 'components/msg';
  import cCityOptions from 'components/provinces';
  import axios from 'axios';
  import {mapMutations, mapState} from 'vuex';
  import {Actionsheet} from 'mint-ui';
  const ROOTPATH = window.$rootPath;
  //添加或更新居住信息
  const API_UESR_LIVING_INFO_SAVE_UPDATE = `${ROOTPATH}/user/requestController/saveOrUpdateLivingInfoMethod`;
  //获取居住信息
  const API_UESR_LIVING_INFO = `${ROOTPATH}/user/requestController/getLivingInfoMethod`;
  //获取省市区信息
  const API_CITY = `${ROOTPATH}/dictionary/region/`;

  export default {
    data () {
      return {
        title: '居住信息',
        livingType: '请选择您的居住情况',
        livingPlace: '请选择您的现居住地',
        canClick: true,//多次点击

        sheetVisible: false,
        loading: false,
        cityOptionsVisible: false,
        num: '-1',
        okProvince: '',
        okCity: '',
        okDist: '',
        city: '',
        dist: '',
        name: '',
        provinces: [],
        cities: [],
        dists: [],
        localData: {},
        msg: false,
        appRequestId: '',
        appLoginId: '',
        livingTypeOther: '',
        addressId: '',
        lifeYears: '',
        status: '',
        createTime: '',
        updateTime: '',
        provinceCode: '',
        cityCode: '',
        distCode: '',
        housenumber: '',
        completeaddress: '',
        fullAddress: '',
        livingTypeValue: '',

        actions: [
          //自有房产、租赁、与亲属同住、公司宿舍，其他
          {name: '自有房产', method: this.getLivingStyle, "value": "SELF_HOUSE"},
          {name: '租赁', method: this.getLivingStyle, "value": "RENT_HOUSE"},
          {name: '与亲属同住', method: this.getLivingStyle, "value": "HOME_HOUSE"},
          {name: '公司宿舍', method: this.getLivingStyle, "value": "COMPANY_HOUSE"},
          {name: '其他', method: this.getLivingStyle, "value": "OTHER_HOUSE"},
        ],

        response: [
          {
            "text": "自有房产",
            "value": "SELF_HOUSE"
          },
          {
            "text": "租赁",
            "value": "RENT_HOUSE"
          },
          {
            "text": "与家属同住",
            "value": "HOME_HOUSE"
          },
          {
            "text": "公司宿舍",
            "value": "COMPANY_HOUSE"
          },
          {
            "text": "其他",
            "value": "OTHER_HOUSE"
          }
        ]
      };
    },
    // 计算属性将被混入到 Vue 实例中。
    computed: {
      ...mapState(['pid', 'version', 'token', 'type']),
      ok () {
        if (this.livingType == '其他') {
          return (this.livingType != '请选择您的居住情况') && (this.livingPlace != '请选择您的现居住地')
            && this.housenumber && this.lifeYears && this.livingTypeOther;
        }
        else {
          return (this.livingType != '请选择您的居住情况') && (this.livingPlace != '请选择您的现居住地')
            && this.housenumber && this.lifeYears;
        }
      },
    },

    methods: {
      // 初始化
      init () {
        //在API_UESR_LIVING_INFO接口中
        this.loading = true;
        axios.post(API_UESR_LIVING_INFO, {
          comm: {
            pid: this.pid,
            type: this.type,
            version: this.version
          },
          token: this.token,
          body: {
            requestId: this.$route.query.requestId,
          }
        }, {timeout: 90000}).then(res => {
          let json = res.data;
          //操作成功
          if (json.code == '00000') {
            //返回id 有id为更新操作 没有为新增操作
            //拿到后台的id
            this.loading = false;
            this.bodyPid = json.data.pid;
            //判断id值
            if (json.data.pid) {
              //更新操作之前需要回显数据
              for (let i = 0; i < this.actions.length; i++) {
                if (this.actions[i].value == json.data.livingType) {
                  this.livingType = this.actions[i].name;
                }
              }
              this.livingTypeValue = json.data.livingType;
              this.addressId = json.data.addressId;
              this.livingTypeOther = json.data.livingTypeOther;
              this.lifeYears = json.data.lifeYears;
              this.provinceCode = json.data.provinceCode;
              this.cityCode = json.data.cityCode;
              this.distCode = json.data.distCode;
              this.housenumber = json.data.housenumber;
              this.completeaddress = json.data.completeaddress;
              this.fullAddress = this.completeaddress.split(" ");
              this.livingPlace = this.fullAddress[0] + this.fullAddress[1] + this.fullAddress[2];
            }
            //没有id，新增操作
            else {
              //doNothing
            }
          }
          //后台返回不正常
          else {
            this.loading = false;
            this.msg = json.msg;
            let timer = window.setTimeout(() => {
              this.msg = false;
            }, 2000);
          }
        }, error => {
          this.loading = false;
          this.msg = '加载失败，请稍后重试！';
          let timer = window.setTimeout(() => {
            this.msg = false;
          }, 2000);
        })
      },

      //点击提交按钮提交
      commit(){
        if (!this.canClick) {
          return;
        }
        this.canClick = false;
        this.loading = true;
        //在API_UESR_LIVING_INFO_SAVE_UPDATE接口中传值
        axios.post(API_UESR_LIVING_INFO_SAVE_UPDATE, {
          comm: {
            pid: this.pid,
            type: this.type,
            version: this.version
          },
          token: this.token,

          //提交数据
          body: {
            appRequestId: this.$route.query.requestId,
            addressId: this.addressId,
            pid: this.bodyPid,
            livingType: this.livingTypeValue,
            livingTypeOther: this.livingTypeOther,
            lifeYears: this.lifeYears,
            provinceCode: this.provinceCode,
            cityCode: this.cityCode,
            distCode: this.distCode,
            housenumber: this.housenumber,
            completeaddress: this.fullAddress[0] + ' ' + this.fullAddress[1] + ' ' + this.fullAddress[2] + ' ' + this.housenumber,
          }
        }, {timeout: 90000}).then(res => {
          let json = res.data;
          //验证通过
          if (json.code == '00000') {
            this.loading = false;
            this.pid = json.data.pid;
            this.msg = '提交成功!';
            let timer = window.setTimeout(() => {
              this.msg = false;
              this.canClick = true;
              let time = window.setTimeout(() => {
                this.close();
              }, 200);
            }, 2000);
          }
          //后台验证不通过
          else {
            this.loading = false;
            this.msg = json.msg;
            let timer = window.setTimeout(() => {
              this.msg = false;
              this.canClick = true;
            }, 2000);
          }
        }, error => {
          this.loading = false;
          this.msg = '提交失败!';
          let timer = window.setTimeout(() => {
            this.msg = false;
            this.canClick = true;
          }, 2000);
        })
      },

      //提交成功，关闭当前窗口
      close(){
        //关闭界面
        native.closeWebview();
      },

      getChildProvince(){
        this.cityOptionsVisible = true;
        this.$refs.childMethod.getProvince();
      },

      showCity(province){
        this.okProvince = province.text;
        this.provinceCode = province.value;
      },

      showDist(city){
        this.okCity = city.text;
        this.cityCode = city.value;
      },

      chooseDist(value, text){
        this.dist = text;
        this.distCode = value;
        this.livingPlace = this.okProvince + this.okCity + this.dist;
        this.completeaddress = this.okProvince + ' ' + this.okCity + ' ' + this.dist + ' ';
        this.fullAddress = this.completeaddress.split(" ");
      },

      closeCity(){
        this.cityOptionsVisible = false;
      },

      //定时关闭弹框
      timeout(){
        window.setTimeout(() => {
          this.msg = false;
        }, 2000);
      },


      getLivingStyle(action){
        this.livingType = action.name;
        for (let i = 0; i < this.actions.length; i++) {
          if (this.actions[i].name == action.name) {
            this.livingTypeValue = this.actions[i].value;
            break;
          }
        }
      },
    },

    //初始化调用事件
    created(){
      this.init();
    },

    components: {cTitle, Actionsheet, cMsg, cLoading, cCityOptions}
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  div.living-information {
    width: 100%;
    height: 100%;
    font-family: YouYuan, Tahoma, STXihei;
    background-color: #f1f1f1;
    $bfb: 100%;
    $zero: 0px;
    $color: #4d4d4d;

    div.layer {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #000;
      z-index: 40;
      opacity: 0.5;
      width: 100%;
      height: 100%;
      display: none;
    }
    div.active {
      display: block;
    }
    div.border {
      width: 100%;
      height: .2rem;
      border-top: 1px solid #e5e5e5;
      background-color: #f1f1f1;
    }
    div.ui-form {
      background-color: #fff;
      form {
        margin: 0 .32rem;
        width: 6.86rem;
        ul {
          margin: 0;
          padding: 0;
          li {
            clear: both;
            height: .98rem;
            line-height: .98rem;
            list-style: none;
            border-bottom: 1px solid #e6e6e6;
            label {
              width: 2.3rem;
              display: block;
              float: left;
              font-size: .3rem;
              color: #333333;
              //background-color: aqua;
            }
            input, span {
              display: block;
              float: right;
              //padding-top:0.2rem;
              font-size: .3rem;
              border: none;
              width: 4.55rem;
              height: 0.98rem;
              line-height: 0.98rem;
            }
            input {
              color: #333;
              padding: 0;
              //background-color: red;
            }
            span {
              color: #b2b2b2;
              background: url("../../../assets/app/user/angle-right.png") no-repeat right center;
              background-size: .14rem .26rem;
              //background-color: blue;
            }
            span.paddingRight {
              padding-right: .15rem;
              width: 4.4rem;
            }
            input::-webkit-input-placeholder {
              color: #b2b2b2;
              font-size: .3rem;
            }
            span.blackColor {
              color: #333;
            }
          }
          li.unique {
            clear: both;
            height: .98rem;
            line-height: .98rem;
            list-style: none;
            border: none;
            span {
              border-bottom: 1px solid #e6e6e6;
            }
          }
          li.noBorder {
            border: none;
          }
        }
      }
    }
    div.submit {
      width: 6.86rem;
      height: .88rem;
      margin: 0.5rem .32rem 0;
      background: -webkit-linear-gradient(left, #45bbff, #3399ff); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #45bbff, #3399ff); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, #45bbff, #3399ff); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #45bbff, #3399ff);
      text-align: center;
      border-radius: .49rem;
      p {
        font-size: 0.36rem;
        height: .88rem;
        line-height: .88rem;
        margin: 0;
      }
    }
  }
</style>