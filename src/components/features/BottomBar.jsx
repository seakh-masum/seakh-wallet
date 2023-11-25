import React, { useEffect, useState } from 'react'
import DocIcon from '../icon/DocIcon';
import CreditCardIcon from '../icon/CreditCardIcon';
import SyncIcon from '../icon/TransactionIcon';
import DashboardIcon from '../icon/DashboardIcon';
import { useLocation, useNavigate } from 'react-router-dom';
import TransactionIcon from '../icon/TransactionIcon';
import AccountIcon from '../icon/AccountIcon';

const BottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState('/card');
  const menuItems = [
    { label: 'Cards', path: '/card' },
    { label: 'Docs', path: '/docs' },
    { label: 'Account', path: '/account' },
    { label: 'Transaction', path: '/transaction' },
  ];

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [])


  const onClickMenu = (item) => {
    setActiveMenu(item);
    navigate(item);
  }

  const MenuIcon = (props) => {
    switch (props.path) {
      case '/account':
        return <AccountIcon {...props} />;

      case '/card':
        return <CreditCardIcon {...props} />;

      case '/docs':
        return <DocIcon {...props} />;

      case '/transaction':
        return <TransactionIcon {...props} />;

      default:
        return '';
    }
  };

  return (
    <div className='fixed z-50 bottom-0 left-0 right-0'>
      <div className='flex flex-row justify-between items-center dark:bg-black/80 bg-white/60 p-3 pb-6 w-full supports-backdrop-blur:bg-white/60 backdrop-blur'>
        {menuItems.map((item, idx) => (
          <div key={idx} onClick={() => onClickMenu(item.path)}
            className={`flex justify-center mb-1 basis-1/4 ${activeMenu == item.path ?
              'flex flex-row gap-1 items-center rounded-3xl px-3 py-2 shadow-sm bg-white dark:bg-neutral-950' : 'mb-1 basis-1/4'
              }`}>
            <MenuIcon path={item.path}
              className={'dark:fill-neutral-200 fill-black'}
              height={activeMenu == item.path ? 20 : 22}
              width={activeMenu == item.path ? 20 : 22}
            />
            {activeMenu == item.path && <p className="text-black dark:text-neutral-200 text-sm">{item.label}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BottomBar;