<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="living-information">
    <div class="layer" v-bind:class="{ active: isActive }"></div>
    <c-title :text="title" :hide="false"></c-title>
    <div class="border"></div>
    <div class="ui-form">
      <form>
        <ul>
          <li @click="sheetVisible = true" v-bind:class="{ unique: isUnique }">
            <label>居住情况</label>
            <input v-model="livingType" maxlength="11" placeholder="请选择您的居住情况">
          </li>
          <li v-if="show">
            <label>其他情况</label>
            <input class="noBackground" v-model="others" maxlength="11" placeholder="请输入其他居住情况">
          </li>
          <li class="wid" @click="getCity">
            <label>现居住地</label>
            <input v-model="livingPlace" maxlength="11" placeholder="请选择您的现居住地">
          </li>
          <li>
            <label>详细地址</label>
            <input class="noBackground" v-model="address" maxlength="11" placeholder="地址具体到门牌号码">
          </li>
          <li class="noBorder">
            <label>生活年限(年)</label>
            <input class="noBackground" v-model="years" maxlength="11" placeholder="请填写您的居住年限">
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
  import { Actionsheet, Toast, MessageBox } from 'mint-ui';

  export default {

    data () {
      return {
        title: '居住信息',
        livingType: '',
        others: '',
        livingPlace: '',
        address: '',
        years: '',
        show: false,
        sheetVisible: false,
        isUnique: false,
        //sheetVisible: true,
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
          return this.livingType&&this.livingPlace&&this.address&&this.years&&this.others;
        }
        else {
          return this.livingType&&this.livingPlace&&this.address&&this.years;
        }
      },
    },

    methods : {
      getCity(){
        console.log('这里需要添加省市县区');
      },

      getLivingStyle(action){
        //console.log(action.name);
        this.livingType = action.name;
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

    //初始化调用事件设置每个帮助项的标题
    created(){
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
            }
            input{
              display: block;
              float: right;
              //padding-top:0.2rem;
              font-size: .3rem;
              border: none;
              background: none;
              width: 4.55rem;
              color: #333333;
              height: 0.98rem;
              line-height: 0.98rem;
              background: url("../../../assets/app/user/angle-right.png") no-repeat right center;
              background-size: .14rem .26rem;
            }
            input::-webkit-input-placeholder{
              color: #b2b2b2;
              font-size: .3rem;
            }
            input.noBackground{
              background: none;
            }
          }
          li.unique{
            clear: both;
            height: .98rem;
            line-height: .98rem;
            list-style: none;
            border: none;
            input{
              border-bottom:1px solid #e6e6e6;
            }
            input.noBackground{
              background: none;
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