import { describe, it, expect } from 'vitest';

import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils';
import BiddingActions from '../BiddingActions.vue';
import { AuctionUser } from '@/stores/selectedUserStore';
import AppNumberInput from '../AppNumberInput.vue';
import AppButton from '../AppButton.vue';

describe('BiddingActions', () => {
  const { innerButton, innerInput, wrapper } = createBiddingActionsWrapper();

  it('displays correct input label depending on selectedUser prop value', async () => {
    const buyerInputLabel = 'Puja máxima';
    const sellerInputLabel = 'Precio mínimo';

    expect(wrapper.html()).toContain(buyerInputLabel);

    await wrapper.setProps({ selectedUser: AuctionUser.Seller });
    expect(wrapper.html()).toContain(sellerInputLabel);
  });

  it('should have disabled submit button by default', () => {
    expect(innerButton.element.getAttribute('aria-disabled')).toBe('true');
  });

  it('should have disabled button when input value is invalid', async () => {
    await innerInput.setValue('a');
    expect(innerButton.element.getAttribute('aria-disabled')).toBe('true');

    await innerInput.setValue(-10);
    expect(innerButton.element.getAttribute('aria-disabled')).toBe('true');
  });

  it('should have enabled button when input value is valid', async () => {
    await innerInput.setValue(0);
    expect(innerButton.element.getAttribute('aria-disabled')).toBe('false');

    await innerInput.setValue(10);
    expect(innerButton.element.getAttribute('aria-disabled')).toBe('false');
  });

  it('should emit correct action depending on selectedUser prop value', async () => {
    const buyerBiddingEmit = 'send-buyer-price';
    const sellerBiddingEmit = 'send-seller-price';
    const { innerInput, wrapper } = createBiddingActionsWrapper();

    await innerInput.setValue(10);
    await wrapper.get('form').trigger('submit');
    expect(wrapper.emitted(buyerBiddingEmit)).toHaveLength(1);

    await wrapper.setProps({ selectedUser: AuctionUser.Seller });

    await innerInput.setValue(10);
    await wrapper.get('form').trigger('submit');
    expect(wrapper.emitted(sellerBiddingEmit)).toHaveLength(1);
  });
});

function createBiddingActionsWrapper(): {
  wrapper: VueWrapper;
  innerInput: Omit<DOMWrapper<HTMLInputElement>, 'exists'>;
  innerButton: Omit<DOMWrapper<HTMLButtonElement>, 'exists'>;
} {
  const wrapper = mount(BiddingActions, {
    props: { selectedUser: AuctionUser.Buyer }
  });

  const innerInput = wrapper.getComponent(AppNumberInput).get('input');
  const innerButton = wrapper.getComponent(AppButton).get('button');

  return {
    wrapper,
    innerInput,
    innerButton
  };
}
