<!-- eslint-disable -->
<template>
    <div class="wrap-content">
        <Row>
            <Col span="8">
                <div>
                    <Input 
                        prefix="ios-card" 
                        placeholder="请输入本金" 
                        v-model="amount" 
                        class="itemInput"/>
                    <Input 
                        prefix="ios-time-outline" 
                        placeholder="请输入时间（年）"  
                        class="itemInput"
                        v-model="time"/>
                    <Input 
                        prefix="ios-trending-up" 
                        placeholder="请输入年化利率（%）" 
                        class="itemInput"
                        v-model="rate"/>
                </div>
                <div style="margin-top:30px">
                    <Button 
                        type="primary" 
                        style="margin-left:-50px" 
                        @click="fixedBenefitCal()">计算</Button>
                    <Button 
                      style="margin-left:50px"
                      @click="reset()"
                      >重置</Button>
                </div>   
            </Col>
            <Col span="2">
                <Divider type="vertical" style="height:200px"/>
            </Col>
            <Col span="14">
              <div class="resultArea">
                <p class="fontStyle">复利金额：<span class="benefitFont">{{this.benefit}}</span></p>
                <p class="fontStyle">本息和：<span class="amountAndBenefitFont">{{this.amountAndBenefit}}</span></p>
              </div>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  data () {
    return {
      amount: '',
      time: '',
      rate: '',
      benefit: '',
      amountAndBenefit: ''
    }
  },
  methods: {
    fixedBenefitCal () {
      if (this.amount && this.time && this.rate) {
        console.log(parseInt(this.rate))
        if (isNaN(parseFloat(this.amount)) || isNaN(parseInt(this.time)) || isNaN(this.rate.substr(0, this.rate.length - 1))) {
          this.$Message.warning('_(:τ」∠)_ 不要皮哦~')
          this.benefit = '你看看你输的啥！'
          this.amountAndBenefit = '_(:τ」∠)_ 不会算 告辞'
        } else {
          if (this.rate > 1) {
            this.$Message.warning('利率大于100% ！？ 你怎么不上天')
          } else {
            // 百分号处理
            if (this.rate.search('%') !== -1) {
              // console.log(this.rate)
              this.rate = this.rate.substr(0, this.rate.length - 1) / 100
            }
            this.benefit = this.amount * Math.pow(1 + parseFloat(this.rate), this.time) - this.amount
            this.benefit = this.benefit.toFixed(2)
            this.amountAndBenefit = this.amount * Math.pow(1 + parseFloat(this.rate), this.time)
            this.amountAndBenefit = this.amountAndBenefit.toFixed(2)
            // 将rate值重新变为百分比字符串 使其正常调用search方法保证多次计算
            this.rate = (this.rate * 100 + '%').toString()
          }
        }
      } else {
        this.$Message.error('数据填了吗！')
      }
    },
    reset () {
      this.amount = ''
      this.time = ''
      this.rate = ''
      this.benefit = ''
      this.amountAndBenefit = ''
    }
  }
}
</script>
<style lang="less" scoped>
.wrap-content {
    padding: 20px;
    .itemInput {
        display: block;
        margin-top: 15px;
        width: 300px;
    }
    .fontStyle {
        height: 80px;
        min-width: 500px;
        font-size: 30px;
        font-weight: 700;
    }
    .floatLeft {
        float: left;
    }
    .resultArea {
      min-width: 500px;
      height: 220px;
    }
    .benefitFont {
      font-size: 40px;
      color: #ff9900
    }
    .amountAndBenefitFont {
      font-size: 40px;
      color: red;
    }
}
</style>
