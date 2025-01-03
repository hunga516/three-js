"use client"

import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            containerRef.current?.appendChild(renderer.domElement);
            camera.position.z = 5;


            // Add this inside the useEffect hook after initializing the renderer
            if (typeof window !== 'undefined') {
                const geometry = new THREE.BoxGeometry();
                const material = new THREE.MeshBasicMaterial({color: 0x0000FF});
                const cube = new THREE.Mesh(geometry, material);
                scene.add(cube);

                // Add this function inside the useEffect hook
                const renderScene = () => {
                    cube.rotation.x += 0.01;
                    cube.rotation.y += 0.01;
                    renderer.render(scene, camera);
                    requestAnimationFrame(renderScene);
                };

                // Call the renderScene function to start the animation loop
                renderScene();

                // Render the scene and camera
                renderer.render(scene, camera);
            }


        }

    }, []);
    return <div ref={containerRef}/>;
};
export default ThreeScene;