<script lang="ts" setup>
import { AuctionUser } from '@/stores/selectedUserStore';
import AppButton from './AppButton.vue';
import AppNumberInput from './AppNumberInput.vue';
import { computed, ref } from 'vue';
import { AppButtonType } from './AppButton.types';

interface BiddingActionsProps {
  selectedUser: AuctionUser;
  buyerPrice: number | null;
  sellerPrice: number | null;
}
const props = defineProps<BiddingActionsProps>();

interface BiddingActionsEmits {
  (eventName: 'send-buyer-price', value: number | null): void;
  (eventName: 'send-seller-price', value: number | null): void;
}
const emit = defineEmits<BiddingActionsEmits>();

const amount = ref<number | null>(null);
const isValidInput = ref<boolean>(false);

const buyerInputLabel = 'Puja máxima';
const sellerInputLabel = 'Precio mínimo';
const moneyInputLabel = computed(() =>
  props.selectedUser === AuctionUser.Buyer ? buyerInputLabel : sellerInputLabel
);

const currentPrice = computed(() =>
  props.selectedUser === AuctionUser.Buyer
    ? { amount: props.buyerPrice, label: `última puja` }
    : { amount: props.sellerPrice, label: `último precio` }
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

  amount.value = null;
}
</script>

<template>
  <form @submit.prevent="emitAmount">
    <AppNumberInput
      id="money-input"
      v-model="amount"
      :label="moneyInputLabel"
      @check-validity="isValidInput = $event"
    />
    <AppButton
      class="bid-button"
      type="submit"
      :aria-disabled="!isValidInput"
      :variant="AppButtonType.Highlight"
    >
      {{ currentPrice.amount ? 'Modificar' : 'Enviar' }}
      <span v-if="currentPrice.amount" class="current-price">
        ({{ currentPrice.label }}: <b>{{ currentPrice.amount }}€</b>)
      </span>
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
.current-price {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-dark);
  & b {
    color: var(--color-dark);
  }
}
</style>
