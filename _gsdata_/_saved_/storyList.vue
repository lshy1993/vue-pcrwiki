<template>
<div>
    <div>filter</div>
    <div id="tablist">
        <button v-on:click="mode=8">Main</button>
        <button v-on:click="mode=0">Chara</button>    
        <button v-on:click="mode=1">Guild</button>
        <button v-on:click="mode=9">Event</button>
    </div>
    <div class="clearfixbox">
        <div class="clearfix" v-for="(ele,key) in charaStoryDic" v-bind:key="key">
            <router-link :to="getrouter(key)">
                <div>
                    <img :src="getpath(key)" />
                    <div>{{ele.title}}</div>
                </div>
            </router-link>
        </div>
	</div> 
</div>
</template>

<script>
export default {
    name: 'StoryMainList',
    data(){
        return {
            charaStoryDic: {},
            mainStoryDic: {},
            guildStoryDic: {},
            eventStoryDic: {},
        }
    },
    created(){
        this.loadData();
    },
    methods:{
        loadData: function (params) {
            var result = this.Common.db.prepare("SELECT * FROM story_data");
            this.setStoryList(result);
        },
        setStoryList: function(result){
            var charas = {};
            var mains = {};
            var guilds = {};
            var events = {};
            while(result.step()){
                var ele = result.getAsObject();
                let index = ele.story_group_id;
                if(ele.story_type == 1){
                    charas[index] =ele;
                }
                else if(ele.story_type == 2){
                    mains[index] = ele;
                }
                else if(ele.story_type == 3){
                    guilds[index] = ele;
                }
                else{
                    events[index] = ele;
                }
            }
            this.charaStoryDic = charas;
            this.mainStoryDic = mains;
            this.guildStoryDic = guilds;
            this.eventStoryDic = events;
        },
        getrouter: function(key){

        },
        getpath: function(){

        }
    },
}



</script>