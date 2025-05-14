'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '@/store/gameStore';

interface IslandProps {
  position: [number, number, number];
  scale: number;
  color: string;
}

function Island({ position, scale, color }: IslandProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={hovered ? '#4ade80' : color}
        roughness={0.7}
        metalness={0.2}
      />
    </mesh>
  );
}

function Scene() {
  const { currentLevel } = useGameStore();
  const islands = Array.from({ length: 5 }, (_, i) => ({
    position: [
      Math.cos(i * (Math.PI * 2) / 5) * 5,
      0,
      Math.sin(i * (Math.PI * 2) / 5) * 5,
    ] as [number, number, number],
    scale: 1,
    color: i < currentLevel ? '#22c55e' : '#94a3b8',
  }));

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {islands.map((island, index) => (
        <Island key={index} {...island} />
      ))}
      <OrbitControls enableZoom={false} />
    </>
  );
}

export default function KingdomExpansion() {
  const { currentLevel, questions, currentQuestionIndex } = useGameStore();
  const [showQuestion, setShowQuestion] = useState(false);

  const handleIslandClick = () => {
    if (currentQuestionIndex < questions.length) {
      setShowQuestion(true);
    }
  };

  return (
    <div className="relative w-full h-[600px]">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 75 }}
        onClick={handleIslandClick}
      >
        <Scene />
      </Canvas>

      {showQuestion && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">
              Question {currentQuestionIndex + 1}
            </h3>
            <p className="mb-4">{questions[currentQuestionIndex]?.text}</p>
            <div className="space-y-2">
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <button
                  key={index}
                  className="w-full p-2 text-left border rounded hover:bg-primary/10"
                  onClick={() => {
                    // Handle answer submission
                    setShowQuestion(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-4 left-4 bg-card/80 p-4 rounded-lg">
        <h2 className="text-lg font-bold">Level {currentLevel}</h2>
        <p className="text-sm text-muted-foreground">
          {currentLevel * 20}% of the kingdom discovered
        </p>
      </div>
    </div>
  );
} 