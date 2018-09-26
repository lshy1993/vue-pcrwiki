<template>
<div id="storyTable">
    <h2>角色故事详情</h2>
    <div>
        <div v-for="(ele,key) in storyList" :key="key" class="storybox clearfixbox">
            <div class="thumb128 clearfix">
                <img :src="getStoryThumb(ele.story_id)" />
            </div>
            <div class="storyinfo clearfix">
                <div class="storynum">{{ ele.title }}</div>
                <div>{{ ele.sub_title }}</div>
            </div>
            <div class="storyitem clearfix">
                <div style="padding:16px 0" class="small_icon32 clearfix">
                    <img :src="Common.getRewardImg(8, 91001)" />
                </div>
                <div style="line-height:64px">+{{ ele.reward_value_1 }}</div>
            </div>
            <story-love-table v-if="ele.story_id%100!=1" :love-data="loveDic[ele.story_id]" />
        </div>
    </div>
</div>
</template>

<script>
import StoryLoveTable from './storyLoveTable.vue'

export default {
    name: 'StoryTable',
    data(){
        return {
            storyid: 0,
            storyIdList: [],
            storyList: [],
            loveDic: {}
        }
    },
    created(){
        //this.storyid = parseInt(this.$route.params.id);
        this.loadData();
    },
    methods: {
        loadData: function(){
            this.storyid = parseInt(this.$route.params.id);
            
            this.$http.get("http://api.liantui.xyz/pcr/story/"+this.storyid).then((response)=>{
                this.setStoryList(response.data.storyList);
                this.setStoryStatus(response.data.storyStatus);
            });
            
            // var result = this.Common.db.prepare("SELECT * FROM story_detail WHERE story_group_id = "+this.storyid);
            // this.setStoryList(result);
            // result = this.Common.db.prepare("SELECT * FROM chara_story_status WHERE story_id IN ("+this.storyIdList+")");
            // this.setStoryStatus(result);
            // result.free();
        },
        setStoryList: function(result){
            var dd = [];
            var cc = [];
            for(var id in result){
                var ele = result[id];
                let index = ele.story_id;
                dd.push(ele);
                cc.push(index);
            }
            this.storyList = dd;
            this.storyIdList = cc;
        },
        setStoryStatus: function(result){
            var dd = {};
			for(var id in result){
				var ele = result[id];
				var index = ele.story_id;
				dd[index] = ele;
			}
			this.loveDic = dd;
        },
        getStoryThumb: function(key){
            if(key==undefined) key="0000000";
            return this.Common.getStoryThumb(key);
        }
    },
    components:{
        StoryLoveTable
    }
}
</script>

<style lang="scss">
#storyTable{
    padding: 10px;

    .storybox {
        //width: 600px;
        border-radius: 10px;
        overflow: hidden;
        margin: 10px;
        background: white;
    }
    .storyinfo{
        padding-left: 10px;
        width: 300px;
    }
    .storyitem{
        width: 100px;
    }
    .storynum{
        font-size: 12px;
    }
    .floatnum {
        position: absolute;
        bottom: 5px;
        right: 5px;
        font-size: 16px;
        color: #000;
        text-shadow: #fff -1px 0 0,#fff 0 -1px 0,#fff 1px 0 0,#fff 0 1px 0;
    }
}

</style>
