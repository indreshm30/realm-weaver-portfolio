import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import EntryPage from './pages/EntryPage';
import HeroPage from './pages/HeroPage';
import CardsPage from './pages/CardsPage';
import ContactPage from './pages/ContactPage';

interface CameraControllerProps {
  targetPosition: [number, number, number];
  targetLookAt: [number, number, number];
}

const CameraController: React.FC<CameraControllerProps> = ({ targetPosition, targetLookAt }) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>();

  useFrame((_, delta) => {
    if (controlsRef.current) {
      // Smooth camera movement
      camera.position.lerp(new THREE.Vector3(...targetPosition), delta * 2);
      controlsRef.current.target.lerp(new THREE.Vector3(...targetLookAt), delta * 2);
      controlsRef.current.update();
    }
  });

  return <OrbitControls ref={controlsRef} enablePan={false} enableZoom={false} enableRotate={false} />;
};

const FloatingParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          ]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#ffd700" opacity={0.6} transparent />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const PortfolioScene: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Define camera positions for each page
  const cameraPositions: Record<number, { position: [number, number, number], lookAt: [number, number, number] }> = {
    0: { position: [0, 0, 5], lookAt: [0, 0, 0] },    // Entry page
    1: { position: [5, 2, 8], lookAt: [0, 0, 0] },    // Hero page
    2: { position: [0, 8, 12], lookAt: [0, 0, 0] },   // Cards page
    3: { position: [-5, 5, 10], lookAt: [0, 0, 0] },  // Contact page
  };

  const transitionToPage = (pageIndex: number) => {
    if (isTransitioning || pageIndex === currentPage) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(pageIndex);
      setTimeout(() => setIsTransitioning(false), 500);
    }, 300);
  };

  const handleScroll = (event: WheelEvent) => {
    if (isTransitioning) return;

    if (event.deltaY > 0 && currentPage < 3) {
      transitionToPage(currentPage + 1);
    } else if (event.deltaY < 0 && currentPage > 0) {
      transitionToPage(currentPage - 1);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [currentPage, isTransitioning]);

  return (
    <div className="h-screen w-full relative overflow-hidden bg-background">
      {/* Three.js Scene */}
      <Canvas camera={{ position: cameraPositions[0].position, fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b35" />
        
        <CameraController 
          targetPosition={cameraPositions[currentPage].position}
          targetLookAt={cameraPositions[currentPage].lookAt}
        />
        
        <FloatingParticles />
        <Environment preset="night" />
      </Canvas>

      {/* Page Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="pointer-events-auto">
          <AnimatePresence mode="wait">
            {currentPage === 0 && (
              <EntryPage key="entry" onEnter={() => transitionToPage(1)} />
            )}
            {currentPage === 1 && (
              <HeroPage key="hero" />
            )}
            {currentPage === 2 && (
              <CardsPage key="cards" />
            )}
            {currentPage === 3 && (
              <ContactPage key="contact" />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Indicator */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-50 pointer-events-auto">
        <div className="flex flex-col space-y-4">
          {[0, 1, 2, 3].map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => transitionToPage(pageIndex)}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                currentPage === pageIndex
                  ? 'bg-accent border-accent shadow-ethereal'
                  : 'bg-transparent border-accent/40 hover:border-accent/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioScene;