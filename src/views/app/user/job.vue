<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="job-information">
    <div @click="workTimePopupVisible = false, entryTimePopupVisible = false, isActive = false" class="layer" v-bind:class="{ active: isActive }"></div>
    <c-title :text="title" :hide="false"></c-title>
    <c-loading :show="loading"></c-loading>
    <c-msg :msg="msg"></c-msg>

    <div class="job-business" v-bind:class="{ show: businessShow }">
      <div class="border"></div>
      <div class="ui-form">
        <form>
          <ul>
            <li>
              <label>工作时间</label>
              <span @click="workTimePopupShow" v-bind:class="{ blackColor: officialJobDate!='请选择您的工作时间'}">{{officialJobDate}}</span>
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
              <input v-model="companyName" maxlength="11" placeholder="请填写经营主体名称">
            </li>

            <li>
              <label>现单位地区</label>
              <span class="paddingRight" @click="getProvince" v-bind:class="{ blackColor: workPlace!='请选择现单位所在地区'}">{{workPlace}}</span>
            </li>

            <li>
              <label>详细地址</label>
              <input v-model="housenumber" placeholder="地址详细到门牌号码">
            </li>

            <li class="noBorder">
              <label>单位电话</label>
              <input class="width105" maxlength="4" v-model="areaCode" placeholder="区号">
              <div class="border-right"></div>
              <input class="width218" maxlength="8" v-model="telephoneNumber" placeholder="电话号码">
              <div class="border-right"></div>
              <input class="width131" v-model="branchNumber" placeholder="分机号">
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
              <span @click="workTimePopupShow" v-bind:class="{ blackColor: officialJobDate!='请选择您的工作时间'}">{{officialJobDate}}</span>
            </li>

            <li>
              <label>现单位名称</label>
              <input v-model="companyName" maxlength="11" placeholder="请填写您的现单位名称">
            </li>

            <li class="noBorder">
              <label class="item">是否缴纳社保/公积金</label>
              <div class="box">
                <input class="circle" type="radio" id="yes" :checked="true" value="true" v-model="payOfSocialSecurityFund"><span class="opacity"></span>
              </div>
              <label class="yes" for="yes">是</label>
              <div class="box">
                <input class="circle" type="radio" id="no" :checked="false" value="false" v-model="payOfSocialSecurityFund"><span></span>
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
              <span class="paddingRight" @click="getProvince" v-bind:class="{ blackColor: workPlace!='请选择现单位所在地区'}">{{workPlace}}</span>
            </li>

            <li class="noBorder">
              <label>详细地址</label>
              <input v-model="housenumber" placeholder="地址详细到门牌号码">
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
              <input class="width105" maxlength="4" v-model="areaCode" placeholder="区号">
              <div class="border-right"></div>
              <input class="width218" maxlength="8" v-model="telephoneNumber" placeholder="电话号码">
              <div class="border-right"></div>
              <input class="width131" v-model="branchNumber" placeholder="分机号">
            </li>

            <li>
              <label>现单位部门</label>
              <input v-model="department" placeholder="请填写您的部门">
            </li>

            <li @click="unitPositionSheetVisible = true"  v-bind:class="{ unique: jobTitleType=='其他' }">
              <label>现单位职位</label>
              <span v-bind:class="{ blackColor: jobTitleType!='请选择您的职位'}">{{jobTitleType}}</span>
            </li>

            <li v-if="jobTitleType=='其他'">
              <label>职位说明</label>
              <input v-model="messageOfJobTitleType" placeholder="请输入其他单位职位情况">
            </li>

            <li @click="unitNatureSheetVisible = true" v-bind:class="{ unique: companyType=='其他' }">
              <label>单位性质</label>
              <span v-bind:class="{ blackColor: companyType!='请选择您的单位性质'}">{{companyType}}</span>
            </li>

            <li v-if="companyType=='其他'">
              <label>单位说明</label>
              <input v-model="messageOfCompanyType" placeholder="请输入其他单位性质情况">
            </li>

            <li class="noBorder">
              <label>入职时间</label>
              <span @click="entryTimePopupShow" v-bind:class="{ blackColor: enterCompanyDate!='请选择您的入职时间'}">{{enterCompanyDate}}</span>
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

    <Actionsheet :actions="jobTitleTypeActions" v-model="unitPositionSheetVisible"></Actionsheet>
    <Actionsheet :actions="companyTypeActions" v-model="unitNatureSheetVisible"></Actionsheet>
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

    <div id="cityOptions" v-if="provinceList">
      <div class="box">
        <ul class="provinces">
          <li v-for="(province , index) of provinces">
            <div :class="'op ' + (province.value == okProvinceCode ? 'op2' : '')" @click="showCity(province)">
              <label>{{province.text}}</label>
              <span :class="'pull ' + (province.value == okProvinceCode ? 'pull_down' : 'pull_up')"></span>
            </div>

            <ul v-if="province.value == okProvinceCode">
              <!--@click="chooseCity(city.text,city.value)"-->
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
        <div class="qx" @click="colseCity">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
  import cTitle from 'components/title';
  import cLoading from 'components/loading';
  import cMsg from 'components/msg';
  import axios from 'axios';
  import { Actionsheet, Toast, Picker, Popup, DatetimePicker, Button} from 'mint-ui';
  const ROOTPATH = window.$rootPath;
  //添加或更新职业信息
  const API_UESR_OCCOPATION_INFO_SAVE_UPDATE= `${ROOTPATH}/user/requestController/saveOrUpdateOccupationInfoMethod`;
  //获取职业信息
  const API_UESR_OCCOPATION_INFO= `${ROOTPATH}/user/requestController/getOccupationInfoMethod`;
  //获取省市区信息
  const API_CITY= `${ROOTPATH}/dictionary/region/`;
  export default {

    data () {
      return {
        title: '职业信息',
        businessShow: false,//商类页面
        salaryShow: false,//薪类页面
        salaryFrom: '',//1位薪类，2位商类

        canClick: true,//多次点击

        loading: false,
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
        okProvinceCode: '',
        okCityCode: '',
        okDistCode: '',
        city: '',
        dist:'',
        name:'',
        msg: '',
        provinces: [],
        cities: [],
        dists: [],
        localData: {},

        //商类
        officialJobDate: '请选择您的工作时间',//商类工作时间
        officialJobDateYear:'',
        officialJobDateMonth: '',
        year: '',
        mounth: '',

        pid: '',
        companyName: '',//现单位名称或者经营主体
        payOfSocialSecurityFund: true,
        workPlace: '请选择现单位所在地区',//现单位地区
        housenumber: '',//详细地址
        completePhone: '',
        areaCode: '',//区号
        telephoneNumber: '',//电话号码
        branchNumber: '',//分机号
        department: '',//现单位部门
        jobTitleType: '请选择您的职位',//
        messageOfJobTitleType: '',
        companyType: '请选择您的单位性质',//
        messageOfCompanyType: '',
        jobTitleTypeValue: '',
        companyTypeValue: '',
        enterCompanyDate: '请选择您的入职时间',
        enterCompanyDateYear: '',
        enterCompanyDateMonth: '',
        Toolbar: '',//组件picker中的toolbar
        workTimeToolbar: '',
        entryTimeToolbar: '',
        sheetVisible: false,
        pickerVisible: true,
        workTimePopupVisible: false,
        entryTimePopupVisible: false,
        isActive: false,//使用了两个朦层，mint-ui统一使用这个，因为这个朦层有一个功能，点击朦层本身的时候，朦层会消失
        currentYear: 2017,
        before: 30,
        after: 10,
        unitPositionSheetVisible: false,
        unitNatureSheetVisible: false,
        temporaryWorkTime: '',
        temporaryEntryTime: '',
        workTimeConfirmShow: true,
        entryTimeConfirmShow: false,
        workSeniority: '',
        workYears: '',
        picked: 'yes',
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
        jobTitleTypeActions: [
          //负责人、高级管理人员、中级管理人员、一般管理人员、一般正式员工、派遣员工、非正式员工、其他。
          {name: '负责人', method: this.getJobTitleType, "value": "HEAD"},
          {name: '高级管理人员', method: this.getJobTitleType, "value": "SENIOR_MANAGEMENT"},
          {name: '中级管理人员', method: this.getJobTitleType, "value": "INTERMEDIATE_MANAGEMENT"},
          {name: '一般管理人员', method: this.getJobTitleType, "value": "GENERAL_MANAGEMENT"},
          {name: '一般正式员工', method: this.getJobTitleType, "value": "GENERAL_STAFF"},
          {name: '派遣员工', method: this.getJobTitleType, "value": "DISPATCH_STAFF"},
          {name: '非正式员工', method: this.getJobTitleType, "value": "INFORMAL_STAFF"},
          {name: '退休人员', method: this.getJobTitleType, "value": "RETIREE"},
          {name: '其他', method: this.getJobTitleType, "value": "OTHER"},
        ],
        unitPositionResponse : [
          {
            "text": "负责人",
            "value": "HEAD"
          }, {
            "text": "高级管理人员",
            "value": "SENIOR_MANAGEMENT"
          }, {
            "text": "中级管理人员",
            "value": "INTERMEDIATE_MANAGEMENT"
          }, {
            "text": "一般管理人员",
            "value": "GENERAL_MANAGEMENT"
          }, {
            "text": "一般正式员工",
            "value": "GENERAL_STAFF"
          }, {
            "text": "派遣员工",
            "value": "DISPATCH_STAFF"
          }, {
            "text": "非正式员工",
            "value": "INFORMAL_STAFF"
          }, {
            "text": "退休人员",
            "value": "RETIREE"
          }, {
            "text": "其他",
            "value": "OTHER"
          }
        ],

        companyTypeActions: [
          //机关事业、国企/上市公司、外资、合资、民营、个体、其他。
          {name: '机关事业单位', method: this.getCompanyType, "value": "ENTERPRISE_COMPANY"},
          {name: '国企/上市公司', method: this.getCompanyType, "value": "LIST_COMPANY"},
          {name: '外资', method: this.getCompanyType, "value": "OUT_COMPANY"},
          {name: '合资', method: this.getCompanyType, "value": "JOINT_VENTURE"},
          {name: '民营企业', method: this.getCompanyType, "value": "OPERATE_COMPANY"},
          {name: '个体', method: this.getCompanyType, "value": "PRIVATE_COMPANY"},
          {name: '其他', method: this.getCompanyType, "value": "OTHER_COMPANY"},
        ],
        unitNatureResponse : [
          {
            "text": "机关事业单位",
            "value": "ENTERPRISE_COMPANY"
          },
          {
            "text": "国企/上市公司",
            "value": "LIST_COMPANY"
          },
          {
            "text": "外资",
            "value": "OUT_COMPANY"
          },
          {
            "text": "合资",
            "value": "JOINT_VENTURE"
          },
          {
            "text": "民营企业",
            "value": "OPERATE_COMPANY"
          },
          {
            "text": "个体",
            "value": "PRIVATE_COMPANY"
          },
          {
            "text": "其它",
            "value": "OTHER_COMPANY"
          }
        ],
      };
    },

    // 计算属性将被混入到 Vue 实例中。
    computed: {
      //按钮颜色改变
      ok () {
        if(this.businessShow == true){
          return (this.officialJobDate!='请选择您的工作时间')&&(this.workPlace!='请选择现单位所在地区')&&this.companyName
            &&this.housenumber&&this.areaCode&&this.telephoneNumber;
        }
        else {

          if(this.jobTitleType=='其他' && this.companyType!='其他'){
            return (this.officialJobDate!='请选择您的工作时间')&&(this.workPlace!='请选择现单位所在地区')&&this.companyName
              &&this.housenumber&&this.areaCode&&this.telephoneNumber&&this.department
              &&(this.jobTitleType!='请选择您的职位')&&this.messageOfJobTitleType
              &&(this.companyType!='请选择您的单位性质')&&(this.enterCompanyDate!='请选择您的入职时间');
          }
          else if(this.companyType=='其他' && this.jobTitleType!='其他'){
            return (this.officialJobDate!='请选择您的工作时间')&&(this.workPlace!='请选择现单位所在地区')&&this.companyName
              &&this.housenumber&&this.areaCode&&this.telephoneNumber&&this.department
              &&(this.jobTitleType!='请选择您的职位')&&(this.companyType!='请选择您的单位性质')
              &&this.messageOfCompanyType&&(this.enterCompanyDate!='请选择您的入职时间');
          }
          else if(this.companyType!='其他' && this.jobTitleType!='其他'){
            return (this.officialJobDate!='请选择您的工作时间')&&(this.workPlace!='请选择现单位所在地区')&&this.companyName
              &&this.housenumber&&this.areaCode&&this.telephoneNumber&&this.department
              &&(this.jobTitleType!='请选择您的职位')&&(this.companyType!='请选择您的单位性质')&&(this.enterCompanyDate!='请选择您的入职时间');
          }
          else {
            return (this.officialJobDate!='请选择您的工作时间')&&(this.workPlace!='请选择现单位所在地区')&&this.companyName
              &&this.housenumber&&this.areaCode&&this.telephoneNumber&&this.department
              &&(this.jobTitleType!='请选择您的职位')&&this.messageOfJobTitleType
              &&(this.companyType!='请选择您的单位性质')&&this.messageOfCompanyType&&(this.enterCompanyDate!='请选择您的入职时间');
          }
        }
      },
    },

    methods : {
      // 初始化
      init () {
        //在API_UESR_LIVING_INFO接口中
        this.loading = true;
        axios.post(API_UESR_OCCOPATION_INFO,{
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
            this.loading = false;
            this.pid=json.data.pid;
            this.salaryFrom = json.data.salaryFrom;
            if(this.salaryFrom==1){
              this.salaryShow = true;
              this.businessShow = false;
            }
            if(this.salaryFrom==2){
              this.businessShow = true;
              this.salaryShow = false;
            }
            //判断id值
            if(this.pid){
              //更新操作之前需要回显数据
              for(let i=0;i<this.jobTitleTypeActions.length;i++){
                if(this.jobTitleTypeActions[i].value == json.data.jobTitleType){
                  this.jobTitleType = this.jobTitleTypeActions[i].name;
                }
              }

              for(let i=0;i<this.companyTypeActions.length;i++){
                if(this.companyTypeActions[i].value == json.data.companyType){
                  this.companyType = this.companyTypeActions[i].name;
                }
              }

              this.jobTitleTypeValue = json.data.jobTitleType;
              this.companyTypeValue = json.data.companyType;
              let officialJobTime = new Date( Number(json.data.officialJobDate) ).toLocaleString();
              let enterCompanyTime = new Date( Number(json.data.enterCompanyDate) ).toLocaleString();
              this.addressId = json.data.addressId;
              this.provinceCode = json.data.provinceCode;
              this.cityCode = json.data.cityCode;
              this.distCode = json.data.distCode;
              this.housenumber = json.data.housenumber;
              this.completeaddress = json.data.completeaddress;
              this.fullAddress = this.completeaddress.split(" ");
              this.workPlace = this.fullAddress[0]+this.fullAddress[1]+this.fullAddress[2];
              this.appCustomerId = json.data.appCustomerId;
              this.officialJobDate = officialJobTime.split('/')[0]+'年'+officialJobTime.split('/')[1]+'月';
              this.enterCompanyDate = enterCompanyTime.split('/')[0]+'年'+enterCompanyTime.split('/')[1]+'月';
              this.companyName = json.data.companyName;
              this.completePhone =  json.data.completePhone;
              this.areaCode = json.data.completePhone.split('-')[0];
              this.telephoneNumber = json.data.completePhone.split('-')[1];
              this.branchNumber =  json.data.branchNumber;
              this.department =  json.data.department;
              this.messageOfJobTitleType =  json.data.messageOfJobTitleType;
              this.messageOfCompanyType =  json.data.messageOfCompanyType;
              this.payOfSocialSecurityFund =  json.data.payOfSocialSecurityFund;
              this.workYears = json.data.workYears;
              this.workSeniority = json.data.workSeniority;
            }
            //没有id，新增操作
            else {
              //doNothing
            }
          }
          //后台返回不正常
          else{
            this.loading = false;
            this.msg = json.msg;
            let timer=window.setTimeout(() => {
              this.msg=false;
            },2000);
          }
        },error =>{
          this.loading = false;
          this.msg ='加载失败，请稍后重试！';
          let timer=window.setTimeout(() => {
            this.msg = false;
          },2000);
        })
      },

      //点击提交按钮提交
      commit(){

        if (!this.canClick) {
          return;
        }

        if(this.enterCompanyDate == '请选择您的入职时间'){
          this.enterCompanyDateYear = '0000';
          this.enterCompanyDateMonth = '00';
        }
        else {
          this.enterCompanyDateYear = this.enterCompanyDate.split('月')[0].split('年')[0];
          this.enterCompanyDateMonth = this.enterCompanyDate.split('月')[0].split('年')[1].length==2 ? this.enterCompanyDate.split('月')[0].split('年')[1] : 0+this.enterCompanyDate.split('月')[0].split('年')[1];
        }
        this.officialJobDateYear = this.officialJobDate.split('月')[0].split('年')[0];
        this.officialJobDateMonth = this.officialJobDate.split('月')[0].split('年')[1].length==2 ? this.officialJobDate.split('月')[0].split('年')[1] : 0+this.officialJobDate.split('月')[0].split('年')[1];

        //验证电话是否正确
        let areaCode = /^0\d{2,3}$/;
        let telephoneNumber = /\d{7,8}$/
        if(!areaCode.test(this.areaCode)){
          this.msg = '区号格式错误';
          let timer=window.setTimeout(() => {
            this.msg = false;
          },2000);
        }
        else if(!telephoneNumber.test(this.telephoneNumber)){
          this.msg = '电话号码格式错误';
          let timer=window.setTimeout(() => {
            this.msg = false;
          },2000);
        }
        else{
          this.canClick = false;
          this.loading = true;
          //在API_UESR_LIVING_INFO_SAVE_UPDATE接口中传值
          axios.post(API_UESR_OCCOPATION_INFO_SAVE_UPDATE,{
            //从url中取到token和requestId给后台
            comm : { pid : "手机唯一标记",type:"4", version :"2.1.2"},
            token:this.$route.query.token,
            //提交数据
            body:{
              appRequestId:this.$route.query.requestId,
              //提交数据
              appCustomerId: this.appCustomerId,
              officialJobDate: this.officialJobDateYear+'-'+this.officialJobDateMonth+'-01',
              enterCompanyDate: this.enterCompanyDateYear+'-'+this.enterCompanyDateMonth+'-01',
              companyName: this.companyName,
              addressId:this.addressId,
              pid:this.pid,
              completePhone: this.areaCode+'-'+this.telephoneNumber+'-'+this.branchNumber,
              branchNumber: this.branchNumber,
              department: this.department,
              jobTitleType: this.jobTitleTypeValue,
              //jobTitleTypeValue: this.jobTitleTypeValue,
              messageOfJobTitleType: this.messageOfJobTitleType,
              companyType: this.companyTypeValue,
              //companyTypeValue: this.companyTypeValue,
              messageOfCompanyType: this.messageOfCompanyType,
              provinceCode:this.provinceCode,
              cityCode:this.cityCode,
              distCode:this.distCode,
              housenumber:this.housenumber,
              completeaddress:this.completeaddress=this.fullAddress[0]+' '+this.fullAddress[1]+' '+this.fullAddress[2]+' '+this.housenumber,
              payOfSocialSecurityFund: this.payOfSocialSecurityFund,
              salaryFrom: this.salaryFrom,
              workSeniority: this.workSeniority,//司龄
              workYears: this.workYears,//工龄
            }
          },{timeout:90000}).then(res => {
            let json = res.data;
            //验证通过
            if (json.code == '00000') {
              this.loading = false;
              this.pid=json.data.pid;
              this.msg = '提交成功!';
              let timer=window.setTimeout(() => {
                this.msg = false;
                this.canClick = true;
                let time=window.setTimeout(()=>{
                  this.close();
                },200);
              },2000);
            }
            //后台验证不通过
            else{
              this.loading = false;
              this.msg = json.msg;
              let timer=window.setTimeout(() => {
                this.msg=false;
                this.canClick = true;
              },2000);
            }
          },error =>{
            this.loading = false;
            this.msg ='提交失败!';
            let timer=window.setTimeout(() => {
              this.msg = false;
              this.canClick = true;
            },2000);
          })
        }
      },

      //提交成功，关闭当前窗口
      close(){
        //关闭界面
      },

      //获取地区
      getProvince(){
        if(this.localData.hasOwnProperty(this.num)){
          this.$set(this, 'provinces', this.localData[this.num]);//给this赋值
          this.provinceList=true;
        }
        else {
          this.loading = true;
          axios.post(API_CITY+this.num,{},{timeout:90000}).then(res => {
            let json = res.data;
            if (json.code == '00000') {
              this.loading=false;
              this.$set(this, 'provinces', json.data);//给this赋值
              this.provinceList=true;
              this.localData[this.num] = json.data;
            }else{
              this.loading = false;
              this.msg = json.msg;
              this.timeout();
            }
          }).catch(error =>{
            this.loading = false;
            this.msg ='加载失败，请稍后重试！';
            this.timeout();
          });
        }
      },

      //点击省份折叠对应的市
      showCity(province){
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
            this.msg ='加载失败，请稍后重试！';
            this.timeout();
          });
        }
      },

      //点击市折叠对应的区
      showDist(city){
        this.cityCode = city.value;
        //使用city.value而不是city.text是因为value独一无二，而text并不是唯一的，比如北京市和天津市都有直辖市和县
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
            this.msg ='加载失败，请稍后重试！';
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
        this.dist = text;
        this.distCode = value;
        this.provinceList = false;
        this.workPlace = this.okProvince+this.okCity+this.dist;
        this.completeaddress = this.okProvince+' '+this.okCity+' '+this.dist+' ';
        this.fullAddress = this.completeaddress.split(" ");
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
        this.officialJobDate = this.workTimeToolbar;
      },
      //入职时间的确认按钮
      entryTimeConfirm(){
        this.entryTimePopupVisible = false;
        this.isActive = false;
        this.enterCompanyDate = this.entryTimeToolbar;
      },

      //获取公司职位
      getJobTitleType(action){
        this.jobTitleType = action.name;
        for(let i=0;i<this.jobTitleTypeActions.length;i++){
          if(this.jobTitleTypeActions[i].name == action.name){
            this.jobTitleTypeValue = this.jobTitleTypeActions[i].value;
            break;
          }
        }
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

      //获取公司性质
      getCompanyType(action){
        this.companyType = action.name;
        for(let i=0;i<this.companyTypeActions.length;i++){
          if(this.companyTypeActions[i].name == action.name){
            this.companyTypeValue = this.companyTypeActions[i].value;
            break;
          }
        }
      },
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

    components: {cTitle, Actionsheet, Picker, Popup, DatetimePicker, cLoading, cMsg}
  }

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
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

              span.paddingRight{
                padding-right: .15rem;
                width: 4.4rem;
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