<template>
<div class="filterBox">
    <div @click="filteron=!filteron" class="filterHead">过滤器</div>
    <transition name="fade">
        <div v-show="filteron" style="overflow:hidden">
            <div class="filterLine">
                <span>初始星级</span>
                <input type="radio" id="star_all" :value="-1" v-model="filter.star">
                <label for="star_all">All</label>
                <input type="radio" id="star_one" :value="1" v-model="filter.star">
                <label for="star_one">One</label>
                <input type="radio" id="star_two" :value="2" v-model="filter.star">
                <label for="star_two">Two</label>
                <input type="radio" id="star_three" :value="3" v-model="filter.star">
                <label for="star_three">Three</label>
            </div>
            <div class="filterLine">
                <span>类型</span>
                <input type="radio" id="type_all" value="-1" v-model="filter.position">
                <label for="type_all">All</label>
                <input type="radio" id="type_mae" value="1" v-model="filter.position">
                <label for="type_mae">前卫</label>
                <input type="radio" id="type_chu" value="2" v-model="filter.position">
                <label for="type_chu">中卫</label>
                <input type="radio" id="type_go" value="3" v-model="filter.position">
                <label for="type_go">后卫</label>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
export default {
    name: 'CharaFilter',
    data(){
        return {
            filteron: false,
            filter: {
                star: -1,
                position: -1
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
