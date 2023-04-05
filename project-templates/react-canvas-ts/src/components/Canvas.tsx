import React, { useRef, useEffect } from 'react';
import Game from '../game/Game';

const Canvas = () => {
    let canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        let game: Game;

        if (canvasRef.current) {
            const canvas = canvasRef.current;
            game = new Game(canvas)

            game.init();
            game.start();
        }
        return () => {
            game.cleanup();
        }
    }, []);

    return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;