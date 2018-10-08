<template>
<div id="profileBar" class="clearfixbox" @mouseenter="hoverd=true" @mouseleave="hoverd=false">
    <div class="small_icon64 clearfix">
        <img :src="imgpath">
    </div>
    <div class="profileTxt clearfix" >
        <span>{{ barTxt }}</span>
    </div>
</div>
</template>

<script>
export default {
    name: 'ProfileBar',
    props: ['profileInfo'],
    data () {
        return {
            hoverd: false
        }
    },
    created() {

    },
    computed:{
        imgpath: function(){
            let offset = this.hoverd?30:10;
            let id = parseInt(this.profileInfo.unit_id)+offset;
            return this.Common.getUnitIcon(id);
        },
        barTxt: function(){
            let id = parseInt(this.profileInfo.unit_id/100);
            let name = this.profileInfo.unit_name;
            return id+"-"+name;
        }
    },
	methods:{

	},
    components: {

    }
}
</script>

<style lang="scss">
#profileBar{
    width: 100%;
    height: 64px;
    background: green;

    .profileTxt{
        color: white;
        line-height: 64px;
        margin-left: 20px;
        font-size: 32px;
    }
}
</style>
