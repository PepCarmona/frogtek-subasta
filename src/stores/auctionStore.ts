import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AuctionUser } from './selectedUserStore';

export const useAuctionStore = defineStore('auctionStore', () => {
  const buyerPrice = ref<number>();
  const sellerPrice = ref<number>();

  const auctionWinner = computed(() => {
    if (!buyerPrice.value || !sellerPrice.value) {
      return;
    }

    return buyerPrice.value >= sellerPrice.value ? AuctionUser.Buyer : AuctionUser.Seller;
  });

  return {
    buyerPrice,
    sellerPrice,
    auctionWinner
  };
});