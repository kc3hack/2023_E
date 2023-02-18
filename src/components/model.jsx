import "/src/css/styles.css";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, TransformControls } from "@react-three/drei";
import React, { Suspense, useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Controls, useControl } from "react-three-gui";

function ModelA() {
    const [select, setSelect] = useState(1);
    const [Path, setPath] = useState('/models/people.glb');
    const Selector = () => {
      if (select === 1) {
        useEffect(() => {  
          setPath('/models/people.glb')
        }, [])
      }  
      if (select === 2) {
        useEffect(() => {
          setPath('/models/cube.gltf')
        }, [])
      }
      if (select === 3) {
        useEffect(() => {
          setPath('/models/chair_classroom.glb')
        }, [])
      }
      if (select === 4) {
        useEffect(() => {
          setPath('/models/desk_classroom.glb')
        }, [])
      }
    }
    <Picker setSelect={setSelect} Selector={Selector} />

    const gltf = useLoader(GLTFLoader, Path)
    const orbit = useRef()
    const transform = useRef()
    const mode = useControl('mode', { type: 'select', items: ['scale', 'rotate', 'translate'] });
    
    useEffect(() => {
      if (transform.current) {
        const controls = transform.current
        controls.setMode(mode)
        const callback = event => (orbit.current.enabled = !event.value)
        controls.addEventListener("dragging-changed", callback)
        return () => controls.removeEventListener("dragging-changed", callback)
      }
    })
    return (
        <>
        <TransformControls ref={transform}>
          <mesh castShadow position={[-5, 0, -8.5]} dispose={null}>
            <primitive object={gltf.scene} scale={10} />
          </mesh>
        </TransformControls>
        <OrbitControls ref={orbit} />
        </>
    );
};



const ModelB = () =>{
    const gltf = useLoader(GLTFLoader, '/models/classroom_all.glb');
    return (
        <>
        <mesh castShadow position={[-5, 0, -8.5]}>
            <primitive  object={gltf.scene} scale={10} />
        </mesh>
            
        </>
    )
}

function Picker(props) {
  let list = []
  for (let i = 1; i <= 4; i++){
    list.push(
      <li
        onClick={(e) => {
          props.setSelect(i)
          props.Selector()
        }}
      >
        <figure>
          <img src={'/images/sample.png'} alt=""/>
        </figure>
      </li>
    )
  }
  return list
}




export default function ModelApp() {
    return (
        <div className="ModelApp">
          <Controls.Provider>
            <Canvas>
                <Suspense fallback={null}>
                    <ModelA />
                    <ModelB />
                    <Environment preset="sunset" background/>
                </Suspense>
            </Canvas>
            <Controls />
          </Controls.Provider>
          <div className="Picker">{Picker()}</div>
            
        </div>
    );
}



