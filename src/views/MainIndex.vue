<template>
<div>
    <audio controls="controls" :src="Common.getBGM('bgm_title_main_1')" :loop="'loop'" />
    <login-bonus />
    <count-down-box :date="date"/>
    <!--div id="mywidget"></div-->
    <h2>活动</h2>
    <div class="clearfixbox">
        <event-quest :eventData="currentEvent" :date="date"/> 
    </div>
    <h2>公会战</h2>
    <div class="clearfixbox">
        <clan-quest v-if="currentClan.period != undefined" :clanData="currentClan" :is-next="false" :date="date" />
        <clan-quest v-if="nextClan.period != undefined" :clanData="nextClan" :is-next="true" :date="date" /> 
    </div>
    <h2>加成</h2>
    <div class="clearfixbox">
        <event-campaign v-if="currentCampaign.length != 0" :campaignData="currentCampaign" :is-next="false" :date="date" />
        <event-campaign v-if="nextCampaign.length != 0" :campaignData="nextCampaign" :is-next="true" :date="date" />
    </div>
    <h2>扭蛋卡池</h2>
    <div class="clearfixbox">
        <event-gacha v-for="(ele,key) in gachaData" :key="key" :gachaData="ele" :date="date" />
    </div>
</div>
</template>

<script>
import ClanQuest from '../components/clanQuest.vue';
import EventQuest from '../components/eventQuest.vue';
import EventCampaign from '../components/eventCampaign.vue';
import EventGacha from '../components/eventGacha.vue';
import LoginBonus from '../components/loginBonus.vue';
import CountDownBox from '../components/countDownBox.vue';

//import { spine } from '../spine-widget.js';

export default {
    name: 'MainIndex',
    data(){
        return {
            currentEvent: {},
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
        //this.SetSpine();
    },
    beforeDestroy () {
        if(this.timer) {
            clearInterval(this.timer);//在vue实例销毁钱，清除我们的定时器
        }
    },
    methods: {
        loadData: function(){
            this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'hatsune_schedule'}}).then((response)=>{
                this.setEventData(response.data);
            });
            this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'clan_battle_period'}}).then((response)=>{
                this.setClanSchedule(response.data);
            });
            this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'campaign_schedule'}}).then((response)=>{
                this.setCampaignSchedule(response.data);
            });
            this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'gacha_data'}}).then((response)=>{
                this.setGachaData(response.data);
            });

            // this.$http.get('/static/main.sqlite' ,{responseType: 'arraybuffer'}).then((response) => {
            //     var Uints = new Uint8Array(response.data);
            //     var db = new SQL.Database(Uints);
            //     this.Common.db = db;
            //     console.log('event index database loaded');

            //     //var result = db.prepare("select * from hatsune_schedule")
            //     //this.setEventData(result);

            //     var result = db.prepare("select * from clan_battle_period")
            //     this.setClanSchedule(result);

            //     result = db.prepare("select * from campaign_schedule");
            //     this.setCampaignSchedule(result);

            //     result = db.prepare("select * from gacha_data");
            //     this.setGachaData(result);

            //     result.free();
            // }, (err) => {
            //     console.log(err);
            // });  
        },
        setEventData: function(result){
            var dic = {};
            var now = this.date.getTime();
            for(var id in result){
                let ele = result[id];
                let st = Date.parse(ele.start_time);
                let ed = Date.parse(ele.end_time);
                //判断当前时间段的活动
                if(st<now && now<ed){
                    dic = ele;
                }
            }
            this.currentEvent = dic;
        },
        setClanSchedule: function(result){
            var cc = {};
            var dd = {};
            var now = this.date.getTime();
            for(var id in result){
                let ele = result[id];
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
        },
        setCampaignSchedule: function(result){
            var cc = [];
            var dd = [];
            var now = this.date.getTime();
            var ced;
            for(var id in result){
                let ele = result[id];
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
        },
        setGachaData: function(result){
            var dd = [];
            for(var id in result){
                let ele = result[id];
                let index = ele.gacha_id;
                let st = Date.parse(ele.start_time);
                let ed = Date.parse(ele.end_time);
                if(st<this.date.getTime() && this.date.getTime()<ed){
                    dd.push(ele);
                }
            }
            this.gachaData = dd.reverse();
        },
        SetSpine:function(){
            new spine.SpineWidget("mywidget", {
                json: "/static/spine/108011.skel",
                atlas: "/static/spine/108011.atlas",
                animation: "run",
                backgroundColor: "#000000",
                success: function (widget) {
                    var animIndex = 0;
                    widget.canvas.onclick = function () {
                        animIndex++;
                        let animations = widget.skeleton.data.animations;
                        if (animIndex >= animations.length) animIndex = 0;
                        widget.setAnimation(animations[animIndex].name);
                    }
                }
            });
        },
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