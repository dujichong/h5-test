<!--帮助详情-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="help-detail">
    <c-title :text="title" :hide="false"></c-title>
    <div class="model">
      <ul>
        <li v-for="(item, index) in currentList">
          <div class="title" @click="getIndex(index)">
            <span>{{index+1}}</span>
            <p>{{item.title}}</p>
            <div class="img" src="../../../assets/app/help/angle-right.png" v-bind:class="{ angle: index!=currentIndex }"></div>
          </div>
          <div class='content' v-bind:class="{ hide: index!=currentIndex }" v-html="item.content"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import cTitle from 'components/title';

  export default {
    data () {
      return {
        currentIndex: -1,
        title: '',
        click: 'a',
        helpObject: {
          '1': [
            {
              title: '中长期模式—提供费率最低最优的融资方案',
              content: '此产品适用于有长期资金周转需求的人群，只要本人名下有车并有稳定的收入流水或固定工作的商类或薪类人士均可申请。<br/>申请所需资料如：身份证、机动车登记证、机动车行驶证、驾驶证、征信报告、经营证明或收入证明等。',
            },
            {
              title: '短期模式—提供最佳的资金周转方案',
              content: '此产品适用于有短期资金周转需求的人群，只要本人名下有车并有稳定的收入流水或固定工作的商类或薪类人士均可申请。<br/>申请所需资料如：身份证、机动车登记证、机动车行驶证、驾驶证、征信报告、经营证明或收入证明等。',
            },
          ],
          '2': [
            {
              title: '凡普互金背景介绍',
              content: '凡普互金有限公司作为一家金融科技公司，自2013年成立以来，以“让金融有温度”为愿景，怀持“数据驱动业务、技术改变金融”的理念，持续致力于实现“让每个人都享有简单、公平的互联网金融服务”的公司使命，为有借款、消费金融、证券和保险等互联网金融服务需求的普通消费者提供服务。 鉴于在互联网大数据风控技术领域的突破和创新，凡普互金获得了工信部下属中国互联网研究院《2015年中国互联网金融最佳风控奖》。',
            },
            {
              title: '凡普互金的信息有什么安全保障',
              content: '在您授权的情况下，我们依法收集您在第三方的部分数据，用作分析您的信用情况，以便给予您最合适的融资额度。凡普互金在数据存储和传输方面采用了最先进的加密机制，并保证绝不会超越您的授权，基于金融信息服务以外的目的，违法向第三方泄露您的任何数据，请您放心使用。',
            },
            {
              title: '防诈骗提示',
              content: '您在申请融资的过程中，凡普快车官方及工作人员不会通过电话、短信、邮件等任何方式，以担保费、咨询费等任何名义向您收取任何费用，请您务必知晓，谨防诈骗。'
            },
          ],
          '3': [
            {
              title: '忘记账号、登陆密码怎么办？',
              content: '您可以在登录页面，通过忘记密码入口找回密码，输入您的注册手机号、校验码，并获取短信验证码。校验成功后，设置新的登录密码即可。',
            },
            {
              title: '如何重置登录密码？',
              content: '您可以在“我的”页面，点击“设置”按钮，再点击“修改登录密码”。输入您原来的登录密码后，再输入新的登录密码，通过短信验证后，即可完成登录密码的重置。',
            },
            {
              title: '注册时，提示手机号已被注册怎么办？',
              content: '首先，请确认您及家人是否曾经使用过该手机号在凡普快车进行过注册。如果您确定该手机号注册过，您可以通过密码找回，获得该账号的登录密码。',
            },
            {
              title: '身份证提示已被绑定怎么办？',
              content: '首先，请确认您及家人是否曾经使用过该身份证在凡普快车进行过注册。如果确实注册过，您可以通过密码找回获得该账号的登录密码。<br/>如果确认您的身份证未在凡普快车注册且显示已绑定，请联系您的客户经理协助解决。',
            },
            {
              title: '我可以修改注册手机号吗？',
              content: '您可以在“我的”页面，点击“设置”按钮，选择“修改登录账号”，输入您原来的登录密码、新的手机号码、校验码以及新手机获取的验证码即可完成注册手机号码的修改。',
            },
          ],
          '4': [
            {
              title: '个人信用报告是什么？',
              content: '个人信用报告里记录了个人的信用信息，主要包括个人基本信息、信贷信息（是否有银行贷款、是否有逾期、信用卡透支记录等）、非银行信息等。只要个人在银行办理过信用卡、借款、为他人借款担保等信贷业务，他在银行登记过的基本信息和账户信息就会通过商业银行的的数据报送录入个人征信系统，形成个人信用报告。',
            },
            {
              title: '没有征信账号怎么办？',
              content: '需要您进行征信账号注册，先填写您的身份信息，然后填写补充信息，最后进行问题验证，回答5个验证问题后，央行会在24小时内，发送一条短信到您注册账号的手机上。这时需要您再次登录您的征信账号，输入身份验证码（有效期为7天），进行征信报告提交。<br/>您也可以选择在中国人民银行征信中心网站注册并获得身份验证码。',
            },
            {
              title: '有征信账号如何申请征信报告？',
              content: 'a.如果您是首次申请个人信用报告或身份验证码失效，需要您登录征信账号，进行问题验证， 央行会在24小时内，发送一条短信到您注册账号的手机上。这时需要您再次登录您的征信账号，输入身份验证码（有效期为7天），进行征信报告提交。<br/>b.如果您已经获取过身份验证码，且在有效期内，则需要您登录征信账号，提交您的身份验证码（身份验证码的有效期为7天，如果过期需要再次申请，请在有效期内及时完成验证）完成征信报告提交。',
            },
            {
              title: '身份验证码有什么用？有效期多久？',
              content: '在您个人信用报告生成成功后，央行征信中心会主动发送一个身份验证码到您注册账号时的手机上，此码用于查询个人征信报告时使用。有效期为7天，遗失或过期需重新申请。',
            },
            {
              title: '提交查询申请后，未收到身份验证码？',
              content: '正常情况下，会在您提交查询申请的24个小时后，将身份验证码反馈给您。若您在申请查询24个小时后仍未收到反馈结果，可能是由于以下原因：<br/>a.是您注册时填写的手机号码不正确；<br/>b.是您的手机对短信进行了拦截，或短信接收出现异常；<br/>c.是您在提交查询申请时，使用问题验证方式，经审核您未通过身份验证。<br/>您可以用注册时填写的登录名和密码登录平台，平台会显示您的信用信息产品处理状态。',
            },
            {
              title: '忘记征信账号密码怎么办？',
              content: '请您输入您的登录名、姓名、选择证件类型以及输入对应的证件号码后，输入新的密码以及通过手机获取的动态码，央行征信中心将自动发送一条密码重置成功的短信到您的手机上。如果您在5分钟内未收到短信或您的手机号码已修改，请去央行征信中心官网，点击“用户销户”功能先销户后再重新注册。',
            },
            {
              title: '征信报告有效期多久？',
              content: '当您成功验证征信报告后，征信报告结果将保留15天；15天后，您需要重新验证征信报告。征信报告验证成功后，请及时进行后续申请哦。',
            },
          ],
          '5': [
            {
              title: '手机运营商信息获取时需要填写什么？',
              content: '需要输入本人手机号码以及服务密码，可能还需要填写短信登录密码、图片验证码和短信验证码，需根据界面提示进行填写。',
            },
            {
              title: '忘记手机查询密码/网站密码怎么办？',
              content: '您可以拨打运营商服务电话通过人工客服解决，也可以登录相应网上营业厅获取，或去相应营业厅进行办理。<br/><table style="border-collapse: collapse; border: 1px solid #798799;"><tr><td style="border: 1px solid #798799;">运营商</td><td style="border: 1px solid #798799;">客服电话</td><td style="border: 1px solid #798799;">网上营业厅</td></tr><tr><td style="border: 1px solid #798799;">移动</td><td style="border: 1px solid #798799;">10086</td><td style="border: 1px solid #798799;">http://www.10086.cn</td></tr><tr><td style="border: 1px solid #798799;">联通</td><td style="border: 1px solid #798799;">10010</td><td style="border: 1px solid #798799;">http://www.10010.com</td></tr><tr><td style="border: 1px solid #798799;">电信</td><td style="border: 1px solid #798799;">10000</td><td style="border: 1px solid #798799;">http://www.189.cn</td></tr></table>',
            },
          ],
          '6': [
            {
              title: '社保信息如何获取？',
              content: 'a.若您缴纳城市为“北京”或“重庆”，则您只需点击“社保”，选择缴纳城市，并输入在社保服务平台上注册的身份证号和密码即可。若您未注册或忘记密码，请登录社保服务平台进行操作。<br/>b.若您缴纳城市不为“北京”或“重庆”，则您需要提交社保的拍照资料。',
            },
            {
              title: '公积金信息如何获取？',
              content: 'a.若您缴纳城市为“北京”或“重庆”，则您只需点击“公积金”，选择缴纳城市，并输入公积金验证方式、号码和密码即可。如有问题请登录公积金服务平台进行查询。<br/>b.若您缴纳城市不为“北京”或“重庆”，则您需要提交公积金的拍照资料。',
            },
          ],
          '7': [
            {
              title: '哪些车辆可申请此融资？',
              content: '申请人本人名下拥有在当地车管所登记的非营运性质机动车征信报告。',
            },
            {
              title: '申请车辆评估时，需要做哪些操作？',
              content: '首先您需要将个人办理融资的车辆开到对应的门店，还需要携带：机动车登记证、机动车行驶证、本人驾驶证、车辆商业险，到店后客户经理会安排具体的评估操作。',
            },
          ],
          '8': [
            {
              title: '银行流水证明',
              content: '若您选择线上拍照提交，则需提供连续的常用银行流水或工资卡流水拍照证明。<br/>若您选择线下提交，则需要携带纸质版资料到门店或者交给您的客户经理。',
            },
            {
              title: '房产证证明',
              content: 'a.申请人名下本市的房产证<br/>b.购房合同/贷款合同+近3个月的本人名下还房贷的银行流水明细<br/>c.购房合同/贷款合同+近3个月的配偶名下还房贷的银行流水明细+结婚证<br/>d.购房合同+全款购房发票<br/>若您选择线下提交，则需要携带纸质版资料到门店或者交给您的客户经理。',
            },
            {
              title: '学历证明',
              content: '请将学历证书封面和所有内页拍照上传：<br/>a.国内大陆地区本科或以上学历证书，且毕业证上显示毕业时间必须在1991年及以后<br/>b.中国教育部留学服务中心出具的本科或以上学历的港澳地区学历学位认证书，且学历认证时间必须在2008年8月之后<br/>c.中国教育部留学服务中心出具的本科或以上学历的国外学历学位认证书，且学历认证时间必须在2006年8月之后',
            },
            {
              title: '经营证明',
              content: '拍照上传营业执照。<br/>如您是单位股东非法人，须额外提供加盖公章的验资报告/公司章程。',
            },
            {
              title: '经营地址证明',
              content: '以下选项任选其一拍照上传（下列房产证明仅针对经营住址）：<br/>a.经营场所租赁合同<br/>b.经营场所房产证/房产使用权证/土地证/土地承包合同等<br/>c.近90天内的显示经营地址的账单或缴费单据<br/>d.近90天内的居委会、街道办事处、派出所、村委会或物业出具并加盖公章的经营地址证明',
            },
            {
              title: '已婚证明',
              content: '结婚证：请将封面 和 所有内页拍照上传。',
            },
          ],
          '9': [
            {
              title: '使用凡普快车注册登录的条件？',
              content: '符合我司融资申请客群。客户使用自己本人常用手机号码注册，手机可接收短信验证码均可注册成功。',
            },
            {
              title: '能否用别人手机申请？',
              content: '不可以。必须是您本人的手机且本人操作申请。这也是为了保障您的信息安全。',
            },
            {
              title: '无法成功上传资料怎么办？',
              content: '建议您在更好的网络环境下进行资料上传。如果您依然无法上传，请联系您的客户经理协助解决。',
            },
            {
              title: '附件资料上传错误，是否可以修改？',
              content: '资料上传错误，未提交客户经理之前是可以删除修改的。<br/>提交客户经理后，客户经理进行驳回操作，客户再进行修改。',
            },
            {
              title: '申请融资的审核需要多长时间？',
              content: '审核一般会在为1个工作日内完成，遇到极特殊情况需要2-3个工作日。',
            },
            {
              title: '我如何知道审批结果？',
              content: '审核结束后，您可以在app端看到审核结果。若您的融资申请被批核，app端会显示您的融资已经批核，并提示您进行绑卡操作；若您的融资申请被拒贷，app端会显示我们暂时不能批核您的融资。',
            },
            {
              title: '什么是银行预留的手机号？',
              content: '若您的融资申请被批核，您需要进行银行卡绑卡操作，此时需要您填写银行预留手机号。银行预留手机号是您申请银行卡或办理银行卡相关业务时在银行登记的手机号。',
            },
            {
              title: '如何变更或修改银行预留手机号？',
              content: '您可以携带身份证及银行卡前去银行柜台网点，告知银行柜台工作人员需要修改客户信息中的手机号码。',
            },
            {
              title: '如何还款？',
              content: '您需要保证在账单日之前，您的银行卡里有足够的还款金额，我们会自动进行划扣。若您不能及时充值银行卡，也可以选择采用对公账户汇款的方式进行还款。<br/>请您务必在账单日当天或账单日之前进行还款，否则会产生违约金罚息，也会对您在征信系统的信用造成严重影响。',
            },
            {
              title: '想提前结清怎么办？',
              content: '若您想一次性提前结清，您可以向您的客户经理在账单日前两个工作日申请提前结清。',
            },
          ],
        },
      }
    },

    computed: {
      currentList () {
        return this.helpObject[this.$route.query.num];
      }
    },

    methods : {
      getIndex:function(index){
        this.click=index;
        if(this.currentIndex==this.click){
          this.currentIndex = -1;
        }
        else {
          this.currentIndex=this.click;
        }
      },
    },

    //初始化调用事件设置每个帮助项的标题
    created(){
      let num = this.$route.query.num;
      switch (num)
      {
        case 1:
          this.title = '产品选择';
          break;
        case 2:
          this.title = '信息安全';
          break;
        case 3:
          this.title = '账户管理';
          break;
        case 4:
          this.title = '征信报告';
          break;
        case 5:
          this.title = '手机运营商';
          break;
        case 6:
          this.title = '社保公积金';
          break;
        case 7:
          this.title = '车辆评估';
          break;
        case 8:
          this.title = '拍照资料';
          break;
        case 9:
          this.title = '其他';
          break;
      }
    },

    components: {cTitle}
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  div.help-detail{
    width: 100%;
    height: 100%;
    font-family: YouYuan, Tahoma, STXihei;
    div.model{
      width: 100%;
      height: 100%;
      background-color: #f1f1f1;
      //margin: 0 .3rem;
      ul{
        width: 100%;
        background-color: #fff;
        margin: auto 0;
        padding-left: 0;
        border-top: 1px solid #e5e5e5;
        li{
          width: 6.9rem;
          border-bottom: solid 1px #e5e5e5;
          list-style-type: none;
          padding-left: .3rem;
          padding-right: .3rem;
          min-height: 1.19rem;
          div.title{
            width: 100%;
            min-height: 1.19rem;
            span{
              width: .36rem;
              height: .36rem;
              color: #fff;
              display: block;
              float: left;
              text-align: center;
              line-height: .36rem;
              margin: .42rem auto .18rem;
              font-size: .24rem;
              background: url("../../../assets/app/help/background-circle.png") no-repeat;
              background-size: .36rem .36rem;
            }
            p{
              margin: .42rem auto .22rem;
              width: 6.06rem;
              height: .36rem;
              line-height: .36rem;
              font-size: .3rem;
              color: #333;
              float: left;
              padding-left: .22rem;
            }
            div.img{
              width: .26rem;
              height: .26rem;
              float: right;
              margin: .47rem auto .23rem;
              background: url("../../../assets/app/help/angle-down.png") no-repeat;
              background-size: .26rem .26rem;
            }
            div.angle{
              width: .26rem;
              height: .26rem;
              float: right;
              margin: .47rem auto .23rem;
              background: url("../../../assets/app/help/angle-right.png") no-repeat;
              background-size: .26rem .26rem;
            }
          }
          div.content{
            color: #798799;
            font-size: .26rem;
            line-height: .36rem;
            clear: both;
            margin-bottom: .5rem;
          }
          div.hide{
            display: none;
            margin-bottom: 0rem;
          }
        }
      }
    }
  }
</style>