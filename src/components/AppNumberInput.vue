<script lang="ts" setup>
import { ref } from 'vue';

interface AppNumberInputProps {
  id: string;
  label: string;
}
const props = defineProps<AppNumberInputProps>();

interface AppNumberInputEmits {
  (eventName: 'input', eventValue?: number): void;
  (eventName: 'check-validity', eventValue: boolean): void;
}
const emit = defineEmits<AppNumberInputEmits>();

const validationError = ref<string>();

function handleInput(event: Event): void {
  const input = event.target as HTMLInputElement;

  const isValid = input.checkValidity();
  emit('check-validity', isValid);

  const eventNumberValue = isValid ? input.valueAsNumber : undefined;
  emit('input', eventNumberValue);

  validationError.value = isValid ? undefined : input.validationMessage;
}
</script>

<template>
  <div class="number-input">
    <input
      :id="props.id"
      type="number"
      :class="{ invalid: validationError }"
      min="0"
      step="0.01"
      required
      @input="handleInput"
    />
    <label :for="props.id">{{ props.label }}</label>
    <span v-if="validationError" data-test="validation-error" class="validation-error">
      {{ validationError }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.number-input {
  position: relative;
  padding-top: 10px;
  padding-bottom: 24px;
}

label {
  position: absolute;
  top: 28px;
  left: 20px;
  color: var(--color-light);
  font-size: 24px;
  font-weight: 800;
  line-height: 1;
  cursor: text;
  transition: all 200ms ease;
}

@mixin focused-label {
  top: -8px;
  padding: 0 5px;
  left: 12px;
  font-size: 14px;
}

input {
  display: block;
  background-color: var(--color-dark-subtle);
  color: var(--color-highlight);
  font-weight: 600;
  font-size: 24px;
  padding: 16px;
  width: 100%;
  border: none;
  border-radius: 16px;
  appearance: textfield;
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &:focus,
  &:focus-visible {
    outline: 1px solid var(--color-highlight);
    & + label {
      @include focused-label;
      color: var(--color-highlight);
    }
  }
  &:valid {
    & + label {
      @include focused-label;
    }
  }
  &.invalid {
    outline: 1px solid var(--color-error);
    & + label {
      @include focused-label;
      color: var(--color-error);
    }
  }
}

.validation-error {
  position: absolute;
  display: block;
  left: 16px;
  top: 72px;
  color: var(--color-error);
  font-size: 14px;
}
</style>
