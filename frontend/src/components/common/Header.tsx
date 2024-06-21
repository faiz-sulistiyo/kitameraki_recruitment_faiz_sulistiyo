import React from 'react'
import { matchRoutes, useLocation } from 'react-router-dom';
import { routes } from '../../routes';

const Header:React.FC = () => {
  const location = useLocation();
  const matchedRoutes = matchRoutes(routes, location);
  const activeRoute = matchedRoutes?.[matchedRoutes.length - 1]?.route;
  return (
    <header className='flex-none bg-white border border-l-0 sticky top-0 p-4'>
      <h1 className='font-bold text-lg'>{activeRoute?.id}</h1>
    </header>
  )
}

export default Header