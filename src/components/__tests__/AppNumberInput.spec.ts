import { describe, it, expect } from 'vitest';

import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils';
import AppNumberInput from '../AppNumberInput.vue';

const INPUT_LABEL = 'Test input';

describe('AppButton', () => {
  const { wrapper, input } = createNumberInputWrapper();

  it('creates label element based on prop', () => {
    expect(wrapper.get('label').text()).toBe(INPUT_LABEL);
  });

  it('input number value is always displayed', () => {
    input.setValue(10);
    expect(input.element.value).toBe('10');

    input.setValue(-29);
    expect(input.element.value).toBe('-29');
  });

  it('input string number is never displayed', () => {
    input.setValue('a');
    expect(input.element.value).toBe('');

    input.setValue('#');
    expect(input.element.value).toBe('');
  });

  it('emits valid number input value', () => {
    const { wrapper: tempWrapper } = createNumberInputWrapper();

    tempWrapper.get('input').setValue(10);
    expect(tempWrapper.emitted('input')).toHaveLength(1);
  });

  it('does not emit invalid input value', () => {
    const { wrapper: tempWrapper, input: tempInput } = createNumberInputWrapper();

    tempInput.setValue('a');
    tempInput.setValue(-10);
    expect(tempWrapper.emitted('input')).toBeFalsy();
  });

  it('displays validation error when modified input is invalid', async () => {
    const { wrapper: tempWrapper, input: tempInput } = createNumberInputWrapper();

    const validationErrorSelector = '[data-test="validation-error"]';
    expect(tempWrapper.find(validationErrorSelector).exists()).toBeFalsy();

    await tempInput.setValue(9);
    expect(tempWrapper.find(validationErrorSelector).exists()).toBeFalsy();

    await tempInput.setValue(-9);
    expect(tempWrapper.find(validationErrorSelector).exists()).toBeTruthy();

    await tempInput.setValue('a');
    expect(tempWrapper.find(validationErrorSelector).exists()).toBeTruthy();

    await tempInput.setValue('');
    expect(tempWrapper.find(validationErrorSelector).exists()).toBeTruthy();

    await tempInput.setValue(9);
    expect(tempWrapper.find(validationErrorSelector).exists()).toBeFalsy();
  });

  it('emits checkValidity on input', () => {
    const { wrapper: tempWrapper, input: tempInput } = createNumberInputWrapper();

    tempInput.setValue(10);
    expect(tempWrapper.emitted('check-validity')).toHaveLength(1);
    expect(tempWrapper.emitted('check-validity')?.[0]).toEqual([true]);

    tempInput.setValue(-10);
    expect(tempWrapper.emitted('check-validity')).toHaveLength(2);
    expect(tempWrapper.emitted('check-validity')?.[1]).toEqual([false]);

    tempInput.setValue('abcdef');
    expect(tempWrapper.emitted('check-validity')).toHaveLength(3);
    expect(tempWrapper.emitted('check-validity')?.[2]).toEqual([false]);

    tempInput.setValue('');
    expect(tempWrapper.emitted('check-validity')).toHaveLength(4);
    expect(tempWrapper.emitted('check-validity')?.[3]).toEqual([false]);

    tempInput.setValue(23);
    expect(tempWrapper.emitted('check-validity')).toHaveLength(5);
    expect(tempWrapper.emitted('check-validity')?.[4]).toEqual([true]);
  });
});

function createNumberInputWrapper(): {
  wrapper: VueWrapper;
  input: Omit<DOMWrapper<HTMLInputElement>, 'exists'>;
} {
  const wrapper = mount(AppNumberInput, {
    props: { id: 'test-number-input', label: INPUT_LABEL }
  });

  const input = wrapper.get('input');

  return {
    wrapper,
    input
  };
}