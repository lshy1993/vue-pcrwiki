<template>
<div>
    <audio :autoplay="'autoplay'" controls="controls" :src="Common.getBGM('bgm_title_main_1')" :loop="'loop'" />
    <login-bonus />
    <count-down-box :date="date"/>
    <!--h2>活动</h2>
    <div class="clearfixbox">
        <event-quest :date="date" /> 
    </div-->
    <h2>公会战</h2>
    <div class="clearfixbox">
        <clan-quest v-if="currentClan.period != undefined" :clanData="currentClan" :is-next="false" :date="date" />
        <clan-quest v-if="nextClan.period != undefined" :clanData="nextClan" :is-next="true" :date="date" /> 
    </div>
    <h2>加成</h2>
    <div class="clearfixbox">
        <event-campaign :campaignData="currentCampaign" :is-next="false" :date="date" />
        <event-campaign :campaignData="nextCampaign" :is-next="true" :date="date" />
    </div>
    <h2>扭蛋卡池</h2>
    <div class="clearfixbox">
        <event-gacha v-for="(ele,key) in gachaData" :key="key" :gachaData="ele" :date="date" />
    </div>
</div>
</template>

<script>
import ClanQuest from './clanQuest.vue';
import EventQuest from './eventQuest.vue';
import EventCampaign from './eventCampaign.vue';
import EventGacha from './eventGacha.vue';
import LoginBonus from './loginBonus.vue';
import CountDownBox from './countDownBox.vue';

export default {
    name: 'EventIndex',
    data(){
        return {
            msg: '',
            currentClan: {},
            nextClan: {},
            currentCampaign: [],
            nextCampaign: [],
            gachaData: [],
            date: new Date(),
            timer: ''
        }
    },
    mounted () {
        var _this = this; //声明一个变量指向vue实例this,保证作用域一致
        this.timer = setInterval(function() {
            _this.date = new Date();//修改数据date
        }, 1000);
    },
    created() {
        this.loadData();
    },
    beforeDestroy () {
        if(this.timer) {
            clearInterval(this.timer);//在vue实例销毁钱，清除我们的定时器
        }
    },
    methods: {
        loadData: function(){
            this.$http.get('/static/main.sqlite' ,{responseType: 'arraybuffer'}).then((response) => {
                var Uints = new Uint8Array(response.data);
                var db = new SQL.Database(Uints);
                this.Common.db = db;
                console.log('event index database loaded');

                var result = db.prepare("select * from clan_battle_period")
                this.setClanSchedule(result);

                result = db.prepare("select * from campaign_schedule");
                this.setCampaignSchedule(result);

                result = db.prepare("select * from gacha_data");
                this.setGachaData(result);

                result.free();
            }, (err) => {
                console.log(err);
            });  
        },
        setClanSchedule: function(result){
            var cc = {};
            var dd = {};
            var now = this.date.getTime();
            while(result.step()){
                let ele = result.getAsObject();
                let st = Date.parse(ele.start_time);
                let ed = Date.parse(ele.end_time);
                //判断当前时间段的活动
                if(st<now && now<ed){
                    dd = ele;
                }
                //下次一活动？
                else if(now<st){
                    cc = ele;
                }
            }
            this.currentClan = dd;
            this.nextClan = cc;
            result.free();
        },
        setCampaignSchedule: function(result){
            var cc = [];
            var dd = [];
            var now = this.date.getTime();
            var ced;
            while(result.step()){
                let ele = result.getAsObject();
                let index = ele.id;
                let st = Date.parse(ele.start_time);
                let ed = Date.parse(ele.end_time);
                //判断当前时间段的活动
                if(st<now && now<ed){
                    ced = ed;
                    dd.push(ele);
                }
                //下次一活动？
                else if(ced+1000==st){
                    cc.push(ele);
                }
            }
            this.currentCampaign = dd;
            this.nextCampaign = cc;
            result.free();
        },
        setGachaData: function(result){
            var dd = [];
            while(result.step()){
                let ele = result.getAsObject();
                let index = ele.gacha_id;
                let st = Date.parse(ele.start_time);
                let ed = Date.parse(ele.end_time);
                if(st<this.date.getTime() && this.date.getTime()<ed){
                    dd.push(ele);
                }
            }
            this.gachaData = dd.reverse();
            result.free();
        }
    },
    components: {
        ClanQuest,
        EventQuest,
        EventCampaign,
        EventGacha,
        LoginBonus,
        CountDownBox
    }
}
</script>