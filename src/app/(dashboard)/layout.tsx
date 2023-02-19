import GlassPane from '@frontend/components/GlassPane';
import Sidebar from '@frontend/components/Sidebar';
import { ReactNode } from 'react';
import '@frontend/styles/global.css';

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          <Sidebar />
          {children}
        </GlassPane>
        <div>
          <div id="modal" />
        </div>
      </body>
    </html>
  );
};

export default DashboardLayout;
