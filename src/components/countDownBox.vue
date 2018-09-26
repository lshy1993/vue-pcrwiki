<template>
<div class="countdownbox">
    <div class="cdHead">计时器</div>
    <div class="cdMain">
        <h3>ノーマルガチャ　リセット</h3>
        <count-down :date="date" :endtime="ncend" />
        <h3>通常ショップ　リセット</h3>
        <count-down :date="date" :endtime="spend" />
        <h3>アリーナ毎日報酬</h3>
        <count-down :date="date" :endtime="arend" />
        <h3>5時リセット</h3>
        <count-down :date="date" :endtime="dayend" />
    </div>
</div>
</template>

<script>
import CountDown from './countDown.vue';

export default {
    name: 'CountDownBox',
    props: ['date'],
    data(){
        return {
            ncend: '',
            spend: '',
            arend: '',
            dayend: ''
        }
    },
    watch: {
        date: function(){
            this.setRestTime();
        }
    },
    methods:{
        setRestTime: function(){
            let now = this.date.getTime();
            //今天的时间戳
            var dtxt = this.getTimeTxt(now);
            //明天的
            var mtxt = this.getTimeTxt(now+24*3600*1000);

            //nomal 2次/天
            let nc1 = dtxt + ' 05:00:00';
            let nc2 = dtxt + ' 12:00:00';
            let nc3 = mtxt + ' 05:00:00';
            if(now < Date.parse(nc1)){
                this.ncend = nc1;
            }
            else if(now < Date.parse(nc2)){
                this.ncend = nc2;
            }
            else{
                this.ncend = nc3;
            }
            //shop 4次/天
            let sp1 = dtxt + ' 06:00:00';
            let sp2 = dtxt + ' 12:00:00';
            let sp3 = dtxt + ' 18:00:00';
            let sp4 = dtxt + ' 24:00:00';
            let sp5 = mtxt + ' 06:00:00';
            if(now < Date.parse(sp1)){
                this.spend = sp1;
            }
            else if(now < Date.parse(sp2)){
                this.spend = sp2;
            }
            else if(now < Date.parse(sp3)){
                this.spend = sp3;
            }
            else if(now < Date.parse(sp4)){
                this.spend = sp4;
            }
            else{
                this.spend = sp5;
            }
            //jjc时间
            let ar1 = dtxt + ' 15:00:00';
            let ar2 = mtxt + ' 15:00:00';
            this.arend = now < Date.parse(ar1)?ar1:ar2;
            let de1 = dtxt + ' 05:00:00';
            let de2 = mtxt + ' 05:00:00';
            this.dayend = now < Date.parse(de1)?de1:de2;
        },
        getTimeTxt: function(ms){
            let date = new Date(ms);
            let y = 1900+date.getYear();
            let m = date.getMonth()+1;
            let d = date.getDate();
            return y+"/"+('0'+m).slice(-2)+"/"+('0'+d).slice(-2);
        }
    },
    components:{
        CountDown
    }
}
</script>

<style lang="scss">
.countdownbox {
    position: absolute;
    top: 60px;
    right: 0;
    margin: 10px;
    width: 340px;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);

    div.cdHead {
        position: relative;
        padding: 10px 15px 10px;
        color: white;
        background: pink;
    }
    div.cdMain{
        padding: 10px;
        //height: 100%;
    }
}
</style>

