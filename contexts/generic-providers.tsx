'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { UserProvider } from './user-context';
import { DocumentProvider } from './document-context';
import { AlertProvider } from './alert-context';

export default function Providers({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <UserProvider>
        <DocumentProvider>
          <AlertProvider>
            {children}
          </AlertProvider>
        </DocumentProvider>
      </UserProvider>
    </LocalizationProvider>
  );
}