<script lang="ts" setup>
import BiddingInterface from '@/components/BiddingInterface.vue';
</script>

<template>
  <main class="main-view">
    <BiddingInterface />
  </main>
</template>

<style lang="scss" scoped>
.main-view {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-dark);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: url(../assets/background.webp);
    background-position: 80%;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(50px) saturate(90%) brightness(95%);
  }
}
</style>
