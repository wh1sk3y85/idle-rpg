const STORAGE_KEY = "emberwake-idle-save-v2";
const LEGACY_STORAGE_KEY = "emberwake-idle-save-v1";
const TICK_MS = 100;
const RENDER_MS = 250;
const SAVE_MS = 5000;
const GATHER_INTERVAL_S = 1;
const RESOURCE_CAP = 9999;
const OFFLINE_CAP_MS = 1000 * 60 * 60 * 6;
const zoneArt = {
  fen: "./assets/backgrounds/whispering-fen.svg",
  cinderwood: "./assets/backgrounds/cinderwood.svg",
  "red-trail": "./assets/backgrounds/red-trail.svg",
  "dread-marsh": "./assets/backgrounds/whispering-fen.svg",
  sanctum: "./assets/backgrounds/red-trail.svg",
  "storm-peaks": "./assets/backgrounds/cinderwood.svg",
  abyss: "./assets/backgrounds/red-trail.svg",
};
const enemyArt = {
  slime: "./assets/enemies/slime.svg",
  bogling: "./assets/enemies/bogling.svg",
  wolf: "./assets/enemies/wolf.svg",
  boar: "./assets/enemies/boar.svg",
  moth: "./assets/enemies/moth.svg",
  bandit: "./assets/enemies/bandit.svg",
  raider: "./assets/enemies/raider.svg",
  golem: "./assets/enemies/golem.svg",
  stalker: "./assets/enemies/wolf.svg",
  revenant: "./assets/enemies/bandit.svg",
  bat: "./assets/enemies/moth.svg",
  knight: "./assets/enemies/bandit.svg",
  watcher: "./assets/enemies/golem.svg",
  wisp: "./assets/enemies/moth.svg",
  roc: "./assets/enemies/moth.svg",
  giant: "./assets/enemies/golem.svg",
  drake: "./assets/enemies/wolf.svg",
  abyssKnight: "./assets/enemies/bandit.svg",
  hydra: "./assets/enemies/golem.svg",
  phoenix: "./assets/enemies/moth.svg",
};

const zones = [
  {
    id: "fen",
    name: "Whispering Fen",
    unlockLevel: 1,
    description: "Low marshland where soft creatures and stray essence drift close to camp.",
    enemies: [
      {
        id: "slime",
        name: "Moss Slime",
        level: 1,
        maxHealth: 34,
        attack: 5,
        defense: 1,
        evasion: 1,
        xpReward: 6,
        goldReward: 2,
        drops: [
          { resource: "essence", amount: 1, chance: 0.65 },
          { resource: "fiber", amount: 1, chance: 0.3 },
        ],
      },
      {
        id: "bogling",
        name: "Bogling",
        level: 5,
        maxHealth: 58,
        attack: 8,
        defense: 3,
        evasion: 5,
        xpReward: 9,
        goldReward: 3,
        drops: [
          { resource: "fiber", amount: 1, chance: 0.85 },
          { resource: "essence", amount: 1, chance: 0.45 },
        ],
      },
    ],
  },
  {
    id: "cinderwood",
    name: "Cinderwood",
    unlockLevel: 15,
    description: "A scorched forest where predators stalk the edge of old logging lines.",
    enemies: [
      {
        id: "wolf",
        name: "Ash Wolf",
        level: 15,
        maxHealth: 180,
        attack: 18,
        defense: 8,
        evasion: 10,
        xpReward: 19,
        goldReward: 5,
        drops: [
          { resource: "hide", amount: 1, chance: 0.75 },
          { resource: "fang", amount: 1, chance: 0.45 },
        ],
      },
      {
        id: "boar",
        name: "Ember Boar",
        level: 20,
        maxHealth: 240,
        attack: 24,
        defense: 12,
        evasion: 8,
        xpReward: 24,
        goldReward: 6,
        drops: [
          { resource: "hide", amount: 1, chance: 0.65 },
          { resource: "emberCore", amount: 1, chance: 0.28 },
        ],
      },
      {
        id: "moth",
        name: "Cinder Moth",
        level: 25,
        maxHealth: 190,
        attack: 21,
        defense: 7,
        evasion: 22,
        xpReward: 27,
        goldReward: 6,
        requiredWeaponTypes: ["bow"],
        drops: [
          { resource: "fiber", amount: 1, chance: 0.75 },
          { resource: "essence", amount: 1, chance: 0.5 },
        ],
      },
    ],
  },
  {
    id: "red-trail",
    name: "Red Trail",
    unlockLevel: 30,
    description: "Hard roads and harder foes. Raiders carry the parts for stronger field kits.",
    enemies: [
      {
        id: "bandit",
        name: "Dust Bandit",
        level: 30,
        maxHealth: 360,
        attack: 32,
        defense: 16,
        evasion: 18,
        xpReward: 34,
        goldReward: 8,
        drops: [
          { resource: "scrap", amount: 1, chance: 0.45 },
          { resource: "essence", amount: 1, chance: 0.25 },
        ],
      },
      {
        id: "raider",
        name: "Trail Raider",
        level: 35,
        maxHealth: 450,
        attack: 38,
        defense: 20,
        evasion: 21,
        xpReward: 40,
        goldReward: 9,
        drops: [
          { resource: "scrap", amount: 1, chance: 0.5 },
          { resource: "emberCore", amount: 1, chance: 0.28 },
        ],
      },
      {
        id: "golem",
        name: "Shard Golem",
        level: 40,
        maxHealth: 620,
        attack: 42,
        defense: 28,
        evasion: 8,
        magicResist: -2,
        xpReward: 48,
        goldReward: 10,
        drops: [
          { resource: "scrap", amount: 1, chance: 0.55 },
          { resource: "emberCore", amount: 1, chance: 0.35 },
        ],
      },
    ],
  },
  {
    id: "dread-marsh",
    name: "Dread Marsh",
    unlockLevel: 45,
    description: "Deep rotwater where old hunters sink and stranger things keep moving after dark.",
    enemies: [
      {
        id: "stalker",
        name: "Mirefang Stalker",
        level: 45,
        maxHealth: 860,
        attack: 50,
        defense: 32,
        evasion: 24,
        xpReward: 56,
        goldReward: 12,
        drops: [
          { resource: "shadowPelt", amount: 1, chance: 0.52 },
          { resource: "venomGland", amount: 1, chance: 0.36 },
        ],
      },
      {
        id: "revenant",
        name: "Bog Revenant",
        level: 50,
        maxHealth: 1040,
        attack: 56,
        defense: 38,
        evasion: 18,
        magicResist: -3,
        xpReward: 64,
        goldReward: 13,
        drops: [
          { resource: "graveDust", amount: 1, chance: 0.58 },
          { resource: "venomGland", amount: 1, chance: 0.32 },
        ],
      },
      {
        id: "bat",
        name: "Shriek Bat",
        level: 55,
        maxHealth: 900,
        attack: 54,
        defense: 26,
        evasion: 34,
        xpReward: 70,
        goldReward: 14,
        requiredWeaponTypes: ["bow"],
        drops: [
          { resource: "shadowPelt", amount: 1, chance: 0.44 },
          { resource: "graveDust", amount: 1, chance: 0.38 },
        ],
      },
    ],
  },
  {
    id: "sanctum",
    name: "Sunken Sanctum",
    unlockLevel: 60,
    description: "Drowned halls still guarded by steel, wards, and hungry lights in the deep.",
    enemies: [
      {
        id: "knight",
        name: "Sanctum Knight",
        level: 60,
        maxHealth: 1260,
        attack: 64,
        defense: 48,
        evasion: 26,
        xpReward: 78,
        goldReward: 16,
        drops: [
          { resource: "wardedSteel", amount: 1, chance: 0.48 },
          { resource: "relicFragment", amount: 1, chance: 0.4 },
        ],
      },
      {
        id: "watcher",
        name: "Rune Watcher",
        level: 65,
        maxHealth: 1160,
        attack: 68,
        defense: 40,
        evasion: 32,
        magicResist: -4,
        xpReward: 86,
        goldReward: 17,
        drops: [
          { resource: "prismShard", amount: 1, chance: 0.5 },
          { resource: "relicFragment", amount: 1, chance: 0.36 },
        ],
      },
      {
        id: "wisp",
        name: "Lantern Wisp",
        level: 70,
        maxHealth: 1080,
        attack: 66,
        defense: 34,
        evasion: 42,
        xpReward: 94,
        goldReward: 18,
        requiredWeaponTypes: ["bow"],
        drops: [
          { resource: "prismShard", amount: 1, chance: 0.56 },
          { resource: "wardedSteel", amount: 1, chance: 0.22 },
        ],
      },
    ],
  },
  {
    id: "storm-peaks",
    name: "Storm Peaks",
    unlockLevel: 75,
    description: "Knife-edged ridges where thunder-fed beasts nest above the old roads.",
    enemies: [
      {
        id: "roc",
        name: "Thunder Roc",
        level: 75,
        maxHealth: 1480,
        attack: 78,
        defense: 44,
        evasion: 48,
        xpReward: 104,
        goldReward: 20,
        requiredWeaponTypes: ["bow"],
        drops: [
          { resource: "stormFeather", amount: 1, chance: 0.54 },
          { resource: "skyIron", amount: 1, chance: 0.28 },
        ],
      },
      {
        id: "giant",
        name: "Frost Giant",
        level: 80,
        maxHealth: 1860,
        attack: 84,
        defense: 58,
        evasion: 22,
        xpReward: 114,
        goldReward: 22,
        drops: [
          { resource: "giantBone", amount: 1, chance: 0.52 },
          { resource: "skyIron", amount: 1, chance: 0.42 },
        ],
      },
      {
        id: "drake",
        name: "Peak Drake",
        level: 85,
        maxHealth: 1720,
        attack: 88,
        defense: 52,
        evasion: 34,
        xpReward: 124,
        goldReward: 24,
        drops: [
          { resource: "stormFeather", amount: 1, chance: 0.46 },
          { resource: "giantBone", amount: 1, chance: 0.4 },
        ],
      },
    ],
  },
  {
    id: "abyss",
    name: "Ember Abyss",
    unlockLevel: 90,
    description: "The last burn beneath the world, where ruin-metal and immortal fire collect.",
    enemies: [
      {
        id: "abyssKnight",
        name: "Abyssal Knight",
        level: 90,
        maxHealth: 2240,
        attack: 94,
        defense: 70,
        evasion: 38,
        xpReward: 138,
        goldReward: 26,
        drops: [
          { resource: "abyssalAlloy", amount: 1, chance: 0.48 },
          { resource: "voidCore", amount: 1, chance: 0.34 },
        ],
      },
      {
        id: "hydra",
        name: "Cinder Hydra",
        level: 95,
        maxHealth: 2580,
        attack: 100,
        defense: 62,
        evasion: 30,
        xpReward: 150,
        goldReward: 28,
        drops: [
          { resource: "hydraScale", amount: 1, chance: 0.5 },
          { resource: "voidCore", amount: 1, chance: 0.38 },
        ],
      },
      {
        id: "phoenix",
        name: "Phoenix Shade",
        level: 100,
        maxHealth: 2060,
        attack: 92,
        defense: 50,
        evasion: 56,
        magicResist: -5,
        xpReward: 162,
        goldReward: 30,
        requiredWeaponTypes: ["bow"],
        drops: [
          { resource: "phoenixAsh", amount: 1, chance: 0.55 },
          { resource: "hydraScale", amount: 1, chance: 0.24 },
        ],
      },
    ],
  },
];

const skills = [
  {
    id: "prospecting",
    name: "Prospecting",
    unlockLevel: 1,
    xpPerAction: 0,
    description: "Prospect richer veins as your calculator improves.",
    tiers: [
      { id: "shallow-vein", label: "Shallow Vein", nodeHealth: 5, unlockGatherDamage: 1, rewards: { gold: 1 } },
      { id: "silver-vein", label: "Silver Vein", nodeHealth: 25, unlockGatherDamage: 5, rewards: { gold: 3 } },
      { id: "sunsteel-vein", label: "Sunsteel Vein", nodeHealth: 125, unlockGatherDamage: 25, rewards: { gold: 9 } },
      { id: "astral-vein", label: "Astral Vein", nodeHealth: 625, unlockGatherDamage: 125, rewards: { gold: 27 } },
    ],
  },
  {
    id: "foraging",
    name: "Foraging",
    unlockLevel: 1,
    xpPerAction: 1,
    description: "Harvest stronger medicinal flora as your scythe improves.",
    tiers: [
      { id: "herbs", label: "Herb Patch", resource: "herbs", nodeHealth: 5, unlockGatherDamage: 1 },
      { id: "bloomroot", label: "Bloomroot Patch", resource: "bloomroot", nodeHealth: 25, unlockGatherDamage: 5 },
      { id: "ghostleaf", label: "Ghostleaf Patch", resource: "ghostleaf", nodeHealth: 125, unlockGatherDamage: 25 },
      { id: "starflower", label: "Starflower Patch", resource: "starflower", nodeHealth: 625, unlockGatherDamage: 125 },
    ],
  },
  {
    id: "woodcutting",
    name: "Woodcutting",
    unlockLevel: 1,
    xpPerAction: 1,
    description: "Cut stronger timber as your axe gather power rises.",
    tiers: [
      { id: "wood", label: "Pine Tree", resource: "wood", nodeHealth: 5, unlockGatherDamage: 1 },
      { id: "oakLogs", label: "Oak Tree", resource: "oakLogs", nodeHealth: 25, unlockGatherDamage: 5 },
      { id: "walnutLogs", label: "Walnut Tree", resource: "walnutLogs", nodeHealth: 125, unlockGatherDamage: 25 },
      { id: "ironbarkLogs", label: "Ironbark Tree", resource: "ironbarkLogs", nodeHealth: 625, unlockGatherDamage: 125 },
    ],
  },
  {
    id: "mining",
    name: "Mining",
    unlockLevel: 2,
    xpPerAction: 1,
    description: "Mine deeper ore tiers as your hammer gather power rises.",
    tiers: [
      { id: "ironOre", label: "Iron Vein", resource: "ironOre", nodeHealth: 5, unlockGatherDamage: 1 },
      { id: "steelOre", label: "Steel Vein", resource: "steelOre", nodeHealth: 25, unlockGatherDamage: 5 },
      { id: "mythrilOre", label: "Mythril Vein", resource: "mythrilOre", nodeHealth: 125, unlockGatherDamage: 25 },
      { id: "aetherOre", label: "Aether Vein", resource: "aetherOre", nodeHealth: 625, unlockGatherDamage: 125 },
    ],
  },
];

