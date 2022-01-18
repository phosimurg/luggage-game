import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import React, {Suspense, useRef, useState} from 'react'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
import {OrbitControls, Sky} from "@react-three/drei";
import {Physics, useBox, usePlane} from "@react-three/cannon";
import {useDrag} from "react-use-gesture";



/*function Plane({ position, onPlaneClick }) {
    const { ref } = useCannon({ bodyProps: { mass: 0 } }, body => {
        body.addShape(new CANNON.Plane())
        body.position.set(...position)
    })
    return (
        <mesh ref={ref} receiveShadow position={position}
              onClick={onPlaneClick}>
            <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
            <meshPhongMaterial attach="material" color="#272727" />
        </mesh>
    )
}*/

function DraggableDodecahedron() {
    const colors = ["hotpink", "red", "blue", "green", "yellow"];
    const ref = useRef();
    const [colorIdx, setColorIdx] = useState(0);
    const [position, setPosition] = useState([0, 0, 0]);
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;

   /* useFrame(() => {
        ref.current.rotation.z += 0.01
        ref.current.rotation.x += 0.01
    });*/
    const bind = useDrag(({ offset: [x, y] }) => {
        const [,, z] = position;
        setPosition([x / aspect, -y / aspect, z]);
    }, { pointerEvents: true });

    return (
        <mesh position={position} {...bind()}
              ref={ref}
        >

            <dodecahedronBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color={colors[colorIdx]}  />

        </mesh>
    )
}

const SecondPage = () => {
    return <div>

        <Canvas style={{height: '100vh', width: '100%', backgroundColor:'gray'}}>
            <spotLight intensity={1.2} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
            <DraggableDodecahedron />
          {/*  <Plane/>*/}
        </Canvas>

    </div>;
};

export default SecondPage;
