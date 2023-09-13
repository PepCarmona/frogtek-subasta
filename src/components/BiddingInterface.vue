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
    <div class="bidding-actions">
      <Transition name="fade">
        <BiddingActions :key="selectedUser" :selected-user="selectedUser" />
      </Transition>
    </div>
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

  & > .bidding-actions {
    position: relative;
  }
}

.fade-enter-active {
  position: absolute;
  width: 100%;
  top: 0;
  transition: opacity 300ms ease-in 100ms;
}
.fade-leave-active {
  transition:
    opacity 150ms ease-in,
    transform 400ms;
}

.fade-enter-from {
  left: -240px;
  opacity: 0;
}
.fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
