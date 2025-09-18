import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { Joystick } from "react-joystick-component";
import { motion } from "framer-motion";
import SkyBackground from "../assets/HomeAssets/Sky.png";
import Seed from "../assets/AboutAssets/Seed.png";
import Shui from "../assets/AboutAssets/Shui.png";
import Sol from "../assets/AboutAssets/Sol.png";

// --- Konfigurasi Game ---
const PLAYER_WIDTH = 50,
  PLAYER_HEIGHT = 50,
  PLAYER_STEP = 5,
  SLIDING_BLOCK_WIDTH_DESKTOP = 120,
  SLIDING_BLOCK_HEIGHT_DESKTOP = 40,
  FALLING_BLOCK_WIDTH_DESKTOP = 100,
  FALLING_BLOCK_HEIGHT_DESKTOP = 50,
  INITIAL_BLOCK_SPEED = 8,
  SLIDING_SPAWN_RATE = 1500,
  FALLING_SPAWN_RATE = 500,
  GRAVITY = 1,
  JUMP_STRENGTH = -15,
  PLAYER_HITBOX_PADDING = 8;
const ANXIETY_WORDS = [
  "Deadline",
  "Tugas",
  "Revisi",
  "Cemas",
  "Bills",
  "Cicilan",
  "Ekspektasi",
  "Gagal",
  "Error",
  "Overthinking",
  "Insomnia",
  "Lulus?",
  "Kerja!",
  "Nikah?",
  "Depresi",
  "Presentasi",
  "Rapat",
  "Skripsi",
];
const titleText = "Anxiety Attack";
const characters = [
  {
    name: "Seed",
    image: Seed,
    maxHealth: 1,
    skill: {
      name: "Growth Shield",
      description: "Hancurkan rintangan di sekitarmu selama 3 detik.",
      duration: 3000,
      cooldown: 10000,
    },
  },
  {
    name: "Shui",
    image: Shui,
    maxHealth: 1,
    skill: {
      name: "Flow State",
      description: "Perlambat semua rintangan selama 5 detik.",
      duration: 5000,
      cooldown: 12000,
    },
  },
  {
    name: "Sol",
    image: Sol,
    maxHealth: 2,
    skill: {
      name: "Extra Health (Pasif)",
      description: "Memulai permainan dengan satu nyawa ekstra.",
      duration: 0,
      cooldown: 0,
    },
  },
];
const Heart = ({ filled }) => (
  <svg
    className={`w-8 h-8 ${filled ? "text-red-500" : "text-gray-600"}`}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    {" "}
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />{" "}
  </svg>
);

