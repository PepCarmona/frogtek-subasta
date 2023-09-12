<script lang="ts" setup>
import { AuctionUser } from '@/stores/selectedUserStore';
import AppButton from './AppButton.vue';
import AppNumberInput from './AppNumberInput.vue';
import { computed, ref } from 'vue';
import { AppButtonType } from './AppButton.types';

interface BiddingActionsProps {
  selectedUser: AuctionUser;
}
const props = defineProps<BiddingActionsProps>();

interface BiddingActionsEmits {
  (eventName: 'send-buyer-price', value: number): void;
  (eventName: 'send-seller-price', value: number): void;
}
const emit = defineEmits<BiddingActionsEmits>();

const amount = ref<number>();
const isValidInput = ref<boolean>(false);

const buyerInputLabel = 'Puja máxima';
const sellerInputLabel = 'Precio mínimo';
const moneyInputLabel = computed(() =>
  props.selectedUser === AuctionUser.Buyer ? buyerInputLabel : sellerInputLabel
);

function emitAmount(): void {
  if (amount.value === undefined) {
    throw Error('Can not emit undefined amount');
  }

  switch (props.selectedUser) {
    case AuctionUser.Buyer:
      emit('send-buyer-price', amount.value);
      break;

    case AuctionUser.Seller:
      emit('send-seller-price', amount.value);
      break;
  }
}
</script>

<template>
  <form @submit.prevent="emitAmount">
    <AppNumberInput
      id="money-input"
      :label="moneyInputLabel"
      @input="amount = $event"
      @check-validity="isValidInput = $event"
    />
    <AppButton
      class="bid-button"
      type="submit"
      :aria-disabled="!isValidInput"
      :variant="AppButtonType.Highlight"
    >
      Enviar
    </AppButton>
  </form>
</template>

<style lang="scss" scoped>
.bid-button {
  width: 100%;
  border-radius: 16px;
  font-size: 20px;
  font-weight: 800;
}
</style>
