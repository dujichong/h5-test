<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="job-information">
    <div @click="workTimePopupVisible = false, entryTimePopupVisible = false, isActive = false" class="layer" v-bind:class="{ active: isActive }"></div>
    <c-title :text="title" :hide="false"></c-title>

    <div class="job-business" v-bind:class="{ show: businessShow }">
      <div class="border"></div>
      <div class="ui-form">
        <form>
          <ul>
            <li>
              <label>工作时间</label>
              <span @click="workTimePopupShow" v-bind:class="{ blackColor: isWorkTimeColor}">{{workTime}}</span>
            </li>
          </ul>
        </form>
      </div>
      <div class="border"></div>
      <div class="ui-form">
        <form>
          <ul>
            <li>
              <label>经营主体</label>
              <input v-model="businessSubject" maxlength="11" placeholder="请填写经营主体名称">
            </li>

            <li>
              <label>现单位地区</label>
              <span @click="getCity" v-bind:class="{ blackColor: isWorkPlaceColor}">{{workPlace}}</span>
            </li>

            <li>
              <label>详细地址</label>
              <input v-model="address" placeholder="地址详细到门牌号码">
            </li>

            <li class="noBorder">
              <label>单位电话</label>
              <input class="width105" v-model="areaCode" placeholder="区号">
              <div class="border-right"></div>
              <input class="width218" v-model="telephoneNumber" placeholder="电话号码">
              <div class="border-right"></div>
              <input class="width131" v-model="extensionNumber" placeholder="分机号">
            </li>
          </ul>
        </form>
      </div>
      <div class="wrapper">
        <div class="submit" v-if="ok" @click="commit">
          <p style="color: #fff;">确认并提交</p>
        </div>
        <div class="submit" v-else>
          <p style="color: #9cd2ff;">确认并提交</p>
        </div>
      </div>
    </div>

    <div class="job-salary" v-bind:class="{ show: salaryShow }">
      <div class="border"></div>
      <div class="ui-form">
        <form>
          <ul>
            <li>
              <label>工作时间</label>
              <span @click="workTimePopupShow" v-bind:class="{ blackColor: isWorkTimeColor}">{{workTime}}</span>
            </li>

            <li>
              <label>现单位名称</label>
              <input v-model="companyName" maxlength="11" placeholder="请填写您的现单位名称">
            </li>

            <li class="noBorder">
              <label class="item">是否缴纳社保/公积金</label>
              <div class="box">
                <input class="circle" type="radio" id="yes" :checked="true" value="是" v-model="picked"><span class="opacity"></span>
              </div>
              <label class="yes" for="yes">是</label>
              <div class="box">
                <input class="circle" type="radio" id="no" :checked="false" value="否" v-model="picked"><span></span>
              </div>
              <label class="no" for="no">否</label>
            </li>
          </ul>
        </form>
      </div>
      <div class="border"></div>
      <div class="ui-form">
        <form>
          <ul>
            <li>
              <label>现单位地区</label>
              <span v-bind:class="{ blackColor: isWorkPlaceColor}">{{workPlace}}</span>
            </li>

            <li class="noBorder">
              <label>详细地址</label>
              <input v-model="address" placeholder="地址详细到门牌号码">
            </li>
          </ul>
        </form>
      </div>
      <div class="border"></div>
      <div class="ui-form">
        <form>
          <ul>
            <li >
              <label>单位电话</label>
              <input class="width105" v-model="areaCode" placeholder="区号">
              <div class="border-right"></div>
              <input class="width218" v-model="telephoneNumber" placeholder="电话号码">
              <div class="border-right"></div>
              <input class="width131" v-model="extensionNumber" placeholder="分机号">
            </li>

            <li>
              <label>现单位部门</label>
              <input v-model="department" placeholder="请填写您的部门">
            </li>

            <li @click="unitPositionSheetVisible = true"  v-bind:class="{ unique: isUnitPositionUnique }">
              <label>现单位职位</label>
              <span v-bind:class="{ blackColor: isUnitPosition}">{{unitPosition}}</span>
            </li>

            <li v-if="unitPositionOthersShow">
              <label>职位说明</label>
              <input v-model="unitPositionOthers" placeholder="请输入其他单位职位情况">
            </li>

            <li @click="unitNatureSheetVisible = true" v-bind:class="{ unique: isUnitNatureUnique }">
              <label>单位性质</label>
              <span v-bind:class="{ blackColor: isUnitNature}">{{unitNature}}</span>
            </li>

            <li v-if="unitNatureOthersShow">
              <label>单位说明</label>
              <input v-model="unitNatureOthers" placeholder="请输入其他单位性质情况">
            </li>

            <li class="noBorder">
              <label>入职时间</label>
              <span @click="entryTimePopupShow" v-bind:class="{ blackColor: isEntryTimeColor}">{{entryTime}}</span>
            </li>
          </ul>
        </form>
      </div>
      <div class="wrapper">
        <div class="submit" v-if="ok" @click="commit">
          <p style="color: #fff;">确认并提交</p>
        </div>
        <div class="submit" v-else>
          <p style="color: #9cd2ff;">确认并提交</p>
        </div>
      </div>
    </div>

    <Actionsheet :actions="unitPositionActions" v-model="unitPositionSheetVisible"></Actionsheet>
    <Actionsheet :actions="unitNatureActions" v-model="unitNatureSheetVisible"></Actionsheet>
    <Popup v-model="workTimePopupVisible" position="bottom" :modal="false" >
      <div class="button">
        <p class="cancel" @click="cancel">取消</p>
        <p class="confirm" v-bind:class="{ show: workTimeConfirmShow }" @click="workTimeConfirm">工作时间确认</p>
      </div>
      <Picker :slots="slots" :visibleItemCount="visibleItemCount"  :showToolbar="false" @change="onWorkTimeValuesChange">
        {{workTimeToolbar}}
      </Picker>
    </Popup>
    <Popup v-model="entryTimePopupVisible" position="bottom" :modal="false" >
      <div class="button">
        <p class="cancel" @click="cancel">取消</p>
        <p class="confirm" v-bind:class="{ show: entryTimeConfirmShow }" @click="entryTimeConfirm">入职时间确认</p>
      </div>
      <Picker :slots="slots" :visibleItemCount="visibleItemCount"  :showToolbar="false" @change="onEntryTimeValuesChange">
        {{entryTimeToolbar}}
      </Picker>
    </Popup>

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
  import axios from 'utils/axios';
  import { Actionsheet, Toast, Picker, Popup, DatetimePicker, Button} from 'mint-ui';

  const ROOTPATH = window.$rootPath;
  //添加或更新居住信息
  const API_UESR_OCCOPATION_INFO_SAVE_UPDATE= `${ROOTPATH}/user/requestController/saveOrUpdateOccupationInfoMethod`;
  //获取居住信息
  const API_UESR_OCCOPATION_INFO= `${ROOTPATH}/user/requestController/getOccupationInfoMethod`;
  //获取省市区信息
  const API_CITY= `${ROOTPATH}/dictionary/region/`;
  export default {

    data () {
      return {
        title: '职业信息',
        businessShow: true,//商类页面
        salaryShow: false,//薪类页面

        provinceCode: '',   //省code
        cityCode: '',         //市code
        distCode: '',         //县code
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
        msg:'',
        provinces: [],
        cities: [],
        dists: [],

        //商类
        workTime: '请选择您的工作时间',//商类工作时间
        workPlace: '请选择现单位所在地区',//现单位地区
        businessSubject: '',//经营主体
        address: '',//详细地址
        areaCode: '',//区号
        telephoneNumber: '',//电话号码
        extensionNumber: '',//分机号
        Toolbar: '',//组件picker中的toolbar
        workTimeToolbar: '',
        entryTimeToolbar: '',
        sheetVisible: false,
        pickerVisible: true,
        isWorkTimeColor: false,
        isWorkPlaceColor: false,
        workTimePopupVisible: false,
        entryTimePopupVisible: false,
        isActive: false,
        currentYear: 2017,
        before: 30,
        after: 10,
        unitPositionSheetVisible: false,
        unitNatureSheetVisible: false,
        isUnitPositionUnique: false,
        isUnitNatureUnique: false,
        temporaryWorkTime: '',
        temporaryEntryTime: '',
        workTimeConfirmShow: true,
        entryTimeConfirmShow: false,

        companyName: '',//现单位名称
        department: '',//现单位部门
        unitPosition: '请选择您的职位',//
        unitNature: '请选择您的单位性质',//
        entryTime: '请选择您的入职时间',
        isUnitPosition: false,
        isUnitNature: false,
        isEntryTimeColor: false,
        picked: '',
        unitPositionOthersShow: '',
        unitNatureOthersShow: '',
        slots: [
          {
            flex: 1,
            values: [],
            textAlign: 'right',
            defaultIndex: 30,
          }, {
            flex: 1,
            values: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月'],
            textAlign: 'left',
            defaultIndex: 2,
          }
        ],
        visibleItemCount: 5,
        unitPositionActions: [
          //负责人、高级管理人员、中级管理人员、一般管理人员、一般正式员工、派遣员工、非正式员工、其他。
          {name: '负责人', method: this.getUnitPosition},
          {name: '高级管理人员', method: this.getUnitPosition},
          {name: '中级管理人员', method: this.getUnitPosition},
          {name: '一般管理人员', method: this.getUnitPosition},
          {name: '一般正式员工', method: this.getUnitPosition},
          {name: '派遣员工', method: this.getUnitPosition},
          {name: '其他', method: this.getUnitPosition},
        ],
        unitNatureActions: [
          //机关事业、国企/上市公司、外资、合资、民营、个体、其他。
          {name: '机关事业', method: this.getUnitNature},
          {name: '国企/上市公司', method: this.getUnitNature},
          {name: '外资', method: this.getUnitNature},
          {name: '合资', method: this.getUnitNature},
          {name: '民营', method: this.getUnitNature},
          {name: '个体', method: this.getUnitNature},
          {name: '其他', method: this.getUnitNature},
        ],
      };
    },
    // 计算属性将被混入到 Vue 实例中。
    computed: {
      //按钮颜色改变
      ok () {
          return (this.workTime!='请选择您的工作时间')&&(this.workPlace!='请选择现单位所在地区')&&this.businessSubject&&this.address&&this.areaCode&&this.telephoneNumber&&this.extensionNumber;
      },
    },

    methods : {
      // 初始化
      init () {
        //在API_UESR_OCCOPATION_INFO接口中
        axios.post(API_UESR_OCCOPATION_INFO,{
          //从url中取到token和requestId给后台
          token:this.$route.query.token,
          requestId:this.$route.query.requestId,
        },{timeout:90000}).then(res => {
          let json = res.data;
          //操作成功
          if (json.code == '00000') {
            //返回id 有id为更新操作 没有为新增操作
            //拿到后台的id
            this.id=json.data.id;
            //判断id值
            if(this.id==1){
              //更新操作之前需要回显数据
              for(let i=0;i<this.response.length;i++){
                if(this.response[i].value == json.data.livingType){
                  this.livingType = this.response[i].text;
                }
              }
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
        //在API_UESR_LIVING_INFO_SAVE_UPDATE接口中传值
        axios.post(API_UESR_OCCOPATION_INFO_SAVE_UPDATE,{
          //从url中取到token和requestId给后台
          token:this.$route.query.token,
          requestId:this.$route.query.requestId,

          //提交数据
          addressId:this.addressId,
          id:this.id,
          livingType:this.livingTypeValue,
          livingTypeOther:this.livingTypeOther,
          lifeYears:this.lifeYears,
          provinceCode:this.provinceCode,
          cityCode:this.cityCode,
          distCode:this.distCode,
          housenumber:this.housenumber,
          completeaddress:this.completeaddress=this.fullAddress[0]+' '+this.fullAddress[1]+' '+this.fullAddress[2]+' '+this.housenumber,
        },{timeout:90000}).then(res => {
          let json = res.data;
          //验证通过
          if (json.code == '00000') {
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

      //定时关闭弹框
      timeout(){
        window.setTimeout(() => {
          this.msg = false;
        },2000);
      },

      //获取地区
      getCity(){
        this.msg='加载中...';
        axios.post(API_CITY+this.num,{},{timeout:90000}).then(res => {
          let json = res.data;
          //打断点，查看debugger;
          if (json.code == 1) {
            this.msg=false;
            this.$set(this, 'provinces', json.body);//给this赋值
            this.provinceList=true;
          }else{
            this.msg = json.msg;
            this.timeout();
          }
        }).catch(error =>{
          this.msg ='提交数据失败，请稍后重试！';
          this.timeout();
        });
      },

      //点击省份折叠对应的市
      showCity(province){
        //判断当前点击省份是否和okProvince值相同，如不同当前省份赋值给okProvince;
        this.provinceCode = province.value;
        this.okProvince = this.okProvince === province.text ? '' : province.text;
        console.log(this.provinceCode);
        this.msg='加载中...';
        axios.post(API_CITY+this.provinceCode,{},{timeout:90000}).then(res => {
          let json = res.data;
          //打断点，查看debugger;
          if (json.code == 1) {
            this.msg=false;
            this.$set(this, 'cities', json.body);//给this赋值
            this.provinceList=true;
          }else{
            this.msg = json.msg;
            this.timeout();
          }
        }).catch(error =>{
          this.msg ='提交数据失败，请稍后重试！';
          this.timeout();
        });
      },

      //点击市折叠对应的区
      showDist(city){
        this.cityCode = city.value;
        this.okCity = this.okCity === city.text ? '' : city.text;
        console.log(this.cityCode);
        this.msg='加载中...';
        axios.post(API_CITY+this.cityCode,{},{timeout:90000}).then(res => {
          let json = res.data;
          //打断点，查看debugger;
          if (json.code == 1) {
            this.msg=false;
            this.$set(this, 'dists', json.body);//给this赋值
            this.provinceList=true;
          }else{
            this.msg = json.msg;
            this.timeout();
          }
        }).catch(error =>{
          this.msg ='提交数据失败，请稍后重试！';
          this.timeout();
        });

      },

      //选中县区
      chooseDist(value,text){
        this.dist = text;
        this.distCode = value;
        this.provinceList = false;
        this.workPlace = this.okProvince+this.okCity+this.dist;
        this.isWorkPlaceColor = true;
        console.log(this.distCode);
      },

      //取消选择城市
      colseCity(){
        this.provinceList=false;
      },

      //组件Picker当被选中的值发生变化时触发 change 事件， change 事件会执行onWorkTimeValuesChange函数和onEntryTimeValuesChange函数
      //取得当前值并存在Toolbar上
      onWorkTimeValuesChange(picker){
        this.workTimeToolbar = picker.getValues()[0].concat(picker.getValues()[1]);
      },
      onEntryTimeValuesChange(picker){
        this.entryTimeToolbar = picker.getValues()[0].concat(picker.getValues()[1]);
      },


      //用到了两个picker因为有两个时间选择选项
      //商类点击工作时间的时候popup组件显示，自己定的朦层显示（此处没有使用组件自带的朦层，因为当界面中有多个组件的时候有问题）
      workTimePopupShow(){
        this.workTimePopupVisible = true;
        this.isActive = true;
        this.workTimeConfirmShow = true;
      },
      entryTimePopupShow(){
        this.entryTimePopupVisible = true;
        this.isActive = true;
        this.entryTimeConfirmShow = true;
      },
      //取消按钮
      cancel(){
        this.workTimePopupVisible = false;
        this.entryTimePopupVisible = false;
        this.isActive = false;
      },

      //工作时间的确认按钮
      workTimeConfirm(){
        this.workTimePopupVisible = false;
        this.isActive = false;
        this.workTime = this.workTimeToolbar;
        this.isWorkTimeColor = true;
      },
      //入职时间的确认按钮
      entryTimeConfirm(){
        this.entryTimePopupVisible = false;
        this.isActive = false;
        this.entryTime = this.entryTimeToolbar;
        this.isEntryTimeColor = true;
      },

      //获取公司职位
      getUnitPosition(action){
        this.unitPosition = action.name;
        this.isUnitPosition = true;
        if(action.name == '其他'){
          this.unitPositionOthersShow = true;
          this.isUnitPositionUnique = true;
        }
        else {
          this.unitPositionOthersShow = false;
          this.isUnitPositionUnique = false;
        }
      },

      //获取公司性质
      getUnitNature(action){
        this.unitNature = action.name;
        this.isUnitNature = true;
        if(action.name == '其他'){
          this.unitNatureOthersShow = true;
          this.isUnitNatureUnique = true;
        }
        else {
          this.unitNatureOthersShow = false;
          this.isUnitNatureUnique = false;
        }
      },
    },

    mounted(){
    },

    //数据更新的时候改变选中项的css样式
    updated(){
      let element2 = this.$el.getElementsByClassName('picker-item');
      let element1 = this.$el.getElementsByClassName('picker-selected');
      let element3 = this.$el.getElementsByClassName('picker-center-highlight');
      for (let i = 0; i < element2.length; i++) {
        element2[i].style.color = "#b8b8b8";
        element2[i].style.paddingLeft = ".98rem";
        element2[i].style.paddingRight = ".98rem";
      }
      for (let j = 0; j < element1.length; j++) {
        element1[j].style.color = "#333";
      }
      element3[0].style.borderTop = '1px solid #cdcdcd';
      element3[0].style.borderBottom = '1px solid #cdcdcd';
    },
    //初始化调用设置年份数据
    created(){
      var minYear = this.currentYear-this.before;
      for (let i = 0; i <= this.before + this.after; i++) {
        this.slots[0].values[i] = minYear+'年';
        minYear++;
      }
      this.init();
    },

    components: {cTitle, Actionsheet, Picker, Popup, DatetimePicker}
  }

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
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

  div.job-information{
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
    div.active{
      display: block;
    }
    div.job-business,div.job-salary{
      display: none;
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
              div.box{
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-right: 10px;
                position: relative;
                background: #fff;
                vertical-align: middle;
                border:1px solid #1796f9;
                border-radius: 100%;
                float: left;
                margin-top: .34rem;

                input.circle{
                  float: left;
                  margin: .04rem 0;
                  opacity: 0;
                  position: absolute;
                  z-index:100;
                  width: 100%;
                  height: 100%;
                }
                input+span {
                  display: block;
                  width: 6px;
                  height: 6px;
                  border-radius:50%;
                  position: absolute;
                  background: #1796f9;
                  top: 50%;
                  left:50%;
                  margin: -3px 0  0 -3px;
                  z-index:1;
                }
                input[type="radio"] + span {
                  opacity: 0;
                }
                input[type="radio"]:checked + span {
                  opacity: 1;
                }
                span.opacity{
                  opacity: 1;
                }
              }
              label{
                width: 2.3rem;
                display: block;
                float: left;
                font-size: .3rem;
                color: #333333;
                //background-color: aqua;
              }
              label.item{
                width: 3.83rem;
              }
              label.yes, label.no{
                width: .36rem;
                height: .98rem;
              }
              label.yes{
                margin: 0 1.02rem 0 .06rem;
              }
              label.no{
                margin-left: .06rem;
              }

              span.cityVal{
                width:3.2rem;
                display: block;
                float: left;
                font-size: 15px;
                border: none;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
                color: #b3b3b3;
              }
              label.gs-wid{
                width: 2.5rem;
              }
              span.storeval{
                width: 2.69rem;
              }
              span.hint{
                display: block;
                float: left;
                margin-top:0.25rem;
                width: 0.8rem;
                height: 0.47rem;
                background-image: url("../../../assets/app/user/apply-sj1.png");
                background-size: $bfb $bfb;
                border-left: 1px solid #CDCDCD;
              }
              span.color-2{
                color: $color;
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
              input.width105{
                width: 1.04rem;
                float: left;
              }
              input.width218{
                width: 2.17rem;
                float: left;
                text-align: center;
              }
              input.width131{
                width: 1.30rem;
                float: left;
                text-align: right;
              }
              div.border-right{
                width: 1px;
                height: .3rem;
                margin-top: .35rem;
                background-color: #e6e6e6;
                float: left;
              }
              span{
                color: #b2b2b2;
                background: url("../../../assets/app/user/angle-right.png") no-repeat right center;
                background-size: .14rem .26rem;
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
      div.wrapper {
        width: 100%;
        background: #f1f1f1;
        height: 1.3rem;
        padding-top: .5rem;
        div.submit {
          width: 6.86rem;
          height: .88rem;
          margin: 0 .32rem .32rem;
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
    }
    div.show{
      display: block;
    }
    div.mint-popup{
      width: 100%;
      div.button{
        width: 100%;
        height: .87rem;
        line-height: .87rem;
        font-size: .3rem;
        color: #1082fe;
        background-color: #f7f7f7;
        p.cancel{
          float: left;
          margin: auto  0 auto .15rem;
        }
        p.confirm{
          float: right;
          margin: auto  .15rem auto 0;
          display: none;
        }
        p.show{
          display: block;
        }
      }
      div.picker{
        //background: red;
      }
    }

  }
</style>