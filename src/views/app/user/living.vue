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
          <li @click="sheetVisible = true" v-bind:class="{ unique: livingType=='其他' }">
            <label>居住情况</label>
            <span v-bind:class="{ blackColor: livingType!='请选择您的居住情况'}">{{livingType}}</span>
          </li>
          <li v-if="livingType=='其他'">
            <label>其他情况</label>
            <input v-model="livingTypeOther" placeholder="请输入其他居住情况">
          </li>
          <li @click="getProvince">
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
    <div class="submit"  v-if="ok" @click="commit">
      <p style="color: #fff;">确认并提交</p>
    </div>
    <div  class="submit"  v-else>
      <p style="color: #9cd2ff;">确认并提交</p>
    </div>
    <Actionsheet :actions="actions" v-model="sheetVisible"></Actionsheet>

    <div id="cityoptions" v-if="provinceList">
      <div class="box">
        <ul class="provinces">
          <li v-for="(province , index) of provinces">
            <div :class="'op ' + (province.text == okProvince ? 'op2' : '')" @click="showCity(province)">
              <label>{{province.text}}</label>
              <span :class="'pull ' + (province.text == okProvince ? 'pull_down' : 'pull_up')"></span>
            </div>

            <ul v-if="province.text == okProvince">
              <!--@click="chooseCity(city.text,city.value)"-->
              <li v-for="(city,index) of cities" class="op">
                <div :class="'op ' + (city.text == okCity ? 'op2' : '')" @click="showDist(city)"><!---->
                  <label>{{city.text}}</label>
                  <span :class="'pull ' + (city.text == okCity ? 'pull_down' : 'pull_up')"></span><!---->
                </div><!---->

                <ul v-if="city.text == okCity">
                  <li @click="chooseDist(dist.value,dist.text)" v-for="(dist,index) of dists" class="op">
                    <label>{{dist.text}}</label>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <div class="qx" @click="colseCity">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
  import cTitle from 'components/title';
  import cLoading from 'components/loading';
  import axios from 'axios';
  import { Actionsheet, Toast, MessageBox } from 'mint-ui';
  const ROOTPATH = window.$rootPath;
  //添加或更新居住信息
  const API_UESR_LIVING_INFO_SAVE_UPDATE= `${ROOTPATH}/user/requestController/saveOrUpdateLivingInfoMethod`;
  //获取居住信息
  const API_UESR_LIVING_INFO= `${ROOTPATH}/user/requestController/getLivingInfoMethod`;
                    /*  puhui-car-app-server/user/requestController/getOccupationInfoMethod*/
  //获取省市区信息
  const API_CITY= `${ROOTPATH}/dictionary/region/`;

  export default {
    data () {
      return {
        title: '居住信息',
        livingType: '请选择您的居住情况',
        livingPlace: '请选择您的现居住地',

        canClick: true,//多次点击

        sheetVisible: false,
        loading: true,
        pid: '',
        isActive: false,

        token: '',
        requestId: '',
        num: '-1',
        provinceList:false,
        okProvince: '',
        okCity: '',
        okDist: '',
        city: '',
        dist:'',
        name:'',
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
          {name: '与亲属同住', method: this.getLivingStyle,"value": "HOME_HOUSE"},
          {name: '公司宿舍', method: this.getLivingStyle,"value": "COMPANY_HOUSE"},
          {name: '其他', method: this.getLivingStyle,"value": "OTHER_HOUSE"},
        ],

        response : [
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
      ok () {
        if(this.livingType=='其他'){
          return (this.livingType!='请选择您的居住情况')&&(this.livingPlace!='请选择您的现居住地')
            &&this.housenumber&&this.lifeYears&&this.livingTypeOther;
        }
        else {
          return (this.livingType!='请选择您的居住情况')&&(this.livingPlace!='请选择您的现居住地')
            &&this.housenumber&&this.lifeYears;
        }
      },
    },

    methods : {
      // 初始化
      init () {
        //在API_UESR_LIVING_INFO接口中
        axios.post(API_UESR_LIVING_INFO,{
          //从url中取到token和requestId给后台
          comm : { pid : "手机唯一标记",type:"4", version :"2.1.2"},
          token:this.$route.query.token,
          body:{
            requestId:this.$route.query.requestId,
          },
        },{timeout:90000}).then(res => {
          let json = res.data;
          //操作成功
          if (json.code == '00000') {
            //返回id 有id为更新操作 没有为新增操作
            //拿到后台的id
            this.pid=json.data.pid;
            //判断id值
            if(this.pid){
              //更新操作之前需要回显数据
              for(let i=0;i<this.actions.length;i++){
                if(this.actions[i].value == json.data.livingType){
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
              this.livingPlace = this.fullAddress[0]+this.fullAddress[1]+this.fullAddress[2];
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

      //点击提交按钮提交
      commit(){
        if (!this.canClick) {
          return;
        }
        this.canClick = false;
        //在API_UESR_LIVING_INFO_SAVE_UPDATE接口中传值
        axios.post(API_UESR_LIVING_INFO_SAVE_UPDATE,{
          //从url中取到token和requestId给后台
          comm : { pid : "手机唯一标记",type:"4", version :"2.1.2"},
          token:this.$route.query.token,
          //提交数据
          body:{
            appRequestId:this.$route.query.requestId,
            addressId:this.addressId,
            pid:this.pid,
            livingType:this.livingTypeValue,
            livingTypeOther:this.livingTypeOther,
            lifeYears:this.lifeYears,
            provinceCode:this.provinceCode,
            cityCode:this.cityCode,
            distCode:this.distCode,
            housenumber:this.housenumber,
            completeaddress:this.fullAddress[0]+' '+this.fullAddress[1]+' '+this.fullAddress[2]+' '+this.housenumber,
        }
      },{timeout:90000}).then(res => {
          let json = res.data;
          //验证通过
          if (json.code == '00000') {
            this.pid=json.data.pid;
            this.msg = '登录成功';
            this.isActive=true;
            let timer=window.setTimeout(() => {
              this.msg = false;
              this.isActive=false;
              this.canClick = true;
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
              this.canClick = true;
            },2000);
          }
        },error =>{
          this.isActive=true;
          this.msg ='提交数据失败，请稍后重试！';
          let timer=window.setTimeout(() => {
            this.msg = false;
            this.canClick = true;
          },2000);
        })
      },

      //提交成功，关闭当前窗口
      close(){
        //关闭界面
      },

      //获取地区
      getProvince(){
        this.msg='加载中...';
        this.isActive = true;
        if(this.localData.hasOwnProperty(this.num)){
          this.isActive = false;
          this.msg=false;
          this.$set(this, 'provinces', this.localData[this.num]);//给this赋值
          this.provinceList=true;
        }
        else {
          axios.post(API_CITY+this.num,{},{timeout:90000}).then(res => {
            let json = res.data;
            if (json.code == '00000') {
              this.isActive = false;
              this.msg=false;
              this.$set(this, 'provinces', json.data);//给this赋值
              this.provinceList=true;
              this.localData[this.num] = json.data;
            }else{
              this.isActive = true;
              this.msg = json.msg;
              this.timeout();
            }
          }).catch(error =>{
            this.isActive = true;
            this.msg ='提交数据失败，请稍后重试！';
            this.timeout();
          });
        }
      },

      //点击省份折叠对应的市
      showCity(province){
        //判断当前点击省份是否和okProvince值相同，如不同当前省份赋值给okProvince;
        this.provinceCode = province.value;
        this.okProvince = this.okProvince === province.text ? '' : province.text;
        this.isActive = true;
        this.msg='加载中...';

        if(this.localData.hasOwnProperty(this.provinceCode)){
          this.isActive = false;
          this.msg=false;
          this.$set(this, 'cities', this.localData[this.provinceCode]);//给this赋值
          this.provinceList=true;
        }
        else {
          axios.post(API_CITY+this.provinceCode,{},{timeout:90000}).then(res => {
            let json = res.data;
            //打断点，查看debugger;
            if (json.code == '00000') {
              this.msg=false;
              this.isActive = false;
              this.$set(this, 'cities', json.data);//给this赋值
              this.provinceList=true;
              this.localData[this.provinceCode] = json.data;
            }else{
              this.isActive = true;
              this.msg = json.msg;
              this.timeout();
            }
          }).catch(error =>{
            this.isActive = true;
            this.msg ='提交数据失败，请稍后重试！';
            this.timeout();
          });
        }
      },

      //点击市折叠对应的区
      showDist(city){
        this.cityCode = city.value;
        this.okCity = this.okCity === city.text ? '' : city.text;
        this.isActive = true;
        this.msg='加载中...';

        if(this.localData.hasOwnProperty(this.cityCode)){
          this.isActive = false;
          this.msg=false;
          this.$set(this, 'dists', this.localData[this.cityCode]);//给this赋值
          this.provinceList=true;
        }
        else {
          axios.post(API_CITY+this.cityCode,{},{timeout:90000}).then(res => {
            let json = res.data;
            //打断点，查看debugger;
            if (json.code == '00000') {
              this.isActive = false;
              this.msg=false;
              this.$set(this, 'dists', json.data);//给this赋值
              this.provinceList=true;
              this.localData[this.cityCode] = json.data;
            }else{
              this.isActive = true;
              this.msg = json.msg;
              this.timeout();
            }
          }).catch(error =>{
            this.isActive = true;
            this.msg ='提交数据失败，请稍后重试！';
            this.timeout();
          });
        }
      },

      //选中县区
      chooseDist(value,text){
        this.dist = text;
        this.distCode = value;
        this.provinceList = false;
        this.livingPlace = this.okProvince+this.okCity+this.dist;
        this.completeaddress = this.okProvince+' '+this.okCity+' '+this.dist+' ';
        this.fullAddress = this.completeaddress.split(" ");
      },

      //定时关闭弹框
      timeout(){
        window.setTimeout(() => {
          this.msg = false;
          this.isActive = false;
        },2000);
      },

      //取消选择城市
      colseCity(){
        this.provinceList=false;
      },

      getLivingStyle(action){
        this.livingType = action.name;
        for(let i=0;i<this.actions.length;i++){
          if(this.actions[i].name == action.name){
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

    components: {cTitle, Actionsheet}
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  div.living-information{
    width: 100%;
    height: 100%;
    font-family: YouYuan, Tahoma, STXihei;
    background-color: #f1f1f1;
    $bfb: 100%;
    $zero: 0px;
    $color: #4d4d4d;
    #cityoptions{
      z-index: 1;
      position: fixed;
      left: $zero;
      bottom: $zero;
      width: $bfb;
      height: $bfb;
      overflow: auto;
      -webkit-user-select: none;
      background: rgba(0, 0, 0, 0.2);
      .box{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: $bfb;
        height: $bfb;
        ul.provinces{
          width: $bfb;
          margin: $zero;
          background-color: #fff;
          padding: $zero;
          flex:1;
          position:fixed;
          top:$zero;
          bottom:1rem;
          overflow:scroll;
          li{
            list-style: none;
            label{
              padding-left: 16px;
            }
            ul{
              position: initial;
              padding: $zero;
              label{
                padding-left: 45px;
              }
              div{}
              ul{
                li{
                  label{
                    padding-left: 74px;
                  }
                }
              }
            }
            .op {
              width: $bfb;
              //height: 43px;
              line-height: 43px;
              background: #fff;
              border-bottom: 1px #ececec solid;
              cursor: pointer;
              font-size: 15px;
              color: #192e54;
              position: relative;
              .pull_up {
                background: url("../../../assets/app/user/icon_sj1.png") 10px center no-repeat;
                background-size: 45% auto;
              }
              .pull_down {
                background: url("../../../assets/app/user/icon_sj2.png") 10px center no-repeat;
                background-size: 45% auto;
              }
              .pull {
                width: 30px;
                height: 25px;
                right: 8px;
                background-size: 45% auto;
                top: 10px;
                cursor: pointer;
                position: absolute;
              }
            }
            .op2 {
              background: #DDEDF1;
            }
          }
        }
        .qx{
          position: fixed;
          width: $bfb;
          height: 1rem;
          line-height: 1rem;
          background: #fff;
          border-top: 1px #45aa9c solid;
          cursor: pointer;
          bottom: $zero;
          left: $zero;
          font-size: 16px;
          color: #45aa9c;
          text-align: center;
        }
      }
    }
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
            span.paddingRight{
              padding-right: .15rem;
              width: 4.4rem;
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