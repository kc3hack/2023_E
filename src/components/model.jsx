import "/src/css/styles.css";
import { Canvas } from "@react-three/fiber";
import { useLoader } from '@react-three/fiber';
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = () => {
    const gltf = useLoader(GLTFLoader, '/models/man.glb');
    return (
        <>
            <primitive object={gltf.scene} scale={1.0}/>
        </>
    );
};

export default function ModelApp() {
    return (
        <div className="ModelApp">
            <Canvas>
                <Suspense fallback={null}>
                    <Model />
                    <OrbitControls />
                    <Environment preset="sunset" background/>
                </Suspense>
            </Canvas>
        </div>
    );
}