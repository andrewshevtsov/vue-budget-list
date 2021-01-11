<template>
  <div class="total-value" v-bind:class="coloredTotal">Balance: {{ total }}</div>
</template>

<script>
export default {
  name: 'TotalBalance',
  props: {
    total: {
      type: Number,
      default: 0,
    }
  },
  computed: {
    coloredTotal() {
      return {
        'text-green': this.total > 0,
        'text-red': this.total < 0,
      }
    },
  }
}
</script>

<style scoped>
.total-value {
  font-size: 26px;
  text-transform: uppercase;
  padding: 20px;
  text-align: center;
}

.text-green {
  color: green;
}

.text-red {
  color: tomato;
}
</style>