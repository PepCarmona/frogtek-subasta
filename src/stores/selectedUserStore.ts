import { defineStore } from 'pinia';
import { ref } from 'vue';

export enum AuctionUser {
  Buyer = 'comprador',
  Seller = 'vendedor'
}

export const useSelectedUserStore = defineStore('selectedUserStore', () => {
  const selectedUser = ref<AuctionUser>(AuctionUser.Buyer);

  function selectUser(auctionUser: AuctionUser): void {
    selectedUser.value = auctionUser;
  }

  function isSelectedUser(auctionUser: AuctionUser): boolean {
    return selectedUser.value === auctionUser;
  }

  function getAuctionUserName(auctionUser: AuctionUser): string {
    switch (auctionUser) {
      case AuctionUser.Buyer:
        return 'Comprador';

      case AuctionUser.Seller:
        return 'Vendedor';
    }
  }

  return {
    selectedUser,
    selectUser,
    isSelectedUser,
    getAuctionUserName
  };
});
