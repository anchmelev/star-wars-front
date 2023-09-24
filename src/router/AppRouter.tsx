import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@app/components/MainLayout/MainLayout';
import { withLoading } from './withLoading.hoc';
import { Page } from './Page';

const Error404Page = React.lazy(() => import('@app/pages/Error404Page'));
const SWCharacterDetailsPage = React.lazy(() => import('@app/pages/SWCharacterDetailsPage'));
const SWCharacterListPage = React.lazy(() => import('@app/pages/SWCharacterListPage'));

const Error404 = withLoading(Error404Page);
const SWCharacterDetails = withLoading(SWCharacterDetailsPage);
const SWCharacterList = withLoading(SWCharacterListPage);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Page.home} element={<MainLayout />}>
          <Route index element={<SWCharacterList />} />
          <Route path={`${Page.characterDetails}/:id`} element={<SWCharacterDetails />} />
          <Route path={Page.error404} element={<Error404 />} />
        </Route>
        <Route path="*" element={<Navigate replace to={Page.error404} />} />
      </Routes>
    </BrowserRouter>
  );
};
