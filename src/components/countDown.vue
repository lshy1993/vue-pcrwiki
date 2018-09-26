<template>
<div>{{ restTimeTxt }}</div>
</template>

<script>
export default {
    name: 'CountDown',
    props: ['date','endtime'],
    data(){
        return {
            rday: 0,
            rhour: 0,
            rmiute: 0,
            rsec: 0,
        }
    },
    computed :{
        restTimeTxt: function(){
            return this.rhour+"时"+this.rmiute+"分"+this.rsec+"秒";
        }
    },
    watch: {
        date: function(){
            this.setRestTime();
        }
    },
    methods:{
        setRestTime: function() {
            let ed = Date.parse(this.endtime);
            //console.log(ed);
            let delta = Math.floor((ed-this.date.getTime())/1000);
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

</style>

