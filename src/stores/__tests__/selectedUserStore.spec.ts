import { describe, it, expect } from 'vitest';
import { AuctionUser, useSelectedUserStore } from '../selectedUserStore';
import { createPinia, setActivePinia, storeToRefs } from 'pinia';

describe('selectedUserStore', () => {
  setActivePinia(createPinia());
  const selectedUserStore = useSelectedUserStore();
  const { selectedUser } = storeToRefs(selectedUserStore);
  const { selectUser, isSelectedUser, getAuctionUserName } = selectedUserStore;

  it('has buyer as default selected user', () => {
    expect(selectedUser.value).toEqual(AuctionUser.Buyer);
  });

  it('can select user', () => {
    selectUser(AuctionUser.Seller);

    expect(selectedUser.value).toEqual(AuctionUser.Seller);
  });

  it('can check if user is selected', () => {
    expect(isSelectedUser(AuctionUser.Seller)).toBe(true);
    expect(isSelectedUser(AuctionUser.Buyer)).toBe(false);

    selectUser(AuctionUser.Buyer);
    expect(isSelectedUser(AuctionUser.Buyer)).toBe(true);
  });

  it('can get auction user name', () => {
    expect(getAuctionUserName(AuctionUser.Buyer)).toEqual('Comprador');
    expect(getAuctionUserName(AuctionUser.Seller)).toEqual('Vendedor');
  });
});
