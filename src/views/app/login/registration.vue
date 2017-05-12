<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="registration-agreement">
    <c-title :text="title" :hide="false"></c-title>
    <div class="borderTop"></div>
    <div class="model">
      <h3>{{tit}}</h3>
      <p class="intro">{{introduce}}</p>

      <div v-for="(agreement,index) in agreementsObj">
        <h6>{{agreement.subTitle}}</h6>
        <p v-for="content in agreement.contents">{{content.message}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import cTitle from 'components/title';

  export default {
    data () {
      return {
        title: '注册协议',
        tit: '用户服务及注册协议',
        introduce: '本网站由爱钱进（北京）信息科技有限公司负责运营（以下“本网站”均指网站及爱钱进（北京）信息科技有限公司）。' +
        '在注册成为本网站用户前，请您务必仔细阅读以下条款。若您一旦注册，则表示您同意接受本网站的技术并接受以下条款的约束。' +
        '若您不接受以下条款，请您立即停止注册或主动停止使用本网站的技术。',
        agreementsObj: {
          '1':{
            subTitle:'第一条 本协议的签署和修订',
            contents:[
              {message:'1.1 本网站只接受持有中华人民共和国有效身份证件（以下简称“中国”，为避免疑义，仅为本协议之目的，不包括中国香港、澳门及台湾地区）的18周岁以上具有完全民事行为能力的自然人成为网站用户。如您不符合资格，请勿注册，否则您与本网站签署的协议无效，本网站有权随时终止您的用户资格。'},
              {message:'1.2 本协议内容包括以下条款及本网站已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的一部分，与协议正文具有同等法律效力。本协议是您与本网站共同签订的，适用于您在本网站的全部活动。在您注册成为用户时，您已经阅读、理解并接受本协议的全部条款及各类规则，并承诺遵守国家的各项法律法规，如有违反而导致任何法律后果的发生，您将以自己的名义独立承担所有相应的法律责任。'},
              {message:'1.3 本网站有权根据需要不时地修改本协议或根据本协议制定、修改各类具体规则并在本网站相关系统板块发布，无需另行单独通知您。您应不时地注意本协议及具体规则的变更，若您在本协议及具体规则内容公告变更后继续使用本网站技术的，表示您已充分阅读、理解并接受修改后的协议和具体规则内容，也将遵循修改后的协议和具体规'},
            ],
          },
          '2':{
            subTitle:'第二条 本协议的签署和修订',
            contents:[
              {message:'2.1 本网站只接受持有中华人民共和国有效身份证件（以下简称“中国”，为避免疑义，仅为本协议之目的，不包括中国香港、澳门及台湾地区）的18周岁以上具有完全民事行为能力的自然人成为网站用户。如您不符合资格，请勿注册，否则您与本网站签署的协议无效，本网站有权随时终止您的用户资格。'},
              {message:'2.2 本协议内容包括以下条款及本网站已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的一部分，与协议正文具有同等法律效力。本协议是您与本网站共同签订的，适用于您在本网站的全部活动。在您注册成为用户时，您已经阅读、理解并接受本协议的全部条款及各类规则，并承诺遵守国家的各项法律法规，如有违反而导致任何法律后果的发生，您将以自己的名义独立承担所有相应的法律责任。'},
              {message:'2.3 本网站有权根据需要不时地修改本协议或根据本协议制定、修改各类具体规则并在本网站相关系统板块发布，无需另行单独通知您。您应不时地注意本协议及具体规则的变更，若您在本协议及具体规则内容公告变更后继续使用本网站技术的，表示您已充分阅读、理解并接受修改后的协议和具体规则内容，也将遵循修改后的协议和具体规'},
            ],
          },
        },
      }
    },
    components: {cTitle}
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .registration-agreement{
    width: 100%;
    height: 100%;
    font-family: YouYuan, Tahoma, STXihei;
    .borderTop{
      width: 100%;
      height: 1px;
      background: #ccc;
    }
    .model{
      background-color: #fff;;
      padding-left: .32rem;
      padding-right: .32rem;
      color: #595959;
      margin-bottom: .5rem;
      h3{
        font-size: .3rem;
        margin: 0 0 .38rem;
        text-align: center;
        font-weight: normal;
        padding-top: .5rem;
        line-height: .36rem;
      }
      p.intro{
        font-size: .26rem;
        margin: 0;
        text-indent: .55rem;
        line-height: .36rem;
      }
      div{
        width: 100%;
        h6{
          font-weight: normal;
          margin: .38rem 0 0 0;
          font-size: .26rem;
          line-height: .36rem;
        }
        p{
          margin: .38rem 0 0 0;
          font-size: .26rem;
          line-height: .36rem;
        }
      }
    }
  }
</style>