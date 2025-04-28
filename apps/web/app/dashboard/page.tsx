'use client';

import { Group } from '@chakra-ui/react';

import UserCampaignsWidget from '../components/widgets/userCampaigns';
import { css } from '../styled-system/css';
import styles from './page.module.css';

const widgetBox = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  alignContent: 'start',
  borderRadius: '5px',
  borderColor: 'deep-ocean-600',
  backgroundColor: 'deep-ocean-700',
  padding: '16px',
  w: '360px',
});

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Group grow>
          <div className={widgetBox}>
            <UserCampaignsWidget />
          </div>
          <div className={widgetBox}>{/*<UserCampaignsWidget/>*/}</div>
          <div className={widgetBox}>{/*<UserCampaignsWidget/>*/}</div>
        </Group>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
