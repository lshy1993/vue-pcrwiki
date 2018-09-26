<template>
    <div id="charaAlbum">
        <div>
            过滤器
        </div>
        <div class="clearfixbox">
            <chara-plate-img v-for="(ele,key) in charaDic" v-bind:key="key" v-bind:charaData="ele" />
        </div>
    </div>
</template>

<script>
import CharaPlateImg from './charaPlateImg.vue'

export default {
    name: 'CharaAlbum',
    props: ['charaDic'],
    data(){
        return {
            //charaDic: {},
        }
    },
    created: function(){
        console.log("show chara album");
    },
    methods: {
        setCharaPlate: function(result){
            var dd = {};
            while(result.step()){
                var ele = result.getAsObject();
                var id = ele['unit_id'];
                dd[id] = ele;
            }
            this.charaDic = dd;
        }
    },
    components:{
        CharaPlateImg
    }
}
</script>

<style lang="scss">
#charaAlbum {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    .charaplate {
        width: 220px;
        height: 110px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #9E9E9E;
        box-shadow: 1px 1px 1px #C8C8C8;
        position: relative;
        display: inline-block;
    }
}
</style>