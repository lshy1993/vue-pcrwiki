<template>
<div id="profileImage" class="clearfix">
    <div class="floatButton">
        <button>立绘显示</button>
        <button>切换</button>
    </div>
    <img v-bind:src="imgurl" />
</div>
</template>

<script>
export default {
    name: 'ProfileImg',
    props: ['unitid'],
    computed:{
        imgurl: function(){
            var imgid = parseInt(this.unitid)+30;
            return "/static/img/stillunit/still_unit_" +imgid+ ".png";
        }
    },
    created: function(){
        //console.log(this.imgpath);
    },
}    
</script>

<style lang="scss">
#profileImage {
    margin: 10px;
    position: relative;
    width: 600px;

    .floatButton{
        position: absolute;
        top: 15px;
        right: 10px;
    }
}
</style>
