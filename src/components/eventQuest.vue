<template>
<div class="eventbox clearfix">
    <div class="eventHead">活动</div>
    <div class="eventMain relative">
        <div class="eventBG">
            <img :src="imgurl" />
        </div>
        <div class="eventCD clearfixbox">
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
        <div class="eventInfo">
            <div>战斗期间：{{ eventPeriodTxt }}</div>
            <div>兑换时间：{{ eventCloseTxt }}</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'EventQuest',
    props: ['eventData','date'],
    data(){
        return {
            rday: 0,
            rhour: 0,
            rmiute:0,
            rsec:0,
            currentPeriodTxt: '',
        }
    },
    computed :{
        eventPeriodTxt: function(){
            if(this.eventData == undefined) return '';
            return this.eventData.start_time +' - '+this.eventData.end_time;
        },
        eventCloseTxt: function(){
            if(this.eventData == undefined) return '';
            return  this.eventData.start_time +' - '+this.eventData.close_time;
        },
        imgurl: function(){
            if(this.eventData == undefined) return '';
            let id = this.eventData.background;
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
            let ed1 = Date.parse(this.eventData.end_time);
            let ed2 = Date.parse(this.eventData.close_time);
            //根据阶段设定不同的倒计时
            if(now < ed1){
                this.currentPeriodTxt = '战斗中';
                this.setCoundDown(this.eventData.end_time);
            }
            else if(now < ed2){
                this.currentPeriodTxt = '奖励领取';
                this.setCoundDown(this.eventData.close_end);
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
.eventbox {
    position: relative;
    margin: 10px;
    width: 512px;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);

    div.eventHead {
        position: relative;
        padding: 10px 15px 10px;
        color: white;
        background: red;
    }

    div.eventMain {
        .eventBG {
            width: 512px;
            height: 288px;
            overflow: hidden;
        }
        .eventCD {
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
        .eventInfo {
            //width: 412px;
            position: absolute;
            bottom: 20px;
            left: 50px;
            border-radius: 10px;
            padding: 10px;
            background: rgba(255,255,255,0.7);
        }
    }

    div.eventFoot {
        position: absolute;
        padding: 10px;
        bottom: 0;
        left: 0;
    }
}
</style>
