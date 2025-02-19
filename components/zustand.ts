import { create } from 'zustand';
import { devtools } from 'zustand/middleware'; // Importe o devtools

interface VidaState {
  vidaAtual: number;
  vidaMaxima: number;
  regeneracao: number;
  setVidaAtual: (valor: number) => void;
  setVidaMaxima: (valor: number) => void;
  setRegeneracao: (valor: number) => void;
}

interface EscudoState {
  escudoMaximo: number;
  escudoAtual: number;
  setEscudoMaximo: (valor: number) => void;
  setEscudoAtual: (valor: number) => void;
}

interface DanoState {
  dano: number;
  escudo: number;
  reforco: number;
  penetracao: number,
  defesa: number,
  habilidade: number,
  setDano: (valor: number) => void;
  setEscudo: (valor: number) => void;
  setReforco: (valor: number) => void;
  setPenetracao: (valor: number) => void;
  setDefesa: (valor: number) => void;
  setHabilidade: (valor: number) => void;
}

interface ManaVigorState {
  manaMax: number;
  manaAtual: number;
  vigorMax: number;
  vigorAtual: number;
  regenMana: number;
  regenVigor: number;
  setManaMax: (valor: number) => void;
  setManaAtual: (valor: number) => void;
  setVigorMax: (valor: number) => void;
  setVigorAtual: (valor: number) => void;
  setRegenMana: (valor: number) => void;
  setRegenVigor: (valor: number) => void;
}
export const useVidaStore = create<VidaState>((set) => ({
  vidaAtual: 100,
  vidaMaxima: 100,
  regeneracao: 0,
  setRegeneracao: (valor) => set({ regeneracao: valor}),
  setVidaAtual: (valor) => set({ vidaAtual: valor }),
  setVidaMaxima: (valor) => set((state) => ({ vidaMaxima: valor, vidaAtual: valor })),
  setDanoVida: (valor) => set((state) => ({vidaAtual: Math.min(state.vidaMaxima, state.vidaAtual - valor),})),
  setCuraVida: (valor) => set((state) => ({vidaAtual: Math.min(state.vidaMaxima, state.vidaAtual + valor),})),
}));

export const useEscudoStore = create<EscudoState>((set) => ({
  escudoMaximo: 0,
  escudoAtual: 0,
  setEscudoAtual: (valor) => set({ escudoAtual: valor }),  
  setEscudoMaximo: (valor) => set((state) => ({ escudoMaximo: valor, escudoAtual: valor })),
}));

export const useDanoStore = create<DanoState>((set) => ({
  dano: 0,
  escudo: 0,
  reforco: 0,
  penetracao: 0,
  defesa: 0,
  habilidade: 0,
  setDano: (valor) => set({ dano: valor }),
  setEscudo: (valor) => set({escudo: valor}),
  setReforco: (valor) => set({reforco: valor}),
  setPenetracao: (valor) => set({penetracao: valor}),
  setDefesa: (valor) => set({defesa: valor}),
  setHabilidade: (valor) => set({habilidade: valor})
}));

export const useManaVigorStore = create<ManaVigorState>((set) => ({
  manaMax: 100,
  manaAtual: 100,
  vigorMax: 100,
  vigorAtual: 100,
  regenMana: 0,
  regenVigor: 0,
  setRegenMana: (valor) => set({regenMana: valor}),
  setRegenVigor: (valor) => set({regenVigor: valor}),
  setManaAtual: (valor) => set({ manaAtual: valor }),
  setVigorAtual: (valor) => set({vigorAtual: valor}),
  setManaMax: (valor) => set((state) => ({ manaMax: valor, manaAtual: valor})),
  setVigorMax: (valor) => set((state) => ({vigorMax: valor, vigorAtual: valor})),
  setRecMana: (valor) => set((state) => ({manaAtual: Math.min(state.manaMax, state.manaAtual + valor)})),
  setRecVigor: (valor) => set((state) => ({vigorAtual: Math.min(state.vigorMax, state.vigorAtual + valor)})),
  setGastoMana: (valor) => set((state) => ({manaAtual: Math.min(state.manaMax, state.manaAtual - valor)})),
  setGastoVigor: (valor) => set((state) => ({vigorAtual: Math.min(state.vigorMax, state.vigorAtual - valor)}))
}));

// Envolve a store com o middleware devtools
export const useVidaStoreBase = devtools(useVidaStore) as typeof useVidaStore;
export const useManaVigorStoreBase = devtools(useManaVigorStore) as typeof useVidaStore;