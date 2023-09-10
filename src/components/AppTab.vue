<script lang="ts" setup>
import { AppButtonType } from './AppButton.types';
import AppButton from './AppButton.vue';

interface AppTabProps {
  selected: boolean;
}
const props = defineProps<AppTabProps>();

interface AppTabEmits {
  (eventName: 'select'): void;
}
const emit = defineEmits<AppTabEmits>();
</script>

<template>
  <AppButton
    :type="props.selected ? AppButtonType.Dark : AppButtonType.Light"
    role="tab"
    @click="emit('select')"
  >
    <slot />
  </AppButton>
</template>
