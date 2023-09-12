<script lang="ts" setup>
import { AuctionUser, useAuctionUserStore } from '@/stores/selectedUser';
import AppTab from './AppTab.vue';

const { selectUser, isSelectedUser, getAuctionUserName } = useAuctionUserStore();
</script>

<template>
  <nav role="tablist" class="tablist">
    <AppTab
      v-for="user in AuctionUser"
      :key="user"
      class="tab"
      :class="{ selected: isSelectedUser(user) }"
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
  width: 100%;
  border-radius: 12px;
  font-size: 16px;
  &.selected {
    font-weight: 600;
    color: var(--color-highlight);
  }
}
</style>
