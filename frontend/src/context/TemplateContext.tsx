import { createContext, useContext, useState } from "react";

type TemplateType = "template1" | "template2" | "template3";

const TemplateContext = createContext<any>(null);

export const TemplateProvider = ({ children }: { children: React.ReactNode }) => {
  const [template, setTemplate] = useState<TemplateType>("template1");

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => useContext(TemplateContext);
