import React from 'react';
import { motion } from 'framer-motion';
import warriorHero from '@/assets/warrior-hero.jpg';

const HeroPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8 }}
      className="h-screen w-full flex items-center justify-between px-8 lg:px-16"
    >
      {/* Left Side - Text Content */}
      <div className="flex-1 max-w-2xl space-y-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="text-accent font-medium text-lg tracking-wide mb-4">
            Welcome to
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
            <span className="bg-gradient-to-r from-accent via-primary-glow to-accent bg-clip-text text-transparent">
              Kamui's
            </span>
            <br />
            <span className="text-foreground">Realm</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-6"
        >
          <p className="text-xl text-muted-foreground leading-relaxed">
            I am <span className="text-accent font-semibold">Your Name</span>, a Full-Stack Developer with a warrior's code.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Forging digital experiences with the precision of ancient craftsmanship 
            and the innovation of modern technology. Every line of code is written 
            with honor and dedication.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          {['React', 'Node.js', 'TypeScript', 'Three.js', 'MongoDB'].map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="px-4 py-2 bg-card/80 backdrop-blur-sm border border-primary/30 rounded-lg text-accent font-medium hover:shadow-ethereal transition-all duration-300"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Right Side - Warrior Image */}
      <div className="flex-1 flex justify-center items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative"
        >
          <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px]">
            <img
              src={warriorHero}
              alt="Warrior Developer"
              className="w-full h-full object-cover rounded-2xl shadow-mystical"
            />
            
            {/* Mystical Aura Effect */}
            <div className="absolute inset-0 bg-gradient-ethereal rounded-2xl animate-glow-pulse" />
            
            {/* Floating Candle Lights */}
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-secondary rounded-full shadow-warm"
                style={{
                  top: `${20 + i * 20}%`,
                  right: `${-5 + (i % 2) * 10}%`,
                }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Hanging Lantern */}
          <motion.div
            className="absolute -top-8 right-4 w-8 h-12 bg-gradient-warm rounded-lg shadow-warm"
            animate={{
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-full h-2 bg-accent/80 rounded-t-lg" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <p className="text-muted-foreground text-sm mb-2">Scroll to explore</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-accent text-2xl"
        >
          ↓
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroPage;