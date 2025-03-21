import { CloseButton, Drawer } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cva } from '../../../styled-system/css';

const listElements = cva({
  base: {
    fontSize: 'lg',
  },
  variants: {
    active: {
      true: {
        fontWeight: 'bold',
        color: 'emerald.500'
      }
    }
  }
})

const SideMenu = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/campaigns', label: 'Campaigns' },
    { href: '/sessions', label: 'Sessions' },
    { href: '/groups', label: 'Groups' },
  ];
  return (
    <Drawer.Content>
      <Drawer.CloseTrigger asChild>
        <CloseButton size="sm" />
      </Drawer.CloseTrigger>
      <Drawer.Header>
        <Drawer.Title>Menu</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <ul>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={listElements({'active': pathname === href})}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </Drawer.Body>
      <Drawer.Footer></Drawer.Footer>
    </Drawer.Content>
  );
}

export default SideMenu;