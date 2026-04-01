const STORAGE_KEY = "emberwake-idle-save-v2";
const LEGACY_STORAGE_KEY = "emberwake-idle-save-v1";
const TICK_MS = 1000;
const OFFLINE_CAP_MS = 1000 * 60 * 60 * 6;
const zoneArt = {
  fen: "./assets/backgrounds/whispering-fen.svg",
  cinderwood: "./assets/backgrounds/cinderwood.svg",
  "red-trail": "./assets/backgrounds/red-trail.svg",
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
];

const skills = [
  {
    id: "prospecting",
    name: "Prospecting",
    resource: "gold",
    nodeHealth: 5,
    unlockLevel: 1,
    xpPerAction: 0,
    description: "Chip away at shallow seams for a slow trickle of coin.",
  },
  {
    id: "foraging",
    name: "Foraging",
    resource: "herbs",
    nodeHealth: 4,
    unlockLevel: 1,
    xpPerAction: 1,
    description: "Gather herbs to support every healing recipe tier.",
  },
  {
    id: "woodcutting",
    name: "Woodcutting",
    resource: "wood",
    nodeHealth: 5,
    unlockLevel: 1,
    xpPerAction: 1,
    description: "Collect sturdy wood for weapons, frames, and field kits.",
  },
  {
    id: "mining",
    name: "Mining",
    resource: "ironOre",
    nodeHealth: 6,
    unlockLevel: 2,
    xpPerAction: 1,
    description: "Pull iron ore from exposed veins for forged upgrades and tools.",
  },
];

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
  { id: "sword", name: "Iron Blade", weaponType: "sword", baseDamage: 5, baseDelay: 1.15, growthLabel: "Strength Blade" },
  { id: "shield", name: "Tower Shield", weaponType: "shield", baseDamage: 2, baseDelay: 1.28, growthLabel: "Defense Bulwark" },
  { id: "bow", name: "Marsh Bow", weaponType: "bow", baseDamage: 4, baseDelay: 1.02, growthLabel: "Dexterity Bow" },
  { id: "staff", name: "Fen Staff", weaponType: "staff", baseDamage: 5, baseDelay: 1.22, growthLabel: "Magic Focus" },
  { id: "knife", name: "Camp Knife", weaponType: "knife", baseDamage: 3, baseDelay: 0.95, growthLabel: "Quick Blade" },
  { id: "spear", name: "Cinder Pike", weaponType: "spear", baseDamage: 4, baseDelay: 1.08, growthLabel: "Critical Pike" },
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
    description: "Upgradeable head gear. Grants HP, MAG, and DEF each level.",
    costs: { herbs: 2, fiber: 1, essence: 2, gold: 180 },
    upgrade: { maxHealth: 4, magic: 1, defense: 1 },
    type: "gear",
  },
  {
    id: "chest",
    name: "Ember Mail",
    description: "Upgradeable chest gear. Grants HP and DEF each level.",
    costs: { ironOre: 6, hide: 3, emberCore: 1, gold: 340 },
    upgrade: { maxHealth: 8, defense: 1 },
    type: "gear",
  },
  {
    id: "arms",
    name: "Ranger Bracers",
    description: "Upgradeable arm gear. Grants HP, STR, and DEF each level.",
    costs: { hide: 2, wood: 3, fiber: 1, gold: 220 },
    upgrade: { maxHealth: 5, strength: 1, defense: 1 },
    type: "gear",
  },
  {
    id: "feet",
    name: "Scout Greaves",
    description: "Upgradeable foot gear. Grants HP, DEX, and DEF each level.",
    costs: { hide: 2, fiber: 2, wood: 2, gold: 220 },
    upgrade: { maxHealth: 4, dexterity: 1, defense: 1 },
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
  wood: { name: "Wood", icon: "W", precision: 0, description: "Gathered from mature trees." },
  ironOre: { name: "Iron Ore", icon: "Fe", precision: 0, description: "A forge-ready metal ore." },
  herbs: { name: "Herbs", icon: "H", precision: 0, description: "Fresh plants used in field medicine." },
  essence: { name: "Essence", icon: "Es", precision: 0, description: "Residual energy taken from marsh creatures." },
  fiber: { name: "Fiber", icon: "Fb", precision: 0, description: "Tough strands pulled from bog growth." },
  hide: { name: "Hide", icon: "Hd", precision: 0, description: "Supple leather cut from hunted beasts." },
  fang: { name: "Fang", icon: "Fg", precision: 0, description: "Predator teeth used in stronger draughts." },
  emberCore: { name: "Ember Core", icon: "Em", precision: 0, description: "A hot core pried from fierce quarry." },
  scrap: { name: "Scrap", icon: "Sc", precision: 0, description: "Recovered parts from raiders and trail gear." },
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
      ironOre: 0,
      herbs: 0,
      essence: 0,
      fiber: 0,
      hide: 0,
      fang: 0,
      emberCore: 0,
      scrap: 0,
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
      nodeHealth: skills[0].nodeHealth,
      respawnDelay: 0,
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
    if (!merged.gathering.nodeHealth || merged.gathering.nodeHealth > activeSkill.nodeHealth) {
      merged.gathering.nodeHealth = activeSkill.nodeHealth;
    }

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
    baseDamage: weapon.baseDamage || 1,
    proficiency: level,
    defense: 0,
    dexterity: 0,
    critRate: 0,
    attackSpeed: 0,
    armorBreak: 0,
    baseDelay: weapon.baseDelay || 1,
    damageLabel: "STR",
  };

  switch (weapon.weaponType) {
    case "knife":
      profile.damageLabel = "STR";
      break;
    case "sword":
      profile.damageLabel = "STR";
      break;
    case "spear":
      profile.critRate = Math.floor(level * 0.35);
      profile.dexterity = Math.floor(level * 0.15);
      profile.damageLabel = "DEX";
      break;
    case "bow":
      profile.dexterity = Math.floor(level * 0.25);
      profile.damageLabel = "DEX";
      break;
    case "shield":
      profile.defense = 2 + Math.floor(level * 0.25);
      profile.damageLabel = "DEF";
      break;
    case "staff":
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
  return {
    attackPenalty: Math.max(1, Math.ceil(level / 12)),
    gatherDamage: matchesSkill ? 1 + Math.max(1, Math.ceil(level / 8)) : 1,
    matchesSkill,
  };
}

