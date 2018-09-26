<template>
<div class="clanbox clearfix">
    <div class="clanHead">{{ titleTxt }}</div>
    <div class="clanMain relative">
        <div class="clanBG">
            <img :src="imgurl" />
        </div>
        <div class="clanCD clearfixbox" v-if="!isNext">
            <div class="clearfix">
                <h2>{{ currentPeriodTxt }}</h2>
            </div>
            <div class="clearfix">
                <h2>{{rday}}</h2>
                <h2>Days</h2>
            </div>
            <div class="clearfix">
                <h2>{{rhour}}</h2>
                <h2>Hours</h2>
            </div>
            <div class="clearfix">
                <h2>{{rmiute}}</h2>
                <h2>Mins</h2>
            </div>
            <div class="clearfix">
                <h2>{{rsec}}</h2>
                <h2>Secs</h2>
            </div>
        </div>
        <div class="clanInfo">
            <div>战斗期间：{{ battlePeriodTxt }}</div>
            <div>奖励时间：{{ battleResultTxt }}</div>
            <!--div>冷却周期：{{ battleIntervalTxt }}</div-->
        </div>
    </div>
    <div class="clanFoot" v-if="isNext">
        将开始于：<br>
        {{ clanData.start_time }}
    </div>
</div>
</template>

<script>
export default {
    name: 'ClanQuest',
    props: ['clanData','isNext','date'],
    data() {
        return {
            rday: 0,
            rhour: 0,
            rmiute:0,
            rsec:0,
            currentPeriodTxt: '',
        }
    },
    computed :{
        titleTxt: function(){
            return this.isNext ? '下一期' : '当前';
        },
        battlePeriodTxt: function(){
            if(this.clanData == undefined) return '';
            return this.clanData.start_time +' - '+this.clanData.end_time;
        },
        battleResultTxt: function(){
            if(this.clanData == undefined) return '';
            return this.clanData.result_start +' - '+this.clanData.result_end;
        },
        battleIntervalTxt: function(){
            if(this.clanData == undefined) return '';
            return this.clanData.interval_start +' - '+this.clanData.interval_end;
        },
        imgurl: function(){
            if(this.clanData == undefined) return '';
            let id = this.clanData.period_detail_bg;
            return 'static/img/bg/bg_'+ id + '.png';
        }
    },
    watch: {
        date: function(){
            this.setRestTime();
        }
    },
    methods:{
        setRestTime: function(){
            var now = this.date.getTime();
            let ed1 = Date.parse(this.clanData.end_time);
            let ed2 = Date.parse(this.clanData.result_end);
            //根据阶段设定不同的倒计时
            if(now < ed1){
                this.currentPeriodTxt = '战斗中';
                this.setCoundDown(this.clanData.end_time);
            }
            else if(now < ed2){
                this.currentPeriodTxt = '奖励领取';
                this.setCoundDown(this.clanData.result_end);
            } 
        },
        setCoundDown: function(time){
            let ed = Date.parse(time);
            let delta = Math.floor((ed-this.date.getTime())/1000);
            this.rday = Math.floor(delta/(24*3600));
            let lv3 = delta%(24*3600);
            this.rhour = Math.floor(lv3/(3600));
            let lv2 = lv3%(3600)
            this.rmiute = Math.floor(lv2/(60));
            this.rsec = lv2%(60);
        }
    }

}
</script>

<style lang="scss">
.clanbox{
    position: relative;
    margin: 10px;
    width: 512px;
    //height: 288px;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);

    div.clanHead {
        position: relative;
        padding: 10px 15px 10px;
        color: white;
        background: blue;
    }

    div.clanMain {
        //overflow: hidden;

        .clanBG {
            width: 512px;
            height: 288px;
            overflow: hidden;
        }
        .clanCD {
            position: absolute;
            top: 30px;
            left: 30px;
            border-radius: 10px;
            padding: 10px;
            background: rgba(255,255,255,0.7);

            h2 {
                margin:0 10px 0 10px;
                font-size: 24px;
            }
        }
        .clanInfo {
            //width: 412px;
            position: absolute;
            bottom: 20px;
            left: 50px;
            border-radius: 10px;
            padding: 10px;
            background: rgba(255,255,255,0.7);
        }
        
    }

    div.clanFoot {
        position: absolute;
        padding: 10px;
        bottom: 0;
        left: 0;
    }
}
</style>
