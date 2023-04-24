<template>
  <div class="fridge-item-details" @click.stop="">
    <h2>{{ item.name }}</h2>
    <p>Amount: {{ item.amount }} {{ item.unit }}</p>
    <p>Days since purchase: {{ item.days_since_purchase }}</p>
    <p>Days until spoilt: {{ item.days_until_spoilt }}</p>
    <button @click="$emit('close')">Close</button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>