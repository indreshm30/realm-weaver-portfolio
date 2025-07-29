import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import mysticalCards from '@/assets/mystical-cards.jpg';

interface Card {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
}

const cards: Card[] = [
  {
    id: 1,
    title: "Frontend Mastery",
    description: "React, TypeScript, and modern UI frameworks",
    tech: ["React", "TypeScript", "Tailwind CSS", "Three.js"],
    image: mysticalCards,
  },
  {
    id: 2,
    title: "Backend Sorcery",
    description: "Node.js, APIs, and server-side magic",
    tech: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    image: mysticalCards,
  },
  {
    id: 3,
    title: "DevOps Wisdom",
    description: "Cloud deployment and infrastructure",
    tech: ["Docker", "AWS", "Kubernetes", "CI/CD"],
    image: mysticalCards,
  },
];

const CardsPage: React.FC = () => {
  const [animationDisabled, setAnimationDisabled] = useState(false);
  const [cardsRevealed, setCardsRevealed] = useState<boolean[]>(new Array(cards.length).fill(false));
  const controls = useAnimation();

  useEffect(() => {
    if (!animationDisabled) {
      const revealCards = async () => {
        for (let i = 0; i < cards.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 800));
          setCardsRevealed(prev => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }
      };
      revealCards();
    } else {
      setCardsRevealed(new Array(cards.length).fill(true));
    }
  }, [animationDisabled]);

  const toggleAnimation = () => {
    setAnimationDisabled(!animationDisabled);
    if (!animationDisabled) {
      setCardsRevealed(new Array(cards.length).fill(true));
    } else {
      setCardsRevealed(new Array(cards.length).fill(false));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8 }}
      className="h-screen w-full flex flex-col items-center justify-center p-8"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-4">
          <span className="bg-gradient-to-r from-accent via-primary-glow to-accent bg-clip-text text-transparent">
            Mystical
          </span>{" "}
          <span className="text-foreground">Arts</span>
        </h2>
        <p className="text-xl text-muted-foreground">
          Discover the magical skills and projects
        </p>
      </motion.div>

      {/* Cards Container */}
      <div className="flex flex-wrap justify-center gap-8 mb-8 max-w-6xl">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ 
              rotateY: animationDisabled ? 0 : 180,
              scale: animationDisabled ? 1 : 0.8,
              opacity: animationDisabled ? 1 : 0
            }}
            animate={{
              rotateY: cardsRevealed[index] || animationDisabled ? 0 : 180,
              scale: cardsRevealed[index] || animationDisabled ? 1 : 0.8,
              opacity: cardsRevealed[index] || animationDisabled ? 1 : 0,
            }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.05,
              rotateX: 5,
              rotateY: 5,
            }}
            className="relative group cursor-pointer perspective-1000"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="w-80 h-96 relative">
              {/* Card Background */}
              <div 
                className="absolute inset-0 rounded-2xl border-2 border-primary/30 overflow-hidden shadow-mystical group-hover:shadow-ethereal transition-all duration-500"
                style={{
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              </div>

              {/* Card Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: cardsRevealed[index] || animationDisabled ? 0 : 20,
                    opacity: cardsRevealed[index] || animationDisabled ? 1 : 0
                  }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {card.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {card.tech.map((tech, techIndex) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full text-sm text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Mystical Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-ethereal opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Animation Toggle */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-center"
      >
        <Button
          variant="ethereal"
          onClick={toggleAnimation}
          className="mb-4"
        >
          {animationDisabled ? 'Enable Animation' : 'Show All Cards'}
        </Button>
        <p className="text-sm text-muted-foreground">
          {animationDisabled ? 'Cards will reveal with scroll animation' : 'All cards are now visible'}
        </p>
      </motion.div>

      {/* Floating Magical Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default CardsPage;