const gatherCostTierMap = {
  wood: ["wood", "oakLogs", "walnutLogs", "ironbarkLogs"],
  herbs: ["herbs", "bloomroot", "ghostleaf", "starflower"],
  ironOre: ["ironOre", "steelOre", "mythrilOre", "aetherOre"],
};

const combatUpgradeTracks = {
  weapon: {
    sword: [
      { essence: 1 },
      { hide: 1, scrap: 1 },
      { shadowPelt: 1, graveDust: 1 },
      { wardedSteel: 1, skyIron: 1 },
      { abyssalAlloy: 1, hydraScale: 1 },
    ],
    shield: [
      { hide: 1 },
      { emberCore: 1, scrap: 1 },
      { shadowPelt: 1, graveDust: 1 },
      { wardedSteel: 2, relicFragment: 1 },
      { abyssalAlloy: 1, giantBone: 1 },
    ],
    bow: [
      { fiber: 1, essence: 1 },
      { fang: 1, emberCore: 1 },
      { venomGland: 1, shadowPelt: 1 },
      { stormFeather: 1, skyIron: 1 },
      { stormFeather: 2, phoenixAsh: 1 },
    ],
    staff: [
      { essence: 2 },
      { emberCore: 1, scrap: 1 },
      { graveDust: 1, prismShard: 1 },
      { relicFragment: 1, prismShard: 1 },
      { voidCore: 1, phoenixAsh: 1 },
    ],
    knife: [
      { fiber: 1 },
      { fang: 1, scrap: 1 },
      { venomGland: 1, graveDust: 1 },
      { stormFeather: 1, prismShard: 1 },
      { hydraScale: 1, voidCore: 1 },
    ],
    spear: [
      { fang: 1, essence: 1 },
      { emberCore: 1, scrap: 1 },
      { shadowPelt: 1, venomGland: 1 },
      { skyIron: 1, giantBone: 1 },
      { hydraScale: 1, phoenixAsh: 1 },
    ],
  },
  tool: {
    calculator: [
      { essence: 2 },
      { scrap: 1, emberCore: 1 },
      { prismShard: 1, graveDust: 1 },
      { relicFragment: 1, stormFeather: 1 },
      { voidCore: 1, phoenixAsh: 1 },
    ],
    scythe: [
      { fiber: 1, fang: 1 },
      { hide: 1, emberCore: 1 },
      { venomGland: 1, shadowPelt: 1 },
      { stormFeather: 1, giantBone: 1 },
      { hydraScale: 1, phoenixAsh: 1 },
    ],
    axe: [
      { hide: 1, fang: 1 },
      { scrap: 1, emberCore: 1 },
      { shadowPelt: 1, graveDust: 1 },
      { skyIron: 1, giantBone: 1 },
      { abyssalAlloy: 1, hydraScale: 1 },
    ],
    hammer: [
      { scrap: 1, emberCore: 1 },
      { scrap: 2, emberCore: 1 },
      { prismShard: 1, wardedSteel: 1 },
      { wardedSteel: 1, skyIron: 1 },
      { abyssalAlloy: 1, voidCore: 1 },
    ],
  },
  gear: {
    head: [
      { essence: 1, fiber: 1 },
      { fang: 1, emberCore: 1 },
      { graveDust: 1, prismShard: 1 },
      { relicFragment: 1, prismShard: 1 },
      { voidCore: 1, phoenixAsh: 1 },
    ],
    chest: [
      { hide: 1, emberCore: 1 },
      { scrap: 1, emberCore: 1 },
      { shadowPelt: 1, wardedSteel: 1 },
      { wardedSteel: 1, giantBone: 1 },
      { abyssalAlloy: 1, hydraScale: 1 },
    ],
    arms: [
      { hide: 1, fang: 1 },
      { scrap: 1, emberCore: 1 },
      { shadowPelt: 1, venomGland: 1 },
      { stormFeather: 1, skyIron: 1 },
      { hydraScale: 1, phoenixAsh: 1 },
    ],
    feet: [
      { fiber: 1, fang: 1 },
      { hide: 1, scrap: 1 },
      { venomGland: 1, graveDust: 1 },
      { stormFeather: 1, skyIron: 1 },
      { giantBone: 1, hydraScale: 1 },
    ],
  },
  accessory: {
    goldRing: [
      { essence: 1 },
      { scrap: 1, emberCore: 1 },
      { relicFragment: 1, prismShard: 1 },
      { stormFeather: 1, skyIron: 1 },
      { voidCore: 1, phoenixAsh: 1 },
    ],
    recoveryCharm: [
      { fiber: 1, essence: 1 },
      { fang: 1, emberCore: 1 },
      { graveDust: 1, venomGland: 1 },
      { relicFragment: 1, stormFeather: 1 },
      { phoenixAsh: 1, hydraScale: 1 },
    ],
    scavengerCharm: [
      { fiber: 1, fang: 1 },
      { hide: 1, scrap: 1 },
      { shadowPelt: 1, venomGland: 1 },
      { stormFeather: 1, giantBone: 1 },
      { hydraScale: 1, voidCore: 1 },
    ],
  },
};

function getToolGatherDamage(level) {
  if (!level || level <= 0) {
    return 1;
  }
  if (level <= 25) {
    return level;
  }
  if (level <= 75) {
    return 25 + (level - 25) * 2;
  }
  return 125 + (level - 75) * 4;
}

function getGatherTierIndexForLevel(level) {
  if (level > 60) {
    return 3;
  }
  if (level > 40) {
    return 2;
  }
  if (level > 20) {
    return 1;
  }
  return 0;
}

function getCombatTierIndexForLevel(level) {
  if (level > 80) {
    return 4;
  }
  if (level > 60) {
    return 3;
  }
  if (level > 40) {
    return 2;
  }
  if (level > 20) {
    return 1;
  }
  return 0;
}

function mergeCosts(...costGroups) {
  return costGroups.reduce((combined, costs) => {
    Object.entries(costs || {}).forEach(([resource, amount]) => {
      combined[resource] = (combined[resource] || 0) + amount;
    });
    return combined;
  }, {});
}

function getRecipeCombatTrack(recipe) {
  return combatUpgradeTracks[recipe.type]?.[recipe.id] || [];
}

function getSkillNode(skill, gatherDamage = getToolProfile(undefined, skill.id).gatherDamage) {
  const tiers = skill?.tiers || [];
  if (tiers.length === 0) {
    return null;
  }
  return tiers.reduce((best, tier) => (gatherDamage >= tier.unlockGatherDamage ? tier : best), tiers[0]);
}

function getNextSkillNode(skill, gatherDamage = getToolProfile(undefined, skill.id).gatherDamage) {
  return (skill?.tiers || []).find((tier) => tier.unlockGatherDamage > gatherDamage) || null;
}

function getNodeRewards(skill, node) {
  if (!skill || !node) {
    return {};
  }

  if (node.rewards) {
    return { ...node.rewards };
  }

  const rewards = { [node.resource]: 1 };
  const tierIndex = (skill.tiers || []).findIndex((tier) => tier.id === node.id);
  if (tierIndex > 0 && skill.id !== "prospecting") {
    for (let index = 0; index < tierIndex; index += 1) {
      const previousTier = skill.tiers[index];
      if (previousTier?.resource) {
        rewards[previousTier.resource] = (rewards[previousTier.resource] || 0) + 5;
      }
    }
  }

  return rewards;
}

function syncGatheringNodeState(skill = skills.find((entry) => entry.id === state.activeSkill)) {
  if (!skill) {
    return null;
  }

  const node = getSkillNode(skill);
  const nodeKey = `${skill.id}:${node.id}`;
  if (state.gathering.nodeKey !== nodeKey) {
    state.gathering.nodeKey = nodeKey;
    state.gathering.nodeHealth = node.nodeHealth;
    state.gathering.respawnDelay = 0;
    state.gathering.actionTimer = 0;
  } else if (!state.gathering.nodeHealth || state.gathering.nodeHealth > node.nodeHealth) {
    state.gathering.nodeHealth = node.nodeHealth;
  }

  return node;
}

const healingItems = [
  {
    id: "remedy",
    name: "Herbal Remedy",
    unlockLevel: 1,
    healAmount: 10,
    healPercent: 0,
    triggerRatio: 0.05,
    autoCraftLimit: 10,
    costs: { herbs: 2, gold: 1 },
    description: "Last-second relief. Activates at 5% HP and restores 10 HP.",
  },
  {
    id: "bandage",
    name: "Field Bandage",
    unlockLevel: 1,
    healAmount: 15,
    healPercent: 0.15,
    triggerRatio: 0.25,
    autoCraftLimit: 10,
    costs: { herbs: 1, fiber: 1, gold: 20 },
    description: "Cheap and fast. Activates at 25% HP and restores 15% + 15 HP.",
  },
  {
    id: "draught",
    name: "Hunter's Draught",
    unlockLevel: 3,
    healAmount: 25,
    healPercent: 0.25,
    triggerRatio: 0.4,
    autoCraftLimit: 10,
    costs: { herbs: 2, hide: 1, fang: 1, gold: 50 },
    description: "A stronger field mix. Activates at 40% HP and restores 25% + 25 HP.",
  },
  {
    id: "phial",
    name: "Ember Phial",
    unlockLevel: 6,
    healAmount: 35,
    healPercent: 0.35,
    triggerRatio: 0.55,
    autoCraftLimit: 10,
    costs: { herbs: 3, ironOre: 1, emberCore: 1, scrap: 1, gold: 90 },
    description: "A high-end stabilizer. Activates at 55% HP and restores 35% + 35 HP.",
  },
];

const weaponCatalog = [
  { id: "hands", name: "Bare Hands", weaponType: "hands", baseDamage: 2, baseDelay: 1.05, crafted: true, growthLabel: "Unarmed" },
  { id: "sword", name: "Iron Blade", weaponType: "sword", baseDamage: 4, baseDelay: 1.05, growthLabel: "Strength Blade" },
  { id: "shield", name: "Tower Shield", weaponType: "shield", baseDamage: 5, baseDelay: 1.25, growthLabel: "Defense Bulwark" },
  { id: "bow", name: "Marsh Bow", weaponType: "bow", baseDamage: 7, baseDelay: 1.2, growthLabel: "Dexterity Bow" },
  { id: "staff", name: "Fen Staff", weaponType: "staff", baseDamage: 8, baseDelay: 1.35, growthLabel: "Magic Focus" },
  { id: "knife", name: "Camp Knife", weaponType: "knife", baseDamage: 4, baseDelay: 0.85, growthLabel: "Quick Blade" },
  { id: "spear", name: "Cinder Pike", weaponType: "spear", baseDamage: 8, baseDelay: 1.25, growthLabel: "Critical Pike" },
];

const toolCatalog = [
  { id: "hands", name: "No Tool", toolType: "none", crafted: true, growthLabel: "No gathering bonus or combat penalty." },
  { id: "calculator", name: "Mysterious Calculator", toolType: "prospecting", growthLabel: "Boosts prospecting, lowers combat damage." },
  { id: "scythe", name: "Fen Scythe", toolType: "foraging", growthLabel: "Boosts foraging, lowers combat attack." },
  { id: "axe", name: "Fell Axe", toolType: "woodcutting", growthLabel: "Boosts woodcutting, lowers combat attack." },
  { id: "hammer", name: "Trail Hammer", toolType: "mining", growthLabel: "Boosts mining, lowers combat attack." },
];

