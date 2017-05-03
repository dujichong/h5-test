<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="living-information">
    <div class="layer" v-bind:class="{ active: isActive }"></div>
    <div class="loading" v-if="msg">
      <div>
        <img v-if="msg=='登录成功'" src="../../../assets/app/user/suc.png"/>
        <img v-if="msg=='提交数据失败，请稍后重试！'||msg =='系统异常,请稍后重试'" src="../../../assets/app/user/fail.png" />
      </div>
      <p>{{msg}}</p>
    </div>
    <c-title :text="title" :hide="false"></c-title>
    <div class="border"></div>
    <div class="ui-form">
      <form>
        <ul>
          <li @click="sheetVisible = true" v-bind:class="{ unique: isUnique }">
            <label>居住情况</label>
            <span v-bind:class="{ blackColor: isLivingTypeColor}">{{livingType}}</span>
          </li>
          <li v-if="show">
            <label>其他情况</label>
            <input v-model="others" placeholder="请输入其他居住情况">
          </li>
          <li @click="getCity">
            <label>现居住地</label>
            <span v-bind:class="{ blackColor: isLivingPlaceColor}">{{livingPlace}}</span>
          </li>
          <li>
            <label>详细地址</label>
            <input v-model="address" placeholder="地址具体到门牌号码">
          </li>
          <li class="noBorder">
            <label>生活年限(年)</label>
            <input v-model="years" placeholder="请填写您的居住年限">
          </li>
        </ul>
      </form>
    </div>
    <div class="submit"  v-if="ok" @click="commit">
      <p style="color: #fff;">确认并提交</p>
    </div>
    <div  class="submit"  v-else>
      <p style="color: #9cd2ff;">确认并提交</p>
    </div>
    <Actionsheet :actions="actions" v-model="sheetVisible"></Actionsheet>
  </div>


</template>

