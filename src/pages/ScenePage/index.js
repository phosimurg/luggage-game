import React, {useState} from 'react';
import * as THREE from 'three'
import {Canvas, useThree} from "@react-three/fiber";
import {useBox, Physics, usePlane} from "@react-three/cannon";
import {OrbitControls, OrthographicCamera} from "@react-three/drei";

/*var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

camera.position.z = 1000;

/!*function Box(props) {
    const [mouseHov, setMouseHov] = useState(false);
    const [position, setPosition] = useState(props.phPos);
    const {size, viewport} = useThree();
    const aspect = size.width / viewport.width;

    /!*   const bind = useDrag(({offset: [x, y]}) => {
           const [, , z] = position;
           setPosition([x / aspect, -y / aspect, z]);
       }, {pointerEvents: true});
   *!/


    const [ref,] = useBox(() => ({mass: 1, position: /!*props.phPos*!/ position, args: props.size}))
    return <mesh /!*{...bind()}*!/
        onPointerOver={() => setMouseHov(true)}
        onPointerOut={() => setMouseHov(false)}
        castShadow
        position={/!*props.phPos*!/ position}
        ref={ref}
    >
        <boxBufferGeometry attach={'geometry'} args={props.size}/>
        <meshLambertMaterial attach={'material'}
                             color={!mouseHov ? props.color : "#ff0000"}
                             transparent
                             opacity={mouseHov ? 0.1 : 1}/>
    </mesh>
}*!/

function init() {
    let ambientLight = new THREE.AmbientLight(0x0f0f0f);
    scene.add(ambientLight);

    let light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 500, 2000);

    scene.add(light);


    let controls = new THREE.DragControls
}

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}*/


function WallBox(props) {

    const [myRef] = useBox(() => ({mass: 1, rotation: props.rotation, position: props.phPos, args: props.size}))
    return <mesh
        castShadow
        position={props.phPos}
        ref={myRef}
    >
        <boxBufferGeometry attach={'geometry'} args={props.size}/>
        <meshLambertMaterial attach={'material'}
                             color={'orange'}
                             transparent/>
    </mesh>
}

function Plane() {
    const [ref] = usePlane(() => ({rotation: [-Math.PI / 2, 0, 0]}))
    return <mesh castShadow ref={ref} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach={'geometry'} args={[200, 200]}/>
        <meshLambertMaterial attach={'material'} color={'gray'}/>
    </mesh>
}


/*Sahne Alanı*/
function ScenePage() {
    return <Canvas style={{width: '100%', height: '100vh'}} position={[0, 100, 0]} rotation={[0, 0, 0]}>
        <directionalLight position={[100, 100, 100]}/>
        <OrbitControls/>
        <Physics>
            <WallBox phPos={[0, 10, 0]} color={'orange'} size={[10, 10, 10]}/>;
            <Plane/>
        </Physics>
    </Canvas>
}

export default ScenePage;
