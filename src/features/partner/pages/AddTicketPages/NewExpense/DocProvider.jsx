import { DocContext } from "./DocContext";
import { useState } from "react";

export const DocProvider = ({ children }) => {
    const [uploadedDocs, setUploadedDocs] = useState({});
  
    return (
      <DocContext.Provider value={{ uploadedDocs, setUploadedDocs}}>
        {children}
      </DocContext.Provider>
    );
  };
  