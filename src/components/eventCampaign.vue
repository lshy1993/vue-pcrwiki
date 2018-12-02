<template>
<div class="campaignbox clearfix">
    <div class="campaignHead">{{ titleTxt }}</div>
    <div class="campaignMain">
        <div class="clearfixbox" v-for="(ele,key) in campaignData" :key="key">
            <div class="small_icon32 clearfix">
                <img :src="geturl(ele.icon_image)" />
            </div>
            <div class="campaignExplain clearfix">{{ getDescription(ele.system_id) }}</div>
        </div>
    </div>
    <div class="campaignFoot clearfixbox" v-if="!isNext">
        <div class="clearfix">
            <h2>{{ rday }}</h2>
            <h2>Days</h2>
        </div>
        <div class="clearfix">
            <h2>{{ rhour }}</h2>
            <h2>Hours</h2>
        </div>
        <div class="clearfix">
            <h2>{{ rmiute }}</h2>
            <h2>Mins</h2>
        </div>
        <div class="clearfix">
            <h2>{{ rsec }}</h2>
            <h2>Secs</h2>
        </div>
    </div>
    <div class="campaignFoot" v-if="isNext">
        将开始于：<br>
        {{ startTime }}
    </div>
</div>
</template>

<script>
export default {
    name: 'EventCampaign',
    props: ['campaignData','isNext','date'],
    data(){
        return {
            rday: 0,
            rhour: 0,
            rmiute: 0,
            rsec: 0,
        }
    },
    computed :{
        titleTxt: function(){
            return this.isNext?'下一期':'当前';
        },
        restTimeTxt: function(){
            if(this.rday >= 365){
                return "无限期";
            }
            return this.rday+"日"+this.rhour+"时"+this.rmiute+"分"+this.rsec+"秒";
        },
        startTime: function(){
            if(this.campaignData == undefined || this.campaignData.length == 0) return '';
            return this.campaignData[0].start_time;
        }
    },
    watch: {
        date: function(){
            this.setRestTime();
        }
    },
    methods:{
        setRestTime: function(){
            let ed = Date.parse(this.campaignData[0].end_time);
            let delta = Math.floor((ed-this.date.getTime())/1000);
            this.rday = Math.floor(delta/(24*3600));
            let lv3 = delta%(24*3600);
            this.rhour = Math.floor(lv3/(3600));
            let lv2 = lv3%(3600)
            this.rmiute = Math.floor(lv2/(60));
            this.rsec = lv2%(60);
        },
        getDescription: function(key){
            return this.Common.campaign_type[key];
        },
        geturl: function(key){
            return 'static/img/campaign/icon_campaign_middle_' + key + '.png';
        }
    }

}
</script>

<style lang="scss">
.campaignbox{
    position: relative;
    margin: 10px;
    width: 200px;
    //height: 200px;
    height: auto;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);

    div.campaignHead {
        position: relative;
        padding: 10px 15px 10px;
        color: white;
        background: green;
    }

    div.campaignMain {
        //height: 100%;
        padding: 10px;
    }
    .campaignExplain{
        margin-left: 10px;
    }

    div.campaignFoot {
        position: relative;
        padding: 5px;
        bottom: 0;
        left: 0;

        h2 {
            padding: 0px;
            margin:0 5px 0 5px;
            font-size: 14px;
        }
    }
}

</style>