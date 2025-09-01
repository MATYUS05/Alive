import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';

// Impor Aset Karakter
import Seed from "../assets/AboutAssets/Seed.png";
import Shui from "../assets/AboutAssets/Shui.png";
import Sol from "../assets/AboutAssets/Sol.png";

// --- Konfigurasi Game ---
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;
const PLAYER_STEP = 5;
// --- [MODIFIKASI] Ukuran balok default untuk layar besar ---
const SLIDING_BLOCK_WIDTH_DESKTOP = 80;
const SLIDING_BLOCK_HEIGHT_DESKTOP = 30;
const FALLING_BLOCK_WIDTH_DESKTOP = 50;
const FALLING_BLOCK_HEIGHT_DESKTOP = 50;
const INITIAL_BLOCK_SPEED = 10; 
const SLIDING_SPAWN_RATE = 1500; 
const FALLING_SPAWN_RATE = 500;

// Fisika & Hitbox
const GRAVITY = 1;
const JUMP_STRENGTH = -15;
// --- [BARU] Padding untuk membuat hitbox lebih kecil dari gambar asli ---
const PLAYER_HITBOX_PADDING = 8; // Kurangi 8px dari setiap sisi hitbox player

const characters = [
  { name: "Seed", image: Seed },
  { name: "Shui", image: Shui },
  { name: "Sol", image: Sol },
];

