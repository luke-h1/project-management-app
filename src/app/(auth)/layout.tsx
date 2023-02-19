import GlassPane from '@frontend/components/GlassPane';
import { ReactNode } from 'react';
import '@frontend/styles/global.css';

interface Props {
  children: ReactNode;
}

const AuthRootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
};

export default AuthRootLayout;
