import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import AppButton from '../AppButton.vue';
import { AppButtonType } from '../AppButton.types';

const BUTTON_SLOT_TEXT = 'Test Button';

describe('AppButton', () => {
  const wrapper = mount(AppButton, { slots: { default: BUTTON_SLOT_TEXT } });
  const innerButton = wrapper.get('button');

  it('has transparent as default variant', () => {
    expect(wrapper.vm.variant).toBe(AppButtonType.Transparent);
  });

  it('adds classes depending on variant', async () => {
    expect(wrapper.classes()).toContain('transparent');

    await wrapper.setProps({ variant: AppButtonType.Dark });
    expect(wrapper.classes()).toContain('dark');

    await wrapper.setProps({ variant: AppButtonType.Light });
    expect(wrapper.classes()).toContain('light');
  });

  it('renders slot text', () => {
    expect(wrapper.html()).toContain(BUTTON_SLOT_TEXT);
  });

  it('emits inner button click event', () => {
    innerButton.trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('does not emit inner disabled button click event', () => {
    innerButton.element.setAttribute('aria-disabled', 'true');
    innerButton.trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
  });
});
