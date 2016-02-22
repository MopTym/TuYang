<template lang="jade">
.list
  waterfall(:line-gap="400", :max-line-gap="400", :min-line-gap="300", :single-max-width="420", :align="'center'")
    waterfall-slot(v-for="item in items", :width="item.image.width", :height="item.image.height")
      .list-item
        a.thumbnail(target="_blank", :href="item.postUrl", :style="{ backgroundImage: 'url('+item.thumbnail.url+')' }")
        .info
          i.ion-person.submitter-icon
          .submitter {{ item.submitter }}
          i.like.ion-android-favorite-outline
</template>

<style lang="scss">
$gap: 0.3rem;

.list {
  margin-top: 3rem + $gap;
  padding: 0 $gap;
}

.list-item {
  position: absolute;
  top: $gap;
  left: $gap;
  right: $gap;
  bottom: $gap;
  cursor: pointer;
  overflow: hidden;

  &:hover > .info {
    transform: translateY(0);
    opacity: 1;
  }
  .thumbnail {
    display: block;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-color: #eee;
  }
  .info {
    position: absolute;
    width: 100%;
    height: 3rem;
    bottom: 0;
    padding: 0 0.8rem;
    color: #eee;
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%);
    transform: translateY(100%);
    transition: all 0.2s;
    opacity: 0;

    * {
      line-height: 3rem;
    }
    .submitter-icon {
      float: left;
      font-size: 1.5rem;
    }
    .submitter {
      float: left;
      margin-left: 0.8rem;
    }
    .like {
      float: right;
      font-size: 1.5rem;
    }
  }
}
</style>

<script>
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import listService from '../services/list'

export default {
  components: {
    Waterfall,
    WaterfallSlot
  },
  data: () => ({
    items: []
  }),
  ready: refresh,
  events: {
    'wf-reflowed': function () {
      this.$dispatch('loading-complete')
    }
  }
}

function refresh () {
  listService.getLastList().then((res) => {
    this.items = res
  }, (err) => {
    console.log(err)
  })
}
</script>
