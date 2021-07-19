precision highp float;

attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTextureMatrix;
uniform vec2 uScreenSize;
uniform float uTileSize;
uniform float uTileSubdivisor;

varying vec2 vScreen;
varying float vGridSizeScaled;

void computeScaleChunk(float scale) {
    float fullGrid = uTileSize;
    float biggerGrid = fullGrid * uTileSubdivisor;
    float gridSize = fullGrid * scale;
 
    if (gridSize > biggerGrid) {
        for(int i = 0; i < 10; i ++) {
            if (gridSize < biggerGrid){
                break;
            }
            gridSize /= 4.;
        }
    } else if(gridSize < fullGrid) {
        for(int i = 0; i < 10; i ++) {
            if (gridSize > fullGrid){
                break;
            }
            gridSize *= 4.;
        }
    }

    vGridSizeScaled = gridSize;
}

void main(void)
{
    vec2 pos = vec2(
        2. * aVertexPosition.x - 1.,
        1. - 2. * aVertexPosition.y
    );

    gl_Position = vec4(pos, 0.0, 1.0);

    vScreen = aVertexPosition * uScreenSize - (translationMatrix * vec3(0.0,0.0,1.)).xy;

    computeScaleChunk(length(translationMatrix[0].xy));
}