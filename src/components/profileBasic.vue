<template>
<div>
    <h1>{{ msg }}</h1>
</div>
</template>

<script>
export default {
    name: 'BasicProfile',
    props: ['unitid'],
    data () {
        return {
            msg: ''
        }
    },
    created() {
        this.msg = 'there is something';
        console.log('11');
    },
	methods:{

	},
    components: {

    }
}
</script>