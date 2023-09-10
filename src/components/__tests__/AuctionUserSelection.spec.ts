import { describe, it, expect, vitest } from 'vitest';

import { mount } from '@vue/test-utils';
import AuctionUserSelection from '../AuctionUserSelection.vue';
import AppTab from '../AppTab.vue';
import { AuctionUser } from '@/stores/selectedUser';
import { createTestingPinia } from '@pinia/testing';
import { useAuctionUserStore } from '@/stores/selectedUser';

describe('AuctionUserSelection', () => {
  const wrapper = mount(AuctionUserSelection, {
    global: { plugins: [createTestingPinia({ createSpy: vitest.fn })] }
  });

  const innerAppTabs = wrapper.findAllComponents(AppTab);

  const selectedUserStore = useAuctionUserStore();

  it('renders a tab for every AuctionUser', () => {
    expect(innerAppTabs).toHaveLength(Object.keys(AuctionUser).length);
  });

  it('selects user when clicking on a tab', () => {
    innerAppTabs[0].trigger('click');
    expect(selectedUserStore.selectUser).toHaveBeenCalledWith(AuctionUser.Buyer);

    innerAppTabs[1].trigger('click');
    expect(selectedUserStore.selectUser).toHaveBeenCalledWith(AuctionUser.Seller);

    expect(selectedUserStore.selectUser).toHaveBeenCalledTimes(2);
  });
});
