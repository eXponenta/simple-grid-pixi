import vert from './grid.shader.vert';
import frag from './grid.shader.frag';

import { Application, Mesh, MeshMaterial, PlaneGeometry, Program, Renderer, Texture } from "pixi.js";

export class GridComponent extends Mesh {
    app: Application;

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

        this.tint = 0x946D64;
        this.app = app;
    }

    render(renderer: Renderer) {
        this.material.uniforms.uScreenSize = [
            this.app.screen.width,
            this.app.screen.height
        ];

        super.render(renderer);
    }
}