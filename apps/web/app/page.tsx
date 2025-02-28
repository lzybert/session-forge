'use client';

import { Bleed, Button, Heading,HStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const session = useSession();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Bleed>
          <Image
            src="/cthulu_logo.webp"
            alt="Session forge logo"
            layout="fill"
            style={{ zIndex: 1 }}
          />
          <Heading
            fontFamily="var(--font-jacquard-24)"
            fontSize={124}
            position="relative"
            style={{ zIndex: 100, lineHeight: '124px' }}>
            Session Forge
          </Heading>
          <HStack
            position="relative"
            zIndex={100}
            gap={100}
            justify="space-evenly">
            <Button
              variant="outline"
              textStyle="link"
              borderColor="cthulhu-green-100/50"
              bg="cthulhu-green-700/90"
              px="16"
              onClick={() => router.push('/register')}>
              Sign Up
            </Button>
            <Button
              variant="outline"
              textStyle="link"
              borderColor="cthulhu-green-100/50"
              bg="cthulhu-green-700/90"
              px="16">
              Log In
            </Button>
          </HStack>
        </Bleed>
      </main>
      <footer className={styles.footer}>{session.status}</footer>
    </div>
  );
}
