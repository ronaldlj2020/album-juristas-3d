import { useRef } from "react";
import { useControls, Leva } from "leva";
import MyDesk from "./objects/MyDesk";
import Camera from "./Camera";
import CoffeeSmoke from "./objects/CoffeeSmoke";
import { SceneReadyGate } from "./utils/sceneLoader";

export default function Experience() {
    const pointLight = useRef();

    const { debug } = useControls("Depurar", {
        debug: false,
    });

    const { position: lightPosition } = useControls("Luz puntual", {
        position: {
            value: { x: -0.22, y: 2, z: -0.8 },
            step: 0.01,
        },
    });

    return (
        <>
            <Camera />
            <Leva hidden={!debug} />

            <pointLight
                ref={pointLight}
                position={[lightPosition.x, lightPosition.y, lightPosition.z]}
                intensity={20}
            />
            <ambientLight intensity={3} />

            <MyDesk scale={4} position-y={-4} />
            <CoffeeSmoke />
            <SceneReadyGate />
        </>
    );
}
