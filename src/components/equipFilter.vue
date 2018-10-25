<template>
<div class="filterBox">
    <div @click="filteron=!filteron" class="filterHead">过滤器</div>
    <transition name="fade">
        <div v-show="filteron" style="overflow:hidden">
            <div class="filterLine">
                <span>装备等级</span>
                <input type="radio" id="star_all" :value="-1" v-model="filter.plv">
                <label for="star_all">All</label>
                <input type="radio" id="star_one" :value="1" v-model="filter.plv">
                <label for="star_one">1</label>
                <input type="radio" id="star_two" :value="2" v-model="filter.plv">
                <label for="star_two">2</label>
                <input type="radio" id="star_three" :value="3" v-model="filter.plv">
                <label for="star_three">3</label>
                <input type="radio" id="star_four" :value="4" v-model="filter.plv">
                <label for="star_four">4</label>
            </div>
            <div class="filterLine">
                <span>需要合成</span>
                <input type="radio" id="type_all" :value="-1" v-model="filter.flag">
                <label for="type_all">All</label>
                <input type="radio" id="type_t" :value="1" v-model="filter.flag">
                <label for="type_t">是</label>
                <input type="radio" id="type_f" :value="0" v-model="filter.flag">
                <label for="type_f">否</label>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
export default {
name: 'EquipFilter',
    data(){
        return {
            filteron: false,
            filter: {
                plv: -1,
                flag: -1
            }
        }
    },
    created(){
        this.$emit('filter', this.filter);
    },
    watch:{
        filter: function(){
            //console.log('aaa');
            this.$emit('filter', this.filter);
        }
    }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
    transition: .5s;
}
.fade-enter, .fade-leave-to {
    max-height: 0;
}
.fade-leave, .fade-enter-to {
    max-height: 10vh;
}
.filterBox {
    box-shadow: 0 0 0.15em 0.15em rgba(0,0,0,.125);
    margin-bottom: 10px;

    .filterHead {
        cursor: pointer;
        padding: 10px;
        height: 20px;
        //border-radius: 10px;
        background: white;
        transition: background-color 0.5s;

        &:hover {
            background: grey;
        }
    }

    .filterLine{
        padding: 10px;
    }
}
</style>
