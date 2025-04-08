import { create } from "zustand"
import { inviteRepository } from "@/repositories/invite-couple-repository";
import { userRepository } from "@/repositories/user-repository";
import { useAuth } from "./use-auth";

interface CoupleInviteStore {
  invite: Invite | null;
  findInviteByToken: (inviteToken: string) => Promise<Invite>;
  verifyIfAlreadyExistsPendingInvite: () => Promise<Invite>
  verifyIfInvitedAlreadyExists: (inviteeEmail: string) => Promise<boolean>
  cleanInvite: () => void;
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
  verifyIfAlreadyExistsPendingInvite: async () => {
    try {
      const { user } = useAuth.getState();

      const invite = await inviteRepository.findByInviter(user.id)

      set({ invite })

      return invite;
    } catch (error) {
      get().cleanInvite()
    }
  },
  verifyIfInvitedAlreadyExists: async (inviteeEmail: string) => {
    try {
      const userAlreadyExists = await userRepository.findByIdOrEmail(inviteeEmail)

      if (userAlreadyExists?.id) {
        return true
      }
    } catch (error) {
      return false;
    }
  },
  cleanInvite: () => {
    set({ invite: null })
  }
}))