function getCombatStats() {
  const weaponProfile = getWeaponProfile();
  const toolProfile = getToolProfile();
  const critRate = Math.min(60, state.hero.critRate + weaponProfile.critRate);
  const dexterity = Math.max(0, state.hero.dexterity + weaponProfile.dexterity);
  const attackSpeedRating = Math.max(0, state.hero.attackSpeed + weaponProfile.attackSpeed);
  const attackDelay = Math.max(0.35, weaponProfile.baseDelay / (1 + attackSpeedRating / 1000));
  const attacksPerSecond = 1 / attackDelay;
  return {
    strength: state.hero.strength,
    defense: state.hero.defense + weaponProfile.defense,
    magic: state.hero.magic,
    dexterity,
    critRate,
    attackSpeed: attackSpeedRating,
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
  const proficiencyMultiplier = 1 + profile.proficiency / 100;
  let baseDamage = profile.baseDamage;

  switch (weapon.weaponType) {
    case "knife":
      baseDamage += stats.strength * 0.3;
      break;
    case "sword":
      baseDamage += stats.strength * 0.5;
      break;
    case "spear":
      baseDamage += stats.dexterity * 0.42;
      break;
    case "bow":
      baseDamage += stats.dexterity * 0.55;
      break;
    case "shield":
      baseDamage += stats.defense * 0.3 + stats.strength * 0.15;
      break;
    case "staff":
      baseDamage += stats.magic * 0.65;
      break;
    default:
      baseDamage += stats.strength * 0.18;
      break;
  }

  return Math.max(1, baseDamage * proficiencyMultiplier - (weapon.weaponType === "staff" ? toolPenalty * 0.5 : toolPenalty));
}

function getUpgradeCosts(recipe) {
  const currentLevel = getItemLevel(recipe);
  const factor = 1 + currentLevel * 0.18;
  return Object.fromEntries(
    Object.entries(recipe.costs).map(([resource, amount]) => [resource, Math.max(1, Math.ceil(amount * factor))])
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
  state.resources[resource] = (state.resources[resource] || 0) + amount;
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

  const strikes = Math.floor(seconds);
  if (strikes <= 0) {
    return;
  }

  const gatherDamage = getToolProfile().gatherDamage;
  let completed = 0;
  for (let index = 0; index < strikes; index += 1) {
    if (state.gathering.respawnDelay > 0) {
      state.gathering.respawnDelay -= 1;
      if (state.gathering.respawnDelay <= 0) {
        state.gathering.nodeHealth = skill.nodeHealth;
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
    state.gathering.respawnDelay > 0 ? 100 : ((skill.nodeHealth - state.gathering.nodeHealth) / skill.nodeHealth) * 100;

  if (completed > 0) {
    const bonuses = getAccessoryBonuses();
    const totalYield =
      skill.resource === "gold" ? Math.max(1, Math.floor(completed * (1 + bonuses.goldFind))) : completed;
    addResource(skill.resource, totalYield);
    state.stats.totalGathered += completed;
    if (skill.xpPerAction > 0) {
      addCombatXp(skill.xpPerAction * completed);
    }
    addLog(`${skill.name} yielded ${totalYield} ${resourceMeta[skill.resource].name.toLowerCase()}.`);
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
    .map(([resource, amount]) => `${state.resources[resource] || 0}/${amount} ${resourceMeta[resource].name}`)
    .join(" | ");
}

function renderHero() {
  const weapon = getCurrentWeapon();
  const tool = getCurrentTool();
  const stats = getCombatStats();
  const damagePerHit = getWeaponDamage(stats);
  const dps = ((damagePerHit + damagePerHit * (stats.critRate / 100) * 0.5) / stats.attackDelay).toFixed(1);
  const heroStats = [
    { label: "HP", value: `${Math.round(state.hero.health)}/${state.hero.maxHealth}` },
    { label: "STR", value: stats.strength },
    { label: "DEF", value: stats.defense },
    { label: "MAG", value: stats.magic },
    { label: "DEX", value: stats.dexterity },
    { label: "CRIT", value: `${stats.critRate}%` },
    { label: "SPD", value: state.hero.attackSpeed },
    { label: "Level", value: state.hero.combatLevel },
    { label: "Kills", value: state.stats.kills },
    { label: "Healed", value: state.stats.totalHealed },
    { label: "Crafted", value: state.stats.totalCrafted },
    { label: "Gathered", value: state.stats.totalGathered },
    { label: "Auto Med", value: state.stats.totalAutoCraftedHealing },
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
  dom.heroSummaryLine.innerHTML = `${weapon.name} ${weaponLevelLabel}<br />${toolLabel} | DPS: ${dps}`;
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
    { label: "Head", name: "Mystic Hood", level: state.crafted.head || 0, summary: `+${(state.crafted.head || 0) * 4} HP | +${state.crafted.head || 0} MAG | +${state.crafted.head || 0} DEF` },
    { label: "Chest", name: "Ember Mail", level: state.crafted.chest || 0, summary: `+${(state.crafted.chest || 0) * 8} HP | +${state.crafted.chest || 0} DEF` },
    { label: "Arms", name: "Ranger Bracers", level: state.crafted.arms || 0, summary: `+${(state.crafted.arms || 0) * 5} HP | +${state.crafted.arms || 0} STR | +${state.crafted.arms || 0} DEF` },
    { label: "Feet", name: "Scout Greaves", level: state.crafted.feet || 0, summary: `+${(state.crafted.feet || 0) * 4} HP | +${state.crafted.feet || 0} DEX | +${state.crafted.feet || 0} DEF` },
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
      } | Prof ${equippedProfile.proficiency}%</span>
    </div>
    <div class="choice-button-row">${weaponOptions}</div>
    <div class="equipment-slot-card">
      <div>
        <div class="choice-title">Weapon Profile</div>
        <div class="choice-copy">${equippedWeapon.id === "hands" ? "Bare-handed baseline damage." : `${equippedWeapon.growthLabel} with ${equippedProfile.proficiency}% proficiency.`}</div>
      </div>
      <span class="choice-chip">DMG ${equippedProfile.baseDamage} | DEF ${equippedProfile.defense} | DEX ${equippedProfile.dexterity} | CRIT ${equippedProfile.critRate}% | Delay ${equippedProfile.baseDelay.toFixed(2)}s | ${equippedProfile.damageLabel} scale</span>
    </div>
    <div class="equipment-slot-card">
      <div>
        <div class="choice-title">Tool</div>
        <div class="choice-copy">${equippedTool.name}</div>
      </div>
      <span class="choice-chip">${
        equippedTool.id === "hands" ? "No penalty" : `Lv ${Math.max(1, getToolLevel(equippedTool.id))} | -${equippedToolProfile.attackPenalty} DMG`
      }</span>
    </div>
    <div class="choice-button-row">${toolOptions}</div>
    <div class="equipment-slot-card">
      <div>
        <div class="choice-title">Tool Trade-Off</div>
        <div class="choice-copy">${
          equippedTool.id === "hands"
            ? "Equip a tool when you want faster gathering."
            : `${equippedTool.growthLabel} Matching focus gathers for ${equippedToolProfile.gatherDamage} damage.`
        }</div>
      </div>
      <span class="choice-chip">${
        equippedTool.id === "hands"
          ? "Gather Hit 1"
          : `${equippedTool.toolType} | Gather Hit ${equippedToolProfile.gatherDamage}`
      }</span>
    </div>
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
              <div class="choice-title">Accessory</div>
              <div class="choice-copy">${accessory.name}</div>
            </div>
            <span class="choice-chip">Lv ${accessory.level} | ${accessory.level > 0 ? accessory.summary : "Uncrafted"}</span>
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
  const progress = Math.min(100, state.skillProgress[activeSkill.id] || 0);
  const tool = getCurrentTool();
  const toolProfile = getToolProfile();
  dom.gatherSummaryLine.textContent = `${activeSkill.name} | ${resourceMeta[activeSkill.resource].name}`;
  dom.gatherCycleLabel.textContent = state.gathering.respawnDelay > 0
    ? `Node Respawning | Hit ${toolProfile.gatherDamage} | ${tool.id === "hands" ? "No tool equipped" : `${tool.name} -${toolProfile.attackPenalty} DMG`}`
    : `Node ${state.gathering.nodeHealth}/${activeSkill.nodeHealth} HP | Hit ${toolProfile.gatherDamage} | ${
        tool.id === "hands" ? "No tool equipped" : `${tool.name} -${toolProfile.attackPenalty} DMG`
      }`;
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
  dom.craftSummaryLine.textContent = `${recipe.name} | ${resourceMeta[product].name}`;
  dom.craftCycleLabel.textContent = stock >= stockLimit
    ? `Reserve full ${stock}/${stockLimit}`
    : canAfford(recipe.costs)
      ? `Cycle ${recipe.craftSeconds}s | Stock ${stock}/${stockLimit}`
      : `Waiting for materials | Stock ${stock}/${stockLimit}`;
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
      return `
        <div class="zone-card ${active ? "active" : ""} ${unlocked ? "" : "locked"}">
          <div class="zone-name-row">
            <div>
              <div class="choice-title">${zone.name}</div>
              <div class="choice-copy">${zone.description}</div>
            </div>
            <span class="pill">Lvl ${zone.unlockLevel}</span>
          </div>
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
        </div>
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
      <div class="enemy-name">${enemy.name}</div>
      <p class="enemy-subtitle">Lvl ${enemy.level} | ${zone.name}</p>
      <div class="enemy-health-bar">
        <div class="enemy-health-fill" style="width: ${healthPercent}%"></div>
      </div>
      <p class="enemy-subtitle">${Math.max(0, Math.round(enemy.currentHealth))} / ${enemy.maxHealth} HP | EVA ${enemy.evasion} | Hit ${hitChance}%</p>
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
      const progress = Math.min(100, state.skillProgress[skill.id] || 0);
      return `
        <div class="skill-card">
          <div class="skill-header">
            <div>
              <h3>${skill.name}</h3>
              <p class="skill-rate">${skill.description}</p>
            </div>
            <span class="pill">${skill.nodeHealth} HP node</span>
          </div>
          <div class="xp-bar">
            <div class="xp-fill" style="width: ${progress}%"></div>
          </div>
          <p class="skill-rate">Produces ${resourceMeta[skill.resource].name} | unlocks at level ${skill.unlockLevel}</p>
          <button class="${active ? "skill-button active" : "secondary-button"}" data-skill="${skill.id}" ${
            unlocked ? "" : "disabled"
          }>${unlocked ? (active ? "Active" : "Set Active") : "Locked"}</button>
        </div>
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
    .map((group) => {
      const groupRecipes = recipes.filter(group.matcher);
      return `
        <div class="recipe-group">
          <div class="recipe-group-header">
            <div>
              <div class="choice-title">${group.label}</div>
              <div class="choice-copy">${group.label === "Bandages" ? "Select what medicine to make next." : `Craft ${group.label.toLowerCase()} upgrades for your run.`}</div>
            </div>
          </div>
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
                      <p class="recipe-costs">${recipe.description}</p>
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
                  <p class="recipe-costs">Cost: ${formatCosts(activeCosts)}</p>
                  <p class="recipe-costs">Result: ${resultText}</p>
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
        </div>
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

function render() {
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
    state.gathering.nodeHealth = skill.nodeHealth;
    state.gathering.respawnDelay = 0;
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
    render();
    saveState();
  }

  requestAnimationFrame(gameLoop);
}

processOfflineProgress();
state.lastTickAt = Date.now();
attachEvents();
render();
saveState();
requestAnimationFrame(gameLoop);
