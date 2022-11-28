import { createContext, useContext } from 'react';
import { IFormInstance, IFormProps } from './type';

export interface ContextValue {
  formInstance: IFormInstance | null;
}

export const formContext = createContext<ContextValue & IFormProps>({
  formInstance: null,
});

export function useFormContext() {
  const context = useContext(formContext);
  return context;
}
