import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/**
 * Máquina de escribir decorativa - modelo low poly generado por código.
 * No requiere archivos externos.
 */
export default function Typewriter({ position = [0, 0, 0], scale = 1 }) {
    const groupRef = useRef();
    const keysRef = useRef([]);

    // Animación sutil de teclas (opcional, decorativa)
    useFrame((state) => {
        if (!keysRef.current.length) return;
        const t = state.clock.getElapsedTime();
        keysRef.current.forEach((key, i) => {
            if (!key) return;
            const offset = i * 0.3;
            key.rotation.x = Math.sin(t * 2 + offset) * 0.05 + 0.1;
        });
    });

    const bodyColor = "#2a2a2a";
    const keyColor = "#f0f0f0";
    const metalColor = "#888888";
    const paperColor = "#f5f0e6";

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Cuerpo principal de la máquina */}
            <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.4, 0.12, 0.25]} />
                <meshStandardMaterial color={bodyColor} roughness={0.7} metalness={0.3} />
            </mesh>

            {/* Bandeja inferior (para papel) */}
            <mesh position={[0, 0.06, 0.05]} castShadow receiveShadow>
                <boxGeometry args={[0.36, 0.04, 0.22]} />
                <meshStandardMaterial color={bodyColor} roughness={0.8} metalness={0.2} />
            </mesh>

            {/* Papel (visible parcialmente) */}
            <mesh position={[0, 0.09, 0.05]} castShadow receiveShadow>
                <boxGeometry args={[0.28, 0.005, 0.18]} />
                <meshStandardMaterial color={paperColor} roughness={0.9} />
            </mesh>

            {/* Cilindro del rodillo (donde va el papel) */}
            <mesh position={[0, 0.1, 0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.3, 16]} />
                <meshStandardMaterial color={metalColor} roughness={0.4} metalness={0.7} />
            </mesh>

            {/* Barra de retorno del carro */}
            <mesh position={[0.18, 0.15, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.02, 0.12, 0.02]} />
                <meshStandardMaterial color={metalColor} roughness={0.5} metalness={0.6} />
            </mesh>

            {/* Barra izquierda del carro */}
            <mesh position={[-0.18, 0.15, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.02, 0.12, 0.02]} />
                <meshStandardMaterial color={metalColor} roughness={0.5} metalness={0.6} />
            </mesh>

            {/* Rodillo del carro (eje horizontal) */}
            <mesh position={[0, 0.15, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                <cylinderGeometry args={[0.015, 0.015, 0.4, 16]} />
                <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Barra de teclas */}
            <mesh position={[0, 0.22, -0.08]} castShadow receiveShadow>
                <boxGeometry args={[0.32, 0.02, 0.06]} />
                <meshStandardMaterial color={bodyColor} roughness={0.6} metalness={0.3} />
            </mesh>

            {/* Teclas (4 filas de 4 teclas cada una) */}
            {Array.from({ length: 16 }).map((_, i) => {
                const row = Math.floor(i / 4);
                const col = i % 4;
                return (
                    <mesh
                        key={i}
                        ref={(el) => (keysRef.current[i] = el)}
                        position={[
                            -0.12 + col * 0.08,
                            0.25 + row * 0.04,
                            -0.08,
                        ]}
                        castShadow
                    >
                        <cylinderGeometry args={[0.025, 0.025, 0.015, 12]} />
                        <meshStandardMaterial color={keyColor} roughness={0.5} />
                    </mesh>
                );
            })}

            {/* Banda de cinta (decorativa) */}
            <mesh position={[0, 0.2, 0.02]} castShadow receiveShadow>
                <boxGeometry args={[0.28, 0.02, 0.01]} />
                <meshStandardMaterial color="#111111" roughness={0.9} />
            </mesh>

            {/* Tolva superior (donde sale el papel) */}
            <mesh position={[0, 0.22, 0.08]} castShadow receiveShadow>
                <boxGeometry args={[0.3, 0.04, 0.08]} />
                <meshStandardMaterial color={bodyColor} roughness={0.7} metalness={0.3} />
            </mesh>

            {/* Perilla de alimentación (izquierda) */}
            <mesh position={[-0.22, 0.12, 0.08]} castShadow receiveShadow>
                <cylinderGeometry args={[0.025, 0.025, 0.04, 16]} />
                <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Perilla de alimentación (derecha) */}
            <mesh position={[0.22, 0.12, 0.08]} castShadow receiveShadow>
                <cylinderGeometry args={[0.025, 0.025, 0.04, 16]} />
                <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Soporte del papel (posterior) */}
            <mesh position={[0, 0.25, -0.12]} castShadow receiveShadow>
                <boxGeometry args={[0.34, 0.15, 0.02]} />
                <meshStandardMaterial color={bodyColor} roughness={0.7} metalness={0.2} />
            </mesh>

            {/* Palanca de retorno (lado derecho) */}
            <mesh position={[0.24, 0.2, -0.04]} castShadow receiveShadow>
                <boxGeometry args={[0.02, 0.08, 0.04]} />
                <meshStandardMaterial color={metalColor} roughness={0.4} metalness={0.7} />
            </mesh>
        </group>
    );
}
