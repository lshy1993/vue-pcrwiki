<template>
<div class="inset-container">
    <div class="section whitebox">
    <h2>请选择故事</h2>
    <div id="tablist">
        <button v-on:click="mode=2">Main</button>
        <button v-on:click="mode=0">Chara</button>    
        <button v-on:click="mode=1">Guild</button>
        <button v-on:click="mode=3">Event</button>
    </div>
    <div v-if="mode==2">
        <div v-for="(ele,key) in mainStoryDic" :key="key">
            <router-link :to="getrouter(key)">
                <div>
                    <img :src="getimgurl(key)" />
                    <div>{{ele.title}}</div>
                </div>
            </router-link>
        </div>
	</div> 
    <div v-if="mode==0">
        <chara-filter v-on:filter="listenProps"/>
        <div class="clearfix" v-for="(ele,key) in charaStoryDic" :key="key">
            <router-link :to="getrouter(key)">
                <div class="storybox clearfixbox">
                    <div class="thumb128 clearfix">
                        <img :src="getStoryTopThumb(key)" />
                    </div>
                    <div class="storyinfo clearfix">{{ ele.title }}</div>
                </div>
            </router-link>
        </div>
	</div>
    <div v-if="mode==1">
        <div class="clearfix" v-for="(ele,key) in guildStoryDic" :key="key">
            <router-link :to="getrouter(key)">
                <div class="storybox clearfixbox">
                    <div class="thumb128 clearfix">
                        <img :src="Common.getGuildStoryThumb(key)" />
                    </div>
                    <div class="storyinfo clearfix">{{ ele.title }}</div>
                </div>
            </router-link>
        </div>
	</div>
</div>
</div>
</template>

<script>
import charaFilter from '@/components/charaFilter.vue';
export default {
    name: 'StoryIndex',
    data(){
        return {
            mode: 0,
            charaStoryDic: {},
            mainStoryDic: {},
            guildStoryDic: {},
            eventStoryDic: {},
            filter: {}
        }
    },
    created(){
        this.loadData();
    },
    methods:{
        listenProps: function(childValue){
            console.log('from child');
            this.filter = childValue;
        },
        loadData: function (params) {
            this.$http.get("http://api.liantui.xyz/pcr/story").then((response)=>{
                this.setStoryList(response.data);
			});
        },
        setStoryList: function(result){
            var charas = {};
            var mains = {};
            var guilds = {};
            var events = {};
            for(var id in result){
                var ele = result[id];
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
            return '/story/' + key;
        },
        getStoryTopThumb: function(key){
            let charaid = parseInt(key*100+11);
            return this.Common.getStoryTopThumb(charaid);
        },
    },
    components:{
        charaFilter
    }
}

</script>

<style lang="scss">
.storybox {
    width: 330px;
    height: 64px;
    border-radius: 10px;
    box-shadow: 1px;
    overflow: hidden;
    margin: 10px;
    background: white;
        
    .storyinfo{
        padding: 10px;
        width: 180px;
    }
}

</style>
