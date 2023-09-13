<script lang="ts" setup>
import { AuctionUser } from '@/stores/selectedUserStore';
import { computed } from 'vue';
import AppButton from './AppButton.vue';
import { AppButtonType } from './AppButton.types';

interface BiddingWinnerProps {
  auctionWinner: AuctionUser;
  buyerPrice: number;
  sellerPrice: number;
  temperature: number;
}
const props = defineProps<BiddingWinnerProps>();

interface BiddingWinnerEmits {
  (eventName: 'reset'): void;
}
const emit = defineEmits<BiddingWinnerEmits>();

const winnerTitle = computed(() =>
  props.auctionWinner === AuctionUser.Buyer ? '¡Enhorabuena!' : 'No ha habido trato'
);
</script>

<template>
  <div class="bidding-winner-dialog" role="dialog" aria-labelledby="dialog-title">
    <h2 id="dialog-title">{{ winnerTitle }}</h2>
    <section class="content">
      <p>
        La oferta de compra era de <b>{{ props.buyerPrice }}€</b>
      </p>
      <p>
        El mínimo aceptado era de <b>{{ props.sellerPrice }}€</b>
      </p>
      <AppButton
        class="reset"
        :focus="true"
        :variant="AppButtonType.Highlight"
        @click="emit('reset')"
      >
        Reset
      </AppButton>
    </section>
    <section class="temperature">
      <p>
        La temperatura en Huesca es de <b>{{ props.temperature }}ºC</b>
      </p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.bidding-winner-dialog {
  position: fixed;
  background-color: var(--color-dark);
  padding: 32px;
  border-radius: 16px;
  height: 400px;
  width: 96%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    & .reset {
      border-radius: 16px;
      font-size: 16px;
      width: 100px;
      display: block;
      margin: auto;
      margin-top: auto;
    }
  }

  & > .temperature {
    font-size: 14px;
  }
}
</style>
