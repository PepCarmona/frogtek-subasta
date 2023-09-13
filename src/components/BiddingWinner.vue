<script lang="ts" setup>
import { AuctionUser } from '@/stores/selectedUserStore';
import { computed, onUnmounted } from 'vue';
import AppButton from './AppButton.vue';
import { AppButtonType } from './AppButton.types';
import { useWeatherStore } from '@/stores/weatherStore';
import { storeToRefs } from 'pinia';

interface BiddingWinnerProps {
  auctionWinner: AuctionUser;
  buyerPrice: number;
  sellerPrice: number;
}
const props = defineProps<BiddingWinnerProps>();

interface BiddingWinnerEmits {
  (eventName: 'reset'): void;
}
const emit = defineEmits<BiddingWinnerEmits>();

const weatherStore = useWeatherStore();
const { fetchWeatherReport, clearWeatherData } = weatherStore;
const { isLoading, temperature, weatherLocation } = storeToRefs(weatherStore);

fetchWeatherReport();

const winnerTitle = computed(() =>
  props.auctionWinner === AuctionUser.Buyer ? '¡Enhorabuena!' : 'No ha habido trato'
);

onUnmounted(() => clearWeatherData());
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
    <section class="temperature" :class="{ loading: isLoading }">
      <p v-if="!isLoading && weatherLocation && temperature">
        La temperatura en {{ weatherLocation }} es de <b>{{ temperature }}ºC</b>
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
    &.loading {
      height: 18px;
      width: 200px;
      margin: 0 14px;
      background-color: var(--color-dark-subtle);
      border-radius: 16px;
    }
  }
}
</style>
