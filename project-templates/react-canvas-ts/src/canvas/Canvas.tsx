import React, { useRef, useEffect } from 'react';
import Game from '../Game';

interface CanvasProps {
    callback:Function | null
}


const removeListeners = (game:Game) => {
    game.cleanup();
}


const Canvas: React.FC<CanvasProps> = ({callback}) => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null);
    
    useEffect(() => {
        let game: Game;
        
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d')!;
            game = new Game(canvas)

            game.init();
            // callback?.call(canvas, ctx)
            game.start();
        }
        return () => {
            removeListeners(game)
        }
    }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;