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
                <p class="fontStyle floatLeft">复利金额为：<span class="benefitFont">{{this.benefit}}</span></p>
                <p class="fontStyle">总金额为：<span class="amountAndBenefitFont">{{this.amountAndBenefit}}</span></p>
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
        if (this.rate.search('%') !== -1) {
          this.rate = this.rate.substr(0, this.rate.length - 1) / 100
        }
        this.benefit = this.amount * Math.pow(1 + parseFloat(this.rate), this.time) - this.amount
        this.benefit = this.benefit.toFixed(2)
        this.amountAndBenefit = this.amount * Math.pow(1 + parseFloat(this.rate), this.time)
        this.amountAndBenefit = this.amountAndBenefit.toFixed(2)
      } else {
        this.$Message.error('请填写数据')
      }
      console.log(this.benefit)
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
    width: 1200px;
    .itemInput {
        display: block;
        margin-top: 15px;
        width: 300px;
    }
    .fontStyle {
        height: 80px;
        width: 500px;
        font-size: 30px;
        font-weight: 700;
    }
    .floatLeft {
        float: left;
    }
    .resultArea {
      width: 500px;
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
