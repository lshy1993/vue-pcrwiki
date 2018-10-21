<template>
<div class="inset-container">
    <div class="section whitebox">
        <h2>资源下载</h2>
        <ul>
            <li v-if="currentPath.length>0">
                <div class="directory" @click="upDir()">
                    ...
                </div>
            </li>
            <li v-for="(ele,key) in filelist" :key="key">
                <div class="directory" v-if="ele.type=='d'" @click="changeDir(ele.fname)">
                    {{ ele.fname }}
                </div>
                <a v-if="ele.type=='f'" :href="getHref(ele.fname)">
                    {{ ele.fname }}
                </a>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            currentPath: [],
            filelist: []
        }
    },
    created(){
        this.getFileList();
        console.log('d'>'f');
    },
    methods:{
        getFileList: function(){
            //var url = "localhost:3000/pcr/file/";
            var url = "api.liantui.moe/file/pcr/";
            for(var pp in this.currentPath){
                url += this.currentPath[pp] + '/';
            }
            console.log(url);
            this.$http.get(url).then((response)=>{
                this.filelist = response.data;
            });
        },
        getHref: function(fname){
            var url = "/static/";
            for(var pp in this.currentPath){
                url += this.currentPath[pp] + '/';
            }
            return url + fname;
        },
        changeDir: function(fname){
            this.currentPath.push(fname);
            this.getFileList();
        },
        upDir: function(){
            this.currentPath.pop(-1);
            this.getFileList();
        },
    }
}
</script>

<style lang="scss">
    .directory {
        text-decoration: underline;
    }
    a:hover {
        text-decoration: none;
    }
</style>