const recipes = [
  {
    id: "remedy",
    name: "Herbal Remedy",
    description: "Activates at 5% HP and restores 10 HP.",
    costs: { herbs: 2, gold: 1 },
    output: { remedy: 1 },
    type: "healing",
    craftSeconds: 3,
  },
  {
    id: "bandage",
    name: "Field Bandage",
    description: "Activates at 25% HP and restores 15% + 15 HP.",
    costs: { herbs: 1, fiber: 1, gold: 20 },
    output: { bandage: 1 },
    type: "healing",
    craftSeconds: 5,
  },
  {
    id: "draught",
    name: "Hunter's Draught",
    description: "Activates at 40% HP and restores 25% + 25 HP.",
    costs: { herbs: 2, hide: 1, fang: 1, gold: 50 },
    output: { draught: 1 },
    type: "healing",
    craftSeconds: 8,
  },
  {
    id: "phial",
    name: "Ember Phial",
    description: "Activates at 55% HP and restores 35% + 35 HP.",
    costs: { herbs: 3, ironOre: 1, emberCore: 1, scrap: 1, gold: 90 },
    output: { phial: 1 },
    type: "healing",
    craftSeconds: 10,
  },
  {
    id: "sword",
    name: "Iron Blade",
    description: "Unlocks the sword weapon type. A steady all-round melee option.",
    costs: { wood: 4, ironOre: 3, essence: 1, gold: 160 },
    weaponType: "sword",
    unlock: "Equip Iron Blade (Strength Weapon)",
    maxCrafts: 1,
    type: "weapon",
  },
  {
    id: "shield",
    name: "Tower Shield",
    description: "Unlocks a defensive weapon style for high-damage encounters.",
    costs: { wood: 5, ironOre: 4, hide: 2, gold: 190 },
    weaponType: "shield",
    unlock: "Equip Tower Shield (Defense Growth)",
    maxCrafts: 1,
    type: "weapon",
  },
  {
    id: "bow",
    name: "Marsh Bow",
    description: "Unlocks the bow weapon type needed for flying targets.",
    costs: { wood: 5, fiber: 3, essence: 2, gold: 200 },
    weaponType: "bow",
    unlock: "Equip Marsh Bow (Dexterity Weapon)",
    maxCrafts: 1,
    type: "weapon",
  },
  {
    id: "staff",
    name: "Fen Staff",
    description: "Unlocks a magic-focused weapon that pressures armored enemies.",
    costs: { wood: 4, essence: 4, herbs: 2, gold: 220 },
    weaponType: "staff",
    unlock: "Equip Fen Staff (Magic Growth)",
    maxCrafts: 1,
    type: "weapon",
  },
  {
    id: "knife",
    name: "Camp Knife",
    description: "Unlocks the speed weapon type for faster attack cycles and DPS scaling.",
    costs: { wood: 2, ironOre: 2, essence: 2, gold: 320 },
    weaponType: "knife",
    unlock: "Equip Camp Knife (Speed Growth)",
    maxCrafts: 1,
    type: "weapon",
  },
  {
    id: "spear",
    name: "Cinder Pike",
    description: "Unlocks the spear weapon type for heavier reach and pressure.",
    costs: { wood: 6, ironOre: 6, fang: 2, essence: 2, gold: 360 },
    weaponType: "spear",
    unlock: "Equip Cinder Pike (Crit Weapon)",
    maxCrafts: 1,
    type: "weapon",
  },
  {
    id: "calculator",
    name: "Mysterious Calculator",
    description: "Unlocks the prospecting tool slot for improved gold gathering at a combat cost.",
    costs: { wood: 4, ironOre: 3, essence: 4, scrap: 1, gold: 320 },
    toolType: "prospecting",
    unlock: "Equip Mysterious Calculator (Prospecting Tool)",
    maxCrafts: 1,
    type: "tool",
  },
  {
    id: "hammer",
    name: "Trail Hammer",
    description: "Unlocks the mining tool slot for faster ore gathering at a combat cost.",
    costs: { wood: 8, ironOre: 8, scrap: 3, emberCore: 1, gold: 520 },
    toolType: "mining",
    unlock: "Equip Trail Hammer (Mining Tool)",
    maxCrafts: 1,
    type: "tool",
  },
  {
    id: "axe",
    name: "Fell Axe",
    description: "Unlocks the woodcutting tool slot for faster lumber gathering at a combat cost.",
    costs: { wood: 12, ironOre: 5, hide: 3, fang: 1, gold: 460 },
    toolType: "woodcutting",
    unlock: "Equip Fell Axe (Woodcutting Tool)",
    maxCrafts: 1,
    type: "tool",
  },
  {
    id: "scythe",
    name: "Fen Scythe",
    description: "Unlocks the foraging tool slot for faster herb gathering at a combat cost.",
    costs: { wood: 6, ironOre: 4, fiber: 4, herbs: 4, essence: 2, gold: 420 },
    toolType: "foraging",
    unlock: "Equip Fen Scythe (Foraging Tool)",
    maxCrafts: 1,
    type: "tool",
  },
  {
    id: "head",
    name: "Mystic Hood",
    description: "Upgradeable head gear. Grants HP, DEF, MAG, and DEX each level.",
    costs: { herbs: 2, fiber: 1, essence: 2, gold: 180 },
    upgrade: { maxHealth: 4, defense: 1, magic: 2, dexterity: 1 },
    type: "gear",
  },
  {
    id: "chest",
    name: "Ember Mail",
    description: "Upgradeable chest gear. Grants HP, DEF, STR, DEX, and MAG each level.",
    costs: { ironOre: 6, hide: 3, emberCore: 1, gold: 340 },
    upgrade: { maxHealth: 8, defense: 2, strength: 1, dexterity: 1, magic: 1 },
    type: "gear",
  },
  {
    id: "arms",
    name: "Ranger Bracers",
    description: "Upgradeable arm gear. Grants HP, DEF, STR, and MAG each level.",
    costs: { hide: 2, wood: 3, fiber: 1, gold: 220 },
    upgrade: { maxHealth: 4, defense: 1, strength: 2, magic: 1 },
    type: "gear",
  },
  {
    id: "feet",
    name: "Scout Greaves",
    description: "Upgradeable foot gear. Grants HP, DEF, DEX, and STR each level.",
    costs: { hide: 2, fiber: 2, wood: 2, gold: 220 },
    upgrade: { maxHealth: 4, defense: 1, dexterity: 2, strength: 1 },
    type: "gear",
  },
  {
    id: "goldRing",
    name: "Gilded Ring",
    description: "Upgradeable accessory. Increases gold gained from all sources.",
    costs: { gold: 180, essence: 1, ironOre: 1 },
    accessoryBonus: { goldFind: 0.01 },
    type: "accessory",
  },
  {
    id: "recoveryCharm",
    name: "Recovery Charm",
    description: "Upgradeable accessory. Improves natural HP regeneration.",
    costs: { herbs: 2, essence: 1, gold: 180 },
    accessoryBonus: { regen: 0.01 },
    type: "accessory",
  },
  {
    id: "scavengerCharm",
    name: "Scavenger Charm",
    description: "Upgradeable accessory. Improves enemy drop rates.",
    costs: { fiber: 2, fang: 1, gold: 180 },
    accessoryBonus: { dropRate: 0.005 },
    type: "accessory",
  },
];

const milestones = [
  {
    id: "first-blood",
    title: "First Blood",
    description: "Defeat your first enemy.",
    check: (state) => state.stats.kills >= 1,
  },
  {
    id: "woodsman",
    title: "Camp Supplier",
    description: "Collect 25 wood.",
    check: (state) => state.resources.wood >= 25,
  },
  {
    id: "field-medic",
    title: "Field Medic",
    description: "Auto-craft your first healing item.",
    check: (state) => state.stats.totalAutoCraftedHealing >= 1,
  },
  {
    id: "survivor",
    title: "Long Haul",
    description: "Reach combat level 15.",
    check: (state) => state.hero.combatLevel >= 15,
  },
];

const resourceMeta = {
  gold: { name: "Gold", icon: "G", precision: 0, description: "A basic currency used at camp." },
  wood: { name: "Pine Logs", icon: "W", precision: 0, description: "Starter lumber cut from young pine trees." },
  oakLogs: { name: "Oak Logs", icon: "Ok", precision: 0, description: "Sturdier timber unlocked by stronger axes." },
  walnutLogs: { name: "Walnut Logs", icon: "Wa", precision: 0, description: "Dense hardwood needed for mid-tier upgrades." },
  ironbarkLogs: { name: "Ironbark Logs", icon: "Ib", precision: 0, description: "Late-tier timber for advanced weapons and tools." },
  ironOre: { name: "Iron Ore", icon: "Fe", precision: 0, description: "A forge-ready metal ore." },
  steelOre: { name: "Steel Ore", icon: "St", precision: 0, description: "A refined ore tier used in stronger forge work." },
  mythrilOre: { name: "Mythril Ore", icon: "My", precision: 0, description: "A rare blue ore for mid-to-late weapon upgrades." },
  aetherOre: { name: "Aether Ore", icon: "Ae", precision: 0, description: "An advanced ore meant for late-stage equipment." },
  herbs: { name: "Herbs", icon: "H", precision: 0, description: "Fresh plants used in field medicine." },
  bloomroot: { name: "Bloomroot", icon: "Br", precision: 0, description: "A potent medicinal root for stronger brews." },
  ghostleaf: { name: "Ghostleaf", icon: "Gl", precision: 0, description: "A rare herb used for higher-tier treatments." },
  starflower: { name: "Starflower", icon: "Sf", precision: 0, description: "A radiant blossom for advanced alchemy." },
  essence: { name: "Essence", icon: "Es", precision: 0, description: "Residual energy taken from marsh creatures." },
  fiber: { name: "Fiber", icon: "Fb", precision: 0, description: "Tough strands pulled from bog growth." },
  hide: { name: "Hide", icon: "Hd", precision: 0, description: "Supple leather cut from hunted beasts." },
  fang: { name: "Fang", icon: "Fg", precision: 0, description: "Predator teeth used in stronger draughts." },
  emberCore: { name: "Ember Core", icon: "Em", precision: 0, description: "A hot core pried from fierce quarry." },
  scrap: { name: "Scrap", icon: "Sc", precision: 0, description: "Recovered parts from raiders and trail gear." },
  shadowPelt: { name: "Shadow Pelt", icon: "Sp", precision: 0, description: "Dark hide stripped from predators in the deep marsh." },
  venomGland: { name: "Venom Gland", icon: "Vg", precision: 0, description: "A toxic sack harvested from mire beasts." },
  graveDust: { name: "Grave Dust", icon: "Gd", precision: 0, description: "Ashen residue that clings to swamp revenants." },
  wardedSteel: { name: "Warded Steel", icon: "Ws", precision: 0, description: "Sanctum metal still etched with old defenses." },
  relicFragment: { name: "Relic Fragment", icon: "Rf", precision: 0, description: "Broken pieces of flooded shrine relics." },
  prismShard: { name: "Prism Shard", icon: "Ps", precision: 0, description: "A refracting crystal dropped by warded constructs." },
  stormFeather: { name: "Storm Feather", icon: "Sf", precision: 0, description: "Charged plumage from thunder-fed peak predators." },
  skyIron: { name: "Sky Iron", icon: "Si", precision: 0, description: "High-altitude ore hardened by ice and lightning." },
  giantBone: { name: "Giant Bone", icon: "Gb", precision: 0, description: "Dense bone fragments from ancient mountain brutes." },
  abyssalAlloy: { name: "Abyssal Alloy", icon: "Aa", precision: 0, description: "Late-stage war metal pulled from abyssal knights." },
  voidCore: { name: "Void Core", icon: "Vc", precision: 0, description: "A dense black heart pulsing with buried heat." },
  hydraScale: { name: "Hydra Scale", icon: "Hs", precision: 0, description: "A furnace-hard scale from deep cinder hydras." },
  phoenixAsh: { name: "Phoenix Ash", icon: "Pa", precision: 0, description: "Rare ember ash that refuses to fully cool." },
  remedy: { name: "Herbal Remedy", icon: "R", precision: 0, description: "A tiny herbal emergency dose. Activates at 5% HP and restores 10 HP." },
  bandage: { name: "Field Bandage", icon: "B", precision: 0, description: "Basic emergency wrapping for low HP. Activates at 25% HP and restores 15% + 15 HP." },
  draught: { name: "Hunter's Draught", icon: "D", precision: 0, description: "A mid-grade heal with a safer trigger. Activates at 40% HP and restores 25% + 25 HP." },
  phial: { name: "Ember Phial", icon: "P", precision: 0, description: "A high-grade reactive heal for tough farms. Activates at 55% HP and restores 35% + 35 HP." },
};

