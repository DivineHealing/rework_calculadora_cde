import { create } from 'zustand';
import { devtools } from 'zustand/middleware'; // Importe o devtools

interface VidaState {
  vidaAtual: number;
  vidaMaxima: number;
  setVidaAtual: (valor: number) => void;
  setVidaMaxima: (valor: number) => void;
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

export const useVidaStore = create<VidaState>((set) => ({
  vidaAtual: 100,
  vidaMaxima: 100,
  setVidaAtual: (valor) => set({ vidaAtual: valor }),
  setVidaMaxima: (valor) => set((state) => ({ vidaMaxima: valor, vidaAtual: valor })),
  setDanoVida: (valor) => set((state) => ({vidaAtual: Math.min(state.vidaMaxima, state.vidaAtual - valor),})),
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


// Envolve a store com o middleware devtools
export const useVidaStoreBase = devtools(useVidaStore) as typeof useVidaStore;