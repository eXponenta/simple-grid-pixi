import vert from './grid.shader.vert';
import frag from './grid.shader.frag';

import { Application, Mesh, MeshMaterial, PlaneGeometry, Program, Texture } from "pixi.js";

export class GridComponent extends Mesh {
    constructor(app: Application) {
        super(
            new PlaneGeometry(1, 1, 2, 2),
            new MeshMaterial(Texture.WHITE, {
                program: Program.from(vert, frag, 'grid'),
                uniforms: {
                    uScreenSize: [
                        app.screen.width,
                        app.screen.height
                    ],
                    uTileSize: 100,
                    uTileSubdivisor: 4, 
                }
            })
        );

        this.tint = 0xff0000;
    }
}