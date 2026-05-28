import { create } from 'zustand';

interface Campaign {
  id: string;
  name: string;
  status: string;
  budget: number;
}

interface CampaignStore {
  campaigns: Campaign[];
  loading: boolean;
  fetchCampaigns: () => Promise<void>;
  addCampaign: (campaign: Campaign) => void;
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: [],
  loading: false,
  fetchCampaigns: async () => {
    set({ loading: true });
    try {
      const res = await fetch('http://127.0.0.1:8000/api/campaigns');
      const data = await res.json();
      set({ campaigns: data, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },
  addCampaign: (campaign) => set((state) => ({ campaigns: [...state.campaigns, campaign] })),
}));
