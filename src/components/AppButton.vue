<script lang="ts" setup>
import { AppButtonType } from './AppButton.types';

interface AppButtonProps {
  variant: AppButtonType;
}
const props = withDefaults(defineProps<AppButtonProps>(), { variant: AppButtonType.Transparent });
</script>

<template>
  <button :class="props.variant">
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

  &.transparent {
    background-color: transparent;
    &:hover {
      backdrop-filter: brightness(92%);
    }
  }
  &.dark {
    background-color: var(--color-dark);
    color: var(--color-light);
    border: 1px solid var(--color-dark);
    &:hover {
      background-color: var(--color-dark-subtle);
      border-color: var(--color-dark-subtle);
    }
  }
  &.light {
    background-color: var(--color-light);
    border: 1px solid var(--color-dark);
    &:hover {
      background-color: var(--color-light-subtle);
    }
  }
}
</style>
