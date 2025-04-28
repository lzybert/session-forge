'use client'

import { Bleed, Drawer, Flex, Icon, Portal, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { RiMenuLine } from 'react-icons/ri';

import { css } from '../../styled-system/css';
import SideMenu from './sideMenu';


const Bar = css({
  height: '50px',
  background: 'abyss-black-700',
  padding: '10px'
})
const MenuItem = css({
  padding: '2.5',
})
const Topbar = (() => {
  const { status }  = useSession();
  if (status !== 'authenticated') return null;
  return (
    <Bleed>
      <Flex direction="row" justify="space-between" className={Bar}>
        <div className={MenuItem}>
          <Drawer.Root placement="start">
            <Drawer.Trigger asChild>
              <Icon size="lg">
                <RiMenuLine />
              </Icon>
            </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <SideMenu />
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
        </div>
        <div className={MenuItem}><Text textStyle="bodyLight" fontFamily="var(--font-bitter)">Session Forge</Text></div>
        <div className={MenuItem}>Utility</div>
      </Flex>
    </Bleed>
  )
})

export { Topbar };