<script lang="ts" setup>
import { AuctionUser, useAuctionUserStore } from '@/stores/selectedUser';
import AppTab from './AppTab.vue';

const { selectUser, isSelectedUser, getAuctionUserName } = useAuctionUserStore();
</script>

<template>
  <nav role="tablist">
    <AppTab
      v-for="user in AuctionUser"
      :key="user"
      :selected="isSelectedUser(user)"
      @select="selectUser(user)"
    >
      {{ getAuctionUserName(user) }}
    </AppTab>
  </nav>
</template>
