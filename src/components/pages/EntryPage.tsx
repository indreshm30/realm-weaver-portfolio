import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import templeScene from '@/assets/temple-scene.jpg';

interface EntryPageProps {
  onEnter: () => void;
}

const EntryPage: React.FC<EntryPageProps> = ({ onEnter }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="h-screen w-full relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${templeScene})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40" />
      
      {/* Floating Petals Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-accent/60 to-pink-400/60 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -10,
              rotate: 0,
            }}
            animate={{
              y: window.innerHeight + 10,
              rotate: 360,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-accent via-primary-glow to-accent bg-clip-text text-transparent">
              KAMUI
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Enter the Digital Realm
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Button
            variant="portal"
            size="xl"
            onClick={onEnter}
            className="relative group"
          >
            <span className="relative z-10 flex items-center gap-3">
              Enter Portfolio
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xl"
              >
                ⟫
              </motion.span>
            </span>
            
            {/* Magical particles effect */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-accent rounded-full"
                  initial={{
                    x: Math.random() * 100 + '%',
                    y: Math.random() * 100 + '%',
                    opacity: 0,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </Button>
        </motion.div>

        {/* Navigation Hints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex justify-center space-x-8 text-sm text-muted-foreground"
        >
          <span className="border border-border/40 px-3 py-1 rounded-full backdrop-blur-sm">
            Game
          </span>
          <span className="border border-border/40 px-3 py-1 rounded-full backdrop-blur-sm">
            Cards
          </span>
          <span className="border border-border/40 px-3 py-1 rounded-full backdrop-blur-sm">
            Community
          </span>
          <span className="border border-border/40 px-3 py-1 rounded-full backdrop-blur-sm">
            Esports
          </span>
        </motion.div>
      </div>

      {/* Mystical Lantern Effect */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-16 h-16 bg-gradient-warm rounded-full blur-xl"
        />
      </div>
    </motion.div>
  );
};

export default EntryPage;