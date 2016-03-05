<template lang="jade">
.card
  .img(v-show="!isLoading")
    a.thumbnail(target="_blank", :href="post.image.url", :style="{ backgroundImage: 'url('+thumbnail+')' }")
    .info
      a(target="_blank", :href="post.postUrl")
        i.ion-person.submitter-icon
        .submitter {{{ post.submitter }}}
      i.like.ion-android-favorite-outline
  .img-loading(v-if="isLoading" transition="img-loading")
    bounce-loader.spinner(color="#ccc", size="30px")
</template>

<style lang="scss">
.card {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  .img {
    position: absolute;
    width: 100%;
    height: 100%;

    &:hover .info {
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
      z-index: 1;

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
  .img-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #e8e8e8;

    .spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
  .img-loading-transition {
    transition: all 0.3s ease;
  }

  .img-loading-leave {
    opacity: 0;
  }
}
</style>

<script>
import Vue from 'vue'
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'

export default {
  props: ['post'],
  data: () => ({
    isLoading: false,
    thumbnail: ''
  }),
  components: {
    BounceLoader
  },
  ready () {
    this.initLoader()
    setTimeout(this.loadImage, 300)
    setTimeout(this.loadImage, 600)
  },
  methods: {
    initLoader () {
      this.loader = new Image()
      this.loader.onload = () => {
        this.thumbnail = this.loader.src
        this.isLoading = false
      }
    },
    loadImage () {
      if (this.isInViewport() && !this.isSameImage()) {
        this.isLoading = true
        this.loader.src = this.post.thumbnail.url
      }
    },
    isInViewport () {
      let rect = this.$el.getBoundingClientRect()
      let height = window.innerHeight || document.documentElement.clientHeight
      let width = window.innerWidth || document.documentElement.clientWidth
      return rect.bottom > 0 && rect.right > 0 &&
             rect.top < height && rect.left < width
    },
    isSameImage () {
      return this.loader.src === this.post.thumbnail.url
    }
  },
  events: {
    'try-to-load-image': function () {
      if (!this.isLoading) {
        this.loadImage()
      }
    }
  }
}
</script>