<script>
  import cTitle from 'components/title';
  import cLoading from 'components/loading';
  import axios from 'utils/axios';
  import routes from 'routes/index';

  import { Actionsheet, Toast, MessageBox } from 'mint-ui';

  const ROOTPATH = window.$rootPath;
  //添加或更新居住信息
  const API_UESR_LIVING_INFO_SAVE_UPDATE= `${ROOTPATH}/user/requestController/saveOrUpdateLivingInfoMethod`;
  //获取居住信息
  const API_UESR_LIVING_INFO= `${ROOTPATH}/user/requestController/getLivingInfoMethod`;


  export default {
    data () {
      return {
        title: '居住信息',
        livingType: '请选择您的居住情况',
        others: '',
        livingPlace: '请选择您的现居住地',
        address: '',
        years: '',
        show: false,
        sheetVisible: false,
        isUnique: false,
        isLivingTypeColor: false,
        isLivingPlaceColor: false,
        loading: true,
        id: '',
        isActive: false,


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

        actions: [
          //自有房产、租赁、与亲属同住、公司宿舍，其他
          {name: '自有房产', method: this.getLivingStyle},
          {name: '租赁', method: this.getLivingStyle},
          {name: '与亲属同住', method: this.getLivingStyle},
          {name: '公司宿舍', method: this.getLivingStyle},
          {name: '其他', method: this.getLivingStyle},
        ],
      };
    },
    // 计算属性将被混入到 Vue 实例中。
    computed: {
      ok () {
        if(this.show == true){
          return (this.livingType!='请选择您的居住情况')&&(this.livingPlace!='请选择您的现居住地')
            &&this.address&&this.years&&this.others;
        }
        else {
          return (this.livingType!='请选择您的居住情况')&&(this.livingPlace!='请选择您的现居住地')
            &&this.address&&this.years;
        }
      },
    },

    methods : {
      // 初始化
      init () {
        //在API_UESR_LIVING_INFO_SAVE_UPDATE接口中
        axios.post(API_UESR_LIVING_INFO_SAVE_UPDATE,{
          //从url中取到token和requestId给后台
          token:this.$route.query.token,
          requestId:this.$route.query.requestId,
        },{timeout:90000}).then(res => {
          let json = res.data;
          //操作成功
          if (json.code == 1) {
            //返回id 有id为更新操作 没有为新增操作
            //拿到后台的id
            this.id=json.body.id;
            //判断id值
            if(this.id==1){
              //更新操作之前需要回显数据
              this.showHistory();
            }
            //没有id，新增操作
            else {
              //doNothing
            }
          }
          //后台返回不正常
          else{
            this.isActive=true;
            this.msg = json.msg;
            let timer=window.setTimeout(() => {
              this.msg=false;
              this.isActive=false;
            },2000);
          }
        },error =>{
          this.isActive=true;
          this.msg ='提交数据失败，请稍后重试！';
          let timer=window.setTimeout(() => {
            this.msg = false;
            this.isActive=false;
          },2000);
        })
      },

      //数据回显
      showHistory(){
        //在API_UESR_LIVING_INFO接口中
        axios.post(API_UESR_LIVING_INFO,{
        },{timeout:90000}).then(res => {
          let json = res.data;
          //操作成功后台
          if (json.code == 1) {
            //获取后台数据
            this.livingType = json.body.livingType;
            this.livingTypeOther = json.body.livingTypeOther;
            this.lifeYears = json.body.lifeYears;
            this.provinceCode = json.body.provinceCode;
            this.cityCode = json.body.cityCode;
            this.distCode = json.body.distCode;
            this.housenumber = json.body.housenumber;
            this.completeaddress = json.body.completeaddress;
          }
          //后台返回不正常
          else{
            this.isActive=true;
            this.msg = json.msg;
            let timer=window.setTimeout(() => {
              this.msg=false;
              this.isActive=false;
            },2000);
          }
        },error =>{
          this.isActive=true;
          this.msg ='提交数据失败，请稍后重试！';
          let timer=window.setTimeout(() => {
            this.msg = false;
            this.isActive=false;
          },2000);
        })
      },

      //点击提交按钮提交
      commit(){
        //在API_UESR_LIVING_INFO_SAVE_UPDATE接口中传值
        axios.post(API_UESR_LIVING_INFO_SAVE_UPDATE,{
          //提交数据
          livingType:this.livingType,
          livingTypeOther:this.livingTypeOther,
          lifeYears:this.lifeYears,
          provinceCode:this.provinceCode,
          cityCode:this.cityCode,
          distCode:this.distCode,
          housenumber:this.housenumber,
          completeaddress:this.completeaddress,
      },{timeout:90000}).then(res => {
          let json = res.data;
          //验证通过
          if (json.code == 1) {
            this.msg = '登录成功';
            this.isActive=true;
            let timer=window.setTimeout(() => {
              this.msg = false;
              this.isActive=false;
              let time=window.setTimeout(()=>{
                this.close();
              },200);
            },2000);
          }
          //后台验证不通过
          else{
            this.msg = json.msg;
            this.isActive=true;
            let timer=window.setTimeout(() => {
              this.msg=false;
              this.isActive=false;
            },2000);
          }
        },error =>{
          this.isActive=true;
          this.msg ='提交数据失败，请稍后重试！';
          let timer=window.setTimeout(() => {
            this.msg = false;
            this.isActive=false;
          },2000);
        })

      },
      getCity(){
        console.log('这里需要添加省市县区');
      },

      getLivingStyle(action){
        this.livingType = action.name;
        this.isLivingTypeColor = true;
        if(action.name == '其他'){
          this.show = true;
          this.isUnique = true;
        }
        else {
          this.show = false;
          this.isUnique = false;
        }
      },
    },

    //初始化调用事件
    created(){
      this.init();
    },

    components: {cTitle, Actionsheet}
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  div.living-information{
    width: 100%;
    height: 100%;
    font-family: YouYuan, Tahoma, STXihei;
    background-color: #f1f1f1;
    div.layer{
      position: absolute;
      top:0;
      left:0;
      background-color: #000;
      z-index: 40;
      opacity: 0.5;
      width:100%;
      height: 100%;
      display: none;
    }
    div.loading{
      position: absolute;
      top:3.87rem;
      left: 0.59rem;
      z-index: 999;
      width: 6.3rem;
      height: 3.58rem;
      background-color: #fff;
      border-radius: 11px;
      div{
        margin: 0.9rem auto 0;
        width: 0.6rem;
        height: 0.6rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      p{
        width: 4.4rem;
        margin: 0.2rem auto;
        text-align: center;
        font-size: .36rem;
      }
    }
    div.active{
      display: block;
    }
    div.border{
      width: 100%;
      height: .2rem;
      border-top: 1px solid #e5e5e5;
      background-color: #f1f1f1;
    }
    div.ui-form{
      background-color: #fff;
      form{
        margin: 0 .32rem;
        width: 6.86rem;
        ul{
          margin: 0;
          padding: 0;
          li{
            clear: both;
            height: .98rem;
            line-height: .98rem;
            list-style: none;
            border-bottom:1px solid #e6e6e6;
            label{
              width: 2.3rem;
              display: block;
              float: left;
              font-size: .3rem;
              color: #333333;
              //background-color: aqua;
            }
            input,span {
              display: block;
              float: right;
              //padding-top:0.2rem;
              font-size: .3rem;
              border: none;
              width: 4.55rem;
              height: 0.98rem;
              line-height: 0.98rem;
            }
            input{
              color: #333;
              padding: 0;
              //background-color: red;
            }
            span{
              color: #b2b2b2;
              background: url("../../../assets/app/user/angle-right.png") no-repeat right center;
              background-size: .14rem .26rem;
              //background-color: blue;
            }
            input::-webkit-input-placeholder{
              color: #b2b2b2;
              font-size: .3rem;
            }
            span.blackColor{
              color: #333;
            }
          }
          li.unique{
            clear: both;
            height: .98rem;
            line-height: .98rem;
            list-style: none;
            border: none;
            span {
              border-bottom:1px solid #e6e6e6;
            }
          }
          li.noBorder{
            border: none;
          }
        }
      }
    }
    div.submit{
      width: 6.86rem;
      height:.88rem;
      margin:0.5rem .32rem 0;
      background: -webkit-linear-gradient(left, #45bbff , #3399ff); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #45bbff , #3399ff); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, #45bbff , #3399ff); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #45bbff , #3399ff);
      text-align:center;
      border-radius: .49rem;
      p{
        font-size:0.36rem;
        height:.88rem;
        line-height:.88rem;
        margin: 0;
      }
    }
  }
</style>