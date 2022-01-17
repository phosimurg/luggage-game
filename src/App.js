import './App.css';
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Physics, useBox, usePlane} from "@react-three/cannon";

function Box(props) {
    const [ref] = useBox(() => ({mass: 1, position: props.phPos}))
    return <mesh castShadow receiveShadow position={props.phPos} ref={ref} >
        <boxBufferGeometry attach={'geometry'}/>
        <meshLambertMaterial attach={'material'} color={'orange'}/>
    </mesh>
}

function Plane() {
    const [ref] = usePlane(() => ({rotation: [-Math.PI / 2, 0, 0]}))
    return <mesh receiveShadow ref={ref} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach={'geometry'} args={[30, 30]}/>
        <meshLambertMaterial attach={'material'} color={'lightblue'}/>
    </mesh>
}


export default function App() {
    return <Canvas shadowMap colorManagement style={{height: '100vh', width: '100%', backgroundColor: 'gray'}}>
        <OrbitControls/>
        <directionalLight
            castShadow
            shadow-mapSize-height={512}
            shadow-mapSize-width={512}
            intensity={1}
            position={[70, 50, 50]}
        />
        {/*
        <spotLight castShadow position={[20, 15, 10]} angle={0.1}/>*/}
        <Physics>
            <Box phPos={[0, 2, 0]}/>
            <Box phPos={[2, 2, 0]}/>
            <Plane/>
        </Physics>
    </Canvas>
}
