<template>
<div class="inset-container">
    <div class="section whitebox">
        <h2>资源下载</h2>
        <ul>
            <li v-for="(ele,key) in filelist" :key="key">
                <router-link  :to="'/download/'+ele">{{ ele }}</router-link>
            </li>
        </ul>
        <router-view />
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            //currentPath: [],
            filelist: ['stillunit','item','equipment','unitplate','skill','unit','unitshadow','charastory']
        }
    },
    created(){
        //this.getFileList();
        //console.log('d'>'f');
    },
    methods:{
        // getFileList: function(){
        //     //var url = "localhost:3000/pcr/file/";
        //     var url = "//api.liantui.moe/file/pcr/";
        //     for(var pp in this.currentPath){
        //         url += this.currentPath[pp] + '/';
        //     }
        //     console.log(url);
        //     this.$http.get(url).then((response)=>{
        //         this.filelist = response.data;
        //     });
        // },
        // getHref: function(fname){
        //     var url = "/static/";
        //     for(var pp in this.currentPath){
        //         url += this.currentPath[pp] + '/';
        //     }
        //     return url + fname;
        // },
        // changeDir: function(fname){
        //     this.currentPath.push(fname);
        //     this.getFileList();
        // },
        // upDir: function(){
        //     this.currentPath.pop(-1);
        //     this.getFileList();
        // },
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
