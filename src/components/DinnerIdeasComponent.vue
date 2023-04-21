<script setup>
defineProps({

})

</script>

<template>
    <div class="box-container">
        <h1>Middagsforslag</h1>
        <div id="dinners-container">
            <ul>
                <li v-for="dinner in dinners" :key="dinner.id">{{ dinner.name }}</li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.id,
            items: [],
        };
    },
    created() {

    }


}

</script>


<style>

</style>
