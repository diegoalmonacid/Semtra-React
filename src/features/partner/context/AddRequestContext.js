import { createContext, useContext } from "react";

export const AddRequestContext = createContext();

export const useAddRequest = () => useContext(AddRequestContext);