<template>
<div class="questbox clearfix">
    <div class="questHead">{{ titleTxt }}</div>
    <div class="questMain">
        <div class="clearfixbox" v-for="(ele,key) in questData" :key="key">
            <div class="clearfix small_icon">
                <img style="width:100%" :src="geturl(ele.icon_image)" />
            </div>
            <div>{{getDescription(key)}}</div>
        </div>
    </div>
    <div class="questFoot" v-if="!isNext">
        {{ restTimeTxt }}
    </div>
    <div class="questFoot" v-if="isNext">
        将开始于：<br>
        {{ campaignData[0].start_time }}
    </div>
</div>
</template>

<script>
export default {
    name: 'EventQuest',
    props: ['questData','isNext','date'],
    data(){
        return {
            titleTxt: '公会战',
        }
    },
    computed :{

    },
    watch: {

    },
    methods:{

    }

}
</script>

<style lang="scss">
.questbox{
    position: relative;
    margin: 10px;
    width: 400px;
    height: 300px;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);

    div.questHead {
        position: relative;
        padding: 10px 15px 10px;
        color: white;
        background: blue;
    }

    div.questMain {
        //height: 100%;
        //min-height: 400px;
        padding: 10px;
    }

    div.small_icon {
        width: 32px;
        height: 32px;
    }

    div.questFoot {
        position: absolute;
        padding: 10px;
        bottom: 0;
        left: 0;
    }
}
</style>
