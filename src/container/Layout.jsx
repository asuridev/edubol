import React from 'react';
import { Header } from '@components/Header';


export function Layout({Outlet}) {
  return (
    <>
        <Header/>
        <main>
          <Outlet/>
        </main>
    </>
  )
}
