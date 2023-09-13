import { describe, it, expect } from 'vitest';
import { AuctionUser } from '../selectedUserStore';
import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { useAuctionStore } from '../auctionStore';

describe('selectedUserStore', () => {
  setActivePinia(createPinia());
  const auctionStore = useAuctionStore();
  const { auctionWinner, buyerPrice, sellerPrice } = storeToRefs(auctionStore);

  it('has no amounts by default', () => {
    expect(buyerPrice.value).toBe(null);
    expect(sellerPrice.value).toBe(null);
  });

  it('has no winner when one of the amounts is not defined', () => {
    expect(auctionWinner.value).toBeUndefined();

    buyerPrice.value = 20;
    expect(auctionWinner.value).toBeUndefined();

    buyerPrice.value = null;
    sellerPrice.value = 20;
    expect(auctionWinner.value).toBeUndefined();
  });

  it('returns correct auction result', () => {
    buyerPrice.value = 15;
    sellerPrice.value = 20;
    expect(auctionWinner.value).toBe(AuctionUser.Seller);

    buyerPrice.value = 15;
    sellerPrice.value = 10;
    expect(auctionWinner.value).toBe(AuctionUser.Buyer);

    buyerPrice.value = 15;
    sellerPrice.value = 15;
    expect(auctionWinner.value).toBe(AuctionUser.Buyer);
  });
});
