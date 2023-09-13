<script lang="ts" setup>
import { AuctionUser, useSelectedUserStore } from '@/stores/selectedUserStore';
import AppTab from './AppTab.vue';
import { useAuctionStore } from '@/stores/auctionStore';
import { storeToRefs } from 'pinia';

const { selectUser, isSelectedUser, getAuctionUserName } = useSelectedUserStore();
const { buyerPrice, sellerPrice } = storeToRefs(useAuctionStore());

function hasUserPrice(user: AuctionUser): boolean {
  return user === AuctionUser.Buyer ? buyerPrice.value !== null : sellerPrice.value !== null;
}
</script>

<template>
  <nav role="tablist" class="tablist">
    <AppTab
      v-for="user in AuctionUser"
      :key="user"
      class="tab"
      :class="{ selected: isSelectedUser(user), pending: !hasUserPrice(user) }"
      :selected="isSelectedUser(user)"
      @select="selectUser(user)"
    >
      {{ getAuctionUserName(user) }}
    </AppTab>
  </nav>
</template>

<style lang="scss" scoped>
.tablist {
  border-radius: 16px;
  padding: 8px;
  background-color: var(--color-dark-subtle);
  display: flex;
  gap: 8px;
}
.tab {
  position: relative;
  width: 100%;
  border-radius: 12px;
  font-size: 16px;
  &.selected {
    font-weight: 600;
    color: var(--color-highlight);
  }

  &.pending::after {
    content: '';
    position: absolute;
    height: 8px;
    width: 8px;
    border-radius: 8px;
    background-color: var(--color-highlight);
    top: 8px;
    right: 8px;
  }
}
</style>
