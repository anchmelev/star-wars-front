import React from 'react';
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { MainLayout } from '@app/components/MainLayout/MainLayout';
import { withLoading } from './withLoading.hoc';
import { Page } from './Page';

const Error404Page = React.lazy(() => import('@app/pages/Error404Page'));
const CharacterDetailsPage = React.lazy(() => import('@app/pages/CharacterDetailsPage'));
const CharacterListPage = React.lazy(() => import('@app/pages/CharacterListPage'));

const Error404 = withLoading(Error404Page);
const SWCharacterDetails = withLoading(CharacterDetailsPage);
const SWCharacterList = withLoading(CharacterListPage);

export const AppRouter: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path={Page.home} element={<MainLayout />}>
          <Route index element={<SWCharacterList />} />
          <Route path={`${Page.characterDetails}/:id`} element={<SWCharacterDetails />} />
          <Route path={Page.error404} element={<Error404 />} />
        </Route>
        <Route path="*" element={<Navigate replace to={Page.error404} />} />
      </>,
    ),
  );

  return <RouterProvider router={router} />;
};
