import { createContext, useContext } from "react";


export const DocContext = createContext();




export const useDoc = () => useContext(DocContext);