const dom = {
  heroStats: document.getElementById("hero-stats"),
  equipmentSlots: document.getElementById("equipment-slots"),
  heroSummaryLine: document.getElementById("hero-summary-line"),
  heroHpLabel: document.getElementById("hero-hp-label"),
  heroLevelLabel: document.getElementById("hero-level-label"),
  combatXpFill: document.getElementById("combat-xp-fill"),
  combatLevelLabel: document.getElementById("combat-level-label"),
  gatherSummaryLine: document.getElementById("gather-summary-line"),
  gatherCycleLabel: document.getElementById("gather-cycle-label"),
  gatherProgressFill: document.getElementById("gather-progress-fill"),
  craftSummaryLine: document.getElementById("craft-summary-line"),
  craftCycleLabel: document.getElementById("craft-cycle-label"),
  craftProgressFill: document.getElementById("craft-progress-fill"),
  resourceList: document.getElementById("resource-list"),
  encounterButtons: document.getElementById("encounter-buttons"),
  battleLog: document.getElementById("battle-log"),
  battleLogOverlay: document.getElementById("battle-log-overlay"),
  battleArt: document.getElementById("battle-art"),
  combatStatus: document.getElementById("combat-status"),
  autoCombatButton: document.getElementById("auto-combat-button"),
  gearButton: document.getElementById("gear-button"),
  combatButton: document.getElementById("combat-button"),
  gatherButton: document.getElementById("gather-button"),
  craftButton: document.getElementById("craft-button"),
  logToggleButton: document.getElementById("log-toggle-button"),
  closeLogButton: document.getElementById("close-log-button"),
  skillCards: document.getElementById("skill-cards"),
  recipeList: document.getElementById("recipe-list"),
  milestoneList: document.getElementById("milestone-list"),
  resetButton: document.getElementById("reset-button"),
  offlinePill: document.getElementById("offline-pill"),
  menuButton: document.getElementById("menu-button"),
  closeMenuButton: document.getElementById("close-menu-button"),
  overlayShell: document.getElementById("overlay-shell"),
  overlayLabel: document.getElementById("overlay-label"),
  overlayTitle: document.getElementById("overlay-title"),
  menuTabs: document.getElementById("menu-tabs"),
  zoneList: document.getElementById("zone-list"),
  menuTabButtons: [...document.querySelectorAll(".menu-tab-button")],
  menuPanels: [...document.querySelectorAll(".menu-panel")],
};

function baseState() {
  return {
    hero: {
      health: 56,
      maxHealth: 56,
      strength: 5,
      defense: 2,
      magic: 2,
      dexterity: 2,
      critRate: 0,
      attackSpeed: 0,
      combatLevel: 1,
      combatXp: 0,
    },
    resources: {
      gold: 150,
      wood: 0,
      oakLogs: 0,
      walnutLogs: 0,
      ironbarkLogs: 0,
      ironOre: 0,
      steelOre: 0,
      mythrilOre: 0,
      aetherOre: 0,
      herbs: 0,
      bloomroot: 0,
      ghostleaf: 0,
      starflower: 0,
      essence: 0,
      fiber: 0,
      hide: 0,
      fang: 0,
      emberCore: 0,
      scrap: 0,
      shadowPelt: 0,
      venomGland: 0,
      graveDust: 0,
      wardedSteel: 0,
      relicFragment: 0,
      prismShard: 0,
      stormFeather: 0,
      skyIron: 0,
      giantBone: 0,
      abyssalAlloy: 0,
      voidCore: 0,
      hydraScale: 0,
      phoenixAsh: 0,
      remedy: 0,
      bandage: 0,
      draught: 0,
      phial: 0,
    },
    skillProgress: {
      woodcutting: 0,
      mining: 0,
      foraging: 0,
    },
    gathering: {
      nodeHealth: skills[0].tiers[0].nodeHealth,
      respawnDelay: 0,
      actionTimer: 0,
      nodeKey: `${skills[0].id}:${skills[0].tiers[0].id}`,
    },
    activeSkill: "prospecting",
    crafted: {
      bandage: 0,
      draught: 0,
      phial: 0,
      knife: 0,
      sword: 0,
      shield: 0,
      bow: 0,
      staff: 0,
      spear: 0,
      calculator: 0,
      hammer: 0,
      axe: 0,
      scythe: 0,
      head: 0,
      chest: 0,
      arms: 0,
      feet: 0,
      goldRing: 0,
      recoveryCharm: 0,
      scavengerCharm: 0,
    },
    weaponLevels: {
      knife: 0,
      sword: 0,
      shield: 0,
      bow: 0,
      staff: 0,
      spear: 0,
    },
    toolLevels: {
      calculator: 0,
      axe: 0,
      hammer: 0,
      scythe: 0,
    },
    equipment: {
      weapon: "hands",
      tool: "hands",
    },
    combat: {
      selectedZoneId: zones[0].id,
      selectedEnemyId: zones[0].enemies[0].id,
      enemy: createEnemy(zones[0].id, zones[0].enemies[0].id),
      attackTimer: 0,
      autoActive: false,
      autoWanted: false,
    },
    healing: {
      equipped: healingItems[0].id,
    },
    crafting: {
      selectedRecipeId: null,
      progress: 0,
    },
    migrations: {
      gearStatRebalanceV2: false,
    },
    ui: {
      openZones: {},
      openSkills: {},
      openRecipeGroups: {},
    },
    log: ["Your camp is standing. Pick a hunting ground and settle into the grind."],
    stats: {
      kills: 0,
      totalGathered: 0,
      totalCrafted: 0,
      totalAutoCraftedHealing: 0,
      totalHealed: 0,
    },
    lastSavedAt: Date.now(),
    lastTickAt: Date.now(),
  };
}

let state = loadState();

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
  const fresh = baseState();
  if (!raw) {
    return fresh;
  }

  try {
    const parsed = JSON.parse(raw);
    const merged = {
      ...fresh,
      ...parsed,
      hero: { ...fresh.hero, ...parsed.hero },
      resources: { ...fresh.resources, ...parsed.resources },
      skillProgress: { ...fresh.skillProgress, ...parsed.skillProgress },
      gathering: { ...fresh.gathering, ...parsed.gathering },
      crafted: { ...fresh.crafted, ...parsed.crafted },
      weaponLevels: { ...fresh.weaponLevels, ...parsed.weaponLevels },
      toolLevels: { ...fresh.toolLevels, ...parsed.toolLevels },
      equipment: { ...fresh.equipment, ...parsed.equipment },
      healing: { ...fresh.healing, ...parsed.healing },
      crafting: { ...fresh.crafting, ...parsed.crafting },
      migrations: { ...fresh.migrations, ...parsed.migrations },
      ui: {
        ...fresh.ui,
        ...parsed.ui,
        openZones: { ...fresh.ui.openZones, ...(parsed.ui?.openZones || {}) },
        openSkills: { ...fresh.ui.openSkills, ...(parsed.ui?.openSkills || {}) },
        openRecipeGroups: { ...fresh.ui.openRecipeGroups, ...(parsed.ui?.openRecipeGroups || {}) },
      },
      stats: { ...fresh.stats, ...parsed.stats },
      combat: { ...fresh.combat, ...parsed.combat },
      log: Array.isArray(parsed.log) ? parsed.log.slice(0, 14) : fresh.log,
    };

    if (parsed.hero?.strength === undefined && parsed.hero?.attack !== undefined) {
      merged.hero.strength = parsed.hero.attack;
    }
    if (parsed.hero?.dexterity === undefined) {
      if (parsed.hero?.accuracy !== undefined) {
        merged.hero.dexterity = Math.max(0, parsed.hero.accuracy - 100);
      } else {
        merged.hero.dexterity = fresh.hero.dexterity;
      }
    }
    merged.hero.critRate = 0;
    merged.hero.attackSpeed = 0;

    if (parsed.resources?.healingPotion) {
      merged.resources.bandage += parsed.resources.healingPotion;
    }
    if (parsed.crafted?.potion) {
      merged.crafted.bandage += parsed.crafted.potion;
    }
    if (parsed.crafted?.armor) {
      merged.crafted.chest = Math.max(merged.crafted.chest, parsed.crafted.armor);
    }
    if (parsed.crafted?.mail) {
      merged.crafted.head = Math.max(merged.crafted.head, parsed.crafted.mail);
    }
    if (parsed.crafted?.charm) {
      merged.crafted.goldRing = Math.max(merged.crafted.goldRing, parsed.crafted.charm);
    }
    if (parsed.crafted?.sigil) {
      merged.crafted.recoveryCharm = Math.max(merged.crafted.recoveryCharm, parsed.crafted.sigil);
    }
    if (parsed.crafted?.pike) {
      merged.crafted.spear += parsed.crafted.pike;
    }
    if (parsed.weaponLevels?.pike) {
      merged.weaponLevels.spear = Math.max(merged.weaponLevels.spear, parsed.weaponLevels.pike);
    }
    if (parsed.weaponLevels?.axe) {
      merged.toolLevels.axe = Math.max(merged.toolLevels.axe, parsed.weaponLevels.axe);
    }
    if (parsed.weaponLevels?.hammer) {
      merged.toolLevels.hammer = Math.max(merged.toolLevels.hammer, parsed.weaponLevels.hammer);
    }
    if (parsed.toolLevels?.calculator) {
      merged.toolLevels.calculator = Math.max(merged.toolLevels.calculator, parsed.toolLevels.calculator);
    }
    if (merged.equipment.weapon === "pike") {
      merged.equipment.weapon = "spear";
    }
    if (merged.equipment.weapon === "knife" && (merged.crafted.knife || 0) === 0) {
      merged.equipment.weapon = "hands";
      merged.weaponLevels.knife = 0;
    }
    if (merged.equipment.weapon === "axe" || merged.equipment.weapon === "hammer") {
      merged.equipment.tool = merged.equipment.weapon;
      merged.equipment.weapon = "hands";
    }
    if (!weaponCatalog.some((weapon) => weapon.id === merged.equipment.weapon)) {
      merged.equipment.weapon = "hands";
    }
    if (!toolCatalog.some((tool) => tool.id === merged.equipment.tool)) {
      merged.equipment.tool = "hands";
    }
    const activeSkill = skills.find((skill) => skill.id === merged.activeSkill) || skills[0];
    const equippedTool = getToolById(merged.equipment?.tool);
    const equippedToolLevel = merged.toolLevels?.[equippedTool.id] || 0;
    const activeGatherDamage = equippedTool.toolType === activeSkill.id ? getToolGatherDamage(equippedToolLevel) : 1;
    const activeNode = getSkillNode(activeSkill, activeGatherDamage);
    if (!merged.gathering.nodeHealth || merged.gathering.nodeHealth > activeNode.nodeHealth) {
      merged.gathering.nodeHealth = activeNode.nodeHealth;
    }
    if (typeof merged.gathering.actionTimer !== "number") {
      merged.gathering.actionTimer = 0;
    }
    merged.gathering.nodeKey = typeof merged.gathering.nodeKey === "string" ? merged.gathering.nodeKey : `${activeSkill.id}:${activeNode.id}`;

    const zone = getZoneById(merged.combat.selectedZoneId) || zones[0];
    const enemyTemplate = getEnemyTemplate(zone.id, merged.combat.selectedEnemyId) || zone.enemies[0];
    merged.combat.selectedZoneId = zone.id;
    merged.combat.selectedEnemyId = enemyTemplate.id;
    merged.combat.enemy = normalizeEnemyInstance(merged.combat.enemy, zone.id, enemyTemplate.id);

    const selectedHealingRecipe = merged.crafting.selectedRecipeId ? getRecipe(merged.crafting.selectedRecipeId) : null;
    if (!selectedHealingRecipe || selectedHealingRecipe.type !== "healing") {
      merged.crafting.selectedRecipeId = null;
      merged.crafting.progress = 0;
    }

    const equipped = getHealingItem(merged.healing.equipped);
    if (!equipped || merged.hero.combatLevel < equipped.unlockLevel) {
      merged.healing.equipped = pickBestHealingForLevel(merged.hero.combatLevel).id;
    }

    if (!merged.migrations.gearStatRebalanceV2) {
      const headLevel = merged.crafted.head || 0;
      const chestLevel = merged.crafted.chest || 0;
      const armsLevel = merged.crafted.arms || 0;
      const feetLevel = merged.crafted.feet || 0;

      merged.hero.magic += headLevel;
      merged.hero.dexterity += headLevel;

      merged.hero.defense += chestLevel;
      merged.hero.strength += chestLevel;
      merged.hero.dexterity += chestLevel;
      merged.hero.magic += chestLevel;

      merged.hero.maxHealth -= armsLevel;
      merged.hero.strength += armsLevel;
      merged.hero.magic += armsLevel;

      merged.hero.dexterity += feetLevel;
      merged.hero.strength += feetLevel;

      merged.hero.health = Math.min(merged.hero.health, merged.hero.maxHealth);
      merged.migrations.gearStatRebalanceV2 = true;
    }

    return merged;
  } catch (error) {
    return fresh;
  }
}

