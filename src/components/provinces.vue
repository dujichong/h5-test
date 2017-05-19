<template>
  <div id="cityOptions" v-if="provinceList">
    <c-loading :show="loading"></c-loading>
    <c-msg :msg="msg"></c-msg>
    <div class="box">
      <ul class="provinces">
        <li v-for="(province , index) of provinces">
          <div :class="'op ' + (province.value == okProvinceCode ? 'op2' : '')" @click="showCity(province)">
            <label>{{province.text}}</label>
            <span :class="'pull ' + (province.value == okProvinceCode ? 'pull_down' : 'pull_up')"></span>
          </div>

          <ul v-if="province.value == okProvinceCode">
            <li v-for="(city,index) of cities" class="op">
              <div :class="'op ' + (city.value == okCityCode ? 'op2' : '')" @click="showDist(city)"><!---->
                <label>{{city.text}}</label>
                <span :class="'pull ' + (city.value == okCityCode ? 'pull_down' : 'pull_up')"></span><!---->
              </div><!---->

              <ul v-if="city.value == okCityCode">
                <li @click="chooseDist(dist.value,dist.text)" v-for="(dist,index) of dists" class="op">
                  <label>{{dist.text}}</label>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <div class="qx" @click="closeCity">取消</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import cLoading from 'components/loading';
  import cMsg from 'components/msg';
  const ROOTPATH = window.$rootPath;
  const API_CITY= `${ROOTPATH}/dictionary/region/`;
  export default {
    data () {
      return {
        provinceCode: '',   //省code
        cityCode: '',         //市code
        distCode: '',         //县code
        num: '-1',
        okProvince: '',
        okCity: '',
        okDist: '',
        okProvinceCode: '',
        okCityCode: '',
        okDistCode: '',
        city: '',
        dist:'',
        name:'',
        provinces: [],
        cities: [],
        dists: [],
        localData: {},
        fullAddress: '',
        completeaddress: '',
        livingPlace: '',
        workPlace: '',
      };
    },

    props: ['provinceList'],

    methods: {
      //获取地区
      getProvince(){
        if(this.localData.hasOwnProperty(this.num)){
          this.$set(this, 'provinces', this.localData[this.num]);//给this赋值
        }
        else {
          this.loading = true;
          axios.post(API_CITY+this.num,{},{timeout:90000}).then(res => {
            let json = res.data;
            if (json.code == '00000') {
              this.loading=false;
              this.$set(this, 'provinces', json.data);//给this赋值
              this.localData[this.num] = json.data;
            }else{
              this.loading = false;
              this.msg = json.msg;
              this.timeout();
            }
          }).catch(error =>{
            this.loading = false;
            this.msg ='提交数据失败，请稍后重试！';
            this.timeout();
          });
        }
      },

      //点击省份折叠对应的市
      showCity(province){
        this.$emit('showCity',province);
        //判断当前点击省份是否和okProvince值相同，如不同当前省份赋值给okProvince;
        this.provinceCode = province.value;
//      this.okProvince = this.okProvince === province.text ? '' : province.text;
        this.okProvince = province.text;
        this.okProvinceCode = this.okProvinceCode === province.value ? '' : province.value;
        //在请求之前让数组cities为空，否则会出现一个小问题。假设第一步点击了河北省，会出现石家庄，唐山，秦皇岛等等
        //再点击北京或者其他城市，如果ajax请求比较慢，一直无法返回数据的话，依然会出现石家庄，唐山，秦皇岛等等。
        this.$set(this, 'cities', []);
        if(this.localData.hasOwnProperty(this.provinceCode)){
          this.$set(this, 'cities', this.localData[this.provinceCode]);//给this赋值
        }
        else {
          this.loading = true;
          axios.post(API_CITY+this.provinceCode,{},{timeout:90000}).then(res => {
            let json = res.data;
            //打断点，查看debugger;
            if (json.code == '00000') {
              this.loading=false;
              this.$set(this, 'cities', json.data);//给this赋值
              this.localData[this.provinceCode] = json.data;
            }else{
              this.loading = false;
              this.msg = json.msg;
              this.timeout();
            }
          }).catch(error =>{
            this.loading = false;
            this.msg ='提交数据失败，请稍后重试！';
            this.timeout();
          });
        }
      },

      //点击市折叠对应的区
      showDist(city){
        this.$emit('showDist',city);
        this.cityCode = city.value;
        //使用city.value而不是city.text是因为value唯一，而text并不是唯一的，比如北京市和天津市都有直辖市和县
        //this.okCity = this.okCity === city.text ? '' : city.text;
        this.okCity = city.text;
        this.okCityCode = this.okCityCode === city.value ? '' : city.value;
        this.$set(this, 'dists', []);
        if(this.localData.hasOwnProperty(this.cityCode)){
          this.$set(this, 'dists', this.localData[this.cityCode]);//给this赋值
        }
        else {
          this.loading = true;
          axios.post(API_CITY+this.cityCode,{},{timeout:90000}).then(res => {
            let json = res.data;
            //打断点，查看debugger;
            if (json.code == '00000') {
              this.loading=false;
              this.$set(this, 'dists', json.data);//给this赋值
              this.localData[this.cityCode] = json.data;
            }else{
              this.loading = false;
              this.msg = json.msg;
              this.timeout();
            }
          }).catch(error =>{
            this.loading = false;
            this.msg ='提交数据失败，请稍后重试！';
            this.timeout();
          });
        }
      },

      //定时关闭弹框
      timeout(){
        window.setTimeout(() => {
          this.msg = false;
        },2000);
      },

      //选中县区
      chooseDist(value,text){
        this.$emit('chooseDist',value,text);
        this.dist = text;
        this.distCode = value;
        //this.livingPlace = this.okProvince+this.okCity+this.dist;
        this.completeaddress = this.okProvince+' '+this.okCity+' '+this.dist+' ';
        this.fullAddress = this.completeaddress.split(" ");
        this.closeCity();
      },

      //取消选择城市
      closeCity(){
        this.$emit('closeCity');
      },
    },

    components: {cLoading, cMsg}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  $bfb: 100%;
  $zero: 0px;
  $color: #4d4d4d;
  #cityOptions{
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
              background: url("../assets/components/cityOptions/icon_sj1.png") 10px center no-repeat;
              background-size: 45% auto;
            }
            .pull_down {
              background: url("../assets/components/cityOptions/icon_sj2.png") 10px center no-repeat;
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
</style>