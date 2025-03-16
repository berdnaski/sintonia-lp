import { create } from "zustand"
import { inviteRepository } from "@/repositories/invite-couple-repository";

interface CoupleInviteStore {
  invite: Invite | null;
  findInviteByToken: (inviteToken: string) => Promise<Invite>;
  cleanInvite: () => void
}

export const useCoupleInvite = create<CoupleInviteStore>((set, get) => ({
  invite: null,
  findInviteByToken: async (inviteToken: string) => {
    try {
      const invite = await inviteRepository.findByToken(inviteToken)

      set({ invite })
      return invite
      } catch {
        get().cleanInvite()
      }
  },
  cleanInvite: () => {
    set({ invite: null })
  }
}))
