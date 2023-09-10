<script lang="ts" setup>
import { AppButtonType } from './AppButton.types';

interface AppButtonProps {
  type: AppButtonType;
}
const props = withDefaults(defineProps<AppButtonProps>(), { type: AppButtonType.Transparent });
</script>

<template>
  <button :class="props.type">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition:
    color 200ms,
    background-color 200ms,
    border 200ms;
  &:focus-visible {
    border-radius: 2px;
    outline: 2px solid lightskyblue;
  }

  &.transparent {
    background-color: transparent;
    &:hover {
      backdrop-filter: brightness(92%);
    }
  }
  &.dark {
    background-color: black;
    color: white;
    border: 1px solid black;
    &:hover {
      background-color: gray;
      border-color: gray;
    }
  }
  &.light {
    background-color: white;
    border: 1px solid black;
    &:hover {
      background-color: lightgray;
    }
  }
}
</style>