function saveState() {
  state.lastSavedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getZoneById(zoneId) {
  return zones.find((zone) => zone.id === zoneId);
}

function getEnemyTemplate(zoneId, enemyId) {
  const zone = getZoneById(zoneId);
  return zone?.enemies.find((enemy) => enemy.id === enemyId) || null;
}

function getHealingItem(itemId) {
  return healingItems.find((item) => item.id === itemId);
}

function getRecipe(recipeId) {
  return recipes.find((recipe) => recipe.id === recipeId);
}

function getWeaponById(weaponId) {
  return weaponCatalog.find((weapon) => weapon.id === weaponId) || weaponCatalog[0];
}

function getToolById(toolId) {
  return toolCatalog.find((tool) => tool.id === toolId) || toolCatalog[0];
}

function getCurrentWeapon() {
  return getWeaponById(state.equipment.weapon);
}

function getCurrentTool() {
  return getToolById(state.equipment.tool);
}

function getWeaponLevel(weaponId) {
  return state.weaponLevels[weaponId] || 0;
}

function getToolLevel(toolId) {
  return state.toolLevels[toolId] || 0;
}

function getItemLevel(recipe) {
  if (recipe.type === "weapon") {
    return getWeaponLevel(recipe.id);
  }
  if (recipe.type === "tool") {
    return getToolLevel(recipe.id);
  }
  return state.crafted[recipe.id] || 0;
}

function getAccessoryBonuses() {
  return {
    goldFind: (state.crafted.goldRing || 0) * 0.01,
    regen: (state.crafted.recoveryCharm || 0) * 0.01,
    dropRate: (state.crafted.scavengerCharm || 0) * 0.005,
  };
}

function getWeaponProfile(weaponId = state.equipment.weapon) {
  const weapon = getWeaponById(weaponId);
  const level = getWeaponLevel(weaponId);
  const profile = {
    baseDamage: (weapon.baseDamage || 1) + Math.floor(level / 5),
    proficiency: level,
    strength: 0,
    defense: 0,
    dexterity: 0,
    magic: 0,
    critRate: 0,
    attackRateBonus: 0,
    armorBreak: 0,
    baseDelay: weapon.baseDelay || 1,
    damageLabel: "STR",
  };

  switch (weapon.weaponType) {
    case "knife":
      profile.attackRateBonus = level;
      profile.damageLabel = "STR";
      break;
    case "sword":
      profile.strength = level;
      profile.damageLabel = "STR";
      break;
    case "spear":
      profile.critRate = 5 + level;
      profile.damageLabel = "DEX";
      break;
    case "bow":
      profile.dexterity = level;
      profile.damageLabel = "DEX";
      break;
    case "shield":
      profile.defense = level;
      profile.damageLabel = "DEF";
      break;
    case "staff":
      profile.magic = level;
      profile.damageLabel = "MAG";
      break;
    default:
      break;
  }

  return profile;
}

function getToolProfile(toolId = state.equipment.tool, skillId = state.activeSkill) {
  const tool = getToolById(toolId);
  const level = getToolLevel(toolId);
  if (!tool || tool.id === "hands" || level <= 0) {
    return {
      attackPenalty: 0,
      gatherDamage: 1,
      matchesSkill: false,
    };
  }

  const matchesSkill = tool.toolType === skillId;
  const gatherDamage = matchesSkill ? getToolGatherDamage(level) : 1;
  return {
    attackPenalty: Math.max(1, Math.ceil(level / 12)),
    gatherDamage,
    matchesSkill,
  };
}

function getCombatStats() {
  const weaponProfile = getWeaponProfile();
  const toolProfile = getToolProfile();
  const baseCritRate = 1 + state.hero.combatLevel * 0.1;
  const critRate = Math.min(75, baseCritRate + weaponProfile.critRate);
  const dexterity = Math.max(0, state.hero.dexterity + weaponProfile.dexterity);
  const attackRateMultiplier = 1 + weaponProfile.attackRateBonus / 100;
  const attackDelay = Math.max(0.35, weaponProfile.baseDelay / attackRateMultiplier);
  const attacksPerSecond = 1 / attackDelay;
  return {
    strength: state.hero.strength + weaponProfile.strength,
    defense: state.hero.defense + weaponProfile.defense,
    magic: state.hero.magic + weaponProfile.magic,
    dexterity,
    critRate,
    attackRateMultiplier,
    attackDelay,
    attacksPerSecond,
    armorBreak: weaponProfile.armorBreak,
    toolAttackPenalty: toolProfile.attackPenalty,
    gatherDamage: toolProfile.gatherDamage,
    weaponProfile,
  };
}

function getWeaponDamage(stats) {
  const weapon = getCurrentWeapon();
  const toolPenalty = stats.toolAttackPenalty;
  const profile = stats.weaponProfile;
  let baseDamage = profile.baseDamage;

  switch (weapon.weaponType) {
    case "knife":
      baseDamage += stats.strength * 0.42;
      break;
    case "sword":
      baseDamage += stats.strength * 0.54;
      break;
    case "spear":
      baseDamage += stats.dexterity * 0.54;
      break;
    case "bow":
      baseDamage += stats.dexterity * 0.64;
      break;
    case "shield":
      baseDamage += stats.defense * 0.3 + stats.strength * 0.16;
      break;
    case "staff":
      baseDamage += stats.magic * 0.68;
      break;
    default:
      baseDamage += stats.strength * 0.2;
      break;
  }

  const adjustedDamage = ["knife", "spear"].includes(weapon.weaponType)
    ? baseDamage * (1 + profile.proficiency / 100)
    : baseDamage;
  return Math.max(1, adjustedDamage - (weapon.weaponType === "staff" ? toolPenalty * 0.5 : toolPenalty));
}

function getUpgradeCosts(recipe) {
  const targetLevel = getItemLevel(recipe) + 1;
  const gatherTierIndex = getGatherTierIndexForLevel(targetLevel);
  const combatTierIndex = getCombatTierIndexForLevel(targetLevel);
  const factor = 1 + targetLevel * 0.16;
  const remappedGatherCosts = Object.entries(recipe.costs).reduce((costs, [resource, amount]) => {
    const remappedResource = gatherCostTierMap[resource]?.[gatherTierIndex] || resource;
    costs[remappedResource] = (costs[remappedResource] || 0) + amount;
    return costs;
  }, {});
  const combatTrackCosts = getRecipeCombatTrack(recipe)[combatTierIndex] || {};
  const mergedCosts = mergeCosts(remappedGatherCosts, combatTrackCosts);

  return Object.fromEntries(
    Object.entries(mergedCosts).map(([resource, amount]) => [resource, Math.max(1, Math.ceil(amount * factor))])
  );
}

function canFightEnemy(enemy) {
  if (!enemy.requiredWeaponTypes || enemy.requiredWeaponTypes.length === 0) {
    return true;
  }

  return enemy.requiredWeaponTypes.includes(getCurrentWeapon().weaponType);
}

function createEnemy(zoneId, enemyId) {
  const zone = getZoneById(zoneId) || zones[0];
  const template = getEnemyTemplate(zone.id, enemyId) || zone.enemies[0];
  return {
    zoneId: zone.id,
    enemyId: template.id,
    name: template.name,
    level: template.level,
    maxHealth: template.maxHealth,
    currentHealth: template.maxHealth,
    attack: template.attack,
    defense: template.defense,
    evasion: template.evasion || 0,
    magicResist: template.magicResist || 0,
    xpReward: template.xpReward,
    goldReward: template.goldReward,
    requiredWeaponTypes: template.requiredWeaponTypes || [],
    drops: template.drops,
  };
}

function normalizeEnemyInstance(enemy, zoneId, enemyId) {
  const template = getEnemyTemplate(zoneId, enemyId);
  if (!template) {
    return createEnemy(zones[0].id, zones[0].enemies[0].id);
  }
  const currentHealth = enemy?.currentHealth ?? template.maxHealth;
  return {
    ...createEnemy(zoneId, enemyId),
    currentHealth: Math.min(template.maxHealth, Math.max(0, currentHealth)),
  };
}

function respawnSelectedEnemy() {
  state.combat.enemy = createEnemy(state.combat.selectedZoneId, state.combat.selectedEnemyId);
}

function pickBestHealingForLevel(level) {
  const unlocked = healingItems.filter((item) => item.unlockLevel <= level);
  return unlocked[unlocked.length - 1] || healingItems[0];
}

function isZoneUnlocked(zone) {
  return state.hero.combatLevel >= zone.unlockLevel;
}

function xpForLevel(level) {
  return Math.floor(24 * Math.pow(1.072, Math.max(0, level - 1)) + level * 8);
}

function addLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 14);
}

function refreshOpenOverlayPanels() {
  if (!dom.overlayShell || dom.overlayShell.classList.contains("hidden")) {
    return;
  }

  renderEquipment();
  renderCraftSummary();
  renderResources();
  renderRecipes();
}

function addResource(resource, amount) {
  const nextAmount = (state.resources[resource] || 0) + amount;
  state.resources[resource] = resource === "gold"
    ? Math.max(0, nextAmount)
    : Math.max(0, Math.min(RESOURCE_CAP, nextAmount));
  refreshOpenOverlayPanels();
}

function spendResources(costs) {
  Object.entries(costs).forEach(([resource, amount]) => {
    addResource(resource, -amount);
  });
}

function canAfford(costs) {
  return Object.entries(costs).every(([resource, amount]) => (state.resources[resource] || 0) >= amount);
}

function healHero(amount) {
  state.hero.health = Math.min(state.hero.maxHealth, state.hero.health + amount);
}

function damageHero(amount) {
  state.hero.health = Math.max(0, state.hero.health - amount);
}

function regenerateHero(seconds) {
  if (state.hero.health >= state.hero.maxHealth) {
    return;
  }

  const bonuses = getAccessoryBonuses();
  healHero(seconds * (0.1 + bonuses.regen));
}

function getEnemyMaxHit(enemy = state.combat.enemy) {
  const stats = getCombatStats();
  return Math.max(1, enemy.attack - Math.floor(stats.defense * 0.5) + 1);
}

function maybeResumeAutoCombat() {
  if (!state.combat.autoWanted || state.combat.autoActive) {
    return;
  }

  if (state.hero.health <= getEnemyMaxHit() || !canFightEnemy(state.combat.enemy)) {
    return;
  }

  state.combat.autoActive = true;
  state.combat.attackTimer = 0;
  addLog(`You recover enough to resume farming ${state.combat.enemy.name}.`);
}

function addCombatXp(amount) {
  state.hero.combatXp += amount;
  while (state.hero.combatXp >= xpForLevel(state.hero.combatLevel)) {
    state.hero.combatXp -= xpForLevel(state.hero.combatLevel);
    state.hero.combatLevel += 1;
    state.hero.maxHealth += 6;
    state.hero.strength += 1;
    state.hero.defense += 1;
    state.hero.dexterity += 1;
    state.hero.magic += 1;
    state.hero.health = state.hero.maxHealth;
    addLog(`Level up! You reached combat level ${state.hero.combatLevel}.`);
  }
}

function handleGathering(seconds) {
  const skill = skills.find((entry) => entry.id === state.activeSkill);
  if (!skill || state.hero.combatLevel < skill.unlockLevel) {
    return;
  }

  const node = syncGatheringNodeState(skill);
  state.gathering.actionTimer = (state.gathering.actionTimer || 0) + seconds;
  const gatherDamage = getToolProfile().gatherDamage;
  let completed = 0;
  while (state.gathering.actionTimer >= GATHER_INTERVAL_S) {
    state.gathering.actionTimer -= GATHER_INTERVAL_S;
    if (state.gathering.respawnDelay > 0) {
      state.gathering.respawnDelay -= 1;
      if (state.gathering.respawnDelay <= 0) {
        state.gathering.nodeHealth = node.nodeHealth;
      }
      continue;
    }

    state.gathering.nodeHealth -= gatherDamage;
    if (state.gathering.nodeHealth <= 0) {
      completed += 1;
      state.gathering.nodeHealth = 0;
      state.gathering.respawnDelay = 1;
    }
  }

  state.skillProgress[skill.id] =
    state.gathering.respawnDelay > 0 ? 100 : ((node.nodeHealth - state.gathering.nodeHealth) / node.nodeHealth) * 100;

  if (completed > 0) {
    const bonuses = getAccessoryBonuses();
    const rewards = getNodeRewards(skill, node);
    Object.entries(rewards).forEach(([resource, amount]) => {
      const totalYield =
        resource === "gold" ? Math.max(1, Math.floor(completed * amount * (1 + bonuses.goldFind))) : completed * amount;
      addResource(resource, totalYield);
    });
    state.stats.totalGathered += completed;
    if (skill.xpPerAction > 0) {
      addCombatXp(skill.xpPerAction * completed);
    }
    const rewardText = Object.entries(rewards)
      .map(([resource, amount]) => {
        const totalYield =
          resource === "gold" ? Math.max(1, Math.floor(completed * amount * (1 + bonuses.goldFind))) : completed * amount;
        return `${totalYield} ${resourceMeta[resource].name.toLowerCase()}`;
      })
      .join(" and ");
    addLog(`${skill.name} yielded ${rewardText}.`);
  }
}

function handleCrafting(seconds) {
  const recipe = getRecipe(state.crafting.selectedRecipeId);
  if (!recipe || recipe.type !== "healing") {
    return;
  }

  const selectedStock = state.resources[recipe.id] || 0;
  const stockLimit = getHealingItem(recipe.id)?.autoCraftLimit || 10;
  if (selectedStock >= stockLimit) {
    state.crafting.progress = 0;
    return;
  }

  if (!canAfford(recipe.costs)) {
    return;
  }

  state.crafting.progress += seconds;
  while (state.crafting.progress >= recipe.craftSeconds && canAfford(recipe.costs) && (state.resources[recipe.id] || 0) < stockLimit) {
    state.crafting.progress -= recipe.craftSeconds;
    spendResources(recipe.costs);
    Object.entries(recipe.output).forEach(([resource, amount]) => addResource(resource, amount));
    state.crafted[recipe.id] += 1;
    state.stats.totalCrafted += 1;
    state.stats.totalAutoCraftedHealing += 1;
    addLog(`${recipe.name} completed in the field kit.`);
  }
}

