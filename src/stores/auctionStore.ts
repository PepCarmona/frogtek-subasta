import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AuctionUser } from './selectedUserStore';

export const useAuctionStore = defineStore('auctionStore', () => {
  const buyerPrice = ref<number | null>(null);
  const sellerPrice = ref<number | null>(null);

  const auctionWinner = computed(() => {
    if (!buyerPrice.value || !sellerPrice.value) {
      return;
    }

    return buyerPrice.value >= sellerPrice.value ? AuctionUser.Buyer : AuctionUser.Seller;
  });

  function resetAuction(): void {
    buyerPrice.value = null;
    sellerPrice.value = null;
  }

  return {
    buyerPrice,
    sellerPrice,
    auctionWinner,
    resetAuction
  };
});
