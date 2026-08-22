import { useEffect, useRef, type CSSProperties } from 'react';
import { Mesh, Program, Renderer, Texture, Triangle } from 'ogl';
import './HalftoneReveal.css';

type Mode = 'mono' | 'duotone' | 'color';
type Shape = 'circle' | 'square' | 'diamond' | 'line';
type Trigger = 'hover' | 'always' | 'off';
interface HalftoneRevealProps {
  src: string;
  inkColor?: string;
  paperColor?: string;
  mode?: Mode;
  dotSize?: number;
  dotDensity?: number;
  angle?: number;
  shape?: Shape;
  contrast?: number;
  invert?: boolean;
  revealRadius?: number;
  edge?: number;
  follow?: number;
  idleReveal?: number;
  trigger?: Trigger;
  borderRadius?: string;
  className?: string;
  style?: CSSProperties;
}

const modes: Record<Mode, number> = { mono: 0, duotone: 1, color: 2 };
const shapes: Record<Shape, number> = { circle: 0, square: 1, diamond: 2, line: 3 };
const triggers: Record<Trigger, number> = { off: 0, hover: 1, always: 2 };
const hexToRgb = (hex: string) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match ? [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255] : [0, 0, 0];
};

const vertex = `#version 300 es
in vec2 position; out vec2 vUv;
void main(){vUv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;

const fragment = `#version 300 es
precision highp float;
uniform sampler2D tMap; uniform vec2 iResolution; uniform vec2 uImageSize; uniform vec2 uMouse; uniform float uActivity;
uniform float uDotSize; uniform float uDensity; uniform float uAngle; uniform int uShape; uniform vec3 uInk; uniform vec3 uPaper;
uniform int uMode; uniform float uContrast; uniform float uInvert; uniform float uRevealRadius; uniform float uEdge; uniform float uIdleReveal; uniform int uTrigger;
in vec2 vUv; out vec4 fragColor;
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
vec2 coverUv(vec2 uv){float ia=uImageSize.x/max(uImageSize.y,1.),pa=iResolution.x/max(iResolution.y,1.);vec2 s=pa>ia?vec2(1.,ia/pa):vec2(pa/ia,1.);return(uv-.5)*s+.5;}
vec3 grade(vec3 c){c=clamp((c-.5)*uContrast+.5,0.,1.);return mix(c,1.-c,uInvert);}
float shapeDistance(vec2 f){if(uShape==1)return max(abs(f.x),abs(f.y));if(uShape==2)return abs(f.x)+abs(f.y);if(uShape==3)return abs(f.y);return length(f);}
float screenCoverage(vec2 st,float density,float angle,float ink,float scale){vec2 p=rot(angle)*st*density;vec2 f=fract(p)-.5;float radius=sqrt(clamp(ink,0.,1.))*.72*scale*uDotSize;float width=length(fwidth(p))*.55+1e-4;return smoothstep(radius+width,radius-width,shapeDistance(f));}
void main(){
  vec2 aspect=vec2(iResolution.x/max(iResolution.y,1.),1.);vec2 st=vUv*aspect;float a=radians(uAngle);
  vec3 source=grade(texture(tMap,clamp(coverUv(vUv),0.,1.)).rgb);float lum=dot(source,vec3(.299,.587,.114));
  float primary=screenCoverage(st,uDensity,a,1.-lum,1.);vec3 printed=mix(uPaper,uInk,primary);
  if(uMode==1){float secondary=screenCoverage(st,uDensity,a+radians(38.),pow(1.-lum,1.35),.88);vec3 secondInk=mix(uInk.gbr,vec3(.56,.08,.18),.65);printed=mix(printed,secondInk,secondary*.52);}
  if(uMode==2){float r=screenCoverage(st,uDensity,a+radians(15.),1.-source.r,.78);float g=screenCoverage(st,uDensity,a+radians(75.),1.-source.g,.78);float b=screenCoverage(st,uDensity,a,1.-source.b,.78);printed=uPaper;printed=mix(printed,vec3(.12,.72,.82),r);printed=mix(printed,vec3(.88,.14,.48),g*.76);printed=mix(printed,vec3(.95,.78,.12),b*.68);}
  vec2 delta=(vUv-uMouse)*aspect;float distance=length(delta);float activity=uTrigger==2?1.:(uTrigger==0?0.:uActivity);float radius=max(uRevealRadius,1e-4);float band=max(1.4/max(iResolution.y,1.),radius*(1.-clamp(uEdge,0.,1.))*.45);float loupe=1.-smoothstep(radius-band,radius+band,distance);float focus=clamp(max(loupe*activity,uIdleReveal),0.,1.);
  fragColor=vec4(mix(printed,source,focus),1.);
}`;

interface Uniforms {
  tMap: { value: Texture }; iResolution: { value: number[] }; uImageSize: { value: number[] }; uMouse: { value: number[] }; uActivity: { value: number };
  uDotSize: { value: number }; uDensity: { value: number }; uAngle: { value: number }; uShape: { value: number }; uInk: { value: number[] }; uPaper: { value: number[] };
  uMode: { value: number }; uContrast: { value: number }; uInvert: { value: number }; uRevealRadius: { value: number }; uEdge: { value: number }; uIdleReveal: { value: number }; uTrigger: { value: number };
}

export function HalftoneReveal({
  src, inkColor = '#171311', paperColor = '#f3eee5', mode = 'mono', dotSize = 1,
  dotDensity = 84, angle = 28, shape = 'circle', contrast = 1.12, invert = false,
  revealRadius = .28, edge = .78, follow = .28, idleReveal = 0, trigger = 'hover',
  borderRadius = '0px', className = '', style,
}: HalftoneRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<Uniforms | null>(null);
  const frameRef = useRef(0);
  const followRef = useRef(follow);
  useEffect(() => { followRef.current = follow; }, [follow]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio || 1, 2), alpha: false, antialias: true });
    const gl = renderer.gl; gl.clearColor(0, 0, 0, 1); gl.canvas.style.cssText = 'width:100%;height:100%;display:block'; container.appendChild(gl.canvas);
    const texture = new Texture(gl, { generateMipmaps: false });
    const uniforms: Uniforms = {
      tMap: { value: texture }, iResolution: { value: [1, 1] }, uImageSize: { value: [1, 1] }, uMouse: { value: [.5, .5] }, uActivity: { value: 0 },
      uDotSize: { value: 1 }, uDensity: { value: 71 }, uAngle: { value: 45 }, uShape: { value: 0 },
      uInk: { value: [0, 0, 0] }, uPaper: { value: [1, .97, .9] }, uMode: { value: 0 },
      uContrast: { value: 1.15 }, uInvert: { value: 0 }, uRevealRadius: { value: .4 }, uEdge: { value: .8 },
      uIdleReveal: { value: 0 }, uTrigger: { value: 1 },
    };
    uniformsRef.current = uniforms;
    const program = new Program(gl, { vertex, fragment, uniforms }); const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const image = new Image(); image.src = src; image.onload = () => { texture.image = image; uniforms.uImageSize.value = [image.naturalWidth, image.naturalHeight]; };
    const resize = () => { const width = container.clientWidth || 1; const height = container.clientHeight || 1; renderer.setSize(width, height); uniforms.iResolution.value = [gl.canvas.width, gl.canvas.height]; };
    const observer = new ResizeObserver(resize); observer.observe(container); resize();
    const mouse = { x: .5, y: .5, smoothX: .5, smoothY: .5, activity: 0, target: 0 };
    const onMove = (event: PointerEvent) => { const rect = container.getBoundingClientRect(); mouse.x = (event.clientX - rect.left) / rect.width; mouse.y = 1 - (event.clientY - rect.top) / rect.height; mouse.target = reduced ? 0 : 1; };
    const onLeave = () => { mouse.target = 0; };
    container.addEventListener('pointermove', onMove, { passive: true }); container.addEventListener('pointerenter', onMove, { passive: true }); container.addEventListener('pointerleave', onLeave);
    let previous = performance.now();
    const loop = (now: number) => {
      const delta = Math.min(.05, Math.max(.001, (now - previous) / 1000)); previous = now;
      const amount = 1 - Math.exp(-delta / Math.max(.001, followRef.current)); mouse.smoothX += (mouse.x - mouse.smoothX) * amount; mouse.smoothY += (mouse.y - mouse.smoothY) * amount;
      mouse.activity += (mouse.target - mouse.activity) * (1 - Math.exp(-delta / .18)); uniforms.uMouse.value = [mouse.smoothX, mouse.smoothY]; uniforms.uActivity.value = mouse.activity;
      renderer.render({ scene: mesh }); frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(frameRef.current); observer.disconnect(); container.removeEventListener('pointermove', onMove); container.removeEventListener('pointerenter', onMove); container.removeEventListener('pointerleave', onLeave); gl.getExtension('WEBGL_lose_context')?.loseContext(); if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas); uniformsRef.current = null; };
  }, [src]);

  useEffect(() => {
    const uniforms = uniformsRef.current; if (!uniforms) return;
    uniforms.uDotSize.value = dotSize; uniforms.uDensity.value = dotDensity; uniforms.uAngle.value = angle; uniforms.uShape.value = shapes[shape]; uniforms.uInk.value = hexToRgb(inkColor); uniforms.uPaper.value = hexToRgb(paperColor); uniforms.uMode.value = modes[mode]; uniforms.uContrast.value = contrast; uniforms.uInvert.value = invert ? 1 : 0; uniforms.uRevealRadius.value = revealRadius; uniforms.uEdge.value = edge; uniforms.uIdleReveal.value = idleReveal; uniforms.uTrigger.value = triggers[trigger];
  }, [angle, contrast, dotDensity, dotSize, edge, idleReveal, inkColor, invert, mode, paperColor, revealRadius, shape, trigger]);

  return <div ref={containerRef} className={`halftone-reveal ${className}`.trim()} style={{ borderRadius, ...style }} />;
}
