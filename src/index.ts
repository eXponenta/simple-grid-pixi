import './style.css';

import { Application, Graphics } from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { GridComponent } from './component/GridComponent';

const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    autoDensity: true,
    resizeTo: window,
});

document.body.appendChild(app.view);

const viewport = new Viewport({
    worldWidth: 10000,
    worldHeight: 10000,
    screenWidth: app.screen.width,
    screenHeight: app.screen.height,
    interaction: app.renderer.plugins.interaction
});

viewport
    .drag()
    .pinch()
    .wheel()
    .decelerate()


app.stage.addChild(viewport);

const rect = new Graphics().beginFill(0xff0000).drawRect(-50, -50, 100, 100);

viewport.addChild(new GridComponent(app));
viewport.addChild(rect);

window.addEventListener('wheel', e => e.preventDefault(), {passive: false});