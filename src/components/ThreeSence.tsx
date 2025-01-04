"use client"

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

            // Thêm khối cube
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({ color: 0x0000FF });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            // Thêm OrbitControls để điều khiển camera
            const controls = new OrbitControls(camera, renderer.domElement);

            // Hàm render cảnh
            const renderScene = () => {
                renderer.render(scene, camera);
                requestAnimationFrame(renderScene);
            };

            // Bắt đầu vòng lặp render
            renderScene();

            // Xử lý resize cửa sổ
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            window.addEventListener('resize', handleResize);

            // Cleanup khi component bị unmount
            return () => {
                window.removeEventListener('resize', handleResize);
                renderer.dispose();
                controls.dispose();
            };
        }
    }, []);

    return <div ref={containerRef} />;
};

export default ThreeScene;
