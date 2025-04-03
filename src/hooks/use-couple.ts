import { create } from "zustand"
import { coupleRepository } from "@/repositories/couple-repository";
import { useAuth } from "./use-auth";
import { dateDiff } from "@/lib/date-fns";
import { Duration, formatDuration } from "date-fns";
import { ptBR } from 'date-fns/locale'

interface CoupleStore {
  couple: Couple | null;
  metrics: CoupleMetric | null;
  name: string | null;
  fetchCouple: () => void;
  cleanCouple: () => void;
  setCouple: (couple: Couple) => void;
  fetchMetrics: () => void;
  durationFormatted: () => string
}

export const useCouple = create<CoupleStore>((set, get) => ({
  couple: null,
  metrics: null,
  name: null,
  fetchCouple: async () => {
    try {
      const { user } = useAuth.getState()

      if (!user) {
        get().cleanCouple()
        return
      }

      const couple = await coupleRepository.findByUser(user.id)

      get().setCouple(couple)
    } catch {
      get().cleanCouple()
    }
  },
  fetchMetrics: async () => {
    try {
      const { couple } = get()

      if (!couple) {
        return
      }

      const metrics = await coupleRepository.metrics(couple.id)

      set({ metrics })
    } catch {
      set({ metrics: null })
    }
  },
  durationFormatted: () => {
    const { couple } = get()

    if (!couple) {
      return ''
    }

    const diff = couple && dateDiff(couple.startAt, new Date())

    const getFormatOptions = (duration: Duration): (keyof Duration)[] => {
      if (!duration) {
        return null;
      }

      let result = Object.keys(duration) as (keyof Duration)[];

      if (duration.years || duration.months) {
        result = result.filter(item => !['hours', 'minutes', 'seconds'].includes(item))
      }

      return result
    }

    return formatDuration(diff, {
      format: getFormatOptions(diff),
      locale: ptBR
    })
  },
  setCouple:  (couple: Couple) => {
    set({ couple, name: `${couple.user1.name} & ${couple.user2.name}` })
  },
  cleanCouple:  () => {
    set({ couple: null, metrics: null })
  }
}))
