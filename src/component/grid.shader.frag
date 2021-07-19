precision highp float;

uniform vec4 uColor;
uniform sampler2D uSampler;
uniform vec2 uScreenSize;
uniform float uTileSize;
uniform float uTileSubdivisor;

varying vec2 vScreen;
varying float vGridSizeScaled;


float grid(vec2 fragCoord, float space, float gridWidth)
{
    vec2 p  = fragCoord - vec2(.5);
    vec2 size = vec2(gridWidth - .5);
    
    vec2 a1 = mod(p - size, space);
    vec2 a2 = mod(p + size, space);
    vec2 a = a2 - a1;
       
    float g = min(a.x, a.y);
    return clamp(g, 0., 1.0);
}


void main(void)
{
    vec2 screen = vScreen;
    float gridSize = vGridSizeScaled;
    float alpha = 1. - uTileSize / gridSize;

    float g = max(
        (1. - grid(screen, gridSize / uTileSubdivisor , 1.)) * alpha,
        1. - grid(screen, gridSize , 1.)
    );
   
    gl_FragColor = uColor * g;
}