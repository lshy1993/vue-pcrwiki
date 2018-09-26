<template>
<div id="eventGacha" class="clearfix">
    <div class="gachaHead">{{ gachaData.gacha_name }}</div>
    <div class="gachaMain">{{ gachaData.description }}</div>
    <div class="gachaFoot">剩余时间：{{ restTimeTxt }}</div>
</div>
</template>

<script>
export default {
    name: 'EventGacha',    
    props: ['gachaData','date'],
    data(){
        return {
            rday: 0,
            rhour: 0,
            rmiute:0,
            rsec:0,
        }
    },
    computed :{
        restTimeTxt: function(){
            if(this.rday>=365){
                return "无限期";
            }
            return this.rday+"日"+this.rhour+"时"+this.rmiute+"分"+this.rsec+"秒";
        }
    },
    watch: {
        date: function(){
            this.setRestTime();
        }
    },
    methods:{
        setRestTime: function(){
            let ed = Date.parse(this.gachaData.end_time);
            let delta = Math.floor((ed-this.date.getTime())/1000);
            this.rday = Math.floor(delta/(24*3600));
            let lv3 = delta%(24*3600);
            this.rhour = Math.floor(lv3/(3600));
            let lv2 = lv3%(3600)
            this.rmiute = Math.floor(lv2/(60));
            this.rsec = lv2%(60);
        },        
        geturl: function(key){
            return 'static/img/campaign/icon_campaign_middle_' + key + '.png';
        }
    }
}
</script>

<style lang="scss">
#eventGacha{
    position: relative;
    width: 300px;
    height: 200px;
    margin: 10px;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
    div.gachaHead {
        padding: 10px 15px 10px;
        color: white;
        background: orange;
    }
    div.gachaMain {
        padding: 10px;
    }
    div.gachaFoot {
        padding: 10px;
        position: absolute;
        left: 0;
        bottom: 0;
        text-align: center;
    }
}
</style>