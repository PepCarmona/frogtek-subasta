<script lang="ts" setup>
import { useSelectedUserStore } from '@/stores/selectedUserStore';
import AuctionUserSelection from './AuctionUserSelection.vue';
import BiddingActions from './BiddingActions.vue';
import { storeToRefs } from 'pinia';

const selectedUserStore = useSelectedUserStore();
const { selectedUser } = storeToRefs(selectedUserStore);
</script>

<template>
  <div class="bidding-interface">
    <AuctionUserSelection class="user-selection" />
    <BiddingActions class="bidding-actions" :selected-user="selectedUser" />
  </div>
</template>

<style lang="scss" scoped>
.bidding-interface {
  position: relative;
  width: 90%;
  max-width: 400px;
  margin: auto;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  background-color: var(--color-dark);

  & > .user-selection {
    display: flex;
  }
}
</style>
