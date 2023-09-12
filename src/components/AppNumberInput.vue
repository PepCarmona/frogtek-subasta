<script lang="ts" setup>
import { ref } from 'vue';

interface AppNumberInputProps {
  id: string;
  label: string;
}
const props = defineProps<AppNumberInputProps>();

interface AppNumberInputEmits {
  (eventName: 'input', eventValue: number): void;
  (eventName: 'check-validity', eventValue: boolean): void;
}
const emit = defineEmits<AppNumberInputEmits>();

const isInvalidValue = ref<boolean>(false);
const validationError = ref<string>();

function handleInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  const eventNumberValue = input.valueAsNumber;
  const isValid = input.checkValidity();
  isInvalidValue.value = !isValid;
  emit('check-validity', isValid);

  if (isInvalidValue.value) {
    validationError.value = input.validationMessage;
  } else {
    validationError.value = undefined;
    emit('input', eventNumberValue);
  }
}
</script>

<template>
  <div class="number-input">
    <input
      :id="props.id"
      type="number"
      :class="{ invalid: isInvalidValue }"
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
}

label {
  position: absolute;
  top: 19px;
  left: 20px;
  color: var(--color-dark-subtle);
  font-weight: bold;
  line-height: 1.1;
  cursor: text;
  transition: all 200ms ease;
}

@mixin focused-label {
  top: 3px;
  background-color: var(--color-light);
  padding: 0 5px;
  left: 16px;
  font-size: 14px;
}

input {
  display: block;
  padding: 10px;
  width: 100%;
  appearance: textfield;
  &::-webkit-inner-spin-button {
    appearance: none;
  }
  &:focus {
    outline-color: var(--color-highlight);
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
    outline: 1px auto var(--color-error);
    & + label {
      @include focused-label;
      color: var(--color-error);
    }
  }
}

.validation-error {
  color: var(--color-error);
  font-size: 14px;
  margin-left: 5px;
}
</style>
