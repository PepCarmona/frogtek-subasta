<script lang="ts" setup>
import BiddingInterface from '@/components/BiddingInterface.vue';
import BiddingWinner from '@/components/BiddingWinner.vue';
import { useAuctionStore } from '@/stores/auctionStore';
import { storeToRefs } from 'pinia';

const auctionStore = useAuctionStore();
const { auctionWinner, buyerPrice, sellerPrice } = storeToRefs(auctionStore);
const { resetAuction } = auctionStore;
</script>

<template>
  <main class="main-view">
    <BiddingInterface />
    <Transition name="fade-down">
      <BiddingWinner
        v-if="auctionWinner && buyerPrice && sellerPrice"
        :auction-winner="auctionWinner"
        :buyer-price="buyerPrice"
        :seller-price="sellerPrice"
        :temperature="32"
        @reset="resetAuction"
      />
    </Transition>
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

.fade-down-enter-active,
.fade-down-leave-active {
  transition: all 300ms;
}

.fade-down-enter-from {
  transform: translateY(-100px);
  opacity: 0;
}
.fade-down-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}

.fade-down-enter-to,
.fade-down-leave-from {
  opacity: 1;
}
</style>
