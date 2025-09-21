import { createContext, useContext } from 'react';

interface DemoContextType {
  isDemoMode: boolean;
  demoUserId: string;
}

const DemoContext = createContext<DemoContextType>({
  isDemoMode: false,
  demoUserId: '00000000-0000-0000-0000-000000000000'
});

export const useDemoMode = () => useContext(DemoContext);

export const DemoProvider = ({ children, user }: { children: React.ReactNode, user: any }) => {
  const isDemoMode = user?.is_demo || user?.id === '00000000-0000-0000-0000-000000000000';
  
  return (
    <DemoContext.Provider value={{ 
      isDemoMode, 
      demoUserId: '00000000-0000-0000-0000-000000000000' 
    }}>
      {children}
    </DemoContext.Provider>
  );
};