function Games() {
  const [gameDimensions, setGameDimensions] = useState({ width: 800, height: 450 });
  const [playerPos, setPlayerPos] = useState({ x: gameDimensions.width / 2, y: gameDimensions.height - PLAYER_HEIGHT });
  const [playerVelocity, setPlayerVelocity] = useState({ y: 0 });
  const [facingDirection, setFacingDirection] = useState('right');
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

  const [blocks, setBlocks] = useState([]);
  const [score, setScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(INITIAL_BLOCK_SPEED);
  const [slidingSpawnRate, setSlidingSpawnRate] = useState(SLIDING_SPAWN_RATE);
  const [fallingSpawnRate, setFallingSpawnRate] = useState(FALLING_SPAWN_RATE);
  
  const [gameState, setGameState] = useState('waiting');
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const keysPressed = useRef({});
  const gameAreaRef = useRef(null);
  // --- [REFACTOR] Ref untuk game loop dan state dinamis di dalamnya ---
  const gameLoopRef = useRef();
  const playerPosRef = useRef(playerPos);
  const playerVelocityRef = useRef(playerVelocity);
  const blocksRef = useRef(blocks);
  const scoreRef = useRef(score);

  // Sinkronisasi Ref dengan State saat state berubah dari luar loop
  useEffect(() => { playerPosRef.current = playerPos; }, [playerPos]);
  useEffect(() => { playerVelocityRef.current = playerVelocity; }, [playerVelocity]);
  useEffect(() => { blocksRef.current = blocks; }, [blocks]);
  useEffect(() => { scoreRef.current = score; }, [score]);
  
  // Effect untuk membuat area game responsif
  useLayoutEffect(() => {
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;
    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setGameDimensions({ width, height });
    });
    resizeObserver.observe(gameArea);
    return () => resizeObserver.disconnect();
  }, []);

  // --- Fungsi Aksi Game (Tidak berubah) ---
  const handleJump = () => { if (playerPosRef.current.y >= gameDimensions.height - PLAYER_HEIGHT) setPlayerVelocity({ y: JUMP_STRENGTH }) };
  const startGame = () => { setPlayerPos({ x: (gameDimensions.width - PLAYER_WIDTH) / 2, y: gameDimensions.height - PLAYER_HEIGHT }); setPlayerVelocity({ y: 0 }); setBlocks([]); setScore(0); setGameSpeed(INITIAL_BLOCK_SPEED); setSlidingSpawnRate(SLIDING_SPAWN_RATE); setFallingSpawnRate(FALLING_SPAWN_RATE); setGameState('playing'); gameAreaRef.current.focus(); };
  const backToMainMenu = () => { setGameState('waiting'); setSelectedCharacter(null); setCurrentCharacterIndex(0); setScore(0); setBlocks([]); };
  const handleCharacterSelect = (character) => { setSelectedCharacter(character.image); startGame(); };
  const showCharacterSelection = () => setGameState('selecting');
  
  // Effect untuk menangani input keyboard
  const handleKeyDown = useCallback((e) => { const key = e.key.toLowerCase(); keysPressed.current[key] = true; if (key === 'a') setFacingDirection('left'); if (key === 'd') setFacingDirection('right'); if (key === ' ') { e.preventDefault(); handleJump(); } }, [gameDimensions.height]);
  const handleKeyUp = useCallback((e) => { keysPressed.current[e.key.toLowerCase()] = false; }, []);
  useEffect(() => { window.addEventListener('keydown', handleKeyDown); window.addEventListener('keyup', handleKeyUp); return () => { window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp); }; }, [handleKeyDown, handleKeyUp]);

  // --- [REFACTOR TOTAL] Game Loop menggunakan requestAnimationFrame ---
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = () => {
      // Update Player
      let { x, y } = playerPosRef.current;
      let { y: velY } = playerVelocityRef.current;

      velY += GRAVITY;
      y += velY;

      if (keysPressed.current['a']) x -= PLAYER_STEP;
      if (keysPressed.current['d']) x += PLAYER_STEP;

      if (y >= gameDimensions.height - PLAYER_HEIGHT) {
        y = gameDimensions.height - PLAYER_HEIGHT;
        velY = 0;
      }
      playerPosRef.current = { x: Math.max(0, Math.min(x, gameDimensions.width - PLAYER_WIDTH)), y };
      playerVelocityRef.current = { y: velY };
      
      // Update Blocks
      const isMobile = gameDimensions.width <= 768;
      const currentSlidingBlockWidth = isMobile ? 60 : SLIDING_BLOCK_WIDTH_DESKTOP;
      const currentFallingBlockWidth = isMobile ? 40 : FALLING_BLOCK_WIDTH_DESKTOP;

      blocksRef.current = blocksRef.current
        .map(block => {
          if (block.type === 'sliding') return { ...block, x: block.direction === 'left' ? block.x + gameSpeed : block.x - gameSpeed };
          if (block.type === 'falling') return { ...block, y: block.y + gameSpeed };
          return block;
        })
        .filter(block => {
          if (block.type === 'sliding') return block.x > -currentSlidingBlockWidth && block.x < gameDimensions.width;
          if (block.type === 'falling') return block.y < gameDimensions.height;
          return false;
        });

      // Update Score & Difficulty
      scoreRef.current += 1;
      if (scoreRef.current > 0 && scoreRef.current % 400 === 0) {
        setGameSpeed(prev => prev + 0.3);
        setSlidingSpawnRate(prev => Math.max(400, prev - 75));
        setFallingSpawnRate(prev => Math.max(500, prev - 75));
      }
      
      // Update state untuk me-render
      setPlayerPos(playerPosRef.current);
      setBlocks(blocksRef.current);
      setScore(scoreRef.current);

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameState, gameDimensions, gameSpeed]);

  // Spawner tidak berubah, hanya menggunakan gameDimensions
  useEffect(() => { if (gameState !== 'playing') return; const slidingSpawner = setInterval(() => { const isMobile = gameDimensions.width <= 768; const currentSlidingBlockHeight = isMobile ? 20 : SLIDING_BLOCK_HEIGHT_DESKTOP; const currentSlidingBlockWidth = isMobile ? 60 : SLIDING_BLOCK_WIDTH_DESKTOP; const direction = Math.random() > 0.5 ? 'left' : 'right'; setBlocks(prev => [...prev, { id: `s-${Date.now()}`, type: 'sliding', x: direction === 'left' ? -currentSlidingBlockWidth : gameDimensions.width, y: gameDimensions.height - currentSlidingBlockHeight, direction: direction, }]); }, slidingSpawnRate); return () => clearInterval(slidingSpawner); }, [gameState, slidingSpawnRate, gameDimensions]);
  useEffect(() => { if (gameState !== 'playing') return; const fallingSpawner = setInterval(() => { const isMobile = gameDimensions.width <= 768; const currentFallingBlockWidth = isMobile ? 40 : FALLING_BLOCK_WIDTH_DESKTOP; const currentFallingBlockHeight = isMobile ? 40 : FALLING_BLOCK_HEIGHT_DESKTOP; setBlocks(prev => [...prev, { id: `f-${Date.now()}`, type: 'falling', x: Math.random() * (gameDimensions.width - currentFallingBlockWidth), y: -currentFallingBlockHeight, }]); }, fallingSpawnRate); return () => clearInterval(fallingSpawner); }, [gameState, fallingSpawnRate, gameDimensions]);

  // Effect untuk deteksi tabrakan
  useEffect(() => {
    if (gameState !== 'playing') return;

    // --- [MODIFIKASI] Hitbox Player dibuat lebih kecil ---
    const playerRect = { 
      left: playerPos.x + PLAYER_HITBOX_PADDING, 
      right: playerPos.x + PLAYER_WIDTH - PLAYER_HITBOX_PADDING, 
      top: playerPos.y + PLAYER_HITBOX_PADDING, 
      bottom: playerPos.y + PLAYER_HEIGHT - PLAYER_HITBOX_PADDING, 
    };

    const isMobile = gameDimensions.width <= 768;
    for (const block of blocks) {
      // --- [MODIFIKASI] Ukuran hitbox balok dinamis ---
      const blockWidth = isMobile ? (block.type === 'sliding' ? 60 : 40) : (block.type === 'sliding' ? SLIDING_BLOCK_WIDTH_DESKTOP : FALLING_BLOCK_WIDTH_DESKTOP);
      const blockHeight = isMobile ? (block.type === 'sliding' ? 20 : 40) : (block.type === 'sliding' ? SLIDING_BLOCK_HEIGHT_DESKTOP : FALLING_BLOCK_HEIGHT_DESKTOP);
      
      const blockRect = { left: block.x, right: block.x + blockWidth, top: block.y, bottom: block.y + blockHeight };
      if (playerRect.right > blockRect.left && playerRect.left < blockRect.right && playerRect.bottom > blockRect.top && playerRect.top < blockRect.bottom) {
        setGameState('gameOver');
        break;
      }
    }
  }, [blocks, playerPos.x, playerPos.y, gameState, gameDimensions]);


  // --- Render Komponen (JSX) ---
  const isMobile = gameDimensions.width <= 768;
  return (
    <div className="font-itim w-full h-screen flex flex-col justify-center items-center bg-gray-800 text-white p-2 sm:p-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2">Anxiety Attack</h1>
      <div 
        ref={gameAreaRef}
        className="relative bg-black border-2 border-cyan-400 overflow-hidden shadow-lg shadow-cyan-500/50 w-full max-w-4xl aspect-video"
        tabIndex={0} 
      >
        {gameState === 'playing' ? (
          <>
            <img src={selectedCharacter} alt="Player" className="absolute" style={{ width: PLAYER_WIDTH, height: PLAYER_HEIGHT, left: playerPos.x, top: playerPos.y, transform: facingDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)' }} />
            {blocks.map(block => {
              // --- [MODIFIKASI] Ukuran visual balok dinamis ---
              const width = isMobile ? (block.type === 'sliding' ? 60 : 40) : (block.type === 'sliding' ? SLIDING_BLOCK_WIDTH_DESKTOP : FALLING_BLOCK_WIDTH_DESKTOP);
              const height = isMobile ? (block.type === 'sliding' ? 20 : 40) : (block.type === 'sliding' ? SLIDING_BLOCK_HEIGHT_DESKTOP : FALLING_BLOCK_HEIGHT_DESKTOP);
              return (<div key={block.id} className={`absolute rounded-sm ${block.type === 'falling' ? 'bg-red-500' : 'bg-purple-600'}`} style={{ width, height, left: block.x, top: block.y }} />);
            })}
          </>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-70 p-2 sm:p-4 text-center">
            {/* ... Sisa JSX tidak berubah signifikan ... */}
            {gameState === 'selecting' && ( <> <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">Choose Your Character</h2> <div className="hidden lg:flex gap-x-8"> {characters.map((char) => ( <div key={char.name} onClick={() => handleCharacterSelect(char)} className="flex flex-col items-center p-4 rounded-lg bg-gray-700 hover:bg-cyan-900 cursor-pointer transition-all transform hover:scale-110"> <img src={char.image} alt={char.name} className="w-24 h-24 object-contain mb-2"/> <h3 className="text-2xl">{char.name}</h3> </div> ))} </div><div className="lg:hidden flex items-center justify-center w-full"> <button onClick={()=>{}} className="text-3xl sm:text-4xl p-2 sm:p-4 opacity-70 hover:opacity-100">◀</button> <div onClick={() => handleCharacterSelect(characters[currentCharacterIndex])} className="flex flex-col items-center p-2 sm:p-4 rounded-lg bg-gray-700 cursor-pointer mx-2 sm:mx-4"> <img src={characters[currentCharacterIndex].image} alt={characters[currentCharacterIndex].name} className="w-20 h-20 sm:w-28 sm:h-28 object-contain mb-2"/> <h3 className="text-lg sm:text-2xl">{characters[currentCharacterIndex].name}</h3> </div> <button onClick={()=>{}} className="text-3xl sm:text-4xl p-2 sm:p-4 opacity-70 hover:opacity-100">▶</button> </div></> )}
            {gameState === 'gameOver' && ( <> <h2 className="text-3xl sm:text-4xl md:text-5xl text-red-500">Game Over</h2> <p className="text-xl sm:text-2xl mt-4">Your Score: {score}</p> <div className="flex gap-x-4 mt-6 sm:mt-8"> <button onClick={backToMainMenu} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 text-lg sm:text-xl md:text-2xl rounded-lg"> Menu </button> <button onClick={startGame} className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 px-6 text-lg sm:text-xl md:text-2xl rounded-lg"> Retry </button> </div> </> )}
            {gameState === 'waiting' && ( <> <h2 className="text-2xl sm:text-3xl md:text-4xl">Get Ready!</h2> <p className="text-base sm:text-lg md:text-xl mt-2">Hindari semua balok.<br/>'A'/'D' untuk gerak, Spasi untuk Lompat.</p> <button onClick={showCharacterSelection} className="mt-6 sm:mt-8 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 px-6 text-lg sm:text-xl md:text-2xl rounded-lg"> Play </button> </> )}
          </div>
        )}
      </div>
      <div className="text-xl sm:text-2xl mt-2">Score: {score}</div>
      <div className="mt-2 sm:mt-4 w-full max-w-xs sm:max-w-sm flex justify-between items-center px-2 sm:px-4"> <div className="flex gap-x-2 sm:gap-x-4"> <button className="w-14 h-12 sm:w-16 sm:h-14 md:w-20 md:h-16 bg-gray-600 rounded-lg text-2xl sm:text-3xl md:text-4xl active:bg-gray-500" onTouchStart={() => {keysPressed.current['a'] = true; setFacingDirection('left')}} onTouchEnd={() => keysPressed.current['a'] = false} onMouseDown={() => {keysPressed.current['a'] = true; setFacingDirection('left')}} onMouseUp={() => keysPressed.current['a'] = false}> ◀ </button> <button className="w-14 h-12 sm:w-16 sm:h-14 md:w-20 md:h-16 bg-gray-600 rounded-lg text-2xl sm:text-3xl md:text-4xl active:bg-gray-500" onTouchStart={() => {keysPressed.current['d'] = true; setFacingDirection('right')}} onTouchEnd={() => keysPressed.current['d'] = false} onMouseDown={() => {keysPressed.current['d'] = true; setFacingDirection('right')}} onMouseUp={() => keysPressed.current['d'] = false}> ▶ </button> </div> <button className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-cyan-600 rounded-full text-3xl sm:text-4xl active:bg-cyan-500" onClick={handleJump}> ▲ </button> </div>
    </div>
  );
}

export default Games;