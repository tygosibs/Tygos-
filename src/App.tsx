/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './theme/ThemeContext.tsx';
import { I18nProvider } from './i18n/I18nContext.tsx';
import { SyncProvider } from './sync/SyncContext.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { AppLayout } from './components/layout/AppLayout.tsx';
import { LoginView } from './components/auth/LoginView.tsx';
import { RegisterWizard } from './components/auth/RegisterWizard.tsx';
import { SuperAdminDashboard } from './components/superadmin/SuperAdminDashboard.tsx';
import { TenantDashboard } from './components/dashboard/TenantDashboard.tsx';
import { PosModule } from './components/pos/PosModule.tsx';
import { MenuRecipeModule } from './components/menu/MenuRecipeModule.tsx';
import { CostControlModule } from './components/costcontrol/CostControlModule.tsx';
import { InventoryModule } from './components/inventory/InventoryModule.tsx';
import { PurchasingModule } from './components/purchasing/PurchasingModule.tsx';
import { FinanceModule } from './components/finance/FinanceModule.tsx';
import { TaxModule } from './components/tax/TaxModule.tsx';
import { HrModule } from './components/hr/HrModule.tsx';
import { CrmModule } from './components/crm/CrmModule.tsx';
import { InternalChatModule } from './components/chat/InternalChatModule.tsx';
import { GlobalSearchModal } from './components/search/GlobalSearchModal.tsx';

const AppContent: React.FC = () => {
  const { currentUser, activeView, setActiveView } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  // If user is not logged in or explicitly in login/register view
  if (!currentUser || activeView === 'login') {
    if (isRegistering) {
      return <RegisterWizard onCancel={() => setIsRegistering(false)} />;
    }
    return <LoginView onOpenRegister={() => setIsRegistering(true)} />;
  }

  // Render view inside AppLayout
  const renderActiveView = () => {
    switch (activeView) {
      case 'super_admin':
        return <SuperAdminDashboard />;
      case 'pos':
        return <PosModule />;
      case 'menu':
        return <MenuRecipeModule />;
      case 'cost_control':
        return <CostControlModule />;
      case 'inventory':
        return <InventoryModule />;
      case 'purchasing':
        return <PurchasingModule />;
      case 'finance':
        return <FinanceModule />;
      case 'tax':
        return <TaxModule />;
      case 'hr':
        return <HrModule />;
      case 'crm':
        return <CrmModule />;
      case 'chat':
        return <InternalChatModule />;
      case 'dashboard':
      default:
        return <TenantDashboard />;
    }
  };

  return (
    <AppLayout>
      <GlobalSearchModal />
      {renderActiveView()}
    </AppLayout>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <SyncProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </SyncProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
