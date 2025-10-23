import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const atomColors = {
  H: 0x60a5fa,  // Blue
  O: 0xef4444,  // Red
  C: 0x6ee7b7,  // Green
  Na: 0xfbbf24, // Yellow
  Cl: 0xa78bfa, // Purple
  N: 0xf472b6,  // Pink
  P: 0xf97316,  // Orange
  S: 0xfacc15,  // Yellow
};

const atomRadii = {
  H: 0.4,
  O: 0.8,
  C: 0.7,
  Na: 0.95,
  Cl: 0.9,
  N: 0.7,
  P: 0.8,
  S: 0.8,
};

const Molecule3DViewer = ({ molecule, formula }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const frameId = useRef(null);

  useEffect(() => {
    // Set up scene
    const width = mountRef.current.clientWidth;
    const height = 300;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    
    // Create molecule
    createMolecule(scene, formula);
    
    // Animation loop
    const animate = () => {
      frameId.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    sceneRef.current = scene;
    
    // Cleanup
    return () => {
      cancelAnimationFrame(frameId.current);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Dispose of resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
    };
  }, [formula]);

  const createMolecule = (scene, formula) => {
    // Clear any existing molecule
    while (scene.children.length > 2) { // Keep only the lights
      const obj = scene.children[scene.children.length - 1];
      scene.remove(obj);
    }

    // Map molecules to their 3D structures
    let positions = [];
    
    if (molecule === 'H₂O') {
      positions = [
        { atom: 'O', position: new THREE.Vector3(0, 0, 0) },
        { atom: 'H', position: new THREE.Vector3(-0.8, 0.6, 0) },
        { atom: 'H', position: new THREE.Vector3(0.8, 0.6, 0) }
      ];
    } else if (molecule === 'CO₂') {
      positions = [
        { atom: 'C', position: new THREE.Vector3(0, 0, 0) },
        { atom: 'O', position: new THREE.Vector3(-1.2, 0, 0) },
        { atom: 'O', position: new THREE.Vector3(1.2, 0, 0) }
      ];
    } else if (molecule === 'NaCl') {
      positions = [
        { atom: 'Na', position: new THREE.Vector3(-0.8, 0, 0) },
        { atom: 'Cl', position: new THREE.Vector3(0.8, 0, 0) }
      ];
    } else if (molecule === 'CH₄') {
      positions = [
        { atom: 'C', position: new THREE.Vector3(0, 0, 0) },
        { atom: 'H', position: new THREE.Vector3(0.6, 0.6, 0.6) },
        { atom: 'H', position: new THREE.Vector3(-0.6, 0.6, -0.6) },
        { atom: 'H', position: new THREE.Vector3(0.6, -0.6, -0.6) },
        { atom: 'H', position: new THREE.Vector3(-0.6, -0.6, 0.6) }
      ];
    } else if (molecule === 'NH₃') {
      positions = [
        { atom: 'N', position: new THREE.Vector3(0, 0, 0) },
        { atom: 'H', position: new THREE.Vector3(0.6, 0.6, 0) },
        { atom: 'H', position: new THREE.Vector3(-0.6, 0.6, 0) },
        { atom: 'H', position: new THREE.Vector3(0, -0.6, 0.6) }
      ];
    } else {
      // Generic structure if no predefined layout
      const atoms = [...formula];
      atoms.forEach((atom, index) => {
        const angle = (2 * Math.PI * index) / atoms.length;
        const x = Math.cos(angle) * 1.2;
        const y = Math.sin(angle) * 1.2;
        positions.push({ atom, position: new THREE.Vector3(x, y, 0) });
      });
    }

    // Create atoms
    positions.forEach(({ atom, position }) => {
      const geometry = new THREE.SphereGeometry(atomRadii[atom] || 0.5, 32, 32);
      const material = new THREE.MeshPhongMaterial({ 
        color: atomColors[atom] || 0xcccccc,
        specular: 0x555555,
        shininess: 30
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(position);
      scene.add(sphere);
      
      // Add atom label
      const textSprite = makeTextSprite(atom);
      textSprite.position.copy(position);
      textSprite.position.y += atomRadii[atom] + 0.3;
      scene.add(textSprite);
    });

    // Add bonds between atoms
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const atom1 = positions[i];
        const atom2 = positions[j];
        
        // Only create bonds between certain atoms that would bond
        let shouldBond = false;
        
        // Simple rules for common bonds
        if (molecule === 'H₂O' && 
           ((atom1.atom === 'O' && atom2.atom === 'H') || 
            (atom1.atom === 'H' && atom2.atom === 'O'))) {
          shouldBond = true;
        } else if (molecule === 'CO₂' && 
                 ((atom1.atom === 'C' && atom2.atom === 'O') || 
                  (atom1.atom === 'O' && atom2.atom === 'C'))) {
          shouldBond = true;
        } else if (molecule === 'NaCl' && 
                 ((atom1.atom === 'Na' && atom2.atom === 'Cl') || 
                  (atom1.atom === 'Cl' && atom2.atom === 'Na'))) {
          shouldBond = true;
        } else if (molecule === 'CH₄' && 
                 ((atom1.atom === 'C' && atom2.atom === 'H') || 
                  (atom1.atom === 'H' && atom2.atom === 'C'))) {
          shouldBond = true;
        } else if (molecule === 'NH₃' && 
                 ((atom1.atom === 'N' && atom2.atom === 'H') || 
                  (atom1.atom === 'H' && atom2.atom === 'N'))) {
          shouldBond = true;
        }
        
        if (shouldBond) {
          const start = atom1.position;
          const end = atom2.position;
          
          // Calculate the distance between atoms
          const distance = start.distanceTo(end);
          
          // Calculate the middle point for the cylinder
          const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
          
          // Create cylinder geometry
          const direction = new THREE.Vector3().subVectors(end, start);
          const cylinderHeight = direction.length();
          const cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.1, cylinderHeight, 12);
          
          // Orient the cylinder to point in the direction
          cylinderGeometry.translate(0, cylinderHeight / 2, 0);
          const quaternion = new THREE.Quaternion();
          quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
          
          const bondMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x888888,
            transparent: true,
            opacity: 0.8
          });
          
          const cylinder = new THREE.Mesh(cylinderGeometry, bondMaterial);
          cylinder.position.copy(start);
          cylinder.quaternion.copy(quaternion);
          scene.add(cylinder);
        }
      }
    }
  };

  const makeTextSprite = (text) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 128;
    canvas.height = 64;
    
    context.font = '40px Arial';
    context.fillStyle = '#000000';
    context.textAlign = 'center';
    context.fillText(text, 64, 44);
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    
    const spriteMaterial = new THREE.SpriteMaterial({ 
      map: texture,
      transparent: true
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.6, 0.3, 1);
    
    return sprite;
  };

  return (
    <div className="molecule-viewer">
      <h3>{molecule} in 3D</h3>
      <div 
        ref={mountRef} 
        style={{ width: '100%', height: '300px', marginBottom: '1rem' }}
        className="model-container"
      ></div>
      <p className="viewer-instructions">
        👆 Drag to rotate | 🔍 Scroll to zoom
      </p>
    </div>
  );
};

export default Molecule3DViewer;