function useHealingIfNeeded() {
  const item = getHealingItem(state.healing.equipped);
  if (!item) {
    return false;
  }

  const healthRatio = state.hero.health / state.hero.maxHealth;
  if (healthRatio > item.triggerRatio || (state.resources[item.id] || 0) <= 0) {
    return false;
  }

  const healAmount = Math.round(state.hero.maxHealth * (item.healPercent || 0)) + item.healAmount;
  addResource(item.id, -1);
  healHero(healAmount);
  state.stats.totalHealed += healAmount;
  addLog(
    `${item.name} activates at ${(item.triggerRatio * 100).toFixed(0)}% HP and restores ${(item.healPercent || 0) * 100}% + ${item.healAmount} HP.`
  );
  return true;
}

function getHitChance(accuracy, evasion) {
  if (evasion <= 0 || accuracy >= evasion) {
    return 1;
  }

  return Math.max(0, Math.min(1, accuracy / evasion));
}

function handleCombatTick() {
  useHealingIfNeeded();

  const enemy = state.combat.enemy;
  if (!state.combat.autoActive || state.hero.health <= 0) {
    state.combat.attackTimer = 0;
    return;
  }

  if (!canFightEnemy(enemy)) {
    state.combat.attackTimer = 0;
    return;
  }

  const stats = getCombatStats();

  const hitRoll = Math.random() * 100;
  const hitChance = getHitChance(stats.dexterity, enemy.evasion) * 100;
  if (hitRoll > hitChance) {
    return;
  }

  const effectiveDefense = Math.max(0, enemy.defense - Math.floor(enemy.defense * stats.armorBreak));
  const weaponDamage = getWeaponDamage(stats);
  const physicalDamage = Math.max(1, weaponDamage - effectiveDefense + randomInt(0, 2));
  const magicDamage = getCurrentWeapon().weaponType === "staff" ? Math.max(0, stats.magic * 0.2 - enemy.magicResist + randomInt(0, 1)) : 0;
  const crit = Math.random() * 100 < stats.critRate;
  const heroDamage = Math.max(1, Math.round((physicalDamage + magicDamage) * (crit ? 1.5 : 1)));
  enemy.currentHealth -= heroDamage;

  if (enemy.currentHealth <= 0) {
    const bonuses = getAccessoryBonuses();
    state.stats.kills += 1;
    addResource("gold", Math.max(1, Math.floor(enemy.goldReward * (1 + bonuses.goldFind))));
    addCombatXp(enemy.xpReward);
    enemy.drops.forEach((drop) => {
      if (Math.random() <= Math.min(1, drop.chance + bonuses.dropRate)) {
        addResource(drop.resource, drop.amount);
      }
    });
    addLog(`You defeated ${enemy.name} and claimed ${Math.max(1, Math.floor(enemy.goldReward * (1 + bonuses.goldFind)))} gold.`);
    respawnSelectedEnemy();
    return;
  }

  const enemyDamage = Math.max(1, enemy.attack - Math.floor(stats.defense * 0.5) + randomInt(0, 1));
  damageHero(enemyDamage);

  if (state.hero.health <= 0) {
    state.combat.autoActive = false;
    state.combat.attackTimer = 0;
    addLog("You were overwhelmed. Combat has stopped until you recover and resume.");
  }
}

function handleMilestones() {
  milestones.forEach((milestone) => {
    if (!state[`milestone_${milestone.id}`] && milestone.check(state)) {
      state[`milestone_${milestone.id}`] = true;
      addLog(`Milestone reached: ${milestone.title}.`);
    }
  });
}

function tick(elapsedMs) {
  const seconds = elapsedMs / 1000;
  regenerateHero(seconds);
  maybeResumeAutoCombat();
  handleGathering(seconds);
  handleCrafting(seconds);

  const attackInterval = getCombatStats().attackDelay;
  state.combat.attackTimer += seconds;
  while (state.combat.attackTimer >= attackInterval) {
    state.combat.attackTimer -= attackInterval;
    handleCombatTick();
  }

  handleMilestones();
}

