<template lang="jade">
.list
  waterfall(:line-gap="400", :max-line-gap="400", :min-line-gap="300", :single-max-width="420", :align="'center'")
    waterfall-slot(v-for="item in items", :width="item.image.width", :height="item.image.height")
      card.list-item(:post="item")
</template>

<style lang="scss">
$gap: 0.3rem;

.list {
  margin-top: 3rem + $gap;
  padding: 0 $gap;
}

.card.list-item {
  top: $gap;
  left: $gap;
  right: $gap;
  bottom: $gap;
}
</style>

<script>
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import Card from './Card'
import listService from '../services/list'

export default {
  components: {
    Waterfall,
    WaterfallSlot,
    Card
  },
  data: () => ({
    items: []
  }),
  ready: function () {
    let token
    window.addEventListener('scroll', () => {
      clearTimeout(token)
      token = setTimeout(() => this.$broadcast('try-to-load-image'), 100)
    }, false)
    refresh(this)
  },
  events: {
    'wf-reflowed': function () {
      this.$dispatch('loading-complete')
    }
  }
}

function refresh (vm) {
  listService.getLastList().then((res) => {
    vm.items = res.map((item) => item.attributes)
  }, (err) => {
    console.log(err)
  })
}
</script>
