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
  padding: 16px;
  background-color: transparent;
  cursor: pointer;
  transition:
    color 300ms ease,
    background-color 300ms ease,
    box-shadow 300ms ease,
    opacity 300ms ease,
    backdrop-filter 300ms ease;
  &:focus-visible {
    outline: 2px solid var(--color-highlight);
    &.highlight {
      outline: 2px solid var(--color-light);
    }
  }
  &[aria-disabled='true'] {
    opacity: 35%;
    cursor: not-allowed;
  }

  @mixin onActiveButtonHover {
    @media (hover: hover) {
      &:hover:not([aria-disabled='true']) {
        @content;
      }
    }
  }
  &.transparent {
    background-color: transparent;
    @include onActiveButtonHover {
      backdrop-filter: brightness(85%);
    }
  }
  &.dark {
    background-color: var(--color-dark);
  }

  &.highlight {
    background-color: var(--color-highlight);
    color: var(--color-dark);
    &:not([aria-disabled='true']) {
      box-shadow: 0px 2px 8px -4px var(--color-highlight);
    }
    @include onActiveButtonHover {
      background-color: var(--color-highlight-subtle);
    }
  }
}
</style>