function processOfflineProgress() {
  const now = Date.now();
  const elapsed = Math.min(now - state.lastSavedAt, OFFLINE_CAP_MS);
  if (elapsed < TICK_MS * 2) {
    return;
  }

  tick(elapsed);
  dom.offlinePill.classList.remove("hidden");
  setTimeout(() => dom.offlinePill.classList.add("hidden"), 5000);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatCosts(costs) {
  return Object.entries(costs)
    .map(
      ([resource, amount]) => `
        <span class="cost-chip ${(state.resources[resource] || 0) >= amount ? "affordable" : "missing"}">
          <strong>${state.resources[resource] || 0}/${amount}</strong> ${resourceMeta[resource].name}
        </span>
      `
    )
    .join("");
}

function renderHero() {
  const weapon = getCurrentWeapon();
  const tool = getCurrentTool();
  const stats = getCombatStats();
  const damagePerHit = getWeaponDamage(stats);
  const dps = ((damagePerHit + damagePerHit * (stats.critRate / 100) * 0.5) / stats.attackDelay).toFixed(1);
  const heroStats = [
    { label: "STR", value: stats.strength },
    { label: "DEF", value: stats.defense },
    { label: "MAG", value: stats.magic },
    { label: "DEX", value: stats.dexterity },
    { label: "CRIT", value: `${stats.critRate.toFixed(1)}%` },
    { label: "Delay", value: `${stats.attackDelay.toFixed(2)}s` },
    { label: "DPS", value: dps },
    { label: "Hit", value: damagePerHit.toFixed(1) },
  ];

  dom.heroStats.innerHTML = heroStats
    .map(
      (stat) => `
        <div class="stat-card">
          <span class="stat-label">${stat.label}</span>
          <span class="stat-value">${stat.value}</span>
        </div>
      `
    )
    .join("");

  const xpTarget = xpForLevel(state.hero.combatLevel);
  const xpPercent = Math.min(100, (state.hero.combatXp / xpTarget) * 100);
  const weaponLevelLabel = weapon.id === "hands" ? "Base" : `Lv ${Math.max(1, getWeaponLevel(weapon.id))}`;
  const toolLabel = tool.id === "hands" ? "No Tool" : `${tool.name} Lv ${Math.max(1, getToolLevel(tool.id))}`;
  dom.heroSummaryLine.innerHTML = `${weapon.name} ${weaponLevelLabel} | DPS ${dps}<br />${toolLabel}`;
  dom.heroHpLabel.textContent = `${Math.round(state.hero.health)} / ${state.hero.maxHealth}`;
  dom.heroLevelLabel.textContent = `${state.hero.combatLevel}`;
  dom.combatXpFill.style.width = `${xpPercent}%`;
  dom.combatLevelLabel.textContent = `${Math.round(state.hero.combatXp)} / ${xpTarget} XP to level ${
    state.hero.combatLevel + 1
  }`;
}

function renderEquipment() {
  const healingSlot = getHealingItem(state.healing.equipped);
  const equippedWeapon = getCurrentWeapon();
  const equippedTool = getCurrentTool();
  const equippedProfile = getWeaponProfile();
  const equippedToolProfile = getToolProfile();
  const accessoryBonuses = getAccessoryBonuses();
  const weaponOptions = weaponCatalog
    .filter((weapon) => weapon.crafted || state.crafted[weapon.id] >= 1)
    .map((weapon) => {
      const active = state.equipment.weapon === weapon.id;
      const levelLabel = weapon.id === "hands" ? "Base" : `Lv ${Math.max(1, getWeaponLevel(weapon.id))}`;
      return `<button class="${active ? "compact-button active" : "compact-button"}" data-weapon="${weapon.id}">${weapon.name} ${levelLabel}</button>`;
    })
    .join("");
  const toolOptions = toolCatalog
    .filter((tool) => tool.crafted || state.crafted[tool.id] >= 1)
    .map((tool) => {
      const active = state.equipment.tool === tool.id;
      const levelLabel = tool.id === "hands" ? "" : ` Lv ${Math.max(1, getToolLevel(tool.id))}`;
      return `<button class="${active ? "compact-button active" : "compact-button"}" data-tool="${tool.id}">${tool.name}${levelLabel}</button>`;
    })
    .join("");
  const gearSummaries = [
    { label: "Head", name: "Mystic Hood", level: state.crafted.head || 0, summary: `+${(state.crafted.head || 0) * 4} HP | +${state.crafted.head || 0} DEF | +${(state.crafted.head || 0) * 2} MAG | +${state.crafted.head || 0} DEX` },
    { label: "Chest", name: "Ember Mail", level: state.crafted.chest || 0, summary: `+${(state.crafted.chest || 0) * 8} HP | +${(state.crafted.chest || 0) * 2} DEF | +${state.crafted.chest || 0} STR | +${state.crafted.chest || 0} DEX | +${state.crafted.chest || 0} MAG` },
    { label: "Arms", name: "Ranger Bracers", level: state.crafted.arms || 0, summary: `+${(state.crafted.arms || 0) * 4} HP | +${state.crafted.arms || 0} DEF | +${(state.crafted.arms || 0) * 2} STR | +${state.crafted.arms || 0} MAG` },
    { label: "Feet", name: "Scout Greaves", level: state.crafted.feet || 0, summary: `+${(state.crafted.feet || 0) * 4} HP | +${state.crafted.feet || 0} DEF | +${(state.crafted.feet || 0) * 2} DEX | +${state.crafted.feet || 0} STR` },
  ];
  const accessorySummaries = [
    { name: "Gilded Ring", level: state.crafted.goldRing || 0, summary: `+${Math.round(accessoryBonuses.goldFind * 100)}% gold from all sources` },
    { name: "Recovery Charm", level: state.crafted.recoveryCharm || 0, summary: `+${accessoryBonuses.regen.toFixed(2)} HP/s natural recovery` },
    { name: "Scavenger Charm", level: state.crafted.scavengerCharm || 0, summary: `+${(accessoryBonuses.dropRate * 100).toFixed(1)}% drop rate` },
  ];
  const bandageOptions = healingItems
    .map((item) => {
      const unlocked = state.hero.combatLevel >= item.unlockLevel;
      const active = state.healing.equipped === item.id;
      return `<button class="${active ? "compact-button active" : "compact-button"}" data-healing="${item.id}" ${
        unlocked ? "" : "disabled"
      }>${item.name}</button>`;
    })
    .join("");

  dom.equipmentSlots.innerHTML = `
    <div class="equipment-slot-card">
      <div>
        <div class="choice-title">Weapon</div>
        <div class="choice-copy">${equippedWeapon.name}</div>
      </div>
      <span class="choice-chip">${
        equippedWeapon.id === "hands" ? "Base" : `Lv ${Math.max(1, getWeaponLevel(equippedWeapon.id))}`
      } | ${equippedProfile.baseDamage} DMG | ${equippedProfile.baseDelay.toFixed(2)}s</span>
    </div>
    <div class="choice-button-row">${weaponOptions}</div>
    <div class="equipment-slot-card">
      <div>
        <div class="choice-title">Weapon Bonus</div>
        <div class="choice-copy">${
          equippedWeapon.id === "hands"
            ? "No weapon bonus."
            : [
                equippedProfile.strength ? `+${equippedProfile.strength} STR` : null,
                equippedProfile.defense ? `+${equippedProfile.defense} DEF` : null,
                equippedProfile.dexterity ? `+${equippedProfile.dexterity} DEX` : null,
                equippedProfile.magic ? `+${equippedProfile.magic} MAG` : null,
                equippedProfile.critRate ? `+${equippedProfile.critRate.toFixed(1)}% Crit` : null,
                equippedProfile.attackRateBonus ? `-${equippedProfile.attackRateBonus}% Knife Delay` : null,
              ]
                .filter(Boolean)
                .join(" | ")
            || "No bonus."
        }</div>
      </div>
      <span class="choice-chip">${equippedWeapon.growthLabel}</span>
    </div>
    <div class="equipment-slot-card">
      <div>
        <div class="choice-title">Tool</div>
        <div class="choice-copy">${equippedTool.name}</div>
      </div>
      <span class="choice-chip">${
        equippedTool.id === "hands" ? "No penalty" : `Lv ${Math.max(1, getToolLevel(equippedTool.id))} | -${equippedToolProfile.attackPenalty} DMG | +${equippedToolProfile.gatherDamage} Gather`
      }</span>
    </div>
    <div class="choice-button-row">${toolOptions}</div>
    ${gearSummaries
      .map(
        (gear) => `
          <div class="equipment-slot-card">
            <div>
              <div class="choice-title">${gear.label}</div>
              <div class="choice-copy">${gear.name}</div>
            </div>
            <span class="choice-chip">Lv ${gear.level} | ${gear.level > 0 ? gear.summary : "Uncrafted"}</span>
          </div>
        `
      )
      .join("")}
    ${accessorySummaries
      .map(
        (accessory) => `
          <div class="equipment-slot-card">
            <div>
              <div class="choice-title">${accessory.name}</div>
              <div class="choice-copy">${accessory.level > 0 ? accessory.summary : "Uncrafted"}</div>
            </div>
            <span class="choice-chip">Lv ${accessory.level}</span>
          </div>
        `
      )
      .join("")}
    <div class="equipment-slot-card">
      <div>
        <div class="choice-title">Bandage Slot</div>
        <div class="choice-copy">${healingSlot.name}</div>
      </div>
      <span class="choice-chip">Stock ${state.resources[healingSlot.id] || 0}</span>
    </div>
    <div class="choice-button-row">${bandageOptions}</div>
  `;
}

function renderGatherSummary() {
  const activeSkill = skills.find((skill) => skill.id === state.activeSkill) || skills[0];
  const node = syncGatheringNodeState(activeSkill);
  const progress = Math.min(100, state.skillProgress[activeSkill.id] || 0);
  const tool = getCurrentTool();
  const toolProfile = getToolProfile();
  const rewardText = Object.entries(getNodeRewards(activeSkill, node))
    .map(([resource, amount]) => `${amount} ${resourceMeta[resource].name}`)
    .join(" + ");
  dom.gatherSummaryLine.textContent = `${activeSkill.name} | ${node.label}`;
  dom.gatherCycleLabel.textContent = state.gathering.respawnDelay > 0
    ? `Respawning | ${rewardText} | Hit ${toolProfile.gatherDamage}`
    : `${state.gathering.nodeHealth}/${node.nodeHealth} HP | ${rewardText} | Hit ${toolProfile.gatherDamage}`;
  dom.gatherProgressFill.style.width = `${progress}%`;
}

function renderCraftSummary() {
  const recipe = getRecipe(state.crafting.selectedRecipeId);
  if (!recipe || recipe.type !== "healing") {
    dom.craftSummaryLine.textContent = "Auto Craft Off";
    dom.craftCycleLabel.textContent = "Select a bandage type";
    dom.craftProgressFill.style.width = "0%";
    return;
  }

  const product = Object.keys(recipe.output)[0];
  const progress = Math.min(100, (state.crafting.progress / recipe.craftSeconds) * 100);
  const stockLimit = getHealingItem(recipe.id)?.autoCraftLimit || 10;
  const stock = state.resources[product] || 0;
  dom.craftSummaryLine.textContent = recipe.name;
  dom.craftCycleLabel.textContent = stock >= stockLimit
    ? `Reserve Full | ${stock}/${stockLimit}`
    : canAfford(recipe.costs)
      ? `${recipe.craftSeconds}s Cycle | ${stock}/${stockLimit}`
      : `Waiting | ${stock}/${stockLimit}`;
  dom.craftProgressFill.style.width = `${progress}%`;
}

function renderResources() {
  dom.resourceList.innerHTML = Object.entries(resourceMeta)
    .map(([resource, meta]) => {
      const amount = state.resources[resource] || 0;
      return `
        <div class="resource-item">
          <div>
            <div class="resource-name">${meta.name}</div>
            <div class="resource-detail">${meta.description}</div>
          </div>
          <strong>${amount.toFixed(meta.precision)}</strong>
        </div>
      `;
    })
    .join("");
}

function renderZones() {
  dom.zoneList.innerHTML = zones
    .map((zone) => {
      const unlocked = isZoneUnlocked(zone);
      const active = state.combat.selectedZoneId === zone.id;
      const isOpen = state.ui.openZones[zone.id] ?? active;
      const zoneDrops = [...new Set(zone.enemies.flatMap((enemy) => enemy.drops.map((drop) => resourceMeta[drop.resource].name)))].join(", ");
      return `
        <details class="zone-card collapsible-group ${active ? "active" : ""} ${unlocked ? "" : "locked"}" data-zone-group="${zone.id}" ${isOpen ? "open" : ""}>
          <summary class="collapsible-header zone-name-row">
            <div>
              <div class="choice-title">${zone.name}</div>
              <div class="choice-copy">Lvl ${zone.unlockLevel}+ | ${zoneDrops}</div>
            </div>
            <span class="pill">${unlocked ? (active ? "Active" : "Open") : `Lvl ${zone.unlockLevel}`}</span>
          </summary>
          <div class="zone-enemy-list">
            ${zone.enemies
              .map((enemy) => {
                const enemyActive = state.combat.selectedEnemyId === enemy.id && active;
                const weaponReady = canFightEnemy(enemy);
                const drops = enemy.drops.map((drop) => resourceMeta[drop.resource].name).join(", ");
                const requirementText = enemy.requiredWeaponTypes?.length
                  ? `Requires ${enemy.requiredWeaponTypes.map((type) => type.toUpperCase()).join(" / ")}`
                  : "Any weapon";
                return `
                  <div class="enemy-choice ${enemyActive ? "active" : ""}">
                    <div class="enemy-choice-row">
                      <div>
                        <div class="choice-title">${enemy.name}</div>
                        <div class="choice-copy">Lvl ${enemy.level} | Drops ${drops}</div>
                      </div>
                      <span class="choice-chip">${enemy.goldReward} G</span>
                    </div>
                    <div class="choice-chip-row">
                      <span class="choice-chip">${enemy.maxHealth} HP</span>
                      <span class="choice-chip">${enemy.attack} ATK</span>
                      <span class="choice-chip">${enemy.defense} DEF</span>
                      <span class="choice-chip">${enemy.evasion || 0} EVA</span>
                      <span class="choice-chip">${enemy.xpReward} XP</span>
                      <span class="choice-chip">${requirementText}</span>
                    </div>
                    <div class="choice-button-row">
                      <button class="${enemyActive ? "compact-button active" : "compact-button"}" data-zone="${zone.id}" data-enemy="${enemy.id}" ${
                        unlocked && weaponReady ? "" : "disabled"
                      }>${enemyActive ? "Current Target" : unlocked ? (weaponReady ? "Farm Enemy" : "Need Weapon") : "Locked"}</button>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </details>
      `;
    })
    .join("");
}

function renderCombat() {
  const zone = getZoneById(state.combat.selectedZoneId) || zones[0];
  const enemy = state.combat.enemy;
  const healthPercent = Math.max(0, (enemy.currentHealth / enemy.maxHealth) * 100);
  const stats = getCombatStats();
  const requirementText = enemy.requiredWeaponTypes?.length
    ? `Requires ${enemy.requiredWeaponTypes.map((type) => type.toUpperCase()).join(" / ")}`
    : "";
  const combatReady = canFightEnemy(enemy);
  const hitChance = Math.round(getHitChance(stats.dexterity, enemy.evasion) * 100);
  const combatLabel = state.combat.autoWanted ? "Auto On" : "Auto Off";

  dom.combatStatus.textContent = !combatReady
    ? "Wrong Weapon Equipped"
    : state.hero.health <= 0
      ? "Recovering"
      : state.combat.autoActive
        ? `Farming ${enemy.name}`
        : state.combat.autoWanted
          ? "Waiting to Resume"
          : "Combat Paused";
  dom.autoCombatButton.textContent = combatLabel;
  dom.autoCombatButton.classList.toggle("active", state.combat.autoWanted);
  dom.autoCombatButton.disabled = false;
  dom.autoCombatButton.setAttribute("aria-pressed", String(state.combat.autoWanted));
  dom.battleArt.innerHTML = `
    <img class="battle-scene-image" src="${zoneArt[zone.id] || zoneArt.fen}" alt="${zone.name} battlefield backdrop" />
    <img class="enemy-sprite" src="${enemyArt[enemy.id] || enemyArt.slime}" alt="${enemy.name}" />
    <div class="battle-caption">
      <div class="battle-caption-row">
        <div class="enemy-name">${enemy.name}</div>
        <div class="enemy-health-bar compact-health-bar">
          <div class="enemy-health-fill" style="width: ${healthPercent}%"></div>
        </div>
      </div>
      <p class="enemy-subtitle">Lvl ${enemy.level} | ${Math.max(0, Math.round(enemy.currentHealth))}/${enemy.maxHealth} HP | EVA ${enemy.evasion} | Hit ${hitChance}%</p>
      ${requirementText ? `<p class="enemy-subtitle">${requirementText}</p>` : ""}
    </div>
  `;

  dom.encounterButtons.innerHTML = `
    <button class="${state.combat.autoWanted ? "compact-button active" : "compact-button"}" data-action="toggle-combat">${combatLabel}</button>
    <button class="secondary-button" data-action="reset-enemy">Respawn Target</button>
  `;

  dom.battleLog.innerHTML = state.log
    .map((entry) => `<div class="log-entry"><strong>*</strong> ${entry}</div>`)
    .join("");
}

function renderSkills() {
  dom.skillCards.innerHTML = skills
    .map((skill) => {
      const unlocked = state.hero.combatLevel >= skill.unlockLevel;
      const active = state.activeSkill === skill.id;
      const isOpen = state.ui.openSkills[skill.id] ?? active;
      const progress = Math.min(100, state.skillProgress[skill.id] || 0);
      const gatherDamage = active ? getToolProfile(undefined, skill.id).gatherDamage : getToolProfile(state.equipment.tool, skill.id).gatherDamage;
      const currentNode = getSkillNode(skill, gatherDamage);
      const nextNode = getNextSkillNode(skill, gatherDamage);
      const rewardText = Object.entries(getNodeRewards(skill, currentNode))
        .map(([resource, amount]) => `${amount} ${resourceMeta[resource].name}`)
        .join(" + ");
      return `
        <details class="skill-card collapsible-group" data-skill-group="${skill.id}" ${isOpen ? "open" : ""}>
          <summary class="collapsible-header skill-header">
            <div>
              <h3>${skill.name}</h3>
              <p class="skill-rate skill-script">${currentNode.label} | ${rewardText}</p>
            </div>
            <span class="pill">${currentNode.nodeHealth} HP node</span>
          </summary>
          <div class="xp-bar">
            <div class="xp-fill" style="width: ${progress}%"></div>
          </div>
          <p class="skill-rate">${
            nextNode ? `Next unlock at Gather ${nextNode.unlockGatherDamage}: ${nextNode.label}` : "Final gathering tier unlocked"
          }</p>
          <button class="${active ? "skill-button active" : "secondary-button"}" data-skill="${skill.id}" ${
            unlocked ? "" : "disabled"
          }>${unlocked ? (active ? "Active" : "Set Active") : "Locked"}</button>
        </details>
      `;
    })
    .join("");
}

function renderRecipes() {
  const groups = [
    { label: "Bandages", matcher: (recipe) => recipe.type === "healing" },
    { label: "Weapons", matcher: (recipe) => ["sword", "shield", "bow", "staff", "knife", "spear"].includes(recipe.id) },
    { label: "Tools", matcher: (recipe) => ["calculator", "scythe", "axe", "hammer"].includes(recipe.id) },
    { label: "Gear", matcher: (recipe) => ["head", "chest", "arms", "feet"].includes(recipe.id) },
    { label: "Accessories", matcher: (recipe) => ["goldRing", "recoveryCharm", "scavengerCharm"].includes(recipe.id) },
  ];

  dom.recipeList.innerHTML = groups
    .map((group, index) => {
      const groupRecipes = recipes.filter(group.matcher);
      const hasSelected = groupRecipes.some((recipe) => state.crafting.selectedRecipeId === recipe.id);
      const isOpen = state.ui.openRecipeGroups[group.label] ?? (hasSelected || index === 0);
      return `
        <details class="recipe-group collapsible-group" data-recipe-group="${group.label}" ${isOpen ? "open" : ""}>
          <summary class="collapsible-header recipe-group-header">
            <div>
              <div class="recipe-group-title">${group.label}</div>
              <div class="choice-copy skill-script">${groupRecipes.length} ${groupRecipes.length === 1 ? "recipe" : "recipes"}</div>
            </div>
          </summary>
          ${groupRecipes
            .map((recipe) => {
              const craftedCount = state.crafted[recipe.id] || 0;
              const itemLevel = getItemLevel(recipe);
              const scalable = ["weapon", "tool", "gear", "accessory"].includes(recipe.type);
              const locked = !scalable && recipe.maxCrafts && craftedCount >= recipe.maxCrafts;
              const activeCosts = scalable && craftedCount >= 1 && itemLevel < 99 ? getUpgradeCosts(recipe) : recipe.costs;
              const affordable = canAfford(activeCosts);
              const selected = state.crafting.selectedRecipeId === recipe.id;
              const resultText = recipe.upgrade
                ? Object.entries(recipe.upgrade)
                    .map(([stat, amount]) => `+${amount} ${stat}`)
                    .join(" | ")
                : recipe.accessoryBonus
                  ? Object.entries(recipe.accessoryBonus)
                      .map(([stat, amount]) => `${stat} +${amount}`)
                      .join(" | ")
                : recipe.output
                  ? Object.entries(recipe.output)
                      .map(([resource, amount]) => `${amount} ${resourceMeta[resource].name}`)
                      .join(" | ")
                  : recipe.unlock;
              const actionLabel =
                scalable && craftedCount >= 1 && itemLevel < 99
                  ? `Upgrade to Lv ${itemLevel + 1}`
                  : locked
                    ? "Crafted"
                    : "Craft";
              const maxed = scalable && craftedCount >= 1 && itemLevel >= 99;

              return `
                <div class="recipe-card">
                  <div class="recipe-meta">
                    <div>
                      <h3>${recipe.name}</h3>
                      <p class="recipe-description skill-script">${recipe.description}</p>
                    </div>
                    <span class="pill">${
                      recipe.type === "healing"
                        ? "Field Med"
                        : scalable
                          ? `Lv ${Math.max(1, itemLevel || 1)}`
                          : locked
                            ? "Built"
                            : "Upgrade"
                    }</span>
                  </div>
                  <div class="recipe-line">
                    <span class="recipe-line-label">Cost</span>
                    <div class="recipe-cost-row">${formatCosts(activeCosts)}</div>
                  </div>
                  <div class="recipe-line">
                    <span class="recipe-line-label">Result</span>
                    <p class="recipe-result">${resultText}</p>
                  </div>
                  <div class="choice-button-row">
                    ${
                      recipe.type === "healing"
                        ? `<button class="${selected ? "compact-button active" : "compact-button"}" data-craft-focus="${recipe.id}">${selected ? "Auto On" : "Set Auto"}</button>`
                        : ""
                    }
                    <button class="${affordable && !locked && !maxed ? "recipe-button" : "secondary-button"}" data-recipe="${recipe.id}" ${
                      affordable && !locked && !maxed ? "" : "disabled"
                    }>${maxed ? "Maxed" : actionLabel}</button>
                  </div>
                </div>
              `;
            })
            .join("")}
        </details>
      `;
    })
    .join("");
}

function renderMilestones() {
  dom.milestoneList.innerHTML = milestones
    .map((milestone) => {
      const complete = Boolean(state[`milestone_${milestone.id}`]);
      return `
        <div class="milestone-card ${complete ? "complete" : ""}">
          <div class="milestone-copy">
            <strong>${milestone.title}</strong><br />
            ${milestone.description}
          </div>
          <span class="milestone-status">${complete ? "Complete" : "In Progress"}</span>
        </div>
      `;
    })
    .join("");
}

function captureCollapsibleState() {
  document.querySelectorAll("[data-zone-group]").forEach((entry) => {
    state.ui.openZones[entry.dataset.zoneGroup] = entry.open;
  });
  document.querySelectorAll("[data-skill-group]").forEach((entry) => {
    state.ui.openSkills[entry.dataset.skillGroup] = entry.open;
  });
  document.querySelectorAll("[data-recipe-group]").forEach((entry) => {
    state.ui.openRecipeGroups[entry.dataset.recipeGroup] = entry.open;
  });
}

function bindCollapsibleState() {
  document.querySelectorAll("[data-zone-group]").forEach((entry) => {
    entry.ontoggle = () => {
      state.ui.openZones[entry.dataset.zoneGroup] = entry.open;
    };
  });
  document.querySelectorAll("[data-skill-group]").forEach((entry) => {
    entry.ontoggle = () => {
      state.ui.openSkills[entry.dataset.skillGroup] = entry.open;
    };
  });
  document.querySelectorAll("[data-recipe-group]").forEach((entry) => {
    entry.ontoggle = () => {
      state.ui.openRecipeGroups[entry.dataset.recipeGroup] = entry.open;
    };
  });
}

function render() {
  captureCollapsibleState();
  renderHero();
  renderEquipment();
  renderGatherSummary();
  renderCraftSummary();
  renderResources();
  renderZones();
  renderCombat();
  renderSkills();
  renderRecipes();
  renderMilestones();
  bindCollapsibleState();
}

function craftRecipe(recipeId) {
  const recipe = recipes.find((entry) => entry.id === recipeId);
  if (!recipe) {
    return;
  }

  const craftedCount = state.crafted[recipe.id] || 0;
  const itemLevel = getItemLevel(recipe);
  const scalable = ["weapon", "tool", "gear", "accessory"].includes(recipe.type);
  const activeCosts = scalable && craftedCount >= 1 && itemLevel < 99 ? getUpgradeCosts(recipe) : recipe.costs;

  if (!canAfford(activeCosts)) {
    return;
  }

  if (!scalable && recipe.maxCrafts && craftedCount >= recipe.maxCrafts) {
    return;
  }

  if (scalable && craftedCount >= 1 && itemLevel >= 99) {
    return;
  }

  spendResources(activeCosts);
  if (recipe.type === "gear" || recipe.type === "accessory") {
    state.crafted[recipe.id] = Math.max(1, itemLevel + 1);
  } else {
    state.crafted[recipe.id] = craftedCount + (craftedCount === 0 ? 1 : 0);
  }
  state.stats.totalCrafted += 1;

  if (recipe.output) {
    Object.entries(recipe.output).forEach(([resource, amount]) => addResource(resource, amount));
  }

  if (recipe.type === "weapon") {
    state.equipment.weapon = recipe.id;
    state.weaponLevels[recipe.id] = Math.max(1, itemLevel + 1);
  }

  if (recipe.type === "tool") {
    state.equipment.tool = recipe.id;
    state.toolLevels[recipe.id] = Math.max(1, itemLevel + 1);
  }

  if (recipe.upgrade) {
    Object.entries(recipe.upgrade).forEach(([stat, amount]) => {
      state.hero[stat] += amount;
    });
    if (recipe.upgrade.maxHealth) {
      state.hero.health += recipe.upgrade.maxHealth;
    }
    state.hero.health = Math.min(state.hero.health, state.hero.maxHealth);
  }

  addLog(
    scalable && craftedCount >= 1
      ? `${recipe.name} upgraded to level ${
          recipe.type === "weapon"
            ? state.weaponLevels[recipe.id]
            : recipe.type === "tool"
              ? state.toolLevels[recipe.id]
              : state.crafted[recipe.id]
        }.`
      : `${recipe.name} completed in the workshop.`
  );
}

function selectZone(zoneId) {
  const zone = getZoneById(zoneId);
  if (!zone || !isZoneUnlocked(zone)) {
    return;
  }

  state.combat.selectedZoneId = zone.id;
  state.combat.selectedEnemyId = zone.enemies[0].id;
  respawnSelectedEnemy();
  addLog(`You move the farm route to ${zone.name}.`);
}

function selectEnemy(enemyId) {
  const template = getEnemyTemplate(state.combat.selectedZoneId, enemyId);
  if (!template) {
    return;
  }

  state.combat.selectedEnemyId = template.id;
  respawnSelectedEnemy();
  addLog(`You set ${template.name} as your farming target.`);
}

function handleAction(action) {
  if (action === "toggle-combat") {
    if (state.combat.autoWanted) {
      state.combat.autoWanted = false;
      state.combat.autoActive = false;
      state.combat.attackTimer = 0;
      addLog("You pause combat.");
      return;
    }

    state.combat.autoWanted = true;
    if (state.hero.health <= getEnemyMaxHit()) {
      state.combat.autoActive = false;
      addLog(`Auto-combat armed. It will resume once you can survive a hit from ${state.combat.enemy.name}.`);
      return;
    }
    if (!canFightEnemy(state.combat.enemy)) {
      state.combat.autoActive = false;
      addLog("Auto-combat armed. Equip the correct weapon and it will resume.");
      return;
    }

    state.combat.autoActive = true;
    state.combat.attackTimer = 0;
    addLog(`You resume farming ${state.combat.enemy.name}.`);
    return;
  }

  if (action === "reset-enemy") {
    respawnSelectedEnemy();
    addLog(`You reset the encounter for ${state.combat.enemy.name}.`);
  }
}

function setMenuTab(tabId) {
  dom.menuTabButtons.forEach((button) => button.classList.toggle("active", button.dataset.tab === tabId));
  dom.menuPanels.forEach((panel) => panel.classList.toggle("active", panel.id === tabId));
}

function configureOverlay(mode) {
  const showTabs = mode === "menu";
  dom.menuTabs.classList.toggle("hidden", !showTabs);

  if (mode === "gear") {
    dom.overlayLabel.textContent = "Adventurer";
    dom.overlayTitle.textContent = "Gear and stats";
    setMenuTab("equipment");
  } else if (mode === "combat") {
    dom.overlayLabel.textContent = "Battle Routes";
    dom.overlayTitle.textContent = "Choose a target";
    setMenuTab("combat");
  } else if (mode === "gathering") {
    dom.overlayLabel.textContent = "Gathering";
    dom.overlayTitle.textContent = "Choose a focus";
    setMenuTab("gathering");
  } else {
    dom.overlayLabel.textContent = "Field Menu";
    dom.overlayTitle.textContent = "Manage your run";
    setMenuTab("crafting");
  }
}

function setMenuOpen(isOpen) {
  dom.overlayShell.classList.toggle("hidden", !isOpen);
}

function setLogOpen(isOpen) {
  dom.logToggleButton.setAttribute("aria-expanded", String(isOpen));
  dom.battleLogOverlay.classList.toggle("hidden", !isOpen);
}

function attachEvents() {
  dom.encounterButtons.addEventListener("click", (event) => {
    const action = event.target.dataset.action;
    if (!action) {
      return;
    }

    handleAction(action);
    render();
    saveState();
  });

  dom.zoneList.addEventListener("click", (event) => {
    const zoneId = event.target.dataset.zone;
    const enemyId = event.target.dataset.enemy;
    if (!zoneId) {
      return;
    }

    selectZone(zoneId);
    if (enemyId) {
      selectEnemy(enemyId);
    }
    render();
    saveState();
  });

  dom.menuButton.addEventListener("click", () => {
    configureOverlay("menu");
    setMenuOpen(true);
  });

  dom.gearButton.addEventListener("click", () => {
    configureOverlay("gear");
    setMenuOpen(true);
  });

  dom.combatButton.addEventListener("click", () => {
    configureOverlay("combat");
    setMenuOpen(true);
  });

  dom.autoCombatButton.addEventListener("click", () => {
    handleAction("toggle-combat");
    render();
    saveState();
  });

  dom.gatherButton.addEventListener("click", () => {
    configureOverlay("gathering");
    setMenuOpen(true);
  });

  dom.craftButton.addEventListener("click", () => {
    configureOverlay("menu");
    setMenuTab("crafting");
    setMenuOpen(true);
  });

  dom.equipmentSlots.addEventListener("click", (event) => {
    const weaponId = event.target.dataset.weapon;
    if (weaponId) {
      state.equipment.weapon = weaponId;
      addLog(`${getWeaponById(weaponId).name} is now equipped.`);
      render();
      saveState();
      return;
    }

    const toolId = event.target.dataset.tool;
    if (toolId) {
      state.equipment.tool = toolId;
      addLog(`${getToolById(toolId).name} is now equipped in the tool slot.`);
      render();
      saveState();
      return;
    }

    const healingId = event.target.dataset.healing;
    if (!healingId) {
      return;
    }

    const item = getHealingItem(healingId);
    if (!item || state.hero.combatLevel < item.unlockLevel) {
      return;
    }

    state.healing.equipped = healingId;
    addLog(`${item.name} is now equipped in the bandage slot.`);
    render();
    saveState();
  });

  dom.closeMenuButton.addEventListener("click", () => {
    setMenuOpen(false);
  });

  dom.logToggleButton.addEventListener("click", () => {
    const expanded = dom.logToggleButton.getAttribute("aria-expanded") === "true";
    setLogOpen(!expanded);
  });

  dom.closeLogButton.addEventListener("click", () => {
    setLogOpen(false);
  });

  dom.overlayShell.addEventListener("click", (event) => {
    if (event.target === dom.overlayShell) {
      setMenuOpen(false);
    }
  });

  dom.menuTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setMenuTab(button.dataset.tab);
    });
  });

  dom.skillCards.addEventListener("click", (event) => {
    const skillId = event.target.dataset.skill;
    if (!skillId) {
      return;
    }

    state.activeSkill = skillId;
    const skill = skills.find((entry) => entry.id === skillId);
    state.gathering.nodeHealth = getSkillNode(skill, getToolProfile(undefined, skill.id).gatherDamage).nodeHealth;
    state.gathering.respawnDelay = 0;
    state.gathering.actionTimer = 0;
    state.gathering.nodeKey = `${skill.id}:${getSkillNode(skill, getToolProfile(undefined, skill.id).gatherDamage).id}`;
    state.skillProgress[skillId] = 0;
    addLog(`${skills.find((skill) => skill.id === skillId).name} is now your focus.`);
    render();
    saveState();
  });

  dom.recipeList.addEventListener("click", (event) => {
    const recipeId = event.target.dataset.recipe;
    const craftFocus = event.target.dataset.craftFocus;
    if (craftFocus) {
      if (state.crafting.selectedRecipeId === craftFocus) {
        state.crafting.selectedRecipeId = null;
        state.crafting.progress = 0;
        addLog("Field auto-crafting paused.");
      } else {
        state.crafting.selectedRecipeId = craftFocus;
        state.crafting.progress = 0;
        addLog(`${getRecipe(craftFocus).name} is now your field auto-craft target.`);
      }
      render();
      saveState();
      return;
    }

    if (!recipeId) {
      return;
    }

    craftRecipe(recipeId);
    render();
    saveState();
  });

  dom.resetButton.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    state = baseState();
    addLog("A fresh adventure begins.");
    render();
    saveState();
  });
}

function gameLoop() {
  const now = Date.now();
  const elapsed = now - state.lastTickAt;
  if (elapsed >= TICK_MS) {
    tick(elapsed);
    state.lastTickAt = now;
    const menuOpen = !dom.overlayShell.classList.contains("hidden") || !dom.battleLogOverlay.classList.contains("hidden");
    const activeRenderMs = menuOpen ? 450 : RENDER_MS;
    if (!state.lastRenderAt || now - state.lastRenderAt >= activeRenderMs) {
      render();
      state.lastRenderAt = now;
    }
    if (now - state.lastSavedAt >= SAVE_MS) {
      saveState();
    }
  }

  requestAnimationFrame(gameLoop);
}

processOfflineProgress();
state.lastTickAt = Date.now();
state.lastRenderAt = Date.now();
attachEvents();
render();
saveState();
requestAnimationFrame(gameLoop);
