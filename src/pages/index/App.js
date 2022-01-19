import './App.css';
import {Canvas, useLoader, useThree} from "@react-three/fiber";
import React, {Suspense, useRef, useState} from 'react'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
import {OrbitControls, Sky} from "@react-three/drei";
import {Physics, useBox, usePlane} from "@react-three/cannon";
import luggage from '../../assets/Luggage.obj';
import luggageSecond from '../../assets/Suitcase.c4d.fbx';
import {useDrag} from "react-use-gesture";
import * as THREE from 'three'


function Luggage() {
    const obj = useLoader(OBJLoader, luggage)
    return (
        <Suspense fallback={null}>
            <primitive object={obj} position={[0, 2, 0]}/>
        </Suspense>
    )
}

function LuggageSecond() {
    const fbx = useLoader(FBXLoader, luggageSecond)
    return <primitive object={fbx} position={[-40, 10, 0]} scale={[0.1, 0.1, 0.15]}/>
}


function Box(props) {
    const [mouseHov, setMouseHov] = useState(false);
    const [position, setPosition] = useState(props.phPos);
    const {size, viewport} = useThree();
    const aspect = size.width / viewport.width;

    /*   const bind = useDrag(({offset: [x, y]}) => {
           const [, , z] = position;
           setPosition([x / aspect, -y / aspect, z]);
       }, {pointerEvents: true});
   */


    const [ref,] = useBox(() => ({mass: 1, position: /*props.phPos*/ position, args: props.size}))
    return <mesh /*{...bind()}*/
        onPointerOver={() => setMouseHov(true)}
        onPointerOut={() => setMouseHov(false)}
        castShadow
        position={/*props.phPos*/ position}
        ref={ref}
    >
        <boxBufferGeometry attach={'geometry'} args={props.size}/>
        <meshLambertMaterial attach={'material'}
                             color={!mouseHov ? props.color : "#ff0000"}
                             transparent
                             opacity={mouseHov ? 0.1 : 1}/>
    </mesh>
}

function WallBox(props) {

    const [myRef] = useBox(() => ({mass: 0, rotation: props.rotation, position: props.phPos, args: props.size}))
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

function TransparentBox() {
    return <mesh position={[10, 2, 10]} scale={[10, 10, 10]}>
        <boxGeometry/>
        <meshPhongMaterial color="#ff0000" opacity={0.1} transparent/>
    </mesh>
}

function Plane() {
    const [ref] = usePlane(() => ({rotation: [-Math.PI / 2, 0, 0]}))
    return <mesh castShadow ref={ref} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach={'geometry'} args={[200, 200]}/>
        <meshLambertMaterial attach={'material'} color={'gray'}/>
    </mesh>
}

function BoxLug() {
    <WallBox phPos={[20, 7, 70]} color={'orange'} size={[2, 10, 30]}/>;
    <WallBox phPos={[-10, 7, 70]} color={'orange'} size={[2, 10, 30]}/>;
    <WallBox phPos={[5, 7, 56]} color={'orange'} size={[2, 10, 30]} rotation={[0, 1.571, 0]}/>;
    <WallBox phPos={[5, 7, 84]} color={'orange'} size={[2, 10, 30]} rotation={[0, 1.571, 0]}/>;
}


function DraggableDodecahedron() {
    const colors = ["hotpink", "red", "blue", "green", "yellow"];
    const ref = useRef();
    const [colorIdx, setColorIdx] = useState(0);
    const [position, setPosition] = useState([10, 10, 10]);
    const {size, viewport} = useThree();
    const aspect = size.width / viewport.width;

    /* useFrame(() => {
         ref.current.rotation.z += 0.01
         ref.current.rotation.x += 0.01
     });*/
    const bind = useDrag(({offset: [x, y]}) => {
        const [, , z] = position;
        setPosition([x / aspect, -y / aspect, z]);
    }, {pointerEvents: true});

    return (
        <mesh position={position} {...bind()}
              ref={ref}
        >

            <dodecahedronBufferGeometry attach="geometry"/>
            <meshLambertMaterial attach="material" color={colors[colorIdx]} args={[30, 30, 30]}/>

        </mesh>
    )
}

export default function App() {
    const [txt1, setTxt1] = useState();
    const [txt2, setTxt2] = useState();
    const [txt3, setTxt3] = useState();
    const [boxes, _setBoxes] = useState([]);
    const [orbit, setOrbit] = useState(true);

    const setBoxes = (value) => {
        const data = [boxes, ...value];
        _setBoxes(data);
    }

    return <div>
        <input type="text" placeholder={'genişlik'} value={txt1} onChange={(e) => setTxt1(e.target.value)}/>
        <input type="text" placeholder={'yükseklik'} value={txt2} onChange={(e) => setTxt2(e.target.value)}/>
        <input type="text" placeholder={'derinlik'} value={txt3} onChange={(e) => setTxt3(e.target.value)}/>
        <button onClick={() => {
            setBoxes(boxes);
        }}>Ekle
        </button>
        <label htmlFor={'orbitCheck'}>{orbit ? 'Orbit Şuan Açık' : 'Orbit Şuan Kapalı'}</label>
        <input type="checkbox" onChange={() => setOrbit(!orbit)} id={'orbitCheck'}/>
        <Canvas shadowMap style={{height: '100vh', width: '100%'}}>
            {orbit && <OrbitControls/>}
            <ambientLight castShadow intensity={0.25}/>
            <pointLight intensity={0.7} position={[100, 100, 100]} castShadow/>
            {/*<spotLight castShadow position={[20, 15, 10]} angle={0.1}/>*/}
            <Physics>
                <Sky sunPosition={[100, 10, 100]}/>
                {/*<Box phPos={[30, 7, 0]} color={'orange'} size={[10, 10, 20]}/>
                <Box phPos={[30, 15, 0]} color={'blue'} size={[3, 3, 3]}/>
                <Luggage/>
                <LuggageSecond/>
                <TransparentBox/>*/}


                <WallBox phPos={[20, 7, 70]} color={'orange'} size={[2, 10, 30]}/>;
                <WallBox phPos={[-10, 7, 70]} color={'orange'} size={[2, 10, 30]}/>;
                <WallBox phPos={[5, 7, 56]} color={'orange'} size={[2, 10, 30]} rotation={[0, 1.571, 0]}/>;
                <WallBox phPos={[5, 7, 84]} color={'orange'} size={[2, 10, 30]} rotation={[0, 1.571, 0]}/>;

                {boxes && boxes.map(item => <Box phPos={[-20, 10, 80]} color={'red'}
                                                 size={[parseFloat(txt1), parseFloat(txt2), parseFloat(txt3)]}/>)}

                <Plane/>
            </Physics>
        </Canvas>
    </div>
}
