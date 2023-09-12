import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import AppTab from '../AppTab.vue';
import AppButton from '../AppButton.vue';
import { AppButtonType } from '../AppButton.types';

const TAB_SLOT_TEXT = 'Test Tab';

describe('AppTab', () => {
  const wrapper = mount(AppTab, { props: { selected: true }, slots: { default: TAB_SLOT_TEXT } });
  const innerAppButton = wrapper.findComponent(AppButton);

  it('renders inner button with correct variant depending on selected prop', async () => {
    expect(innerAppButton.vm.variant).toBe(AppButtonType.Dark);

    await wrapper.setProps({ selected: false });
    expect(innerAppButton.vm.variant).toBe(AppButtonType.Light);
  });

  it('renders slot text', () => {
    expect(wrapper.html()).toContain(TAB_SLOT_TEXT);
  });

  it('triggers select emit when clicked', () => {
    innerAppButton.trigger('click');
    expect(wrapper.emitted('select')).toBeTruthy();
  });
});
