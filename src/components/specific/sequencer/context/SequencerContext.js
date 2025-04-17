import { createContext, useContext } from 'react';

export const SequencerContext = createContext();
export const useSequencer = () => useContext(SequencerContext);