// --- Variants untuk animasi Framer Motion ---
const pageContainerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Games() {
  const [gameDimensions, setGameDimensions] = useState({
    width: 800,
    height: 450,
  });
  const [playerPos, setPlayerPos] = useState({
    x: gameDimensions.width / 2,
    y: gameDimensions.height - PLAYER_HEIGHT,
  });
  const [playerVelocity, setPlayerVelocity] = useState({ y: 0 });
  const [facingDirection, setFacingDirection] = useState("right");
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const [score, setScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(INITIAL_BLOCK_SPEED);
  const [slidingSpawnRate, setSlidingSpawnRate] = useState(SLIDING_SPAWN_RATE);
  const [fallingSpawnRate, setFallingSpawnRate] = useState(FALLING_SPAWN_RATE);
  const [gameState, setGameState] = useState("waiting");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [skillReady, setSkillReady] = useState(true);
  const [skillActive, setSkillActive] = useState(false);
  const [skillCooldownTime, setSkillCooldownTime] = useState(0);
  const [health, setHealth] = useState(1);
  const [isInvincible, setIsInvincible] = useState(false);
  const keysPressed = useRef({});
  const gameAreaRef = useRef(null);
  const gameLoopRef = useRef();
  const playerPosRef = useRef(playerPos);
  const playerVelocityRef = useRef(playerVelocity);
  const blocksRef = useRef(blocks);
  const scoreRef = useRef(score);
  const healthRef = useRef(health);
  const skillTimers = useRef({
    duration: null,
    cooldown: null,
    interval: null,
  });

  useEffect(() => {
    playerPosRef.current = playerPos;
  }, [playerPos]);
  useEffect(() => {
    playerVelocityRef.current = playerVelocity;
  }, [playerVelocity]);
  useEffect(() => {
    blocksRef.current = blocks;
  }, [blocks]);
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  useEffect(() => {
    healthRef.current = health;
  }, [health]);

  useEffect(() => {
    if (gameState !== "playing") {
      setSkillActive(false);
      setSkillReady(true);
      setSkillCooldownTime(0);
      setIsInvincible(false);
      clearTimeout(skillTimers.current.duration);
      clearTimeout(skillTimers.current.cooldown);
      clearInterval(skillTimers.current.interval);
    }
  }, [gameState]);

  const handleActivateSkill = useCallback(() => {
    if (
      !skillReady ||
      !selectedCharacter ||
      selectedCharacter.skill.duration === 0 ||
      gameState !== "playing"
    )
      return;
    const { skill } = selectedCharacter;
    setSkillReady(false);
    setSkillActive(true);
    setSkillCooldownTime(skill.cooldown / 1000);
    skillTimers.current.duration = setTimeout(() => {
      setSkillActive(false);
    }, skill.duration);
    skillTimers.current.cooldown = setTimeout(() => {
      setSkillReady(true);
      setSkillCooldownTime(0);
      clearInterval(skillTimers.current.interval);
    }, skill.cooldown);
    skillTimers.current.interval = setInterval(() => {
      setSkillCooldownTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  }, [skillReady, selectedCharacter, gameState]);

  useLayoutEffect(() => {
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setGameDimensions({ width, height });
    });
    resizeObserver.observe(gameArea);
    return () => resizeObserver.disconnect();
  }, []);

  const handleJoystickMove = (event) => {
    if (event.direction === "LEFT") {
      keysPressed.current["a"] = true;
      keysPressed.current["d"] = false;
      setFacingDirection("left");
    } else if (event.direction === "RIGHT") {
      keysPressed.current["d"] = true;
      keysPressed.current["a"] = false;
      setFacingDirection("right");
    }
  };
  const handleJoystickStop = () => {
    keysPressed.current["a"] = false;
    keysPressed.current["d"] = false;
  };
  const handleJump = () => {
    if (playerPosRef.current.y >= gameDimensions.height - PLAYER_HEIGHT)
      setPlayerVelocity({ y: JUMP_STRENGTH });
  };

  const startGame = (characterForNewGame) => {
    setPlayerPos({
      x: (gameDimensions.width - PLAYER_WIDTH) / 2,
      y: gameDimensions.height - PLAYER_HEIGHT,
    });
    setPlayerVelocity({ y: 0 });
    setBlocks([]);
    setScore(0);
    setGameSpeed(INITIAL_BLOCK_SPEED);
    setSlidingSpawnRate(SLIDING_SPAWN_RATE);
    setFallingSpawnRate(FALLING_SPAWN_RATE);
    const characterToSet = characterForNewGame || selectedCharacter;
    if (characterToSet) {
      setHealth(characterToSet.maxHealth);
    }
    setGameState("playing");
    gameAreaRef.current.focus();
  };

  const backToMainMenu = () => {
    setGameState("waiting");
    setSelectedCharacter(null);
    setCurrentCharacterIndex(0);
    setScore(0);
    setBlocks([]);
  };

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    startGame(character);
  };

  const showCharacterSelection = () => setGameState("selecting");

  const handleKeyDown = useCallback(
    (e) => {
      const key = e.key.toLowerCase();
      keysPressed.current[key] = true;
      if (key === "a") setFacingDirection("left");
      if (key === "d") setFacingDirection("right");
      if (key === " ") {
        e.preventDefault();
        handleJump();
      }
      if (key === "e") {
        e.preventDefault();
        handleActivateSkill();
      }
    },
    [gameDimensions.height, handleActivateSkill]
  );

  const handleKeyUp = useCallback((e) => {
    keysPressed.current[e.key.toLowerCase()] = false;
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    if (gameState !== "playing") return;
    const gameLoop = () => {
      let { x, y } = playerPosRef.current;
      let { y: velY } = playerVelocityRef.current;
      velY += GRAVITY;
      y += velY;
      if (keysPressed.current["a"]) x -= PLAYER_STEP;
      if (keysPressed.current["d"]) x += PLAYER_STEP;
      if (y >= gameDimensions.height - PLAYER_HEIGHT) {
        y = gameDimensions.height - PLAYER_HEIGHT;
        velY = 0;
      }
      playerPosRef.current = {
        x: Math.max(0, Math.min(x, gameDimensions.width - PLAYER_WIDTH)),
        y,
      };
      playerVelocityRef.current = { y: velY };
      const isMobile = gameDimensions.width <= 768;
      const currentSlidingBlockWidth = isMobile
        ? 90
        : SLIDING_BLOCK_WIDTH_DESKTOP;
      const currentSpeed =
        skillActive && selectedCharacter.name === "Shui"
          ? gameSpeed * 0.5
          : gameSpeed;
      blocksRef.current = blocksRef.current
        .map((block) => {
          if (block.type === "sliding")
            return {
              ...block,
              x:
                block.direction === "left"
                  ? block.x + currentSpeed
                  : block.x - currentSpeed,
            };
          if (block.type === "falling")
            return { ...block, y: block.y + currentSpeed };
          return block;
        })
        .filter((block) => {
          if (block.type === "sliding")
            return (
              block.x > -currentSlidingBlockWidth &&
              block.x < gameDimensions.width
            );
          if (block.type === "falling") return block.y < gameDimensions.height;
          return false;
        });
      scoreRef.current += 1;
      if (scoreRef.current > 0 && scoreRef.current % 400 === 0) {
        setGameSpeed((prev) => prev + 0.3);
        setSlidingSpawnRate((prev) => Math.max(400, prev - 75));
        setFallingSpawnRate((prev) => Math.max(500, prev - 75));
      }
      setPlayerPos(playerPosRef.current);
      setBlocks(blocksRef.current);
      setScore(scoreRef.current);
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameState, gameDimensions, gameSpeed, skillActive, selectedCharacter]);

  useEffect(() => {
    if (gameState !== "playing") return;
    const slidingSpawner = setInterval(() => {
      const isMobile = gameDimensions.width <= 768;
      const currentSlidingBlockHeight = isMobile
        ? 30
        : SLIDING_BLOCK_HEIGHT_DESKTOP;
      const currentSlidingBlockWidth = isMobile
        ? 90
        : SLIDING_BLOCK_WIDTH_DESKTOP;
      const direction = Math.random() > 0.5 ? "left" : "right";
      const randomWord =
        ANXIETY_WORDS[Math.floor(Math.random() * ANXIETY_WORDS.length)];
      setBlocks((prev) => [
        ...prev,
        {
          id: `s-${Date.now()}`,
          type: "sliding",
          x:
            direction === "left"
              ? -currentSlidingBlockWidth
              : gameDimensions.width,
          y: gameDimensions.height - currentSlidingBlockHeight,
          direction: direction,
          text: randomWord,
        },
      ]);
    }, slidingSpawnRate);
    return () => clearInterval(slidingSpawner);
  }, [gameState, slidingSpawnRate, gameDimensions]);

  useEffect(() => {
    if (gameState !== "playing") return;
    const fallingSpawner = setInterval(() => {
      const isMobile = gameDimensions.width <= 768;
      const currentFallingBlockWidth = isMobile
        ? 80
        : FALLING_BLOCK_WIDTH_DESKTOP;
      const currentFallingBlockHeight = isMobile
        ? 40
        : FALLING_BLOCK_HEIGHT_DESKTOP;
      const randomWord =
        ANXIETY_WORDS[Math.floor(Math.random() * ANXIETY_WORDS.length)];
      setBlocks((prev) => [
        ...prev,
        {
          id: `f-${Date.now()}`,
          type: "falling",
          x: Math.random() * (gameDimensions.width - currentFallingBlockWidth),
          y: -currentFallingBlockHeight,
          text: randomWord,
        },
      ]);
    }, fallingSpawnRate);
    return () => clearInterval(fallingSpawner);
  }, [gameState, fallingSpawnRate, gameDimensions]);

  useEffect(() => {
    if (gameState !== "playing" || isInvincible) return;
    const playerRect = {
      left: playerPos.x + PLAYER_HITBOX_PADDING,
      right: playerPos.x + PLAYER_WIDTH - PLAYER_HITBOX_PADDING,
      top: playerPos.y + PLAYER_HITBOX_PADDING,
      bottom: playerPos.y + PLAYER_HEIGHT - PLAYER_HITBOX_PADDING,
    };
    const isMobile = gameDimensions.width <= 768;
    let collidedBlock = null;
    for (const block of blocks) {
      const blockWidth = isMobile
        ? block.type === "sliding"
          ? 90
          : 80
        : block.type === "sliding"
        ? SLIDING_BLOCK_WIDTH_DESKTOP
        : FALLING_BLOCK_WIDTH_DESKTOP;
      const blockHeight = isMobile
        ? block.type === "sliding"
          ? 30
          : 40
        : block.type === "sliding"
        ? SLIDING_BLOCK_HEIGHT_DESKTOP
        : FALLING_BLOCK_HEIGHT_DESKTOP;
      const blockRect = {
        left: block.x,
        right: block.x + blockWidth,
        top: block.y,
        bottom: block.y + blockHeight,
      };
      if (
        playerRect.right > blockRect.left &&
        playerRect.left < blockRect.right &&
        playerRect.bottom > blockRect.top &&
        playerRect.top < blockRect.bottom
      ) {
        if (skillActive && selectedCharacter.name === "Seed") {
          setBlocks((prevBlocks) =>
            prevBlocks.filter((b) => b.id !== block.id)
          );
          return;
        } else {
          collidedBlock = block;
          break;
        }
      }
    }
    if (collidedBlock) {
      const newHealth = healthRef.current - 1;
      setHealth(newHealth);
      if (newHealth < 1) {
        setGameState("gameOver");
      } else {
        setIsInvincible(true);
        setTimeout(() => setIsInvincible(false), 1000);
      }
    }
  }, [
    blocks,
    playerPos.x,
    playerPos.y,
    gameState,
    gameDimensions,
    skillActive,
    selectedCharacter,
    isInvincible,
  ]);

  const isMobile = gameDimensions.width <= 768;

  return (
    <div className="font-josefin w-full h-screen relative text-white">
      <img
        src={SkyBackground}
        alt="Page Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 w-full h-full bg-black/40 z-10"></div>

      <motion.div
        className="relative z-20 w-full h-full flex flex-col justify-center items-center p-2 sm:p-4"
        variants={pageContainerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl mb-2 mt-20 text-[#6D4C41] font-bold"
        >
          {titleText.split("").map((char, index) => (
            <span
              key={index}
              className=""
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </motion.h1>

        <motion.div
          ref={gameAreaRef}
          variants={itemVariants}
          className="relative border-2 border-[#5D4037] overflow-hidden shadow-lg shadow-[#5D4037]/50 w-full max-w-4xl aspect-video"
          tabIndex={0}
        >
          {skillActive && selectedCharacter?.name === "Shui" && (
            <div className="absolute inset-0 w-full h-full bg-cyan-400/20 z-30 animate-pulse"></div>
          )}

          {gameState === "playing" ? (
            <>
              <div className="absolute top-2 left-2 z-40 flex flex-col gap-y-2">
                {selectedCharacter && (
                  <div className="flex items-center gap-x-2 p-2 bg-black/40 rounded-lg">
                    {Array.from({ length: selectedCharacter.maxHealth }).map(
                      (_, i) => (
                        <Heart key={i} filled={i < health} />
                      )
                    )}
                  </div>
                )}
                {selectedCharacter && selectedCharacter.skill.duration > 0 && (
                  <div
                    className={`p-2 bg-black/40 rounded-lg text-center transition-colors ${
                      skillReady ? "text-yellow-300" : "text-gray-400"
                    }`}
                  >
                    <p className="font-bold text-sm leading-none">
                      {selectedCharacter.skill.name}
                    </p>
                    <p className="text-xl font-mono font-bold leading-none mt-1">
                      {skillReady ? "READY" : `${skillCooldownTime}s`}
                    </p>
                    <p className="text-xs mt-1">(E)</p>
                  </div>
                )}
              </div>
              <div
                className={`relative z-30 transition-opacity duration-200 ${
                  isInvincible && "opacity-50 animate-pulse"
                }`}
                style={{
                  width: PLAYER_WIDTH,
                  height: PLAYER_HEIGHT,
                  left: playerPos.x,
                  top: playerPos.y,
                  position: "absolute",
                }}
              >
                {skillActive && selectedCharacter?.name === "Seed" && (
                  <div className="absolute inset-[-10px] bg-green-400/40 rounded-full animate-ping"></div>
                )}
                <img
                  src={selectedCharacter.image}
                  alt="Player"
                  className="w-full h-full"
                  style={{
                    transform:
                      facingDirection === "left" ? "scaleX(-1)" : "scaleX(1)",
                  }}
                />
              </div>
              {blocks.map((block) => {
                const width = isMobile
                  ? block.type === "sliding"
                    ? 90
                    : 80
                  : block.type === "sliding"
                  ? SLIDING_BLOCK_WIDTH_DESKTOP
                  : FALLING_BLOCK_WIDTH_DESKTOP;
                const height = isMobile
                  ? block.type === "sliding"
                    ? 30
                    : 40
                  : block.type === "sliding"
                  ? SLIDING_BLOCK_HEIGHT_DESKTOP
                  : FALLING_BLOCK_HEIGHT_DESKTOP;
                const colorClass =
                  block.type === "falling"
                    ? "border-red-500 text-red-400 shadow-red-500/50"
                    : "border-purple-600 text-purple-400 shadow-purple-600/50";
                return (
                  <div
                    key={block.id}
                    className={`absolute z-20 rounded-md border-2 font-mono font-bold flex items-center justify-center p-1 bg-black/50 shadow-lg ${colorClass}`}
                    style={{
                      width,
                      height,
                      left: block.x,
                      top: block.y,
                      fontSize: isMobile ? "1rem" : "1.2rem",
                    }}
                  >
                    {block.text}
                  </div>
                );
              })}
            </>
          ) : (
            <motion.div
              className="absolute font-itim inset-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 z-40 p-2 sm:p-4 text-center"
              key={gameState}
              variants={pageContainerVariants}
              initial="hidden"
              animate="show"
            >
              {gameState === "selecting" && (
                <>
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6"
                  >
                    Choose Your Character
                  </motion.h2>
                  <motion.div
                    variants={itemVariants}
                    className="hidden lg:flex gap-x-8"
                  >
                    {characters.map((char) => (
                      <div
                        key={char.name}
                        onClick={() => handleCharacterSelect(char)}
                        className="flex flex-col items-center p-4 rounded-lg bg-gray-700 hover:bg-[#5D4037] cursor-pointer transition-all transform hover:scale-110 w-64 text-center"
                      >
                        <img
                          src={char.image}
                          alt={char.name}
                          className="w-24 h-24 object-contain mb-2"
                        />
                        <h3 className="text-2xl">{char.name}</h3>
                        <p className="text-sm mt-2 text-yellow-300">
                          {char.skill.name}
                        </p>
                        <p className="text-xs mt-1 h-12">
                          {char.skill.description}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    className="lg:hidden flex items-center justify-center w-full"
                  >
                    <button
                      onClick={() => {
                        setCurrentCharacterIndex(
                          (p) => (p - 1 + characters.length) % characters.length
                        );
                      }}
                      className="text-3xl sm:text-4xl p-2 sm:p-4 opacity-70 hover:opacity-100"
                    >
                      ◀
                    </button>
                    <div
                      onClick={() =>
                        handleCharacterSelect(characters[currentCharacterIndex])
                      }
                      className="flex flex-col items-center p-2 sm:p-4 rounded-lg bg-gray-700 cursor-pointer mx-2 sm:mx-4 w-48 text-center"
                    >
                      <img
                        src={characters[currentCharacterIndex].image}
                        alt={characters[currentCharacterIndex].name}
                        className="w-20 h-20 sm:w-28 sm:h-28 object-contain mb-2"
                      />
                      <h3 className="text-lg sm:text-2xl">
                        {characters[currentCharacterIndex].name}
                      </h3>
                      <p className="text-xs mt-1 text-yellow-300">
                        {characters[currentCharacterIndex].skill.name}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentCharacterIndex(
                          (p) => (p + 1) % characters.length
                        );
                      }}
                      className="text-3xl sm:text-4xl p-2 sm:p-4 opacity-70 hover:opacity-100"
                    >
                      ▶
                    </button>
                  </motion.div>
                </>
              )}
              {gameState === "gameOver" && (
                <>
                  <motion.h2
                    variants={itemVariants}
                    className="text-3xl sm:text-4xl md:text-5xl text-red-500"
                  >
                    Game Over
                  </motion.h2>
                  <motion.p
                    variants={itemVariants}
                    className="text-xl sm:text-2xl mt-4"
                  >
                    Your Score: {score}
                  </motion.p>
                  <motion.div
                    variants={itemVariants}
                    className="flex gap-x-4 mt-6 sm:mt-8"
                  >
                    <button
                      onClick={backToMainMenu}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 text-lg sm:text-xl md:text-2xl rounded-lg"
                    >
                      Menu
                    </button>
                    <button
                      onClick={() => startGame()}
                      className="bg-[#5D4037] hover:bg-opacity-90 text-white font-bold py-2 px-6 text-lg sm:text-xl md:text-2xl rounded-lg"
                    >
                      Retry
                    </button>
                  </motion.div>
                </>
              )}
              {gameState === "waiting" && (
                <>
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl sm:text-3xl md:text-4xl"
                  >
                    Get Ready!
                  </motion.h2>
                  <motion.p
                    variants={itemVariants}
                    className="text-base sm:text-lg md:text-xl mt-2"
                  >
                    Hindari semua beban pikiran.
                    <br />
                    'A'/'D' untuk gerak, Spasi untuk Lompat, 'E' untuk Skill.
                  </motion.p>
                  <motion.button
                    variants={itemVariants}
                    onClick={showCharacterSelection}
                    className="mt-6 sm:mt-8 bg-[#5D4037] hover:bg-opacity-90 text-white font-bold py-2 px-6 text-lg sm:text-xl md:text-2xl rounded-lg"
                  >
                    Play
                  </motion.button>
                </>
              )}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-xl sm:text-2xl mt-2"
        >
          Score: {score}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-2 sm:mt-4 w-full max-w-md flex justify-between items-center px-2 sm:px-4 lg:hidden"
        >
          <Joystick
            size={100}
            baseColor="#4A5568"
            stickColor="#5D4037"
            move={handleJoystickMove}
            stop={handleJoystickStop}
          />
          <div className="flex gap-x-2 sm:gap-x-4">
            <button
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full font-bold text-lg sm:text-xl transition-all duration-300 flex justify-center items-center ${
                skillReady && selectedCharacter?.skill.duration > 0
                  ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/50"
                  : "bg-gray-600 text-gray-400"
              }`}
              onClick={handleActivateSkill}
              disabled={!skillReady || selectedCharacter?.skill.duration === 0}
            >
              {skillReady ? "SKILL" : `${skillCooldownTime}s`}
            </button>
            <button
              className="w-16 h-16 sm:w-20 sm:h-20 bg-[#5D4037] rounded-full text-3xl sm:text-4xl active:bg-opacity-80"
              onTouchStart={handleJump}
              onMouseDown={(e) => {
                e.preventDefault();
                handleJump();
              }}
            >
              {" "}
              ▲{" "}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Games;
