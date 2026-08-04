import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeader({ channel, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="readout text-trace">{channel}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="text-muted mt-2 max-w-2xl">{subtitle}</p>}
    </motion.div>
  );
}
