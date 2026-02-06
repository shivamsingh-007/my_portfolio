export { };

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
  import { BufferGeometry, Material } from 'three';
  
  export class MeshLineGeometry extends BufferGeometry {
    setPoints(points: any[]): void;
  }
  
  export class MeshLineMaterial extends Material {
    color: any;
    depthTest: boolean;
    resolution: [number, number];
    useMap: boolean;
    map: any;
    repeat: [number, number];
    lineWidth: number;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

// Extend @react-three/fiber
declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: any;
    meshLineMaterial: any;
  }
}
