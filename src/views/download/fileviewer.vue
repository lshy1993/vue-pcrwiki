<template>
    <div>
        <h2>{{ fileTitle }}</h2>
        <router-link :to="'/download'">返回</router-link>
        <div class="filewrap">
            <div v-for="(ele,key) in filelist" :key="key" class="fileplate">
                <img :class="thumbclass" :src="getHref(ele.fname)" />
                <a class="filename" :href="getHref(ele.fname)">{{ ele.fname }}</a>
                <span class="filename">{{ Common.changeByte(ele.size) }}</span>
                <span class="filename">{{ changeTime(ele.time) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'IconItem',
    props: ['fileTitle','thumbclass','folder'],
    data(){
        return {
            filelist: []
        }
    },
    created(){
        this.getFileList();
    },
    watch:{
        folder: function(){
            this.getFileList();
        }
    },
    methods:{
        getFileList: function(){
            var url = "//api.liantui.moe/file/pcr/img/"+this.folder;
            this.$http.get(url).then((response)=>{
                this.filelist = response.data;
                this.filelist.sort((a,b)=>{
                    let ai = parseInt(a.fname.substring(11,16));
                    let bi = parseInt(b.fname.substring(11,16));
                    return ai-bi;
                });
            });
        },
        getHref: function(fname){
            return "/static/img/"+this.folder+"/"+ fname;
        },
        changeTime: function(time){
            return this.$moment(time).format('YYYY/MM/DD hh:mm');
        }
    }
}
</script>

<style lang="scss">
    img.thumbitem {
        display: block;
        width: 48px;
        height: 48px;
    }
    img.thumbstill {
        display: block;
        width: 200px;
        height: 113px;
    }
    img.thumbplate {
        display: block;
        width: 256px;
        height: 128px;
    }
</style>
