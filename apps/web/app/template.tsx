'use client';

import { motion } from 'framer-motion';

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ y: '-100vh', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '-100vh', opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}>
      {children}
    </motion.div>
  );
}
