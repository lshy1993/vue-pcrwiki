<template>
<div id="charaAlbum">
    <chara-filter v-on:filter="listenProps"/>
    <div class="clearfixbox">
        <transition-group name="flip-list" tag="div" class="container">
            <chara-plate-img v-for="ele in charaShowDic" :key="ele.unit_id" :charaData="ele" />
        </transition-group>
    </div>
</div>
</template>

<script>
import CharaPlateImg from './charaPlateImg.vue';
import CharaFilter from '@/components/charaFilter.vue';
//import { rejects } from 'assert';

export default {
    name: 'CharaAlbum',
    props: ['charaDic'],
    data(){
        return {
            filter: {}
        }
    },
    created: function(){
        console.log("show chara album");
    },
    computed:{
        charaShowDic: function () {
            var result = [];
            for(var key in this.charaDic){
                let ele = this.charaDic[key];
                result.push(ele);
            }
            result = result.filter(this.checkStar);
            result = result.filter(this.checkPos);
            return result;
        }
    },
    methods: {
        listenProps: function(childValue){
            console.log('from child');
            this.filter = childValue;
        },
        setCharaPlate: function(result){
            var dd = {};
            while(result.step()){
                var ele = result.getAsObject();
                var id = ele['unit_id'];
                dd[id] = ele;
            }
            this.charaDic = dd;
        },
        checkStar: function(ele){
            if(this.filter.star == -1) return true;
            return ele.rarity==this.filter.star;
        },
        checkPos: function(ele){
            if(this.filter.position == -1) return true;
            let min = 300*(this.filter.position-1);
            let max = 300*(this.filter.position);
            return ele.search_area_width <= max && ele.search_area_width > min;
        }
    },
    components:{
        CharaPlateImg,
        CharaFilter
    }
}
</script>

<style lang="scss">
#charaAlbum {
    //font-family: "Avenir", Helvetica, Arial, sans-serif;
    .container {
        display: flex;
        flex-wrap: wrap;
    }

    .charaplate {
        display: flex;
        justify-content: space-around;
        align-items: center;
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