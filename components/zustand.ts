import { create } from 'zustand';

interface VidaState {
  vidaAtual: number;
  vidaMaxima: number;
  setVidaAtual: (valor: number) => void;
  setVidaMaxima: (valor: number) => void;
}

interface VidaDanoState {
  dano: number;
  setDano: (valor: number) => void;
}

interface EscudoState {
  escudoF: number;
  setEscudoF: (valor: number) => void;
}

interface DanoEscudo {
  escudoDmg: number;
  setEscudoDmg: (valor: number) => void;
}

interface ManaVigor {
  mana: number;
  vigor: number;
  setMana: (valor: number) => void;
  setVigor:  (valor: number) => void;
}

export const useVidaStore = create<VidaState>((set) => ({
  vidaAtual: 100, // Valor inicial
  vidaMaxima: 100,
  setVidaAtual: (valor) => set({ vidaAtual: valor }),
  setVidaMaxima: (valor) =>
    set((state) => ({
      vidaMaxima: valor,
      setVidaAtual: valor,
    })),
}));

export const useVidaDanoStore = create<VidaDanoState>((set) => ({
  dano: 0, 
  setDano: (valor) => set({ dano: valor }),
}));


export const useEscudoStore = create<EscudoState>((set) => ({
  escudoF: 0, 
  setEscudoF: (valor) => set({ escudoF: valor }),
}));

export const useEscudoDmgStore = create<DanoEscudo>((set) => ({
  escudoDmg: 0, 
  setEscudoDmg: (valor) => set({ escudoDmg: valor }),
}));

export const useManaVigorStore = create<ManaVigor>((set) => ({
  mana: 100, 
  vigor: 100,
  setMana: (valor) => set({ mana: valor }),
  setVigor: (valor) => set({ vigor: valor }),
}));