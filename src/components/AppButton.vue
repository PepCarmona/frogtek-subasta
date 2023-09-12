<script lang="ts" setup>
import { ref } from 'vue';
import { AppButtonType } from './AppButton.types';

interface AppButtonProps {
  variant?: AppButtonType;
}
const props = withDefaults(defineProps<AppButtonProps>(), { variant: AppButtonType.Transparent });

interface AppButtonEmits {
  (eventName: 'click'): void;
}
const emit = defineEmits<AppButtonEmits>();

const button = ref<HTMLButtonElement>();

function preventClickWhenDisabled(event: Event): void {
  const isDisabled = button.value?.getAttribute('aria-disabled') === 'true';

  if (isDisabled) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    emit('click');
  }
}
</script>

<template>
  <button ref="button" :class="props.variant" @click="preventClickWhenDisabled">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition:
    color 200ms ease,
    background-color 200ms ease,
    border 200ms ease;
  &:focus-visible {
    border-radius: 2px;
    outline: 2px solid var(--color-highlight);
  }
  &[aria-disabled='true'] {
    opacity: 40%;
    cursor: not-allowed;
  }

  &.transparent {
    background-color: transparent;
    &:hover:not([aria-disabled='true']) {
      backdrop-filter: brightness(92%);
    }
  }
  &.dark {
    background-color: var(--color-dark);
    color: var(--color-light);
    border: 1px solid var(--color-dark);
    &:hover:not([aria-disabled='true']) {
      background-color: var(--color-dark-subtle);
      border-color: var(--color-dark-subtle);
    }
  }
  &.light {
    background-color: var(--color-light);
    border: 1px solid var(--color-dark);
    &:hover:not([aria-disabled='true']) {
      background-color: var(--color-light-subtle);
    }
  }
}
</style>
