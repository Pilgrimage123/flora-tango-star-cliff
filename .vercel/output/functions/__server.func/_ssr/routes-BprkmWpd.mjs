import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import "./router-C8uA3RjX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BprkmWpd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ANIMATION_TIMINGS = {
	QUEUE_STEP_MS: 450,
	TURN_TRANSITION_MS: 300,
	ENEMY_ACTION_MS: 420,
	MOVE_MS: 380,
	HIT_MS: 360,
	DEATH_MS: 640
};
var NODE_TYPES = {
	BATTLE: "battle",
	ELITE: "elite",
	PUB: "pub",
	WORKSHOP: "workshop",
	EVENT: "event",
	TREASURE: "treasure",
	BOSS: "boss"
};
var TILE_TAGS = {
	garlic: {
		id: "garlic",
		name: "Česnek",
		icon: "🧄",
		color: "#84cc16"
	},
	holy: {
		id: "holy",
		name: "Svěcená",
		icon: "✝️",
		color: "#38bdf8"
	},
	brawl: {
		id: "brawl",
		name: "Hospoda",
		icon: "🍺",
		color: "#f59e0b"
	},
	craft: {
		id: "craft",
		name: "Řemeslo",
		icon: "⚙️",
		color: "#a1a1aa"
	}
};
var HERO_TILES = {
	oak_stake: {
		id: "oak_stake",
		name: "Dubový kolík",
		icon: "tile.oak_stake",
		type: "attack",
		tags: ["brawl"],
		dmg: 4,
		cooldown: 3,
		quick: false,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: []
		}],
		resonance: null,
		description: "Poctivý dubový kolík ořezaný kapesní kudlou. Dosah 1 pole vpřed za 4 DMG.",
		flavor: "„Na upíra jedině dub, smrk se mu v žebrech tříští!“",
		starter: true,
		upgrades: [{
			level: 1,
			name: "Okovaný dubový kolík+",
			dmg: 6,
			cooldown: 3,
			pattern: [{
				offset: 1,
				dmg: 6,
				effects: []
			}],
			description: "Vylepšená špice: 6 DMG na 1 pole vpřed."
		}, {
			level: 2,
			name: "Svěcený dubový kolík++",
			dmg: 6,
			cooldown: 2,
			pattern: [{
				offset: 1,
				dmg: 6,
				effects: [{
					type: "bleed",
					amount: 2
				}]
			}],
			description: "Mistrovský kolík (CD 2): 6 DMG na 1 pole vpřed + Krvácení (2)."
		}]
	},
	garlic_belch: {
		id: "garlic_belch",
		name: "Česnekový pšouk",
		icon: "tile.garlic_belch",
		type: "attack",
		tags: ["garlic"],
		dmg: 2,
		cooldown: 4,
		quick: false,
		pattern: [{
			offset: 1,
			dmg: 2,
			effects: [{
				type: "push",
				distance: 2
			}]
		}],
		resonance: null,
		description: "2 DMG na 1 pole vpřed a prudce odhodí cíl o 2 pole vzad (Push 2).",
		flavor: "„Topinka se šesti stroužky moravského paličáku dělá divy.“",
		starter: true,
		upgrades: [{
			level: 1,
			name: "Česnekový vichr+",
			dmg: 4,
			cooldown: 4,
			pattern: [{
				offset: 1,
				dmg: 4,
				effects: [{
					type: "push",
					distance: 3
				}]
			}],
			description: "4 DMG na 1 pole vpřed a Push o 3 pole vzad."
		}, {
			level: 2,
			name: "Hospodský uragán++",
			dmg: 4,
			cooldown: 3,
			pattern: [{
				offset: 1,
				dmg: 4,
				effects: [{
					type: "push",
					distance: 3
				}, { type: "spawn_garlic_target" }]
			}],
			description: "CD 3, 4 DMG, Push o 3 pole a zanechá Česnekový oblak."
		}]
	},
	holy_syringe: {
		id: "holy_syringe",
		name: "Hasičská stříkačka se svěcenou vodou",
		icon: "tile.holy_syringe",
		type: "ranged",
		tags: ["holy"],
		dmg: 2,
		cooldown: 4,
		quick: false,
		projectileRange: 3,
		pattern: [
			{
				offset: 1,
				dmg: 2,
				projectile: true,
				effects: []
			},
			{
				offset: 2,
				dmg: 2,
				projectile: true,
				effects: []
			},
			{
				offset: 3,
				dmg: 2,
				projectile: true,
				effects: []
			}
		],
		resonance: null,
		description: "Střela na dosah až 3 pole (zastaví se o první cíl) za 2 DMG.",
		flavor: "„Půjčeno ze zbrojnice SDH Horní Děs, posvěceno panem farářem.“",
		starter: true,
		upgrades: [{
			level: 1,
			name: "Mosazná stříkačka+",
			dmg: 4,
			cooldown: 4,
			projectileRange: 4,
			pattern: [
				{
					offset: 1,
					dmg: 4,
					projectile: true,
					effects: []
				},
				{
					offset: 2,
					dmg: 4,
					projectile: true,
					effects: []
				},
				{
					offset: 3,
					dmg: 4,
					projectile: true,
					effects: []
				},
				{
					offset: 4,
					dmg: 4,
					projectile: true,
					effects: []
				}
			],
			description: "Dosah 4 pole, 4 DMG prvnímu cíli."
		}, {
			level: 2,
			name: "Tlaková stříkačka++",
			dmg: 4,
			cooldown: 3,
			projectileRange: 4,
			pattern: [
				{
					offset: 1,
					dmg: 4,
					projectile: true,
					effects: [{ type: "flip_target" }, {
						type: "push",
						distance: 1
					}]
				},
				{
					offset: 2,
					dmg: 4,
					projectile: true,
					effects: [{ type: "flip_target" }, {
						type: "push",
						distance: 1
					}]
				},
				{
					offset: 3,
					dmg: 4,
					projectile: true,
					effects: [{ type: "flip_target" }, {
						type: "push",
						distance: 1
					}]
				},
				{
					offset: 4,
					dmg: 4,
					projectile: true,
					effects: [{ type: "flip_target" }, {
						type: "push",
						distance: 1
					}]
				}
			],
			description: "CD 3, dosah 4 pole, 4 DMG, otočí cíl čelem vzad a odhodí o 1 pole."
		}]
	},
	belly_vault: {
		id: "belly_vault",
		name: "Hospodský přemet přes pupík",
		icon: "tile.belly_vault",
		type: "move",
		tags: ["brawl", "garlic"],
		dmg: 0,
		cooldown: 2,
		quick: false,
		leapDistance: 2,
		leaveGarlicCloud: true,
		pattern: [{
			offset: 2,
			dmg: 0,
			isMoveTarget: true,
			effects: []
		}],
		resonance: {
			nextTileCdReduction: 1,
			description: "Rezonance: další destička ve frontě má po odehrání CD −1."
		},
		description: "Přeskok o 2 pole vpřed přes entity (je-li obsazeno, přistane na nejbližším volném poli). Zanechá Česnekový oblak (2 tahy). Rezonance: další destička CD −1.",
		flavor: "„Sice v kříži křupne, ale upír čumí jak tele na nová vrata!“",
		starter: false,
		upgrades: [{
			level: 1,
			name: "Sokolský přemet přes pupík+",
			dmg: 0,
			cooldown: 2,
			leapDistance: 2,
			leaveGarlicCloud: true,
			resonance: {
				nextTileCdReduction: 2,
				description: "Rezonance: další destička ve frontě má CD −2."
			},
			description: "Přeskok o 2 pole vpřed, Česnekový oblak a Rezonance sníží CD další destičky o 2."
		}, {
			level: 2,
			name: "Mistrovský přemet s výkopem++",
			dmg: 0,
			cooldown: 1,
			leapDistance: 2,
			leaveGarlicCloud: true,
			selfEffect: {
				type: "empower",
				amount: 2
			},
			resonance: {
				nextTileCdReduction: 2,
				description: "Rezonance: další destička má CD −2 + získáš Zesílení (+2 DMG)."
			},
			description: "CD 1! Přeskok o 2 pole, Česnekový oblak, Zesílení (+2 DMG) a Rezonance CD −2."
		}]
	},
	rosary_slap: {
		id: "rosary_slap",
		name: "Facka růžencem",
		icon: "tile.rosary_slap",
		type: "attack",
		tags: ["holy"],
		dmg: 2,
		cooldown: 2,
		quick: false,
		selfFlipAfter: true,
		pattern: [{
			offset: -1,
			dmg: 2,
			effects: []
		}],
		resonance: null,
		description: "Švihne 1 pole ZA ZÁDY za 2 DMG a okamžitě otočí Vencu čelem vzad.",
		flavor: "„Kdo mi to funí za krk?! Tady máš desátek přes dršku!“",
		starter: false,
		upgrades: [{
			level: 1,
			name: "Dvojitá facka růžencem+",
			dmg: 4,
			cooldown: 2,
			selfFlipAfter: true,
			pattern: [{
				offset: -1,
				dmg: 4,
				effects: []
			}],
			description: "4 DMG za zády a otočí lovce čelem vzad."
		}, {
			level: 2,
			name: "Kajícná facka růžencem++",
			dmg: 4,
			cooldown: 1,
			selfFlipAfter: true,
			pattern: [{
				offset: -1,
				dmg: 4,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			}],
			description: "CD 1, 4 DMG za zády + Zmatení a otočí lovce."
		}]
	},
	funeral_hook: {
		id: "funeral_hook",
		name: "Půjčený pohřební hák",
		icon: "tile.funeral_hook",
		type: "ranged",
		tags: ["craft"],
		dmg: 2,
		cooldown: 4,
		quick: false,
		projectileRange: 3,
		pattern: [
			{
				offset: 1,
				dmg: 2,
				projectile: true,
				effects: [{ type: "pull" }]
			},
			{
				offset: 2,
				dmg: 2,
				projectile: true,
				effects: [{ type: "pull" }]
			},
			{
				offset: 3,
				dmg: 2,
				projectile: true,
				effects: [{ type: "pull" }]
			}
		],
		resonance: null,
		description: "Dosah až 3 pole: první zasaženou entitu zraní za 2 DMG a přitáhne těsně před lovce (Pull).",
		flavor: "„Hrobník říkal, ať mu ho vrátím do pátku. Pojď sem, holoubku!“",
		starter: false,
		upgrades: [{
			level: 1,
			name: "Kovaný pohřební hák+",
			dmg: 4,
			cooldown: 3,
			projectileRange: 4,
			pattern: [
				{
					offset: 1,
					dmg: 4,
					projectile: true,
					effects: [{ type: "pull" }, {
						type: "bleed",
						amount: 2
					}]
				},
				{
					offset: 2,
					dmg: 4,
					projectile: true,
					effects: [{ type: "pull" }, {
						type: "bleed",
						amount: 2
					}]
				},
				{
					offset: 3,
					dmg: 4,
					projectile: true,
					effects: [{ type: "pull" }, {
						type: "bleed",
						amount: 2
					}]
				},
				{
					offset: 4,
					dmg: 4,
					projectile: true,
					effects: [{ type: "pull" }, {
						type: "bleed",
						amount: 2
					}]
				}
			],
			description: "CD 3, dosah 4 pole, 4 DMG + Pull + Krvácení."
		}, {
			level: 2,
			name: "Řeznický hák na korhele++",
			dmg: 6,
			cooldown: 3,
			projectileRange: 4,
			pattern: [
				{
					offset: 1,
					dmg: 6,
					projectile: true,
					effects: [{ type: "pull" }, {
						type: "bleed",
						amount: 3
					}]
				},
				{
					offset: 2,
					dmg: 6,
					projectile: true,
					effects: [{ type: "pull" }, {
						type: "bleed",
						amount: 3
					}]
				},
				{
					offset: 3,
					dmg: 6,
					projectile: true,
					effects: [{ type: "pull" }, {
						type: "bleed",
						amount: 3
					}]
				},
				{
					offset: 4,
					dmg: 6,
					projectile: true,
					effects: [{ type: "pull" }, {
						type: "bleed",
						amount: 3
					}]
				}
			],
			description: "Dosah 4 pole, 6 DMG + Pull + silné Krvácení (3)."
		}]
	},
	manhole_shield: {
		id: "manhole_shield",
		name: "Štít z kanálového poklopu",
		icon: "tile.manhole_shield",
		type: "defense",
		tags: ["craft", "brawl"],
		dmg: 0,
		cooldown: 4,
		quick: false,
		selfEffect: {
			type: "shield",
			amount: 2
		},
		pattern: [{
			offset: 1,
			dmg: 0,
			effects: [{
				type: "push",
				distance: 1
			}]
		}],
		resonance: null,
		description: "Dá lovci Štít (vykryje 2 body zranění) a odstrčí nepřítele přímo před ním o 1 pole.",
		flavor: "„Litinová klasika z roku 1924. Ani zuby hraběte skrz to neprojdou.“",
		starter: false,
		upgrades: [{
			level: 1,
			name: "Litinový poklop+",
			dmg: 2,
			cooldown: 3,
			selfEffect: {
				type: "shield",
				amount: 2
			},
			pattern: [{
				offset: 1,
				dmg: 2,
				effects: [{
					type: "push",
					distance: 1
				}]
			}],
			description: "CD 3, 2 Štít + 2 DMG a Push o 1 pole vzad."
		}, {
			level: 2,
			name: "Pancéřový poklop vodáren++",
			dmg: 4,
			cooldown: 3,
			selfEffect: {
				type: "shield",
				amount: 4
			},
			pattern: [{
				offset: 1,
				dmg: 4,
				effects: [{
					type: "push",
					distance: 2
				}]
			}],
			description: "4 Štít + 4 DMG a Push o 2 pole vzad."
		}]
	},
	sacristy_bell: {
		id: "sacristy_bell",
		name: "Kostelní zvonec na ministranty",
		icon: "tile.sacristy_bell",
		type: "control",
		tags: ["holy"],
		dmg: 2,
		cooldown: 5,
		quick: false,
		pattern: [{
			offset: 1,
			dmg: 2,
			effects: [{
				type: "stun",
				amount: 1
			}]
		}, {
			offset: 2,
			dmg: 2,
			effects: [{
				type: "stun",
				amount: 1
			}]
		}],
		resonance: null,
		description: "Zazvoní na 2 pole vpřed za 2 DMG a všem zasaženým způsobí Omráčení (přeskočí jejich aktivní akci!).",
		flavor: "„Po třech pivech z toho brní uši i mrtvému.“",
		starter: false,
		upgrades: [{
			level: 1,
			name: "Mosazný zvon z kaple+",
			dmg: 2,
			cooldown: 4,
			pattern: [{
				offset: 1,
				dmg: 2,
				effects: [{
					type: "stun",
					amount: 1
				}]
			}, {
				offset: 2,
				dmg: 2,
				effects: [{
					type: "stun",
					amount: 1
				}]
			}],
			description: "CD 4, zasáhne 2 pole vpřed za 2 DMG + Omráčení."
		}, {
			level: 2,
			name: "Polední zvon Hromburác++",
			dmg: 4,
			cooldown: 4,
			pattern: [{
				offset: 1,
				dmg: 4,
				effects: [{
					type: "stun",
					amount: 1
				}]
			}, {
				offset: 2,
				dmg: 4,
				effects: [{
					type: "stun",
					amount: 1
				}]
			}],
			description: "CD 4, zasáhne 2 pole vpřed za 4 DMG + Omráčení."
		}]
	},
	wood_axe: {
		id: "wood_axe",
		name: "Sekera na polena",
		icon: "tile.wood_axe",
		type: "attack",
		tags: ["brawl"],
		dmg: 4,
		cooldown: 4,
		quick: false,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: [{
				type: "bleed",
				amount: 2
			}]
		}, {
			offset: -1,
			dmg: 4,
			effects: [{
				type: "bleed",
				amount: 2
			}]
		}],
		resonance: null,
		description: "Rozmáchne se kolem dokola a zasáhne OBA sousedy (1 pole vpřed i 1 pole vzad) za 4 DMG + Krvácení.",
		flavor: "„Tuhle mi půjčil švagr, když jsme poráželi kůlnu.“",
		starter: false,
		upgrades: [{
			level: 1,
			name: "Nabroušená sekera+",
			dmg: 6,
			cooldown: 4,
			pattern: [{
				offset: 1,
				dmg: 6,
				effects: [{
					type: "bleed",
					amount: 2
				}]
			}, {
				offset: -1,
				dmg: 6,
				effects: [{
					type: "bleed",
					amount: 2
				}]
			}],
			description: "6 DMG do obou sousedních polí + Krvácení."
		}, {
			level: 2,
			name: "Dřevorubecký obouručák++",
			dmg: 6,
			cooldown: 3,
			pattern: [{
				offset: 1,
				dmg: 6,
				effects: [{
					type: "bleed",
					amount: 2
				}, {
					type: "push",
					distance: 1
				}]
			}, {
				offset: -1,
				dmg: 6,
				effects: [{
					type: "bleed",
					amount: 2
				}, {
					type: "push",
					distance: 1
				}]
			}],
			description: "CD 3, 6 DMG na obě strany + Krvácení + odhození o 1 pole."
		}]
	},
	plank_stomp: {
		id: "plank_stomp",
		name: "Dupnutí na prkno",
		icon: "tile.plank_stomp",
		type: "control",
		tags: ["brawl"],
		dmg: 2,
		cooldown: 3,
		quick: false,
		pattern: [{
			offset: 1,
			dmg: 2,
			effects: [{ type: "spawn_spikes" }]
		}, {
			offset: 2,
			dmg: 2,
			effects: [{
				type: "push",
				distance: 1
			}]
		}],
		resonance: null,
		description: "Zasáhne 2 pole vpřed za 2 DMG: na 1. poli vyrazí z podlahy Naostřené kůly a na 2. poli cíl odhodí o 1 pole.",
		flavor: "„Tady soudruzi památkáři šetřili na hřebíkách!“",
		starter: false,
		upgrades: [{
			level: 1,
			name: "Těžká bota na prkno+",
			dmg: 4,
			cooldown: 3,
			pattern: [{
				offset: 1,
				dmg: 4,
				effects: [{ type: "spawn_spikes" }]
			}, {
				offset: 2,
				dmg: 4,
				effects: [{
					type: "push",
					distance: 1
				}]
			}],
			description: "4 DMG na 2 pole vpřed, vytvoří Kůly na 1. poli a odhodí 2. pole."
		}, {
			level: 2,
			name: "Okovaná bota s hřeby++",
			dmg: 4,
			cooldown: 2,
			pattern: [{
				offset: 1,
				dmg: 4,
				effects: [{ type: "spawn_spikes" }]
			}, {
				offset: 2,
				dmg: 4,
				effects: [{ type: "spawn_spikes" }, {
					type: "push",
					distance: 1
				}]
			}],
			description: "CD 2, 4 DMG a vyrazí Kůly na OBOU polích před lovcem!"
		}]
	},
	funeral_shroud: {
		id: "funeral_shroud",
		name: "Pohřební plachta",
		icon: "tile.funeral_shroud",
		type: "utility",
		tags: ["holy"],
		dmg: 0,
		cooldown: 3,
		quick: false,
		selfEffect: {
			type: "empower",
			amount: 2
		},
		pattern: [{
			offset: 1,
			dmg: 0,
			effects: [{
				type: "confusion",
				amount: 1
			}, { type: "flip_target" }]
		}],
		resonance: {
			nextTileCdReduction: 1,
			description: "Rezonance: další destička ve frontě má CD −1."
		},
		description: "Hodí plachtu na souseda vpřed (Zmatení + otočení) a lovec získá Zesílení (+2 DMG).",
		flavor: "„Kukuč! Kdo zhasnul v rakvi?!“",
		starter: false,
		upgrades: [{
			level: 1,
			name: "Vyšívaná pohřební plachta+",
			dmg: 2,
			cooldown: 3,
			quick: false,
			selfEffect: {
				type: "empower",
				amount: 2
			},
			pattern: [{
				offset: 1,
				dmg: 2,
				effects: [{
					type: "confusion",
					amount: 1
				}, { type: "flip_target" }]
			}],
			resonance: {
				nextTileCdReduction: 1,
				description: "Rezonance: další destička má CD −1."
			},
			description: "2 DMG, Zmatení, otočení a Zesílení."
		}, {
			level: 2,
			name: "Olověná pohřební plachta++",
			dmg: 2,
			cooldown: 2,
			quick: false,
			selfEffect: {
				type: "empower",
				amount: 2
			},
			pattern: [{
				offset: 1,
				dmg: 2,
				effects: [
					{
						type: "confusion",
						amount: 1
					},
					{ type: "flip_target" },
					{
						type: "stun",
						amount: 1
					}
				]
			}],
			resonance: {
				nextTileCdReduction: 1,
				description: "Rezonance: další destička má CD −1."
			},
			description: "CD 2, 2 DMG, Omráčení, otočení a Zesílení."
		}]
	},
	silver_crucifix_beam: {
		id: "silver_crucifix_beam",
		name: "Blesk z posvěceného krucifixu",
		icon: "tile.silver_crucifix_beam",
		type: "ranged",
		tags: ["holy"],
		dmg: 4,
		cooldown: 5,
		quick: false,
		pattern: [
			{
				offset: 1,
				dmg: 4,
				effects: []
			},
			{
				offset: 2,
				dmg: 4,
				effects: []
			},
			{
				offset: 3,
				dmg: 4,
				effects: []
			}
		],
		resonance: null,
		description: "Průrazný paprsek přes 3 pole vpřed – zasáhne VŠECHNY nepřátele v řadě za 4 DMG!",
		flavor: "„Zasviť jim na cestu do pekla, pane faráři!“",
		starter: false,
		upgrades: [{
			level: 1,
			name: "Zlatý krucifix+",
			dmg: 6,
			cooldown: 5,
			pattern: [
				{
					offset: 1,
					dmg: 6,
					effects: []
				},
				{
					offset: 2,
					dmg: 6,
					effects: []
				},
				{
					offset: 3,
					dmg: 6,
					effects: []
				}
			],
			description: "Průrazný paprsek na 3 pole za 6 DMG všem v řadě."
		}, {
			level: 2,
			name: "Arcibiskupský krucifix++",
			dmg: 8,
			cooldown: 4,
			pattern: [
				{
					offset: 1,
					dmg: 8,
					effects: []
				},
				{
					offset: 2,
					dmg: 8,
					effects: []
				},
				{
					offset: 3,
					dmg: 8,
					effects: []
				},
				{
					offset: 4,
					dmg: 8,
					effects: []
				}
			],
			description: "CD 4, průrazný paprsek na 4 pole za 8 DMG všem."
		}]
	},
	nimble_step: {
		id: "nimble_step",
		name: "Pohotový úkrok",
		icon: "tile.nimble_step",
		type: "move",
		tags: ["craft"],
		dmg: 0,
		cooldown: 3,
		quick: true,
		stepBackward: 1,
		pattern: [],
		resonance: null,
		description: "⚡ Rychlovka (0 tahů). V rámci komba uskočí o 1 pole vzad (je-li volno).",
		flavor: "„Když se dráb rozpřáhne, je moudřejší nestát v cestě.“",
		starter: false,
		upgrades: [{
			level: 1,
			name: "Bystrý úkrok+",
			dmg: 0,
			cooldown: 2,
			stepBackward: 1,
			description: "CD 2. Uskočí o 1 pole vzad."
		}, {
			level: 2,
			name: "Mistrovský odskok++",
			dmg: 0,
			cooldown: 2,
			stepBackward: 1,
			selfEffect: {
				type: "shield",
				amount: 2
			},
			description: "CD 2. Uskočí o 1 pole vzad a získá 2 Štít."
		}]
	},
	garlic_pinch: {
		id: "garlic_pinch",
		name: "Stroužek v záloze",
		icon: "tile.garlic_pinch",
		type: "control",
		tags: ["garlic"],
		dmg: 0,
		cooldown: 3,
		quick: true,
		pattern: [{
			offset: 1,
			dmg: 0,
			effects: [{ type: "dispel_empower" }, {
				type: "bleed",
				amount: 1
			}]
		}],
		resonance: null,
		description: "⚡ Rychlovka (0 tahů). Rozmačká stroužek 1 pole vpřed: zruší Zesílení (Empower) a způsobí 1 Krvácení.",
		flavor: "„V kapse kabátu mám vždycky jeden záložní stroužek z loňské sklizně.“",
		starter: false,
		upgrades: [{
			level: 1,
			name: "Paličák v záloze+",
			dmg: 0,
			cooldown: 2,
			pattern: [{
				offset: 1,
				dmg: 0,
				effects: [{ type: "dispel_empower" }, {
					type: "bleed",
					amount: 1
				}]
			}],
			description: "CD 2. Zruší Zesílení a udělí 1 Krvácení."
		}, {
			level: 2,
			name: "Česnekový výron++",
			dmg: 2,
			cooldown: 2,
			pattern: [{
				offset: 1,
				dmg: 2,
				effects: [{ type: "dispel_empower" }, {
					type: "bleed",
					amount: 2
				}]
			}],
			description: "CD 2. 2 DMG, zruší Zesílení a způsobí 2 Krvácení."
		}]
	},
	pub_elbow: {
		id: "pub_elbow",
		name: "Loket ze šenku",
		icon: "tile.pub_elbow",
		type: "attack",
		tags: ["brawl"],
		dmg: 0,
		cooldown: 3,
		quick: true,
		pattern: [{
			offset: 1,
			dmg: 0,
			effects: [{
				type: "push",
				distance: 1
			}]
		}],
		resonance: null,
		description: "⚡ Rychlovka (0 tahů). Vstrčení loktem 1 pole vpřed: Push o 1 pole vzad (může způsobit kolizi!).",
		flavor: "„Povolení k průchodu do výčepu se vyřizuje loktem.“",
		starter: false,
		upgrades: [{
			level: 1,
			name: "Ostrý loket ze šenku+",
			dmg: 2,
			cooldown: 3,
			pattern: [{
				offset: 1,
				dmg: 2,
				effects: [{
					type: "push",
					distance: 1
				}]
			}],
			description: "CD 3. 2 DMG a Push o 1 pole vzad."
		}, {
			level: 2,
			name: "Hospodský krosček++",
			dmg: 2,
			cooldown: 2,
			pattern: [{
				offset: 1,
				dmg: 2,
				effects: [{
					type: "push",
					distance: 2
				}]
			}],
			description: "CD 2. 2 DMG a Push o 2 pole vzad."
		}]
	},
	flail_sweep: {
		id: "flail_sweep",
		name: "Okovaný cep",
		icon: "tile.flail_sweep",
		type: "attack",
		tags: ["brawl"],
		dmg: 4,
		cooldown: 3,
		quick: false,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: [{
				type: "push",
				distance: 2
			}]
		}],
		resonance: null,
		description: "Poctivý selský cep okovaný hřeby. 4 DMG na 1 pole vpřed a Push 2 (kolize o zeď drtí za další DMG!).",
		flavor: "„Tímhle mlátil dědek obilí i loupežníky za stodolou!“",
		starter: true,
		upgrades: [{
			level: 1,
			name: "Kovaný cep s hřeby+",
			dmg: 6,
			cooldown: 3,
			pattern: [{
				offset: 1,
				dmg: 6,
				effects: [{
					type: "push",
					distance: 2
				}]
			}],
			description: "6 DMG na 1 pole vpřed a Push 2."
		}, {
			level: 2,
			name: "Husitský mláticí cep++",
			dmg: 8,
			cooldown: 2,
			pattern: [{
				offset: 1,
				dmg: 8,
				effects: [{
					type: "push",
					distance: 3
				}]
			}],
			description: "CD 2, 8 DMG na 1 pole vpřed a Push 3!"
		}]
	},
	plum_bun: {
		id: "plum_bun",
		name: "Povidlová buchta od babičky",
		icon: "tile.plum_bun",
		type: "utility",
		tags: ["brawl"],
		dmg: 0,
		cooldown: 4,
		quick: false,
		healAmount: 4,
		cureStatus: "bleed",
		pattern: [],
		resonance: null,
		description: "Poctivá česká buchta: vyléčí 4 HP (přebytek přemění na Štít) a zastaví Krvácení.",
		flavor: "„Kdo jí babiččiny povidláky, tomu ani upíří tesák kůži neprokousne.“",
		starter: true,
		upgrades: [{
			level: 1,
			name: "Kynutá buchta se sádlem+",
			dmg: 0,
			cooldown: 3,
			healAmount: 6,
			cureStatus: "bleed",
			description: "CD 3, vyléčí 6 HP a zastaví Krvácení."
		}, {
			level: 2,
			name: "Zlatá sváteční pecen++",
			dmg: 0,
			cooldown: 3,
			healAmount: 8,
			cureStatus: "bleed",
			selfEffect: {
				type: "shield",
				amount: 4
			},
			description: "CD 3, vyléčí 8 HP, zastaví Krvácení a přidá +4 Štít!"
		}]
	},
	heavy_windup: {
		id: "heavy_windup",
		name: "Honzův selský nápřah",
		icon: "tile.heavy_windup",
		type: "utility",
		tags: ["brawl"],
		dmg: 0,
		cooldown: 3,
		quick: true,
		selfEffect: {
			type: "empower",
			amount: 4
		},
		pattern: [],
		resonance: null,
		description: "⚡ Rychlovka (0 tahů). Honza si plivne do dlaní: Zesílení (+4 DMG k příštímu úderu).",
		flavor: "„Počkej, ty bledá potvoro, jen co se pořádně napřáhnu!“",
		starter: true,
		upgrades: [{
			level: 1,
			name: "Drtivý nápřah+",
			dmg: 0,
			cooldown: 2,
			selfEffect: {
				type: "empower",
				amount: 6
			},
			description: "CD 2, Zesílení (+6 DMG)."
		}, {
			level: 2,
			name: "Rázový selský úder++",
			dmg: 0,
			cooldown: 2,
			selfEffect: {
				type: "empower",
				amount: 8
			},
			resonance: {
				nextTileCdReduction: 1,
				description: "Rezonance: další destička má CD −1."
			},
			description: "CD 2, Zesílení (+8 DMG) a Rezonance CD −1."
		}]
	},
	dragoon_sabre: {
		id: "dragoon_sabre",
		name: "Důstojnická šavle vzor 1877",
		icon: "tile.dragoon_sabre",
		type: "attack",
		tags: ["craft"],
		dmg: 6,
		cooldown: 3,
		quick: false,
		pattern: [{
			offset: 1,
			dmg: 6,
			effects: []
		}],
		resonance: null,
		description: "Přesný a smrtící vojenský sek šavlí za 6 DMG na 1 pole vpřed.",
		flavor: "„Broušeno na císařských bruskách ve Vídni. Řeže kosti jak máslo.“",
		starter: true,
		upgrades: [{
			level: 1,
			name: "Zdobená gardová šavle+",
			dmg: 8,
			cooldown: 3,
			pattern: [{
				offset: 1,
				dmg: 8,
				effects: [{
					type: "bleed",
					amount: 2
				}]
			}],
			description: "8 DMG na 1 pole vpřed + Krvácení (2)."
		}, {
			level: 2,
			name: "Generálská čepel++",
			dmg: 10,
			cooldown: 2,
			pattern: [{
				offset: 1,
				dmg: 10,
				effects: [{
					type: "bleed",
					amount: 4
				}]
			}],
			description: "CD 2, 10 DMG na 1 pole vpřed + silné Krvácení (4)."
		}]
	},
	dragoon_pistol: {
		id: "dragoon_pistol",
		name: "Jezdecká křesadlová bambitka",
		icon: "tile.dragoon_pistol",
		type: "ranged",
		tags: ["craft"],
		dmg: 4,
		cooldown: 4,
		quick: false,
		projectileRange: 4,
		pattern: [
			{
				offset: 1,
				dmg: 4,
				projectile: true,
				effects: [{
					type: "stun",
					amount: 1
				}]
			},
			{
				offset: 2,
				dmg: 4,
				projectile: true,
				effects: [{
					type: "stun",
					amount: 1
				}]
			},
			{
				offset: 3,
				dmg: 4,
				projectile: true,
				effects: [{
					type: "stun",
					amount: 1
				}]
			},
			{
				offset: 4,
				dmg: 4,
				projectile: true,
				effects: [{
					type: "stun",
					amount: 1
				}]
			}
		],
		resonance: null,
		description: "Výstřel olověné kule na dosah až 4 pole: 4 DMG prvnímu cíli a Omráčení (1).",
		flavor: "„Jedna rána, jedna díra v upírovi a zvonění v uších až do rána.“",
		starter: true,
		upgrades: [{
			level: 1,
			name: "Dvojhlavňová bambitka+",
			dmg: 6,
			cooldown: 4,
			projectileRange: 4,
			pattern: [
				{
					offset: 1,
					dmg: 6,
					projectile: true,
					effects: [{
						type: "stun",
						amount: 1
					}]
				},
				{
					offset: 2,
					dmg: 6,
					projectile: true,
					effects: [{
						type: "stun",
						amount: 1
					}]
				},
				{
					offset: 3,
					dmg: 6,
					projectile: true,
					effects: [{
						type: "stun",
						amount: 1
					}]
				},
				{
					offset: 4,
					dmg: 6,
					projectile: true,
					effects: [{
						type: "stun",
						amount: 1
					}]
				}
			],
			description: "Dosah 4 pole: 6 DMG a Omráčení."
		}, {
			level: 2,
			name: "Tříhlavňová karabina++",
			dmg: 8,
			cooldown: 3,
			projectileRange: 5,
			pattern: [
				{
					offset: 1,
					dmg: 8,
					projectile: true,
					effects: [{
						type: "stun",
						amount: 1
					}]
				},
				{
					offset: 2,
					dmg: 8,
					projectile: true,
					effects: [{
						type: "stun",
						amount: 1
					}]
				},
				{
					offset: 3,
					dmg: 8,
					projectile: true,
					effects: [{
						type: "stun",
						amount: 1
					}]
				},
				{
					offset: 4,
					dmg: 8,
					projectile: true,
					effects: [{
						type: "stun",
						amount: 1
					}]
				},
				{
					offset: 5,
					dmg: 8,
					projectile: true,
					effects: [{
						type: "stun",
						amount: 1
					}]
				}
			],
			description: "CD 3, dosah 5 polí: 8 DMG a Omráčení."
		}]
	},
	cavalry_parry: {
		id: "cavalry_parry",
		name: "Vojenský kryt čepelí",
		icon: "tile.cavalry_parry",
		type: "defense",
		tags: ["craft"],
		dmg: 0,
		cooldown: 3,
		quick: false,
		shieldAmount: 6,
		pattern: [],
		resonance: null,
		description: "Bravurní vojenský kryt: získá +6 Štítu.",
		flavor: "„Vojenský předpis, paragraf 14: Čepel pod úhlem 45 stupňů odrazí každou ránu.“",
		starter: true,
		upgrades: [{
			level: 1,
			name: "Mistrovský kryt+",
			dmg: 0,
			cooldown: 2,
			shieldAmount: 8,
			description: "CD 2, získá +8 Štítu."
		}, {
			level: 2,
			name: "Kavalírská odveta++",
			dmg: 0,
			cooldown: 2,
			shieldAmount: 10,
			selfEffect: {
				type: "empower",
				amount: 4
			},
			description: "CD 2, získá +10 Štítu a Zesílení (+4 DMG) pro odvetný úder!"
		}]
	},
	stiletto_stab: {
		id: "stiletto_stab",
		name: "Zlodějská dýka pod žebro",
		icon: "tile.stiletto_stab",
		type: "attack",
		tags: ["craft"],
		dmg: 2,
		cooldown: 2,
		quick: false,
		pattern: [{
			offset: 1,
			dmg: 2,
			backstabDmg: 8,
			backstabEffects: [{
				type: "bleed",
				amount: 4
			}],
			effects: []
		}],
		resonance: null,
		description: "Rychlé bodnutí dýkou za 2 DMG. Ze zálohy (pokud cíl stojí zády k tobě): drtivých 8 DMG + 4 Krvácení!",
		flavor: "„Když se na mě díváš, je to jen škrábnutí. Když se otočíš, je to konec.“",
		starter: true,
		upgrades: [{
			level: 1,
			name: "Otrávené stileto+",
			dmg: 4,
			cooldown: 2,
			pattern: [{
				offset: 1,
				dmg: 4,
				backstabDmg: 12,
				backstabEffects: [{
					type: "bleed",
					amount: 6
				}],
				effects: []
			}],
			description: "4 DMG zepředu, ale 12 DMG + 6 Krvácení ze zálohy!"
		}, {
			level: 2,
			name: "Čepel tiché noci++",
			dmg: 4,
			cooldown: 1,
			pattern: [{
				offset: 1,
				dmg: 4,
				backstabDmg: 16,
				backstabEffects: [{
					type: "bleed",
					amount: 8
				}],
				effects: []
			}],
			description: "CD 1! 4 DMG zepředu, ale 16 DMG + 8 Krvácení ze zálohy!"
		}]
	},
	glass_shards: {
		id: "glass_shards",
		name: "Hrst střepů z výlohy",
		icon: "tile.glass_shards",
		type: "attack",
		tags: ["craft"],
		dmg: 2,
		cooldown: 3,
		quick: false,
		pattern: [{
			offset: 1,
			dmg: 2,
			effects: [{
				type: "bleed",
				amount: 4
			}, {
				type: "push",
				distance: 1
			}]
		}, {
			offset: 2,
			dmg: 2,
			effects: [{
				type: "bleed",
				amount: 4
			}, {
				type: "push",
				distance: 1
			}]
		}],
		resonance: null,
		description: "Vrhne ostré skleněné střepy na 2 pole vpřed: 2 DMG + 4 Krvácení a Push 1.",
		flavor: "„Střepy z lékárny přinášejí upírům smůlu a těžké krvácení.“",
		starter: true,
		upgrades: [{
			level: 1,
			name: "Sypané vitriolové střepy+",
			dmg: 4,
			cooldown: 3,
			pattern: [{
				offset: 1,
				dmg: 4,
				effects: [{
					type: "bleed",
					amount: 4
				}, {
					type: "push",
					distance: 1
				}]
			}, {
				offset: 2,
				dmg: 4,
				effects: [{
					type: "bleed",
					amount: 4
				}, {
					type: "push",
					distance: 1
				}]
			}],
			description: "4 DMG na 2 pole vpřed + 4 Krvácení a Push 1."
		}, {
			level: 2,
			name: "Výbušná prachovnice se střepy++",
			dmg: 6,
			cooldown: 2,
			pattern: [{
				offset: 1,
				dmg: 6,
				effects: [{
					type: "bleed",
					amount: 6
				}, {
					type: "push",
					distance: 2
				}]
			}, {
				offset: 2,
				dmg: 6,
				effects: [{
					type: "bleed",
					amount: 6
				}, {
					type: "push",
					distance: 2
				}]
			}],
			description: "CD 2, 6 DMG na 2 pole vpřed + 6 Krvácení a Push 2."
		}]
	},
	shadow_slip: {
		id: "shadow_slip",
		name: "Stínový prokluz za záda",
		icon: "tile.shadow_slip",
		type: "move",
		tags: ["craft"],
		dmg: 0,
		cooldown: 2,
		quick: false,
		leapDistance: 2,
		selfFlipAfter: true,
		pattern: [{
			offset: 2,
			dmg: 0,
			isMoveTarget: true,
			effects: []
		}],
		resonance: null,
		description: "Káča proklouzne stíny o 2 pole vpřed přes nepřátele a okamžitě se otočí čelem k jejich zádům!",
		flavor: "„Kde nic, tu nic. Teď stojím za tebou!“",
		starter: true,
		upgrades: [{
			level: 1,
			name: "Mlžný krok za záda+",
			dmg: 0,
			cooldown: 2,
			leapDistance: 2,
			selfFlipAfter: true,
			selfEffect: {
				type: "shield",
				amount: 2
			},
			description: "Přeskok o 2 pole, otočení za záda a získá +2 Štít."
		}, {
			level: 2,
			name: "Přízračný stín++",
			dmg: 0,
			cooldown: 1,
			leapDistance: 3,
			selfFlipAfter: true,
			selfEffect: {
				type: "shield",
				amount: 4
			},
			description: "CD 1! Přeskok až o 3 pole, otočení a získá +4 Štít."
		}]
	}
};
function getHeroTileDefinition(tileId, upgradeLevel = 0) {
	const base = HERO_TILES[tileId];
	if (!base) return null;
	if (!upgradeLevel || !base.upgrades || upgradeLevel <= 0) return structuredClone(base);
	const upg = base.upgrades[Math.min(upgradeLevel - 1, base.upgrades.length - 1)];
	return structuredClone({
		...base,
		...upg,
		tags: upg.tags || base.tags,
		id: base.id,
		upgradeLevel
	});
}
var ENEMY_TILES = {
	step_toward: {
		id: "step_toward",
		name: "Šouravý krok",
		icon: "intent.step",
		type: "krok",
		delay: 1,
		cooldown: 1,
		pattern: [],
		description: "Otočí se k Vencovi a popojde o 1 pole směrem k němu (je-li volno)."
	},
	turn_toward: {
		id: "turn_toward",
		name: "Bystré otočení",
		icon: "intent.turn",
		type: "otočení",
		delay: 1,
		cooldown: 1,
		pattern: [],
		description: "Otočí se čelem k Vencovi."
	},
	intern_bite: {
		id: "intern_bite",
		name: "Nešikovné kousnutí",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		pattern: [{
			offset: 1,
			dmg: 2,
			effects: []
		}],
		description: "Kousne do pole přímo před sebou za 2 DMG."
	},
	tax_stamp_shot: {
		id: "tax_stamp_shot",
		name: "Krvavý svitek",
		icon: "intent.shoot",
		type: "střela",
		delay: 3,
		cooldown: 3,
		projectileRange: 3,
		pattern: [
			{
				offset: 1,
				dmg: 2,
				projectile: true,
				effects: []
			},
			{
				offset: 2,
				dmg: 2,
				projectile: true,
				effects: []
			},
			{
				offset: 3,
				dmg: 2,
				projectile: true,
				effects: []
			}
		],
		description: "Vystřelí kletbu temného svitku až o 3 pole vpřed (2 DMG prvnímu cíli v dráze)."
	},
	retreat_step: {
		id: "retreat_step",
		name: "Opatrný ústup",
		icon: "intent.step",
		type: "krok",
		retreatIfClose: true,
		delay: 1,
		cooldown: 1,
		pattern: [],
		description: "Drží si odstup od Venci nebo popojde do palebné pozice."
	},
	windup_roar: {
		id: "windup_roar",
		name: "Těžký nápřah",
		icon: "intent.windup",
		type: "nápřah",
		delay: 1,
		cooldown: 2,
		selfEffect: {
			type: "empower",
			amount: 1
		},
		pattern: [],
		description: "Napne svaly (+2 DMG k příštímu úderu ve frontě)."
	},
	drab_lunge: {
		id: "drab_lunge",
		name: "Drábův výpad",
		icon: "intent.strike",
		type: "úder",
		delay: 3,
		cooldown: 3,
		lungeForward: 1,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: [{
				type: "push",
				distance: 1
			}]
		}],
		description: "Popaskočí o 1 pole vpřed (je-li volno) a sekne před sebe za 4 DMG + odhození o 1 pole."
	},
	cleaver_chop: {
		id: "cleaver_chop",
		name: "Sekáčkem do kotlety",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: [{
				type: "bleed",
				amount: 2
			}]
		}],
		description: "Sekne řeznickým sekáčkem 1 pole vpřed za 4 DMG + Krvácení."
	},
	porter_bash: {
		id: "porter_bash",
		name: "Šťouchanec závorou",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		pattern: [{
			offset: 1,
			dmg: 2,
			effects: [{
				type: "push",
				distance: 2
			}]
		}],
		description: "Udeří štítem 1 pole vpřed za 2 DMG a odhodí cíl o 2 pole."
	},
	porter_guard: {
		id: "porter_guard",
		name: "Zavřená vrátnice",
		icon: "intent.shield",
		type: "štít",
		delay: 2,
		cooldown: 2,
		selfEffect: {
			type: "shield",
			amount: 2
		},
		pattern: [],
		description: "Zapře se za štít (+2 Štít)."
	},
	bat_swoop: {
		id: "bat_swoop",
		name: "Prudký nálet",
		icon: "intent.strike",
		type: "úder",
		delay: 1,
		cooldown: 1,
		pattern: [{
			offset: 1,
			dmg: 2,
			effects: []
		}, {
			offset: 2,
			dmg: 2,
			effects: []
		}],
		description: "Rychlý přelet nad 2 poli vpřed za 2 DMG."
	},
	accountant_buff: {
		id: "accountant_buff",
		name: "Temné povzbuzení krve",
		icon: "intent.heal",
		type: "léčení",
		delay: 2,
		cooldown: 3,
		supportAllies: true,
		healAmount: 4,
		empowerAmount: 1,
		pattern: [],
		description: "Vyléčí nejbližšího spojence o 4 HP a přidá mu Zesílení (+2 DMG)."
	},
	accountant_curse: {
		id: "accountant_curse",
		name: "Prokletí prastarého svitku",
		icon: "intent.shoot",
		type: "střela",
		delay: 3,
		cooldown: 3,
		projectileRange: 4,
		pattern: [
			{
				offset: 1,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			},
			{
				offset: 2,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			},
			{
				offset: 3,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			},
			{
				offset: 4,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			}
		],
		description: "Vrhne temný pergamen na dosah 4 polí za 2 DMG + Zmatení."
	},
	boss_sosak_drain: {
		id: "boss_sosak_drain",
		name: "Aristokratické sosání",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		lifesteal: 1,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: []
		}, {
			offset: 2,
			dmg: 4,
			effects: []
		}],
		description: "Švihne kordem na 2 pole vpřed za 4 DMG a vyléčí si 1 HP."
	},
	boss_sosak_summon: {
		id: "boss_sosak_summon",
		name: "Písknutí na kurýra",
		icon: "intent.summon",
		type: "přivolání",
		delay: 3,
		cooldown: 3,
		summonEnemyId: "netopyr",
		pattern: [],
		description: "Přivolá Netopýra-kurýra na nejbližší volnou bránu."
	},
	boss_dagmar_hex: {
		id: "boss_dagmar_hex",
		name: "Krvavá krajková kletba",
		icon: "intent.shoot",
		type: "střela",
		delay: 2,
		cooldown: 2,
		pattern: [
			{
				offset: 1,
				dmg: 4,
				effects: [{
					type: "bleed",
					amount: 2
				}]
			},
			{
				offset: 2,
				dmg: 4,
				effects: [{
					type: "bleed",
					amount: 2
				}]
			},
			{
				offset: 3,
				dmg: 4,
				effects: [{
					type: "bleed",
					amount: 2
				}]
			}
		],
		description: "Temná vlna na 3 pole vpřed za 4 DMG + Krvácení."
	},
	boss_dagmar_thorns: {
		id: "boss_dagmar_thorns",
		name: "Růže z hrobky",
		icon: "intent.summon",
		type: "přivolání",
		delay: 3,
		cooldown: 3,
		spawnSpikesAtHero: true,
		pattern: [{
			offset: 1,
			dmg: 2,
			effects: [{
				type: "push",
				distance: 2
			}]
		}, {
			offset: -1,
			dmg: 2,
			effects: [{
				type: "push",
				distance: 2
			}]
		}],
		description: "Odhodí sousedy na obou stranách za 2 DMG (Push 2) a nechá vyrazit kůly pod Vencou."
	},
	boss_dracula_strike: {
		id: "boss_dracula_strike",
		name: "Temný ortel noci",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		pattern: [{
			offset: 1,
			dmg: 6,
			effects: [{
				type: "push",
				distance: 1
			}]
		}, {
			offset: 2,
			dmg: 6,
			effects: [{
				type: "push",
				distance: 1
			}]
		}],
		description: "Drtivý úder na 2 pole vpřed za 6 DMG + Push 1."
	},
	boss_dracula_curse: {
		id: "boss_dracula_curse",
		name: "Kletba prastarého rodu",
		icon: "intent.shoot",
		type: "střela",
		delay: 3,
		cooldown: 3,
		projectileRange: 5,
		pattern: [
			{
				offset: 1,
				dmg: 4,
				projectile: true,
				effects: [{
					type: "stun",
					amount: 1
				}]
			},
			{
				offset: 2,
				dmg: 4,
				projectile: true,
				effects: [{
					type: "stun",
					amount: 1
				}]
			},
			{
				offset: 3,
				dmg: 4,
				projectile: true,
				effects: [{
					type: "stun",
					amount: 1
				}]
			},
			{
				offset: 4,
				dmg: 4,
				projectile: true,
				effects: [{
					type: "stun",
					amount: 1
				}]
			},
			{
				offset: 5,
				dmg: 4,
				projectile: true,
				effects: [{
					type: "stun",
					amount: 1
				}]
			}
		],
		description: "Střela přes 5 polí za 4 DMG prvnímu cíli v dráze a omráčí ho."
	},
	sickle_cut: {
		id: "sickle_cut",
		name: "Dvojitý srp",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: [{
				type: "bleed",
				amount: 1
			}]
		}],
		description: "Sekne rezavým srpem 1 pole vpřed za 4 DMG a drobné krvácení."
	},
	club_smash: {
		id: "club_smash",
		name: "Kyj do huby",
		icon: "intent.strike",
		type: "úder",
		delay: 3,
		cooldown: 3,
		pattern: [{
			offset: 1,
			dmg: 6,
			effects: [{
				type: "push",
				distance: 1
			}]
		}],
		description: "Po nápřahu třískne kyjem 1 pole vpřed za 6 DMG a odhodí cíl o 1 pole."
	},
	plague_spit: {
		id: "plague_spit",
		name: "Morový plivanec",
		icon: "intent.shoot",
		type: "střela",
		delay: 2,
		cooldown: 2,
		projectileRange: 3,
		pattern: [
			{
				offset: 1,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "bleed",
					amount: 1
				}]
			},
			{
				offset: 2,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "bleed",
					amount: 1
				}]
			},
			{
				offset: 3,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "bleed",
					amount: 1
				}]
			}
		],
		description: "Plivne zelenou slinu až 3 pole daleko za 2 DMG a krvácení."
	},
	hound_pounce: {
		id: "hound_pounce",
		name: "Skok na krk",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		lungeForward: 2,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: [{
				type: "bleed",
				amount: 1
			}]
		}],
		description: "Skočí až o 2 pole vpřed (je-li volno) a kousne za 4 DMG + krvácení."
	},
	halberd_thrust: {
		id: "halberd_thrust",
		name: "Halapartna",
		icon: "intent.strike",
		type: "úder",
		delay: 3,
		cooldown: 3,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: []
		}, {
			offset: 2,
			dmg: 4,
			effects: [{
				type: "push",
				distance: 1
			}]
		}],
		description: "Bodne halapartnou na 1. a 2. pole vpřed za 4 DMG. Vzdálenější cíl odhodí o 1 pole."
	},
	bulldog_bite: {
		id: "bulldog_bite",
		name: "Zakousnutí",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: [{
				type: "bleed",
				amount: 1
			}]
		}],
		description: "Zakousne se 1 pole vpřed za 4 DMG a nepustí se tak snadno (krvácení)."
	},
	stone_chuck: {
		id: "stone_chuck",
		name: "Kamenem do kebule",
		icon: "intent.shoot",
		type: "střela",
		delay: 2,
		cooldown: 2,
		projectileRange: 3,
		pattern: [
			{
				offset: 1,
				dmg: 2,
				projectile: true,
				effects: []
			},
			{
				offset: 2,
				dmg: 2,
				projectile: true,
				effects: []
			},
			{
				offset: 3,
				dmg: 2,
				projectile: true,
				effects: []
			}
		],
		description: "Hodí kámen až 3 pole daleko za 2 DMG."
	},
	boar_charge: {
		id: "boar_charge",
		name: "Kančí nájezd",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		lungeForward: 2,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: [{
				type: "push",
				distance: 1
			}]
		}],
		description: "Rozběhne se až o 2 pole a vrazí do cíle za 4 DMG + odhození."
	},
	vampig_bite: {
		id: "vampig_bite",
		name: "Upíří rypák",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		lifesteal: 1,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: [{
				type: "bleed",
				amount: 1
			}]
		}],
		description: "Kousne 1 pole vpřed za 4 DMG, způsobí krvácení a vysaje si 1 HP."
	},
	slime_slap: {
		id: "slime_slap",
		name: "Plísňová plesk",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: [{
				type: "bleed",
				amount: 1
			}]
		}],
		description: "Pleskne slizem 1 pole vpřed za 4 DMG a krvácení."
	},
	slime_spit: {
		id: "slime_spit",
		name: "Výstřik plísně",
		icon: "intent.shoot",
		type: "střela",
		delay: 2,
		cooldown: 2,
		projectileRange: 3,
		pattern: [
			{
				offset: 1,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			},
			{
				offset: 2,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			},
			{
				offset: 3,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			}
		],
		description: "Plivne spory až 3 pole daleko za 2 DMG a zmatení."
	},
	witch_claw: {
		id: "witch_claw",
		name: "Pařát ježibaby",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: []
		}, {
			offset: 2,
			dmg: 2,
			effects: [{
				type: "bleed",
				amount: 1
			}]
		}],
		description: "Sekne pařátem na 1. pole za 4 DMG a na 2. pole za 2 DMG + krvácení."
	},
	witch_hex: {
		id: "witch_hex",
		name: "Sliněná kletba",
		icon: "intent.shoot",
		type: "střela",
		delay: 3,
		cooldown: 3,
		projectileRange: 4,
		pattern: [
			{
				offset: 1,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			},
			{
				offset: 2,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			},
			{
				offset: 3,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			},
			{
				offset: 4,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			}
		],
		description: "Pošle kletbu až na 4 pole za 2 DMG a zmatení."
	},
	axe_chop: {
		id: "axe_chop",
		name: "Rezavá sekyra",
		icon: "intent.strike",
		type: "úder",
		delay: 3,
		cooldown: 3,
		pattern: [{
			offset: 1,
			dmg: 6,
			effects: [{
				type: "bleed",
				amount: 2
			}]
		}],
		description: "Po nápřahu sekne rezavou sekerou za 6 DMG a silné krvácení."
	},
	plank_bash: {
		id: "plank_bash",
		name: "Fošnou do zubů",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		pattern: [{
			offset: 1,
			dmg: 2,
			effects: [{
				type: "push",
				distance: 2
			}]
		}],
		description: "Vrazí dřevěným štítem za 2 DMG a odhodí cíl o 2 pole."
	},
	plank_guard: {
		id: "plank_guard",
		name: "Zapřená fošna",
		icon: "intent.shield",
		type: "štít",
		delay: 2,
		cooldown: 2,
		selfEffect: {
			type: "shield",
			amount: 2
		},
		pattern: [],
		description: "Schová se za fošnu a získá +2 Štít."
	},
	rococo_claw: {
		id: "rococo_claw",
		name: "Krajkový drap",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		lifesteal: 1,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: [{
				type: "bleed",
				amount: 1
			}]
		}],
		description: "Drapne krajkou 1 pole vpřed za 4 DMG, krvácení a vysaje si 1 HP."
	},
	rococo_laugh: {
		id: "rococo_laugh",
		name: "Salónní smích",
		icon: "intent.shoot",
		type: "střela",
		delay: 3,
		cooldown: 3,
		projectileRange: 3,
		pattern: [
			{
				offset: 1,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			},
			{
				offset: 2,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			},
			{
				offset: 3,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			}
		],
		description: "Vysmívá se až na 3 pole za 2 DMG a zmatení."
	},
	cylinder_bite: {
		id: "cylinder_bite",
		name: "Kousnutí z cylindru",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		lifesteal: 1,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: []
		}],
		description: "Kousne 1 pole vpřed za 4 DMG a vysaje si 1 HP."
	},
	knife_fling: {
		id: "knife_fling",
		name: "Nůž do zad",
		icon: "intent.shoot",
		type: "střela",
		delay: 2,
		cooldown: 2,
		projectileRange: 3,
		pattern: [
			{
				offset: 1,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "bleed",
					amount: 1
				}]
			},
			{
				offset: 2,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "bleed",
					amount: 1
				}]
			},
			{
				offset: 3,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "bleed",
					amount: 1
				}]
			}
		],
		description: "Hodí nůž až 3 pole daleko za 2 DMG a krvácení."
	},
	pustule_gore: {
		id: "pustule_gore",
		name: "Vředový náraz",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		lungeForward: 1,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: [{
				type: "bleed",
				amount: 1
			}]
		}],
		description: "Přivalí se o pole blíž a roztrhne vřed za 4 DMG a krvácení."
	},
	hnis_spit: {
		id: "hnis_spit",
		name: "Chrchel hnisu",
		icon: "intent.shoot",
		type: "střela",
		delay: 2,
		cooldown: 2,
		projectileRange: 3,
		pattern: [
			{
				offset: 1,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			},
			{
				offset: 2,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			},
			{
				offset: 3,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			}
		],
		description: "Plivne hnis až na 3 pole za 2 DMG a zmatení."
	},
	leaf_hug: {
		id: "leaf_hug",
		name: "Listové obejmutí",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		pattern: [{
			offset: 1,
			dmg: 2,
			effects: [{
				type: "confusion",
				amount: 1
			}]
		}],
		description: "Obalí cíl listím na 1 poli za 2 DMG a zmatení."
	},
	bog_shell: {
		id: "bog_shell",
		name: "Ztuhlá břečka",
		icon: "intent.shield",
		type: "štít",
		delay: 2,
		cooldown: 2,
		selfEffect: {
			type: "shield",
			amount: 2
		},
		pattern: [],
		description: "Stáhne se do slizu a získá +2 Štít."
	},
	gnome_rake: {
		id: "gnome_rake",
		name: "Drápy zpod čepice",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		lifesteal: 1,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: [{
				type: "bleed",
				amount: 1
			}]
		}],
		description: "Rozdrásá 1 pole vpřed za 4 DMG, krvácení a vysaje si 1 HP."
	},
	night_bite: {
		id: "night_bite",
		name: "Kousnutí ze spaní",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		lifesteal: 1,
		pattern: [{
			offset: 1,
			dmg: 2,
			effects: []
		}],
		description: "Kousne potichu za 2 DMG a vysaje si 1 HP."
	},
	flail_arc: {
		id: "flail_arc",
		name: "Řemdih na řetězu",
		icon: "intent.strike",
		type: "úder",
		delay: 3,
		cooldown: 3,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: [{
				type: "push",
				distance: 1
			}]
		}, {
			offset: 2,
			dmg: 2,
			effects: []
		}],
		description: "Švihne řemdihem na 1. pole za 4 DMG a odhození, na 2. pole za 2 DMG."
	},
	ghost_breath: {
		id: "ghost_breath",
		name: "Dech přízraku",
		icon: "intent.shoot",
		type: "střela",
		delay: 2,
		cooldown: 2,
		projectileRange: 3,
		pattern: [
			{
				offset: 1,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			},
			{
				offset: 2,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			},
			{
				offset: 3,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			}
		],
		description: "Z přilby vydechne zelený přízrak až na 3 pole za 2 DMG a zmatení."
	},
	grave_clutch: {
		id: "grave_clutch",
		name: "Hrobové sevření",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: [{
				type: "bleed",
				amount: 1
			}]
		}],
		description: "Sevře pole před sebou za 4 DMG a krvácení."
	},
	dead_shove: {
		id: "dead_shove",
		name: "Mrtvá váha",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		pattern: [{
			offset: 1,
			dmg: 2,
			effects: [{
				type: "push",
				distance: 1
			}]
		}],
		description: "Narazí do pole před sebou za 2 DMG a odhození."
	},
	bone_chuck: {
		id: "bone_chuck",
		name: "Žebro do čela",
		icon: "intent.shoot",
		type: "střela",
		delay: 2,
		cooldown: 3,
		projectileRange: 3,
		pattern: [
			{
				offset: 1,
				dmg: 4,
				projectile: true,
				effects: []
			},
			{
				offset: 2,
				dmg: 4,
				projectile: true,
				effects: []
			},
			{
				offset: 3,
				dmg: 4,
				projectile: true,
				effects: []
			}
		],
		description: "Hodí žebro až 3 pole daleko za 4 DMG."
	},
	shovel_smack: {
		id: "shovel_smack",
		name: "Lopatou po hřbetu",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		pattern: [{
			offset: 1,
			dmg: 4,
			effects: []
		}],
		description: "Praští lopatou 1 pole vpřed za 4 DMG."
	},
	rat_gnaw: {
		id: "rat_gnaw",
		name: "Sklepní hryz",
		icon: "intent.strike",
		type: "úder",
		delay: 1,
		cooldown: 1,
		lungeForward: 1,
		pattern: [{
			offset: 1,
			dmg: 2,
			effects: [{
				type: "bleed",
				amount: 1
			}]
		}],
		description: "Přiskočí o pole a hryzne za 2 DMG a krvácení."
	},
	miasma_waft: {
		id: "miasma_waft",
		name: "Zobákový mor",
		icon: "intent.shoot",
		type: "střela",
		delay: 2,
		cooldown: 2,
		projectileRange: 3,
		pattern: [
			{
				offset: 1,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			},
			{
				offset: 2,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			},
			{
				offset: 3,
				dmg: 2,
				projectile: true,
				effects: [{
					type: "confusion",
					amount: 1
				}]
			}
		],
		description: "Vypustí ze zobáku zelený mor až na 3 pole za 2 DMG a zmatení."
	},
	cane_poke: {
		id: "cane_poke",
		name: "Hůlkou do žeber",
		icon: "intent.strike",
		type: "úder",
		delay: 2,
		cooldown: 2,
		pattern: [{
			offset: 1,
			dmg: 2,
			effects: [{
				type: "bleed",
				amount: 1
			}]
		}],
		description: "Šťouchne holí 1 pole vpřed za 2 DMG a krvácení."
	}
};
var ENEMIES = {
	praktikant: {
		id: "praktikant",
		name: "Upír-praktikant Ignác",
		givenName: "Ignác",
		epithet: "Praktikant",
		bodyScale: "human",
		sprite: "enemy.praktikant",
		archetype: "fodder",
		comboCapacity: 1,
		maxHp: 8,
		flying: false,
		frontShield: false,
		actionPool: ["intern_bite"],
		flavor: "„Mám teprve třetí noční směnu a už mě pálí žáha z česneku!“"
	},
	urednik: {
		id: "urednik",
		name: "Kryptový písař Hubert",
		givenName: "Hubert",
		epithet: "Kryptový písař",
		bodyScale: "human",
		sprite: "enemy.urednik",
		archetype: "ranged",
		comboCapacity: 2,
		maxHp: 10,
		flying: false,
		frontShield: false,
		actionPool: ["tax_stamp_shot", "retreat_step"],
		flavor: "„Krev do poháru, duši do temnoty! Z této hrobky živý neodejdeš!“"
	},
	drab: {
		id: "drab",
		name: "Krvavá drábová Božena",
		givenName: "Božena",
		epithet: "Drábová",
		bodyScale: "human",
		sprite: "enemy.drab",
		archetype: "brute",
		comboCapacity: 2,
		maxHp: 14,
		flying: false,
		frontShield: false,
		actionPool: ["windup_roar", "drab_lunge"],
		flavor: "„Karbanátky z lovců dělám zásadně na cibulce!“"
	},
	vratny_stit: {
		id: "vratny_stit",
		name: "Vrátný Lojza",
		givenName: "Lojza",
		epithet: "Vrátný",
		bodyScale: "human",
		sprite: "enemy.vratny_stit",
		archetype: "shielder",
		comboCapacity: 2,
		maxHp: 10,
		flying: false,
		frontShield: true,
		actionPool: ["porter_bash", "porter_guard"],
		flavor: "„Přes vrátnici jenom s propustkou podepsanou hrabětem!“ (Blokuje přímé zásahy zepředu.)"
	},
	netopyr: {
		id: "netopyr",
		name: "Netopýr Pepík",
		givenName: "Pepík",
		epithet: "Kurýr",
		bodyScale: "flyer",
		sprite: "enemy.netopyr",
		archetype: "fodder",
		comboCapacity: 1,
		maxHp: 2,
		flying: true,
		frontShield: false,
		actionPool: ["bat_swoop"],
		flavor: "„Pííí! Noční hlídka ze zámecké věže!“ (Létá nad propastmi a prkny.)"
	},
	ucetni_buffer: {
		id: "ucetni_buffer",
		name: "Hradní klíčnice Květuše",
		givenName: "Květuše",
		epithet: "Klíčnice",
		bodyScale: "human",
		sprite: "enemy.ucetni_buffer",
		archetype: "support",
		comboCapacity: 2,
		maxHp: 8,
		flying: false,
		frontShield: false,
		actionPool: ["accountant_curse", "accountant_buff"],
		flavor: "„Pán hradu žádá čerstvou krev do pohárů!“ (Léčí a posiluje spolubojovníky.)"
	},
	srpak: {
		id: "srpak",
		name: "Srpový dráb Vendelín",
		givenName: "Vendelín",
		epithet: "Srpový dráb",
		bodyScale: "human",
		sprite: "enemy.srpak",
		archetype: "brute",
		comboCapacity: 2,
		maxHp: 12,
		flying: false,
		frontShield: false,
		actionPool: ["step_toward", "sickle_cut"],
		flavor: "„Srpy mám na zelí. A na krky, když zelí dojde.“"
	},
	kyjovec: {
		id: "kyjovec",
		name: "Kyjový pacholek Břéťa",
		givenName: "Břéťa",
		epithet: "Kyjovec",
		bodyScale: "human",
		sprite: "enemy.kyjovec",
		archetype: "brute",
		comboCapacity: 2,
		maxHp: 16,
		flying: false,
		frontShield: false,
		actionPool: ["windup_roar", "club_smash"],
		flavor: "„Kyj je poctivější než vidle. Aspoň neřeže záděry.“"
	},
	morak: {
		id: "morak",
		name: "Morový sedlák Bohouš",
		givenName: "Bohouš",
		epithet: "Sedlák",
		bodyScale: "human",
		sprite: "enemy.morak",
		archetype: "ranged",
		comboCapacity: 2,
		maxHp: 10,
		flying: false,
		frontShield: false,
		actionPool: ["plague_spit", "step_toward"],
		flavor: "„Nekašlu. To je jenom domácí slivovice s mechem.“"
	},
	vlkodav: {
		id: "vlkodav",
		name: "Panský vlkodav Čeněk",
		givenName: "Čeněk",
		epithet: "Vlkodav",
		bodyScale: "beast",
		sprite: "enemy.vlkodav",
		archetype: "brute",
		comboCapacity: 2,
		maxHp: 10,
		flying: false,
		frontShield: false,
		actionPool: ["step_toward", "hound_pounce"],
		flavor: "„Hodný pejsek. Jenom žere lovce, a to až po večeři.“"
	},
	halapartnik: {
		id: "halapartnik",
		name: "Dvorní halapartník Šebestián",
		givenName: "Šebestián",
		epithet: "Halapartník",
		bodyScale: "human",
		sprite: "enemy.halapartnik",
		archetype: "brute",
		comboCapacity: 2,
		maxHp: 14,
		flying: false,
		frontShield: false,
		actionPool: ["halberd_thrust", "step_toward"],
		flavor: "„Halapartna je na hosty, kteří nemají pozvánku na krev.“"
	},
	buldok: {
		id: "buldok",
		name: "Dvorový buldok Punťa",
		givenName: "Punťa",
		epithet: "Buldok",
		bodyScale: "beast",
		sprite: "enemy.buldok",
		archetype: "brute",
		comboCapacity: 2,
		maxHp: 14,
		flying: false,
		frontShield: false,
		actionPool: ["step_toward", "bulldog_bite"],
		flavor: "„Obojek má proti upírům. Zuby má proti všem ostatním.“"
	},
	kluk_kamen: {
		id: "kluk_kamen",
		name: "Vesnický kluk Lojzíček",
		givenName: "Lojzíček",
		epithet: "Kameník",
		bodyScale: "small",
		sprite: "enemy.kluk_kamen",
		archetype: "fodder",
		comboCapacity: 1,
		maxHp: 6,
		flying: false,
		frontShield: false,
		actionPool: ["stone_chuck"],
		flavor: "„Kámen je zadarmo. A do čela se trefím i poslepu!“"
	},
	divocak: {
		id: "divocak",
		name: "Řádící divočák Čuník",
		givenName: "Čuník",
		epithet: "Divočák",
		bodyScale: "beast",
		sprite: "enemy.divocak",
		archetype: "brute",
		comboCapacity: 2,
		maxHp: 12,
		flying: false,
		frontShield: false,
		actionPool: ["step_toward", "boar_charge"],
		flavor: "„Chro chro! Zelí došlo, tak žere lovce.“"
	},
	upirske_prase: {
		id: "upirske_prase",
		name: "Upíří pašík Hroznata",
		givenName: "Hroznata",
		epithet: "Upíří pašík",
		bodyScale: "beast",
		sprite: "enemy.upirske_prase",
		archetype: "brute",
		comboCapacity: 2,
		maxHp: 10,
		flying: false,
		frontShield: false,
		actionPool: ["step_toward", "vampig_bite"],
		flavor: "„Krev má lepší buket než patoky z koryta.“"
	},
	sliz: {
		id: "sliz",
		name: "Plísňový slizák Breberka",
		givenName: "Breberka",
		epithet: "Slizák",
		bodyScale: "human",
		sprite: "enemy.sliz",
		archetype: "brute",
		comboCapacity: 2,
		maxHp: 18,
		flying: false,
		frontShield: false,
		actionPool: ["slime_slap", "slime_spit"],
		flavor: "„Nesahej. To není mech, to jsem já.“"
	},
	carodejnice: {
		id: "carodejnice",
		name: "Ježibaba Bětuše",
		givenName: "Bětuše",
		epithet: "Ježibaba",
		bodyScale: "human",
		sprite: "enemy.carodejnice",
		archetype: "brute",
		comboCapacity: 2,
		maxHp: 12,
		flying: false,
		frontShield: false,
		actionPool: ["witch_claw", "witch_hex"],
		flavor: "„Perníková chaloupka je v rekonstrukci. Dnes večeřím lovce.“"
	},
	drevo: {
		id: "drevo",
		name: "Dřevorubec Jáchym",
		givenName: "Jáchym",
		epithet: "Dřevorubec",
		bodyScale: "human",
		sprite: "enemy.drevo",
		archetype: "brute",
		comboCapacity: 2,
		maxHp: 16,
		flying: false,
		frontShield: false,
		actionPool: ["windup_roar", "axe_chop"],
		flavor: "„Sekera je rezavá. To nevadí. Rez taky řeže.“"
	},
	sedlak_stit: {
		id: "sedlak_stit",
		name: "Sedlák s fošnou Vavřinec",
		givenName: "Vavřinec",
		epithet: "Štítonoš",
		bodyScale: "human",
		sprite: "enemy.sedlak_stit",
		archetype: "shielder",
		comboCapacity: 2,
		maxHp: 12,
		flying: false,
		frontShield: true,
		actionPool: ["plank_bash", "plank_guard"],
		flavor: "„Přes tuhle fošnu jenom s povolením rychtáře!“ (Blokuje přímé zásahy zepředu.)"
	},
	hrabenka_amalie: {
		id: "hrabenka_amalie",
		name: "Rokoková hraběnka Amálie",
		givenName: "Amálie",
		epithet: "Hraběnka",
		bodyScale: "human",
		sprite: "enemy.hrabenka_amalie",
		archetype: "brute",
		comboCapacity: 2,
		maxHp: 14,
		flying: false,
		frontShield: false,
		actionPool: ["rococo_claw", "rococo_laugh"],
		flavor: "„Krev se nosí letos k modré. A já ji nosím čerstvou.“"
	},
	upirka_cilka: {
		id: "upirka_cilka",
		name: "Upírka v cylindru Cilka",
		givenName: "Cilka",
		epithet: "Cylindr",
		bodyScale: "small",
		sprite: "enemy.upirka_cilka",
		archetype: "fodder",
		comboCapacity: 1,
		maxHp: 8,
		flying: false,
		frontShield: false,
		actionPool: ["cylinder_bite"],
		flavor: "„Cylindr je vypůjčený. Tesáky jsou moje.“"
	},
	vrhac_nozu: {
		id: "vrhac_nozu",
		name: "Vrhač nožů Tonda",
		givenName: "Tonda",
		epithet: "Vrhač nožů",
		bodyScale: "human",
		sprite: "enemy.vrhac_nozu",
		archetype: "ranged",
		comboCapacity: 1,
		maxHp: 8,
		flying: false,
		frontShield: false,
		actionPool: ["knife_fling"],
		flavor: "„Nůž je poctivější než vidle. A trefí i od plotu.“"
	},
	prase_mutant: {
		id: "prase_mutant",
		name: "Morové prase Řehoř",
		givenName: "Řehoř",
		epithet: "Vředovec",
		bodyScale: "beast",
		sprite: "enemy.prase_mutant",
		archetype: "brute",
		comboCapacity: 2,
		maxHp: 16,
		flying: false,
		frontShield: false,
		actionPool: ["pustule_gore", "hnis_spit"],
		flavor: "„To není sádlo. To jsem já, a teče to.“"
	},
	bazinny_sliz: {
		id: "bazinny_sliz",
		name: "Bažinná slizka Žbluňka",
		givenName: "Žbluňka",
		epithet: "Bažinka",
		bodyScale: "human",
		sprite: "enemy.bazinny_sliz",
		archetype: "support",
		comboCapacity: 2,
		maxHp: 12,
		flying: false,
		frontShield: false,
		actionPool: ["leaf_hug", "bog_shell"],
		flavor: "„Nesahej na listí. To nejsou vlasy, to jsem já.“"
	},
	upiri_trpaslik: {
		id: "upiri_trpaslik",
		name: "Upíří trpaslík Šmudla",
		givenName: "Šmudla",
		epithet: "Trpaslík",
		bodyScale: "small",
		sprite: "enemy.upiri_trpaslik",
		archetype: "fodder",
		comboCapacity: 1,
		maxHp: 8,
		flying: false,
		frontShield: false,
		actionPool: ["gnome_rake", "night_bite"],
		flavor: "„Noční čepice je rodinné stříbro. Drápy taky.“"
	},
	rytir_prizrak: {
		id: "rytir_prizrak",
		name: "Přízračný rytíř Heřman",
		givenName: "Heřman",
		epithet: "Rytíř",
		bodyScale: "human",
		sprite: "enemy.rytir_prizrak",
		archetype: "brute",
		comboCapacity: 2,
		maxHp: 18,
		flying: false,
		frontShield: true,
		actionPool: ["flail_arc", "ghost_breath"],
		flavor: "„V přilbě nikdo není. Jenom to zelené, co po mně zbylo.“ (Zepředu ho kryje plát.)"
	},
	zombie_hynek: {
		id: "zombie_hynek",
		name: "Oživlý nebožtík Hynek",
		givenName: "Hynek",
		epithet: "Nebožtík",
		bodyScale: "human",
		sprite: "enemy.zombie_hynek",
		archetype: "brute",
		comboCapacity: 2,
		maxHp: 16,
		flying: false,
		frontShield: false,
		actionPool: ["grave_clutch", "dead_shove"],
		flavor: "„Rakev jsem zaplatil. Vstávat se neplatí.“"
	},
	kostlivec_fabian: {
		id: "kostlivec_fabian",
		name: "Hřbitovní kostlivec Fabián",
		givenName: "Fabián",
		epithet: "Kostlivec",
		bodyScale: "human",
		sprite: "enemy.kostlivec_fabian",
		archetype: "ranged",
		comboCapacity: 1,
		maxHp: 8,
		flying: false,
		frontShield: false,
		actionPool: ["bone_chuck", "shovel_smack"],
		flavor: "„Hrob je vykopaný. Chybí jenom nájemník.“"
	},
	krysa_piskota: {
		id: "krysa_piskota",
		name: "Sklepní krysa Piškota",
		givenName: "Piškota",
		epithet: "Krysa",
		bodyScale: "critter",
		sprite: "enemy.krysa_piskota",
		archetype: "fodder",
		comboCapacity: 1,
		maxHp: 6,
		flying: false,
		frontShield: false,
		actionPool: ["rat_gnaw"],
		flavor: "„Klobása je moje. Česnek si nech.“"
	},
	morovy_felcar: {
		id: "morovy_felcar",
		name: "Morový felčar Kilián",
		givenName: "Kilián",
		epithet: "Felčar",
		bodyScale: "human",
		sprite: "enemy.morovy_felcar",
		archetype: "ranged",
		comboCapacity: 1,
		maxHp: 10,
		flying: false,
		frontShield: false,
		actionPool: ["miasma_waft", "cane_poke"],
		flavor: "„Otevřete ústa. Tohle není na kašel, to je na krev.“"
	},
	elite_drab: {
		id: "elite_drab",
		name: "Elitní řeznice Božena",
		givenName: "Božena",
		epithet: "Elitní řeznice",
		bodyScale: "human",
		sprite: "enemy.drab",
		archetype: "brute",
		isElite: true,
		comboCapacity: 3,
		maxHp: 22,
		flying: false,
		frontShield: false,
		actionPool: [
			"windup_roar",
			"cleaver_chop",
			"drab_lunge"
		],
		flavor: "„Dvojitá porce tlačenky! Pojď blíž, dědku!“"
	},
	elite_urednik: {
		id: "elite_urednik",
		name: "Vrchní inkvizitor Metoděj",
		givenName: "Metoděj",
		epithet: "Inkvizitor",
		bodyScale: "human",
		sprite: "enemy.urednik",
		archetype: "ranged",
		isElite: true,
		comboCapacity: 3,
		maxHp: 20,
		flying: false,
		frontShield: true,
		actionPool: [
			"tax_stamp_shot",
			"porter_bash",
			"turn_toward"
		],
		flavor: "„Hněv temnot se odkládat nebude!“ (Zepředu chráněn kovaným štítem.)"
	},
	boss_sosak: {
		id: "boss_sosak",
		name: "Arcikníže von Sosák",
		givenName: "Sosák",
		epithet: "Arcikníže",
		bodyScale: "boss",
		sprite: "boss.arcikniaze_sosak",
		archetype: "boss",
		isBoss: true,
		act: 1,
		comboCapacity: 3,
		maxHp: 28,
		flying: false,
		frontShield: false,
		mirrorCloak: true,
		enrageTile: "boss_sosak_summon",
		actionPool: [
			"boss_sosak_drain",
			"boss_sosak_summon",
			"turn_toward"
		],
		flavor: "„Zrcadlový plášť z Vídně! Při kombu ze stejného směru si prohodím místo se sudem nebo netopýrem!“"
	},
	boss_dagmar: {
		id: "boss_dagmar",
		name: "Hraběnka Dagmar z Černé Krajky",
		givenName: "Dagmar",
		epithet: "Hraběnka",
		bodyScale: "boss",
		sprite: "boss.hrabenka_dagmar",
		archetype: "boss",
		isBoss: true,
		act: 2,
		comboCapacity: 3,
		maxHp: 36,
		flying: false,
		frontShield: false,
		bloodThorns: true,
		enrageTile: "accountant_buff",
		actionPool: [
			"boss_dagmar_hex",
			"boss_dagmar_thorns",
			"accountant_buff"
		],
		flavor: "„Moje krajky jsou tkané z půlnoční mlhy a neplacených směn!“"
	},
	boss_drakula: {
		id: "boss_drakula",
		name: "Hrabě Drákula, Pán temnot",
		givenName: "Drákula",
		epithet: "Pán temnot",
		bodyScale: "boss",
		sprite: "boss.drakula_generalni_reditel",
		archetype: "boss",
		isBoss: true,
		act: 3,
		comboCapacity: 3,
		maxHp: 48,
		flying: false,
		frontShield: false,
		mirrorCloak: true,
		lordSynergy: true,
		enrageTile: "boss_sosak_summon",
		actionPool: [
			"boss_dracula_strike",
			"boss_dracula_curse",
			"boss_sosak_summon"
		],
		flavor: "„Tato noc patří nám, smrtelníku! Tvá krev napojí hradní kryptu!“"
	}
};
var VAMPIRES = /* @__PURE__ */ new Set([
	"praktikant",
	"urednik",
	"elite_urednik",
	"ucetni_buffer",
	"netopyr",
	"upirske_prase",
	"upirka_cilka",
	"upiri_trpaslik",
	"hrabenka_amalie",
	"boss_sosak",
	"boss_dagmar",
	"boss_drakula"
]);
var MUTANTS = /* @__PURE__ */ new Set([
	"sliz",
	"morak",
	"prase_mutant",
	"bazinny_sliz",
	"rytir_prizrak",
	"zombie_hynek",
	"kostlivec_fabian",
	"krysa_piskota",
	"morovy_felcar"
]);
function ichorForKind(kind, entityType, name = "") {
	if (entityType === "prop") return null;
	if (entityType === "hero") return "red";
	if (MUTANTS.has(kind)) return "green";
	if (VAMPIRES.has(kind)) return "blue";
	const blob = `${kind || ""} ${name || ""}`.toLowerCase();
	if (/upír|upir|vamp|netop|drák|drakula|sosák|sosak|dagmar/.test(blob)) return "blue";
	if (/sliz|morov|zombie|mutant|plísn|plisn|breber|kostliv|krys|felčar|felcar|nebožt|nebozt/.test(blob)) return "green";
	return "red";
}
var TERRAIN_TYPES = {
	none: {
		id: "none",
		name: "Kamenná dlažba",
		icon: "terrain.stone",
		description: "Obyčejná hradní dlaždice postříkaná pivem a voskem ze svíček."
	},
	plank_intact: {
		id: "plank_intact",
		name: "Prohnilé prkno",
		icon: "terrain.plank_intact",
		description: "1. stoupnutí zapraská. 2. stoupnutí prkno prolomí a způsobí 4 DMG (létající netopýři prkno neprolomí)."
	},
	plank_cracked: {
		id: "plank_cracked",
		name: "Napůl zlomené prkno",
		icon: "terrain.plank_cracked",
		description: "Už praská ve švech! Další stoupnutí jej prolomí za 4 DMG."
	},
	pit: {
		id: "pit",
		name: "Hradní propast",
		icon: "terrain.pit",
		description: "Bezedná šachta do sklepení. Vhození nebo stoupnutí znamená okamžitou smrt (kromě létajících potvor)."
	},
	spikes: {
		id: "spikes",
		name: "Naostřené kůly",
		icon: "terrain.spikes",
		description: "Dubové špičáky v podlaze. Každý přesun nebo odhození na toto pole způsobí okamžitě 4 DMG."
	},
	garlic_cloud: {
		id: "garlic_cloud",
		name: "Česnekový oblak",
		icon: "terrain.garlic_cloud",
		description: "Štiplavý moravský česnek (2 tahy). Nepřátelé v oblaku dávají o 1 DMG méně; lovec se v něm otáčí zdarma (0 tahů)."
	},
	holy_water_puddle: {
		id: "holy_water_puddle",
		name: "Posvěcená louže",
		icon: "terrain.holy_water_puddle",
		description: "Rozlitá svěcená voda z kropenky (3 tahy). Nemrtvý, který na ni vstoupí nebo na ní stojí, utrží 2 DMG."
	}
};
var PROPS = {
	barrel: {
		id: "barrel",
		name: "Sud s kyselým zelím",
		icon: "terrain.barrel",
		maxHp: 4,
		destructible: true,
		description: "Těžký dubový sud (4 HP). Blokuje pohyb, lze jej přeskočit. Při vhození postavy do sudu nebo rozbití praskne a způsobí 4 DMG + Zmatení."
	},
	holy_font: {
		id: "holy_font",
		name: "Kamenná kropenka",
		icon: "prop.holy_font",
		maxHp: 2,
		destructible: true,
		description: "Kamenná nádoba se svěcenou vodou (2 HP). Při zásahu útokem, střelou či kolizi se roztříští: udělí 4 DMG nemrtvým na svém a sousedních polích a zanechá posvěcenou louži."
	},
	mirror: {
		id: "mirror",
		name: "Hradní zrcadlo pravdy",
		icon: "prop.mirror",
		maxHp: 6,
		destructible: false,
		reflectsProjectiles: true,
		description: "Starobylé stříbrné zrcadlo. Nelze zničit běžnými střelami. Odrazí letící dálkové projektily o 180° zpět po ose Bojiště!"
	}
};
var TERRAIN_PRESETS = [
	{
		id: "barrel_center",
		props: [{
			type: "barrel",
			cell: 4
		}],
		terrain: [{
			type: "plank_intact",
			cell: 2
		}]
	},
	{
		id: "spikes_and_plank",
		props: [],
		terrain: [{
			type: "spikes",
			cell: 3
		}, {
			type: "plank_intact",
			cell: 5
		}]
	},
	{
		id: "pit_edge",
		props: [{
			type: "barrel",
			cell: 2
		}],
		terrain: [{
			type: "pit",
			cell: 5
		}]
	},
	{
		id: "garlic_corridor",
		props: [{
			type: "barrel",
			cell: 3
		}],
		terrain: [{
			type: "garlic_cloud",
			cell: 2,
			duration: 2
		}, {
			type: "spikes",
			cell: 5
		}]
	},
	{
		id: "twin_planks",
		props: [],
		terrain: [{
			type: "plank_intact",
			cell: 2
		}, {
			type: "plank_intact",
			cell: 4
		}]
	},
	{
		id: "pit_and_spikes",
		props: [{
			type: "barrel",
			cell: 4
		}],
		terrain: [{
			type: "pit",
			cell: 1
		}, {
			type: "spikes",
			cell: 3
		}]
	},
	{
		id: "holy_chapel",
		props: [{
			type: "holy_font",
			cell: 3
		}],
		terrain: [{
			type: "plank_intact",
			cell: 5
		}]
	},
	{
		id: "mirror_hall",
		props: [{
			type: "mirror",
			cell: 5
		}],
		terrain: [{
			type: "spikes",
			cell: 2
		}]
	},
	{
		id: "sacred_font_and_mirror",
		props: [{
			type: "holy_font",
			cell: 2
		}, {
			type: "mirror",
			cell: 6
		}],
		terrain: []
	}
];
var ENCOUNTERS = {
	tutorial_1: {
		id: "tutorial_1",
		act: 1,
		name: "Předhradí: Náves za humny",
		isTutorial: true,
		boardSize: 9,
		heroCell: 2,
		heroFacing: 1,
		initialEnemies: [{
			enemyId: "kluk_kamen",
			cell: 5,
			facing: -1
		}, {
			enemyId: "divocak",
			cell: 8,
			facing: -1
		}],
		props: [{
			type: "barrel",
			cell: 1
		}],
		reinforcements: [{
			turnDelay: 4,
			gateCell: 8,
			enemyId: "netopyr"
		}],
		goldReward: 16
	},
	act1_battle_1: {
		id: "act1_battle_1",
		act: 1,
		name: "Zatuchlá hradní chodba",
		props: [{
			type: "holy_font",
			cell: 3
		}],
		heroCell: 2,
		heroFacing: 1,
		initialEnemies: [{
			enemyId: "srpak",
			cell: 4,
			facing: -1
		}, {
			enemyId: "morak",
			cell: 6,
			facing: -1
		}],
		reinforcements: [{
			turnDelay: 3,
			gateCell: 6,
			enemyId: "zombie_hynek"
		}],
		goldReward: 18
	},
	act1_battle_2: {
		id: "act1_battle_2",
		act: 1,
		name: "Hradní spižírna u zelného sudu",
		boardSize: 9,
		heroCell: 1,
		heroFacing: 1,
		initialEnemies: [{
			enemyId: "prase_mutant",
			cell: 5,
			facing: -1
		}, {
			enemyId: "kyjovec",
			cell: 8,
			facing: -1
		}],
		terrain: [],
		reinforcements: [{
			turnDelay: 4,
			gateCell: 0,
			enemyId: "buldok"
		}],
		goldReward: 20
	},
	act1_elite: {
		id: "act1_elite",
		act: 1,
		name: "Černá kuchyně řeznice Boženy",
		isElite: true,
		heroCell: 2,
		heroFacing: 1,
		initialEnemies: [{
			enemyId: "elite_drab",
			cell: 5,
			facing: -1
		}, {
			enemyId: "sedlak_stit",
			cell: 3,
			facing: -1
		}],
		reinforcements: [{
			turnDelay: 3,
			gateCell: 6,
			enemyId: "vlkodav"
		}],
		goldReward: 30
	},
	act1_boss: {
		id: "act1_boss",
		act: 1,
		name: "Zrcadlový salón Arciknížete von Sosáka",
		isBoss: true,
		heroCell: 1,
		heroFacing: 1,
		initialEnemies: [{
			enemyId: "boss_sosak",
			cell: 5,
			facing: -1
		}, {
			enemyId: "netopyr",
			cell: 6,
			facing: -1
		}],
		props: [{
			type: "barrel",
			cell: 3
		}, {
			type: "mirror",
			cell: 7
		}],
		terrain: [{
			type: "spikes",
			cell: 4
		}],
		reinforcements: [{
			turnDelay: 4,
			gateCell: 0,
			enemyId: "netopyr"
		}, {
			turnDelay: 7,
			gateCell: 6,
			enemyId: "kluk_kamen"
		}],
		goldReward: 45
	},
	act2_battle_1: {
		id: "act2_battle_1",
		act: 2,
		name: "Strážnice u padací mříže",
		heroCell: 3,
		heroFacing: 1,
		initialEnemies: [{
			enemyId: "halapartnik",
			cell: 5,
			facing: -1
		}, {
			enemyId: "upirka_cilka",
			cell: 1,
			facing: 1
		}],
		reinforcements: [{
			turnDelay: 3,
			gateCell: 0,
			enemyId: "upiri_trpaslik"
		}],
		goldReward: 22
	},
	act2_battle_2: {
		id: "act2_battle_2",
		act: 2,
		name: "Starobylý archiv rodové krve",
		heroCell: 2,
		heroFacing: 1,
		initialEnemies: [{
			enemyId: "hrabenka_amalie",
			cell: 0,
			facing: 1
		}, {
			enemyId: "drevo",
			cell: 5,
			facing: -1
		}],
		reinforcements: [{
			turnDelay: 3,
			gateCell: 0,
			enemyId: "sedlak_stit"
		}, {
			turnDelay: 5,
			gateCell: 6,
			enemyId: "vrhac_nozu"
		}],
		goldReward: 24
	},
	act2_elite: {
		id: "act2_elite",
		act: 2,
		name: "Mučírna vrchního inkvizitora",
		isElite: true,
		heroCell: 2,
		heroFacing: 1,
		initialEnemies: [{
			enemyId: "elite_urednik",
			cell: 5,
			facing: -1
		}, {
			enemyId: "sliz",
			cell: 6,
			facing: -1
		}],
		reinforcements: [{
			turnDelay: 3,
			gateCell: 0,
			enemyId: "krysa_piskota"
		}],
		goldReward: 35
	},
	act2_boss: {
		id: "act2_boss",
		act: 2,
		name: "Krajkový budoár Hraběnky Dagmar",
		isBoss: true,
		heroCell: 2,
		heroFacing: 1,
		initialEnemies: [{
			enemyId: "boss_dagmar",
			cell: 5,
			facing: -1
		}, {
			enemyId: "sedlak_stit",
			cell: 4,
			facing: -1
		}],
		props: [{
			type: "barrel",
			cell: 3
		}, {
			type: "mirror",
			cell: 7
		}],
		terrain: [{
			type: "plank_intact",
			cell: 4
		}, {
			type: "spikes",
			cell: 1
		}],
		reinforcements: [{
			turnDelay: 4,
			gateCell: 6,
			enemyId: "ucetni_buffer"
		}, {
			turnDelay: 6,
			gateCell: 0,
			enemyId: "netopyr"
		}],
		goldReward: 55
	},
	act3_battle_1: {
		id: "act3_battle_1",
		act: 3,
		name: "Krypta zapomenutých hrobů",
		heroCell: 3,
		heroFacing: 1,
		initialEnemies: [
			{
				enemyId: "sedlak_stit",
				cell: 5,
				facing: -1
			},
			{
				enemyId: "kostlivec_fabian",
				cell: 1,
				facing: 1
			},
			{
				enemyId: "bazinny_sliz",
				cell: 6,
				facing: -1
			}
		],
		reinforcements: [{
			turnDelay: 3,
			gateCell: 0,
			enemyId: "morovy_felcar"
		}],
		goldReward: 28
	},
	act3_battle_2: {
		id: "act3_battle_2",
		act: 3,
		name: "Předkomoří upířího sněmu",
		props: [{
			type: "mirror",
			cell: 5
		}],
		heroCell: 2,
		heroFacing: 1,
		initialEnemies: [
			{
				enemyId: "rytir_prizrak",
				cell: 4,
				facing: -1
			},
			{
				enemyId: "carodejnice",
				cell: 6,
				facing: -1
			},
			{
				enemyId: "upiri_trpaslik",
				cell: 0,
				facing: 1
			}
		],
		reinforcements: [{
			turnDelay: 3,
			gateCell: 0,
			enemyId: "halapartnik"
		}, {
			turnDelay: 5,
			gateCell: 6,
			enemyId: "ucetni_buffer"
		}],
		goldReward: 30
	},
	act3_elite: {
		id: "act3_elite",
		act: 3,
		name: "Sál nočního soudu",
		isElite: true,
		heroCell: 3,
		heroFacing: 1,
		initialEnemies: [{
			enemyId: "elite_drab",
			cell: 5,
			facing: -1
		}, {
			enemyId: "elite_urednik",
			cell: 1,
			facing: 1
		}],
		reinforcements: [{
			turnDelay: 4,
			gateCell: 6,
			enemyId: "sliz"
		}],
		goldReward: 42
	},
	act3_boss: {
		id: "act3_boss",
		act: 3,
		name: "Trůnní sál Hraběte Drákuly",
		isBoss: true,
		heroCell: 2,
		heroFacing: 1,
		initialEnemies: [{
			enemyId: "boss_drakula",
			cell: 5,
			facing: -1
		}, {
			enemyId: "ucetni_buffer",
			cell: 6,
			facing: -1
		}],
		props: [{
			type: "barrel",
			cell: 4
		}],
		terrain: [{
			type: "pit",
			cell: 0
		}, {
			type: "spikes",
			cell: 3
		}],
		reinforcements: [{
			turnDelay: 3,
			gateCell: 6,
			enemyId: "upirske_prase"
		}, {
			turnDelay: 5,
			gateCell: 6,
			enemyId: "sedlak_stit"
		}],
		goldReward: 100
	}
};
function hashSeed(seedInput) {
	const str = String(seedInput ?? "VENCA-1899");
	let h = 1779033703 ^ str.length;
	for (let i = 0; i < str.length; i++) {
		h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
		h = h << 13 | h >>> 19;
	}
	return () => {
		h = Math.imul(h ^ h >>> 16, 2246822507);
		h = Math.imul(h ^ h >>> 13, 3266489909);
		return (h ^= h >>> 16) >>> 0;
	};
}
function createRng(seedInput = "VENCA-1899") {
	let state = hashSeed(seedInput)() || 1;
	function nextFloat() {
		let t = state += 1831565813;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	}
	function nextInt(min, maxInclusive) {
		return Math.floor(nextFloat() * (maxInclusive - min + 1)) + min;
	}
	function pick(array) {
		if (!array || array.length === 0) return void 0;
		return array[Math.floor(nextFloat() * array.length)];
	}
	function shuffle(array) {
		const copy = [...array];
		for (let i = copy.length - 1; i > 0; i--) {
			const j = Math.floor(nextFloat() * (i + 1));
			[copy[i], copy[j]] = [copy[j], copy[i]];
		}
		return copy;
	}
	function getState() {
		return state >>> 0;
	}
	function setState(newState) {
		state = newState >>> 0 || 1;
	}
	return {
		seed: String(seedInput),
		nextFloat,
		nextInt,
		pick,
		shuffle,
		getState,
		setState
	};
}
var STRINGS = {
	gameTitle: "LOVEC UPÍRŮ",
	gameSubtitle: "Venca Česnekáč v hradu temnot",
	acts: {
		1: "Akt I: Zatuchlé předhradí a hřbitov",
		2: "Akt II: Černá kuchyně a zbrojnice",
		3: "Akt III: Zrcadlový trůnní sál Hraběte Drákuly"
	},
	friendlyFireQuotes: [
		"„Hrabě Drákula by zaplakal – upír právě prokousl krk vlastnímu nočnímu bratru!“",
		"„Tohle se v kryptě nenosí! Upír napálil kumpána přímo mezi lopatky!“",
		"„Přátelská výpomoc po upířsku: jeden špičák do vlastních řad!“",
		"„Kdo jinému jámu kopá, sám do ní upířího druha shodí!“",
		"„Pekelná potupa v noční hlídce! Venca se jen škodolibě chechtá pod fousy.“"
	],
	collisionQuotes: [
		"„Řach! Dvě palice zaduněly o sebe jak pivní soudky!“",
		"„Hradní zeď nepovolila, zato upírovi křuplo v kříži!“",
		"„Srážka v chodbě bez přednosti zprava!“"
	],
	momentumQuotes: ["„MOMENTUM! Poslední pijavice padla v kombu – Venca popadl druhý dech a zkrátil cooldowny!“"],
	tutorialHints: [
		"TIP 1 (Kroky): Klávesami A / D popojdeš o 1 pole. Do obsazeného pole se vejít nedá. Přes překážku skáče jen destička Hospodský přemet.",
		"TIP 2 (Otočení a Česnek): Klávesou W se Venca otočí čelem vzad. V Česnekovém oblaku je otočení ZDARMA (nestojí tah)!",
		"TIP 3 (Fronta a Kombo): Kliknutím na destičku (nebo klávesami 1–4) ji vložíš do Fronty (stojí 1 tah, pokud není Rychlovka). Mezerníkem (Space) odpálíš celou frontu najednou!",
		"TIP 4 (Záměry a Friendly Fire): Sleduj odpočet nad hlavami upírů a červeně označená pole. Když upíra poodstrčíš nebo otočíš stříkačkou, napálí při odpočtu 0 vlastního kumpána!"
	]
};
/** Czech plural for a turn count: 1 tah, 2–4 tahy, 5+ tahů, 11–14 tahů. */
function czechTurns(n) {
	const abs = Math.abs(Number(n) || 0);
	if (abs % 100 >= 11 && abs % 100 <= 14) return "tahů";
	const d = abs % 10;
	if (d === 1) return "tah";
	if (d >= 2 && d <= 4) return "tahy";
	return "tahů";
}
function isValidCell(cell, state) {
	const limit = state?.boardSize || 7;
	return Number.isInteger(cell) && cell >= 0 && cell < limit;
}
function getLivingEntities(state) {
	const list = [];
	if (state.hero && state.hero.hp > 0) list.push(state.hero);
	for (const enemy of state.enemies) if (enemy.hp > 0) list.push(enemy);
	for (const prop of state.props) if (prop.hp > 0) list.push(prop);
	return list;
}
function getEntityAt(state, cell) {
	if (!isValidCell(cell, state)) return null;
	if (state.hero && state.hero.hp > 0 && state.hero.cell === cell) return state.hero;
	for (const enemy of state.enemies) if (enemy.hp > 0 && enemy.cell === cell) return enemy;
	for (const prop of state.props) if (prop.hp > 0 && prop.cell === cell) return prop;
	return null;
}
function assertBoardInvariant(state) {
	const seen = /* @__PURE__ */ new Map();
	const entities = getLivingEntities(state);
	for (const ent of entities) {
		if (!isValidCell(ent.cell, state)) throw new Error(`Invariant porušen: entita ${ent.id} je mimo bojiště na poli ${ent.cell}`);
		if (seen.has(ent.cell)) {
			const other = seen.get(ent.cell);
			throw new Error(`Invariant porušen: dvě entity (${other.id}, ${ent.id}) stojí na stejném poli ${ent.cell}`);
		}
		seen.set(ent.cell, ent);
	}
	return true;
}
function findNearestEmptyCell(state, targetCell, preferredDir = 1, ignoreId = null) {
	const limit = state?.boardSize || 7;
	const clamped = Math.max(0, Math.min(limit - 1, targetCell));
	const blocked = (cell) => {
		const occ = getEntityAt(state, cell);
		if (!occ) return false;
		if (ignoreId && occ.id === ignoreId) return false;
		return true;
	};
	if (!blocked(clamped)) return clamped;
	const dir = Math.sign(preferredDir) || 1;
	for (let radius = 1; radius < limit; radius++) {
		const first = clamped + dir * radius;
		const second = clamped - dir * radius;
		if (isValidCell(first, state) && !blocked(first)) return first;
		if (isValidCell(second, state) && !blocked(second)) return second;
	}
	return null;
}
function hasStatus(entity, statusId) {
	return Boolean(entity && entity.hp > 0 && entity.statuses && (entity.statuses[statusId] || 0) > 0);
}
function getStatusAmount(entity, statusId) {
	if (!entity || entity.hp <= 0 || !entity.statuses) return 0;
	return Math.max(0, entity.statuses[statusId] || 0);
}
function consumeStatus(entity, statusId, amount = 1) {
	if (!entity || !entity.statuses || !entity.statuses[statusId]) return 0;
	const consumed = Math.min(entity.statuses[statusId], amount);
	entity.statuses[statusId] -= consumed;
	if (entity.statuses[statusId] <= 0) delete entity.statuses[statusId];
	return consumed;
}
function addStatus(entity, statusId, amount = 1, events = []) {
	if (!entity || entity.hp <= 0 || !statusId || statusId === "stagger") return;
	if (!entity.statuses) entity.statuses = {};
	entity.statuses[statusId] = (entity.statuses[statusId] || 0) + amount;
	if (statusId === "shield") entity.statuses.shieldTurnsLeft = 1;
	events.push({
		type: "status_added",
		targetId: entity.id,
		cell: entity.cell,
		statusId,
		amount: entity.statuses[statusId]
	});
}
function applyDamage(state, target, amount, sourceInfo = {}, events = []) {
	if (!target || target.hp <= 0 || amount <= 0) return 0;
	let finalDmg = amount;
	if (target.entityType === "enemy" && target.frontShield && sourceInfo.type === "direct" && typeof sourceInfo.attackerCell === "number") {
		if (Math.sign(sourceInfo.attackerCell - target.cell) === target.facing) {
			events.push({
				type: "blocked_front_shield",
				targetId: target.id,
				cell: target.cell,
				text: `${target.name} vykryl přímý úder zepředu svým štítem!`
			});
			events.push({
				type: "log",
				text: `🛡️ ${target.name} odrazil útok zepředu! Musíš na něj zezadu, odhozením nebo ho otočit stříkačkou.`
			});
			return 0;
		}
	}
	if (target.statuses?.shield > 0) {
		const shieldPoints = target.statuses.shield;
		const absorbed = Math.min(shieldPoints, finalDmg);
		target.statuses.shield -= absorbed;
		if (target.statuses.shield <= 0) {
			delete target.statuses.shield;
			delete target.statuses.shieldTurnsLeft;
		}
		finalDmg -= absorbed;
		events.push({
			type: "shield_blocked",
			targetId: target.id,
			cell: target.cell,
			absorbed,
			shieldRemaining: target.statuses?.shield || 0,
			text: `${target.name} pohltil ${absorbed} DMG štítem! (Zbývá ${target.statuses?.shield || 0} Štítu)`
		});
		events.push({
			type: "log",
			text: `🛡️ Štít postavy ${target.name} pohltil ${absorbed} DMG! (Zbývá ${target.statuses?.shield || 0} Štítu)`
		});
		if (finalDmg <= 0) return 0;
	}
	target.hp = Math.max(0, target.hp - finalDmg);
	events.push({
		type: "damage",
		targetId: target.id,
		targetName: target.name,
		cell: target.cell,
		amount: finalDmg,
		remainingHp: target.hp,
		attackerId: sourceInfo.attackerId || null,
		attackerCell: typeof sourceInfo.attackerCell === "number" ? sourceInfo.attackerCell : null,
		reason: sourceInfo.reason || "attack",
		ichor: target.ichor || null,
		entityType: target.entityType || null,
		fatal: target.hp <= 0
	});
	if (target.bloodThorns && !sourceInfo.reflected && sourceInfo.attackerId && sourceInfo.attackerId !== target.id) {
		const attacker = findEntityById(state, sourceInfo.attackerId);
		if (attacker && attacker.hp > 0 && attacker.id !== target.id) {
			events.push({
				type: "log",
				text: `🌹 Krajkové trny ${target.name} šlehly útočníka za 1 DMG!`
			});
			applyDamage(state, attacker, 1, {
				reason: "blood_thorns",
				reflected: true,
				attackerId: target.id,
				attackerCell: target.cell,
				type: "thorns"
			}, events);
		}
	}
	if (target.entityType === "enemy" && target.isBoss && target.hp > 0 && !target.enraged && target.hp <= Math.floor(target.maxHp / 2) && target.enrageTile) {
		target.enraged = true;
		const queued = grantEnrageTile(target);
		events.push({
			type: "boss_enrage",
			targetId: target.id,
			cell: target.cell,
			tileId: target.enrageTile,
			queued
		});
		events.push({
			type: "log",
			text: queued ? `⚡ ${target.name} zuří a přidává do své fronty novou zákeřnou destičku!` : `⚡ ${target.name} zuří!`
		});
	}
	if (target.entityType === "enemy" && target.mirrorCloak && target.hp > 0 && sourceInfo.isComboHit && typeof sourceInfo.attackerCell === "number") {
		const hitDir = Math.sign(target.cell - sourceInfo.attackerCell);
		if (target.lastComboHitDir === hitDir) {
			const swapCandidate = findMirrorCloakCandidate(state, target);
			if (swapCandidate) {
				const oldBossCell = target.cell;
				const newBossCell = swapCandidate.cell;
				target.cell = newBossCell;
				swapCandidate.cell = oldBossCell;
				target.lastComboHitDir = null;
				events.push({
					type: "swap",
					entityAId: target.id,
					entityBId: swapCandidate.id,
					cellA: newBossCell,
					cellB: oldBossCell
				});
				events.push({
					type: "log",
					text: `🪞 Zrcadlový plášť! ${target.name} si v dýmu prohodil místo s entitou ${swapCandidate.name}!`
				});
				triggerCellTerrainOnEnter(state, target, newBossCell, events);
				if (swapCandidate.hp > 0) triggerCellTerrainOnEnter(state, swapCandidate, oldBossCell, events);
			}
		} else target.lastComboHitDir = hitDir;
	}
	if (target.hp <= 0) handleEntityDeath(state, target, sourceInfo, events);
	return finalDmg;
}
function hitBlockFromEvents(events, startIndex) {
	for (let i = events.length - 1; i >= startIndex; i--) {
		const kind = events[i]?.type;
		if (kind === "shield_blocked") return "shield";
		if (kind === "blocked_front_shield") return "front";
		if (kind === "damage") return null;
	}
	return null;
}
function effectSurvivesBlock(block, effectType) {
	if (!block) return true;
	if (block === "shield") return false;
	if (block === "front") return effectType === "push" || effectType === "flip_target";
	return true;
}
function findEntityById(state, id) {
	if (!id) return null;
	if (state.hero?.id === id) return state.hero;
	return state.enemies.find((e) => e.id === id) || state.props.find((p) => p.id === id) || null;
}
function grantEnrageTile(target) {
	const tileId = target.enrageTile;
	if (!tileId) return false;
	const tileDef = ENEMY_TILES[tileId];
	const cooldown = tileDef?.cooldown ?? tileDef?.delay ?? 2;
	if (!target.actionPool) target.actionPool = [];
	const existing = target.actionPool.find((p) => p.tileId === tileId);
	if (!existing) target.actionPool.push({
		tileId,
		maxCooldown: cooldown,
		currentCooldown: 0
	});
	else {
		existing.currentCooldown = 0;
		if (!existing.maxCooldown) existing.maxCooldown = cooldown;
	}
	if (target.queueState === "ARMED_RED") return false;
	if (!target.actionQueue) target.actionQueue = [];
	if (target.actionQueue.includes(tileId)) return false;
	if (target.actionQueue.length >= (target.comboCapacity || 3)) return false;
	target.actionQueue.push(tileId);
	target.queueState = "QUEUING_GRAY";
	return true;
}
function findMirrorCloakCandidate(state, boss) {
	const candidates = [...state.props.filter((p) => p.hp > 0 && p.kind === "barrel"), ...state.enemies.filter((e) => e.hp > 0 && e.id !== boss.id && e.kind === "netopyr")];
	if (candidates.length === 0) return null;
	candidates.sort((a, b) => Math.abs(a.cell - boss.cell) - Math.abs(b.cell - boss.cell));
	return candidates[0];
}
function clearTransientCorpses(state) {
	if (!state) return;
	for (const enemy of state.enemies || []) delete enemy.corpse;
	for (const prop of state.props || []) delete prop.corpse;
}
function handleEntityDeath(state, target, sourceInfo = {}, events = []) {
	if (!target || target.deathResolved) return;
	target.deathResolved = true;
	events.push({
		type: "death",
		targetId: target.id,
		targetName: target.name,
		entityType: target.entityType,
		cell: target.cell,
		reason: sourceInfo.reason || "damage",
		ichor: target.ichor || null
	});
	if (target.entityType === "prop" && target.kind === "barrel") {
		events.push({
			type: "barrel_break",
			cell: target.cell,
			text: "Sud s kyselým zelím se rozletěl na třísky!"
		});
		events.push({
			type: "log",
			text: `🛢️ Sud s kyselým zelím na poli ${target.cell + 1} explodoval v gejzíru šťávy!`
		});
	} else if (target.entityType === "prop" && target.kind === "holy_font") {
		events.push({
			type: "holy_font_shatter",
			cell: target.cell
		});
		events.push({
			type: "log",
			text: `💦 Kamenná kropenka se roztříštila! Gejzír svěcené vody zasáhl okolní nemrtvé za 2 DMG a vytvořil posvěcenou louži!`
		});
		state.terrain[target.cell] = {
			type: "holy_water_puddle",
			duration: 3
		};
		events.push({
			type: "terrain_spawn",
			terrainType: "holy_water_puddle",
			cell: target.cell
		});
		for (const c of [
			target.cell - 1,
			target.cell,
			target.cell + 1
		]) if (isValidCell(c, state)) {
			const enemy = state.enemies.find((e) => e.hp > 0 && e.cell === c);
			if (enemy) applyDamage(state, enemy, 4, {
				reason: "holy_font_shatter",
				type: "holy"
			}, events);
		}
	} else if (target.entityType === "enemy") {
		state.stats.enemiesKilled = (state.stats.enemiesKilled || 0) + 1;
		events.push({
			type: "log",
			text: `💀 ${target.name} se s hlasitým zaklením poroučel do věčných lovišť!`
		});
	} else if (target.entityType === "hero") events.push({
		type: "log",
		text: `⚰️ Venca Česnekáč padl! Upíři a noční stvůry dnes zvítězili.`
	});
	target.corpse = true;
}
function triggerCellTerrainOnEnter(state, entity, cell, events = []) {
	if (!entity || entity.hp <= 0 || !isValidCell(cell, state)) return;
	const terrainObj = state.terrain[cell];
	if (!terrainObj || terrainObj.type === "none") return;
	if (entity.flying && terrainObj.type !== "spikes") return;
	if (terrainObj.type === "pit") {
		events.push({
			type: "pit_fall",
			targetId: entity.id,
			cell,
			text: `${entity.name} zahučel do bezedné propasti!`
		});
		events.push({
			type: "log",
			text: `🕳️ ${entity.name} spadl do propasti na poli ${cell + 1}! Okamžitá smrt!`
		});
		entity.hp = 0;
		handleEntityDeath(state, entity, { reason: "pit" }, events);
		return;
	}
	if (terrainObj.type === "spikes") {
		events.push({
			type: "terrain_trigger",
			terrainType: "spikes",
			cell,
			targetId: entity.id
		});
		events.push({
			type: "log",
			text: `🗡️ ${entity.name} naběhl na naostřené kůly na poli ${cell + 1} (4 DMG)!`
		});
		applyDamage(state, entity, 4, { reason: "spikes" }, events);
		return;
	}
	if (terrainObj.type === "holy_water_puddle" && entity.entityType === "enemy") {
		events.push({
			type: "terrain_trigger",
			terrainType: "holy_water_puddle",
			cell,
			targetId: entity.id
		});
		events.push({
			type: "log",
			text: `🔥 ${entity.name} vstoupil do posvěcené louže a škvaří se (1 DMG)!`
		});
		applyDamage(state, entity, 2, {
			reason: "holy_water_puddle",
			type: "holy"
		}, events);
		return;
	}
	if (terrainObj.type === "plank_intact") {
		state.terrain[cell] = { type: "plank_cracked" };
		events.push({
			type: "plank_crack",
			cell,
			targetId: entity.id
		});
		events.push({
			type: "log",
			text: `🪵 Prohnilé prkno na poli ${cell + 1} pod vahou postavy ${entity.name} zlověstně zapraskalo!`
		});
		return;
	}
	if (terrainObj.type === "plank_cracked") {
		state.terrain[cell] = { type: "none" };
		events.push({
			type: "plank_collapse",
			cell,
			targetId: entity.id
		});
		events.push({
			type: "log",
			text: `💥 Prkno na poli ${cell + 1} se prolomilo! ${entity.name} utržil 4 DMG!`
		});
		applyDamage(state, entity, 4, { reason: "plank_collapse" }, events);
	}
}
function pushEntity(state, target, direction, distance, events = []) {
	if (!target || target.hp <= 0 || distance <= 0 || !direction) return;
	const stepDir = Math.sign(direction);
	const bonusCollision = state.talismans?.includes("hobnailed_boots") ? 1 : 0;
	const targetColDmg = 2 + (target.entityType !== "hero" ? bonusCollision : 0);
	for (let step = 0; step < distance; step++) {
		if (target.hp <= 0) break;
		const nextCell = target.cell + stepDir;
		if (!isValidCell(nextCell, state)) {
			events.push({
				type: "collision_wall",
				targetId: target.id,
				cell: target.cell,
				direction: stepDir
			});
			events.push({
				type: "log",
				text: `🧱 ${target.name} narazil hlavou do hradní zdi (${targetColDmg} DMG)!`
			});
			applyDamage(state, target, targetColDmg, { reason: "wall_collision" }, events);
			break;
		}
		const blocker = getEntityAt(state, nextCell);
		if (blocker) {
			if (blocker.entityType === "prop" && blocker.kind === "barrel") {
				events.push({
					type: "collision_barrel",
					targetId: target.id,
					barrelId: blocker.id,
					cell: nextCell
				});
				events.push({
					type: "log",
					text: `🛢️ ${target.name} vletěl přímo do sudu s kyselým zelím! Sud praská (4 DMG + Zmatení)!`
				});
				applyDamage(state, blocker, blocker.hp, { reason: "barrel_smash" }, events);
				applyDamage(state, target, 4 + (target.entityType !== "hero" ? bonusCollision : 0), { reason: "barrel_smash" }, events);
				if (target.hp > 0) addStatus(target, "confusion", 1, events);
				if (blocker.hp <= 0 && target.hp > 0 && !getEntityAt(state, nextCell)) {
					const fromCell = target.cell;
					target.cell = nextCell;
					events.push({
						type: "push_move",
						targetId: target.id,
						from: fromCell,
						to: nextCell
					});
					triggerCellTerrainOnEnter(state, target, nextCell, events);
				}
				break;
			} else if (blocker.entityType === "prop" && blocker.kind === "holy_font") {
				events.push({
					type: "collision_font",
					targetId: target.id,
					fontId: blocker.id,
					cell: nextCell
				});
				events.push({
					type: "log",
					text: `💦 ${target.name} vší silou narazil do kamenné kropenky! Kropenka se tříští na kusy!`
				});
				applyDamage(state, blocker, blocker.hp, { reason: "font_smash" }, events);
				applyDamage(state, target, targetColDmg, { reason: "font_smash" }, events);
				if (blocker.hp <= 0 && target.hp > 0 && !getEntityAt(state, nextCell)) {
					const fromCell = target.cell;
					target.cell = nextCell;
					events.push({
						type: "push_move",
						targetId: target.id,
						from: fromCell,
						to: nextCell
					});
					triggerCellTerrainOnEnter(state, target, nextCell, events);
				}
				break;
			}
			events.push({
				type: "collision_entity",
				pushedId: target.id,
				blockerId: blocker.id,
				cell: nextCell
			});
			const quote = STRINGS.collisionQuotes[0];
			const blockerColDmg = 2 + (blocker.entityType !== "hero" ? bonusCollision : 0);
			const dmgLabel = targetColDmg === blockerColDmg ? `oba ${targetColDmg} DMG` : `${target.name} ${targetColDmg} DMG, ${blocker.name} ${blockerColDmg} DMG`;
			events.push({
				type: "log",
				text: `💥 Srážka! ${target.name} vrazil do postavy ${blocker.name} (${dmgLabel})! ${quote}`
			});
			applyDamage(state, target, targetColDmg, { reason: "entity_collision" }, events);
			applyDamage(state, blocker, blockerColDmg, { reason: "entity_collision" }, events);
			break;
		}
		const fromCell = target.cell;
		target.cell = nextCell;
		events.push({
			type: "push_move",
			targetId: target.id,
			from: fromCell,
			to: nextCell
		});
		triggerCellTerrainOnEnter(state, target, nextCell, events);
	}
	assertBoardInvariant(state);
}
function pullEntity(state, target, attackerCell, events = []) {
	if (!target || target.hp <= 0) return;
	const stepDir = Math.sign(attackerCell - target.cell);
	if (stepDir === 0) return;
	while (Math.abs(target.cell - attackerCell) > 1 && target.hp > 0) {
		const nextCell = target.cell + stepDir;
		if (!isValidCell(nextCell, state) || getEntityAt(state, nextCell)) break;
		const fromCell = target.cell;
		target.cell = nextCell;
		events.push({
			type: "pull_move",
			targetId: target.id,
			from: fromCell,
			to: nextCell
		});
		triggerCellTerrainOnEnter(state, target, nextCell, events);
	}
	assertBoardInvariant(state);
}
function resolveLungeLanding(state, enemy, fromCell, facing, steps) {
	let cell = fromCell;
	const dir = Math.sign(facing) || 1;
	for (let i = 0; i < (steps || 0); i++) {
		const next = cell + dir;
		if (stepRefuseReason(state, enemy, next)) break;
		cell = next;
	}
	return cell;
}
function canTileHitTarget(state, enemy, tileDef, fromCell, facing, targetCell) {
	if (!tileDef || !tileDef.pattern || tileDef.pattern.length === 0) return false;
	const origin = tileDef.lungeForward ? resolveLungeLanding(state, enemy, fromCell, facing, tileDef.lungeForward) : fromCell;
	if (tileDef.projectileRange) {
		for (const pat of tileDef.pattern) {
			const c = origin + facing * pat.offset;
			if (!isValidCell(c, state)) break;
			if (c === targetCell) return true;
			const occupant = getEntityAt(state, c);
			if (occupant && occupant.id !== enemy.id) break;
		}
		return false;
	}
	return (tileDef.pattern || []).some((pat) => origin + facing * pat.offset === targetCell);
}
function planEnemyIntent(state, enemy) {
	if (!enemy || enemy.hp <= 0 || !state.hero || state.hero.hp <= 0) {
		enemy.nextAction = null;
		return;
	}
	if (enemy.queueState === "ARMED_RED") {
		enemy.nextAction = { type: "execute_queue" };
		return;
	}
	const heroCell = state.hero.cell;
	const diff = heroCell - enemy.cell;
	const dirToHero = Math.sign(diff) || enemy.facing;
	if (dirToHero !== enemy.facing && heroCell !== enemy.cell) {
		enemy.nextAction = {
			type: "turn",
			dir: dirToHero
		};
		return;
	}
	const readyTiles = (enemy.actionPool || []).filter((p) => p.currentCooldown === 0 && !(enemy.actionQueue || []).includes(p.tileId));
	const hittingReady = readyTiles.filter((p) => {
		const def = ENEMY_TILES[p.tileId];
		return canTileHitTarget(state, enemy, def, enemy.cell, enemy.facing, heroCell);
	});
	if (hittingReady.length > 0) {
		const bestTile = hittingReady[0];
		const capacity = enemy.comboCapacity || 2;
		if ((enemy.actionQueue || []).length < capacity) {
			enemy.nextAction = {
				type: "queue_tile",
				tileId: bestTile.tileId
			};
			return;
		} else {
			enemy.queueState = "ARMED_RED";
			enemy.nextAction = { type: "execute_queue" };
			return;
		}
	}
	if ((enemy.actionQueue || []).some((tileId) => {
		const def = ENEMY_TILES[tileId];
		return canTileHitTarget(state, enemy, def, enemy.cell, enemy.facing, heroCell);
	})) {
		if (enemy.archetype === "fodder" || (enemy.actionQueue || []).length >= (enemy.comboCapacity || 2)) {
			enemy.queueState = "ARMED_RED";
			enemy.nextAction = { type: "execute_queue" };
			return;
		}
	}
	const dist = Math.abs(diff);
	if (enemy.archetype === "ranged" && dist <= 1) {
		if (isSafeStep(state, enemy, enemy.cell - enemy.facing)) {
			enemy.nextAction = {
				type: "step",
				dir: -enemy.facing,
				reason: "retreat"
			};
			return;
		}
	}
	if (dist > 1) {
		if (isSafeStep(state, enemy, enemy.cell + enemy.facing)) {
			enemy.nextAction = {
				type: "step",
				dir: enemy.facing,
				reason: "advance"
			};
			return;
		}
	}
	const nonAttackReady = readyTiles.find((p) => {
		const def = ENEMY_TILES[p.tileId];
		return def && (def.type === "nápřah" || def.type === "štít" || def.type === "léčení" || def.type === "přivolání");
	});
	if (nonAttackReady && (enemy.actionQueue || []).length < (enemy.comboCapacity || 2)) {
		enemy.nextAction = {
			type: "queue_tile",
			tileId: nonAttackReady.tileId
		};
		return;
	}
	if ((enemy.actionQueue || []).length > 0) {
		enemy.queueState = "ARMED_RED";
		enemy.nextAction = { type: "execute_queue" };
		return;
	}
	enemy.nextAction = { type: "idle" };
}
function checkAndApplyArming(state, enemy, events = []) {
	if (enemy.queueState === "ARMED_RED") return;
	if (!enemy.actionQueue || enemy.actionQueue.length === 0) return;
	let shouldArm = false;
	const capacity = enemy.comboCapacity || 2;
	if (enemy.actionQueue.length >= capacity) shouldArm = true;
	else if (enemy.archetype === "fodder" && enemy.actionQueue.length >= 1) shouldArm = true;
	else if ((enemy.actionPool || []).filter((p) => p.currentCooldown === 0 && !enemy.actionQueue.includes(p.tileId)).length === 0) shouldArm = true;
	if (shouldArm) {
		enemy.queueState = "ARMED_RED";
		enemy.nextAction = { type: "execute_queue" };
		events.push({
			type: "enemy_armed",
			enemyId: enemy.id,
			enemyName: enemy.name,
			cell: enemy.cell
		});
		events.push({
			type: "log",
			text: `🚨 ${enemy.name} zčervenal. Máš ještě jednu normální akci, než odpálí útok!`
		});
	}
}
function initializeAllEnemiesIntent(state) {
	if (!state || !state.enemies) return;
	for (const enemy of state.enemies) if (enemy.hp > 0) telegraphEnemy(state, enemy);
}
function telegraphEnemy(state, enemy) {
	if (!enemy || enemy.hp <= 0) return;
	planEnemyIntent(state, enemy);
	checkAndApplyArming(state, enemy, []);
	planEnemyIntent(state, enemy);
	enemy.countdown = enemy.queueState === "ARMED_RED" ? 1 : 2;
}
function processEnemiesPhase(state, events = []) {
	if (!state.hero || state.hero.hp <= 0) return events;
	const orderedEnemies = getSortedEnemiesByInitiative(state);
	for (const enemy of orderedEnemies) {
		if (enemy.hp <= 0 || state.hero.hp <= 0) continue;
		if (hasStatus(enemy, "stun")) {
			consumeStatus(enemy, "stun", 1);
			events.push({
				type: "enemy_stun_skipped",
				enemyId: enemy.id,
				enemyName: enemy.name,
				cell: enemy.cell
			});
			events.push({
				type: "log",
				text: `🔔 ${enemy.name} je omráčený a vynechává akci!`
			});
			continue;
		}
		if (!enemy.nextAction && enemy.queueState !== "ARMED_RED") {
			planEnemyIntent(state, enemy);
			checkAndApplyArming(state, enemy, []);
		}
		if (enemy.actionPool) {
			for (const item of enemy.actionPool) if (!enemy.actionQueue?.includes(item.tileId) && item.currentCooldown > 0) item.currentCooldown = Math.max(0, item.currentCooldown - 1);
		}
		if ((enemy.queueState === "ARMED_RED" || enemy.countdown <= 1) && (enemy.actionQueue || []).length > 0) {
			const targetedCells = getEnemyQueuedTargetCells(state, enemy);
			events.push({
				type: "enemy_queue_firing",
				enemyId: enemy.id,
				enemyName: enemy.name,
				cell: enemy.cell,
				queue: [...enemy.actionQueue],
				targetedCells
			});
			if (enemy.hp > 0 && !hasStatus(enemy, "stun")) {
				events.push({
					type: "enemy_queue_execution_start",
					enemyId: enemy.id,
					enemyName: enemy.name,
					cell: enemy.cell,
					queue: [...enemy.actionQueue]
				});
				events.push({
					type: "log",
					text: `⚡ ${enemy.name} odpálil celou frontu akcí (${enemy.actionQueue.length} ${enemy.actionQueue.length === 1 ? "destička" : "destičky"})!`
				});
				const queueCopy = [...enemy.actionQueue];
				for (const tileId of queueCopy) {
					if (enemy.hp <= 0 || state.hero.hp <= 0) break;
					const tileDef = ENEMY_TILES[tileId];
					if (tileDef) {
						executeSingleEnemyTile(state, enemy, tileDef, events);
						const poolItem = enemy.actionPool?.find((p) => p.tileId === tileId);
						if (poolItem) poolItem.currentCooldown = poolItem.maxCooldown;
					}
				}
			} else if (enemy.hp <= 0) events.push({
				type: "log",
				text: `💀 ${enemy.name} byl zlikvidován reakcí ještě před provedením své fronty!`
			});
			enemy.actionQueue = [];
			enemy.queueState = "EMPTY";
		} else if (enemy.nextAction) performEnemyAction(state, enemy, enemy.nextAction, events);
		if (enemy.hp > 0 && state.hero.hp > 0) {
			checkAndApplyArming(state, enemy, events);
			planEnemyIntent(state, enemy);
			enemy.countdown = enemy.queueState === "ARMED_RED" ? 1 : 2;
		}
	}
	assertBoardInvariant(state);
	return events;
}
function performEnemyAction(state, enemy, action, events) {
	if (!action) return;
	if (action.type === "turn") {
		enemy.facing = action.dir;
		events.push({
			type: "turn",
			entityId: enemy.id,
			facing: enemy.facing
		});
		events.push({
			type: "log",
			text: `🔄 ${enemy.name} se otočil ${enemy.facing === 1 ? "vpravo ▶" : "vlevo ◀"}.`
		});
	} else if (action.type === "step") {
		let dir = action.dir;
		if (hasStatus(enemy, "confusion")) {
			consumeStatus(enemy, "confusion", 1);
			dir = state.rng.nextFloat() < .5 ? -1 : 1;
			events.push({
				type: "log",
				text: `🌀 Zmatený ${enemy.name} vrávorá náhodným směrem!`
			});
		}
		const targetCell = enemy.cell + dir;
		const refused = stepRefuseReason(state, enemy, targetCell);
		if (!refused) {
			const fromCell = enemy.cell;
			enemy.cell = targetCell;
			events.push({
				type: "move",
				entityId: enemy.id,
				from: fromCell,
				to: targetCell,
				facing: enemy.facing
			});
			events.push({
				type: "log",
				text: `👣 ${enemy.name} popošel na pole ${targetCell + 1}.`
			});
			triggerCellTerrainOnEnter(state, enemy, targetCell, events);
		} else {
			events.push({
				type: "enemy_step_blocked",
				enemyId: enemy.id,
				from: enemy.cell,
				blockedCell: targetCell
			});
			events.push({
				type: "log",
				text: stepBlockedLog(enemy, targetCell, refused)
			});
		}
	} else if (action.type === "queue_tile") {
		const tileId = action.tileId;
		const tileDef = ENEMY_TILES[tileId];
		if (!enemy.actionQueue) enemy.actionQueue = [];
		enemy.actionQueue.push(tileId);
		enemy.queueState = "QUEUING_GRAY";
		events.push({
			type: "enemy_queue_tile",
			enemyId: enemy.id,
			tileId,
			tileName: tileDef?.name || tileId,
			slotIndex: enemy.actionQueue.length - 1
		});
		events.push({
			type: "log",
			text: `📥 ${enemy.name} připravil do komba „${tileDef?.name || tileId}“ (slot #${enemy.actionQueue.length}).`
		});
	} else if (action.type === "arm") {
		enemy.queueState = "ARMED_RED";
		events.push({
			type: "enemy_armed",
			enemyId: enemy.id,
			cell: enemy.cell
		});
		events.push({
			type: "log",
			text: `🚨 ${enemy.name} zčervenal. Máš ještě jednu normální akci, než odpálí kombo!`
		});
	}
}
function executeSingleEnemyTile(state, enemy, tileDef, events = []) {
	const hero = state.hero;
	events.push({
		type: "enemy_action_start",
		enemyId: enemy.id,
		enemyName: enemy.name,
		cell: enemy.cell,
		tileId: tileDef.id,
		tileName: tileDef.name,
		tileType: tileDef.type
	});
	if (tileDef.type === "otočení") {
		enemy.facing = Math.sign(hero.cell - enemy.cell) || enemy.facing;
		events.push({
			type: "turn",
			entityId: enemy.id,
			facing: enemy.facing
		});
		events.push({
			type: "log",
			text: `🔄 ${enemy.name} se otočil směrem k Vencovi.`
		});
		return;
	}
	if (tileDef.type === "krok") {
		const dirToHero = Math.sign(hero.cell - enemy.cell) || enemy.facing;
		enemy.facing = dirToHero;
		events.push({
			type: "turn",
			entityId: enemy.id,
			facing: enemy.facing
		});
		let moveDir = dirToHero;
		if (tileDef.retreatIfClose && Math.abs(hero.cell - enemy.cell) <= 1) moveDir = -dirToHero;
		if (hasStatus(enemy, "confusion")) {
			consumeStatus(enemy, "confusion", 1);
			moveDir = state.rng.nextFloat() < .5 ? -1 : 1;
			events.push({
				type: "log",
				text: `🌀 Zmatený ${enemy.name} vrávorá náhodným směrem!`
			});
		}
		const targetCell = enemy.cell + moveDir;
		const refused = stepRefuseReason(state, enemy, targetCell);
		if (refused) {
			events.push({
				type: "enemy_step_blocked",
				enemyId: enemy.id,
				from: enemy.cell,
				blockedCell: targetCell
			});
			events.push({
				type: "log",
				text: stepBlockedLog(enemy, targetCell, refused)
			});
			return;
		}
		const fromCell = enemy.cell;
		enemy.cell = targetCell;
		events.push({
			type: "move",
			entityId: enemy.id,
			from: fromCell,
			to: targetCell,
			facing: enemy.facing
		});
		triggerCellTerrainOnEnter(state, enemy, targetCell, events);
		return;
	}
	if (tileDef.type === "nápřah" || tileDef.type === "štít") {
		if (tileDef.selfEffect) addStatus(enemy, tileDef.selfEffect.type, tileDef.selfEffect.amount || 1, events);
		events.push({
			type: "log",
			text: `💢 ${enemy.name} použil „${tileDef.name}“!`
		});
		return;
	}
	if (tileDef.type === "léčení" && tileDef.supportAllies) {
		const allies = state.enemies.filter((e) => e.hp > 0 && e.id !== enemy.id);
		const targetAlly = allies.length > 0 ? allies.sort((a, b) => Math.abs(a.cell - enemy.cell) - Math.abs(b.cell - enemy.cell))[0] : enemy;
		const healAmt = tileDef.healAmount || 1;
		const oldHp = targetAlly.hp;
		targetAlly.hp = Math.min(targetAlly.maxHp, targetAlly.hp + healAmt);
		const healed = targetAlly.hp - oldHp;
		if (healed > 0) events.push({
			type: "heal",
			targetId: targetAlly.id,
			cell: targetAlly.cell,
			amount: healed
		});
		if (tileDef.empowerAmount) addStatus(targetAlly, "empower", tileDef.empowerAmount, events);
		events.push({
			type: "log",
			text: `💉 ${enemy.name} provedla „${tileDef.name}“ na postavu ${targetAlly.name} (+${healed} HP, +Zesílení)!`
		});
		return;
	}
	if (tileDef.summonEnemyId) {
		const freeGate = [0, (state.boardSize || 7) - 1].find((g) => !getEntityAt(state, g));
		if (freeGate !== void 0) {
			const facing = freeGate === 0 ? 1 : -1;
			const spawned = createEnemyInstance(tileDef.summonEnemyId, freeGate, facing);
			state.enemies.push(spawned);
			triggerCellTerrainOnEnter(state, spawned, freeGate, events);
			if (spawned.hp > 0) telegraphEnemy(state, spawned);
			events.push({
				type: "spawn",
				enemy: structuredClone(spawned),
				cell: freeGate
			});
			events.push({
				type: "log",
				text: `🦇 ${enemy.name} přivolal posilu: ${spawned.name} na bráně ${freeGate + 1}!`
			});
		}
		if (!tileDef.pattern || tileDef.pattern.length === 0) return;
	}
	if (tileDef.spawnSpikesAtHero && hero?.hp > 0 && isValidCell(hero.cell, state)) {
		state.terrain[hero.cell] = { type: "spikes" };
		events.push({
			type: "terrain_spawn",
			terrainType: "spikes",
			cell: hero.cell
		});
		events.push({
			type: "log",
			text: `🗡️ ${enemy.name} nechal vyrazit kůly přímo pod Vencou (pole ${hero.cell + 1})!`
		});
		if (!hero.flying) {
			applyDamage(state, hero, 4, {
				reason: "spikes",
				attackerId: enemy.id,
				attackerCell: enemy.cell,
				type: "terrain"
			}, events);
			if (hero.hp <= 0) return;
		}
	}
	if (tileDef.lungeForward) {
		const landing = resolveLungeLanding(state, enemy, enemy.cell, enemy.facing, tileDef.lungeForward);
		while (enemy.cell !== landing && enemy.hp > 0) {
			const next = enemy.cell + enemy.facing;
			const fromCell = enemy.cell;
			enemy.cell = next;
			events.push({
				type: "move",
				entityId: enemy.id,
				from: fromCell,
				to: next,
				facing: enemy.facing
			});
			triggerCellTerrainOnEnter(state, enemy, next, events);
		}
		if (enemy.hp <= 0) return;
	}
	const garlicPenalty = state.terrain[enemy.cell]?.type === "garlic_cloud" ? 1 : 0;
	const empowerBonus = getStatusAmount(enemy, "empower");
	if (tileDef.projectileRange) {
		let hitTarget = null;
		let hitPat = null;
		let endCell = enemy.cell;
		for (const pat of tileDef.pattern || []) {
			const c = enemy.cell + enemy.facing * pat.offset;
			if (!isValidCell(c, state)) break;
			endCell = c;
			const occupant = getEntityAt(state, c);
			if (occupant && occupant.id !== enemy.id) {
				hitTarget = occupant;
				hitPat = pat;
				break;
			}
		}
		events.push({
			type: "enemy_projectile_vfx",
			enemyId: enemy.id,
			from: enemy.cell,
			to: endCell,
			facing: enemy.facing
		});
		if (hitTarget && (hitTarget.kind === "mirror" || hitTarget.reflectsProjectiles)) {
			events.push({
				type: "projectile_reflect",
				mirrorId: hitTarget.id,
				cell: endCell,
				fromFacing: enemy.facing,
				toFacing: -enemy.facing,
				tileId: tileDef.id
			});
			events.push({
				type: "log",
				text: `🪞 Hradní zrcadlo pravdy odrazilo nepřátelskou střelu „${tileDef.name}“ o 180° zpět!`
			});
			const reflectDir = -enemy.facing;
			let reflectedTarget = null;
			let reflectedEndCell = endCell;
			for (let offset = 1; offset <= (tileDef.projectileRange || 4); offset++) {
				const rc = endCell + reflectDir * offset;
				if (!isValidCell(rc, state)) break;
				reflectedEndCell = rc;
				const occ = getEntityAt(state, rc);
				if (occ && occ.id !== hitTarget.id) {
					reflectedTarget = occ;
					break;
				}
			}
			events.push({
				type: "enemy_projectile_vfx",
				enemyId: enemy.id,
				from: endCell,
				to: reflectedEndCell,
				facing: reflectDir,
				reflected: true
			});
			if (reflectedTarget && hitPat) resolveEnemyHitOnTarget(state, enemy, tileDef, hitPat, reflectedTarget, empowerBonus, garlicPenalty, events);
			else events.push({
				type: "log",
				text: `💨 Odražená střela nikoho nezasáhla.`
			});
		} else if (hitTarget && hitPat) resolveEnemyHitOnTarget(state, enemy, tileDef, hitPat, hitTarget, empowerBonus, garlicPenalty, events);
		else events.push({
			type: "log",
			text: `💨 ${enemy.name} vystřelil „${tileDef.name}“, ale trefil jen holou zeď.`
		});
	} else {
		let anyHit = false;
		const alreadyHit = /* @__PURE__ */ new Set();
		for (const pat of tileDef.pattern || []) {
			const targetCell = enemy.cell + enemy.facing * pat.offset;
			if (!isValidCell(targetCell, state)) continue;
			events.push({
				type: "enemy_strike_vfx",
				enemyId: enemy.id,
				from: enemy.cell,
				cell: targetCell
			});
			const occupant = getEntityAt(state, targetCell);
			if (occupant && occupant.id !== enemy.id && !alreadyHit.has(occupant.id)) {
				anyHit = true;
				alreadyHit.add(occupant.id);
				resolveEnemyHitOnTarget(state, enemy, tileDef, pat, occupant, empowerBonus, garlicPenalty, events);
			}
		}
		if (!anyHit && (tileDef.pattern || []).length > 0) events.push({
			type: "log",
			text: `💨 ${enemy.name} promáchl akcí „${tileDef.name}“ do prázdna!`
		});
	}
	if (enemy.statuses?.empower) delete enemy.statuses.empower;
}
function resolveEnemyHitOnTarget(state, attacker, tileDef, pat, target, empowerBonus, garlicPenalty, events) {
	const isFriendlyFire = target.entityType === "enemy";
	const sextonBonus = isFriendlyFire && state.talismans?.includes("sexton_keyring") ? 1 : 0;
	const synergy = attacker.entityType === "enemy" && !attacker.lordSynergy && state.enemies.some((e) => e.hp > 0 && e.lordSynergy && e.id !== attacker.id) ? 1 : 0;
	const dmg = Math.max(0, (pat.dmg || 0) + empowerBonus - garlicPenalty + sextonBonus + synergy);
	let block = null;
	let dealt = 0;
	if (dmg > 0) {
		const mark = events.length;
		dealt = applyDamage(state, target, dmg, {
			type: "direct",
			attackerId: attacker.id,
			attackerCell: attacker.cell,
			reason: tileDef.id
		}, events);
		block = hitBlockFromEvents(events, mark);
		if (tileDef.lifesteal && dealt > 0 && attacker.hp > 0) {
			const heal = Math.min(attacker.maxHp - attacker.hp, tileDef.lifesteal);
			if (heal > 0) {
				attacker.hp += heal;
				events.push({
					type: "heal",
					targetId: attacker.id,
					cell: attacker.cell,
					amount: heal
				});
			}
		}
	}
	if (!block && dmg > 0) {
		if (isFriendlyFire) {
			state.stats.friendlyFireCount = (state.stats.friendlyFireCount || 0) + 1;
			const quote = state.rng.pick(STRINGS.friendlyFireQuotes) || STRINGS.friendlyFireQuotes[0];
			events.push({
				type: "friendly_fire",
				attackerId: attacker.id,
				attackerName: attacker.name,
				targetId: target.id,
				targetName: target.name,
				cell: target.cell,
				amount: dealt
			});
			events.push({
				type: "log",
				text: `🧛‍♂️💥 FRIENDLY FIRE! ${attacker.name} zasáhl vlastního kumpána (${target.name})! ${quote}`
			});
		} else events.push({
			type: "log",
			text: `⚔️ ${attacker.name} zasáhl cíl ${target.name} akcí „${tileDef.name}“ (${dealt} DMG)!`
		});
	}
	const hitDir = Math.sign(target.cell - attacker.cell) || attacker.facing;
	for (const eff of pat.effects || []) {
		if (target.hp <= 0) break;
		if (!effectSurvivesBlock(block, eff.type)) continue;
		if (eff.type === "push") pushEntity(state, target, hitDir, eff.distance || 1, events);
		else if (eff.type === "bleed") addStatus(target, "bleed", eff.amount || 2, events);
		else if (eff.type === "confusion") addStatus(target, "confusion", eff.amount || 1, events);
		else if (eff.type === "stun") addStatus(target, "stun", eff.amount || 1, events);
	}
}
function getEnemyQueuedTargetCells(state, enemy) {
	if (!enemy || !enemy.actionQueue || enemy.actionQueue.length === 0) return [];
	const cells = /* @__PURE__ */ new Set();
	let currentCell = enemy.cell;
	const facing = enemy.facing;
	for (const tileId of enemy.actionQueue) {
		const def = ENEMY_TILES[tileId];
		if (!def) continue;
		let origin = currentCell;
		if (def.lungeForward) {
			const landing = resolveLungeLanding(state, enemy, currentCell, facing, def.lungeForward);
			if (landing !== currentCell) {
				origin = landing;
				currentCell = landing;
			}
		}
		if (def.projectileRange) for (const pat of def.pattern || []) {
			const c = origin + facing * pat.offset;
			if (!isValidCell(c, state)) break;
			cells.add(c);
			const occupant = getEntityAt(state, c);
			if (occupant && occupant.id !== enemy.id) break;
		}
		else for (const pat of def.pattern || []) {
			const c = origin + facing * pat.offset;
			if (isValidCell(c, state)) cells.add(c);
		}
	}
	return Array.from(cells).sort((a, b) => a - b);
}
function stepRefuseReason(state, enemy, cell) {
	if (!isValidCell(cell, state)) return "wall";
	if (getEntityAt(state, cell)) return "occupied";
	if (!enemy?.flying && state.terrain[cell]?.type === "pit") return "pit";
	return null;
}
function stepBlockedLog(enemy, cell, reason) {
	if (reason === "pit") return `🕳️ ${enemy.name} se zarazil před propastí na poli ${cell + 1}.`;
	if (reason === "wall") return `🧱 ${enemy.name} chtěl popojít, ale narazil do hradní zdi.`;
	return `🚧 ${enemy.name} chtěl popojít, ale pole je obsazené.`;
}
function isSafeStep(state, enemy, cell) {
	return stepRefuseReason(state, enemy, cell) === null;
}
var uidCounter = 1;
function nextEntityUid(prefix = "ent") {
	return `${prefix}_${uidCounter++}`;
}
function createEnemyInstance(enemyId, cell, facing = -1) {
	const def = ENEMIES[enemyId];
	if (!def) throw new Error(`Neznámý nepřítel: ${enemyId}`);
	const actionPool = (def.actionPool || []).map((tileId) => {
		const tileDef = ENEMY_TILES[tileId];
		return {
			tileId,
			maxCooldown: tileDef?.cooldown ?? tileDef?.delay ?? 2,
			currentCooldown: 0
		};
	});
	return {
		id: nextEntityUid(enemyId),
		kind: enemyId,
		entityType: "enemy",
		name: def.name,
		givenName: def.givenName || def.name,
		epithet: def.epithet || "",
		bodyScale: def.bodyScale || (def.flying ? "flyer" : def.isBoss ? "boss" : "human"),
		sprite: def.sprite,
		maxHp: def.maxHp,
		hp: def.maxHp,
		cell,
		facing,
		flying: Boolean(def.flying),
		ichor: ichorForKind(enemyId, "enemy", def.name),
		frontShield: Boolean(def.frontShield),
		isElite: Boolean(def.isElite),
		isBoss: Boolean(def.isBoss),
		mirrorCloak: Boolean(def.mirrorCloak),
		bloodThorns: Boolean(def.bloodThorns),
		lordSynergy: Boolean(def.lordSynergy || def.corporateSynergy),
		enrageTile: def.enrageTile || null,
		enraged: false,
		archetype: def.archetype || "fodder",
		comboCapacity: def.comboCapacity || (def.isBoss || def.isElite ? 3 : 2),
		queueState: "EMPTY",
		actionQueue: [],
		actionPool,
		nextAction: null,
		countdown: 2,
		statuses: {},
		flavor: def.flavor || ""
	};
}
function createPropInstance(propKind, cell) {
	const def = PROPS[propKind] || PROPS.barrel;
	return {
		id: nextEntityUid(propKind),
		kind: propKind,
		entityType: "prop",
		name: def.name,
		givenName: propKind === "barrel" ? "Sud" : propKind === "holy_font" ? "Kropenka" : propKind === "mirror" ? "Zrcadlo" : def.name,
		epithet: propKind === "barrel" ? "Kyselé zelí" : propKind === "holy_font" ? "Svěcená voda" : propKind === "mirror" ? "Pravda" : "",
		bodyScale: "prop",
		sprite: def.icon,
		maxHp: def.maxHp,
		hp: def.maxHp,
		cell,
		facing: 1,
		flying: false,
		destructible: Boolean(def.destructible),
		reflectsProjectiles: Boolean(def.reflectsProjectiles),
		statuses: {}
	};
}
function createBattleState(options = {}) {
	const seed = options.seed || "VENCA-1899";
	const rng = options.rng || createRng(seed);
	const encounter = ENCOUNTERS[options.encounterId || "tutorial_1"] || ENCOUNTERS.tutorial_1;
	const curseLevel = Math.max(0, Math.min(5, Number(options.curseLevel) || 0));
	const talismans = [...options.talismans || []];
	const maxQueueSlots = talismans.includes("wet_kerchief") ? 4 : 3;
	const hunterId = options.hunterId || options.loadoutId || "venca";
	const heroMaxHp = options.heroMaxHp || (hunterId === "dragoun" ? 24 : hunterId === "zlodejka" ? 14 : 20);
	const heroHp = Math.min(heroMaxHp, options.heroHp ?? heroMaxHp);
	const defaultDecks = {
		honza: [
			{
				id: "flail_sweep",
				upgradeLevel: 0,
				permanentCdReduction: 0
			},
			{
				id: "plum_bun",
				upgradeLevel: 0,
				permanentCdReduction: 0
			},
			{
				id: "heavy_windup",
				upgradeLevel: 0,
				permanentCdReduction: 0
			}
		],
		dragoun: [
			{
				id: "dragoon_sabre",
				upgradeLevel: 0,
				permanentCdReduction: 0
			},
			{
				id: "dragoon_pistol",
				upgradeLevel: 0,
				permanentCdReduction: 0
			},
			{
				id: "cavalry_parry",
				upgradeLevel: 0,
				permanentCdReduction: 0
			}
		],
		zlodejka: [
			{
				id: "stiletto_stab",
				upgradeLevel: 0,
				permanentCdReduction: 0
			},
			{
				id: "glass_shards",
				upgradeLevel: 0,
				permanentCdReduction: 0
			},
			{
				id: "shadow_slip",
				upgradeLevel: 0,
				permanentCdReduction: 0
			}
		],
		venca: [
			{
				id: "oak_stake",
				upgradeLevel: 0,
				permanentCdReduction: 0
			},
			{
				id: "garlic_belch",
				upgradeLevel: 0,
				permanentCdReduction: 0
			},
			{
				id: "holy_syringe",
				upgradeLevel: 0,
				permanentCdReduction: 0
			}
		]
	};
	const hand = (options.deck || defaultDecks[hunterId] || defaultDecks.venca).map((entry, idx) => {
		const def = getHeroTileDefinition(entry.id, entry.upgradeLevel || 0);
		const cdRed = entry.permanentCdReduction || 0;
		return {
			...def,
			instanceId: `tile_${idx}_${entry.id}`,
			upgradeLevel: entry.upgradeLevel || 0,
			permanentCdReduction: cdRed,
			maxCooldown: Math.max(1, def.cooldown - cdRed),
			currentCooldown: 0,
			inQueue: false
		};
	});
	const boardSize = encounter.boardSize || 7;
	const terrain = Array.from({ length: boardSize }, () => ({ type: "none" }));
	const hunterNames = {
		honza: {
			name: "Hloupý Honza",
			givenName: "Honza",
			epithet: "Selský silák"
		},
		dragoun: {
			name: "Rittmeister Jaromír",
			givenName: "Jaromír",
			epithet: "Vysloužilý dragoun"
		},
		zlodejka: {
			name: "Káča Pavučina",
			givenName: "Káča",
			epithet: "Úskočná zlodějka"
		},
		venca: {
			name: "Venca Česnekáč",
			givenName: "Venca",
			epithet: "Česnekáč"
		},
		classic: {
			name: "Venca Česnekáč",
			givenName: "Venca",
			epithet: "Česnekáč"
		}
	};
	const hInfo = hunterNames[hunterId] || hunterNames.venca;
	const hero = {
		id: `hero_${hunterId}`,
		kind: hunterId === "classic" ? "venca" : hunterId,
		hunterId: hunterId === "classic" ? "venca" : hunterId,
		entityType: "hero",
		name: hInfo.name,
		givenName: hInfo.givenName,
		epithet: hInfo.epithet,
		bodyScale: "hero",
		sprite: "hero.idle",
		maxHp: heroMaxHp,
		hp: heroHp,
		cell: encounter.heroCell ?? 2,
		facing: encounter.heroFacing ?? 1,
		flying: false,
		ichor: "red",
		bumpCooldown: 0,
		statuses: {}
	};
	const enemies = (encounter.initialEnemies || []).map((e) => {
		const inst = createEnemyInstance(e.enemyId, e.cell, e.facing ?? -1);
		if (curseLevel >= 3 && (encounter.isElite || inst.isElite)) {
			inst.statuses = inst.statuses || {};
			inst.statuses.shield = (inst.statuses.shield || 0) + 1;
		}
		if (curseLevel >= 5 && (encounter.isBoss || inst.id.includes("drakula") || inst.id.includes("dracula"))) {
			inst.maxHp = Math.ceil(inst.maxHp * 1.25);
			inst.hp = inst.maxHp;
			inst.statuses = inst.statuses || {};
			inst.statuses.empower = (inst.statuses.empower || 0) + 1;
		}
		return inst;
	});
	const occupiedCells = /* @__PURE__ */ new Set([hero.cell, ...enemies.map((e) => e.cell)]);
	const props = [];
	if (encounter.props) {
		for (const p of encounter.props) if (!occupiedCells.has(p.cell)) {
			props.push(createPropInstance(p.type, p.cell));
			occupiedCells.add(p.cell);
		}
	}
	if (encounter.terrain) {
		for (const t of encounter.terrain) if (t.cell >= 0 && t.cell < boardSize) terrain[t.cell] = {
			type: t.type,
			duration: t.duration || 0
		};
	}
	if (!encounter.props && !encounter.terrain) {
		const preset = rng.pick(TERRAIN_PRESETS);
		if (preset) {
			for (const p of preset.props || []) if (!occupiedCells.has(p.cell)) {
				props.push(createPropInstance(p.type, p.cell));
				occupiedCells.add(p.cell);
			}
			for (const t of preset.terrain || []) if (t.cell !== hero.cell && !occupiedCells.has(t.cell)) terrain[t.cell] = {
				type: t.type,
				duration: t.duration || 0
			};
		}
	}
	if (talismans.includes("garlic_braid")) terrain[hero.cell] = {
		type: "garlic_cloud",
		duration: 2
	};
	const reinforcements = (encounter.reinforcements || []).map((r, idx) => ({
		id: `reinf_${idx}`,
		turnsRemaining: Math.max(1, r.turnDelay - (curseLevel >= 1 ? 1 : 0)),
		gateCell: r.gateCell,
		enemyId: r.enemyId,
		spawned: false
	}));
	const state = {
		seed,
		rng,
		encounterId: encounter.id,
		encounterName: encounter.name,
		boardSize,
		act: encounter.act || 1,
		isTutorial: Boolean(encounter.isTutorial),
		isElite: Boolean(encounter.isElite),
		isBoss: Boolean(encounter.isBoss),
		curseLevel,
		goldReward: encounter.goldReward || 18,
		turn: 1,
		status: "playing",
		maxQueueSlots,
		talismans,
		firstAttackUsed: false,
		lastTurnAspergillumTurn: -99,
		hero,
		enemies,
		props,
		terrain,
		hand,
		queue: [],
		reinforcements,
		log: [`⚔️ Bitva začíná: ${encounter.name}! Venca si odplivl a pozvedl krucifix.`],
		stats: {
			turnsTaken: 0,
			damageDealt: 0,
			friendlyFireCount: 0,
			enemiesKilled: 0,
			combosExecuted: 0
		}
	};
	const bootEvents = [];
	for (const ent of [
		state.hero,
		...state.enemies,
		...state.props
	]) if (ent && ent.hp > 0) triggerCellTerrainOnEnter(state, ent, ent.cell, bootEvents);
	for (const ev of bootEvents) if (ev.type === "log" && ev.text) state.log.push(ev.text);
	initializeAllEnemiesIntent(state);
	assertBoardInvariant(state);
	return state;
}
function getSortedEnemiesByInitiative(state) {
	return state.enemies.filter((e) => e.hp > 0).sort((a, b) => a.cell - b.cell);
}
var TALISMANS = {
	wet_kerchief: {
		id: "wet_kerchief",
		name: "Vlhký šátek na čelo",
		icon: "talisman.wet_kerchief",
		badge: "🧣",
		price: 35,
		description: "+1 slot ve Frontě akcí (celkem 4 sloty pro komba)."
	},
	brass_lantern: {
		id: "brass_lantern",
		name: "Mosazná lucerna",
		icon: "talisman.brass_lantern",
		badge: "🏮",
		price: 24,
		description: "První útočná destička v každé bitvě způsobí +1 DMG."
	},
	beer_frog: {
		id: "beer_frog",
		name: "Pivní žába z výčepu",
		icon: "talisman.beer_frog",
		badge: "🐸",
		price: 26,
		description: "Když Venca přemetem přeskočí nepřítele nebo sud, získá 1 Štít."
	},
	garlic_braid: {
		id: "garlic_braid",
		name: "Cop moravského paličáku",
		icon: "talisman.garlic_braid",
		badge: "🧄",
		price: 22,
		description: "Na začátku každé bitvy se pod Vencou objeví Česnekový oblak na 2 tahy."
	},
	hobnailed_boots: {
		id: "hobnailed_boots",
		name: "Okované půllitry na nohou",
		icon: "talisman.hobnailed_boots",
		badge: "🥾",
		price: 25,
		description: "Kolizní poškození (náraz do zdi, sudu nebo jiného upíra při Push) dává +1 DMG navíc."
	},
	sexton_keyring: {
		id: "sexton_keyring",
		name: "Kostelníkův svazek klíčů",
		icon: "talisman.sexton_keyring",
		badge: "🗝️",
		price: 22,
		description: "Friendly fire (když upír zasáhne jiného upíra) způsobí oběti +1 DMG navíc a 3 dukáty Vencovi."
	},
	sacred_flask: {
		id: "sacred_flask",
		name: "Placatka slivovice s křížkem",
		icon: "talisman.sacred_flask",
		badge: "🍶",
		price: 28,
		description: "Na konci každé vyhrané bitvy si Venca přihne a vyléčí 1 HP."
	},
	notary_stamp: {
		id: "notary_stamp",
		name: "Krvavá pečeť rodu",
		icon: "talisman.notary_stamp",
		badge: "🩸",
		price: 24,
		description: "Při odpálení plné fronty (3+ destičky) udělí všem nepřátelům na bojišti 1 DMG kletbou prastaré pečeti."
	},
	oak_splinter: {
		id: "oak_splinter",
		name: "Tříska z pravého kříže",
		icon: "talisman.oak_splinter",
		badge: "🪵",
		price: 26,
		description: "Destičky ve 3. nebo 4. slotu fronty komba dávají +1 DMG navíc."
	},
	pocket_watch: {
		id: "pocket_watch",
		name: "Cibule po dědovi nádražákovi",
		icon: "talisman.pocket_watch",
		badge: "⏱️",
		price: 25,
		description: "Akce „Čekat“ (S) zkrátí cooldown všem destičkám o 1 tah navíc (celkem o 2)."
	},
	butcher_apron: {
		id: "butcher_apron",
		name: "Zástěra mistra uzenáře",
		icon: "talisman.butcher_apron",
		badge: "🥩",
		price: 27,
		description: "Zvyší maximální i aktuální zdraví Venci o +2 HP při získání."
	},
	holy_aspergillum: {
		id: "holy_aspergillum",
		name: "Farářův kropáč",
		icon: "talisman.holy_aspergillum",
		badge: "💦",
		price: 23,
		description: "Otočení na místě (W) postříká svěcenou vodou sousedního nepřítele před Vencou za 1 DMG (jednou za 2 tahy)."
	}
};
var STARTING_LOADOUTS = {
	classic: {
		id: "classic",
		hunterId: "venca",
		name: "Venca Česnekáč",
		icon: "🧄",
		cost: 0,
		epithet: "Dub a česnek",
		maxHp: 20,
		bumpName: "Česnekové žduchnutí",
		bumpDesc: "Krok do nepřítele: Odhodí ho o 1 pole a zanechá Česnekový oblak (CD 3).",
		comboName: "Česneková aura",
		comboDesc: "3-kombo: Získá +4 Štít (vyprchá na konci dalšího kola) a omámí okolní upíry (Zmatení).",
		description: "Hospodský štamgast a lidový lovec. 20 HP, spoléhá na česnek a odhazování nepřátel.",
		deck: [
			{
				id: "oak_stake",
				upgradeLevel: 0,
				permanentCdReduction: 0
			},
			{
				id: "garlic_belch",
				upgradeLevel: 0,
				permanentCdReduction: 0
			},
			{
				id: "holy_syringe",
				upgradeLevel: 0,
				permanentCdReduction: 0
			}
		]
	},
	honza: {
		id: "honza",
		hunterId: "honza",
		name: "Hloupý Honza",
		icon: "🥖",
		cost: 0,
		epithet: "Selský silák",
		maxHp: 20,
		bumpName: "Selský beran",
		bumpDesc: "Krok do nepřítele: Odhodí nepřítele, sám obsadí jeho pole a způsobí mu 2 drtivé DMG (CD 3).",
		comboName: "Selský hněv",
		comboDesc: "3-kombo: Získá +6 Štít a mocná rázová vlna zasáhne okolní nepřátele za 4 DMG.",
		description: "Prostý chasník s nadlidskou silou. 20 HP, okovaný cep, povidlové buchty a drtivý nápřah. Benchmark vyváženosti.",
		deck: [
			{
				id: "flail_sweep",
				upgradeLevel: 0,
				permanentCdReduction: 0
			},
			{
				id: "plum_bun",
				upgradeLevel: 0,
				permanentCdReduction: 0
			},
			{
				id: "heavy_windup",
				upgradeLevel: 0,
				permanentCdReduction: 0
			}
		]
	},
	dragoun: {
		id: "dragoun",
		hunterId: "dragoun",
		name: "Rittmeister Jaromír",
		icon: "⚔️",
		cost: 15,
		epithet: "Vysloužilý dragoun",
		maxHp: 24,
		bumpName: "Úder těžkým jílcem",
		bumpDesc: "Krok do nepřítele: Praští ho mosazným jílcem šavle za 2 DMG, odhodí ho a omráčí (CD 3).",
		comboName: "Kavaleristická salva",
		comboDesc: "3-kombo: Vypálí kartáčovou salvu (4 DMG všem v linii pohledu) a zkrátí chladnutí všech destiček o 1.",
		description: "Císařský jezdecký veterán. 24 HP, armádní šavle, křesadlová bambitka a neprůstřelný vojenský kryt.",
		deck: [
			{
				id: "dragoon_sabre",
				upgradeLevel: 0,
				permanentCdReduction: 0
			},
			{
				id: "dragoon_pistol",
				upgradeLevel: 0,
				permanentCdReduction: 0
			},
			{
				id: "cavalry_parry",
				upgradeLevel: 0,
				permanentCdReduction: 0
			}
		]
	},
	zlodejka: {
		id: "zlodejka",
		hunterId: "zlodejka",
		name: "Káča Pavučina",
		icon: "🗡️",
		cost: 25,
		epithet: "Úskočná zlodějka",
		maxHp: 14,
		bumpName: "Kapsářská záměna",
		bumpDesc: "Krok do nepřítele: Prohodí si s ním místo a otočí ho zády k sobě (CD 2).",
		comboName: "Pavučinový únik",
		comboDesc: "3-kombo: Získá +4 Štít a okamžitě obnoví připravenost manévru záměny.",
		description: "Hbitá kapsářka z pražských uliček. Křehká (14 HP), ale ze zálohy do zad zasazuje smrtících 8 DMG.",
		deck: [
			{
				id: "stiletto_stab",
				upgradeLevel: 0,
				permanentCdReduction: 0
			},
			{
				id: "glass_shards",
				upgradeLevel: 0,
				permanentCdReduction: 0
			},
			{
				id: "shadow_slip",
				upgradeLevel: 0,
				permanentCdReduction: 0
			}
		]
	}
};
var NIGHT_CURSES = [
	{
		level: 0,
		id: "none",
		name: "Běžná noc",
		shortName: "Bez kletby",
		icon: "☀️",
		fangMultiplier: 1,
		description: "Běžná výprava bez dodatečných upířích kleteb."
	},
	{
		level: 1,
		id: "restless_crypt",
		name: "Kletba I: Neklidná hrobka",
		shortName: "Kletba I",
		icon: "⚰️",
		fangMultiplier: 1.25,
		description: "Posily z hradních bran nastupují o 1 tah dříve."
	},
	{
		level: 2,
		id: "costly_outskirts",
		name: "Kletba II: Drahota v podzámčí",
		shortName: "Kletba II",
		icon: "🪙",
		fangMultiplier: 1.5,
		description: "Ceny v hospodě a kovářské dílně jsou vyšší o 25 %."
	},
	{
		level: 3,
		id: "armored_brutes",
		name: "Kletba III: Obrnění drábové",
		shortName: "Kletba III",
		icon: "🛡️",
		fangMultiplier: 1.75,
		description: "Elitní nepřátelé vstupují do boje s 1 Štítem navíc."
	},
	{
		level: 4,
		id: "weary_hunter",
		name: "Kletba IV: Zemdlený lovec",
		shortName: "Kletba IV",
		icon: "🩸",
		fangMultiplier: 2,
		description: "Venca začíná výpravu s −2 maximálními HP (8 HP místo 10)."
	},
	{
		level: 5,
		id: "lord_of_darkness",
		name: "Kletba V: Pán temnoty",
		shortName: "Kletba V",
		icon: "👑",
		fangMultiplier: 2.5,
		description: "Hrabě Drákula má o 25 % více životů a začíná boj s posílením úderů."
	}
];
function getCurseDefinition(level = 0) {
	return NIGHT_CURSES[Math.max(0, Math.min(5, Number(level) || 0))] || NIGHT_CURSES[0];
}
function getCurseShopPrice(basePrice, curseLevel = 0) {
	if (curseLevel >= 2) return Math.ceil(basePrice * 1.25);
	return basePrice;
}
function createNewRun(seedInput = "VENCA-1899", loadoutId = "classic", curseLevel = 0) {
	const seed = String(seedInput || "VENCA-1899").trim() || "VENCA-1899";
	const rng = createRng(seed);
	const selectedLoadout = STARTING_LOADOUTS[loadoutId] || STARTING_LOADOUTS.classic;
	const deck = JSON.parse(JSON.stringify(selectedLoadout.deck));
	const curse = Math.max(0, Math.min(5, Number(curseLevel) || 0));
	const baseHp = selectedLoadout.maxHp || 20;
	const startHp = curse >= 4 ? Math.max(1, baseHp - 2) : baseHp;
	const runState = {
		seed,
		loadoutId: selectedLoadout.id,
		hunterId: selectedLoadout.hunterId || selectedLoadout.id,
		curseLevel: curse,
		rng,
		act: 1,
		heroMaxHp: startHp,
		heroHp: startHp,
		gold: 25,
		deck,
		talismans: [],
		visitedEvents: [],
		currentNodeId: null,
		completedNodeIds: [],
		map: null,
		status: "active",
		stats: {
			battlesWon: 0,
			elitesDefeated: 0,
			bossesDefeated: 0,
			enemiesKilled: 0,
			totalDamageDealt: 0,
			totalFriendlyFire: 0,
			totalTurns: 0,
			goldEarned: 25
		}
	};
	runState.map = generateActMap(runState, 1);
	return runState;
}
function generateActMap(runState, actNumber) {
	const rng = runState.rng;
	const encounterPrefix = `act${actNumber}`;
	const nodes = [];
	const startNode = {
		id: `a${actNumber}_t0_n0`,
		tier: 0,
		lane: 1,
		type: NODE_TYPES.BATTLE,
		title: actNumber === 1 ? "Noční vrátnice (Tutoriál)" : `Brána ${actNumber}. aktu`,
		encounterId: actNumber === 1 ? "tutorial_1" : `${encounterPrefix}_battle_1`,
		next: [`a${actNumber}_t1_n0`, `a${actNumber}_t1_n1`]
	};
	nodes.push(startNode);
	const t1LeftType = rng.nextFloat() < .65 ? NODE_TYPES.BATTLE : NODE_TYPES.EVENT;
	const t1RightType = t1LeftType === NODE_TYPES.BATTLE ? NODE_TYPES.EVENT : NODE_TYPES.BATTLE;
	nodes.push({
		id: `a${actNumber}_t1_n0`,
		tier: 1,
		lane: 0,
		type: t1LeftType,
		title: getNodeTitle(t1LeftType),
		encounterId: t1LeftType === NODE_TYPES.BATTLE ? `${encounterPrefix}_battle_1` : null,
		next: [`a${actNumber}_t2_n0`, `a${actNumber}_t2_n1`]
	});
	nodes.push({
		id: `a${actNumber}_t1_n1`,
		tier: 1,
		lane: 2,
		type: t1RightType,
		title: getNodeTitle(t1RightType),
		encounterId: t1RightType === NODE_TYPES.BATTLE ? `${encounterPrefix}_battle_1` : null,
		next: [`a${actNumber}_t2_n1`, `a${actNumber}_t2_n2`]
	});
	rng.shuffle([
		NODE_TYPES.WORKSHOP,
		NODE_TYPES.BATTLE,
		NODE_TYPES.PUB
	]).forEach((type, idx) => {
		nodes.push({
			id: `a${actNumber}_t2_n${idx}`,
			tier: 2,
			lane: idx,
			type,
			title: getNodeTitle(type),
			encounterId: type === NODE_TYPES.BATTLE ? `${encounterPrefix}_battle_2` : null,
			next: idx === 0 ? [`a${actNumber}_t3_n0`] : idx === 1 ? [`a${actNumber}_t3_n0`, `a${actNumber}_t3_n1`] : [`a${actNumber}_t3_n1`]
		});
	});
	nodes.push({
		id: `a${actNumber}_t3_n0`,
		tier: 3,
		lane: 0,
		type: NODE_TYPES.ELITE,
		title: "Elitní strážnice",
		encounterId: `${encounterPrefix}_elite`,
		next: [`a${actNumber}_t4_n0`, `a${actNumber}_t4_n1`]
	});
	const t3RightType = rng.nextFloat() < .5 ? NODE_TYPES.TREASURE : NODE_TYPES.BATTLE;
	nodes.push({
		id: `a${actNumber}_t3_n1`,
		tier: 3,
		lane: 2,
		type: t3RightType,
		title: getNodeTitle(t3RightType),
		encounterId: t3RightType === NODE_TYPES.BATTLE ? `${encounterPrefix}_battle_2` : null,
		next: [`a${actNumber}_t4_n0`, `a${actNumber}_t4_n1`]
	});
	nodes.push({
		id: `a${actNumber}_t4_n0`,
		tier: 4,
		lane: 0,
		type: NODE_TYPES.PUB,
		title: "Hospoda U Svěcené pípy",
		encounterId: null,
		next: [`a${actNumber}_t5_n0`]
	});
	nodes.push({
		id: `a${actNumber}_t4_n1`,
		tier: 4,
		lane: 2,
		type: NODE_TYPES.WORKSHOP,
		title: "Kolářská dílna",
		encounterId: null,
		next: [`a${actNumber}_t5_n0`]
	});
	nodes.push({
		id: `a${actNumber}_t5_n0`,
		tier: 5,
		lane: 1,
		type: NODE_TYPES.BOSS,
		title: getBossTitle(actNumber),
		encounterId: `${encounterPrefix}_boss`,
		next: []
	});
	return {
		act: actNumber,
		nodes
	};
}
function getNodeTitle(type) {
	switch (type) {
		case NODE_TYPES.BATTLE: return "Upíří hlídka";
		case NODE_TYPES.ELITE: return "Elitní dráb";
		case NODE_TYPES.PUB: return "Hospoda U Svěcené pípy";
		case NODE_TYPES.WORKSHOP: return "Kolářská dílna";
		case NODE_TYPES.EVENT: return "Podivné setkání";
		case NODE_TYPES.TREASURE: return "Zapomenutá truhlice";
		case NODE_TYPES.BOSS: return "Hradní Boss";
		default: return "Komnata";
	}
}
function getBossTitle(actNumber) {
	if (actNumber === 1) return "Arcikníže von Sosák";
	if (actNumber === 2) return "Hraběnka Dagmar";
	return "Hrabě Drákula, Pán temnot";
}
function getAvailableNodes(runState) {
	if (!runState.map) return [];
	if (!runState.currentNodeId) return runState.map.nodes.filter((n) => n.tier === 0);
	if (!runState.completedNodeIds?.includes(runState.currentNodeId)) return [];
	const current = runState.map.nodes.find((n) => n.id === runState.currentNodeId);
	if (!current) return [];
	return runState.map.nodes.filter((n) => current.next.includes(n.id));
}
function generateBattleRewardChoices(runState, isEliteOrBoss = false) {
	const rng = runState.rng;
	const choices = [];
	const ownedTileIds = new Set(runState.deck.map((d) => d.id));
	const unownedTiles = Object.keys(HERO_TILES).filter((id) => !ownedTileIds.has(id));
	const tilePool = unownedTiles.length > 0 ? unownedTiles : Object.keys(HERO_TILES);
	const chosenTileId = rng.pick(tilePool);
	if (chosenTileId) {
		const def = getHeroTileDefinition(chosenTileId, 0);
		choices.push({
			type: "tile",
			tileId: chosenTileId,
			title: `Destička: ${def.name}`,
			subtitle: `DMG ${def.dmg} · CD ${def.cooldown}`,
			description: def.description
		});
	}
	const unownedTalismans = Object.keys(TALISMANS).filter((id) => !runState.talismans.includes(id));
	if (unownedTalismans.length > 0) {
		const talId = rng.pick(unownedTalismans);
		const tal = TALISMANS[talId];
		choices.push({
			type: "talisman",
			talismanId: talId,
			title: `${tal.badge} Talisman: ${tal.name}`,
			subtitle: "Pasivní relikvie",
			description: tal.description
		});
	}
	const goldAmount = isEliteOrBoss ? 28 : 16;
	choices.push({
		type: "gold",
		amount: goldAmount,
		title: `💰 Měšec hradního pokladu (+${goldAmount} dukátů)`,
		subtitle: "Hotovost do hospody a dílny",
		description: `Přidá ${goldAmount} poctivých dukátů do Vencova měšce.`
	});
	return choices;
}
function grantTileToRun(runState, tileId) {
	const existing = runState.deck.find((d) => d.id === tileId);
	if (existing && (existing.upgradeLevel || 0) < 2) {
		existing.upgradeLevel = (existing.upgradeLevel || 0) + 1;
		return existing;
	}
	const entry = {
		id: tileId,
		upgradeLevel: 0,
		permanentCdReduction: 0
	};
	runState.deck.push(entry);
	return entry;
}
function grantTalismanToRun(runState, talismanId) {
	if (!runState.talismans.includes(talismanId)) {
		runState.talismans.push(talismanId);
		if (talismanId === "butcher_apron") {
			runState.heroMaxHp += 2;
			runState.heroHp += 2;
		}
	}
}
function upgradeTileInRun(runState, deckIndex) {
	const item = runState.deck[deckIndex];
	if (!item) return false;
	if ((item.upgradeLevel || 0) >= 2) return false;
	item.upgradeLevel = (item.upgradeLevel || 0) + 1;
	return true;
}
function reduceTileCooldownInRun(runState, deckIndex) {
	const item = runState.deck[deckIndex];
	if (!item) return false;
	const def = getHeroTileDefinition(item.id, item.upgradeLevel || 0);
	if (Math.max(1, def.cooldown - (item.permanentCdReduction || 0)) <= 1) return false;
	item.permanentCdReduction = (item.permanentCdReduction || 0) + 1;
	return true;
}
function advanceActIfBossDefeated(runState) {
	if (runState.act < 3) {
		runState.act += 1;
		runState.currentNodeId = null;
		runState.heroHp = Math.min(runState.heroMaxHp, runState.heroHp + 3);
		runState.map = generateActMap(runState, runState.act);
		return {
			newAct: runState.act,
			victory: false
		};
	}
	runState.status = "victory";
	return {
		newAct: 3,
		victory: true
	};
}
var NARRATIVE_EVENTS = [
	{
		id: "garlic_smuggler",
		title: "Pašerák se sušeným česnekem",
		text: "V průvanu pod schodištěm přešlapuje chlapík v promaštěném kabátě. „Pst, pane Venco! Mám tu pravý břeclavský paličák i trochu mešního vína ze sakristie. Co to bude?“",
		choices: [
			{
				label: "Koupit věnec česneku a posilnit se (−12 dukátů, +3 HP)",
				condition: (run) => run.gold >= 12,
				effect: {
					goldDelta: -12,
					heal: 3,
					log: "Venca schroupal tři stroužky česneku a cítí se jako zamlada (+3 HP)."
				}
			},
			{
				label: "Vyměnit starou lahvičku za náhodný talisman (−15 dukátů)",
				condition: (run) => run.gold >= 15,
				effect: {
					goldDelta: -15,
					grantRandomTalisman: true,
					log: "Pašerák vytáhl z kapsy podivuhodnou relikvii!"
				}
			},
			{
				label: "Postrašit ho krucifixem a vybrat pokutu (+10 dukátů)",
				effect: {
					goldDelta: 10,
					log: "Pašerák raději vysypal drobné, než by dostal křížem přes čepici (+10 dukátů)."
				}
			}
		]
	},
	{
		id: "vampire_tax_form",
		title: "Zaprášené hradní skriptorium",
		text: "U kamenného pultu dospává starý upíří písař. Na pergamenech jsou načrtnuté kletby krve a vedle leží měšec se stříbrňáky.",
		choices: [
			{
				label: "Sebrat měšec a probodnout kletbu (+18 dukátů, ale písař tě škrábne drápem: −1 HP)",
				effect: {
					goldDelta: 18,
					damage: 1,
					log: "Škrábanec od upířího drápu pálí (−1 HP), ale v kapse cinká 18 dukátů!"
				}
			},
			{
				label: "Seřídit si opasek a vylepšit náhodnou destičku zdarma",
				effect: {
					upgradeRandomTile: true,
					log: "Klid ve skriptoriu posloužil k vykování jedné destičky!"
				}
			},
			{
				label: "Po špičkách odejít a odpočinout si ve stínu klenby (+2 HP)",
				effect: {
					heal: 2,
					log: "Dvacet minut klidného oddechu v chladném stínu katakomb (+2 HP)."
				}
			}
		]
	},
	{
		id: "abandoned_barrel",
		title: "Zapomenutý sud z klášterního pivovaru",
		text: "Uprostřed klenuté síně stojí naražený soudek. Voní z něj poctivý ležák, ale kolem pípy jsou stopy od upířích špičáků.",
		choices: [
			{
				label: "Natočit si poctivý tuplák (+4 HP)",
				effect: {
					heal: 4,
					log: "Křenová pěna a svěcený chmel! Vencovi se vrátil elán (+4 HP)."
				}
			},
			{
				label: "Prohledat dno sudu (získáš novou destičku do zásoby)",
				effect: {
					grantRandomTile: true,
					log: "Za sudem ležel zapomenutý lovecký nástroj!"
				}
			},
			{
				label: "Rozebrat mosazné obruče a prodat je (+14 dukátů)",
				effect: {
					goldDelta: 14,
					log: "Mosazná pípa hodí ve výkupu pěkných 14 dukátů."
				}
			}
		]
	},
	{
		id: "crypt_confessional",
		title: "Vrzající zpovědnice v kryptě",
		text: "Z dřevěné budky se ozývá šepot: „Otče, zhřešil jsem, místo krve jsem včera pil malinovou limonádu...“ Je to kající se upír-praktikant.",
		choices: [
			{
				label: "Udělit mu rozhřešení výměnou za cenný talisman",
				effect: {
					grantRandomTalisman: true,
					log: "Kající se upír ti podstrčil mřížkou rodinný talisman."
				}
			},
			{
				label: "Uložit mu pokání v dukátech (+16 dukátů)",
				effect: {
					goldDelta: 16,
					log: "Upír vysázel 16 dukátů do kasičky na opravu střechy."
				}
			},
			{
				label: "Namočit kolík ve svěcené kropence (vylepší 1 destičku)",
				effect: {
					upgradeRandomTile: true,
					log: "Svěcená voda ze zpovědnice posílila tvou výzbroj!"
				}
			}
		]
	}
];
function pickRandomEvent(runState) {
	const seen = new Set(runState.visitedEvents || []);
	const pool = NARRATIVE_EVENTS.filter((e) => !seen.has(e.id));
	const chosen = runState.rng.pick(pool.length > 0 ? pool : NARRATIVE_EVENTS);
	if (!runState.visitedEvents) runState.visitedEvents = [];
	if (chosen && !runState.visitedEvents.includes(chosen.id)) runState.visitedEvents.push(chosen.id);
	return {
		...chosen,
		choices: (chosen.choices || []).map((choice) => ({ ...choice }))
	};
}
function resolveEventChoice(runState, eventId, choiceIndex) {
	const eventDef = NARRATIVE_EVENTS.find((e) => e.id === eventId);
	if (!eventDef) return {
		ok: false,
		message: "Neznámá událost."
	};
	const choice = eventDef.choices[choiceIndex];
	if (!choice) return {
		ok: false,
		message: "Neplatná volba."
	};
	if (choice.condition && !choice.condition(runState)) return {
		ok: false,
		message: "Na tuto volbu nemáš dostatek dukátů!"
	};
	const eff = choice.effect || {};
	let summary = eff.log || "Rozhodnutí bylo učiněno.";
	if (typeof eff.goldDelta === "number") runState.gold = Math.max(0, runState.gold + eff.goldDelta);
	if (typeof eff.heal === "number") runState.heroHp = Math.min(runState.heroMaxHp, runState.heroHp + eff.heal);
	if (typeof eff.damage === "number") runState.heroHp = Math.max(1, runState.heroHp - eff.damage);
	if (eff.grantRandomTalisman) {
		const unowned = Object.keys(TALISMANS).filter((id) => !runState.talismans.includes(id));
		if (unowned.length > 0) {
			const talId = runState.rng.pick(unowned);
			grantTalismanToRun(runState, talId);
			summary += ` Získán talisman: ${TALISMANS[talId].name}!`;
		} else {
			runState.gold += 20;
			summary += " (Všechny talismany už vlastníš, získáváš +20 dukátů.)";
		}
	}
	if (eff.grantRandomTile) {
		const ownedIds = new Set(runState.deck.map((d) => d.id));
		const available = Object.keys(HERO_TILES).filter((id) => !ownedIds.has(id));
		if (available.length > 0) {
			const tileId = runState.rng.pick(available);
			grantTileToRun(runState, tileId);
			summary += ` Získána destička: ${HERO_TILES[tileId].name}!`;
		} else {
			runState.gold += 18;
			summary += " (+18 dukátů)";
		}
	}
	if (eff.upgradeRandomTile) {
		const upgradable = runState.deck.map((d, idx) => ({
			...d,
			idx
		})).filter((d) => (d.upgradeLevel || 0) < 2);
		if (upgradable.length > 0) {
			const target = runState.rng.pick(upgradable);
			upgradeTileInRun(runState, target.idx);
			summary += ` Vylepšena destička: ${HERO_TILES[target.id].name}!`;
		} else runState.gold += 15;
	}
	return {
		ok: true,
		message: summary
	};
}
var loadedAssets = /* @__PURE__ */ new Map();
var missingAssets = /* @__PURE__ */ new Set();
var manifestData = {};
function generateNepraktaSvgDataUri(key, entry = {}) {
	const label = entry.label || key.split(".").pop();
	const category = key.split(".")[0];
	if (category === "hero" || category === "enemy" || category === "boss") {
		const svg = renderCharacterSvg(key, label);
		return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
	}
	if (category === "terrain") {
		const svg = renderTerrainSvg(key, label);
		return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
	}
	const svg = renderIconSvg(key, label);
	return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
function renderCharacterSvg(key, label) {
	const palettes = {
		"hero.idle": {
			coat: "#3f6212",
			cape: "#65a30d",
			skin: "#fde68a",
			nose: "#e11d48",
			hat: "#365314",
			prop: "✝️"
		},
		"enemy.praktikant": {
			coat: "#4c1d95",
			cape: "#7e22ce",
			skin: "#e2e8f0",
			nose: "#be123c",
			hat: "#1e1b4b",
			prop: "🦷"
		},
		"enemy.urednik": {
			coat: "#7f1d1d",
			cape: "#991b1b",
			skin: "#cbd5e1",
			nose: "#dc2626",
			hat: "#450a0a",
			prop: "💮"
		},
		"enemy.drab": {
			coat: "#78350f",
			cape: "#b45309",
			skin: "#fed7aa",
			nose: "#ea580c",
			hat: "#451a03",
			prop: "🔪"
		},
		"enemy.vratny_stit": {
			coat: "#1e3a8a",
			cape: "#1d4ed8",
			skin: "#cbd5e1",
			nose: "#e11d48",
			hat: "#172554",
			prop: "🛡️"
		},
		"enemy.netopyr": {
			coat: "#311042",
			cape: "#581c87",
			skin: "#d8b4fe",
			nose: "#f43f5e",
			hat: "#1e1b4b",
			prop: "🦇"
		},
		"enemy.ucetni_buffer": {
			coat: "#581c87",
			cape: "#9333ea",
			skin: "#f1f5f9",
			nose: "#e11d48",
			hat: "#3b0764",
			prop: "📜"
		},
		"enemy.kluk_kamen": {
			coat: "#3f6212",
			cape: "#1d4ed8",
			skin: "#fde68a",
			nose: "#e11d48",
			hat: "#ca8a04",
			prop: "🪨"
		},
		"enemy.divocak": {
			coat: "#9a3412",
			cape: "#fdba74",
			skin: "#fecdd3",
			nose: "#fb7185",
			hat: "#44403c",
			prop: "🐗"
		},
		"enemy.upirske_prase": {
			coat: "#9f1239",
			cape: "#fecdd3",
			skin: "#ffe4e6",
			nose: "#e11d48",
			hat: "#4c0519",
			prop: "🩸"
		},
		"enemy.sliz": {
			coat: "#65a30d",
			cape: "#84cc16",
			skin: "#d9f99d",
			nose: "#ca8a04",
			hat: "#365314",
			prop: "🦠"
		},
		"enemy.carodejnice": {
			coat: "#1e3a8a",
			cape: "#1d4ed8",
			skin: "#fef3c7",
			nose: "#65a30d",
			hat: "#1e3a8a",
			prop: "🧙"
		},
		"enemy.drevo": {
			coat: "#78350f",
			cape: "#b45309",
			skin: "#fde68a",
			nose: "#e11d48",
			hat: "#713f12",
			prop: "🪓"
		},
		"enemy.sedlak_stit": {
			coat: "#44403c",
			cape: "#a8a29e",
			skin: "#fde68a",
			nose: "#e11d48",
			hat: "#b45309",
			prop: "🪵"
		},
		"enemy.hrabenka_amalie": {
			coat: "#1d4ed8",
			cape: "#dbeafe",
			skin: "#fde68a",
			nose: "#e11d48",
			hat: "#1e3a8a",
			prop: "👑"
		},
		"enemy.upirka_cilka": {
			coat: "#111827",
			cape: "#b91c1c",
			skin: "#fecdd3",
			nose: "#e11d48",
			hat: "#0f172a",
			prop: "🎩"
		},
		"enemy.vrhac_nozu": {
			coat: "#3f6212",
			cape: "#b45309",
			skin: "#fde68a",
			nose: "#e11d48",
			hat: "#ca8a04",
			prop: "🗡️"
		},
		"enemy.prase_mutant": {
			coat: "#9a3412",
			cape: "#7f1d1d",
			skin: "#fecdd3",
			nose: "#eab308",
			hat: "#44403c",
			prop: "🐷"
		},
		"enemy.bazinny_sliz": {
			coat: "#166534",
			cape: "#65a30d",
			skin: "#84cc16",
			nose: "#ca8a04",
			hat: "#3f6212",
			prop: "🍃"
		},
		"enemy.upiri_trpaslik": {
			coat: "#1d4ed8",
			cape: "#b91c1c",
			skin: "#fecdd3",
			nose: "#e11d48",
			hat: "#1e3a8a",
			prop: "🧢"
		},
		"enemy.rytir_prizrak": {
			coat: "#334155",
			cape: "#1d4ed8",
			skin: "#86efac",
			nose: "#22c55e",
			hat: "#1e293b",
			prop: "👻"
		},
		"enemy.zombie_hynek": {
			coat: "#1f2937",
			cape: "#44403c",
			skin: "#84cc16",
			nose: "#65a30d",
			hat: "#365314",
			prop: "⚰️"
		},
		"enemy.kostlivec_fabian": {
			coat: "#78350f",
			cape: "#d6d3d1",
			skin: "#f5f5f4",
			nose: "#a8a29e",
			hat: "#44403c",
			prop: "🦴"
		},
		"enemy.krysa_piskota": {
			coat: "#78350f",
			cape: "#b91c1c",
			skin: "#a16207",
			nose: "#fb7185",
			hat: "#fef3c7",
			prop: "🐀"
		},
		"enemy.morovy_felcar": {
			coat: "#1e293b",
			cape: "#0f172a",
			skin: "#fdba74",
			nose: "#14532d",
			hat: "#0f172a",
			prop: "🩺"
		},
		"boss.arcikniaze_sosak": {
			coat: "#881337",
			cape: "#be123c",
			skin: "#e2e8f0",
			nose: "#f43f5e",
			hat: "#4c0519",
			prop: "👑"
		},
		"boss.hrabenka_dagmar": {
			coat: "#4c0519",
			cape: "#9f1239",
			skin: "#f8fafc",
			nose: "#e11d48",
			hat: "#1e1b4b",
			prop: "🌹"
		},
		"boss.drakula_generalni_reditel": {
			coat: "#111827",
			cape: "#991b1b",
			skin: "#e2e8f0",
			nose: "#dc2626",
			hat: "#030712",
			prop: "💼"
		}
	};
	const p = palettes[key] || palettes["enemy.praktikant"];
	if (key === "enemy.netopyr") return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
      <ellipse cx="128" cy="230" rx="52" ry="12" fill="rgba(0,0,0,0.25)"/>
      <path d="M20 110 Q70 50 115 110 Q75 135 20 110 Z" fill="${p.cape}" stroke="#1a110b" stroke-width="6"/>
      <path d="M236 110 Q186 50 141 110 Q181 135 236 110 Z" fill="${p.cape}" stroke="#1a110b" stroke-width="6"/>
      <ellipse cx="128" cy="118" rx="36" ry="32" fill="${p.coat}" stroke="#1a110b" stroke-width="6"/>
      <circle cx="118" cy="110" r="10" fill="#fff" stroke="#1a110b" stroke-width="4"/>
      <circle cx="142" cy="110" r="10" fill="#fff" stroke="#1a110b" stroke-width="4"/>
      <circle cx="121" cy="110" r="4" fill="#1a110b"/>
      <circle cx="145" cy="110" r="4" fill="#1a110b"/>
      <ellipse cx="152" cy="122" rx="14" ry="10" fill="${p.nose}" stroke="#1a110b" stroke-width="4"/>
      <polygon points="122,136 127,150 132,136" fill="#fff" stroke="#1a110b" stroke-width="3"/>
      <polygon points="136,136 141,150 146,136" fill="#fff" stroke="#1a110b" stroke-width="3"/>
      <rect x="28" y="198" width="200" height="28" rx="8" fill="#f4e7c5" stroke="#1a110b" stroke-width="4"/>
      <text x="128" y="217" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#1a110b" text-anchor="middle">${label}</text>
    </svg>`;
	if (key === "prop.holy_font" || key === "terrain.holy_font") return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
      <ellipse cx="128" cy="236" rx="64" ry="12" fill="rgba(0,0,0,0.3)"/>
      <rect x="100" y="140" width="56" height="80" rx="6" fill="#64748b" stroke="#1a110b" stroke-width="5"/>
      <path d="M50 80 Q128 60 206 80 L180 144 Q128 160 76 144 Z" fill="#94a3b8" stroke="#1a110b" stroke-width="6"/>
      <ellipse cx="128" cy="86" rx="68" ry="22" fill="#38bdf8" stroke="#0284c7" stroke-width="3"/>
      <path d="M128 50 L128 72 M118 60 L138 60" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
      <circle cx="128" cy="95" r="6" fill="#ffffff" opacity="0.8"/>
      <rect x="34" y="210" width="188" height="26" rx="6" fill="#e2e8f0" stroke="#1a110b" stroke-width="4"/>
      <text x="128" y="228" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">${label}</text>
    </svg>`;
	if (key === "prop.mirror" || key === "terrain.mirror") return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
      <ellipse cx="128" cy="236" rx="64" ry="12" fill="rgba(0,0,0,0.3)"/>
      <rect x="68" y="32" width="120" height="180" rx="60" fill="#cbd5e1" stroke="#334155" stroke-width="10"/>
      <rect x="80" y="44" width="96" height="156" rx="48" fill="#e0f2fe" stroke="#0284c7" stroke-width="4"/>
      <path d="M96 60 L160 170" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.6"/>
      <path d="M108 52 L148 120" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
      <rect x="34" y="210" width="188" height="26" rx="6" fill="#f8fafc" stroke="#1a110b" stroke-width="4"/>
      <text x="128" y="228" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">${label}</text>
    </svg>`;
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
    <ellipse cx="128" cy="238" rx="68" ry="12" fill="rgba(0,0,0,0.28)"/>
    <!-- Cape / Coat in Neprakta ink style -->
    <path d="M58 225 L75 122 L180 122 L198 225 Z" fill="${p.coat}" stroke="#1a110b" stroke-width="6" stroke-linejoin="round"/>
    <path d="M48 135 Q85 110 128 128 Q170 110 205 140 L188 215 L64 215 Z" fill="${p.cape}" stroke="#1a110b" stroke-width="5" stroke-linejoin="round"/>
    <!-- Grotesque head facing right -->
    <circle cx="128" cy="88" r="40" fill="${p.skin}" stroke="#1a110b" stroke-width="6"/>
    <!-- Bulging eyes -->
    <circle cx="122" cy="78" r="12" fill="#ffffff" stroke="#1a110b" stroke-width="4"/>
    <circle cx="148" cy="78" r="12" fill="#ffffff" stroke="#1a110b" stroke-width="4"/>
    <circle cx="126" cy="78" r="5" fill="#1a110b"/>
    <circle cx="152" cy="78" r="5" fill="#1a110b"/>
    <!-- Big Neprakta bulbous nose pointing right -->
    <ellipse cx="168" cy="92" rx="18" ry="13" fill="${p.nose}" stroke="#1a110b" stroke-width="5"/>
    <!-- Vampire fangs / grin -->
    <path d="M115 110 Q138 122 158 108" fill="none" stroke="#1a110b" stroke-width="5" stroke-linecap="round"/>
    <polygon points="126,112 131,127 136,112" fill="#ffffff" stroke="#1a110b" stroke-width="3"/>
    <polygon points="142,111 147,126 152,110" fill="#ffffff" stroke="#1a110b" stroke-width="3"/>
    <!-- Hat / Collar -->
    <path d="M76 58 L180 58 L162 28 L94 28 Z" fill="${p.hat}" stroke="#1a110b" stroke-width="5" stroke-linejoin="round"/>
    <!-- Shield or weapon badge -->
    <circle cx="188" cy="162" r="24" fill="#f4e7c5" stroke="#1a110b" stroke-width="5"/>
    <text x="188" y="171" font-size="24" text-anchor="middle">${p.prop}</text>
    <!-- Nameplate -->
    <rect x="18" y="210" width="220" height="28" rx="7" fill="#f4e7c5" stroke="#1a110b" stroke-width="4"/>
    <text x="128" y="229" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="#1a110b" text-anchor="middle">${label}</text>
  </svg>`;
}
function renderTerrainSvg(key, label) {
	if (key === "terrain.barrel") return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
      <ellipse cx="128" cy="236" rx="64" ry="12" fill="rgba(0,0,0,0.3)"/>
      <rect x="64" y="72" width="128" height="156" rx="34" fill="#92400e" stroke="#1a110b" stroke-width="6"/>
      <rect x="62" y="102" width="132" height="16" fill="#52525b" stroke="#1a110b" stroke-width="4"/>
      <rect x="62" y="176" width="132" height="16" fill="#52525b" stroke="#1a110b" stroke-width="4"/>
      <path d="M84 72 Q128 50 172 72" fill="#84cc16" stroke="#1a110b" stroke-width="5"/>
      <rect x="34" y="206" width="188" height="26" rx="6" fill="#f4e7c5" stroke="#1a110b" stroke-width="4"/>
      <text x="128" y="224" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="#1a110b" text-anchor="middle">${label}</text>
    </svg>`;
	if (key === "prop.holy_font" || key === "terrain.holy_font") return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
      <ellipse cx="128" cy="236" rx="64" ry="12" fill="rgba(0,0,0,0.3)"/>
      <rect x="100" y="140" width="56" height="80" rx="6" fill="#64748b" stroke="#1a110b" stroke-width="5"/>
      <path d="M50 80 Q128 60 206 80 L180 144 Q128 160 76 144 Z" fill="#94a3b8" stroke="#1a110b" stroke-width="6"/>
      <ellipse cx="128" cy="86" rx="68" ry="22" fill="#38bdf8" stroke="#0284c7" stroke-width="3"/>
      <path d="M128 50 L128 72 M118 60 L138 60" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
      <circle cx="128" cy="95" r="6" fill="#ffffff" opacity="0.8"/>
      <rect x="34" y="210" width="188" height="26" rx="6" fill="#e2e8f0" stroke="#1a110b" stroke-width="4"/>
      <text x="128" y="228" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">${label}</text>
    </svg>`;
	if (key === "prop.mirror" || key === "terrain.mirror") return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
      <ellipse cx="128" cy="236" rx="64" ry="12" fill="rgba(0,0,0,0.3)"/>
      <rect x="68" y="32" width="120" height="180" rx="60" fill="#cbd5e1" stroke="#334155" stroke-width="10"/>
      <rect x="80" y="44" width="96" height="156" rx="48" fill="#e0f2fe" stroke="#0284c7" stroke-width="4"/>
      <path d="M96 60 L160 170" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.6"/>
      <path d="M108 52 L148 120" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
      <rect x="34" y="210" width="188" height="26" rx="6" fill="#f8fafc" stroke="#1a110b" stroke-width="4"/>
      <text x="128" y="228" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">${label}</text>
    </svg>`;
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 128" width="256" height="128">
    <rect x="8" y="8" width="240" height="112" rx="12" fill="#d6c7a1" stroke="#1a110b" stroke-width="5"/>
    <text x="128" y="72" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#1a110b" text-anchor="middle">${label}</text>
  </svg>`;
}
function renderIconSvg(key, label) {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
    <rect x="6" y="6" width="116" height="116" rx="18" fill="#f4e7c5" stroke="#2c1d11" stroke-width="6"/>
    <circle cx="64" cy="54" r="32" fill="#e6d2a3" stroke="#2c1d11" stroke-width="3"/>
    <text x="64" y="66" font-size="36" text-anchor="middle">${{
		"tile.oak_stake": "🪵",
		"tile.garlic_belch": "🧄",
		"tile.holy_syringe": "💦",
		"tile.belly_vault": "🤸",
		"tile.rosary_slap": "📿",
		"tile.funeral_hook": "🪝",
		"tile.manhole_shield": "🛡️",
		"tile.sacristy_bell": "🔔",
		"tile.wood_axe": "🪓",
		"tile.plank_stomp": "🥾",
		"tile.funeral_shroud": "👻",
		"tile.silver_crucifix_beam": "✝️",
		"tile.nimble_step": "👟",
		"tile.garlic_pinch": "🧄",
		"tile.pub_elbow": "💪",
		"prop.holy_font": "⛲",
		"prop.mirror": "🪞",
		"terrain.holy_water_puddle": "💦",
		"terrain.holy_font": "⛲",
		"terrain.mirror": "🪞",
		"intent.step": "👣",
		"intent.strike": "⚔️",
		"intent.shoot": "🎯",
		"intent.windup": "💢",
		"intent.shield": "🛡️",
		"intent.heal": "💉",
		"intent.summon": "🦇",
		"intent.turn": "🔄",
		"map.battle": "⚔️",
		"map.elite": "💀",
		"map.pub": "🍺",
		"map.workshop": "⚒️",
		"map.event": "❓",
		"map.treasure": "💎",
		"map.boss": "👑",
		"talisman.wet_kerchief": "🧣",
		"talisman.brass_lantern": "🏮",
		"talisman.beer_frog": "🐸",
		"talisman.garlic_braid": "🧄",
		"talisman.hobnailed_boots": "🥾",
		"talisman.sexton_keyring": "🗝️",
		"talisman.sacred_flask": "🍶",
		"talisman.notary_stamp": "💮",
		"talisman.oak_splinter": "🪵",
		"talisman.pocket_watch": "⏱️",
		"talisman.butcher_apron": "🥩",
		"talisman.holy_aspergillum": "💦"
	}[key] || "⚜️"}</text>
    <text x="64" y="108" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#2c1d11" text-anchor="middle">${label.slice(0, 14)}</text>
  </svg>`;
}
async function initAssets(onProgress = () => {}) {
	try {
		let resp = await fetch("/assets/manifest.json").catch(() => null);
		if (!resp || !resp.ok) resp = await fetch("assets/manifest.json").catch(() => null);
		if (resp && resp.ok) manifestData = await resp.json();
	} catch {
		manifestData = {};
	}
	const keys = Object.keys(manifestData);
	const preloadKeys = keys.filter((k) => manifestData[k].preload);
	let loadedCount = 0;
	for (const key of keys) {
		const entry = manifestData[key];
		loadedAssets.set(key, {
			key,
			src: generateNepraktaSvgDataUri(key, entry),
			isFallback: true,
			meta: entry
		});
	}
	const refresh = () => window.dispatchEvent(new Event("lovec-assets"));
	await Promise.all(preloadKeys.map(async (key) => {
		const ok = await loadSingleAsset(key);
		loadedCount += 1;
		onProgress(loadedCount, preloadKeys.length, key);
		if (ok) refresh();
	}));
	const restKeys = keys.filter((k) => !manifestData[k].preload);
	Promise.all(restKeys.map((k) => loadSingleAsset(k))).then(() => {
		if (missingAssets.size > 0) console.info(`[Lovec Upírů - Asset Pipeline] Chybějící externí PNG soubory nahrazeny Neprakta SVG fallbackem (${missingAssets.size}):\n` + Array.from(missingAssets).join(", "));
	});
}
function toPublicSrc(src) {
	if (!src || src.startsWith("data:") || src.startsWith("/") || src.startsWith("http") || src.startsWith("blob:")) return src;
	return `/${src.replace(/^\.\//, "")}`;
}
function loadSingleAsset(key) {
	const entry = manifestData[key];
	if (!entry || !entry.src) return Promise.resolve();
	if (entry.present !== true) {
		missingAssets.add(`${key} (${entry.src})`);
		return Promise.resolve(false);
	}
	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => {
			loadedAssets.set(key, {
				key,
				src: toPublicSrc(entry.src),
				isFallback: false,
				meta: entry
			});
			resolve(true);
		};
		img.onerror = () => {
			missingAssets.add(`${key} (${entry.src})`);
			loadedAssets.set(key, {
				key,
				src: generateNepraktaSvgDataUri(key, entry),
				isFallback: true,
				meta: entry
			});
			resolve(false);
		};
		img.src = toPublicSrc(entry.src);
	});
}
function getAssetUrl(key, fallbackLabel = "") {
	if (loadedAssets.has(key)) return loadedAssets.get(key).src;
	const fallbackUri = generateNepraktaSvgDataUri(key, { label: fallbackLabel || key });
	loadedAssets.set(key, {
		key,
		src: fallbackUri,
		isFallback: true
	});
	return fallbackUri;
}
var tooltipEl = null;
function initTooltips() {
	if (tooltipEl) return;
	tooltipEl = document.createElement("div");
	tooltipEl.id = "neprakta-tooltip";
	tooltipEl.className = "neprakta-tooltip hidden";
	document.body.appendChild(tooltipEl);
	document.addEventListener("mousemove", (e) => {
		if (!tooltipEl || tooltipEl.classList.contains("hidden")) return;
		positionTooltip(e.clientX, e.clientY);
	});
}
function showTooltip(htmlContent, clientX = 0, clientY = 0) {
	if (!tooltipEl) initTooltips();
	tooltipEl.innerHTML = htmlContent;
	tooltipEl.classList.remove("hidden");
	positionTooltip(clientX, clientY);
}
function hideTooltip() {
	if (!tooltipEl) return;
	tooltipEl.classList.add("hidden");
}
function positionTooltip(x, y) {
	if (!tooltipEl) return;
	const pad = 16;
	const rect = tooltipEl.getBoundingClientRect();
	let left = x + pad;
	let top = y + pad;
	if (left + rect.width > window.innerWidth - 12) left = Math.max(12, x - rect.width - pad);
	if (top + rect.height > window.innerHeight - 12) top = Math.max(12, y - rect.height - pad);
	tooltipEl.style.transform = `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`;
}
function renderHud(container, runState, battleState, callbacks = {}) {
	if (!container || !runState) return;
	const hp = battleState ? battleState.hero.hp : runState.heroHp;
	const maxHp = battleState ? battleState.hero.maxHp : runState.heroMaxHp;
	const actName = STRINGS.acts[runState.act] || `Akt ${runState.act}`;
	const locationTitle = battleState ? battleState.encounterName : "Mapa výpravy";
	const curseDef = getCurseDefinition(runState.curseLevel || 0);
	const curseHtml = runState.curseLevel > 0 ? `<span class="hud-separator">·</span><span class="hud-curse-pill" title="${curseDef.name}: ${curseDef.description} (+${Math.round((curseDef.fangMultiplier - 1) * 100)} % tesáků)">🌙 ${curseDef.shortName}</span>` : "";
	const heartsHtml = Array.from({ length: maxHp }, (_, i) => {
		const full = i < hp;
		return `<span class="hp-pip ${full ? "hp-pip-full" : "hp-pip-empty"}" title="Život ${i + 1}/${maxHp}">${full ? "❤️" : "🖤"}</span>`;
	}).join("");
	const talismansHtml = runState.talismans.length === 0 ? `<span class="hud-muted-text">Žádné talismany</span>` : runState.talismans.map((id) => {
		const t = TALISMANS[id];
		if (!t) return "";
		return `<button type="button" class="talisman-badge" data-talisman-id="${t.id}" aria-label="${t.name}">
              <span class="talisman-icon">${t.badge}</span>
              <span class="talisman-name">${t.name}</span>
            </button>`;
	}).join("");
	container.innerHTML = `
    <div class="hud-bar">
      <div class="hud-left">
        <div class="hud-brand">
          <span class="hud-title">🧄 LOVEC UPÍRŮ</span>
          <span class="hud-separator">·</span>
          <span class="hud-act">${actName}</span>
          <span class="hud-separator">·</span>
          <span class="hud-location">${locationTitle}</span>${curseHtml}
        </div>
        <div class="hud-vitals">
          <div class="hud-hp-group" title="Zdraví Venci Česnekáče">
            <span class="hud-vital-label">Zdraví:</span>
            <div class="hud-hearts">${heartsHtml}</div>
            <span class="hud-hp-numbers"><span class="hud-hp-icon" aria-hidden="true">❤️</span>${hp}/${maxHp} HP</span>
          </div>
          <span class="hud-separator">·</span>
          <div class="hud-gold" title="Hradní dukáty na útratu v hospodě a dílně">
            💰 <strong>${runState.gold}</strong> dukátů
          </div>
          <span class="hud-separator">·</span>
          <div class="hud-fangs" title="Upíří tesáky pro trvalá vylepšení v Hradním archivu">
            🦷 <strong>${callbacks.metaStats?.fangs || 0}</strong>
          </div>
          <span class="hud-separator">·</span>
          <div class="hud-seed" title="Deterministický seed výpravy">
            🎲 Seed: <strong>${runState.seed}</strong>
          </div>
        </div>
      </div>

      <div class="hud-center-talismans">
        <span class="hud-vital-label">Talismany:</span>
        <div class="talisman-strip">${talismansHtml}</div>
      </div>

      <div class="hud-actions">
        <button type="button" class="btn-parchment btn-sm" id="btn-hud-map" title="Zobrazit mapu aktu" aria-label="Zobrazit mapu aktu">
          <span class="btn-icon">🗺️</span><span class="btn-text"> Mapa</span>
        </button>
        <button type="button" class="btn-parchment btn-sm" id="btn-hud-archive" title="Hradní archiv a zbrojnice – odemykání výzbroje za tesáky" aria-label="Hradní archiv a zbrojnice">
          <span class="btn-icon">🏛️</span><span class="btn-text"> Archiv</span>
        </button>
        <button type="button" class="btn-parchment btn-sm" id="btn-hud-rules" title="Pravidla a nápověda (F1)" aria-label="Pravidla a nápověda (F1)">
          <span class="btn-icon">📖</span><span class="btn-text"> Pravidla</span>
        </button>
        <button type="button" class="btn-parchment btn-sm" id="btn-hud-settings" title="Nastavení rychlosti, zvuku a seedu" aria-label="Nastavení rychlosti, zvuku a seedu">
          <span class="btn-icon">⚙️</span><span class="btn-text"> Nastavení</span>
        </button>
      </div>
    </div>
  `;
	container.querySelectorAll("[data-talisman-id]").forEach((el) => {
		const tal = TALISMANS[el.getAttribute("data-talisman-id")];
		if (!tal) return;
		el.addEventListener("mouseenter", (ev) => {
			showTooltip(`<div class="tt-title">${tal.badge} ${tal.name}</div>
         <div class="tt-desc">${tal.description}</div>`, ev.clientX, ev.clientY);
		});
		el.addEventListener("mouseleave", hideTooltip);
	});
	container.querySelector("#btn-hud-map")?.addEventListener("click", () => callbacks.onToggleMap?.());
	container.querySelector("#btn-hud-archive")?.addEventListener("click", () => callbacks.onOpenArchive?.());
	container.querySelector("#btn-hud-rules")?.addEventListener("click", () => callbacks.onOpenRules?.());
	container.querySelector("#btn-hud-settings")?.addEventListener("click", () => callbacks.onOpenSettings?.());
}
var STATUSES = {
	confusion: {
		id: "confusion",
		name: "Zmatení",
		icon: "status.confusion",
		badge: "🌀",
		color: "#9b59b6",
		description: "Při příštím kroku se postava zamotá a vykročí náhodným směrem (pokud je volno)."
	},
	stun: {
		id: "stun",
		name: "Omráčení",
		icon: "status.stun",
		badge: "🔔",
		color: "#f1c40f",
		description: "Vynechá příští akci. U nepřítele zůstane zčervenalá fronta zamčená a odpálí se až další tah."
	},
	bleed: {
		id: "bleed",
		name: "Krvácení",
		icon: "status.bleed",
		badge: "🩸",
		color: "#c0392b",
		description: "Způsobí 1 DMG na konci každého tahu po dobu 2 tahů."
	},
	shield: {
		id: "shield",
		name: "Štít z poklopu",
		icon: "status.shield",
		badge: "🛡️",
		color: "#2980b9",
		description: "Zcela vykryje příští obdržený zásah (1 vrstva = 1 zásah)."
	},
	empower: {
		id: "empower",
		name: "Zesílení",
		icon: "status.empower",
		badge: "🔥",
		color: "#d35400",
		description: "Příští útočná akce způsobí +1 DMG."
	}
};
function computeSlotBonuses(state, tile, slotIndex) {
	let dmgBonus = 0;
	if ((slotIndex === 2 || slotIndex === 3) && state.talismans?.includes("oak_splinter")) dmgBonus += 1;
	if (!state.firstAttackUsed && tile.type !== "move" && state.talismans?.includes("brass_lantern")) dmgBonus += 1;
	if (hasStatus(state.hero, "empower") && (tile.dmg > 0 || dmgBonus > 0)) dmgBonus += getStatusAmount(state.hero, "empower");
	return { dmgBonus };
}
function detectResonances(queueTiles) {
	if (!queueTiles || queueTiles.length < 2) return [];
	const counts = {
		garlic: 0,
		holy: 0,
		brawl: 0,
		craft: 0
	};
	for (const t of queueTiles) if (t?.tags && Array.isArray(t.tags)) {
		for (const tag of t.tags) if (counts[tag] !== void 0) counts[tag] += 1;
	}
	const resonances = [];
	if (counts.garlic >= 2) resonances.push({
		id: "garlic_burst",
		name: "Česnekový opar",
		icon: "🧄",
		tag: "garlic",
		description: "Zanechá Česnekový oblak na 2 tahy před Vencou."
	});
	if (counts.holy >= 2) resonances.push({
		id: "holy_shield",
		name: "Posvátná ochrana",
		icon: "✝️",
		tag: "holy",
		description: "Uloží Vencovi 1 Štít před protiútokem."
	});
	if (counts.brawl >= 2) resonances.push({
		id: "brawl_force",
		name: "Hospodská rvačka",
		icon: "🍺",
		tag: "brawl",
		description: "+1 k dosahu všech odhození (Push) v tomto kombu."
	});
	if (counts.craft >= 2) resonances.push({
		id: "craft_reduction",
		name: "Hodinářský fortel",
		icon: "⚙️",
		tag: "craft",
		description: "Zkrátí cooldown o 1 tah náhodné destičce na opasku."
	});
	if (counts.garlic >= 1 && counts.holy >= 1) resonances.push({
		id: "sanctified_mist",
		name: "Posvěcený opar",
		icon: "✨",
		tag: "dual",
		description: "Zasáhne všechny sousední upíry za 1 DMG."
	});
	return resonances;
}
function triggerComboResonances(state, queueTiles, events = []) {
	const resonances = detectResonances(queueTiles);
	if (resonances.length === 0) return resonances;
	const hero = state.hero;
	for (const res of resonances) {
		events.push({
			type: "resonance_burst",
			resonanceId: res.id,
			name: res.name,
			icon: res.icon
		});
		if (res.id === "garlic_burst") {
			const targetCell = hero.cell + hero.facing;
			if (isValidCell(targetCell, state)) {
				state.terrain[targetCell] = {
					type: "garlic_cloud",
					duration: 2
				};
				events.push({
					type: "terrain_spawn",
					terrainType: "garlic_cloud",
					cell: targetCell
				});
				events.push({
					type: "log",
					text: `🧄 Rezonance Česneku: Štiplavý opar zahalil pole ${targetCell + 1}!`
				});
			}
		} else if (res.id === "holy_shield") {
			addStatus(hero, "shield", 2, events);
			events.push({
				type: "log",
				text: `✝️ Rezonance Svěcené vody: Venca získal posvátný Štít!`
			});
		} else if (res.id === "brawl_force") {
			state.comboResonanceBonusPush = (state.comboResonanceBonusPush || 0) + 1;
			events.push({
				type: "log",
				text: `🍺 Rezonance Hospody: Rány mají větší sílu (+1 pole k odhození)!`
			});
		} else if (res.id === "craft_reduction") {
			const onCd = (state.hand || []).filter((t) => t.currentCooldown > 0);
			if (onCd.length > 0) {
				const picked = onCd[Math.floor(Math.random() * onCd.length)];
				picked.currentCooldown = Math.max(0, picked.currentCooldown - 1);
				events.push({
					type: "log",
					text: `⚙️ Rezonance Řemesla: Důmyslné soukolí zkrátilo cooldown destičce „${picked.name}“!`
				});
			}
		} else if (res.id === "sanctified_mist") {
			let hitAny = false;
			for (const enemy of state.enemies) if (enemy.hp > 0 && Math.abs(enemy.cell - hero.cell) <= 1) {
				applyDamage(state, enemy, 2, { reason: "sanctified_mist" }, events);
				hitAny = true;
			}
			if (hitAny) events.push({
				type: "log",
				text: `✨ Posvěcený opar: Kombinace česneku a svěcené vody popálila sousední upíry za 2 DMG!`
			});
		}
	}
	return resonances;
}
function applyMomentumIfLastEnemyKilled(state, comboLength, events = []) {
	if (comboLength < 2) return false;
	const anyLivingEnemy = state.enemies.some((e) => e.hp > 0);
	const anyPendingReinforcement = state.reinforcements.some((r) => !r.spawned);
	if (anyLivingEnemy || anyPendingReinforcement) return false;
	for (const tile of state.hand) if (tile.currentCooldown > 0) tile.currentCooldown = Math.max(0, tile.currentCooldown - comboLength);
	events.push({
		type: "momentum",
		comboLength,
		reduction: comboLength
	});
	events.push({
		type: "log",
		text: `🔥 ${STRINGS.momentumQuotes[0]} (−${comboLength} CD všem destičkám)`
	});
	return true;
}
function executeHeroTile(state, tile, slotIndex, comboLength, events = []) {
	if (!state.hero || state.hero.hp <= 0 || !tile) return;
	const bonuses = computeSlotBonuses(state, tile, slotIndex);
	const hero = state.hero;
	const empowerAtStart = hero.statuses?.empower || 0;
	events.push({
		type: "tile_start",
		tileId: tile.id,
		instanceId: tile.instanceId,
		tileName: tile.name,
		slotIndex,
		heroId: hero.id,
		isStrike: tile.type === "attack" || (tile.dmg || 0) > 0
	});
	if (tile.selfEffect) addStatus(hero, tile.selfEffect.type, tile.selfEffect.amount || 1, events);
	if (tile.healAmount) {
		const missingHp = (hero.maxHp || 20) - hero.hp;
		const heal = Math.min(tile.healAmount, missingHp);
		if (heal > 0) {
			hero.hp += heal;
			events.push({
				type: "heal",
				targetId: hero.id,
				amount: heal,
				hp: hero.hp
			});
			events.push({
				type: "log",
				text: `🥟 ${hero.name} si zakousl do buchty a vyléčil se o ${heal} HP!`
			});
		}
		const overflow = tile.healAmount - heal;
		if (overflow > 0) {
			addStatus(hero, "shield", overflow, events);
			events.push({
				type: "log",
				text: `🛡️ Zbytek buchty dodal postavě ${hero.name} +${overflow} Štítu!`
			});
		}
	}
	if (tile.shieldAmount) {
		addStatus(hero, "shield", tile.shieldAmount, events);
		events.push({
			type: "log",
			text: `🛡️ ${hero.name} získal +${tile.shieldAmount} Štítu!`
		});
	}
	if (tile.cureStatus && hero.statuses?.[tile.cureStatus]) {
		delete hero.statuses[tile.cureStatus];
		events.push({
			type: "status_cleared",
			targetId: hero.id,
			status: tile.cureStatus
		});
		events.push({
			type: "log",
			text: `✨ ${hero.name} se zbavil stavu ${tile.cureStatus}!`
		});
	}
	if (tile.leapDistance) {
		const startCell = hero.cell;
		if (tile.leaveGarlicCloud) {
			state.terrain[startCell] = {
				type: "garlic_cloud",
				duration: 2
			};
			events.push({
				type: "terrain_spawn",
				terrainType: "garlic_cloud",
				cell: startCell
			});
			events.push({
				type: "log",
				text: `🧄 Venca zanechal na poli ${startCell + 1} štiplavý Česnekový oblak!`
			});
		}
		const landingCell = findNearestEmptyCell(state, hero.cell + hero.facing * tile.leapDistance, hero.facing, hero.id);
		if (landingCell !== null && landingCell !== hero.cell) {
			hero.cell = landingCell;
			events.push({
				type: "leap",
				entityId: hero.id,
				from: startCell,
				to: landingCell
			});
			events.push({
				type: "log",
				text: `🤸 ${tile.name}: Venca přeskočil z pole ${startCell + 1} na pole ${landingCell + 1}!`
			});
			triggerCellTerrainOnEnter(state, hero, landingCell, events);
			if (state.talismans?.includes("beer_frog")) {
				const hopDir = Math.sign(landingCell - startCell);
				let hopped = false;
				if (hopDir) {
					for (let c = startCell + hopDir; c !== landingCell; c += hopDir) if (getEntityAt(state, c)) {
						hopped = true;
						break;
					}
				}
				if (hopped) {
					addStatus(hero, "shield", 1, events);
					events.push({
						type: "log",
						text: "🐸 Pivní žába: Venca získal po přemetu Štít!"
					});
				}
			}
		}
	} else if (tile.stepBackward && hero.hp > 0) {
		const targetCell = hero.cell - hero.facing * tile.stepBackward;
		if (isValidCell(targetCell, state) && !getEntityAt(state, targetCell)) {
			const fromCell = hero.cell;
			hero.cell = targetCell;
			events.push({
				type: "step",
				entityId: hero.id,
				from: fromCell,
				to: targetCell,
				facing: hero.facing
			});
			events.push({
				type: "log",
				text: `🏃 ${tile.name}: Venca uskočil z pole ${fromCell + 1} vzad na pole ${targetCell + 1}!`
			});
			triggerCellTerrainOnEnter(state, hero, targetCell, events);
		} else events.push({
			type: "log",
			text: `🚫 ${tile.name}: Pole za Vencou je zablokováno!`
		});
	} else if (tile.projectileRange) {
		let hitTarget = null;
		let hitPat = null;
		let hitCell = null;
		for (const pat of tile.pattern || []) {
			const c = hero.cell + hero.facing * pat.offset;
			if (!isValidCell(c, state)) break;
			hitCell = c;
			const occupant = getEntityAt(state, c);
			if (occupant && occupant.id !== hero.id) {
				hitTarget = occupant;
				hitPat = pat;
				break;
			}
		}
		events.push({
			type: "projectile_vfx",
			from: hero.cell,
			to: hitCell ?? hero.cell,
			facing: hero.facing,
			tileId: tile.id
		});
		if (hitTarget && (hitTarget.kind === "mirror" || hitTarget.reflectsProjectiles)) {
			events.push({
				type: "projectile_reflect",
				mirrorId: hitTarget.id,
				cell: hitCell,
				fromFacing: hero.facing,
				toFacing: -hero.facing,
				tileId: tile.id
			});
			events.push({
				type: "log",
				text: `🪞 Hradní zrcadlo pravdy odrazilo střelu „${tile.name}“ o 180° zpět!`
			});
			const reflectDir = -hero.facing;
			let reflectedTarget = null;
			let reflectedEndCell = hitCell;
			for (let offset = 1; offset <= (tile.projectileRange || 4); offset++) {
				const rc = hitCell + reflectDir * offset;
				if (!isValidCell(rc, state)) break;
				reflectedEndCell = rc;
				const occ = getEntityAt(state, rc);
				if (occ && occ.id !== hitTarget.id) {
					reflectedTarget = occ;
					break;
				}
			}
			events.push({
				type: "projectile_vfx",
				from: hitCell,
				to: reflectedEndCell,
				facing: reflectDir,
				tileId: tile.id,
				reflected: true
			});
			if (reflectedTarget && hitPat) resolveSinglePatternHit(state, tile, hitPat, reflectedTarget, bonuses, comboLength, events);
			else events.push({
				type: "log",
				text: `💨 Odražená střela prolétla chodbou a nikoho nezasáhla.`
			});
		} else if (hitTarget && hitPat) resolveSinglePatternHit(state, tile, hitPat, hitTarget, bonuses, comboLength, events);
		else {
			events.push({
				type: "tile_whiff",
				tileId: tile.id,
				cell: hitCell ?? hero.cell
			});
			events.push({
				type: "log",
				text: `💨 ${tile.name} prolétla prázdnou chodbou naprázdno.`
			});
		}
	} else {
		let anyHit = false;
		const alreadyHit = /* @__PURE__ */ new Set();
		for (const pat of tile.pattern || []) {
			const targetCell = hero.cell + hero.facing * pat.offset;
			if (!isValidCell(targetCell, state)) continue;
			events.push({
				type: "strike_vfx",
				from: hero.cell,
				cell: targetCell,
				tileId: tile.id
			});
			for (const eff of pat.effects || []) if (eff.type === "spawn_spikes") {
				state.terrain[targetCell] = { type: "spikes" };
				events.push({
					type: "terrain_spawn",
					terrainType: "spikes",
					cell: targetCell
				});
				events.push({
					type: "log",
					text: `🗡️ Z podlahy na poli ${targetCell + 1} vyrazily naostřené kůly!`
				});
			} else if (eff.type === "spawn_garlic_target") {
				state.terrain[targetCell] = {
					type: "garlic_cloud",
					duration: 2
				};
				events.push({
					type: "terrain_spawn",
					terrainType: "garlic_cloud",
					cell: targetCell
				});
			}
			const occupant = getEntityAt(state, targetCell);
			if (occupant && occupant.id !== hero.id && !alreadyHit.has(occupant.id)) {
				anyHit = true;
				alreadyHit.add(occupant.id);
				resolveSinglePatternHit(state, tile, pat, occupant, bonuses, comboLength, events);
			}
		}
		if (!anyHit && (tile.pattern || []).length > 0) {
			events.push({
				type: "tile_whiff",
				tileId: tile.id,
				cell: hero.cell + hero.facing
			});
			events.push({
				type: "log",
				text: `💨 ${tile.name} promáchla do prázdného vzduchu.`
			});
		}
	}
	if (!tile.leapDistance && ((tile.dmg || 0) > 0 || bonuses.dmgBonus > 0 || (tile.pattern || []).some((pat) => (pat.dmg || 0) > 0))) {
		state.firstAttackUsed = true;
		if (empowerAtStart > 0 && ((tile.dmg || 0) > 0 || bonuses.dmgBonus > empowerAtStart) && hero.statuses?.empower) {
			const left = hero.statuses.empower - empowerAtStart;
			if (left > 0) hero.statuses.empower = left;
			else delete hero.statuses.empower;
		}
	}
	if (tile.selfFlipAfter && hero.hp > 0) {
		hero.facing = -hero.facing;
		events.push({
			type: "turn",
			entityId: hero.id,
			facing: hero.facing,
			free: true
		});
		events.push({
			type: "log",
			text: `🔄 Venca se po ráně otočil čelem ${hero.facing === 1 ? "vpravo ▶" : "vlevo ◀"}.`
		});
	}
	assertBoardInvariant(state);
}
function resolveSinglePatternHit(state, tile, pat, target, bonuses, comboLength, events) {
	const hero = state.hero;
	const hitDir = Math.sign(target.cell - hero.cell) || hero.facing;
	const isBackstab = Boolean(pat.backstabDmg && target.entityType === "enemy" && target.facing === hero.facing);
	const baseDmg = isBackstab ? pat.backstabDmg : pat.dmg || 0;
	if (isBackstab) events.push({
		type: "log",
		text: `🗡️ Zákeřný bod ze zálohy do zad postavy ${target.name} (${pat.backstabDmg} DMG)!`
	});
	const totalDmg = Math.max(0, baseDmg + bonuses.dmgBonus);
	let block = null;
	if (totalDmg > 0) {
		const mark = events.length;
		const dealt = applyDamage(state, target, totalDmg, {
			type: "direct",
			attackerId: hero.id,
			attackerCell: hero.cell,
			isComboHit: comboLength >= 2,
			reason: tile.id
		}, events);
		block = hitBlockFromEvents(events, mark);
		state.stats.damageDealt = (state.stats.damageDealt || 0) + dealt;
	}
	const combinedEffects = [...pat.effects || [], ...isBackstab && pat.backstabEffects ? pat.backstabEffects : []];
	for (const eff of combinedEffects) {
		if (target.hp <= 0) break;
		if (!effectSurvivesBlock(block, eff.type)) continue;
		switch (eff.type) {
			case "push": {
				const extraPush = state.comboResonanceBonusPush || 0;
				pushEntity(state, target, hitDir, (eff.distance || 1) + extraPush, events);
				break;
			}
			case "dispel_empower":
				if (target.statuses?.empower) {
					delete target.statuses.empower;
					events.push({
						type: "status_cleared",
						targetId: target.id,
						status: "empower"
					});
					events.push({
						type: "log",
						text: `🧄 ${target.name} ztratil Zesílení (česnek mu vzal sílu)!`
					});
				}
				break;
			case "pull":
				pullEntity(state, target, hero.cell, events);
				break;
			case "flip_target":
				if (target.entityType === "enemy") {
					target.facing = -target.facing;
					events.push({
						type: "turn",
						entityId: target.id,
						facing: target.facing
					});
					events.push({
						type: "log",
						text: `🔄 ${target.name} byl otočen čelem vzad!`
					});
				}
				break;
			case "stun":
				addStatus(target, "stun", eff.amount || 1, events);
				break;
			case "bleed":
				addStatus(target, "bleed", eff.amount || 2, events);
				break;
			case "confusion": addStatus(target, "confusion", eff.amount || 1, events);
		}
	}
}
function processReinforcements(state, events = []) {
	if (!state.reinforcements || state.reinforcements.length === 0) return events;
	for (const reinf of state.reinforcements) {
		if (reinf.spawned) continue;
		reinf.turnsRemaining = Math.max(0, reinf.turnsRemaining - 1);
		if (reinf.turnsRemaining <= 0) {
			const gateCell = reinf.gateCell === 0 ? 0 : (state.boardSize || 7) - 1;
			if (getEntityAt(state, gateCell)) {
				reinf.turnsRemaining = 1;
				events.push({
					type: "spawn_delayed",
					gateCell,
					enemyId: reinf.enemyId
				});
				events.push({
					type: "log",
					text: `🚪 Brána na poli ${gateCell + 1} je ucpaná! Posila se opožďuje o 1 tah.`
				});
			} else {
				reinf.spawned = true;
				const facing = gateCell === 0 ? 1 : -1;
				const enemy = createEnemyInstance(reinf.enemyId, gateCell, facing);
				state.enemies.push(enemy);
				triggerCellTerrainOnEnter(state, enemy, gateCell, events);
				if (enemy.hp > 0) telegraphEnemy(state, enemy);
				events.push({
					type: "spawn",
					enemy: structuredClone(enemy),
					cell: gateCell
				});
				events.push({
					type: "log",
					text: `🚪 Z brány na poli ${gateCell + 1} vtrhla na bojiště posila: ${enemy.name}!`
				});
			}
		}
	}
	assertBoardInvariant(state);
	return events;
}
function checkBattleOutcome(state, events = []) {
	if (state.hero.hp <= 0) {
		state.status = "lost";
		events.push({ type: "battle_lost" });
		return "lost";
	}
	const anyLivingEnemy = state.enemies.some((e) => e.hp > 0);
	const anyPendingReinf = state.reinforcements.some((r) => !r.spawned);
	if (!anyLivingEnemy && !anyPendingReinf) {
		state.status = "won";
		events.push({ type: "battle_won" });
		return "won";
	}
	return "playing";
}
function consumeHeroStun(state) {
	const hero = state?.hero;
	if (!hero || hero.hp <= 0 || !(hero.statuses?.stun > 0)) return null;
	hero.statuses.stun -= 1;
	if (hero.statuses.stun <= 0) delete hero.statuses.stun;
	return {
		ok: true,
		stunned: true,
		events: [{
			type: "hero_stun_skipped",
			targetId: hero.id,
			cell: hero.cell
		}, {
			type: "log",
			text: "🔔 Venca je omráčený a vynechává akci!"
		}]
	};
}
function endPlayerTurn(state, events = [], extraCdReduction = 0) {
	state.stats.turnsTaken = (state.stats.turnsTaken || 0) + 1;
	const cdDrop = 1 + extraCdReduction;
	for (const tile of state.hand) if (!tile.inQueue && tile.currentCooldown > 0) tile.currentCooldown = Math.max(0, tile.currentCooldown - cdDrop);
	if (state.hero && (state.hero.bumpCooldown || 0) > 0) state.hero.bumpCooldown = Math.max(0, state.hero.bumpCooldown - 1);
	if (checkBattleOutcome(state, events) !== "playing") return events;
	processEnemiesPhase(state, events);
	if (checkBattleOutcome(state, events) !== "playing") return events;
	const allLiving = [state.hero, ...state.enemies.filter((e) => e.hp > 0)];
	for (const ent of allLiving) if (ent.hp > 0 && hasStatus(ent, "bleed")) {
		events.push({
			type: "log",
			text: `🩸 ${ent.name} krvácí (1 DMG).`
		});
		applyDamage(state, ent, 1, { reason: "bleed" }, events);
		consumeStatus(ent, "bleed", 1);
	}
	if (checkBattleOutcome(state, events) !== "playing") return events;
	for (const ent of allLiving) if (ent.hp > 0 && ent.statuses?.shield > 0 && typeof ent.statuses.shieldTurnsLeft === "number") {
		if (ent.statuses.shieldTurnsLeft > 0) ent.statuses.shieldTurnsLeft -= 1;
		else {
			const expiredAmount = ent.statuses.shield;
			delete ent.statuses.shield;
			delete ent.statuses.shieldTurnsLeft;
			events.push({
				type: "shield_expired",
				targetId: ent.id,
				cell: ent.cell,
				amount: expiredAmount
			});
			events.push({
				type: "log",
				text: `🛡️ Štít postavy ${ent.name} (${expiredAmount} bodů) vyprchal na konci kola.`
			});
		}
	}
	for (let c = 0; c < state.terrain.length; c++) {
		const t = state.terrain[c];
		if (t && t.type === "garlic_cloud" && typeof t.duration === "number") {
			t.duration -= 1;
			if (t.duration <= 0) {
				state.terrain[c] = { type: "none" };
				events.push({
					type: "terrain_expire",
					terrainType: "garlic_cloud",
					cell: c
				});
			}
		}
	}
	processReinforcements(state, events);
	state.turn += 1;
	checkBattleOutcome(state, events);
	assertBoardInvariant(state);
	return events;
}
function executeHunterBump(state, hero, occupant, dir, nextCell, hunterId, events) {
	events.push({
		type: "hero_bump",
		hunterId,
		targetId: occupant.id,
		cell: nextCell,
		dir
	});
	if (hunterId === "honza") {
		hero.bumpCooldown = 3;
		pushEntity(state, occupant, dir, 1, events);
		const fromCell = hero.cell;
		hero.cell = nextCell;
		events.push({
			type: "move",
			entityId: hero.id,
			from: fromCell,
			to: nextCell,
			facing: hero.facing
		});
		triggerCellTerrainOnEnter(state, hero, nextCell, events);
		applyDamage(state, occupant, 2, {
			reason: "honza_bump",
			attackerId: hero.id
		}, events);
		events.push({
			type: "log",
			text: `🔨 Selský beran! Honza vrazil do ${occupant.name} plnou vahou (2 DMG), odhodil ho a obsadil jeho pole!`
		});
	} else if (hunterId === "dragoun") {
		hero.bumpCooldown = 3;
		applyDamage(state, occupant, 2, {
			reason: "dragoon_bump",
			attackerId: hero.id
		}, events);
		pushEntity(state, occupant, dir, 1, events);
		addStatus(occupant, "stun", 1, events);
		events.push({
			type: "log",
			text: `⚔️ Úder těžkým jílcem! Rittmeister Jaromír udeřil ${occupant.name} mosazným jílcem (2 DMG), odhodil ho a omráčil!`
		});
	} else if (hunterId === "zlodejka") {
		hero.bumpCooldown = 2;
		const fromCell = hero.cell;
		hero.cell = nextCell;
		occupant.cell = fromCell;
		occupant.facing = dir;
		events.push({
			type: "swap",
			heroFrom: fromCell,
			heroTo: nextCell,
			enemyId: occupant.id,
			enemyFrom: nextCell,
			enemyTo: fromCell
		});
		triggerCellTerrainOnEnter(state, hero, nextCell, events);
		triggerCellTerrainOnEnter(state, occupant, fromCell, events);
		events.push({
			type: "log",
			text: `🧤 Kapsářská záměna! Káča Pavučina podklouzla ${occupant.name} pod nohama, prohodila si s ním místo a otočila ho zády k sobě!`
		});
	} else {
		hero.bumpCooldown = 3;
		pushEntity(state, occupant, dir, 1, events);
		state.terrain[occupant.cell] = {
			type: "garlic_cloud",
			duration: 2
		};
		events.push({
			type: "terrain_spawn",
			terrainType: "garlic_cloud",
			cell: occupant.cell
		});
		events.push({
			type: "log",
			text: `🧄 Česnekové žduchnutí! Venca vrazil do ${occupant.name} česnekovým pupkem, odhodil ho a zamořil jeho pole česnekem!`
		});
	}
}
function playerStepNoEnd(state, direction) {
	const events = [];
	if (state.status !== "playing" || state.hero.hp <= 0) return {
		ok: false,
		events
	};
	const stunned = consumeHeroStun(state);
	if (stunned) return stunned;
	let dir = Math.sign(direction);
	if (!dir) return {
		ok: false,
		events
	};
	const hero = state.hero;
	const confused = hasStatus(hero, "confusion");
	if (confused) {
		dir = state.rng.nextFloat() < .5 ? -1 : 1;
		consumeStatus(hero, "confusion", 1);
		events.push({
			type: "log",
			text: `🌀 Venca má v hlavě motolici a vykročil náhodným směrem!`
		});
	}
	const nextCell = hero.cell + dir;
	if (!isValidCell(nextCell, state)) {
		if (confused) {
			events.push({
				type: "log",
				text: `🧱 Zmatený Venca narazil do hradní zdi a ztratil tah.`
			});
			return {
				ok: true,
				events
			};
		}
		events.push({
			type: "invalid_action",
			reason: "Tam už je hradní zeď!"
		});
		return {
			ok: false,
			events
		};
	}
	const occupant = getEntityAt(state, nextCell);
	if (!occupant) {
		const fromCell = hero.cell;
		hero.cell = nextCell;
		events.push({
			type: "move",
			entityId: hero.id,
			from: fromCell,
			to: nextCell,
			facing: hero.facing
		});
		events.push({
			type: "log",
			text: `👣 Venca popošel na pole ${nextCell + 1}.`
		});
		triggerCellTerrainOnEnter(state, hero, nextCell, events);
	} else if (occupant.entityType === "enemy") {
		if ((hero.bumpCooldown || 0) > 0) {
			events.push({
				type: "invalid_action",
				reason: `Manévr nárazu ještě chladne (zbývá ${hero.bumpCooldown} tahů)!`
			});
			return {
				ok: false,
				events
			};
		}
		const hunterId = hero.hunterId || hero.kind || "venca";
		executeHunterBump(state, hero, occupant, dir, nextCell, hunterId, events);
	} else if (confused) {
		events.push({
			type: "log",
			text: "🧱 Zmatený Venca se zamotal do překážky a ztratil tah."
		});
		return {
			ok: true,
			events
		};
	} else {
		events.push({
			type: "invalid_action",
			reason: "Pole je obsazené – krokem se přes nikoho nedá přeskočit!"
		});
		return {
			ok: false,
			events
		};
	}
	assertBoardInvariant(state);
	return {
		ok: true,
		events
	};
}
function playerTurnAroundNoEnd(state) {
	const events = [];
	if (state.status !== "playing" || state.hero.hp <= 0) return {
		ok: false,
		events
	};
	const stunned = consumeHeroStun(state);
	if (stunned) return stunned;
	const hero = state.hero;
	hero.facing = -hero.facing;
	const inGarlic = state.terrain[hero.cell]?.type === "garlic_cloud";
	events.push({
		type: "turn",
		entityId: hero.id,
		facing: hero.facing,
		free: inGarlic
	});
	if (state.talismans?.includes("holy_aspergillum") && state.turn - (state.lastTurnAspergillumTurn ?? -99) >= 2) {
		const frontOcc = getEntityAt(state, hero.cell + hero.facing);
		if (frontOcc && frontOcc.entityType === "enemy") {
			state.lastTurnAspergillumTurn = state.turn;
			applyDamage(state, frontOcc, 1, {
				type: "direct",
				attackerId: hero.id,
				attackerCell: hero.cell,
				reason: "aspergillum"
			}, events);
			events.push({
				type: "log",
				text: `💦 Farářův kropáč při otočce postříkal svěcenou vodou postavu ${frontOcc.name} (1 DMG)!`
			});
		}
	}
	if (inGarlic) {
		events.push({
			type: "log",
			text: `🧄 Otočení v Česnekovém oblaku je ZDARMA (nestojí tah)!`
		});
		return {
			ok: true,
			freeTurn: true,
			events
		};
	}
	events.push({
		type: "log",
		text: `🔄 Venca se otočil čelem ${hero.facing === 1 ? "vpravo ▶" : "vlevo ◀"}.`
	});
	return {
		ok: true,
		freeTurn: false,
		events
	};
}
function playerWaitNoEnd(state) {
	const events = [];
	if (state.status !== "playing" || state.hero.hp <= 0) return {
		ok: false,
		events
	};
	const stunned = consumeHeroStun(state);
	if (stunned) return stunned;
	const extraCd = state.talismans?.includes("pocket_watch") ? 1 : 0;
	events.push({
		type: "wait",
		entityId: state.hero.id
	});
	events.push({
		type: "log",
		text: extraCd > 0 ? `⏳ Venca vyčkává a natahuje dědovy cibule (cooldowny −2).` : `⏳ Venca si upravil klobouk a vyčkává (1 tah).`
	});
	return {
		ok: true,
		extraCd,
		events
	};
}
function playerEnqueueTileNoEnd(state, tileInstanceId) {
	const events = [];
	if (state.status !== "playing" || state.hero.hp <= 0) return {
		ok: false,
		events
	};
	const stunned = consumeHeroStun(state);
	if (stunned) return stunned;
	if (state.queue.length >= state.maxQueueSlots) {
		events.push({
			type: "invalid_action",
			reason: "Fronta akcí už je plná!"
		});
		return {
			ok: false,
			events
		};
	}
	const tile = state.hand.find((t) => t.instanceId === tileInstanceId);
	if (!tile) return {
		ok: false,
		events
	};
	if (tile.inQueue) {
		events.push({
			type: "invalid_action",
			reason: "Tato destička už je ve frontě!"
		});
		return {
			ok: false,
			events
		};
	}
	if (tile.currentCooldown > 0) {
		events.push({
			type: "invalid_action",
			reason: `Destička „${tile.name}“ se ještě nabíjí (${tile.currentCooldown} ${czechTurns(tile.currentCooldown)})!`
		});
		return {
			ok: false,
			events
		};
	}
	const isQuick = Boolean(tile.quick);
	tile.inQueue = true;
	state.queue.push(tile.instanceId);
	events.push({
		type: "queue_insert",
		instanceId: tile.instanceId,
		tileName: tile.name,
		slotIndex: state.queue.length - 1,
		isQuick
	});
	events.push({
		type: "log",
		text: isQuick ? `📥 Destička „${tile.name}“ vložena do fronty jako RYCHLOVKA (slot #${state.queue.length}). Nestojí žádný tah!` : `📥 Destička „${tile.name}“ vložena do fronty (slot #${state.queue.length}). Spotřebován 1 tah.`
	});
	return {
		ok: true,
		freeTurn: isQuick,
		events
	};
}
function playerRemoveFromQueue(state, slotIndexOrInstanceId) {
	const events = [];
	if (state.status !== "playing" || state.hero.hp <= 0) return {
		ok: false,
		events
	};
	let idx = -1;
	if (typeof slotIndexOrInstanceId === "number") idx = slotIndexOrInstanceId;
	else idx = state.queue.indexOf(slotIndexOrInstanceId);
	if (idx < 0 || idx >= state.queue.length) return {
		ok: false,
		events
	};
	const [removedId] = state.queue.splice(idx, 1);
	const tile = state.hand.find((t) => t.instanceId === removedId);
	if (tile) tile.inQueue = false;
	events.push({
		type: "queue_remove",
		instanceId: removedId,
		tileName: tile?.name || ""
	});
	events.push({
		type: "log",
		text: `📤 Destička „${tile?.name || removedId}“ vrácena z fronty do zásoby (zdarma).`
	});
	return {
		ok: true,
		freeTurn: true,
		events
	};
}
function playerReorderQueue(state, fromIndex, toIndex) {
	const events = [];
	if (state.status !== "playing" || state.hero.hp <= 0) return {
		ok: false,
		events
	};
	if (fromIndex === toIndex) return {
		ok: true,
		events
	};
	if (fromIndex < 0 || fromIndex >= state.queue.length) return {
		ok: false,
		events
	};
	if (toIndex < 0 || toIndex >= state.queue.length) return {
		ok: false,
		events
	};
	const [movedId] = state.queue.splice(fromIndex, 1);
	state.queue.splice(toIndex, 0, movedId);
	const tile = state.hand.find((t) => t.instanceId === movedId);
	events.push({
		type: "queue_reorder",
		fromIndex,
		toIndex,
		instanceId: movedId,
		tileName: tile?.name || ""
	});
	events.push({
		type: "log",
		text: `🔀 Přerovnáno kombo: „${tile?.name || "Destička"}“ přesunuta na pozici #${toIndex + 1} (bez ceny tahu).`
	});
	return {
		ok: true,
		freeTurn: true,
		events
	};
}
function executeQueuedTileStep(state, tileInstanceId, slotIndex, comboLength, nextTileInstanceId = null) {
	const events = [];
	const tile = state.hand.find((t) => t.instanceId === tileInstanceId);
	if (!tile) return events;
	if (slotIndex === 0) {
		for (const enemy of state.enemies) enemy.lastComboHitDir = null;
		triggerComboResonances(state, (state.queue || []).map((id) => state.hand.find((t) => t.instanceId === id)).filter(Boolean), events);
		if (comboLength >= 3 && state.talismans?.includes("notary_stamp")) {
			for (const enemy of state.enemies) if (enemy.hp > 0) applyDamage(state, enemy, 1, { reason: "notary_stamp" }, events);
			events.push({
				type: "log",
				text: `💮 Falešné obecní razítko: Plné kombo udělilo všem upírům 1 DMG z úředního výnosu!`
			});
		}
	}
	executeHeroTile(state, tile, slotIndex, comboLength, events);
	tile.inQueue = false;
	tile.currentCooldown = tile.maxCooldown;
	if (tile.resonance?.nextTileCdReduction && nextTileInstanceId) {
		const nextTile = state.hand.find((t) => t.instanceId === nextTileInstanceId);
		if (nextTile) {
			nextTile.pendingResonanceReduction = (nextTile.pendingResonanceReduction || 0) + tile.resonance.nextTileCdReduction;
			events.push({
				type: "resonance_triggered",
				fromTileId: tile.id,
				toTileId: nextTile.id,
				reduction: tile.resonance.nextTileCdReduction
			});
			events.push({
				type: "log",
				text: `✨ Rezonance! „${nextTile.name}“ bude mít po odehrání cooldown kratší o ${tile.resonance.nextTileCdReduction}!`
			});
		}
	}
	if (tile.pendingResonanceReduction) {
		tile.currentCooldown = Math.max(0, tile.currentCooldown - tile.pendingResonanceReduction);
		delete tile.pendingResonanceReduction;
	}
	return events;
}
function triggerHunterCombo3(state, hero, events) {
	const hunterId = hero.hunterId || hero.kind || "venca";
	events.push({
		type: "hunter_combo3",
		hunterId,
		heroId: hero.id
	});
	if (hunterId === "honza") {
		addStatus(hero, "shield", 6, events);
		events.push({
			type: "log",
			text: "💪 Selský hněv! Honza získal +6 Štít a mocnou rázovou vlnou zasáhl okolí za 4 DMG!"
		});
		for (const e of state.enemies) if (e.hp > 0 && Math.abs(e.cell - hero.cell) <= 1) applyDamage(state, e, 4, {
			reason: "honza_combo3",
			attackerId: hero.id
		}, events);
	} else if (hunterId === "dragoun") {
		events.push({
			type: "log",
			text: "💥 Kavaleristická salva! Rittmeister Jaromír vypálil kartáčovou salvu a zkrátil chladnutí destiček!"
		});
		for (const e of state.enemies) if (e.hp > 0 && Math.sign(e.cell - hero.cell) === hero.facing) applyDamage(state, e, 4, {
			reason: "dragoon_combo3",
			attackerId: hero.id
		}, events);
		for (const tile of state.hand) if (tile.currentCooldown > 0) tile.currentCooldown = Math.max(0, tile.currentCooldown - 1);
	} else if (hunterId === "zlodejka") {
		addStatus(hero, "shield", 4, events);
		hero.bumpCooldown = 0;
		events.push({
			type: "log",
			text: "💨 Pavučinový únik! Káča získala +4 Štít a okamžitě obnovila manévr záměny!"
		});
	} else {
		addStatus(hero, "shield", 4, events);
		events.push({
			type: "log",
			text: "🧄 Česneková aura! Venca získal +4 Štít a omámil okolní upíry česnekovým odérem!"
		});
		for (const e of state.enemies) if (e.hp > 0 && Math.abs(e.cell - hero.cell) === 1) addStatus(e, "confusion", 1, events);
	}
}
function finalizeQueueExecution(state, comboLength) {
	const events = [];
	state.queue = [];
	if (comboLength >= 2) state.stats.combosExecuted = (state.stats.combosExecuted || 0) + 1;
	if (comboLength >= 3 && state.hero && state.hero.hp > 0) triggerHunterCombo3(state, state.hero, events);
	delete state.comboResonanceBonusPush;
	applyMomentumIfLastEnemyKilled(state, comboLength, events);
	endPlayerTurn(state, events);
	return events;
}
/**
* Deep clone a battle state for deterministic sandboxed execution.
*/
function cloneBattleState(state) {
	if (!state) return null;
	const clone = {
		hero: JSON.parse(JSON.stringify(state.hero)),
		enemies: JSON.parse(JSON.stringify(state.enemies || [])),
		props: JSON.parse(JSON.stringify(state.props || [])),
		terrain: JSON.parse(JSON.stringify(state.terrain || [])),
		hand: JSON.parse(JSON.stringify(state.hand || [])),
		queue: [...state.queue || []],
		talismans: [...state.talismans || []],
		boardSize: state.boardSize,
		turn: state.turn,
		status: state.status,
		stats: JSON.parse(JSON.stringify(state.stats || {})),
		reinforcements: JSON.parse(JSON.stringify(state.reinforcements || [])),
		comboResonanceBonusPush: state.comboResonanceBonusPush || 0,
		lastTurnAspergillumTurn: state.lastTurnAspergillumTurn
	};
	if (state.rng) {
		clone.rng = createRng("sim_clone");
		if (typeof state.rng.getState === "function") clone.rng.setState(state.rng.getState());
	}
	return clone;
}
/**
* Simulates executing the hero's combo queue on a cloned state.
* Returns predicted positions, damage, lethal status, resonances, and post-combo enemy threats.
*/
function simulateComboImpact(state, optionalQueueIds = null) {
	if (!state || !state.hero || state.hero.hp <= 0) return {
		hero: null,
		entities: [],
		resonances: [],
		ghosts: [],
		threatsPostCombo: [],
		impactMap: {}
	};
	const simQueue = optionalQueueIds !== null ? [...optionalQueueIds] : [...state.queue || []];
	if (simQueue.length === 0) return {
		hero: {
			initialCell: state.hero.cell,
			finalCell: state.hero.cell,
			initialFacing: state.hero.facing,
			finalFacing: state.hero.facing,
			hpBefore: state.hero.hp,
			hpAfter: state.hero.hp,
			moved: false,
			isThreatenedPostCombo: false
		},
		entities: [],
		resonances: [],
		ghosts: [],
		threatsPostCombo: [],
		impactMap: {}
	};
	const simState = cloneBattleState(state);
	simState.queue = [...simQueue];
	const initialHero = {
		cell: simState.hero.cell,
		facing: simState.hero.facing,
		hp: simState.hero.hp
	};
	const initialEntities = /* @__PURE__ */ new Map();
	for (const e of simState.enemies) initialEntities.set(e.id, {
		id: e.id,
		name: e.name,
		entityType: "enemy",
		cell: e.cell,
		facing: e.facing,
		hp: e.hp,
		maxHp: e.maxHp
	});
	for (const p of simState.props) initialEntities.set(p.id, {
		id: p.id,
		name: p.name,
		entityType: "prop",
		cell: p.cell,
		facing: p.facing,
		hp: p.hp,
		maxHp: p.maxHp
	});
	const comboLength = simQueue.length;
	const events = [];
	for (let i = 0; i < comboLength; i++) {
		if (simState.hero.hp <= 0) break;
		const tileId = simQueue[i];
		const nextTileId = simQueue[i + 1] || null;
		const stepEvents = executeQueuedTileStep(simState, tileId, i, comboLength, nextTileId);
		events.push(...stepEvents);
	}
	const resonances = detectResonances(simQueue.map((id) => (state.hand || []).find((t) => t.instanceId === id)).filter(Boolean));
	const heroMoved = simState.hero.cell !== initialHero.cell || simState.hero.facing !== initialHero.facing;
	const entities = [];
	const ghosts = [];
	const impactMap = {};
	if (heroMoved && simState.hero.hp > 0) ghosts.push({
		id: simState.hero.id,
		name: simState.hero.name,
		entityType: "hero",
		cell: simState.hero.cell,
		facing: simState.hero.facing
	});
	for (const enemy of simState.enemies) {
		const init = initialEntities.get(enemy.id);
		if (!init) continue;
		const dmg = Math.max(0, init.hp - enemy.hp);
		const isLethal = enemy.hp <= 0 && init.hp > 0;
		const moved = enemy.cell !== init.cell || enemy.facing !== init.facing;
		const entData = {
			id: enemy.id,
			name: enemy.name,
			entityType: "enemy",
			initialCell: init.cell,
			finalCell: enemy.cell,
			initialFacing: init.facing,
			finalFacing: enemy.facing,
			hpBefore: init.hp,
			hpAfter: enemy.hp,
			maxHp: init.maxHp,
			dmgTaken: dmg,
			isLethal,
			moved
		};
		entities.push(entData);
		impactMap[enemy.id] = entData;
		if (moved && enemy.hp > 0) ghosts.push({
			id: enemy.id,
			name: enemy.name,
			entityType: "enemy",
			cell: enemy.cell,
			facing: enemy.facing
		});
	}
	for (const prop of simState.props) {
		const init = initialEntities.get(prop.id);
		if (!init) continue;
		const dmg = Math.max(0, init.hp - prop.hp);
		const isLethal = prop.hp <= 0 && init.hp > 0;
		const moved = prop.cell !== init.cell;
		const propData = {
			id: prop.id,
			name: prop.name,
			entityType: "prop",
			initialCell: init.cell,
			finalCell: prop.cell,
			initialFacing: init.facing,
			finalFacing: prop.facing,
			hpBefore: init.hp,
			hpAfter: prop.hp,
			maxHp: init.maxHp,
			dmgTaken: dmg,
			isLethal,
			moved
		};
		entities.push(propData);
		impactMap[prop.id] = propData;
		if (moved && prop.hp > 0) ghosts.push({
			id: prop.id,
			name: prop.name,
			entityType: "prop",
			cell: prop.cell,
			facing: prop.facing
		});
	}
	const threatsPostCombo = [];
	const finalHeroCell = simState.hero.cell;
	for (const enemy of simState.enemies) {
		if (enemy.hp <= 0) continue;
		let threatensHero = false;
		const actionQueue = enemy.actionQueue || [];
		if (actionQueue.length > 0) for (const tId of actionQueue) {
			const def = ENEMY_TILES[tId];
			if (def && canTileHitTarget(simState, enemy, def, enemy.cell, enemy.facing, finalHeroCell)) {
				threatensHero = true;
				break;
			}
		}
		else if (enemy.nextAction?.tileId) {
			const def = ENEMY_TILES[enemy.nextAction.tileId];
			if (def && canTileHitTarget(simState, enemy, def, enemy.cell, enemy.facing, finalHeroCell)) threatensHero = true;
		}
		if (threatensHero) {
			threatsPostCombo.push({
				enemyId: enemy.id,
				enemyName: enemy.name,
				cell: enemy.cell,
				targetCell: finalHeroCell
			});
			if (impactMap[enemy.id]) impactMap[enemy.id].threatensHeroPostCombo = true;
		}
	}
	return {
		hero: {
			initialCell: initialHero.cell,
			finalCell: simState.hero.cell,
			initialFacing: initialHero.facing,
			finalFacing: simState.hero.facing,
			hpBefore: initialHero.hp,
			hpAfter: simState.hero.hp,
			moved: heroMoved,
			isThreatenedPostCombo: threatsPostCombo.length > 0,
			threatsPostCombo
		},
		entities,
		resonances,
		ghosts,
		threatsPostCombo,
		impactMap,
		events
	};
}
function computeEnemyTileTargetCells(state, enemy, tileDef, bonusCtx = null) {
	if (!enemy || enemy.hp <= 0 || !tileDef || !tileDef.pattern) return [];
	const results = [];
	const originCell = tileDef.lungeForward ? resolveLungeLanding(state, enemy, enemy.cell, enemy.facing, tileDef.lungeForward) : enemy.cell;
	const garlicPenalty = state.terrain[originCell]?.type === "garlic_cloud" ? 1 : 0;
	const empowerBonus = getStatusAmount(enemy, "empower");
	const synergy = bonusCtx && typeof bonusCtx.synergy === "number" ? bonusCtx.synergy : !enemy.lordSynergy && state.enemies?.some((e) => e.hp > 0 && e.lordSynergy && e.id !== enemy.id) ? 1 : 0;
	const occAt = (cell) => bonusCtx?.occupancy ? bonusCtx.occupancy.get(cell) || null : getEntityAt(state, cell);
	if (tileDef.projectileRange) for (const pat of tileDef.pattern) {
		const targetCell = originCell + enemy.facing * pat.offset;
		if (!isValidCell(targetCell, state)) continue;
		const dmg = Math.max(0, (pat.dmg || 0) + empowerBonus - garlicPenalty + synergy);
		results.push({
			cell: targetCell,
			dmg,
			effects: pat.effects || [],
			direction: enemy.facing,
			projectile: true
		});
		const occupant = occAt(targetCell);
		if (occupant && occupant.id !== enemy.id) break;
	}
	else for (const pat of tileDef.pattern) {
		const targetCell = originCell + enemy.facing * pat.offset;
		if (!isValidCell(targetCell, state)) continue;
		const dmg = Math.max(0, (pat.dmg || 0) + empowerBonus - garlicPenalty + synergy);
		results.push({
			cell: targetCell,
			dmg,
			effects: pat.effects || [],
			direction: enemy.facing,
			projectile: false
		});
	}
	return results;
}
function computeBoardThreats(state, hoveredEnemyId = null) {
	const cells = Array.from({ length: state.boardSize || 7 }, (_, idx) => ({
		cell: idx,
		totalDmg: 0,
		imminentDmg: 0,
		isArmedRed: false,
		isInspectReach: false,
		sources: [],
		inspectSources: [],
		nextTileSources: []
	}));
	const sortedEnemies = getSortedEnemiesByInitiative(state);
	const occupancy = /* @__PURE__ */ new Map();
	const put = (ent) => {
		if (ent && ent.hp > 0) occupancy.set(ent.cell, ent);
	};
	put(state.hero);
	for (const ent of state.enemies || []) put(ent);
	for (const prop of state.props || []) put(prop);
	const synergyIds = (state.enemies || []).filter((e) => e.hp > 0 && e.lordSynergy).map((e) => e.id);
	sortedEnemies.forEach((enemy, index) => {
		const initiativeRank = index + 1;
		const synergy = synergyIds.some((id) => id !== enemy.id) ? 1 : 0;
		const bonusCtx = {
			occupancy,
			synergy
		};
		const isArmed = enemy.queueState === "ARMED_RED";
		const liveQueue = enemy.actionQueue || [];
		const paintQueue = (tileIds, { armed = false, imminent = false } = {}) => {
			let simCell = enemy.cell;
			let simEmpower = getStatusAmount(enemy, "empower");
			for (const tileId of tileIds) {
				const tileDef = ENEMY_TILES[tileId];
				if (!tileDef) continue;
				if (tileDef.selfEffect?.type === "empower") simEmpower += tileDef.selfEffect.amount || 1;
				const hits = computeEnemyTileTargetCells(state, {
					...enemy,
					cell: simCell,
					statuses: {
						...enemy.statuses || {},
						empower: simEmpower
					}
				}, tileDef, bonusCtx);
				for (const hit of hits) {
					const cellInfo = cells[hit.cell];
					cellInfo.totalDmg += hit.dmg;
					if (armed || imminent) cellInfo.imminentDmg += hit.dmg;
					if (armed) cellInfo.isArmedRed = true;
					cellInfo.sources.push({
						enemyId: enemy.id,
						enemyName: enemy.name,
						initiativeRank,
						tileId,
						tileName: tileDef.name,
						isArmedRed: armed,
						countdown: armed ? 1 : enemy.countdown,
						dmg: hit.dmg,
						direction: hit.direction,
						effects: hit.effects
					});
				}
				if (tileDef.lungeForward) simCell = resolveLungeLanding(state, {
					...enemy,
					cell: simCell
				}, simCell, enemy.facing, tileDef.lungeForward);
				if ((tileDef.pattern || []).some((p) => (p.dmg || 0) > 0)) simEmpower = 0;
			}
		};
		if (isArmed && liveQueue.length > 0) paintQueue(liveQueue, {
			armed: true,
			imminent: true
		});
		else if (liveQueue.length > 0) paintQueue(liveQueue, {
			armed: false,
			imminent: false
		});
		if (hoveredEnemyId && enemy.id === hoveredEnemyId) {
			const inspectTileIds = (enemy.actionPool || []).map((p) => p.tileId);
			for (const tId of inspectTileIds) {
				const tDef = ENEMY_TILES[tId];
				if (tDef) {
					const hits = computeEnemyTileTargetCells(state, enemy, tDef, bonusCtx);
					for (const hit of hits) {
						cells[hit.cell].isInspectReach = true;
						cells[hit.cell].inspectSources.push({
							enemyId: enemy.id,
							enemyName: enemy.name,
							tileId: tId,
							tileName: tDef.name,
							dmg: hit.dmg,
							direction: hit.direction,
							effects: hit.effects
						});
					}
				}
			}
		}
	});
	return cells;
}
function computePlayerQueuePreview(state, hoveredTileInstanceId = null) {
	if (!state.hero || state.hero.hp <= 0) return {
		ghostCell: 0,
		ghostFacing: 1,
		targetedCells: [],
		hoveredCells: []
	};
	let simCell = state.hero.cell;
	let simFacing = state.hero.facing;
	const sim = {
		firstAttackUsed: Boolean(state.firstAttackUsed),
		empower: getStatusAmount(state.hero, "empower")
	};
	const targetedCells = [];
	const queueTiles = state.queue.map((id) => state.hand.find((t) => t.instanceId === id)).filter(Boolean);
	queueTiles.forEach((tile, slotIndex) => {
		const stepHits = simulateTileAt(state, tile, simCell, simFacing, slotIndex === 0, slotIndex >= 2, slotIndex, sim);
		simCell = stepHits.newHeroCell;
		simFacing = stepHits.newHeroFacing;
		targetedCells.push(...stepHits.hits);
	});
	const hoveredCells = [];
	if (hoveredTileInstanceId) {
		const hoveredTile = state.hand.find((t) => t.instanceId === hoveredTileInstanceId);
		if (hoveredTile) {
			const slotIndex = queueTiles.length;
			const isOpener = slotIndex === 0;
			const isFinisher = slotIndex >= 2;
			const hoverSim = { ...sim };
			const simHover = simulateTileAt(state, hoveredTile, simCell, simFacing, isOpener, isFinisher, slotIndex, hoverSim);
			hoveredCells.push(...simHover.hits);
		}
	}
	return {
		ghostCell: simCell,
		ghostFacing: simFacing,
		heroMoved: simCell !== state.hero.cell || simFacing !== state.hero.facing,
		targetedCells,
		hoveredCells
	};
}
function simulateTileAt(state, tile, heroCell, heroFacing, _isOpener, _isFinisher, slotIndex, sim = {}) {
	let newHeroCell = heroCell;
	let newHeroFacing = heroFacing;
	const hits = [];
	const empowerAtStart = sim.empower || 0;
	const dmgBonus = tileDamageBonus(state, tile, slotIndex, sim);
	if (!sim.deadIds) sim.deadIds = /* @__PURE__ */ new Set();
	if (tile.leapDistance) {
		const landing = landingCellForLeap(state, heroCell, heroFacing, tile.leapDistance);
		newHeroCell = landing;
		hits.push({
			cell: landing,
			dmg: 0,
			isMove: true,
			slotIndex,
			tileName: tile.name,
			effects: []
		});
	} else if (tile.projectileRange) for (const pat of tile.pattern || []) {
		const c = heroCell + heroFacing * pat.offset;
		if (!isValidCell(c, state)) continue;
		const dmg = (pat.dmg || 0) + dmgBonus;
		const occupant = occupantAt(state, c, sim);
		hits.push({
			cell: c,
			dmg,
			isMove: false,
			slotIndex,
			tileName: tile.name,
			wouldKill: Boolean(occupant && occupant.hp <= dmg),
			effects: pat.effects || []
		});
		if (occupant) {
			if (occupant.hp <= dmg) sim.deadIds.add(occupant.id);
			break;
		}
	}
	else for (const pat of tile.pattern || []) {
		const c = heroCell + heroFacing * pat.offset;
		if (!isValidCell(c, state)) continue;
		const dmg = (pat.dmg || 0) + dmgBonus;
		const occupant = occupantAt(state, c, sim);
		hits.push({
			cell: c,
			dmg,
			isMove: Boolean(pat.isMoveTarget),
			slotIndex,
			tileName: tile.name,
			wouldKill: Boolean(occupant && occupant.hp <= dmg),
			effects: pat.effects || []
		});
		if (occupant && occupant.hp <= dmg) sim.deadIds.add(occupant.id);
	}
	if (!tile.leapDistance && ((tile.dmg || 0) > 0 || dmgBonus > 0 || (tile.pattern || []).some((pat) => (pat.dmg || 0) > 0))) {
		sim.firstAttackUsed = true;
		if (empowerAtStart > 0 && ((tile.dmg || 0) > 0 || dmgBonus > empowerAtStart)) sim.empower = Math.max(0, (sim.empower || 0) - empowerAtStart);
	}
	if (tile.selfEffect?.type === "empower") sim.empower = (sim.empower || 0) + (tile.selfEffect.amount || 1);
	if (tile.selfFlipAfter) newHeroFacing = -newHeroFacing;
	return {
		newHeroCell,
		newHeroFacing,
		hits
	};
}
function tileDamageBonus(state, tile, slotIndex, sim) {
	let dmgBonus = 0;
	if ((slotIndex === 2 || slotIndex === 3) && state.talismans?.includes("oak_splinter")) dmgBonus += 1;
	if (!sim.firstAttackUsed && tile.type !== "move" && state.talismans?.includes("brass_lantern")) dmgBonus += 1;
	if ((sim.empower || 0) > 0 && (tile.dmg > 0 || dmgBonus > 0)) dmgBonus += sim.empower;
	return dmgBonus;
}
function occupantAt(state, cell, sim) {
	const occ = getEntityAt(state, cell);
	if (!occ || occ.entityType === "hero") return null;
	if (sim?.deadIds?.has(occ.id)) return null;
	return occ;
}
function landingCellForLeap(state, fromCell, facing, distance) {
	const landing = findNearestEmptyCell(state, fromCell + facing * distance, facing, state.hero?.id);
	return landing === null ? fromCell : landing;
}
function getEnemyActionIconSvg(type) {
	switch (type) {
		case "krok": return `
        <svg viewBox="0 0 24 24" class="enemy-intent-svg icon-krok" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <ellipse cx="9" cy="14" rx="4" ry="7" transform="rotate(-15 9 14)" fill="#fef08a" fill-opacity="0.5"/>
          <path d="M14 8l5-5m0 0h-4m4 0v4"/>
        </svg>
      `;
		case "úder": return `
        <svg viewBox="0 0 24 24" class="enemy-intent-svg icon-uder" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14.5 17.5L3 6l3-3 11.5 11.5z" fill="#fca5a5" fill-opacity="0.4"/>
          <line x1="13" y1="19" x2="19" y2="13"/>
          <line x1="16" y1="16" x2="21" y2="21"/>
        </svg>
      `;
		case "střela": return `
        <svg viewBox="0 0 24 24" class="enemy-intent-svg icon-strela" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="8" fill="#fed7aa" fill-opacity="0.4"/>
          <circle cx="12" cy="12" r="3" fill="#ea580c"/>
          <line x1="12" y1="2" x2="12" y2="6"/>
          <line x1="12" y1="18" x2="12" y2="22"/>
          <line x1="2" y1="12" x2="6" y2="12"/>
          <line x1="18" y1="12" x2="22" y2="12"/>
        </svg>
      `;
		case "nápřah": return `
        <svg viewBox="0 0 24 24" class="enemy-intent-svg icon-naprah" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#fbbf24" fill-opacity="0.5"/>
        </svg>
      `;
		case "štít": return `
        <svg viewBox="0 0 24 24" class="enemy-intent-svg icon-stit" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#bfdbfe" fill-opacity="0.6"/>
          <line x1="12" y1="2" x2="12" y2="22"/>
        </svg>
      `;
		case "léčení": return `
        <svg viewBox="0 0 24 24" class="enemy-intent-svg icon-leceni" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="9" fill="#bbf7d0" fill-opacity="0.5"/>
          <line x1="12" y1="7" x2="12" y2="17" stroke="#16a34a" stroke-width="3"/>
          <line x1="7" y1="12" x2="17" y2="12" stroke="#16a34a" stroke-width="3"/>
        </svg>
      `;
		case "přivolání": return `
        <svg viewBox="0 0 24 24" class="enemy-intent-svg icon-privolani" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 11s4-4 10-1c6-3 10 1 10 1s-2 5-6 6c-2 0-3-2-4-2s-2 2-4 2c-4-1-6-6-6-6z" fill="#ddd6fe" fill-opacity="0.6"/>
        </svg>
      `;
		case "otočení": return `
        <svg viewBox="0 0 24 24" class="enemy-intent-svg icon-otoceni" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 2v6h-6"/>
          <path d="M21.5 8A10 10 0 1 0 22 13"/>
        </svg>
      `;
		default: return `
        <svg viewBox="0 0 24 24" class="enemy-intent-svg" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="8"/>
        </svg>
      `;
	}
}
function getActionTileBadge(tileDef) {
	if (tileDef.type === "krok") return tileDef.retreatIfClose ? "Ústup ⬅" : "Krok ➔";
	if (tileDef.type === "otočení") return "Otočení 🔄";
	if (tileDef.type === "nápřah") return "Nápřah (+1)";
	if (tileDef.type === "štít") return "+1 Štít";
	if (tileDef.type === "léčení") return `Léčení +${tileDef.healAmount || 2}`;
	if (tileDef.type === "přivolání") return "Přivolání 🦇";
	const firstPat = tileDef.pattern?.[0];
	const dmg = firstPat?.dmg ?? 1;
	const isPush = firstPat?.effects?.some((e) => e.type === "push");
	const isBleed = firstPat?.effects?.some((e) => e.type === "bleed");
	let suffix = `${dmg} DMG`;
	if (isPush) suffix += " (Push)";
	if (isBleed) suffix += " (Krvácení)";
	if (tileDef.type === "střela") return `Střela ${suffix}`;
	return `Úder ${suffix}`;
}
function renderEnemyIntentStripHtml(enemy, initiativeRank) {
	if (!enemy || enemy.hp <= 0) return "";
	const isArmedRed = enemy.queueState === "ARMED_RED";
	const actionQueue = enemy.actionQueue || [];
	const nextAction = enemy.nextAction;
	let positioningBadgeHtml = "";
	if (!isArmedRed && nextAction) {
		if (nextAction.type === "step") {
			const isRight = nextAction.dir === 1;
			positioningBadgeHtml = `
        <div class="intent-positioning-banner intent-step-indicator" title="Příští tah: Popojde o 1 pole ${isRight ? "vpravo ➔" : "vlevo ◀"}">
          <span class="intent-action-arrow">${isRight ? "➔" : "◀"}</span>
          <span class="intent-action-text">${nextAction.reason === "retreat" ? "Ústup" : "Krok"}</span>
        </div>
      `;
		} else if (nextAction.type === "turn") positioningBadgeHtml = `
        <div class="intent-positioning-banner intent-turn-indicator" title="Příští tah: Otočí se čelem ${nextAction.dir === 1 ? "vpravo ▶" : "vlevo ◀"}">
          <span class="intent-action-arrow">🔄</span>
          <span class="intent-action-text">Otočení</span>
        </div>
      `;
	}
	const maxSlots = 3;
	const slotsHtml = [];
	for (let slotIdx = 0; slotIdx < maxSlots; slotIdx++) {
		const tileId = actionQueue[slotIdx];
		if (tileId) {
			const tileDef = ENEMY_TILES[tileId] || {
				name: tileId,
				type: "úder"
			};
			const iconSvg = getEnemyActionIconSvg(tileDef.type);
			const badgeText = getActionTileBadge(tileDef);
			if (isArmedRed) slotsHtml.push(`
          <div class="intent-slot intent-slot-armed-red animate-pulse-red"
               title="[PŘIPRAVENO] Slot #${slotIdx + 1}: ${tileDef.name} (${badgeText}) — po tvé další akci vystřelí!">
            <div class="intent-slot-icon-box">${iconSvg}</div>
            <span class="intent-slot-name">${badgeText}</span>
          </div>
        `);
			else slotsHtml.push(`
          <div class="intent-slot intent-slot-queuing-gray"
               title="[QUEUING #ŠEDÁ] Slot #${slotIdx + 1}: ${tileDef.name} (${badgeText}) - Nepřítel ještě nabíjí kombo (nevystřelí)">
            <div class="intent-slot-icon-box">${iconSvg}</div>
            <span class="intent-slot-name">${badgeText}</span>
          </div>
        `);
		} else if (!isArmedRed && nextAction?.type === "queue_tile" && slotIdx === actionQueue.length) {
			const incomingDef = ENEMY_TILES[nextAction.tileId] || {
				name: nextAction.tileId,
				type: "úder"
			};
			const incomingIcon = getEnemyActionIconSvg(incomingDef.type);
			const incomingBadge = getActionTileBadge(incomingDef);
			slotsHtml.push(`
        <div class="intent-slot intent-slot-planning"
             title="Chystá se přidat do komba: ${incomingDef.name} (${incomingBadge})">
          <div class="intent-slot-icon-box">${incomingIcon}</div>
          <span class="intent-slot-name">${incomingBadge}</span>
        </div>
      `);
		} else slotsHtml.push(`
        <div class="intent-slot intent-slot-empty" title="Prázdný slot komba #${slotIdx + 1}">
          <span class="intent-slot-empty-dot">·</span>
        </div>
      `);
	}
	return `
    <div class="enemy-intent-column ${isArmedRed ? "intent-col-armed-red" : "intent-col-queuing"}"
         aria-label="Záměr nepřítele ${enemy.name}">
      <div class="enemy-intent-header">
        <span class="enemy-initiative-tag" title="Iniciativa pořadí tahu zleva doprava: #${initiativeRank}">
          #${initiativeRank}
        </span>
        ${isArmedRed ? `<span class="intent-armed-tag" title="Po tvé další normální akci odpálí frontu. Žádná blesková reakce.">⏳ 1 AKCE</span>` : `<span class="intent-queuing-tag">⚪ NABÍJÍ</span>`}
      </div>

      ${positioningBadgeHtml}

      <div class="intent-bar-horizontal">
        ${slotsHtml.join("")}
      </div>
    </div>
  `;
}
function buildEnemyTooltipHtml(enemy, initiativeRank) {
	const isArmedRed = enemy.queueState === "ARMED_RED";
	const actionQueue = enemy.actionQueue || [];
	const poolHtml = (enemy.actionPool || []).map((item) => {
		const def = ENEMY_TILES[item.tileId] || {
			name: item.tileId,
			type: "úder",
			description: ""
		};
		const isReady = item.currentCooldown === 0;
		const isQueued = actionQueue.includes(item.tileId);
		const pat = def.pattern?.[0];
		const dmg = pat?.dmg ?? (def.type === "léčení" ? def.healAmount : 0);
		const effList = [];
		if (def.type === "střela") effList.push(`Dosah ${def.projectileRange || 3}`);
		if (def.lungeForward) effList.push(`Výpad ${def.lungeForward}`);
		if (def.lifesteal) effList.push(`Vysátí ${def.lifesteal}`);
		for (const eff of pat?.effects || []) {
			if (eff.type === "push") effList.push(`Push ${eff.distance || 1}`);
			if (eff.type === "bleed") effList.push(`Krvácení`);
			if (eff.type === "stun") effList.push(`Omráčení`);
			if (eff.type === "confusion") effList.push(`Zmatení`);
		}
		const cdTag = isQueued ? `<span class="tt-tag tt-tag-queued">Ve frontě</span>` : isReady ? `<span class="tt-tag tt-tag-ready">Připraveno (0 CD)</span>` : `<span class="tt-tag tt-tag-cd">CD: ${item.currentCooldown}/${item.maxCooldown}</span>`;
		return `
        <div class="tt-pool-item">
          <div class="tt-pool-header">
            <strong>${def.name}</strong> (${def.type}) · ${dmg > 0 ? `${dmg} DMG` : "Podpora"}
            ${cdTag}
          </div>
          ${effList.length > 0 ? `<div class="tt-pool-details">${effList.join(" · ")}</div>` : ""}
          <div class="tt-pool-desc">${def.description}</div>
        </div>
      `;
	}).join("");
	let stateDesc = "";
	if (isArmedRed) stateDesc = `
      <div class="tt-status-box tt-status-armed">
        🚨 <strong>STAV: ARMED_RED (ZAMČENO K ODPALU)</strong><br/>
        Po tvé nejbližší normální akci odpálí frontu (${actionQueue.length} ${actionQueue.length === 1 ? "destička" : actionQueue.length >= 2 && actionQueue.length <= 4 ? "destičky" : "destiček"}). Do té doby se neotočí ani neuhne.
      </div>
    `;
	else if (actionQueue.length > 0) stateDesc = `
      <div class="tt-status-box tt-status-queuing">
        ⚪ <strong>STAV: QUEUING_GRAY (NABÍJÍ KOMBO)</strong><br/>
        Ve frontě má ${actionQueue.length}/${enemy.comboCapacity || 2} destiček. V nadcházejícím tahu ještě NEVYSTŘELÍ.
      </div>
    `;
	else stateDesc = `
      <div class="tt-status-box tt-status-empty">
        ⚪ <strong>STAV: EMPTY (POZICOVÁNÍ)</strong><br/>
        Fronta je prázdná. Chystá se na manévr nebo vložení první destičky.
      </div>
    `;
	let nextActionDesc = "";
	if (enemy.nextAction) {
		if (enemy.nextAction.type === "turn") nextActionDesc = `Příští tah: Otočení směrem ${enemy.nextAction.dir === 1 ? "vpravo ▶" : "vlevo ◀"}.`;
		else if (enemy.nextAction.type === "step") nextActionDesc = `Příští tah: Krok o 1 pole ${enemy.nextAction.dir === 1 ? "doprava ➔" : "doleva ◀"}.`;
		else if (enemy.nextAction.type === "queue_tile") nextActionDesc = `Příští tah: Vloží do fronty „${ENEMY_TILES[enemy.nextAction.tileId]?.name || enemy.nextAction.tileId}“.`;
		else if (enemy.nextAction.type === "execute_queue") nextActionDesc = `Příští tah: GARANTOVANÝ ODPAL CELÉHO KOMBA!`;
	}
	return `
    <div class="tt-title">
      ${enemy.givenName || enemy.name}
      ${enemy.epithet ? `<span class="tt-epithet"> · ${enemy.epithet}</span>` : ""}
      <span class="tt-sub">(Iniciativa #${initiativeRank})</span>
    </div>
    <div class="tt-stat-row">
      ❤️ Zdraví: <strong>${enemy.hp}/${enemy.maxHp} HP</strong> · Směr: <strong>${enemy.facing === 1 ? "Vpravo ▶" : "Vlevo ◀"}</strong> · Archetyp: <strong>${enemy.archetype || "základní"}</strong>
    </div>
    ${enemy.frontShield ? "<div class=\"tt-next-intent-line\">🛡️ Zepředu krytý štítem. Úder musí přijít zezadu, odhozením nebo po otočení.</div>" : ""}
    ${enemy.mirrorCloak ? "<div class=\"tt-next-intent-line\">🪞 Zrcadlový plášť: druhý zásah komba ze stejné strany ho prohodí se sudem nebo netopýrem.</div>" : ""}
    ${enemy.bloodThorns ? "<div class=\"tt-next-intent-line\">🌹 Krajkové trny: kdo ji sekne, dostane 1 DMG zpět.</div>" : ""}
    ${enemy.lordSynergy ? "<div class=\"tt-next-intent-line\">👑 Upíří nadvláda: dokud Hrabě stojí, ostatní upíři dávají +1 DMG.</div>" : ""}

    ${stateDesc}
    ${nextActionDesc ? `<div class="tt-next-intent-line"><strong>Záměr:</strong> ${nextActionDesc}</div>` : ""}

    <hr class="tt-divider" />
    <div class="tt-section-title">🎒 ZÁSOBA AKCÍ (ACTION POOL):</div>
    <div class="tt-pool-list">
      ${poolHtml}
    </div>

    ${enemy.flavor ? `<div class="tt-flavor">${enemy.flavor}</div>` : ""}
  `;
}
function renderCellThreatAndPreviewHtml(cellIndex, cellThreat, queuePreview, state, simPreview = null) {
	const parts = [];
	if (cellThreat && cellThreat.isArmedRed) {
		const totalDmg = cellThreat.totalDmg;
		const arrows = Array.from(new Set(cellThreat.sources.filter((s) => s.isArmedRed).map((s) => s.direction === 1 ? "▶" : "◀"))).join("");
		const effectIcons = collectEffectIcons(cellThreat.sources.filter((s) => s.isArmedRed));
		parts.push(`
      <div class="ground-crosshair-badge animate-pulse-crosshair"
           title="Zatelegrafovaná zóna dopadu! ARMED nepřítel zde v příštím tahu odpálí útok za ${totalDmg} DMG!">
        <div class="crosshair-header">
          <span class="crosshair-target-icon">🎯</span>
          <span class="crosshair-tag">CÍL ÚTOKU</span>
        </div>
        <div class="crosshair-dmg-row">
          <span class="crosshair-dir">${arrows}</span>
          <span class="crosshair-dmg-val">💥 ${totalDmg} DMG</span>
          ${effectIcons ? `<span class="crosshair-eff">${effectIcons}</span>` : ""}
        </div>
      </div>
    `);
	} else if (cellThreat && cellThreat.sources.length > 0) {
		const totalDmg = cellThreat.totalDmg;
		const isImminent = cellThreat.sources.some((s) => s.countdown <= 1);
		const arrows = Array.from(new Set(cellThreat.sources.map((s) => s.direction === 1 ? "▶" : "◀"))).join("");
		const effectIcons = collectEffectIcons(cellThreat.sources);
		parts.push(`
      <div class="threat-badge ${isImminent ? "threat-badge-imminent" : "threat-badge-warning"}"
           title="Ohrožené pole! Součet DMG: ${totalDmg}">
        <span class="threat-dir">${arrows}</span>
        <span class="threat-dmg">💥 ${totalDmg} DMG</span>
        ${effectIcons ? `<span class="threat-eff">${effectIcons}</span>` : ""}
      </div>
    `);
	}
	if (cellThreat && cellThreat.isInspectReach) {
		const inspectCount = cellThreat.inspectSources?.length || 1;
		parts.push(`
      <div class="inspect-reach-badge" title="Pole v dosahu útoků inspectovaného nepřítele (${inspectCount} schopností)">
        <span>👁️ Dosah útoku</span>
      </div>
    `);
	}
	if (queuePreview) {
		const cellHits = queuePreview.targetedCells.filter((h) => h.cell === cellIndex);
		if (cellHits.length > 0) {
			const sumDmg = cellHits.reduce((a, b) => a + (b.dmg || 0), 0);
			const anyKill = cellHits.some((h) => h.wouldKill);
			const isMoveOnly = cellHits.every((h) => h.isMove);
			parts.push(`
        <div class="preview-badge preview-badge-queue">
          ${isMoveOnly ? "🤸 Dopad" : `⚔️ Kombo: ${sumDmg} DMG`}
          ${anyKill ? "<span class=\"preview-kill\">💀 SMRT</span>" : ""}
        </div>
      `);
		}
		const hoverHits = queuePreview.hoveredCells.filter((h) => h.cell === cellIndex);
		if (hoverHits.length > 0) {
			const hoverDmg = hoverHits.reduce((a, b) => a + (b.dmg || 0), 0);
			const hoverKill = hoverHits.some((h) => h.wouldKill);
			const isMove = hoverHits.every((h) => h.isMove);
			parts.push(`
        <div class="preview-badge preview-badge-hover">
          ${isMove ? "👣 Doskok" : `🎯 Dosah: ${hoverDmg} DMG`}
          ${hoverKill ? " 💀" : ""}
        </div>
      `);
		}
		if (queuePreview.heroMoved && queuePreview.ghostCell === cellIndex && state.hero.cell !== cellIndex) parts.push(`
        <div class="hero-ghost-marker" title="Sem se Venca přesune po odehrání fronty">
          👻 Venca (${queuePreview.ghostFacing === 1 ? "▶" : "◀"})
        </div>
      `);
	}
	if (simPreview?.ghosts) {
		for (const g of simPreview.ghosts) if (g.cell === cellIndex) parts.push(`
          <div class="ghost-silhouette ghost-${g.entityType}" title="Sem se ${g.name} přesune po odpalu komba">
            <span class="ghost-icon">👻</span>
            <span class="ghost-name">${g.name} (${g.facing === 1 ? "▶" : "◀"})</span>
          </div>
        `);
	}
	return parts.join("");
}
function collectEffectIcons(sources) {
	const icons = /* @__PURE__ */ new Set();
	for (const s of sources) for (const eff of s.effects || []) {
		if (eff.type === "push") icons.add("💨Push");
		if (eff.type === "bleed") icons.add("🩸");
		if (eff.type === "stun") icons.add("🔔");
		if (eff.type === "confusion") icons.add("🌀");
	}
	return Array.from(icons).join(" ");
}
var audioCtx = null;
var soundEnabled = true;
function getCtx() {
	if (!soundEnabled) return null;
	if (!audioCtx && typeof window !== "undefined") {
		const AudioContextClass = window.AudioContext || window.webkitAudioContext;
		if (AudioContextClass) audioCtx = new AudioContextClass();
	}
	if (audioCtx && audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
	return audioCtx;
}
function setSoundEnabled(val) {
	soundEnabled = Boolean(val);
}
function playTone(freq, type = "triangle", duration = .12, gainVal = .12, slideTo = null) {
	const ctx = getCtx();
	if (!ctx) return;
	try {
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = type;
		osc.frequency.setValueAtTime(freq, ctx.currentTime);
		if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, ctx.currentTime + duration);
		gain.gain.setValueAtTime(gainVal, ctx.currentTime);
		gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + duration);
		osc.connect(gain);
		gain.connect(ctx.destination);
		osc.start();
		osc.stop(ctx.currentTime + duration);
	} catch {}
}
var SFX = {
	step() {
		playTone(150, "triangle", .08, .1, 95);
	},
	swap() {
		playTone(240, "sine", .14, .14, 420);
	},
	turn() {
		playTone(210, "sine", .06, .08, 260);
	},
	queueInsert() {
		playTone(330, "triangle", .09, .11, 440);
	},
	queueRemove() {
		playTone(280, "triangle", .08, .09, 190);
	},
	hit() {
		playTone(110, "sawtooth", .15, .18, 55);
	},
	collision() {
		playTone(85, "square", .18, .2, 42);
	},
	friendlyFire() {
		playTone(392, "triangle", .12, .15, 523);
		setTimeout(() => playTone(523, "triangle", .18, .15, 659), 90);
	},
	bell() {
		playTone(587, "sine", .32, .16, 580);
	},
	death() {
		playTone(160, "sawtooth", .24, .15, 48);
	},
	victory() {
		playTone(330, "triangle", .12, .14);
		setTimeout(() => playTone(440, "triangle", .12, .14), 110);
		setTimeout(() => playTone(554, "triangle", .24, .16), 220);
	},
	defeat() {
		playTone(220, "sawtooth", .2, .14, 160);
		setTimeout(() => playTone(160, "sawtooth", .35, .14, 95), 180);
	}
};
var PALETTE = {
	red: [
		"#fff1f2",
		"#fecaca",
		"#f87171",
		"#ef4444",
		"#dc2626",
		"#b91c1c",
		"#7f1d1d",
		"#450a0a"
	],
	blue: [
		"#f0f9ff",
		"#bae6fd",
		"#38bdf8",
		"#2563eb",
		"#1d4ed8",
		"#6d28d9",
		"#312e81",
		"#1e1b4b"
	],
	green: [
		"#f7fee7",
		"#d9f99d",
		"#a3e635",
		"#65a30d",
		"#4d7c0f",
		"#166534",
		"#14532d",
		"#052e16"
	]
};
var MAX_ALIVE = 260;
var canvas = null;
var ctx = null;
var particles = [];
var raf = 0;
var lastTs = 0;
var stageRect = null;
function reducedMotion() {
	return typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function rand(a, b) {
	return a + Math.random() * (b - a);
}
function colorFor(ichor, kind) {
	const colors = PALETTE[ichor] || PALETTE.red;
	if (kind === "spark" || kind === "mist") return colors[Math.random() * 3 | 0];
	if (kind === "glob" || kind === "bubble") return colors[3 + (Math.random() * (colors.length - 3) | 0)];
	return colors[1 + (Math.random() * (colors.length - 2) | 0)];
}
function rollKind(ichor, style) {
	const r = Math.random();
	if (style === "drip") return r < .62 ? "drop" : r < .84 ? "streak" : "glob";
	if (ichor === "blue") {
		if (r < .2) return "mist";
		if (r < .36) return "spark";
		if (r < .62) return "streak";
		if (r < .84) return "drop";
		return "glob";
	}
	if (ichor === "green") {
		if (r < .32) return "glob";
		if (r < .48) return "bubble";
		if (r < .68) return "drop";
		if (r < .86) return "streak";
		return "mist";
	}
	if (r < .38) return "streak";
	if (r < .7) return "drop";
	if (r < .86) return "glob";
	return "mist";
}
function spraySpec(reason, attackerCell, cell, fatal) {
	if (reason === "death") return {
		angle: -Math.PI / 2,
		spread: Math.PI,
		speed: [2.2, 6.4],
		style: "gush",
		countMul: 1.35
	};
	if (reason === "bleed") return {
		angle: Math.PI / 2,
		spread: .55,
		speed: [.6, 2.2],
		style: "drip",
		countMul: .45
	};
	if (reason === "spikes") return {
		angle: -Math.PI / 2,
		spread: .95,
		speed: [2.4, 5.8],
		style: "fountain",
		countMul: 1
	};
	if (reason === "wall_collision") return {
		angle: cell <= 0 ? 0 : cell >= 6 ? Math.PI : -Math.PI / 2,
		spread: .9,
		speed: [1.8, 4.6],
		style: "burst",
		countMul: .85
	};
	if (typeof attackerCell === "number" && attackerCell !== cell) {
		const away = Math.sign(cell - attackerCell) || 1;
		return {
			angle: Math.atan2(-.55, away),
			spread: .95,
			speed: [2.2, 6.2],
			style: "burst",
			countMul: fatal ? 1.25 : 1
		};
	}
	return {
		angle: -Math.PI / 2,
		spread: 1.35,
		speed: [1.6, 5.2],
		style: "burst",
		countMul: 1
	};
}
function ensureCanvas() {
	if (typeof document === "undefined") return false;
	if (canvas && canvas.isConnected && ctx) return true;
	canvas = document.createElement("canvas");
	canvas.className = "blood-fx-layer";
	canvas.setAttribute("aria-hidden", "true");
	document.body.appendChild(canvas);
	ctx = canvas.getContext("2d");
	return Boolean(ctx);
}
function syncCanvas() {
	if (!canvas || !ctx) return;
	const stage = document.getElementById("battlefield-stage");
	if (stage) stageRect = stage.getBoundingClientRect();
	if (!stageRect || stageRect.width < 2) return;
	const dpr = Math.min(window.devicePixelRatio || 1, 2);
	const w = Math.max(1, Math.round(stageRect.width));
	const h = Math.max(1, Math.round(stageRect.height));
	if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
		canvas.width = Math.round(w * dpr);
		canvas.height = Math.round(h * dpr);
	}
	canvas.style.left = `${stageRect.left}px`;
	canvas.style.top = `${stageRect.top}px`;
	canvas.style.width = `${w}px`;
	canvas.style.height = `${h}px`;
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function hitPoint(container, cellIdx) {
	const stage = container?.querySelector?.("#battlefield-stage") || document.getElementById("battlefield-stage");
	const cell = container?.querySelector?.(`.board-cell[data-cell-index="${cellIdx}"]`);
	if (!stage || !cell) return null;
	const sprite = cell.querySelector(".entity-sprite-img");
	const sr = stage.getBoundingClientRect();
	const r = (sprite || cell).getBoundingClientRect();
	stageRect = sr;
	return {
		x: r.left - sr.left + r.width * .5,
		y: r.top - sr.top + r.height * (sprite ? .46 : .58),
		ground: Math.min(sr.height - 6, r.bottom - sr.top - 2)
	};
}
function pushParticle(p) {
	particles.push(p);
	if (particles.length > MAX_ALIVE) particles.splice(0, particles.length - MAX_ALIVE);
}
function emitWave(origin, ichor, amount, spec, lifeScale) {
	const quiet = reducedMotion();
	let count = Math.round((26 + Math.min(40, (amount || 1) * 8)) * spec.countMul);
	if (quiet) count = Math.min(14, count);
	count = Math.max(spec.style === "drip" ? 10 : 18, Math.min(count, quiet ? 14 : 72));
	for (let i = 0; i < count; i++) {
		const kind = rollKind(ichor, spec.style);
		const ang = spec.angle + rand(-spec.spread, spec.spread);
		const speed = rand(spec.speed[0], spec.speed[1]) * (kind === "mist" ? .55 : kind === "glob" ? .72 : 1);
		const maxLife = (kind === "mist" ? rand(420, 780) : kind === "glob" ? rand(520, 900) : rand(380, 760)) * lifeScale;
		const grav = kind === "bubble" ? -.035 : kind === "mist" ? ichor === "blue" ? -.012 : .02 : kind === "spark" ? .02 : ichor === "green" ? .16 : .12;
		pushParticle({
			x: origin.x + rand(-10, 10),
			y: origin.y + rand(-16, 12),
			vx: Math.cos(ang) * speed,
			vy: Math.sin(ang) * speed,
			grav,
			drag: kind === "mist" ? .985 : .992,
			r: kind === "glob" ? rand(3.4, 6.2) : kind === "mist" ? rand(2.2, 5.5) : kind === "spark" ? rand(.8, 1.6) : rand(1.4, 3.1),
			life: maxLife,
			maxLife,
			color: colorFor(ichor, kind),
			kind,
			ground: origin.ground,
			rot: rand(0, Math.PI),
			split: kind === "glob"
		});
	}
}
function stepParticles(dt) {
	const next = [];
	const spawned = [];
	for (const p of particles) {
		p.life -= dt;
		if (p.life <= 0) continue;
		if (p.kind !== "stain") {
			p.vy += p.grav * (dt / 16.67);
			p.vx *= p.drag;
			p.vy *= p.drag;
			p.x += p.vx * (dt / 16.67);
			p.y += p.vy * (dt / 16.67);
			if (p.split && p.life < p.maxLife * .55) {
				p.split = false;
				for (let k = 0; k < 3; k++) spawned.push({
					x: p.x,
					y: p.y,
					vx: p.vx * .4 + rand(-1.4, 1.4),
					vy: p.vy * .3 + rand(-1.6, .4),
					grav: .14,
					drag: .99,
					r: p.r * .45,
					life: p.life * .7,
					maxLife: p.life * .7,
					color: p.color,
					kind: "drop",
					ground: p.ground,
					rot: 0,
					split: false
				});
			}
			if (p.kind !== "mist" && p.kind !== "bubble" && p.kind !== "spark" && p.y >= p.ground && p.vy > .2) {
				p.kind = "stain";
				p.y = p.ground;
				p.vx *= .12;
				p.vy = 0;
				p.grav = 0;
				p.r *= 1.85;
				p.life = Math.min(p.life, 640);
				p.maxLife = Math.max(p.maxLife, p.life);
			}
		} else p.r *= .998;
		next.push(p);
	}
	particles = next.concat(spawned);
	if (particles.length > MAX_ALIVE) particles.splice(0, particles.length - MAX_ALIVE);
}
function drawParticles() {
	if (!ctx || !canvas) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (const p of particles) {
		const fade = Math.max(0, Math.min(1, p.life / p.maxLife));
		const alpha = p.kind === "mist" ? fade * .38 : p.kind === "stain" ? fade * .8 : fade;
		ctx.globalAlpha = alpha;
		ctx.fillStyle = p.color;
		if (p.kind === "streak" || p.kind === "spark") {
			ctx.save();
			ctx.translate(p.x, p.y);
			ctx.rotate(Math.atan2(p.vy, p.vx));
			const len = p.kind === "spark" ? p.r * 3.2 : p.r * 4.6;
			ctx.fillRect(-len * .5, -p.r * .38, len, Math.max(1, p.r * .76));
			ctx.restore();
		} else if (p.kind === "bubble") {
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
			ctx.lineWidth = 1.5;
			ctx.strokeStyle = p.color;
			ctx.stroke();
			ctx.globalAlpha = alpha * .22;
			ctx.fill();
		} else if (p.kind === "stain") {
			ctx.beginPath();
			ctx.ellipse(p.x, p.y, p.r * 1.7, p.r * .62, p.rot, 0, Math.PI * 2);
			ctx.fill();
		} else {
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
			ctx.fill();
			ctx.globalAlpha = alpha * .65;
			ctx.fillStyle = "rgba(255,255,255,0.7)";
			ctx.beginPath();
			ctx.arc(p.x - p.r * .28, p.y - p.r * .32, Math.max(.4, p.r * .28), 0, Math.PI * 2);
			ctx.fill();
		}
	}
	ctx.globalAlpha = 1;
}
function frame(ts) {
	const dt = Math.min(34, lastTs ? ts - lastTs : 16.67);
	lastTs = ts;
	syncCanvas();
	stepParticles(dt);
	drawParticles();
	if (particles.length > 0) raf = requestAnimationFrame(frame);
	else {
		raf = 0;
		lastTs = 0;
		if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}
function kick() {
	if (!raf) raf = requestAnimationFrame(frame);
}
function spawnBloodBurst(container, opts = {}) {
	const ichor = opts.ichor;
	if (!ichor || !PALETTE[ichor]) return;
	if (!ensureCanvas()) return;
	const origin = hitPoint(container, opts.cell);
	if (!origin) return;
	syncCanvas();
	const spec = spraySpec(opts.reason, opts.attackerCell, opts.cell, opts.fatal);
	const speed = opts.animSpeed > 0 ? opts.animSpeed : 1;
	const lifeScale = reducedMotion() ? .45 : 1 / Math.min(speed, 2.4);
	emitWave(origin, ichor, opts.amount || 1, spec, lifeScale);
	if (!reducedMotion() && spec.style !== "drip") window.setTimeout(() => {
		if (!document.getElementById("battlefield-stage")) return;
		emitWave(origin, ichor, Math.max(1, (opts.amount || 1) * .65), spec, lifeScale);
		kick();
	}, 70);
	kick();
}
function sleep(ms, speedMultiplier = 1) {
	if (speedMultiplier === 0) return Promise.resolve();
	const effectiveMs = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? Math.min(80, ms) : Math.round(ms / (speedMultiplier || 1));
	return new Promise((resolve) => setTimeout(resolve, effectiveMs));
}
var HERO_POSES = {
	idle: ["/assets/characters/venca_idle.png"],
	attack: ["/assets/characters/venca_attack.png"],
	hurt: ["/assets/characters/venca_hurt.png"],
	dead: ["/assets/characters/venca_dead.png"]
};
var PAINTED_SCENES = {
	tutorial_1: {
		className: "scene-yard",
		imgClass: "yard-bg",
		image: "/assets/terrain/naves-yard.jpg",
		edges: [
			1.4,
			8.6,
			15.8,
			26.6,
			35.4,
			44.2,
			56.6,
			68.2,
			80.4,
			93.4
		]
	},
	act1_battle_2: {
		className: "scene-farm",
		imgClass: "farm-bg",
		image: "/assets/terrain/naves-dvur.jpg",
		edges: [
			3,
			15,
			23.8,
			34.4,
			44.8,
			55,
			65.6,
			76.1,
			86,
			96.2
		]
	}
};
var heroPoseTimer = null;
var heroPoseLocked = false;
var heroPoseEpoch = 0;
function heroSprite(container) {
	return container?.querySelector?.(".hero-sprite") || null;
}
function isHeroEntity(container, entityId) {
	if (!entityId || !container) return false;
	if (entityId === "hero_venca") return true;
	const el = container.querySelector(`#entity-dom-${entityId}`);
	return Boolean(el && el.classList.contains("entity-hero"));
}
function clearHeroPoseTimer() {
	if (heroPoseTimer) {
		clearTimeout(heroPoseTimer);
		heroPoseTimer = null;
	}
}
function isHeroDead(container) {
	const img = heroSprite(container);
	return Boolean(img && (img.dataset.pose === "dead" || img.getAttribute("src")?.includes("venca_dead")));
}
function setHeroPose(container, pose, frame = 0) {
	const img = heroSprite(container);
	if (!img) return;
	if (isHeroDead(container) && pose !== "dead") return;
	const frames = HERO_POSES[pose] || HERO_POSES.idle;
	const next = frames[frame % frames.length];
	img.dataset.pose = pose;
	if (img.getAttribute("src") !== next) img.src = next;
}
function startHeroIdle(container, force = false) {
	if (isHeroDead(container)) return;
	if (!force && heroPoseLocked) return;
	heroPoseEpoch += 1;
	clearHeroPoseTimer();
	heroPoseLocked = false;
	setHeroPose(container, "idle", 0);
}
function scheduleHeroIdle(container, delayMs, animSpeed = 1) {
	if (isHeroDead(container)) return;
	clearHeroPoseTimer();
	const effectiveDelay = animSpeed === 0 ? 0 : Math.round(delayMs / (animSpeed || 1));
	heroPoseTimer = setTimeout(() => {
		if (!isHeroDead(container)) {
			heroPoseLocked = false;
			setHeroPose(container, "idle", 0);
		}
	}, effectiveDelay);
}
async function playHeroPose(container, pose, ms, animSpeed) {
	const frames = HERO_POSES[pose] || HERO_POSES.idle;
	if (!heroSprite(container) || isHeroDead(container)) return;
	const epoch = heroPoseEpoch;
	heroPoseLocked = true;
	clearHeroPoseTimer();
	const steps = Math.max(1, frames.length);
	const slice = Math.max(90, Math.round(ms / steps));
	for (let i = 0; i < steps; i++) {
		if (epoch !== heroPoseEpoch || !heroSprite(container) || isHeroDead(container)) return;
		setHeroPose(container, pose, i);
		await sleep(slice, animSpeed);
	}
	if (!isHeroDead(container)) scheduleHeroIdle(container, 80, animSpeed);
}
function renderBattleBoard(container, state, uiState = {}, callbacks = {}) {
	if (!container || !state) return;
	const hoveredEnemyId = uiState.hoveredEnemyId || null;
	const hoveredTileId = uiState.hoveredTileId || null;
	const simPreview = Boolean(uiState.comboPreviewActive || uiState.hoveredExecute || typeof uiState.hoveredQueueSlot === "number" && uiState.hoveredQueueSlot >= 0) && (state.queue || []).length > 0 ? simulateComboImpact(state) : null;
	const threats = computeBoardThreats(state, hoveredEnemyId);
	const queuePreview = computePlayerQueuePreview(state, hoveredTileId);
	const sortedEnemies = getSortedEnemiesByInitiative(state);
	const initiativeMap = /* @__PURE__ */ new Map();
	sortedEnemies.forEach((e, i) => initiativeMap.set(e.id, i + 1));
	const boardSize = state.boardSize || 7;
	const painted = PAINTED_SCENES[state.encounterId] || null;
	const isPaintedValid = Boolean(painted && painted.edges && painted.edges.length === boardSize + 1);
	const paintedEdges = isPaintedValid ? painted.edges : null;
	const leftGateReinf = state.reinforcements.find((r) => !r.spawned && r.gateCell === 0);
	const rightGateReinf = state.reinforcements.find((r) => !r.spawned && r.gateCell === boardSize - 1);
	const queueSlotsHtml = Array.from({ length: state.maxQueueSlots }, (_, slotIdx) => {
		const instanceId = state.queue[slotIdx];
		const tile = instanceId ? state.hand.find((t) => t.instanceId === instanceId) : null;
		const roleLabel = `Slot #${slotIdx + 1}`;
		if (!tile) return `
        <div class="queue-slot queue-slot-empty" data-slot-index="${slotIdx}">
          <span class="queue-slot-role">${roleLabel}</span>
          <span class="queue-slot-placeholder">Prázdný slot</span>
        </div>
      `;
		const iconUrl = getAssetUrl(tile.icon, tile.name);
		return `
      <div class="queue-slot queue-slot-filled"
           draggable="true"
           data-slot-index="${slotIdx}"
           data-instance-id="${tile.instanceId}"
           title="Destička ve frontě komba. Přetažením myší změníš pořadí. Kliknutím na ✖ vrátíš do zásoby.">
        <div class="queue-slot-header">
          <span class="queue-slot-role">${roleLabel}</span>
          <div class="queue-reorder-arrows">
            ${slotIdx > 0 ? `<button type="button" class="btn-slot-move btn-slot-move-left" data-move-slot="${slotIdx}" data-move-dir="-1" title="Posunout doleva">◀</button>` : ""}
            ${slotIdx < state.queue.length - 1 ? `<button type="button" class="btn-slot-move btn-slot-move-right" data-move-slot="${slotIdx}" data-move-dir="1" title="Posunout doprava">▶</button>` : ""}
          </div>
          <button type="button" class="btn-slot-remove" data-remove-queue-slot="${slotIdx}" title="Vrátit destičku do zásoby (zdarma)">✖</button>
        </div>
        <div class="queue-slot-content">
          <img src="${iconUrl}" alt="${tile.name}" class="queue-slot-icon" referrerpolicy="no-referrer" />
          <span class="queue-slot-name">${tile.name}</span>
          <span class="drag-handle" title="Uchop myší a přetáhni">⠿</span>
        </div>
      </div>
    `;
	}).join("");
	const cellsHtml = Array.from({ length: boardSize }, (_, cellIdx) => {
		const terrainObj = state.terrain[cellIdx] || { type: "none" };
		const terrainDef = TERRAIN_TYPES[terrainObj.type] || TERRAIN_TYPES.none;
		const cellThreat = threats[cellIdx];
		const isThreatened = cellThreat && cellThreat.sources.length > 0;
		const isArmedRed = Boolean(cellThreat && cellThreat.isArmedRed);
		const isInspectReach = Boolean(cellThreat && cellThreat.isInspectReach);
		const isImminent = cellThreat && cellThreat.sources.some((s) => s.countdown <= 1);
		const isNextThreat = cellThreat && cellThreat.nextTileSources.length > 0;
		const isPlayerTargeted = queuePreview.targetedCells.some((h) => h.cell === cellIdx) || queuePreview.hoveredCells.some((h) => h.cell === cellIdx);
		const entity = livingEntityAt(state, cellIdx) || corpseAt(state, cellIdx);
		const gateHtml = renderGateBannerHtml(cellIdx, leftGateReinf, rightGateReinf, boardSize);
		const overlayHtml = renderCellThreatAndPreviewHtml(cellIdx, cellThreat, queuePreview, state, simPreview);
		const impact = simPreview?.impactMap?.[entity?.id] || null;
		const entityHtml = entity ? renderEntityOnCellHtml(entity, initiativeMap.get(entity.id), impact) : "";
		const yardStyle = paintedEdges ? ` style="left:${paintedEdges[cellIdx]}%;width:${(paintedEdges[cellIdx + 1] - paintedEdges[cellIdx]).toFixed(3)}%;"` : "";
		return `
      <div class="board-cell
                  terrain-${terrainObj.type}
                  ${isArmedRed ? "cell-armed-red-targeted" : ""}
                  ${isInspectReach ? "cell-inspect-range" : ""}
                  ${isThreatened ? "cell-threatened" : ""}
                  ${isImminent ? "cell-threatened-imminent" : ""}
                  ${isNextThreat ? "cell-threatened-next" : ""}
                  ${isPlayerTargeted ? "cell-player-targeted" : ""}"
           data-cell-index="${cellIdx}"
           data-terrain-type="${terrainObj.type}"${yardStyle}>
        <div class="cell-index-label"><span class="cell-index-word">Pole </span>${cellIdx + 1}</div>
        ${gateHtml}
        <div class="cell-overlay-zone">
          ${overlayHtml}
        </div>
        <div class="cell-entity-stage" id="cell-stage-${cellIdx}">
          ${entityHtml}
        </div>
        <div class="cell-floor-stone">
          <span class="terrain-badge terrain-badge-${terrainObj.type}">
            ${getTerrainFloorLabel(terrainObj, terrainDef)}
          </span>
        </div>
      </div>
    `;
	}).join("");
	const tutorialHintHtml = state.isTutorial ? `<div class="tutorial-banner">
         <span class="tutorial-icon">🎓</span>
         <span>${STRINGS.tutorialHints[(state.turn - 1) % STRINGS.tutorialHints.length]}</span>
       </div>` : "";
	const activeResonances = detectResonances((state.queue || []).map((id) => (state.hand || []).find((t) => t.instanceId === id)).filter(Boolean));
	container.innerHTML = `
    ${tutorialHintHtml}
    <div class="hero-queue-panel">
      <div class="hero-queue-label">
        <strong>⚡ Fronta komba Venci Česnekáče</strong>
        <span class="hero-queue-hint">(Fronta akcí · 1 tah vložení · Odpálení okamžité!)</span>
      </div>
      ${activeResonances.length > 0 ? `<div class="hero-queue-resonances">${activeResonances.map((r) => `<span class="queue-resonance-pill" title="${r.description}">✨ ${r.icon} <strong>${r.name}</strong></span>`).join("")}</div>` : ""}
      <div class="hero-queue-slots">
        ${queueSlotsHtml}
      </div>
    </div>

    <div class="battlefield-1d-stage ${isPaintedValid ? painted.className : ""}" id="battlefield-stage"${isPaintedValid ? "" : ` style="--board-size: ${boardSize}; grid-template-columns: repeat(${boardSize}, minmax(0, 1fr));"`}>
      ${isPaintedValid ? `<div class="yard-scene"><img class="${painted.imgClass}" alt="" src="${painted.image}" /></div>` : ""}
      ${cellsHtml}
    </div>
  `;
	let draggedSlotIdx = null;
	container.querySelectorAll(".queue-slot").forEach((slotEl) => {
		const slotIdx = Number(slotEl.getAttribute("data-slot-index"));
		slotEl.addEventListener("mouseenter", () => {
			callbacks.onHoverQueueSlot?.(slotIdx);
		});
		slotEl.addEventListener("mouseleave", () => {
			callbacks.onHoverQueueSlot?.(null);
		});
		slotEl.addEventListener("dragstart", (e) => {
			if (e.target instanceof Element && e.target.closest("button")) {
				e.preventDefault();
				return;
			}
			if (!slotEl.classList.contains("queue-slot-filled")) {
				e.preventDefault();
				return;
			}
			draggedSlotIdx = slotIdx;
			e.dataTransfer.setData("text/plain", String(slotIdx));
			e.dataTransfer.effectAllowed = "move";
			slotEl.classList.add("is-dragging");
		});
		slotEl.addEventListener("dragend", () => {
			draggedSlotIdx = null;
			slotEl.classList.remove("is-dragging");
			container.querySelectorAll(".queue-slot").forEach((s) => s.classList.remove("drag-over-target"));
		});
		slotEl.addEventListener("dragover", (e) => {
			e.preventDefault();
			e.dataTransfer.dropEffect = "move";
			if (draggedSlotIdx !== null && draggedSlotIdx !== slotIdx && slotIdx < state.queue.length) slotEl.classList.add("drag-over-target");
		});
		slotEl.addEventListener("dragleave", () => {
			slotEl.classList.remove("drag-over-target");
		});
		slotEl.addEventListener("drop", (e) => {
			e.preventDefault();
			slotEl.classList.remove("drag-over-target");
			const fromIdx = draggedSlotIdx !== null ? draggedSlotIdx : Number(e.dataTransfer.getData("text/plain"));
			if (Number.isInteger(fromIdx) && fromIdx >= 0 && fromIdx !== slotIdx && slotIdx < state.queue.length) callbacks.onReorderQueue?.(fromIdx, slotIdx);
		});
	});
	container.querySelectorAll("[data-move-slot]").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.stopPropagation();
			const currentIdx = Number(btn.getAttribute("data-move-slot"));
			const targetIdx = currentIdx + Number(btn.getAttribute("data-move-dir"));
			if (targetIdx >= 0 && targetIdx < state.queue.length) callbacks.onReorderQueue?.(currentIdx, targetIdx);
		});
	});
	container.querySelectorAll("[data-remove-queue-slot]").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.stopPropagation();
			const slotIdx = Number(btn.getAttribute("data-remove-queue-slot"));
			callbacks.onRemoveQueueSlot?.(slotIdx);
		});
	});
	container.querySelectorAll("[data-enemy-id]").forEach((el) => {
		const enemyId = el.getAttribute("data-enemy-id");
		const enemy = state.enemies.find((e) => e.id === enemyId);
		if (!enemy) return;
		const rank = initiativeMap.get(enemy.id) || 1;
		el.addEventListener("mouseenter", (ev) => {
			callbacks.onHoverEnemy?.(enemyId);
			showTooltip(buildEnemyTooltipHtml(enemy, rank), ev.clientX, ev.clientY);
		});
		el.addEventListener("mouseleave", () => {
			callbacks.onHoverEnemy?.(null);
			hideTooltip();
		});
	});
	container.querySelectorAll("[data-terrain-type]").forEach((cellEl) => {
		const tType = cellEl.getAttribute("data-terrain-type");
		if (!tType || tType === "none") return;
		const def = TERRAIN_TYPES[tType];
		if (!def) return;
		const floorEl = cellEl.querySelector(".cell-floor-stone");
		floorEl?.addEventListener("mouseenter", (ev) => {
			showTooltip(`<div class="tt-title">${def.name}</div><div class="tt-desc">${def.description}</div>`, ev.clientX, ev.clientY);
		});
		floorEl?.addEventListener("mouseleave", hideTooltip);
	});
	if (state.hero && state.hero.hp > 0) startHeroIdle(container);
	else setHeroPose(container, "dead", 0);
}
function renderGateBannerHtml(cellIdx, leftReinf, rightReinf, boardSize = 7) {
	if (cellIdx === 0) return `
      <div class="gate-pillar gate-left">
        <span class="gate-title">🚪 Levá brána</span>
        ${leftReinf ? `<span class="gate-reinf-warning">Posila za ${leftReinf.turnsRemaining} ${czechTurns(leftReinf.turnsRemaining)}!</span>` : ""}
      </div>
    `;
	if (cellIdx === boardSize - 1) return `
      <div class="gate-pillar gate-right">
        <span class="gate-title">🚪 Pravá brána</span>
        ${rightReinf ? `<span class="gate-reinf-warning">Posila za ${rightReinf.turnsRemaining} ${czechTurns(rightReinf.turnsRemaining)}!</span>` : ""}
      </div>
    `;
	return "";
}
function renderEntityOnCellHtml(entity, initiativeRank = 1, impact = null) {
	const givenName = entity.givenName || entity.name;
	const epithet = entity.epithet || "";
	const bodyScale = entity.bodyScale || (entity.flying ? "flyer" : entity.entityType === "hero" ? "hero" : entity.isBoss ? "boss" : "human");
	const heroClass = entity.entityType === "hero" ? "hero-sprite" : "";
	const gait = gaitFor(entity);
	const spriteUrl = getAssetUrl(entity.hp <= 0 && entity.entityType === "hero" ? "hero.dead" : entity.sprite, entity.name);
	const hpPercent = Math.max(0, Math.min(100, Math.round(entity.hp / entity.maxHp * 100)));
	let previewHpBarHtml = "";
	let previewSkullHtml = "";
	let postComboThreatHtml = "";
	if (impact) {
		if (impact.dmgTaken > 0) {
			const remainingHp = Math.max(0, entity.hp - impact.dmgTaken);
			const remainingPercent = Math.max(0, Math.min(100, Math.round(remainingHp / entity.maxHp * 100)));
			previewHpBarHtml = `<div class="entity-hp-bar-preview" style="left: ${remainingPercent}%; width: ${hpPercent - remainingPercent}%;" title="Předpokládané zranění: -${impact.dmgTaken} DMG"></div>`;
		}
		if (impact.isLethal) previewSkullHtml = `<span class="preview-skull-badge" title="Tento cíl bude v průběhu komba zlikvidován! (0 HP)">💀</span>`;
		if (impact.threatensHeroPostCombo) postComboThreatHtml = `<div class="enemy-threat-warning-post-combo">⚠️ OHROŽUJE VENCU!</div>`;
	}
	const statusesHtml = Object.entries(entity.statuses || {}).filter(([, val]) => val > 0).map(([statusId, val]) => {
		const st = STATUSES[statusId];
		if (!st) return "";
		return `<span class="status-chip" title="${st.name}: ${st.description}">${st.badge}${val > 1 ? val : ""}</span>`;
	}).join("");
	const intentStripHtml = entity.entityType === "enemy" ? renderEnemyIntentStripHtml(entity, initiativeRank) : "";
	const facingArrow = entity.entityType === "prop" ? "🛢️" : entity.facing === 1 ? "<span class=\"facing-indicator facing-right\" title=\"Směr pohledu: Vpravo\">▶</span>" : "<span class=\"facing-indicator facing-left\" title=\"Směr pohledu: Vlevo\">◀</span>";
	const scaleXVal = entity.entityType === "prop" ? 1 : entity.facing === -1 ? -1 : 1;
	return `
    <div class="entity-container entity-${entity.entityType}"
         id="entity-dom-${entity.id}"
         ${entity.entityType === "enemy" ? `data-enemy-id="${entity.id}"` : ""}>
      ${intentStripHtml}

      <div class="entity-hud-top">
        <div class="entity-nameplate" title="${entity.name}">
          ${epithet ? `<div class="entity-epithet">${epithet}</div>` : ""}
          <div class="entity-name-row">
            ${entity.facing === -1 && entity.entityType !== "prop" ? facingArrow : ""}
            <span class="entity-given">${givenName}</span>
            ${entity.facing === 1 && entity.entityType !== "prop" ? facingArrow : ""}
          </div>
        </div>
        <div class="entity-hp-bar-outer" title="Zdraví: ${entity.hp}/${entity.maxHp} HP">
          <div class="entity-hp-bar-inner hp-${entity.entityType}" style="width: ${hpPercent}%"></div>
          ${previewHpBarHtml}
          <span class="entity-hp-text">${impact && impact.dmgTaken > 0 ? `${Math.max(0, entity.hp - impact.dmgTaken)}/${entity.maxHp}` : `${entity.hp}/${entity.maxHp}`}${previewSkullHtml}</span>
        </div>
        ${postComboThreatHtml}
        ${statusesHtml ? `<div class="entity-status-row">${statusesHtml}</div>` : ""}
      </div>

      <div class="sprite-flip-wrapper scale-${bodyScale}" style="transform: scaleX(${scaleXVal});">
        <img src="${spriteUrl}"
             alt="${entity.name}"
             class="entity-sprite-img gait-${gait} ${heroClass} ${entity.flying ? "sprite-flying" : ""}"
             style="--idle-delay: -${idleDelaySec(entity.id)}s"
             referrerpolicy="no-referrer" />
      </div>
    </div>
  `;
}
function livingEntityAt(state, cellIdx) {
	if (state.hero && state.hero.hp > 0 && state.hero.cell === cellIdx) return state.hero;
	return state.enemies.find((e) => e.hp > 0 && e.cell === cellIdx) || state.props.find((p) => p.hp > 0 && p.cell === cellIdx) || null;
}
function corpseAt(state, cellIdx) {
	if (livingEntityAt(state, cellIdx)) return null;
	if (state.hero && state.hero.hp <= 0 && state.hero.cell === cellIdx) return state.hero;
	return state.enemies.find((e) => e.corpse && e.hp <= 0 && e.cell === cellIdx) || state.props.find((p) => p.corpse && p.hp <= 0 && p.cell === cellIdx) || null;
}
function refreshBoardOverlays(container, state, uiState = {}) {
	if (!container || !state) return false;
	const cells = container.querySelectorAll(".board-cell");
	if (!cells.length) return false;
	const hoveredEnemyId = uiState.hoveredEnemyId || null;
	const hoveredTileId = uiState.hoveredTileId || null;
	Boolean(uiState.comboPreviewActive || uiState.hoveredExecute || typeof uiState.hoveredQueueSlot === "number" && uiState.hoveredQueueSlot >= 0) && (state.queue || []).length > 0 && simulateComboImpact(state);
	const threats = computeBoardThreats(state, hoveredEnemyId);
	const queuePreview = computePlayerQueuePreview(state, hoveredTileId);
	cells.forEach((cellEl) => {
		const cellIdx = Number(cellEl.getAttribute("data-cell-index"));
		const cellThreat = threats[cellIdx];
		const isThreatened = Boolean(cellThreat && cellThreat.sources.length > 0);
		const isArmedRed = Boolean(cellThreat && cellThreat.isArmedRed);
		const isInspectReach = Boolean(cellThreat && cellThreat.isInspectReach);
		const isImminent = Boolean(cellThreat && cellThreat.sources.some((s) => s.countdown <= 1));
		const isNextThreat = Boolean(cellThreat && cellThreat.nextTileSources.length > 0);
		const isPlayerTargeted = Boolean(queuePreview.targetedCells.some((h) => h.cell === cellIdx) || queuePreview.hoveredCells.some((h) => h.cell === cellIdx));
		cellEl.classList.toggle("cell-armed-red-targeted", isArmedRed);
		cellEl.classList.toggle("cell-inspect-range", isInspectReach);
		cellEl.classList.toggle("cell-threatened", isThreatened);
		cellEl.classList.toggle("cell-threatened-imminent", isImminent);
		cellEl.classList.toggle("cell-threatened-next", isNextThreat);
		cellEl.classList.toggle("cell-player-targeted", isPlayerTargeted);
		const overlay = cellEl.querySelector(".cell-overlay-zone");
		if (overlay) overlay.innerHTML = renderCellThreatAndPreviewHtml(cellIdx, cellThreat, queuePreview, state);
	});
	return true;
}
function gaitFor(entity) {
	if (entity.entityType === "hero") return "hero";
	if (entity.entityType === "prop" || entity.bodyScale === "prop") return "prop";
	if (entity.flying || entity.bodyScale === "flyer") return "flyer";
	if (entity.bodyScale === "critter") return "critter";
	if (entity.bodyScale === "beast") return "beast";
	if (entity.bodyScale === "small") return "small";
	if (entity.bodyScale === "boss" || entity.isBoss) return "boss";
	if (entity.kind === "zombie_hynek" || entity.kind === "kostlivec_fabian") return "undead";
	return "human";
}
function idleDelaySec(id) {
	let hash = 0;
	const text = String(id || "");
	for (let i = 0; i < text.length; i++) hash = hash * 33 + text.charCodeAt(i) >>> 0;
	return (hash % 24 / 10).toFixed(1);
}
function getTerrainFloorLabel(terrainObj, terrainDef) {
	switch (terrainObj.type) {
		case "plank_intact": return "🪵 Prkno (1/2)";
		case "plank_cracked": return "⚠️ Prasklé prkno!";
		case "pit": return "🕳️ PROPAST";
		case "spikes": return "🗡️ KŮLY (2 DMG)";
		case "holy_water_puddle": return `💦 Svěcená louže (${terrainObj.duration || 1}t)`;
		case "garlic_cloud": return `🧄 Česnek (${terrainObj.duration || 1}t)`;
		default: return terrainDef.name;
	}
}
function getProjectileIcon(ev) {
	if (ev.tileId === "holy_syringe") return "💉";
	if (ev.tileId === "silver_crucifix_beam") return "✝️";
	if (ev.tileId === "rosary_slap") return "📿";
	if (ev.tileId === "tax_stamp_shot") return "💮";
	if (ev.tileId === "accountant_curse") return "📜";
	if (ev.tileId === "bone_chuck") return "🦴";
	if (ev.tileId === "rat_gnaw") return "🐀";
	if (ev.tileId === "miasma_waft") return "☣️";
	if (ev.enemyId) {
		const id = String(ev.enemyId);
		if (id.includes("urednik")) return "💮";
		if (id.includes("ucetni")) return "📜";
		if (id.includes("fabian") || id.includes("kostlivec")) return "🦴";
		if (id.includes("felcar")) return "☣️";
		if (id.includes("netopyr")) return "🦇";
	}
	return "🎯";
}
async function playProjectileFly(container, fromCellIdx, toCellIdx, icon = "🎯", animSpeed = 1) {
	if (fromCellIdx === void 0 || toCellIdx === void 0 || fromCellIdx === toCellIdx || animSpeed === 0) return;
	const fromCell = container.querySelector(`.board-cell[data-cell-index="${fromCellIdx}"]`);
	const toCell = container.querySelector(`.board-cell[data-cell-index="${toCellIdx}"]`);
	if (!fromCell || !toCell) return;
	const rFrom = fromCell.getBoundingClientRect();
	const rTo = toCell.getBoundingClientRect();
	const startX = rFrom.left + rFrom.width / 2;
	const startY = rFrom.top + rFrom.height * .42;
	const targetX = rTo.left + rTo.width / 2;
	const targetY = rTo.top + rTo.height * .42;
	const flipX = targetX > startX ? -1 : 1;
	const flyEl = document.createElement("div");
	flyEl.className = "flying-projectile";
	flyEl.textContent = icon;
	flyEl.style.left = `${startX}px`;
	flyEl.style.top = `${startY}px`;
	flyEl.style.transform = `translate(-50%, -50%) scale(${.6 * flipX}, 0.6)`;
	flyEl.style.opacity = "0";
	document.body.appendChild(flyEl);
	const durationMs = Math.max(90, Math.round(180 / (animSpeed || 1)));
	flyEl.offsetWidth;
	flyEl.style.transition = `transform ${durationMs}ms cubic-bezier(0.2, 0.8, 0.4, 1), opacity 80ms ease-out`;
	flyEl.style.opacity = "1";
	flyEl.style.transform = `translate(calc(-50% + ${targetX - startX}px), calc(-50% + ${targetY - startY}px)) scale(${1.15 * flipX}, 1.15)`;
	await sleep(180, animSpeed);
	flyEl.style.opacity = "0";
	setTimeout(() => flyEl.remove(), 100);
}
async function playEntityMove(container, ev, animSpeed = 1) {
	const entityEl = container.querySelector(`#entity-dom-${ev.entityId}`);
	const moveDuration = ev.type === "leap" ? 300 : ANIMATION_TIMINGS.MOVE_MS;
	const effectiveMs = animSpeed === 0 ? 0 : Math.round(moveDuration / (animSpeed || 1));
	const fromIdx = ev.from ?? ev.fromCell;
	const toIdx = ev.to ?? ev.toCell;
	let isBackwards = false;
	if (fromIdx !== void 0 && toIdx !== void 0 && fromIdx !== toIdx) {
		const moveDir = toIdx > fromIdx ? 1 : -1;
		const facing = ev.facing ?? (entityEl?.querySelector?.(".facing-left") ? -1 : 1);
		isBackwards = moveDir === 1 && facing === -1 || moveDir === -1 && facing === 1;
	}
	const animClass = ev.type === "leap" ? "anim-leap" : isBackwards ? "anim-walk-back" : "anim-walk";
	triggerSpriteAnim(container, ev.entityId, animClass);
	if (entityEl && fromIdx !== void 0 && toIdx !== void 0 && fromIdx !== toIdx) {
		const fromCellEl = container.querySelector(`.board-cell[data-cell-index="${fromIdx}"]`);
		const toCellEl = container.querySelector(`.board-cell[data-cell-index="${toIdx}"]`);
		if (fromCellEl && toCellEl && effectiveMs > 0) {
			const fromRect = fromCellEl.getBoundingClientRect();
			const deltaX = toCellEl.getBoundingClientRect().left - fromRect.left;
			entityEl.classList.add("entity-sliding");
			entityEl.style.setProperty("--slide-duration", `${effectiveMs}ms`);
			entityEl.style.transform = `translateX(${deltaX}px)`;
			await sleep(moveDuration, animSpeed);
			entityEl.classList.remove("entity-sliding");
			entityEl.style.removeProperty("--slide-duration");
			entityEl.style.transform = "";
			const destStage = container.querySelector(`#cell-stage-${toIdx}`);
			if (destStage && entityEl.parentElement !== destStage) destStage.appendChild(entityEl);
			return;
		}
	}
	await sleep(moveDuration, animSpeed);
}
async function playEngineEvents(container, events, animSpeed = 1) {
	if (!container || !events || events.length === 0) return;
	for (const ev of events) switch (ev.type) {
		case "move":
		case "leap":
			SFX.step();
			await playEntityMove(container, ev, animSpeed);
			break;
		case "push_move":
		case "pull_move":
			SFX.step();
			await playEntityMove(container, {
				entityId: ev.targetId,
				from: ev.from,
				to: ev.to,
				type: ev.type
			}, animSpeed);
			break;
		case "swap":
			SFX.swap();
			triggerSpriteAnim(container, ev.entityAId, "anim-leap");
			triggerSpriteAnim(container, ev.entityBId, "anim-leap");
			spawnFloatingBadgeOnCell(container, ev.cellA, "🤸 PŘESKOK!", "float-info");
			await sleep(ANIMATION_TIMINGS.MOVE_MS, animSpeed);
			break;
		case "turn":
			SFX.turn();
			if (ev.free) spawnFloatingBadgeOnEntity(container, ev.entityId, "🧄 OTOČKA ZDARMA", "float-heal");
			await sleep(90, animSpeed);
			break;
		case "queue_insert":
			SFX.queueInsert();
			await sleep(90, animSpeed);
			break;
		case "queue_remove":
			SFX.queueRemove();
			break;
		case "friendly_fire":
			SFX.friendlyFire();
			spawnFloatingBadgeOnCell(container, ev.cell, "🧛‍♂️💥 FRIENDLY FIRE!", "float-friendly");
			await sleep(180, animSpeed);
			break;
		case "tile_start":
			if (ev.isStrike && ev.heroId) {
				triggerSpriteAnim(container, ev.heroId, "anim-lunge");
				await playHeroPose(container, "attack", 260, animSpeed);
			}
			break;
		case "strike_vfx": break;
		case "projectile_vfx":
			await playProjectileFly(container, ev.from, ev.to, getProjectileIcon(ev), animSpeed);
			break;
		case "enemy_strike_vfx":
			triggerSpriteAnim(container, ev.enemyId, "anim-lunge");
			await sleep(170, animSpeed);
			break;
		case "enemy_projectile_vfx":
			triggerSpriteAnim(container, ev.enemyId, "anim-shoot");
			await playProjectileFly(container, ev.from, ev.to, getProjectileIcon(ev), animSpeed);
			break;
		case "damage": {
			SFX.hit();
			triggerSpriteAnim(container, ev.targetId, "anim-hurt");
			const damagedEl = container.querySelector(`#entity-dom-${ev.targetId}`);
			if (damagedEl && ev.remainingHp !== void 0) {
				const hpInnerEl = damagedEl.querySelector(".entity-hp-bar-inner");
				const hpTextEl = damagedEl.querySelector(".entity-hp-text");
				if (hpInnerEl && hpTextEl) {
					const parts = (hpTextEl.textContent || "").split("/");
					const maxHp = Number(parts[1]) || Math.max(1, ev.remainingHp);
					const curHp = Math.max(0, ev.remainingHp);
					hpTextEl.textContent = `${curHp}/${maxHp}`;
					hpInnerEl.style.width = `${Math.max(0, Math.min(100, Math.round(curHp / maxHp * 100)))}%`;
				}
			}
			if (isHeroEntity(container, ev.targetId)) {
				if ((ev.remainingHp ?? 1) > 0) {
					heroPoseLocked = true;
					setHeroPose(container, "hurt", 0);
					scheduleHeroIdle(container, 340, animSpeed);
				}
			}
			spawnBloodBurst(container, {
				cell: ev.cell,
				ichor: ev.ichor,
				amount: ev.amount,
				reason: ev.reason,
				attackerCell: ev.attackerCell,
				fatal: ev.fatal || ev.remainingHp <= 0,
				animSpeed
			});
			spawnFloatingBadgeOnCell(container, ev.cell, `−${ev.amount} HP`, "float-dmg");
			if (ev.attackerId && isHeroEntity(container, ev.attackerId) && !isHeroEntity(container, ev.targetId)) {
				const heroImg = heroSprite(container);
				if (!heroImg?.classList.contains("anim-lunge")) triggerSpriteAnim(container, ev.attackerId, "anim-lunge");
				if (heroImg?.dataset.pose !== "attack") {
					heroPoseLocked = true;
					setHeroPose(container, "attack", 0);
					scheduleHeroIdle(container, 260, animSpeed);
				}
			}
			await sleep(ANIMATION_TIMINGS.HIT_MS, animSpeed);
			break;
		}
		case "blocked_front_shield":
		case "shield_blocked":
			SFX.collision();
			spawnFloatingBadgeOnCell(container, ev.cell, "🛡️ VYKRYTO!", "float-info");
			await sleep(160, animSpeed);
			break;
		case "collision_wall":
		case "collision_entity":
		case "collision_barrel":
			SFX.collision();
			spawnFloatingBadgeOnCell(container, ev.cell, "💥 KOLIZE!", "float-dmg");
			await sleep(180, animSpeed);
			break;
		case "holy_font_shatter":
			SFX.collision();
			spawnFloatingBadgeOnCell(container, ev.cell, "💦 KROPENKA ROZTŘÍŠTĚNA!", "float-heal");
			await sleep(220, animSpeed);
			break;
		case "projectile_reflect":
			SFX.shield();
			spawnFloatingBadgeOnCell(container, ev.cell, "🪞 ODRAZ STŘELY!", "float-status");
			await sleep(180, animSpeed);
			break;
		case "barrel_break":
			SFX.collision();
			spawnFloatingBadgeOnCell(container, ev.cell, "🛢️ SUD ROZBIT!", "float-dmg");
			await sleep(180, animSpeed);
			break;
		case "pit_fall":
			SFX.death();
			spawnFloatingBadgeOnCell(container, ev.cell, "🕳️ PROPAST!", "float-dmg");
			await sleep(220, animSpeed);
			break;
		case "plank_collapse":
			SFX.collision();
			spawnFloatingBadgeOnCell(container, ev.cell, "💥 PROLOMENÍ!", "float-dmg");
			await sleep(180, animSpeed);
			break;
		case "status_added":
			if (ev.statusId === "stun") {
				SFX.bell();
				spawnFloatingBadgeOnCell(container, ev.cell, "🔔 OMRÁČENÍ!", "float-warn");
			}
			break;
		case "heal": {
			const healedEl = container.querySelector(`#entity-dom-${ev.targetId}`);
			if (healedEl && ev.remainingHp !== void 0) {
				const hpInnerEl = healedEl.querySelector(".entity-hp-bar-inner");
				const hpTextEl = healedEl.querySelector(".entity-hp-text");
				if (hpInnerEl && hpTextEl) {
					const parts = (hpTextEl.textContent || "").split("/");
					const maxHp = Number(parts[1]) || Math.max(1, ev.remainingHp);
					const curHp = Math.min(maxHp, ev.remainingHp);
					hpTextEl.textContent = `${curHp}/${maxHp}`;
					hpInnerEl.style.width = `${Math.max(0, Math.min(100, Math.round(curHp / maxHp * 100)))}%`;
				}
			}
			spawnFloatingBadgeOnCell(container, ev.cell, `+${ev.amount} HP`, "float-heal");
			await sleep(140, animSpeed);
			break;
		}
		case "momentum":
			SFX.friendlyFire();
			spawnFloatingBadgeOnEntity(container, "hero_venca", `🔥 MOMENTUM! (−${ev.reduction} CD)`, "float-heal");
			await sleep(220, animSpeed);
			break;
		case "death": {
			SFX.death();
			triggerSpriteAnim(container, ev.targetId, "anim-death");
			const deadEl = container.querySelector(`#entity-dom-${ev.targetId}`);
			if (deadEl) {
				const hpInnerEl = deadEl.querySelector(".entity-hp-bar-inner");
				const hpTextEl = deadEl.querySelector(".entity-hp-text");
				if (hpInnerEl) hpInnerEl.style.width = "0%";
				if (hpTextEl) hpTextEl.textContent = `0/${hpTextEl.textContent?.split("/")?.[1] || "0"}`;
			}
			if (isHeroEntity(container, ev.targetId)) {
				heroPoseLocked = true;
				clearHeroPoseTimer();
				setHeroPose(container, "dead", 0);
			}
			if (ev.ichor) spawnBloodBurst(container, {
				cell: ev.cell,
				ichor: ev.ichor,
				amount: 6,
				reason: "death",
				fatal: true,
				animSpeed
			});
			await sleep(ANIMATION_TIMINGS.DEATH_MS, animSpeed);
			break;
		}
		case "enemy_queue_firing":
			spawnFloatingBadgeOnCell(container, ev.cell, "🚨 ODPALUJE FRONTU!", "float-warn");
			await sleep(180, animSpeed);
	}
}
function triggerSpriteAnim(container, entityId, className) {
	if (!entityId) return;
	const el = container.querySelector(`#entity-dom-${entityId} .entity-sprite-img`);
	if (!el) return;
	el.classList.remove("anim-walk", "anim-walk-back", "anim-lunge", "anim-shoot", "anim-leap", "anim-hurt");
	if (className !== "anim-death") el.classList.remove("anim-death");
	el.offsetWidth;
	el.classList.add(className);
	if (className === "anim-death") return;
	const cleanup = () => el.classList.remove(className);
	el.addEventListener("animationend", cleanup, { once: true });
}
function spawnFloatingBadgeOnEntity(container, entityId, text, variantClass) {
	const el = container.querySelector(`#entity-dom-${entityId}`);
	if (!el) return;
	const cellEl = el.closest(".board-cell");
	if (!cellEl) return;
	spawnFloatingBadgeOnCell(container, Number(cellEl.getAttribute("data-cell-index") || 0), text, variantClass);
}
function spawnFloatingBadgeOnCell(container, cellIdx, text, variantClass = "float-dmg") {
	const cell = container.querySelector(`.board-cell[data-cell-index="${cellIdx}"]`);
	if (!cell) return;
	const badge = document.createElement("div");
	badge.className = `floating-combat-text floating-combat-text-fixed ${variantClass}`;
	badge.textContent = text;
	const r = cell.getBoundingClientRect();
	badge.style.left = `${r.left + r.width / 2}px`;
	badge.style.top = `${r.top + r.height * .36}px`;
	document.body.appendChild(badge);
	setTimeout(() => badge.remove(), 950);
}
function renderTileBar(container, state, callbacks = {}) {
	if (!container || !state) return;
	const canStepLeft = canHeroMoveDir(state, -1);
	const canStepRight = canHeroMoveDir(state, 1);
	const inGarlic = state.terrain[state.hero.cell]?.type === "garlic_cloud";
	const hasQueued = state.queue.length > 0;
	const tilesHtml = state.hand.map((tile, idx) => {
		const hotkey = idx + 1;
		const iconUrl = getAssetUrl(tile.icon, tile.name);
		const onCd = tile.currentCooldown > 0;
		const inQ = tile.inQueue;
		const queueSlotIdx = state.queue.indexOf(tile.instanceId);
		const disabled = onCd || inQ || state.queue.length >= state.maxQueueSlots || state.status !== "playing";
		const rangeText = formatTileRangeLabel(tile);
		const badges = [];
		if (tile.quick) badges.push("<span class=\"tile-tag tile-tag-quick\">⚡ Rychlovka</span>");
		if (tile.resonance) badges.push("<span class=\"tile-tag tile-tag-resonance\">✨ Rezonance</span>");
		if (tile.tags && Array.isArray(tile.tags)) for (const tId of tile.tags) {
			const tInfo = TILE_TAGS[tId];
			if (tInfo) badges.push(`<span class="tile-tag tile-tag-family" style="border-color:${tInfo.color};">${tInfo.icon} ${tInfo.name}</span>`);
		}
		return `
        <button type="button"
                class="player-tile-card ${onCd ? "tile-on-cooldown" : ""} ${inQ ? "tile-in-queue" : ""}"
                data-tile-instance="${tile.instanceId}"
                ${disabled ? "disabled" : ""}>
          <div class="tile-card-top">
            <span class="tile-hotkey">[${hotkey}]</span>
            <span class="tile-cd-stat" title="Cooldown destičky">⏳ ${onCd ? `${tile.currentCooldown}/${tile.maxCooldown}` : `CD ${tile.maxCooldown}`}</span>
          </div>
          <div class="tile-card-art">
            <img src="${iconUrl}" alt="${tile.name}" class="tile-art-img" referrerpolicy="no-referrer" />
            ${onCd ? `<div class="tile-cooldown-overlay" aria-label="Nabíjí se ještě ${tile.currentCooldown} ${czechTurns(tile.currentCooldown)}">
                     <span class="cd-number">${tile.currentCooldown}</span>
                     <span class="cd-label">${czechTurns(tile.currentCooldown)}</span>
                   </div>` : ""}
            ${inQ ? `<div class="tile-queued-overlay">
                     <span>Ve frontě #${queueSlotIdx + 1}</span>
                   </div>` : ""}
          </div>
          <div class="tile-card-name">${tile.name}</div>
          <div class="tile-card-metrics">
            <span class="tile-metric-dmg">⚔️ ${tile.dmg} DMG</span>
            <span class="tile-metric-range">📏 ${rangeText}</span>
          </div>
          <div class="tile-card-tags">${badges.join("")}</div>
        </button>
      `;
	}).join("");
	let executeBtnClass = "btn-action";
	let executeBtnText = `🔥 ODPÁLIT KOMBO (0/${state.maxQueueSlots}) <kbd>Space</kbd>`;
	let executeBtnTitle = "Nejprve vlož destičky do fronty (1 tah za destičku)";
	if (!hasQueued) executeBtnClass += " btn-execute-disabled";
	else {
		executeBtnClass += " btn-execute-combo btn-execute-ready btn-combo-primed";
		executeBtnText = `🔥 ODPÁLIT KOMBO! (${state.queue.length}/${state.maxQueueSlots}) <kbd>Space</kbd>`;
		executeBtnTitle = "Okamžitý odpal! Kliknutím nebo Mezerníkem ihned provedeš všechny destičky ve frontě!";
	}
	container.innerHTML = `
    <div class="action-controls-row">
      <button type="button" class="btn-action" id="btn-act-left" ${!canStepLeft ? "disabled" : ""} title="Krok vlevo (Klávesa A nebo ⬅)">
        ⬅ Krok vlevo <kbd>A</kbd>
      </button>
      <button type="button" class="btn-action ${inGarlic ? "btn-action-free" : ""}" id="btn-act-turn" title="Otočit čelem vzad (Klávesa W)">
        🔄 Otočit ${inGarlic ? "(ZDARMA v česneku!)" : ""} <kbd>W</kbd>
      </button>
      <button type="button" class="btn-action" id="btn-act-wait" title="Vyčkat 1 tah a zkrátit cooldowny (Klávesa S)">
        ⏳ Čekat <kbd>S</kbd>
      </button>
      <button type="button" class="btn-action" id="btn-act-right" ${!canStepRight ? "disabled" : ""} title="Krok vpravo (Klávesa D nebo ➡)">
        Krok vpravo ➡ <kbd>D</kbd>
      </button>
      <button type="button" class="btn-action btn-preview-toggle ${callbacks.isComboPreviewActive ? "btn-preview-active" : ""}" id="btn-act-preview-toggle" ${!hasQueued ? "disabled" : ""} title="Taktický náhled dopadu komba na Bojiště (vhodné pro mobily a dotykové displeje)">
        👁️ Náhled
      </button>
      <button type="button" class="${executeBtnClass}" id="btn-act-execute" ${!hasQueued ? "disabled" : ""} title="${executeBtnTitle}">
        ${executeBtnText}
      </button>
    </div>

    <div class="tile-hand-Dock">
      <div class="tile-hand-strip">
        ${tilesHtml}
      </div>
    </div>
  `;
	container.querySelector("#btn-act-left")?.addEventListener("click", () => callbacks.onStep?.(-1));
	container.querySelector("#btn-act-right")?.addEventListener("click", () => callbacks.onStep?.(1));
	container.querySelector("#btn-act-turn")?.addEventListener("click", () => callbacks.onTurn?.());
	container.querySelector("#btn-act-wait")?.addEventListener("click", () => callbacks.onWait?.());
	const execBtn = container.querySelector("#btn-act-execute");
	execBtn?.addEventListener("click", () => callbacks.onExecuteQueue?.());
	execBtn?.addEventListener("mouseenter", () => callbacks.onHoverExecute?.(true));
	execBtn?.addEventListener("mouseleave", () => callbacks.onHoverExecute?.(false));
	container.querySelector("#btn-act-preview-toggle")?.addEventListener("click", () => callbacks.onToggleComboPreview?.());
	container.querySelectorAll("[data-tile-instance]").forEach((btn) => {
		const instanceId = btn.getAttribute("data-tile-instance");
		const tile = state.hand.find((t) => t.instanceId === instanceId);
		if (!tile) return;
		btn.addEventListener("click", () => {
			hideTooltip();
			callbacks.onSelectTile?.(instanceId);
		});
		btn.addEventListener("mouseenter", (ev) => {
			callbacks.onHoverTile?.(instanceId);
			showTooltip(buildTileTooltipHtml(tile), ev.clientX, ev.clientY);
		});
		btn.addEventListener("mouseleave", () => {
			callbacks.onHoverTile?.(null);
			hideTooltip();
		});
	});
}
function canHeroMoveDir(state, dir) {
	if (!state.hero || state.hero.hp <= 0 || state.status !== "playing") return false;
	const limit = state.boardSize || 7;
	const nextCell = state.hero.cell + dir;
	if (!Number.isInteger(nextCell) || nextCell < 0 || nextCell >= limit) return false;
	return !(state.enemies.find((e) => e.hp > 0 && e.cell === nextCell) || state.props.find((p) => p.hp > 0 && p.cell === nextCell));
}
function formatTileRangeLabel(tile) {
	if (tile.stepBackward) return "Úskok vzad";
	if (tile.leapDistance) return `Skok ${tile.leapDistance}`;
	if (tile.projectileRange) return `Střela 1–${tile.projectileRange}`;
	if (!tile.pattern || tile.pattern.length === 0) return "Na místě";
	const offsets = tile.pattern.map((p) => p.offset).sort((a, b) => a - b);
	if (offsets.length === 1) {
		if (offsets[0] === 1) return "Vpřed 1";
		if (offsets[0] === -1) return "Vzad 1";
		return offsets[0] > 0 ? `Vpřed ${offsets[0]}` : `Vzad ${Math.abs(offsets[0])}`;
	}
	if (offsets.length === 2 && offsets[0] === -1 && offsets[1] === 1) return "Kolem sebe (1)";
	if (offsets.every((o) => o > 0)) return `Vpřed ${Math.min(...offsets)}–${Math.max(...offsets)}`;
	return `Pole ${offsets.map((o) => o > 0 ? `+${o}` : `${o}`).join(", ")}`;
}
function buildTileTooltipHtml(tile) {
	return `
    <div class="tt-title">${tile.name}</div>
    <div class="tt-stat-row">
      ⚔️ Základní DMG: <strong>${tile.dmg}</strong> · ⏳ Cooldown: <strong>${tile.maxCooldown} ${czechTurns(tile.maxCooldown)}</strong>
      ${tile.quick ? " · ⚡ <strong>Rychlovka (0 tahů)</strong>" : ""}
    </div>
    ${tile.tags?.length ? `<div class="tt-tags" style="font-size:0.85em; color:#d4af37; margin-bottom:4px;">${tile.tags.map((t) => TILE_TAGS[t] ? `${TILE_TAGS[t].icon} ${TILE_TAGS[t].name}` : "").filter(Boolean).join(" · ")}</div>` : ""}
    <div class="tt-desc">${tile.description}</div>
    ${tile.resonance ? `<div class="tt-bonus">✨ <strong>${tile.resonance.description}</strong></div>` : ""}
    ${tile.flavor ? `<div class="tt-flavor">${tile.flavor}</div>` : ""}
  `;
}
function formatLogEntryHtml(rawText, isLatest = false) {
	let text = String(rawText || "");
	let turnBadge = "";
	const match = text.match(/^\[Kolo\s+(\d+)\]\s*(.*)$/);
	if (match) {
		turnBadge = `<span class="log-turn-pill">Kolo ${match[1]}</span>`;
		text = match[2];
	}
	let formatted = text.replace(/(\b\d+\s*DMG\b)/g, "<span class=\"log-hl-dmg\">$1</span>").replace(/(FRIENDLY FIRE!)/g, "<span class=\"log-hl-ff\">$1</span>").replace(/(MOMENTUM!)/g, "<span class=\"log-hl-mom\">$1</span>").replace(/(\b\+\d+\s*HP\b)/g, "<span class=\"log-hl-heal\">$1</span>");
	return `
    <li class="chronicle-item ${isLatest ? "chronicle-latest" : ""}">
      ${turnBadge}
      <span class="chronicle-text">${formatted}</span>
    </li>
  `;
}
function renderChronicleLog(container, state, onOpenFullLog) {
	if (!container || !state) return;
	const logs = state.log || [];
	const recentLogs = logs.slice(-8);
	const itemsHtml = recentLogs.length === 0 ? `<li class="chronicle-empty">Zatím se v této bitvě nic nestalo.</li>` : recentLogs.map((entry, idx) => formatLogEntryHtml(entry, idx === recentLogs.length - 1)).join("");
	container.innerHTML = `
    <div class="chronicle-panel">
      <div class="chronicle-header">
        <div class="chronicle-title-group">
          <span class="chronicle-icon">📜</span>
          <span class="chronicle-title">Hradní kronikář (Bojový zápis)</span>
          <span class="chronicle-turn-counter">Kolo ${state.turn}</span>
          <span class="chronicle-count-pill">${logs.length} záznamů</span>
        </div>
        <button type="button" class="btn-parchment btn-xs" id="btn-open-full-log">
          📖 Celý deník výpravy
        </button>
      </div>
      <div class="chronicle-scroll-window" id="chronicle-scroll-box">
        <ul class="chronicle-list">
          ${itemsHtml}
        </ul>
      </div>
    </div>
  `;
	const scrollBox = container.querySelector("#chronicle-scroll-box");
	if (scrollBox) scrollBox.scrollTop = scrollBox.scrollHeight;
	container.querySelector("#btn-open-full-log")?.addEventListener("click", () => {
		onOpenFullLog?.();
	});
}
function renderMapScreen(container, runState, callbacks = {}) {
	if (!container || !runState || !runState.map) return;
	const availableNodes = callbacks.canReturnToBattle ? [] : getAvailableNodes(runState);
	const availableIds = new Set(availableNodes.map((n) => n.id));
	const completedIds = new Set(runState.completedNodeIds || []);
	const tiersHtml = [
		0,
		1,
		2,
		3,
		4,
		5
	].map((tierNum) => {
		const nodesHtml = runState.map.nodes.filter((n) => n.tier === tierNum).map((node) => {
			const isAvailable = availableIds.has(node.id);
			const isCompleted = completedIds.has(node.id);
			const isCurrent = runState.currentNodeId === node.id;
			const iconUrl = getAssetUrl(getMapIconKey(node.type), node.title);
			let statusClass = "map-node-locked";
			if (isCompleted) statusClass = "map-node-completed";
			if (isCurrent) statusClass = callbacks.canReturnToBattle ? "map-node-current map-node-active" : "map-node-current";
			if (isAvailable) statusClass = "map-node-available";
			const isDisabled = !isAvailable && (!isCurrent || !callbacks.canReturnToBattle);
			return `
            <button type="button"
                    class="map-node-card ${statusClass}"
                    data-node-id="${node.id}"
                    ${isDisabled ? "disabled" : ""}>
              <div class="map-node-icon-wrap">
                <img src="${iconUrl}" alt="${node.title}" class="map-node-icon" referrerpolicy="no-referrer" />
                ${isCompleted ? "<span class=\"map-node-check\">✔</span>" : ""}
              </div>
              <div class="map-node-info">
                <div class="map-node-title">${node.title}</div>
                <div class="map-node-sub">${callbacks.canReturnToBattle && isCurrent ? "⚔️ Právě bojuješ!" : getNodeTypeDescription(node.type)}</div>
              </div>
            </button>
          `;
		}).join("");
		return `
        <div class="map-tier-column">
          <div class="map-tier-label">Patro ${tierNum + 1}</div>
          <div class="map-tier-nodes">${nodesHtml}</div>
        </div>
      `;
	}).join("");
	container.innerHTML = `
    <div class="map-screen-wrapper">
      <div class="map-header-banner">
        <div>
          <h2 class="map-act-heading">${STRINGS.acts[runState.act] || `Akt ${runState.act}`}</h2>
          ${runState.curseLevel > 0 ? `<div class="map-curse-pill">🌙 ${getCurseDefinition(runState.curseLevel).name}</div>` : ""}
          <p class="map-act-subtitle">${callbacks.canReturnToBattle ? "Venca má rozdělanou bitvu! K dokončení střetnutí se vrať tlačítkem zpět do probíhající bitvy." : "Vyber další zastávku Vencovy výpravy hradním labyrintem. Zvýrazněné uzly jsou dostupné."}</p>
        </div>
        ${callbacks.canReturnToBattle ? `<button type="button" class="btn-parchment" id="btn-return-battle">⚔️ Zpět do probíhající bitvy</button>` : ""}
      </div>

      <div class="map-tiers-grid">
        ${tiersHtml}
      </div>
    </div>
  `;
	container.querySelector("#btn-return-battle")?.addEventListener("click", () => {
		callbacks.onReturnToBattle?.();
	});
	container.querySelectorAll("[data-node-id]").forEach((btn) => {
		btn.addEventListener("click", () => {
			const nodeId = btn.getAttribute("data-node-id");
			const node = runState.map.nodes.find((n) => n.id === nodeId);
			if (!node) return;
			if (callbacks.canReturnToBattle) {
				if (node.id === runState.currentNodeId) callbacks.onReturnToBattle?.();
				return;
			}
			callbacks.onSelectNode?.(node);
		});
	});
}
function getMapIconKey(type) {
	switch (type) {
		case NODE_TYPES.BATTLE: return "map.battle";
		case NODE_TYPES.ELITE: return "map.elite";
		case NODE_TYPES.PUB: return "map.pub";
		case NODE_TYPES.WORKSHOP: return "map.workshop";
		case NODE_TYPES.EVENT: return "map.event";
		case NODE_TYPES.TREASURE: return "map.treasure";
		case NODE_TYPES.BOSS: return "map.boss";
		default: return "map.battle";
	}
}
function getNodeTypeDescription(type) {
	switch (type) {
		case NODE_TYPES.BATTLE: return "Běžná šarvátka";
		case NODE_TYPES.ELITE: return "Tuhý protivník · Bohatší kořist";
		case NODE_TYPES.PUB: return "Léčení · Pivo · Obchod";
		case NODE_TYPES.WORKSHOP: return "Vylepšení destičky";
		case NODE_TYPES.EVENT: return "Příběhové rozhodnutí";
		case NODE_TYPES.TREASURE: return "Talisman nebo dukáty zdarma";
		case NODE_TYPES.BOSS: return "Vládce patra";
		default: return "";
	}
}
function closeModal(modalRoot) {
	if (!modalRoot) return;
	modalRoot.innerHTML = "";
	modalRoot.classList.add("hidden");
}
function openRulesModal(modalRoot) {
	modalRoot.classList.remove("hidden");
	modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-card modal-lg">
        <div class="modal-header">
          <h3>📖 Pravidla lovu upírů (Manuál Venci Česnekáče)</h3>
          <button type="button" class="btn-parchment btn-xs" id="btn-modal-close">✖ Zavřít</button>
        </div>
        <div class="modal-body rules-grid">
          <div class="rule-block">
            <h4>1. 1D Bojiště (7–9 polí) a Ekonomika tahu</h4>
            <p>Na každém ze 7–9 kamenných polí smí stát nejvýše jedna postava nebo sud. Jeden tvůj <strong>TAH</strong> je právě jedna z akcí:</p>
            <ul>
              <li><strong>Krok vlevo / vpravo (A / D):</strong> Posun o 1 pole bez změny směru pohledu. Cílové pole musí být volné (do obsazeného pole nelze vstoupit ani ho krokem přeskočit – přes překážky skáče pouze destička <em>Hospodský přemet</em>).</li>
              <li><strong>Otočení (W):</strong> Změní směr pohledu (◀ / ▶). Stojíš-li v <strong>Česnekovém oblaku</strong>, je otočení <strong>ZDARMA (0 tahů)</strong>!</li>
              <li><strong>Čekání (S):</strong> Stojí 1 tah, sníží cooldowny tvých destiček.</li>
              <li><strong>Vložení destičky do Fronty (1–4 / klik):</strong> Stojí 1 tah (vyjma destiček s vlastností <em>Rychlovka</em>, jejichž vložení stojí 0 tahů). Vyjmutí i libovolné přerovnání destiček ve frontě je vždy zdarma.</li>
              <li><strong>PROVÉST KOMBO (Mezerník / Space):</strong> Okamžitý odpal! Všechny destičky ve frontě se provedou zleva doprava bez nutnosti přípravného nápřahu za <strong>JEDEN tah</strong>!</li>
            </ul>
          </div>

          <div class="rule-block">
            <h4>2. Fronty nepřátel, Záměry a Friendly Fire</h4>
            <ul>
              <li>Nad každým upírem vidíš jeho <strong>pořadí iniciativy (#1, #2, #3 zleva doprava)</strong> a pás jeho destiček akcí.</li>
              <li>První zvýrazněná destička má <strong>odpočet (⏳)</strong>. Na konci každého tvého tahu klesne odpočet o 1.</li>
              <li>Při odpočtu <strong>0</strong> upír provede akci do polí podle své <strong>AKTUÁLNÍ polohy a otočení</strong>!</li>
              <li><strong>FRIENDLY FIRE:</strong> Pokud upíra poodstrčíš, přitáhneš nebo otočíš hasičskou stříkačkou, při odpočtu 0 napálí plnou silou vlastního kolegu nebo sud!</li>
            </ul>
          </div>

          <div class="rule-block">
            <h4>3. Kolize, Terén a poslední akce</h4>
            <ul>
              <li><strong>Odhození (Push) a Kolize:</strong> Narazí-li odhozená postava do zdi nebo do jiné postavy, utrpí obě <strong>+1 kolizní DMG</strong>. Vhození do sudu se zelím sud rozbije (2 DMG + Zmatení).</li>
              <li><strong>Ještě jedna akce:</strong> Když nepřítel zčervená (🚨), útok ještě nejde. Stihneš jednu obyčejnou akci — krok, otočku, destičku nebo čekání. Pak teprve útok dopadne. Žádné zvláštní okno.</li>
              <li><strong>Terén:</strong> <em>Propast</em> = okamžitá smrt (kromě létajících netopýrů). <em>Kůly</em> = 2 DMG. <em>Prohnilé prkno</em> = 1. stoupnutí zapraská, 2. stoupnutí se prolomí za 2 DMG.</li>
              <li><strong>Momentum:</strong> Zabiješ-li posledního nepřítele bitvy kombem 2+ destiček, zkrátí se cooldowny všech tvých destiček o počet destiček v kombu!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
	modalRoot.querySelector("#btn-modal-close")?.addEventListener("click", () => closeModal(modalRoot));
}
function openFullLogModal(modalRoot, logs = []) {
	modalRoot.classList.remove("hidden");
	const turnGroups = [];
	let currentGroup = {
		turn: 1,
		entries: []
	};
	logs.forEach((rawText, idx) => {
		const text = String(rawText || "");
		const match = text.match(/^\[Kolo\s+(\d+)\]\s*(.*)$/);
		if (match) {
			const turnNum = Number(match[1]);
			if (turnNum !== currentGroup.turn && currentGroup.entries.length > 0) {
				turnGroups.push(currentGroup);
				currentGroup = {
					turn: turnNum,
					entries: []
				};
			} else currentGroup.turn = turnNum;
			currentGroup.entries.push({
				idx: idx + 1,
				text: match[2]
			});
		} else currentGroup.entries.push({
			idx: idx + 1,
			text
		});
	});
	if (currentGroup.entries.length > 0) turnGroups.push(currentGroup);
	const groupsHtml = turnGroups.map((grp) => `
      <div class="full-log-round-section">
        <div class="full-log-round-title">⚔️ Kolo ${grp.turn}</div>
        <div class="full-log-round-items">
          ${grp.entries.map((e) => `
            <div class="full-log-row">
              <span class="log-idx">#${e.idx}</span>
              <span class="log-row-text">${e.text}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
	modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-card modal-lg">
        <div class="modal-header">
          <h3>📜 Kompletní deník bojových událostí (${logs.length} záznamů)</h3>
          <button type="button" class="btn-parchment btn-xs" id="btn-modal-close">✖ Zavřít</button>
        </div>
        <div class="modal-body full-log-scroll" id="full-log-scroll-area">
          ${groupsHtml || "<p>Kronikář zatím nezaznamenal žádné události.</p>"}
        </div>
      </div>
    </div>
  `;
	const scrollArea = modalRoot.querySelector("#full-log-scroll-area");
	if (scrollArea) setTimeout(() => {
		scrollArea.scrollTop = scrollArea.scrollHeight;
	}, 20);
	modalRoot.querySelector("#btn-modal-close")?.addEventListener("click", () => closeModal(modalRoot));
}
function openSettingsModal(modalRoot, settings, metaStats, callbacks = {}) {
	modalRoot.classList.remove("hidden");
	modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-card">
        <div class="modal-header">
          <h3>⚙️ Nastavení & Nová výprava</h3>
          <button type="button" class="btn-parchment btn-xs" id="btn-modal-close">✖ Zavřít</button>
        </div>
        <div class="modal-body settings-form">
          <div class="setting-row">
            <label for="sel-anim-speed"><strong>Rychlost přehrávání animací:</strong></label>
            <select id="sel-anim-speed" class="parchment-input">
              <option value="1" ${settings.animSpeed === 1 ? "selected" : ""}>Normální (1×)</option>
              <option value="2" ${settings.animSpeed === 2 ? "selected" : ""}>Rychlá (2×)</option>
              <option value="0" ${settings.animSpeed === 0 ? "selected" : ""}>Okamžitá (přeskočit animace)</option>
            </select>
          </div>

          <div class="setting-row">
            <label for="chk-sound"><strong>Zvukové efekty (WebAudio syntéza):</strong></label>
            <input type="checkbox" id="chk-sound" ${settings.soundEnabled ? "checked" : ""} />
          </div>

          <hr class="tt-divider" />

          <div class="setting-row-col">
            <label for="inp-custom-seed"><strong>Spustit novou výpravu s vlastním seedem:</strong></label>
            <div class="seed-input-group">
              <input type="text" id="inp-custom-seed" class="parchment-input" value="${settings.currentSeed || "VENCA-1899"}" placeholder="Např. HRAD-1905" />
              <button type="button" class="btn-parchment" id="btn-start-seed">🎲 Spustit seed</button>
              <button type="button" class="btn-parchment" id="btn-random-seed">🔀 Náhodný běh</button>
            </div>
          </div>

          <hr class="tt-divider" />
          <div class="meta-stats-box">
            <h4>🏆 Nejlepší výsledky (localStorage)</h4>
            <p>Nejvyšší dosažený akt: <strong>${metaStats.bestAct || 1}</strong> · Vítězné výpravy: <strong>${metaStats.victories || 0}</strong> · Celkem poraženo upírů: <strong>${metaStats.totalKills || 0}</strong></p>
          </div>
        </div>
      </div>
    </div>
  `;
	modalRoot.querySelector("#btn-modal-close")?.addEventListener("click", () => closeModal(modalRoot));
	modalRoot.querySelector("#sel-anim-speed")?.addEventListener("change", (e) => {
		callbacks.onChangeAnimSpeed?.(Number(e.target.value));
	});
	modalRoot.querySelector("#chk-sound")?.addEventListener("change", (e) => {
		callbacks.onToggleSound?.(e.target.checked);
	});
	modalRoot.querySelector("#btn-start-seed")?.addEventListener("click", () => {
		const val = modalRoot.querySelector("#inp-custom-seed")?.value || "VENCA-1899";
		closeModal(modalRoot);
		callbacks.onStartNewRun?.(val);
	});
	modalRoot.querySelector("#btn-random-seed")?.addEventListener("click", () => {
		const randomSeed = `LOV-${Math.floor(1e3 + Math.random() * 9e3)}`;
		closeModal(modalRoot);
		callbacks.onStartNewRun?.(randomSeed);
	});
}
function openBattleRewardModal(modalRoot, runState, choices, onComplete) {
	modalRoot.classList.remove("hidden");
	modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-card modal-lg">
        <div class="modal-header">
          <h3>🏆 Bitva vyhrána! Vyber si 1 ze 3 odměn</h3>
        </div>
        <div class="modal-body">
          <p class="modal-lead">Venca vytřel podlahu s upíří patrolou a prohledává kapsy poražených:</p>
          <div class="reward-choices-grid">
            ${choices.map((c, idx) => `
      <div class="reward-choice-card">
        <div class="reward-card-title">${c.title}</div>
        <div class="reward-card-sub">${c.subtitle}</div>
        <p class="reward-card-desc">${c.description}</p>
        <button type="button" class="btn-parchment btn-pick-reward" data-reward-idx="${idx}">
          Vybrat tuto odměnu
        </button>
      </div>
    `).join("")}
          </div>
          <div class="modal-footer-actions">
            <button type="button" class="btn-parchment" id="btn-skip-reward">Přeskočit odměnu a pokračovat na mapu ➡</button>
          </div>
        </div>
      </div>
    </div>
  `;
	modalRoot.querySelectorAll("[data-reward-idx]").forEach((btn) => {
		btn.addEventListener("click", () => {
			const chosen = choices[Number(btn.getAttribute("data-reward-idx"))];
			if (chosen) {
				if (chosen.type === "tile") grantTileToRun(runState, chosen.tileId);
				else if (chosen.type === "talisman") grantTalismanToRun(runState, chosen.talismanId);
				else if (chosen.type === "gold") runState.gold += chosen.amount;
			}
			closeModal(modalRoot);
			onComplete?.();
		});
	});
	modalRoot.querySelector("#btn-skip-reward")?.addEventListener("click", () => {
		closeModal(modalRoot);
		onComplete?.();
	});
}
function openPubModal(modalRoot, runState, onLeavePub) {
	modalRoot.classList.remove("hidden");
	const ownedTileIds = new Set(runState.deck.map((d) => d.id));
	const shopTilePool = Object.keys(HERO_TILES).filter((id) => !ownedTileIds.has(id));
	const shopTileId = runState.rng && shopTilePool.length > 0 ? runState.rng.pick(shopTilePool) : shopTilePool[0] || "rosary_slap";
	const shopTileDef = getHeroTileDefinition(shopTileId, 0);
	const unownedTalismans = Object.keys(TALISMANS).filter((id) => !runState.talismans.includes(id));
	const shopTalismanId = unownedTalismans.length > 0 ? runState.rng ? runState.rng.pick(unownedTalismans) : unownedTalismans[0] : null;
	const shopTalisman = shopTalismanId ? TALISMANS[shopTalismanId] : null;
	let healedInThisVisit = false;
	let cdReducedInThisVisit = false;
	let boughtTile = false;
	let boughtTalisman = false;
	function renderContent() {
		const cdCost = getCurseShopPrice(14, runState.curseLevel);
		const tileCost = getCurseShopPrice(18, runState.curseLevel);
		const talPrice = shopTalisman ? getCurseShopPrice(shopTalisman.price, runState.curseLevel) : 0;
		const deckButtonsHtml = runState.deck.map((entry, idx) => {
			const def = getHeroTileDefinition(entry.id, entry.upgradeLevel || 0);
			const effCd = Math.max(1, def.cooldown - (entry.permanentCdReduction || 0));
			return `
          <button type="button" class="btn-parchment btn-sm" data-reduce-cd-idx="${idx}" ${!(!cdReducedInThisVisit && runState.gold >= cdCost && effCd > 1) ? "disabled" : ""}>
            ⏳ Zkrátit CD: ${def.name} (nyní CD ${effCd}) — ${cdCost} dukátů
          </button>
        `;
		}).join("");
		modalRoot.innerHTML = `
      <div class="modal-backdrop">
        <div class="modal-card modal-lg">
          <div class="modal-header">
            <h3>🍺 Hospoda U Svěcené pípy (Měšec: 💰 ${runState.gold} dukátů · ❤️ ${runState.heroHp}/${runState.heroMaxHp} HP)</h3>
            <button type="button" class="btn-parchment btn-sm" id="btn-leave-pub">Opustit hospodu ➡</button>
          </div>
          <div class="modal-body pub-grid">
            <div class="pub-section">
              <h4>1. Teplá dršťková a ležák</h4>
              <p>Hospodský ti natočí poctivý džbánek na kuráž.</p>
              <button type="button" class="btn-parchment" id="btn-pub-heal" ${healedInThisVisit || runState.heroHp >= runState.heroMaxHp ? "disabled" : ""}>
                🍺 Dát si pivo a guláš (+2 HP ZDARMA)
              </button>
            </div>

            <div class="pub-section">
              <h4>2. Promazat výzbroj sádlem (Trvale −1 Cooldown)</h4>
              <p>Jedné destičce trvale snížíš nabíjení o 1 tah (min. CD 1):</p>
              <div class="pub-deck-list">${deckButtonsHtml}</div>
            </div>

            <div class="pub-section">
              <h4>3. Podpultové zboží od štamgastů</h4>
              <div class="pub-shop-items">
                <div class="reward-choice-card">
                  <div class="reward-card-title">Destička: ${shopTileDef.name}</div>
                  <p class="reward-card-desc">${shopTileDef.description}</p>
                  <button type="button" class="btn-parchment" id="btn-pub-buy-tile" ${boughtTile || runState.gold < tileCost ? "disabled" : ""}>
                    💰 Koupit destičku (${tileCost} dukátů)
                  </button>
                </div>

                ${shopTalisman ? `<div class="reward-choice-card">
                         <div class="reward-card-title">${shopTalisman.badge} ${shopTalisman.name}</div>
                         <p class="reward-card-desc">${shopTalisman.description}</p>
                         <button type="button" class="btn-parchment" id="btn-pub-buy-tal" ${boughtTalisman || runState.gold < talPrice ? "disabled" : ""}>
                           💰 Koupit talisman (${talPrice} dukátů)
                         </button>
                       </div>` : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
		modalRoot.querySelector("#btn-pub-heal")?.addEventListener("click", () => {
			healedInThisVisit = true;
			runState.heroHp = Math.min(runState.heroMaxHp, runState.heroHp + 2);
			renderContent();
		});
		modalRoot.querySelectorAll("[data-reduce-cd-idx]").forEach((btn) => {
			btn.addEventListener("click", () => {
				const idx = Number(btn.getAttribute("data-reduce-cd-idx"));
				if (runState.gold >= cdCost && reduceTileCooldownInRun(runState, idx)) {
					runState.gold -= cdCost;
					cdReducedInThisVisit = true;
					renderContent();
				}
			});
		});
		modalRoot.querySelector("#btn-pub-buy-tile")?.addEventListener("click", () => {
			if (!boughtTile && runState.gold >= tileCost) {
				runState.gold -= tileCost;
				boughtTile = true;
				grantTileToRun(runState, shopTileId);
				renderContent();
			}
		});
		modalRoot.querySelector("#btn-pub-buy-tal")?.addEventListener("click", () => {
			if (shopTalisman && !boughtTalisman && runState.gold >= talPrice) {
				runState.gold -= talPrice;
				boughtTalisman = true;
				grantTalismanToRun(runState, shopTalisman.id);
				renderContent();
			}
		});
		modalRoot.querySelector("#btn-leave-pub")?.addEventListener("click", () => {
			closeModal(modalRoot);
			onLeavePub?.();
		});
	}
	renderContent();
}
function openWorkshopModal(modalRoot, runState, onLeaveWorkshop) {
	modalRoot.classList.remove("hidden");
	let freeUpgradeUsed = false;
	function renderWorkshop() {
		const upgradeCost = getCurseShopPrice(16, runState.curseLevel);
		const cardsHtml = runState.deck.map((entry, idx) => {
			const curDef = getHeroTileDefinition(entry.id, entry.upgradeLevel || 0);
			const maxReached = (entry.upgradeLevel || 0) >= 2;
			const nextDef = !maxReached ? getHeroTileDefinition(entry.id, (entry.upgradeLevel || 0) + 1) : null;
			const cost = freeUpgradeUsed ? upgradeCost : 0;
			const canAfford = !maxReached && (cost === 0 || runState.gold >= cost);
			return `
          <div class="reward-choice-card">
            <div class="reward-card-title">${curDef.name} (Úroveň ${entry.upgradeLevel || 0}/2)</div>
            <p class="reward-card-desc">Nyní: ${curDef.description}</p>
            ${nextDef ? `<p class="tt-bonus">Po vylepšení: <strong>${nextDef.name}</strong> — ${nextDef.description}</p>
                   <button type="button" class="btn-parchment" data-upg-idx="${idx}" ${!canAfford ? "disabled" : ""}>
                     ⚒️ Vylepšit (${cost === 0 ? "1. vylepšení ZDARMA" : `${cost} dukátů`})
                   </button>` : `<span class="hud-muted-text">✔ Maximální mistrovská úroveň</span>`}
          </div>
        `;
		}).join("");
		modalRoot.innerHTML = `
      <div class="modal-backdrop">
        <div class="modal-card modal-lg">
          <div class="modal-header">
            <h3>⚒️ Kolářská a kovářská dílna (💰 ${runState.gold} dukátů)</h3>
            <button type="button" class="btn-parchment btn-sm" id="btn-leave-workshop">Pokračovat na mapu ➡</button>
          </div>
          <div class="modal-body">
            <p class="modal-lead">Mistr kolář ti první destičku přiostří zadarmo, další pak za ${upgradeCost} dukátů:</p>
            <div class="reward-choices-grid">${cardsHtml}</div>
          </div>
        </div>
      </div>
    `;
		modalRoot.querySelectorAll("[data-upg-idx]").forEach((btn) => {
			btn.addEventListener("click", () => {
				const idx = Number(btn.getAttribute("data-upg-idx"));
				const cost = freeUpgradeUsed ? upgradeCost : 0;
				if (runState.gold >= cost && upgradeTileInRun(runState, idx)) {
					runState.gold -= cost;
					freeUpgradeUsed = true;
					renderWorkshop();
				}
			});
		});
		modalRoot.querySelector("#btn-leave-workshop")?.addEventListener("click", () => {
			closeModal(modalRoot);
			onLeaveWorkshop?.();
		});
	}
	renderWorkshop();
}
function openEventModal(modalRoot, runState, eventDef, onComplete) {
	modalRoot.classList.remove("hidden");
	const choicesHtml = eventDef.choices.map((c, idx) => {
		return `
        <button type="button" class="btn-parchment event-choice-btn" data-choice-idx="${idx}" ${!(!c.condition || c.condition(runState)) ? "disabled" : ""}>
          👉 ${c.label}
        </button>
      `;
	}).join("");
	modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-card">
        <div class="modal-header">
          <h3>❓ ${eventDef.title}</h3>
        </div>
        <div class="modal-body">
          <p class="event-narrative-text">${eventDef.text}</p>
          <div class="event-choices-stack" id="event-choices-box">
            ${choicesHtml}
          </div>
          <div id="event-outcome-box" class="hidden"></div>
        </div>
      </div>
    </div>
  `;
	modalRoot.querySelectorAll("[data-choice-idx]").forEach((btn) => {
		btn.addEventListener("click", () => {
			const idx = Number(btn.getAttribute("data-choice-idx"));
			const res = resolveEventChoice(runState, eventDef.id, idx);
			const choicesBox = modalRoot.querySelector("#event-choices-box");
			const outcomeBox = modalRoot.querySelector("#event-outcome-box");
			if (choicesBox) choicesBox.classList.add("hidden");
			if (outcomeBox) {
				outcomeBox.classList.remove("hidden");
				outcomeBox.innerHTML = `
          <div class="event-outcome-msg">${res.message}</div>
          <button type="button" class="btn-parchment" id="btn-event-continue">Pokračovat na mapu ➡</button>
        `;
				outcomeBox.querySelector("#btn-event-continue")?.addEventListener("click", () => {
					closeModal(modalRoot);
					onComplete?.();
				});
			}
		});
	});
}
function openRunEndModal(modalRoot, runState, isVictory, callbacks = {}) {
	modalRoot.classList.remove("hidden");
	modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-card modal-lg">
        <div class="modal-header">
          <h3>${isVictory ? "🏆 SLAVNÉ VÍTĚZSTVÍ VENCI ČESNEKÁČE!" : "⚰️ VENCA ČESNEKÁČ PADL V BOJI"}</h3>
        </div>
        <div class="modal-body">
          <p class="modal-lead">
            ${isVictory ? "Pán temnot hrabě Drákula dostal dubovým kolíkem přímo do svého černého srdce! Hrad je vyčištěn a Venca míří na zaslouženou dvanáctku!" : "Temné upíří hordy tentokrát Vencu udolaly. Ale moravský česnek ještě neřekl poslední slovo!"}
          </p>
          <div class="summary-stats-grid">
            <div class="stat-pill">Dosažený akt: <strong>${runState.act} / 3</strong></div>
            <div class="stat-pill">Vyhrané bitvy: <strong>${runState.stats.battlesWon}</strong></div>
            <div class="stat-pill">Poraženo upírů: <strong>${runState.stats.enemiesKilled || 0}</strong></div>
            <div class="stat-pill">Rozdané poškození: <strong>${runState.stats.totalDamageDealt} DMG</strong></div>
            <div class="stat-pill">Friendly Fire zásahy: <strong>${runState.stats.totalFriendlyFire}</strong></div>
            <div class="stat-pill">Odehrané tahy: <strong>${runState.stats.totalTurns}</strong></div>
            <div class="stat-pill">Seed běhu: <strong>${runState.seed}</strong></div>
          </div>

          <div class="modal-footer-actions">
            <button type="button" class="btn-parchment" id="btn-retry-same-seed">
              🔁 Opakovat stejný seed (${runState.seed})
            </button>
            <button type="button" class="btn-parchment btn-execute-ready" id="btn-new-random-run">
              ⚔️ Nová výprava (nový seed)
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
	modalRoot.querySelector("#btn-retry-same-seed")?.addEventListener("click", () => {
		closeModal(modalRoot);
		callbacks.onRetrySeed?.(runState.seed);
	});
	modalRoot.querySelector("#btn-new-random-run")?.addEventListener("click", () => {
		closeModal(modalRoot);
		const nextSeed = `VENCA-${Math.floor(1e3 + Math.random() * 9e3)}`;
		callbacks.onNewRun?.(nextSeed);
	});
}
function openCastleArchiveModal(modalRoot, appState, onUpdate = null, onSelect = null) {
	modalRoot.classList.remove("hidden");
	const meta = appState.metaStats || {
		fangs: 0,
		unlockedLoadouts: ["classic"],
		selectedLoadout: "classic"
	};
	const fangs = meta.fangs || 0;
	const unlocked = meta.unlockedLoadouts || ["classic"];
	const selected = meta.selectedLoadout || "classic";
	const maxCurse = meta.maxCurseUnlocked || ((meta.victories || 0) > 0 ? 1 : 0);
	const selectedCurse = meta.selectedCurse || 0;
	const loadoutCardsHtml = Object.values(STARTING_LOADOUTS).map((loadout) => {
		const isUnlocked = unlocked.includes(loadout.id);
		const isSelected = selected === loadout.id;
		const canAfford = fangs >= loadout.cost;
		const tilesBadgesHtml = loadout.deck.map((d) => {
			const def = getHeroTileDefinition(d.id, 0);
			return `<span class="loadout-tile-pill" title="${def.description}"><strong>${def.name}</strong> (${def.dmg} DMG)</span>`;
		}).join(" ");
		let actionBtnHtml = "";
		if (isSelected) actionBtnHtml = `<span class="badge-active-loadout">✅ Aktivní arzenál</span>`;
		else if (isUnlocked) actionBtnHtml = `<button type="button" class="btn-parchment btn-sm btn-select-loadout" data-select-loadout="${loadout.id}">Zvolit pro další běh</button>`;
		else actionBtnHtml = `<button type="button" class="btn-parchment btn-sm btn-unlock-loadout" data-unlock-loadout="${loadout.id}" ${canAfford ? "" : "disabled"} title="${canAfford ? "Odemknout za tesáky" : "Nedostatek tesáků"}">Odemknout za 🦷 ${loadout.cost}</button>`;
		return `
      <div class="archive-loadout-card ${isSelected ? "loadout-card-selected" : ""} ${!isUnlocked ? "loadout-card-locked" : ""}">
        <div class="loadout-card-header">
          <span class="loadout-card-icon">${loadout.icon}</span>
          <div>
            <h4 class="loadout-card-title">${loadout.name} <span class="badge-hp">❤️ ${loadout.maxHp || 20} HP</span></h4>
            <div class="loadout-card-epithet">${loadout.epithet}</div>
          </div>
        </div>
        <p class="loadout-card-desc">${loadout.description}</p>
        <div class="loadout-card-abilities" style="margin: 0.35rem 0; font-size: 0.85rem; line-height: 1.35; color: #e2e8f0;">
          ${loadout.bumpName ? `<div style="margin-bottom: 0.2rem;"><strong style="color: #f59e0b;">💥 ${loadout.bumpName}:</strong> ${loadout.bumpDesc}</div>` : ""}
          ${loadout.comboName ? `<div><strong style="color: #38bdf8;">✨ 3-Kombo:</strong> ${loadout.comboDesc}</div>` : ""}
        </div>
        <div class="loadout-card-deck">
          <strong>Startovní destičky:</strong>
          <div class="loadout-deck-pills">${tilesBadgesHtml}</div>
        </div>
        <div class="loadout-card-action">
          ${actionBtnHtml}
        </div>
      </div>
    `;
	}).join("");
	const cursesCardsHtml = maxCurse === 0 ? `<div class="curse-locked-hint">🔒 Kletby noci se odemknou po tvém prvním vítězství nad Hrabětem Drákulou v aktu 3!</div>` : `<div class="archive-curses-grid">` + NIGHT_CURSES.map((curse) => {
		const isUnlocked = curse.level <= maxCurse;
		const isSelected = selectedCurse === curse.level;
		let actionBtn = "";
		if (isSelected) actionBtn = `<span class="badge-active-curse">✅ Aktivní kletba</span>`;
		else if (isUnlocked) actionBtn = `<button type="button" class="btn-parchment btn-sm btn-select-curse" data-select-curse="${curse.level}">Aktivovat pro další běh</button>`;
		else actionBtn = `<span class="curse-card-locked-text">🔒 Vyžaduje pokoření Kletby ${curse.level - 1}</span>`;
		return `
          <div class="archive-curse-card ${isSelected ? "curse-card-selected" : ""} ${!isUnlocked ? "curse-card-locked" : ""}">
            <div class="curse-card-header">
              <span class="curse-card-icon">${curse.icon}</span>
              <div>
                <h5 class="curse-card-title">${curse.name}</h5>
                <div class="curse-multiplier">🦷 Násobič tesáků: <strong>${curse.fangMultiplier}×</strong></div>
              </div>
            </div>
            <p class="curse-card-desc">${curse.description}</p>
            <div class="curse-card-action">${actionBtn}</div>
          </div>
        `;
	}).join("") + `</div>`;
	const hallOfFame = meta.hallOfFame || [];
	modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-card modal-lg">
        <div class="modal-header">
          <h3>🏛️ Hradní archiv a zbrojnice</h3>
          <button type="button" class="btn-parchment btn-xs" id="btn-modal-close">✖ Zavřít</button>
        </div>
        <div class="modal-body archive-body">
          <div class="archive-treasury-banner">
            <span class="treasury-icon">🦷</span>
            <div class="treasury-info">
              <strong>Tvoje nasbírané Upíří tesáky: <span class="fangs-count">${fangs}</span></strong>
              <div class="treasury-hint">Získávej tesáky za likvidaci upírů, elitních drábů a bossů a odemykej nové startovní arzenály!</div>
            </div>
          </div>

          <h4 class="archive-section-title">Startovní arzenály Venci Česnekáče</h4>
          <div class="archive-loadouts-grid">
            ${loadoutCardsHtml}
          </div>

          <h4 class="archive-section-title">🌙 Kletby noci (Stupně obtížnosti I–V)</h4>
          ${cursesCardsHtml}

          <h4 class="archive-section-title">🏆 Síň slávy Vencových vítězství</h4>
          ${hallOfFame.length === 0 ? `<div class="curse-locked-hint">Zatím žádný zápis v Síni slávy. Pokoř Hraběte Drákulu v aktu 3 a zapiš svůj triumf!</div>` : `<div class="hall-of-fame-table-wrap">
        <table class="hall-of-fame-table">
          <thead>
            <tr>
              <th>Datum</th>
              <th>Kletba noci</th>
              <th>Výstroj</th>
              <th>Bitev</th>
              <th>DMG</th>
              <th>Zlato</th>
            </tr>
          </thead>
          <tbody>
            ${hallOfFame.map((entry) => {
		const cDef = getCurseDefinition(entry.curseLevel);
		const lDef = STARTING_LOADOUTS[entry.loadoutId] || STARTING_LOADOUTS.classic;
		return `
                <tr>
                  <td>${entry.date}</td>
                  <td>${cDef.icon} ${cDef.shortName}</td>
                  <td>${lDef.icon} ${lDef.name}</td>
                  <td>${entry.battlesWon}</td>
                  <td>${entry.damageDealt}</td>
                  <td>💰 ${entry.gold}</td>
                </tr>
              `;
	}).join("")}
          </tbody>
        </table>
       </div>`}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-parchment" id="btn-archive-done">Zpět k výpravě</button>
        </div>
      </div>
    </div>
  `;
	modalRoot.querySelector("#btn-modal-close")?.addEventListener("click", () => {
		closeModal(modalRoot);
	});
	modalRoot.querySelector("#btn-archive-done")?.addEventListener("click", () => {
		closeModal(modalRoot);
	});
	modalRoot.querySelectorAll("[data-unlock-loadout]").forEach((btn) => {
		btn.addEventListener("click", () => {
			const lId = btn.getAttribute("data-unlock-loadout");
			const loadout = STARTING_LOADOUTS[lId];
			if (loadout && meta.fangs >= loadout.cost && !meta.unlockedLoadouts.includes(lId)) {
				meta.fangs -= loadout.cost;
				meta.unlockedLoadouts.push(lId);
				meta.selectedLoadout = lId;
				try {
					localStorage.setItem("lovec_upiru_meta_v1", JSON.stringify(meta));
				} catch {}
				onUpdate?.();
				openCastleArchiveModal(modalRoot, appState, onUpdate, onSelect);
			}
		});
	});
	modalRoot.querySelectorAll("[data-select-loadout]").forEach((btn) => {
		btn.addEventListener("click", () => {
			const lId = btn.getAttribute("data-select-loadout");
			meta.selectedLoadout = lId;
			try {
				localStorage.setItem("lovec_upiru_meta_v1", JSON.stringify(meta));
			} catch {}
			onSelect?.(lId);
			onUpdate?.();
			openCastleArchiveModal(modalRoot, appState, onUpdate, onSelect);
		});
	});
	modalRoot.querySelectorAll("[data-select-curse]").forEach((btn) => {
		btn.addEventListener("click", () => {
			const cLvl = Number(btn.getAttribute("data-select-curse"));
			meta.selectedCurse = cLvl;
			try {
				localStorage.setItem("lovec_upiru_meta_v1", JSON.stringify(meta));
			} catch {}
			onUpdate?.();
			openCastleArchiveModal(modalRoot, appState, onUpdate, onSelect);
		});
	});
}
var keyHandler = null;
function initKeyboardInput(callbacks = {}) {
	if (keyHandler) window.removeEventListener("keydown", keyHandler);
	keyHandler = (e) => {
		if (e.key === "Escape" || e.key === "Esc") {
			e.preventDefault();
			callbacks.onEscape?.();
			return;
		}
		if (callbacks.isInputLocked?.()) return;
		const tag = e.target && e.target.tagName || "";
		if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
		const key = e.key.toLowerCase();
		if (key === "a" || e.key === "ArrowLeft") {
			e.preventDefault();
			callbacks.onStep?.(-1);
		} else if (key === "d" || e.key === "ArrowRight") {
			e.preventDefault();
			callbacks.onStep?.(1);
		} else if (key === "w" || e.key === "ArrowUp") {
			e.preventDefault();
			callbacks.onTurn?.();
		} else if (key === "s" || e.key === "ArrowDown") {
			e.preventDefault();
			callbacks.onWait?.();
		} else if (e.code === "Space") {
			e.preventDefault();
			callbacks.onExecuteQueue?.();
		} else if (e.key === "Backspace") {
			if (e.repeat) return;
			e.preventDefault();
			callbacks.onPopQueue?.();
		} else if (/^[1-9]$/.test(e.key)) {
			e.preventDefault();
			const idx = Number(e.key) - 1;
			callbacks.onHotkeyTile?.(idx);
		} else if (key === "f1" || e.key === "F1") {
			e.preventDefault();
			callbacks.onOpenRules?.();
		}
	};
	window.addEventListener("keydown", keyHandler);
}
function createBattleActions(deps) {
	const { appState, renderAll, appendEventsToLog, startNewRun, completeCurrentNodeAndShowMap } = deps;
	async function finishPlayerAction(state, res, turnBefore, extraCd = 0) {
		const boardContainer = document.getElementById("center-stage");
		appendEventsToLog(state, res.events, turnBefore);
		await playEngineEvents(boardContainer, res.events, appState.settings.animSpeed);
		clearTransientCorpses(state);
		renderAll();
		if (!res.ok || res.freeTurn || checkBattleOutcome(state) !== "playing") {
			appState.isAnimating = false;
			renderAll();
			await checkPostActionBattleState();
			return;
		}
		const enemyEvents = [];
		endPlayerTurn(state, enemyEvents, extraCd);
		appendEventsToLog(state, enemyEvents, turnBefore);
		await playEngineEvents(boardContainer, enemyEvents, appState.settings.animSpeed);
		clearTransientCorpses(state);
		appState.isAnimating = false;
		renderAll();
		await checkPostActionBattleState();
	}
	async function handlePlayerStep(dir) {
		if (appState.isAnimating || !appState.battleState) return;
		appState.isAnimating = true;
		hideTooltip();
		const state = appState.battleState;
		const turnBefore = state.turn;
		await finishPlayerAction(state, playerStepNoEnd(state, dir), turnBefore);
	}
	async function handlePlayerTurn() {
		if (appState.isAnimating || !appState.battleState) return;
		appState.isAnimating = true;
		hideTooltip();
		const state = appState.battleState;
		const turnBefore = state.turn;
		await finishPlayerAction(state, playerTurnAroundNoEnd(state), turnBefore);
	}
	async function handlePlayerWait() {
		if (appState.isAnimating || !appState.battleState) return;
		appState.isAnimating = true;
		hideTooltip();
		const state = appState.battleState;
		const turnBefore = state.turn;
		const res = playerWaitNoEnd(state);
		await finishPlayerAction(state, res, turnBefore, res.extraCd || 0);
	}
	async function handleSelectTile(instanceId) {
		if (appState.isAnimating || !appState.battleState) return;
		appState.isAnimating = true;
		hideTooltip();
		const state = appState.battleState;
		const turnBefore = state.turn;
		await finishPlayerAction(state, playerEnqueueTileNoEnd(state, instanceId), turnBefore);
	}
	function handleRemoveQueueSlot(slotIdx) {
		if (appState.isAnimating || !appState.battleState) return;
		hideTooltip();
		const res = playerRemoveFromQueue(appState.battleState, slotIdx);
		if (res.ok) appendEventsToLog(appState.battleState, res.events);
		SFX.queueRemove();
		renderAll();
	}
	function handleReorderQueue(fromIdx, toIdx) {
		if (appState.isAnimating || !appState.battleState) return;
		hideTooltip();
		const res = playerReorderQueue(appState.battleState, fromIdx, toIdx);
		if (res.ok) {
			appendEventsToLog(appState.battleState, res.events);
			SFX.queueInsert();
			renderAll();
		}
	}
	async function processEnemyTurn(comboLength = 1) {
		const state = appState.battleState;
		if (!state) return;
		const boardContainer = document.getElementById("center-stage");
		const turnBefore = state.turn;
		const endEvents = finalizeQueueExecution(state, comboLength);
		appendEventsToLog(state, endEvents, turnBefore);
		await playEngineEvents(boardContainer, endEvents, appState.settings.animSpeed);
		clearTransientCorpses(state);
		renderAll();
	}
	async function executeQueue() {
		const state = appState.battleState;
		if (appState.isAnimating || !state || state.queue.length === 0 || state.status !== "playing") return;
		appState.isAnimating = true;
		hideTooltip();
		const boardContainer = document.getElementById("center-stage");
		const queueSnapshot = [...state.queue];
		const comboLength = queueSnapshot.length;
		const turnBefore = state.turn;
		const stunned = consumeHeroStun(state);
		if (stunned) {
			appendEventsToLog(state, stunned.events, turnBefore);
			await playEngineEvents(boardContainer, stunned.events, appState.settings.animSpeed);
			clearTransientCorpses(state);
			renderAll();
			const enemyEvents = [];
			endPlayerTurn(state, enemyEvents);
			appendEventsToLog(state, enemyEvents, turnBefore);
			await playEngineEvents(boardContainer, enemyEvents, appState.settings.animSpeed);
			clearTransientCorpses(state);
			appState.isAnimating = false;
			renderAll();
			await checkPostActionBattleState();
			return;
		}
		for (let i = 0; i < queueSnapshot.length; i++) {
			if (state.hero.hp <= 0) break;
			const tileInstanceId = queueSnapshot[i];
			const nextInstanceId = queueSnapshot[i + 1] || null;
			const stepEvents = executeQueuedTileStep(state, tileInstanceId, i, comboLength, nextInstanceId);
			appendEventsToLog(state, stepEvents, turnBefore);
			await playEngineEvents(boardContainer, stepEvents, appState.settings.animSpeed);
			clearTransientCorpses(state);
			renderAll();
			await sleep(ANIMATION_TIMINGS.QUEUE_STEP_MS, appState.settings.animSpeed);
			if (checkBattleOutcome(state) !== "playing") break;
		}
		await sleep(ANIMATION_TIMINGS.TURN_TRANSITION_MS, appState.settings.animSpeed);
		await processEnemyTurn(comboLength);
		appState.isAnimating = false;
		renderAll();
		await checkPostActionBattleState();
	}
	async function handleExecuteOrPrepareQueue() {
		const state = appState.battleState;
		if (appState.isAnimating || !state || state.queue.length === 0 || state.status !== "playing") return;
		await executeQueue();
	}
	function updateMetaStatsFromBattle(battleState, runState, won) {
		if (won) {
			runState.stats.battlesWon += 1;
			if (battleState.isElite) runState.stats.elitesDefeated += 1;
		}
		runState.stats.totalDamageDealt += battleState.stats.damageDealt || 0;
		runState.stats.totalFriendlyFire += battleState.stats.friendlyFireCount || 0;
		runState.stats.totalTurns += battleState.stats.turnsTaken || 0;
		runState.stats.enemiesKilled = (runState.stats.enemiesKilled || 0) + (battleState.stats.enemiesKilled || 0);
		let battleFangs = (battleState.stats.enemiesKilled || 0) * 1;
		if (won) {
			if (battleState.isElite) battleFangs += 3;
			if (battleState.isBoss) battleFangs += 10;
		}
		const curseDef = getCurseDefinition(runState.curseLevel || 0);
		if (curseDef.fangMultiplier > 1) battleFangs = Math.round(battleFangs * curseDef.fangMultiplier);
		appState.metaStats.fangs = (appState.metaStats.fangs || 0) + battleFangs;
		battleState.fangsEarned = battleFangs;
		appState.metaStats.totalKills = (appState.metaStats.totalKills || 0) + (battleState.stats.enemiesKilled || 0);
		appState.metaStats.bestAct = Math.max(appState.metaStats.bestAct || 1, runState.act);
		try {
			localStorage.setItem("lovec_upiru_meta_v1", JSON.stringify(appState.metaStats));
		} catch {}
	}
	async function checkPostActionBattleState() {
		const state = appState.battleState;
		const run = appState.runState;
		if (!state || !run) return;
		const modalRoot = document.getElementById("modal-root");
		if (state.status === "lost" || state.hero.hp <= 0) {
			SFX.defeat();
			run.heroHp = 0;
			run.status = "defeat";
			updateMetaStatsFromBattle(state, run, false);
			openRunEndModal(modalRoot, run, false, {
				onRetrySeed: (seed) => startNewRun(seed),
				onNewRun: (seed) => startNewRun(seed)
			});
			return;
		}
		if (state.status === "won") {
			SFX.victory();
			run.heroHp = state.hero.hp;
			if (run.talismans.includes("sacred_flask")) {
				run.heroHp = Math.min(run.heroMaxHp, run.heroHp + 1);
				state.hero.hp = run.heroHp;
			}
			const ffBonusGold = run.talismans.includes("sexton_keyring") ? (state.stats.friendlyFireCount || 0) * 3 : 0;
			run.gold += (state.goldReward || 18) + ffBonusGold;
			updateMetaStatsFromBattle(state, run, true);
			if (state.isBoss) {
				run.stats.bossesDefeated += 1;
				if (advanceActIfBossDefeated(run).victory) {
					appState.metaStats.victories = (appState.metaStats.victories || 0) + 1;
					const currentCurse = run.curseLevel || 0;
					const nextCurse = Math.min(5, currentCurse + 1);
					if (nextCurse > (appState.metaStats.maxCurseUnlocked || 0)) appState.metaStats.maxCurseUnlocked = nextCurse;
					if (!appState.metaStats.hallOfFame) appState.metaStats.hallOfFame = [];
					appState.metaStats.hallOfFame.unshift({
						date: (/* @__PURE__ */ new Date()).toLocaleDateString("cs-CZ"),
						curseLevel: currentCurse,
						loadoutId: run.loadoutId || "classic",
						battlesWon: run.stats.battlesWon,
						damageDealt: run.stats.totalDamageDealt,
						gold: run.gold
					});
					if (appState.metaStats.hallOfFame.length > 20) appState.metaStats.hallOfFame.pop();
					try {
						localStorage.setItem("lovec_upiru_meta_v1", JSON.stringify(appState.metaStats));
					} catch {}
					openRunEndModal(modalRoot, run, true, {
						onRetrySeed: (seed) => startNewRun(seed),
						onNewRun: (seed) => startNewRun(seed)
					});
					return;
				}
				appState.metaStats.bestAct = Math.max(appState.metaStats.bestAct || 1, run.act);
				try {
					localStorage.setItem("lovec_upiru_meta_v1", JSON.stringify(appState.metaStats));
				} catch {}
				openBattleRewardModal(modalRoot, run, generateBattleRewardChoices(run, true), () => {
					appState.battleState = null;
					appState.screen = "map";
					renderAll();
				});
				return;
			}
			openBattleRewardModal(modalRoot, run, generateBattleRewardChoices(run, state.isElite), () => {
				completeCurrentNodeAndShowMap();
			});
		}
	}
	return {
		handlePlayerStep,
		handlePlayerTurn,
		handlePlayerWait,
		handleSelectTile,
		handleRemoveQueueSlot,
		handleReorderQueue,
		handleExecuteOrPrepareQueue
	};
}
var META_STORAGE_KEY = "lovec_upiru_meta_v1";
var loadedMeta = loadMetaStats();
var appState = {
	screen: "battle",
	runState: null,
	battleState: null,
	isAnimating: false,
	hoveredEnemyId: null,
	hoveredTileId: null,
	comboPreviewActive: false,
	hoveredExecute: false,
	hoveredQueueSlot: null,
	metaStats: loadedMeta,
	settings: {
		animSpeed: loadedMeta.animSpeed ?? 1,
		soundEnabled: loadedMeta.soundEnabled ?? true,
		currentSeed: loadedMeta.lastSeed || "VENCA-1899"
	}
};
var actions = null;
var bootToken = 0;
function startGame() {
	return bootstrap(++bootToken);
}
function loadMetaStats() {
	try {
		const raw = localStorage.getItem(META_STORAGE_KEY);
		if (raw) {
			const p = JSON.parse(raw);
			return {
				fangs: 0,
				unlockedLoadouts: ["classic", "honza"],
				selectedLoadout: "classic",
				...p,
				unlockedLoadouts: Array.isArray(p.unlockedLoadouts) ? p.unlockedLoadouts : ["classic"]
			};
		}
	} catch {}
	return {
		bestAct: 1,
		victories: 0,
		totalKills: 0,
		lastSeed: "VENCA-1899",
		fangs: 0,
		unlockedLoadouts: ["classic", "honza"],
		selectedLoadout: "classic"
	};
}
function saveMetaStats() {
	try {
		localStorage.setItem(META_STORAGE_KEY, JSON.stringify(appState.metaStats));
	} catch {}
}
async function bootstrap(token) {
	initTooltips();
	setSoundEnabled(appState.settings.soundEnabled);
	const loadingBar = document.getElementById("loading-progress-fill");
	const loadingText = document.getElementById("loading-progress-text");
	const loadingScreen = document.getElementById("loading-overlay");
	await initAssets((loaded, total, key) => {
		if (token !== bootToken) return;
		const pct = total > 0 ? Math.round(loaded / total * 100) : 100;
		if (loadingBar) loadingBar.style.width = `${pct}%`;
		if (loadingText) loadingText.textContent = `Načítám pergameny a postavy (${loaded}/${total}): ${key}...`;
	});
	if (token !== bootToken) return;
	if (loadingScreen) loadingScreen.classList.add("hidden");
	actions = createBattleActions({
		appState,
		renderAll,
		appendEventsToLog,
		startNewRun,
		completeCurrentNodeAndShowMap
	});
	if (!window.__lovecAssetListener) {
		window.__lovecAssetListener = true;
		window.addEventListener("lovec-assets", () => {
			if (!appState.isAnimating && appState.battleState) renderAll();
		});
	}
	initKeyboardInput({
		isInputLocked: () => appState.isAnimating || appState.screen !== "battle" || !document.getElementById("modal-root")?.classList.contains("hidden"),
		onStep: (dir) => actions.handlePlayerStep(dir),
		onTurn: () => actions.handlePlayerTurn(),
		onWait: () => actions.handlePlayerWait(),
		onExecuteQueue: () => {
			appState.comboPreviewActive = false;
			actions.handleExecuteOrPrepareQueue();
		},
		onHoverExecute: (hovered) => {
			if (appState.hoveredExecute !== hovered) {
				appState.hoveredExecute = hovered;
				renderBattleBoardOnly();
			}
		},
		onToggleComboPreview: () => {
			appState.comboPreviewActive = !appState.comboPreviewActive;
			renderAll();
		},
		onPopQueue: () => {
			if (appState.battleState && appState.battleState.queue.length > 0) actions.handleRemoveQueueSlot(appState.battleState.queue.length - 1);
		},
		onHotkeyTile: (idx) => {
			const tile = appState.battleState?.hand[idx];
			if (tile) actions.handleSelectTile(tile.instanceId);
		},
		onOpenRules: () => openRulesModal(document.getElementById("modal-root")),
		onEscape: () => {
			const modalRoot = document.getElementById("modal-root");
			if (modalRoot && !modalRoot.classList.contains("hidden")) {
				const closeBtn = modalRoot.querySelector("#btn-modal-close, #btn-leave-pub, #btn-leave-workshop, #btn-skip-reward, #btn-treasure-done, #btn-event-continue");
				if (closeBtn) closeBtn.click();
				else closeModal(modalRoot);
			} else if (appState.screen === "map" && appState.battleState && appState.battleState.status === "playing") {
				appState.screen = "battle";
				renderAll();
			}
		}
	});
	startNewRun(appState.metaStats.lastSeed || "VENCA-1899");
}
function startNewRun(seedInput = "VENCA-1899") {
	appState.settings.currentSeed = seedInput;
	appState.metaStats.lastSeed = seedInput;
	saveMetaStats();
	appState.runState = createNewRun(seedInput, appState.metaStats.selectedLoadout || "classic", appState.metaStats.selectedCurse || 0);
	const firstNode = appState.runState.map.nodes[0];
	enterMapNode(firstNode);
}
function enterMapNode(node) {
	const run = appState.runState;
	const modalRoot = document.getElementById("modal-root");
	run.currentNodeId = node.id;
	if (node.type === NODE_TYPES.BATTLE || node.type === NODE_TYPES.ELITE || node.type === NODE_TYPES.BOSS) {
		appState.screen = "battle";
		appState.battleState = createBattleState({
			seed: `${run.seed}_${node.id}`,
			rng: run.rng,
			encounterId: node.encounterId,
			heroMaxHp: run.heroMaxHp,
			heroHp: run.heroHp,
			deck: run.deck,
			talismans: run.talismans,
			curseLevel: run.curseLevel || 0,
			hunterId: run.hunterId || run.loadoutId || "classic"
		});
		renderAll();
		return;
	}
	if (node.type === NODE_TYPES.PUB) {
		renderAll();
		openPubModal(modalRoot, run, () => {
			completeCurrentNodeAndShowMap();
		});
		return;
	}
	if (node.type === NODE_TYPES.WORKSHOP) {
		renderAll();
		openWorkshopModal(modalRoot, run, () => {
			completeCurrentNodeAndShowMap();
		});
		return;
	}
	if (node.type === NODE_TYPES.EVENT) {
		renderAll();
		openEventModal(modalRoot, run, pickRandomEvent(run), () => {
			completeCurrentNodeAndShowMap();
		});
		return;
	}
	if (node.type === NODE_TYPES.TREASURE) {
		renderAll();
		openCastleArchiveModal(modalRoot, run, () => {
			completeCurrentNodeAndShowMap();
		});
	}
}
function completeCurrentNodeAndShowMap() {
	const run = appState.runState;
	if (run.currentNodeId && !run.completedNodeIds.includes(run.currentNodeId)) run.completedNodeIds.push(run.currentNodeId);
	appState.battleState = null;
	appState.screen = "map";
	renderAll();
}
function appendEventsToLog(state, events = [], turnOverride = null) {
	if (!state || !state.log || !Array.isArray(events)) return;
	const turnTag = `[Kolo ${turnOverride ?? state.turn}]`;
	for (const ev of events) if (ev.type === "log" && ev.text) {
		const formatted = ev.text.startsWith("[Kolo") ? ev.text : `${turnTag} ${ev.text}`;
		state.log.push(formatted);
	}
}
function renderAll() {
	const hudRoot = document.getElementById("hud-root");
	const centerStage = document.getElementById("center-stage");
	const bottomRoot = document.getElementById("bottom-root");
	const logRoot = document.getElementById("log-root");
	const modalRoot = document.getElementById("modal-root");
	renderHud(hudRoot, appState.runState, appState.battleState, {
		metaStats: appState.metaStats,
		onOpenArchive: () => {
			openCastleArchiveModal(modalRoot, appState, () => renderAll(), (loadoutId) => {
				appState.metaStats.selectedLoadout = loadoutId;
				saveMetaStats();
				renderAll();
			});
		},
		onToggleMap: () => {
			if (appState.screen === "map" && appState.battleState) appState.screen = "battle";
			else appState.screen = "map";
			renderAll();
		},
		onOpenRules: () => openRulesModal(modalRoot),
		onOpenSettings: () => openSettingsModal(modalRoot, appState.settings, appState.metaStats, {
			onChangeAnimSpeed: (val) => {
				appState.settings.animSpeed = val;
				appState.metaStats.animSpeed = val;
				saveMetaStats();
			},
			onToggleSound: (enabled) => {
				appState.settings.soundEnabled = enabled;
				appState.metaStats.soundEnabled = enabled;
				saveMetaStats();
				setSoundEnabled(enabled);
			},
			onStartNewRun: (seed) => startNewRun(seed)
		})
	});
	if (appState.screen === "map" || !appState.battleState) {
		renderMapScreen(centerStage, appState.runState, {
			canReturnToBattle: Boolean(appState.battleState && appState.battleState.status === "playing"),
			onReturnToBattle: () => {
				appState.screen = "battle";
				renderAll();
			},
			onSelectNode: (node) => {
				if (appState.battleState && appState.battleState.status === "playing") return;
				enterMapNode(node);
			}
		});
		if (bottomRoot) bottomRoot.innerHTML = "";
		if (logRoot) logRoot.innerHTML = "";
		return;
	}
	renderBattleBoard(centerStage, appState.battleState, {
		hoveredEnemyId: appState.hoveredEnemyId,
		hoveredTileId: appState.hoveredTileId,
		comboPreviewActive: appState.comboPreviewActive,
		hoveredExecute: appState.hoveredExecute,
		hoveredQueueSlot: appState.hoveredQueueSlot
	}, {
		onRemoveQueueSlot: (slotIdx) => actions.handleRemoveQueueSlot(slotIdx),
		onReorderQueue: (fromIdx, toIdx) => actions.handleReorderQueue(fromIdx, toIdx),
		onHoverQueueSlot: (slotIdx) => {
			if (appState.hoveredQueueSlot !== slotIdx) {
				appState.hoveredQueueSlot = slotIdx;
				renderBattleBoardOnly();
			}
		},
		onHoverQueueSlot: (slotIdx) => {
			if (appState.hoveredQueueSlot !== slotIdx) {
				appState.hoveredQueueSlot = slotIdx;
				renderBattleBoardOnly();
			}
		},
		onHoverEnemy: (enemyId) => {
			if (appState.hoveredEnemyId !== enemyId) {
				appState.hoveredEnemyId = enemyId;
				renderBattleBoardOnly();
			}
		}
	});
	renderTileBar(bottomRoot, appState.battleState, {
		isComboPreviewActive: appState.comboPreviewActive,
		onStep: (dir) => actions.handlePlayerStep(dir),
		onTurn: () => actions.handlePlayerTurn(),
		onWait: () => actions.handlePlayerWait(),
		onExecuteQueue: () => {
			appState.comboPreviewActive = false;
			actions.handleExecuteOrPrepareQueue();
		},
		onHoverExecute: (hovered) => {
			if (appState.hoveredExecute !== hovered) {
				appState.hoveredExecute = hovered;
				renderBattleBoardOnly();
			}
		},
		onToggleComboPreview: () => {
			appState.comboPreviewActive = !appState.comboPreviewActive;
			renderAll();
		},
		onSelectTile: (instanceId) => actions.handleSelectTile(instanceId),
		onHoverTile: (instanceId) => {
			if (appState.hoveredTileId !== instanceId) {
				appState.hoveredTileId = instanceId;
				renderBattleBoardOnly();
			}
		}
	});
	renderChronicleLog(logRoot, appState.battleState, () => {
		openFullLogModal(modalRoot, appState.battleState?.log || []);
	});
}
function renderBattleBoardOnly() {
	if (appState.screen !== "battle" || !appState.battleState) return;
	const centerStage = document.getElementById("center-stage");
	const uiState = {
		hoveredEnemyId: appState.hoveredEnemyId,
		hoveredTileId: appState.hoveredTileId,
		comboPreviewActive: appState.comboPreviewActive,
		hoveredExecute: appState.hoveredExecute,
		hoveredQueueSlot: appState.hoveredQueueSlot
	};
	if (!Boolean((uiState.comboPreviewActive || uiState.hoveredExecute || uiState.hoveredQueueSlot !== null) && appState.battleState.queue.length > 0) && refreshBoardOverlays(centerStage, appState.battleState, uiState)) return;
	renderBattleBoard(centerStage, appState.battleState, uiState, {
		onRemoveQueueSlot: (slotIdx) => actions.handleRemoveQueueSlot(slotIdx),
		onReorderQueue: (fromIdx, toIdx) => actions.handleReorderQueue(fromIdx, toIdx),
		onHoverQueueSlot: (slotIdx) => {
			if (appState.hoveredQueueSlot !== slotIdx) {
				appState.hoveredQueueSlot = slotIdx;
				renderBattleBoardOnly();
			}
		},
		onHoverEnemy: (enemyId) => {
			if (appState.hoveredEnemyId === enemyId) return;
			appState.hoveredEnemyId = enemyId;
			renderBattleBoardOnly();
		}
	});
}
function Home() {
	(0, import_react.useEffect)(() => {
		startGame();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "loading-overlay",
			className: "loading-overlay",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "loading-box",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "🧄 LOVEC UPÍRŮ" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Venca Česnekáč chystá dubové kolíky a hasičskou stříkačku..." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "loading-bar-track",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							id: "loading-progress-fill",
							className: "loading-bar-fill"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: "loading-progress-text",
						children: "Inicializuji hradní kroniku..."
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			id: "app-shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { id: "hud-root" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { id: "center-stage" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { id: "bottom-root" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { id: "log-root" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "modal-root",
			className: "hidden"
		})
	] });
}
//#endregion
export { Home as component };
