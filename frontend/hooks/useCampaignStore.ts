import { useSyncExternalStore } from 'react';
import { useCampaignStore } from '../store/useCampaignStore';

export function useCampaignStore() {
  return useSyncExternalStore(useCampaignStore.subscribe, useCampaignStore.getSnapshot);
}
