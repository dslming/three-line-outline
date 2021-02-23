import {
  Clock,
  CylinderBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereBufferGeometry,
  PlaneBufferGeometry,
  BoxBufferGeometry,
  Vector2,
  WebGLRenderer,
} from 'three'
import * as THREE from 'three'
window.THREE = THREE
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OutlineMaterial } from '../OutlineMaterial'
import { OutlineMesh } from '../OutlineMesh'

document.body.style.margin = '0'

const clock = new Clock()
const scene = new Scene();
(window as any).scene = scene
const camera = new PerspectiveCamera(60, 1, 1, 1000)
const renderer = new WebGLRenderer()
const resolution = new Vector2()
document.body.appendChild(renderer.domElement)
renderer.setClearColor(0xffffff)

const controls = new OrbitControls(camera, renderer.domElement)

camera.position.z = 20

const onResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  resolution.set(window.innerWidth, window.innerHeight)
  camera.updateProjectionMatrix()
}

onResize()
window.addEventListener('resize', onResize)

const pg = new BoxBufferGeometry(1, 1, 1)
// const cg = new CylinderBufferGeometry(1, 2, 2, 32, 1, false)
const m = new MeshBasicMaterial({
  transparent: true,
  color:0xdddddd,
  opacity: 0.85,
  polygonOffset: true,
  polygonOffsetUnits: 2,
  polygonOffsetFactor: 1,
})
const pm = new Mesh(pg, m)
const mat = new OutlineMaterial(60, true, '#000')
const po = new OutlineMesh(pm, mat)
// po.add(pm)

scene.add(po)

function animate() {
  const dt = clock.getDelta()
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()
