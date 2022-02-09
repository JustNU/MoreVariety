"use strict";

// THE FOLLOWING CODE MAY CAUSE BRAIN CANCER
// MAY GOD HAVE MERCY ON YOUR SOUL

class MoreVariety
{
	
	static ReplaceBotsController()
	{
		BotController.generateBot = function(bot, role)
		{
			// Constants
			const Config = require("../config/config.json");
			
			if (Config.DebugEnabled) {
				// replace tagged scavs (for testing, duh)
				if (role === "cursedassault") {
					role = "testyboi";
				}
				
				Logger.info("1 - " + role + " " + bot.Info.Settings.Role + " " + bot.Info.Settings.BotDifficulty);
			}
			
			// ScavVariety
			if (Config.ScavVariety.Enabled) {
				let raiderType = ["pmcbot"];
				let bossType = ["bossgluhar", "bosskilla", "bosskojaniy", "bosssanitar", "bossbully", "sectantpriest", "bosstagilla"];
				
				// add followerkilla to *gasp* killa
				if (role === "followerbully" && bot.Info.Settings.BotDifficulty === "hard" && Config.ScavVariety.NewCustomFollowers) {
					role = "followerkilla";
					bot.Info.Settings.BotDifficulty = "normal";
				}
				
				// terragroup specialist
				if (VFS.exists(`user/mods/Ereshkigal-TerragroupSpecialist/db/bots/tg_boss.json`)) {
					raiderType.push("tg_raiders")
					bossType.push("tg_boss")
					
					if (Config.ScavVariety.FollowersInRaiderBotPool) {
						raiderType.push("tg_followers")
					}
				}
			
				// change raiderType accordingly
				if (Config.ScavVariety.FollowersInRaiderBotPool) {
					raiderType.push("followerbully", "followergluharassault", "followergluharscout", "followergluharsecurity", "followerkojaniy", "followersanitar", "sectantwarrior")
					if (Config.ScavVariety.NewCustomFollowers) {
						raiderType.push("followerkilla")
					}
				}
				
				// da main thing
				if (role === "assault" || role === "pmcBot") {
					if (RandomUtil.getInt(0, 99) < Config.ScavVariety.RaiderSpawnChance) {
						bot.Info.Settings.Role = "pmcBot";
						role = RandomUtil.getArrayValue(raiderType);
					}
					if (RandomUtil.getInt(0, 99) < Config.ScavVariety.BossSpawnChance) {
						bot.Info.Settings.Role = "pmcBot";
						role = RandomUtil.getArrayValue(bossType);
					}
				}
			}
			
			// EnhancedPlayerScav
			if (bot.Info.Settings.Role === "playerscav" && Config.EnhancedPlayerScav.Enabled) {
				let pmcType = ["usec", "bear"];
				let raiderType = ["pmcbot", "followerbully", "followergluharassault", "followergluharscout", "followergluharsecurity", "followerkojaniy", "followersanitar", "sectantwarrior"];
				let bossType = ["bossgluhar", "bosskilla", "bosskojaniy", "bosssanitar", "bossbully", "sectantpriest"];
				
				bot.Info.Settings.Role = "assault";
				role = "assault";
				
				// change raiderType accordingly
				if (Config.ScavVariety.NewCustomFollowers) {
					raiderType.push("followerkilla")
				}
				
				// terragroup specialist comp
				if (VFS.exists(`user/mods/Ereshkigal-TerragroupSpecialist/db/bots/tg_boss.json`)) {
					raiderType.push("tg_raiders", "tg_followers")
					bossType.push("tg_boss")
				}
				
				// main juice
				if (RandomUtil.getInt(0, 99) < Config.EnhancedPlayerScav.RaiderAndFollowersChance) {
					role = RandomUtil.getArrayValue(raiderType);
				}
				if (RandomUtil.getInt(0, 99) < Config.EnhancedPlayerScav.PmcChance) {
					role = RandomUtil.getArrayValue(pmcType);
				}
				if (RandomUtil.getInt(0, 99) < Config.EnhancedPlayerScav.BossChance) {
					role = RandomUtil.getArrayValue(bossType);
				}
			} else if (bot.Info.Settings.Role === "playerscav") {
				bot.Info.Settings.Role = "assault";
				role = "assault";
			}
			
			// MoreFactions
			if (Config.MoreFactions.Enabled) {
				
				let ruafType = ["ruafassault", "ruafassault", "ruafrecon"];
				let untarType = ["untarfra", "untarger", "untarpol", "untareng"];
				let remnantType = ["remnantciv", "remnantpolice", "remnantspecops"];
				let remnantSpecOpsType = ["remnantspecopsgorka", "remnantspecopsomon"];
				
				// boss waves shenanigans
				if (role === "bosstest" && bot.Info.Settings.BotDifficulty === "easy") {
					role = "remnantspecops"
					bot.Info.Settings.Role = "pmcBot";
					bot.Info.Settings.BotDifficulty = "normal";
				} else if (role === "followertest" && bot.Info.Settings.BotDifficulty === "easy") {
					role = "remnant";
				} else if (role === "bosstest" && bot.Info.Settings.BotDifficulty === "normal") {
					role = "ruaf";
				} else if (role === "followertest" && bot.Info.Settings.BotDifficulty === "normal") {
					role = "ruaf";
				} else if (role === "bosstest" && bot.Info.Settings.BotDifficulty === "hard") {
					role = "untar";
				} else if (role === "followertest" && bot.Info.Settings.BotDifficulty === "hard") {
					role = "untar";
				}
				
				// decide bot role
				if (role === "ruaf") {
					bot.Info.Settings.Role = "pmcBot";
					bot.Info.Settings.BotDifficulty = "normal";
					role = RandomUtil.getArrayValue(ruafType);
					bot.Info.Side = "Savage"
				} else if (role === "remnant") {
					role = RandomUtil.getArrayValue(remnantType);
					bot.Info.Side = "Savage"
					bot.Info.Settings.Role = "pmcBot";
					bot.Info.Settings.BotDifficulty = "normal";
				} else if (role === "untar") {
					bot.Info.Settings.Role = "pmcBot";
					bot.Info.Settings.BotDifficulty = "normal";
					bot.Info.Side = "Savage"
					role = RandomUtil.getArrayValue(untarType);
				};
				
				if (role === "remnantspecops") {
					bot.Info.Side = "Savage"
					role = RandomUtil.getArrayValue(remnantSpecOpsType);
				};
			}
			
			if (Config.DebugEnabled) {
				// roll for testy boi
				if (role === "testyboi") {
					let testyboiroles = ["bosssanitar","sectantpriest"];
					
					role = RandomUtil.getArrayValue(testyboiroles)
				}
				
				Logger.info("2 - " + role + " " + bot.Info.Settings.Role + " " + bot.Info.Settings.BotDifficulty);
			}
			
			// generate bot
			const node = DatabaseServer.tables.bots.types[role.toLowerCase()];
			const levelResult = BotController.generateRandomLevel(node.experience.level.min, node.experience.level.max);

			bot.Info.Nickname = `${RandomUtil.getArrayValue(node.firstName)} ${RandomUtil.getArrayValue(node.lastName) || ""}`;
			bot.Info.experience = levelResult.exp;
			bot.Info.Level = levelResult.level;
			bot.Info.Settings.Experience = RandomUtil.getInt(node.experience.reward.min, node.experience.reward.max);
			bot.Info.Settings.StandingForKill = node.experience.standingForKill;
			bot.Info.Voice = RandomUtil.getArrayValue(node.appearance.voice);
			bot.Health = BotController.generateHealth(node.health);
			bot.Skills = BotController.generateSkills(node.skills);
			bot.Customization.Head = RandomUtil.getArrayValue(node.appearance.head);
			bot.Customization.Body = RandomUtil.getArrayValue(node.appearance.body);
			bot.Customization.Feet = RandomUtil.getArrayValue(node.appearance.feet);
			bot.Customization.Hands = RandomUtil.getArrayValue(node.appearance.hands);
			bot.Inventory = BotGenerator.generateInventory(node.inventory, node.chances, node.generation);
			
			//PMC sides (just in case)
			if (role === "usec") 
			{
				bot.Info.Side = "Usec"
			}
			if (role === "bear") 
			{
				bot.Info.Side = "Bear"
			}

			// add dogtag to PMC's
			if (role === "usec" || role === "bear")
			{
				bot = BotController.generateDogtag(bot);
			}
			if (role === "remnantpolice" || role === "remnantspecopsomon" || role === "remnantspecopsgorka" || role === "remnantciv")
			{
				bot = MoreVariety.generateCustomDogtag(bot, "RemnantDogtag");
			}
			if (role === "ruafassault" || role === "ruafrecon")
			{
				bot = MoreVariety.generateCustomDogtag(bot, "RUAFdogtag");
			}
			if (role === "untarfra" || role === "untarger" || role === "untarpol" || role === "untareng")
			{
				bot = MoreVariety.generateCustomDogtag(bot, "UNTARdogtag");
			}
			
			// Terragroup comp
			if (role === "tg_followers" || role === "tg_raiders"){
				bot.Info.Side = "Terragroup"
			}

			if (role === "tg_boss") {
				bot.Info.Level = 80
				bot.Info.Experience = 15006660
				bot.Info.Side = "Terragroup"
				bot.Inventory.items.push({
					_id: HashUtil.generate(),
					_tpl: "terragroupSpecialist_Blaze_Dogtags",
					parentId: bot.Inventory.equipment,
					slotId: "Dogtag",
					upd: {
						"Dogtag": {
							"AccountId": bot.aid,
							"ProfileId": bot._id,
							"Nickname": "Blaze",
							"Side": bot.Info.Side,
							"Level": bot.Info.Level,
							"Time": (new Date().toISOString()),
							"Status": "Killed by ",
							"KillerAccountId": "Unknown",
							"KillerProfileId": "Unknown",
							"KillerName": "Unknown",
							"WeaponName": "Unknown"
						}
					}
				})
			}
			
			// generate new bot ID
			bot = BotController.generateId(bot);

			// generate new inventory ID
			bot = InventoryHelper.generateInventoryID(bot);

			return bot;
		}
	}

	static generateCustomDogtag(bot, DogtagID)
    {
        bot.Inventory.items.push({
            _id: HashUtil.generate(),
            _tpl: DogtagID,
            parentId: bot.Inventory.equipment,
            slotId: "Dogtag",
            upd: {
                "Dogtag": {
                    "AccountId": bot.aid,
                    "ProfileId": bot._id,
                    "Nickname": bot.Info.Nickname,
                    "Side": bot.Info.Side,
                    "Level": bot.Info.Level,
                    "Time": (new Date().toISOString()),
                    "Status": "Killed by ",
                    "KillerAccountId": "Unknown",
                    "KillerProfileId": "Unknown",
                    "KillerName": "Unknown",
                    "WeaponName": "Unknown"
                }
            }
        });

        return bot;
    }
	
	static onLoadMod()
	{
		// Constants
		const db = `user/mods/MoreVariety/db/`;
		const Config = JsonUtil.deserialize(VFS.readFile(`user/mods/MoreVariety/config/config.json`));
		const Items = DatabaseServer.tables.templates.items;
		const Bots = DatabaseServer.tables.bots.types;
		
		// replace bots_f.controller.generateBot
		MoreVariety.ReplaceBotsController();
		
		// Logger
		MoreVariety.Logger(Config);
		
		// add morefactions bots
		Bots["untar"] 								= JsonUtil.deserialize(VFS.readFile(`${db}bots/untar.json`));
		Bots["untarpol"] 							= JsonUtil.deserialize(VFS.readFile(`${db}bots/untarpol.json`));
		Bots["remnantciv"] 							= JsonUtil.deserialize(VFS.readFile(`${db}bots/remnantciv.json`));
		Bots["remnantpolice"] 						= JsonUtil.deserialize(VFS.readFile(`${db}bots/remnantpolice.json`));
		Bots["remnantspecops"] 						= JsonUtil.deserialize(VFS.readFile(`${db}bots/remnantspecops.json`));
		Bots["ruafassault"] 						= JsonUtil.deserialize(VFS.readFile(`${db}bots/ruafassault.json`));
		Bots["ruafrecon"] 							= JsonUtil.deserialize(VFS.readFile(`${db}bots/ruafrecon.json`));
		Bots["followerkilla"] 						= JsonUtil.deserialize(VFS.readFile(`${db}bots/followerkilla.json`));
		
		// add misc loot
		for (const botType in Bots) {
			// remnant
			if (botType === "remnantciv" || botType === "remnantpolice" || botType === "remnantspecops") {
				for (const itemId in Items) {
					// meds
					if (Items[itemId]._parent) {
						if (Items[Items[itemId]._parent]._parent === "543be5664bdc2dd4348b4569" && Items[itemId]._props.MaxHpResource < 1801 && itemId !== "terragroupSpecialist_chemical_meds" 
						&& itemId !== "terragroupSpecialist_chemical_meds2") {
							
							Bots[botType].inventory.items.TacticalVest.push(itemId);
							Bots[botType].inventory.items.Pockets.push(itemId);
							Bots[botType].inventory.items.Backpack.push(itemId);
							Bots[botType].inventory.items.SecuredContainer.push(itemId);
						}
					}
					// loose loot
					if (Items[itemId]._parent) {
						if (!Items[itemId]._props.QuestItem && Items[itemId]._props.BackgroundColor !== "yellow" && Items[Items[itemId]._parent]._parent === "5448eb774bdc2d0a728b4567" 
						&& itemId !== "59f32bb586f774757e1e8442" && itemId !== "59f32c3b86f77472a31742f0" && itemId !== "UNTARdogtag" && itemId !== "RemnantDogtag" && itemId !== "RUAFdogtag" 
						&& itemId !== "terragroupSpecialist_scrap_metal" && itemId !== "terragroupSpecialist_nutsBottle" && itemId !== "terragroupSpecialist_chemical") {
							Bots[botType].inventory.items.Pockets.push(itemId);
							Bots[botType].inventory.items.Backpack.push(itemId);
						}
					}
					// food/drinks
					if (Items[itemId]._parent) {
						if (Items[Items[itemId]._parent]._parent === "543be6674bdc2df1348b4569") {
							Bots[botType].inventory.items.TacticalVest.push(itemId);
							Bots[botType].inventory.items.Pockets.push(itemId);
							Bots[botType].inventory.items.Backpack.push(itemId);
						}
					}
					// maps
					if (Items[itemId]._parent === "567849dd4bdc2d150f8b456e") {
						Bots[botType].inventory.items.TacticalVest.push(itemId);
						Bots[botType].inventory.items.Pockets.push(itemId);
					}
				}
			}
			// untar and ruaf
			if (botType === "untar" || botType === "untarpol" || botType === "ruafassault" || botType === "ruafrecon") {
				for (const itemId in Items) {
					// maps
					if (Items[itemId]._parent === "567849dd4bdc2d150f8b456e") {
						Bots[botType].inventory.items.TacticalVest.push(itemId);
						Bots[botType].inventory.items.Pockets.push(itemId);
					}
					// info loot
					if (!Items[itemId]._props.QuestItem && Items[itemId]._props.BackgroundColor !== "yellow" && Items[itemId]._parent === "5448ecbe4bdc2d60728b4568" && itemId !== "terragroupSpecialist_ssdDrive" 
					&& itemId !== "terragroupSpecialist_grendel_intelligence" && itemId !== "kelin_diary") {
						Bots[botType].inventory.items.Pockets.push(itemId);
						Bots[botType].inventory.items.Backpack.push(itemId);
					}
					// special items loot (markers, multitool, etc.)
					if (!Items[itemId]._props.QuestItem && Items[itemId]._props.BackgroundColor !== "yellow" && Items[itemId]._parent === "5447e0e74bdc2d3c308b4567" && itemId !== "5f4f9eb969cdc30ff33f09db" 
					&& itemId !== "terragroupSpecialist_jammer" && itemId !== "terragroupSpecialist_beacon") {
						Bots[botType].inventory.items.Pockets.push(itemId);
						Bots[botType].inventory.items.Backpack.push(itemId);
					}
				}
			}
			// follower killa
			if (botType === "followerkilla") {
				for (const itemId in Items) {
					// food/drinks
					if (Items[itemId]._parent) {
						if (Items[Items[itemId]._parent]._parent === "543be6674bdc2df1348b4569") {
							Bots[botType].inventory.items.Backpack.push(itemId);
						}
					}
					// loose loot
					if (Items[itemId]._parent) {
						if (!Items[itemId]._props.QuestItem && Items[itemId]._props.BackgroundColor !== "yellow" && Items[Items[itemId]._parent]._parent === "5448eb774bdc2d0a728b4567" 
						&& itemId !== "59f32bb586f774757e1e8442" && itemId !== "59f32c3b86f77472a31742f0" && itemId !== "UNTARdogtag" && itemId !== "RemnantDogtag" && itemId !== "RUAFdogtag" 
						&& itemId !== "terragroupSpecialist_scrap_metal" && itemId !== "terragroupSpecialist_nutsBottle" && itemId !== "terragroupSpecialist_chemical") {
							Bots[botType].inventory.items.Backpack.push(itemId);
						}
					}
				}
			}
		}
		
		// create custom clothing
		MoreVariety.AddTop(db, "RUAFGorkaUpper",				"MoreVariety/suits/top_gorka_ruaf.bundle");
		MoreVariety.AddTop(db, "RUAFPolevoiUpper",				"MoreVariety/suits/top_polevoi_ruaf.bundle");
		MoreVariety.AddTop(db, "RUAFTigrUpper",					"MoreVariety/suits/top_tiger_ruaf.bundle");
		MoreVariety.AddTop(db, "UNTARPCSUpper",					"MoreVariety/suits/top_pcsshirt_untar.bundle");
		MoreVariety.AddTop(db, "UNTARPCSUpperMTP",				"MoreVariety/suits/top_pcsshirt_untar_MTP.bundle");
		MoreVariety.AddTop(db, "UNTARCombatShirtUpperMTP",		"MoreVariety/suits/top_combatshirt_untar.bundle");
		MoreVariety.AddTop(db, "UNTARAggressorUpper",			"MoreVariety/suits/top_aggressor_untar.bundle");
		MoreVariety.AddTop(db, "UNTARCombat2ShirtUpper",		"MoreVariety/suits/top_combatshirt_2_untar.bundle");
		MoreVariety.AddTop(db, "FollowerKillaTshirtUpper",		"MoreVariety/suits/top_tshirt_followerkilla.bundle");
		MoreVariety.AddTop(db, "FollowerKillaBlacklynxUpper",	"MoreVariety/suits/top_blacklynx_followerkilla.bundle");
		MoreVariety.AddTop(db, "RemnantCivFSB1Upper",			"MoreVariety/suits/top_fsbfastresponse_remnantciv1.bundle");
		MoreVariety.AddTop(db, "RemnantCivFSB2Upper",			"MoreVariety/suits/top_fsbfastresponse_remnantciv2.bundle");
		MoreVariety.AddTop(db, "RemnantCivTier21Upper",			"MoreVariety/suits/top_tier2_remnantciv1.bundle");
		MoreVariety.AddTop(db, "RemnantCivTier22Upper",			"MoreVariety/suits/top_tier2_remnantciv2.bundle");
		MoreVariety.AddTop(db, "RemnantSpecOpsOMONUpper",		"MoreVariety/suits/top_omonjacket_remnantspecops.bundle");
		
		MoreVariety.AddBottom(db, "RUAFPolevoiLower",			"MoreVariety/suits/bottom_polevoi_ruaf.bundle");
		MoreVariety.AddBottom(db, "RUAFCombatLower",			"MoreVariety/suits/bottom_combat_ruaf.bundle");
		MoreVariety.AddBottom(db, "UNTARGen2Lower",				"MoreVariety/suits/bottom_gen2_untar.bundle");
		MoreVariety.AddBottom(db, "UNTARCryePresLowerMTP",		"MoreVariety/suits/bottom_cryeprecision_untar.bundle");
		MoreVariety.AddBottom(db, "UNTARZaslonLower",			"MoreVariety/suits/bottom_zaslon_untar.bundle");
		
		// add custom stuff to bots
		if (VFS.exists(`user/mods/LM4-AWM/package.json`)) {
			MoreVariety.LM4_AWM_Support();
		};
		if (VFS.exists(`user/mods/LM4-RPK74/package.json`)) {
			MoreVariety.LM4_RPK74_Support();
		};
		if (VFS.exists(`user/mods/Mira-M16A4/package.json`)) {
			MoreVariety.Mira_M16A4_Support();
		};
		if (VFS.exists(`user/mods/Carl-QHB/package.json`)) {
			MoreVariety.Carl_QHB_Support();
		};
		if (VFS.exists(`user/mods/SamSWAT-M1014/package.json`)) {
			MoreVariety.Sam_M1014_Support();
		};
		if (VFS.exists(`user/mods/MacrossMX-M14/package.json`)) {
			MoreVariety.MacrossMX_M14_Support();
		};
		
		// devide untar and remnant spec-ops bots
		Bots["untarfra"] = JsonUtil.clone(Bots["untar"]);
		Bots["untarger"] = JsonUtil.clone(Bots["untar"]);
		Bots["untareng"] = JsonUtil.clone(Bots["untar"]);
		Bots["remnantspecopsgorka"] = JsonUtil.clone(Bots["remnantspecops"]);
		Bots["remnantspecopsomon"] = JsonUtil.clone(Bots["remnantspecops"]);
		
		// give items to specific bots
		Bots["untareng"].inventory.equipment.TacticalVest.push("5b44c8ea86f7742d1627baf1");
		Bots["untareng"].inventory.items.Pockets.push("5bc9be8fd4351e00334cae6e");
		
		// add clothing to bots
		Bots["untarger"].appearance.body = [
			"UNTARPCSUpper"
		];
		Bots["untarger"].appearance.feet = [
			"UNTARGen2Lower"
		];
		Bots["untareng"].appearance.body = [
			"UNTARCombatShirtUpperMTP",
			"UNTARPCSUpperMTP"
		];
		Bots["untareng"].appearance.feet = [
			"UNTARCryePresLowerMTP"
		];
		Bots["remnantspecopsomon"].appearance.body = [
			"RemnantSpecOpsOMONUpper"
		];
		Bots["remnantspecopsomon"].appearance.feet = [
			"5d28af5386f774292364a6e8"
		];
		
		// add names to untar bots
		DatabaseServer.tables.locales["untarnames"] = JsonUtil.deserialize(VFS.readFile(`${db}bots/untarnames.json`));
		Bots["untarger"].firstName = JsonUtil.clone(DatabaseServer.tables.locales["untarnames"].gernames);
		Bots["untareng"].firstName = JsonUtil.clone(DatabaseServer.tables.locales["untarnames"].engnames);
		
		// Custom dogtags
		// add dogtags (yoinked from senko :) )
		MoreVariety.CustomDogtag(db, "UNTARdogtag", "assets/content/items/barter/dog_tags/item_dogtags_usec.bundle");
		MoreVariety.CustomDogtag(db, "RemnantDogtag", "assets/content/items/barter/item_barter_valuable_elibadge/item_barter_valuable_elibadge.bundle");
		MoreVariety.CustomDogtag(db, "RUAFdogtag", "assets/content/items/barter/dog_tags/item_dogtags_bear.bundle");
		
		// add custom dogtags to dogtag/sicc case filters
		Items["5d235bb686f77443f4331278"]._props.Grids[0]._props.filters[0].Filter.push("UNTARdogtag", "RemnantDogtag", "RUAFdogtag");
		Items["5c093e3486f77430cb02e593"]._props.Grids[0]._props.filters[0].Filter.push("UNTARdogtag", "RemnantDogtag", "RUAFdogtag");
		
		// modify price based on the level of the dogtag
		ItemHelper.isDogtag = function(itemId){
			return itemId === "59f32bb586f774757e1e8442" || itemId === "59f32c3b86f77472a31742f0" || itemId === "RUAFdogtag" || itemId === "RemnantDogtag" || itemId === "UNTARdogtag";
		}
		
		// Locations Zones
		MoreVariety.locationZones = {
            "zones": {
                "bigmap": "ZoneBrige,ZoneCrossRoad,ZoneFactorySide,ZoneOldAZS,ZoneBlockPost,ZoneTankSquare,ZoneCustoms,ZoneDormitory,ZoneGasStation,ZoneFactoryCenter,ZoneWade,ZoneScavBase",
                "factory4_day": "BotZone",
                "factory4_night": "BotZone",
                "interchange": "ZoneIDEA,ZoneRoad,ZoneCenter,ZoneCenterBot,ZoneOLI,ZoneOLIPark,ZoneGoshan,ZonePowerStation,ZoneTrucks,ZoneIDEAPark",
                "laboratory": "BotZoneFloor1,BotZoneFloor2,BotZoneBasement",
                "rezervbase": "ZoneRailStrorage,ZonePTOR1,ZonePTOR2,ZoneBarrack,ZoneBunkerStorage,ZoneSubStorage,ZoneSubCommand",
                "shoreline": "ZoneSanatorium,ZonePassFar,ZonePassClose,ZoneTunnel,ZoneStartVillage,ZoneBunker,ZoneGreenHouses,ZoneIsland,ZoneGasStation,ZoneMeteoStation,ZonePowerStation,ZoneBusStation,ZoneRailWays,ZonePort,ZoneForestTruck,ZoneForestSpawn",
                "woods": "ZoneRedHouse,ZoneWoodCutter,ZoneHouse,ZoneBigRocks,ZoneRoad,ZoneMiniHouse,ZoneScavBase2,ZoneBrokenVill,ZoneClearVill"
            }
        };
		const locationZones = MoreVariety.locationZones;
		
		// Adds killa followers to you'll never guess who
		if (Config.ScavVariety.Enabled && Config.ScavVariety.NewCustomFollowers) {
			for (let BossLocationSpawn of DatabaseServer.tables.locations["interchange"].base.BossLocationSpawn) {
				if (BossLocationSpawn.BossName === "bossKilla") {
					BossLocationSpawn.BossDifficult = "hard";
					BossLocationSpawn.BossEscortType = "followerBully";
					BossLocationSpawn.BossEscortDifficult = "hard";
					BossLocationSpawn.BossEscortAmount = "2,2,2,3,3";
				}
			}
		}
		
		// MoreFactions
		if (Config.MoreFactions.Enabled) {
			
			// add new factions boss waves
			MoreVariety.moreFactionsGroups = {
				"remnantLocations": {
					"bigmap": locationZones.zones.bigmap,
					"interchange": locationZones.zones.interchange,
					"rezervbase": locationZones.zones.rezervbase,
					"shoreline": locationZones.zones.shoreline
				},
				"ruafLocations": {
					"bigmap": locationZones.zones.bigmap,
					"interchange": locationZones.zones.interchange,
					"shoreline": locationZones.zones.shoreline,
					"woods": locationZones.zones.woods
				},
				"untarLocations": {
					"bigmap": locationZones.zones.bigmap,
					"shoreline": locationZones.zones.shoreline,
					"woods": locationZones.zones.woods
				}
			};
			
			const LocationsMorefactions = MoreVariety.moreFactionsGroups;
			
			MoreVariety.addBossSpawn(locationZones, LocationsMorefactions.remnantLocations, "bossTest", "followerTest", Config.MoreFactions.Chances.Remnants, "1,2,2,3,3,4", "easy");
			MoreVariety.addBossSpawn(locationZones, LocationsMorefactions.ruafLocations, "bossTest", "followerTest", Config.MoreFactions.Chances.RUAF, "1,2,2,3,3,4", "normal");
			MoreVariety.addBossSpawn(locationZones, LocationsMorefactions.untarLocations, "bossTest", "followerTest", Config.MoreFactions.Chances.UNTAR, "1,2,2,3,3,4", "hard");
		}
		
		// EnhancedPlayerScav
		ProfileController.generateScav = function(sessionID) {
			const pmcData = ProfileController.getPmcProfile(sessionID);
			let scavData = BotController.generate({
				"conditions": [
					{
						"Role": "playerscav",
						"Limit": 1,
						"Difficulty": "normal"
					}
				]
			}, true)[0];

			// add proper metadata
			scavData._id = pmcData.savage;
			scavData.aid = sessionID;
			scavData.Info.Settings = {};
			SaveServer.profiles[sessionID].characters.scav;
			scavData.TradersInfo = JsonUtil.clone(pmcData.TradersInfo);
			
			// save player scav skills 
			if (SaveServer.profiles[sessionID].characters.scav.Skills) {
				scavData.Skills = SaveServer.profiles[sessionID].characters.scav.Skills;
			} else {
				scavData.Skills = {
					"Common": [],
					"Mastering": [],
					"Points": 0
				};
			};
			
			// save player scav stats
			if (SaveServer.profiles[sessionID].characters.scav.Stats) {
				scavData.Stats = SaveServer.profiles[sessionID].characters.scav.Stats;
			} else {
				scavData.Stats = {
					"SessionCounters": {
						"Items": []
					},
					"OverallCounters": {
						"Items": []
					}
				};
			};
			
			// save player scav EXP
			if (SaveServer.profiles[sessionID].characters.scav.Info) {
				// two experience entries? hmm
				scavData.Info.Level = SaveServer.profiles[sessionID].characters.scav.Info.Level
				
				scavData.Info.Experience = SaveServer.profiles[sessionID].characters.scav.Info.Experience;
				scavData.Info.experience = SaveServer.profiles[sessionID].characters.scav.Info.Experience;
			} else {
				scavData.Info.Level = 1;
				
				scavData.Info.Experience = 0;
				scavData.Info.experience = 0;
			};

			// remove secure container
			scavData = InventoryHelper.removeSecureContainer(scavData);

			// set cooldown timer
			scavData = ProfileController.setScavCooldownTimer(scavData, pmcData);

			// add scav to the profile
			ProfileController.setScavProfile(sessionID, scavData);
			return scavData;
		}
		
		// BossesOnAllMaps
		if (Config.BossesOnAllMaps.Enabled) {
			// create epmty arrays for bot zones
			MoreVariety.bossesOnAllMapsLocations = {
				"Reshala": {
				},
				"Gluhkar": {
				},
				"Killa": {
				},
				"Shturman": {
				},
				"Sanitar": {
				},
				"Tagilla": {
				},
				"RaiderSquad": {
				},
				"CultistGroup": {
				}
			};
			
			// add zones to array
			// nice and clean baby 
			for (const boss in MoreVariety.bossesOnAllMapsLocations) {
				for (const map in Config.BossesOnAllMaps.CanSpawnOnFollowingMaps[boss]) {
					if (Config.BossesOnAllMaps.CanSpawnOnFollowingMaps[boss][map]) {
						MoreVariety.bossesOnAllMapsLocations[boss][map] = locationZones.zones[map];
					}
				}
			}
			
			const Locations = MoreVariety.bossesOnAllMapsLocations;
			
			// add bossWaves
			MoreVariety.addBossSpawn(locationZones, Locations.Reshala, "bossBully", "followerBully", Config.BossesOnAllMaps.ReshalaChance, "4", "normal");
			MoreVariety.addGluhkarBossSpawn(locationZones, Locations.Gluhkar, Config.BossesOnAllMaps.GluhkarChance);
			MoreVariety.addBossSpawn(locationZones, Locations.Shturman, "bossKojaniy", "followerKojaniy", Config.BossesOnAllMaps.ShturmanChance, "2", "normal");
			MoreVariety.addBossSpawn(locationZones, Locations.Sanitar, "bossSanitar", "followerSanitar", Config.BossesOnAllMaps.SanitarChance, "2", "normal");
			MoreVariety.addBossSpawn(locationZones, Locations.RaiderSquad, "pmcBot", "pmcBot", Config.BossesOnAllMaps.RaiderSquadChance, "2,2,2,2,3,3,3", "normal");
			MoreVariety.addBossSpawn(locationZones, Locations.CultistGroup, "sectantPriest", "sectantWarrior", Config.BossesOnAllMaps.CultistGroupChance, "3,5", "normal");
			if (Config.ScavVariety.Enabled && Config.ScavVariety.NewCustomFollowers) {
				MoreVariety.addBossSpawn(locationZones, Locations.Killa, "bossKilla", "followerBully", Config.BossesOnAllMaps.KillaChance, "2,2,2,3,3", "hard");
			} else {
				MoreVariety.addBossSpawn(locationZones, Locations.Killa, "bossKilla", "followerBully", Config.BossesOnAllMaps.KillaChance, "0", "normal");
			};
			MoreVariety.addBossSpawn(locationZones, Locations.Tagilla, "bossTagilla", "followerBully", Config.BossesOnAllMaps.TagillaChance, "0", "normal");
		}
		
		if (Config.DebugEnabled) {
			/*
			MoreVariety.testBot("cursedassault")
			MoreVariety.testBot("cursedassault")
			MoreVariety.testBot("cursedassault")
			MoreVariety.testBot("cursedassault")
			MoreVariety.testBot("cursedassault")
			MoreVariety.testBot("cursedassault")
			MoreVariety.testBot("cursedassault")
			MoreVariety.testBot("cursedassault")
			MoreVariety.testBot("cursedassault")
			MoreVariety.testBot("cursedassault")
			MoreVariety.testBot("cursedassault")
			MoreVariety.testBot("cursedassault")
			*/
			MoreVariety.testBot("assault")
		}
	}
	
	static testBot(role)
	{
		let bot = JsonUtil.clone(DatabaseServer.tables.bots.base);
		
		var testing = BotController.generateBot(bot, role)
	}
	
	static Logger(Config)
    {
        // ScavVariety
		if (Config.ScavVariety.Enabled === true) {
            Logger.info("MoreVariety - ScavVariety enabled!");
		}
		if (Config.ScavVariety.Enabled === false) {
            Logger.info("MoreVariety - ScavVariety disabled!");
		}
		if (Config.ScavVariety.Enabled !== true && Config.ScavVariety.Enabled !== false) {
            Logger.error("MoreVariety - ScavVariety is not set correctly, please read the readme!")
        }
		
		// MoreFactions
		if (Config.MoreFactions.Enabled === true) {
            Logger.info("MoreVariety - MoreFactions enabled!");
		}
		if (Config.MoreFactions.Enabled === false) {
            Logger.info("MoreVariety - MoreFactions disabled!");
		}
		if (Config.MoreFactions.Enabled !== true && Config.MoreFactions.Enabled !== false) {
            Logger.error("MoreVariety - MoreFactions is not set correctly, please read the readme!")
        }
		
		// Bosses On All Maps
		if (Config.BossesOnAllMaps.Enabled === true) {
            Logger.info("MoreVariety - BossesOnAllMaps enabled!");
		}
		if (Config.BossesOnAllMaps.Enabled === false) {
            Logger.info("MoreVariety - BossesOnAllMaps disabled!");
		}
		if (Config.BossesOnAllMaps.Enabled !== true && Config.BossesOnAllMaps.Enabled !== false) {
            Logger.error("MoreVariety - BossesOnAllMaps is not set correctly, please read the readme!")
        }
		
		// Enhanced Player Scav
		if (Config.EnhancedPlayerScav.Enabled === true) {
            Logger.info("MoreVariety - EnhancedPlayerScav enabled!");
		}
		if (Config.EnhancedPlayerScav.Enabled === false) {
            Logger.info("MoreVariety - EnhancedPlayerScav disabled!");
		}
		if (Config.EnhancedPlayerScav.Enabled !== true && Config.EnhancedPlayerScav.Enabled !== false) {
            Logger.error("MoreVariety - EnhancedPlayerScav is not set correctly, please read the readme!")
        }
    }
	
	static CustomDogtag(db, DogtagID, BundlePath)
    {
		// constants
        const dogtagBase = "59f32c3b86f77472a31742f0";
        const inventoryBase = "55d7217a4bdc2d86028b456d";

        // Custom dogtag
        let NewDogtag = JsonUtil.clone(DatabaseServer.tables.templates.items[dogtagBase]);

        NewDogtag._id = DogtagID;
        NewDogtag._name = DogtagID;
        NewDogtag._props.Prefab.path = BundlePath;
		NewDogtag._props.BackgroundColor = "violet";
        DatabaseServer.tables.templates.items[DogtagID] = NewDogtag;
		
        // handbook
        let dogtagHandbook = JsonUtil.clone(DatabaseServer.tables.templates.handbook.Items.find((item) =>
        {
            return item.Id === dogtagBase;
        }));

        dogtagHandbook.Id = NewDogtag._id;
        DatabaseServer.tables.templates.handbook.Items.push(dogtagHandbook);

        // locale
        for (const localeID in DatabaseServer.tables.locales.global)
        {
            DatabaseServer.tables.locales.global[localeID].templates[DogtagID] = JsonUtil.deserialize(VFS.readFile(`${db}locales/${DogtagID}.json`));
        }

        // modify inventory to support custom dogtag
        let inventory = DatabaseServer.tables.templates.items[inventoryBase];

        for (const slot in inventory._props.Slots)
        {
            if (inventory._props.Slots[slot]._name === "Dogtag")
            {
                inventory._props.Slots[slot]._props.filters[0].Filter.push(DogtagID);
                break;
            }
        }
    }
	
	static AddTop(db, OutfitID, TopBundlePath)
	{
		// config
		const Config = JsonUtil.deserialize(VFS.readFile(`user/mods/MoreVariety/config/config.json`));
		
		// add top
		let NewTop = JsonUtil.clone(DatabaseServer.tables.templates.customization["5d28adcb86f77429242fc893"]);

        NewTop._id = OutfitID;
        NewTop._name = OutfitID;
        NewTop._props.Prefab.path = TopBundlePath;
        DatabaseServer.tables.templates.customization[OutfitID] = NewTop;
		
		// add hands
		let NewHands = JsonUtil.clone(DatabaseServer.tables.templates.customization["5cc0876314c02e000c6bea6b"]);

        NewHands._id = `${OutfitID}Hands`;
        NewHands._name = `${OutfitID}Hands`;
        NewHands._props.Prefab.path = "assets/content/hands/wild/wild_body_3_firsthands.bundle";
        DatabaseServer.tables.templates.customization[`${OutfitID}Hands`] = NewHands;
		
		// add suite
		let NewSuite = JsonUtil.clone(DatabaseServer.tables.templates.customization["5d1f623e86f7744bce0ef705"]);

        NewSuite._id = `${OutfitID}Suite`;
        NewSuite._name = `${OutfitID}Suite`;
		NewSuite._props.Body = OutfitID;
		NewSuite._props.Hands = `${OutfitID}Hands`;
		NewSuite._props.Side = ["Usec", "Bear", "Savage"];
        DatabaseServer.tables.templates.customization[`${OutfitID}Suite`] = NewSuite;
		
		// add suite to the prapor
		if (Config.DebugEnabled) {
			if (DatabaseServer.tables.traders["54cb50c76803fa8b248b4571"].suits) {}
			else {
				DatabaseServer.tables.traders["54cb50c76803fa8b248b4571"].base.customization_seller = true;
				DatabaseServer.tables.traders["54cb50c76803fa8b248b4571"].suits = [];
			}
			DatabaseServer.tables.traders["54cb50c76803fa8b248b4571"].suits.push({
				"_id": OutfitID,
				"tid": "54cb50c76803fa8b248b4571",
				"suiteId": `${OutfitID}Suite`,
				"isActive": true,
				"requirements": {
					"loyaltyLevel": 0,
					"profileLevel": 0,
					"standing": 0,
					"skillRequirements": [],
					"questRequirements": [],
					"itemRequirements": [
						{
							"count": 0,
							"_tpl": "5449016a4bdc2d6f028b456f"
						}
					]
				}
			});
		}
	}
	
	static AddBottom(db, OutfitID, BundlePath)
	{
		// config
		const Config = JsonUtil.deserialize(VFS.readFile(`user/mods/MoreVariety/config/config.json`));
		
		// add Bottom
		let NewBottom = JsonUtil.clone(DatabaseServer.tables.templates.customization["5d5e7f4986f7746956659f8a"]);

        NewBottom._id = OutfitID;
        NewBottom._name = OutfitID;
        NewBottom._props.Prefab.path = BundlePath;
        DatabaseServer.tables.templates.customization[OutfitID] = NewBottom;
		
		// add suite
		let NewSuite = JsonUtil.clone(DatabaseServer.tables.templates.customization["5cd946231388ce000d572fe3"]);

        NewSuite._id = `${OutfitID}Suite`;
        NewSuite._name = `${OutfitID}Suite`;
		NewSuite._props.Feet = OutfitID;
		NewSuite._props.Side = ["Usec", "Bear", "Savage"];
        DatabaseServer.tables.templates.customization[`${OutfitID}Suite`] = NewSuite;
		
		// add suite to the prapor
		if (Config.DebugEnabled) {
			if (DatabaseServer.tables.traders["54cb50c76803fa8b248b4571"].suits) {}
			else {
				DatabaseServer.tables.traders["54cb50c76803fa8b248b4571"].base.customization_seller = true;
				DatabaseServer.tables.traders["54cb50c76803fa8b248b4571"].suits = [];
			}
			DatabaseServer.tables.traders["54cb50c76803fa8b248b4571"].suits.push({
				"_id": OutfitID,
				"tid": "54cb50c76803fa8b248b4571",
				"suiteId": `${OutfitID}Suite`,
				"isActive": true,
				"requirements": {
					"loyaltyLevel": 0,
					"profileLevel": 0,
					"standing": 0,
					"skillRequirements": [],
					"questRequirements": [],
					"itemRequirements": [
						{
							"count": 0,
							"_tpl": "5449016a4bdc2d6f028b456f"
						}
					]
				}
			});
		}
	}

	static addBossSpawn(locationZones, botZones, bossType, followerType, chance, escortAmount, difficulty)
    {
        for (const locationName in DatabaseServer.tables.locations)
        {
			
			if (!botZones[locationName])
            {
				continue;
            }

            let location = DatabaseServer.tables.locations[locationName].base;

            for (let i = 0; i < 1; i++)
            {
				let output = {
                    "BossName": bossType,
                    "BossChance": chance,
                    "BossZone": locationZones.zones[locationName],
                    "BossPlayer": false,
                    "BossDifficult": difficulty,
                    "BossEscortType": followerType,
                    "BossEscortDifficult": difficulty,
                    "BossEscortAmount": escortAmount,
                    "Time": -1
                };
				
				if (locationName === "laboratory")
                {
                    output = Object.assign(output, {
                        "TriggerId": "",
                        "TriggerName": "none",
                        "Delay": 0
                    });
                }
				
                location.BossLocationSpawn.push(output);
            }

            DatabaseServer.tables.locations[locationName].base = location;
        }
    }
	
	static addGluhkarBossSpawn(locationZones, botZones, chance)
    {
        for (const locationName in DatabaseServer.tables.locations)
        {
			if (!botZones[locationName])
            {
				continue;
            }

            let location = DatabaseServer.tables.locations[locationName].base;

            for (let i = 0; i < 1; i++)
            {
				let output = {
					"BossName": "bossGluhar",
					"BossChance": chance,
					"BossZone": locationZones.zones[locationName],
					"BossPlayer": false,
					"BossDifficult": "normal",
					"BossEscortType": "followerGluharAssault",
					"BossEscortDifficult": "normal",
					"BossEscortAmount": "2",
					"Time": -1,
					"Supports": [
						{
							"BossEscortType": "followerGluharAssault",
							"BossEscortDifficult": [
								"normal"
							],
							"BossEscortAmount": "2"
						},
						{
							"BossEscortType": "followerGluharSecurity",
							"BossEscortDifficult": [
								"normal"
							],
							"BossEscortAmount": "2"
						},
						{
							"BossEscortType": "followerGluharScout",
							"BossEscortDifficult": [
								"normal"
							],
							"BossEscortAmount": "2"
						}
					]
				};
				
				if (locationName === "laboratory")
                {
                    output = Object.assign(output, {
                        "TriggerId": "",
                        "TriggerName": "none",
                        "Delay": 0
                    });
                }
				
                location.BossLocationSpawn.push(output);
            }

            DatabaseServer.tables.locations[locationName].base = location;
        }
    }
	
	static LM4_AWM_Support()
    {
		// untar
		DatabaseServer.tables.bots.types["untar"].inventory.equipment.FirstPrimaryWeapon.push("weapon_ai_awm_338lm");
		DatabaseServer.tables.bots.types["untar"].inventory.mods.weapon_ai_awm_338lm = {
			"mod_magazine": [
                "magazine_awm_ai_86x70_5"
            ],
			"mod_stock": [
                "stock_awm_ai_at_style",
				"stock_awm_ai_awmf",
				"stock_awm_ai_awm"
            ],
			"mod_barrel": [
                "barrel_awm_ai_std_686mm",
				"barrel_awm_ai_custom_435mm"
            ],
			"mod_mount": [
                "mount_awm_ai_top_picatinny_rail"
            ]
		};
		DatabaseServer.tables.bots.types["untar"].inventory.mods.magazine_awm_ai_86x70_5 = {
			"cartridges": [
                "5fc275cf85fd526b824a571a"
            ]
		};
		DatabaseServer.tables.bots.types["untar"].inventory.mods.barrel_awm_ai_std_686mm = {
			"mod_muzzle": [
                "muzzle_awm_ai_mb_86x70"
            ]
		};
		DatabaseServer.tables.bots.types["untar"].inventory.mods.barrel_awm_ai_custom_435mm = {
			"mod_muzzle": [
                "muzzle_awm_ai_mb_86x70"
            ]
		};
		DatabaseServer.tables.bots.types["untar"].inventory.mods.mount_awm_ai_top_picatinny_rail = {
			"mod_scope": [
                "57c69dd424597774c03b7bbc",
                "5a37ca54c4a282000d72296a",
                "5aa66a9be5b5b0214e506e89",
                "5aa66c72e5b5b00016327c93",
                "5b2389515acfc4771e1be0c0",
                "5c86592b2e2216000e69e77c"
            ]
		};
    }
	
	static LM4_RPK74_Support()
    {
		// ruafassault
		DatabaseServer.tables.bots.types["ruafassault"].inventory.equipment.FirstPrimaryWeapon.push("weapon_izhmash_rpk74n_545x39");
		DatabaseServer.tables.bots.types["ruafassault"].inventory.mods.weapon_izhmash_rpk74n_545x39 = {
			"mod_gas_block": [
				"59c6633186f7740cf0493bb9"
            ],
            "mod_muzzle": [
				"muzzle_ak74_izhmash_rpk_std_545x39",
				"5649ab884bdc2ded0b8b457f"
            ],
            "mod_pistol_grip": [
				"5beec8ea0db834001a6f9dbf",
				"5649ad3f4bdc2df8348b4585",
				"5649ae4a4bdc2d1b2b8b4588"
            ],
            "mod_reciever": [
				"5ac50da15acfc4001718d287",
				"5d2c76ed48f03532f2136169"
            ],
            "mod_sight_rear": [
				"5ac72e475acfc400180ae6fe"
            ],
            "mod_stock": [
				"stock_ak74_izhmash_rpk74_std_plastic"
            ],
            "mod_magazine": [
				"55d481904bdc2d8c2f8b456a",
				"55d482194bdc2d1d4e8b456b",
				"5bed625c0db834001c062946"
            ],
            "mod_mount_000": [
				"5947db3f86f77447880cf76f",
				"57486e672459770abd687134",
				"57acb6222459771ec34b5cb0",
				"5c61a40d2e2216001403158d",
				"5c90c3622e221601da359851",
				"591ee00d86f774592f7b841e"
			],
			"mod_charge": [
				"5648ac824bdc2ded0b8b457d"
            ]
        };
		DatabaseServer.tables.bots.types["ruafassault"].inventory.mods["59c6633186f7740cf0493bb9"].mod_handguard.push("handguard_ak_izhmash_rpk74m");
		DatabaseServer.tables.bots.types["ruafassault"].inventory.mods.handguard_ak_izhmash_rpk74m = {
			"mod_foregrip": [
				"5c1cd46f2e22164bef5cfedb",
				"5c1bc4812e22164bef5cfde7",
				"5c1bc5612e221602b5429350",
				"5c1bc5af2e221602b412949b",
				"5c1bc5fb2e221602b1779b32",
				"5c1bc7432e221602b412949d",
				"5c1bc7752e221602b1779b34"
            ]
        };
		
		// remnantspecops
		DatabaseServer.tables.bots.types["remnantspecops"].inventory.equipment.FirstPrimaryWeapon.push("weapon_izhmash_rpk74n_545x39");
		DatabaseServer.tables.bots.types["remnantspecops"].inventory.mods.weapon_izhmash_rpk74n_545x39 = {
			"mod_gas_block": [
				"59c6633186f7740cf0493bb9"
            ],
            "mod_muzzle": [
				"muzzle_ak74_izhmash_rpk_std_545x39",
				"5649ab884bdc2ded0b8b457f"
            ],
            "mod_pistol_grip": [
				"5cf50850d7f00c056e24104c",
				"5947f92f86f77427344a76b1",
				"5f6341043ada5942720e2dc5",
				"5649ade84bdc2d1b2b8b4587",
				"5b30ac585acfc433000eb79c",
				"5649ae4a4bdc2d1b2b8b4588"
            ],
            "mod_reciever": [
				"5ac50da15acfc4001718d287"
            ],
            "mod_sight_rear": [
				"5ac72e475acfc400180ae6fe"
            ],
            "mod_stock": [
				"stock_ak74_izhmash_rpk74_std_plastic"
            ],
            "mod_magazine": [
				"55d481904bdc2d8c2f8b456a",
				"55d482194bdc2d1d4e8b456b"
            ],
            "mod_mount_000": [
				"5947db3f86f77447880cf76f",
				"57486e672459770abd687134"
			],
			"mod_charge": [
				"5648ac824bdc2ded0b8b457d"
            ]
        };
		DatabaseServer.tables.bots.types["remnantspecops"].inventory.mods["59c6633186f7740cf0493bb9"].mod_handguard.push("handguard_ak_izhmash_rpk74m");
		DatabaseServer.tables.bots.types["remnantspecops"].inventory.mods.handguard_ak_izhmash_rpk74m = {
			"mod_foregrip": [
				"5c87ca002e221600114cb150",
				"558032614bdc2de7118b4585",
				"5c1bc4812e22164bef5cfde7"
            ]
        };
		
		// followerkilla
		DatabaseServer.tables.bots.types["followerkilla"].inventory.equipment.FirstPrimaryWeapon.push("weapon_izhmash_rpk74n_545x39");
		DatabaseServer.tables.bots.types["followerkilla"].inventory.mods.weapon_izhmash_rpk74n_545x39 = {
			"mod_gas_block": [
				"59c6633186f7740cf0493bb9"
            ],
            "mod_muzzle": [
				"muzzle_ak74_izhmash_rpk_std_545x39",
				"5649ab884bdc2ded0b8b457f"
            ],
            "mod_pistol_grip": [
				"5beec8ea0db834001a6f9dbf",
                "5649ade84bdc2d1b2b8b4587",
                "5b30ac585acfc433000eb79c",
				"5cf50850d7f00c056e24104c",
				"5947f92f86f77427344a76b1",
				"5c6bf4aa2e2216001219b0ae",
				"5649ae4a4bdc2d1b2b8b4588"
            ],
            "mod_reciever": [
				"5d2c76ed48f03532f2136169",
                "5ac50da15acfc4001718d287"
            ],
            "mod_sight_rear": [
				"5ac72e475acfc400180ae6fe"
            ],
            "mod_stock": [
				"stock_ak74_izhmash_rpk74_std_plastic"
            ],
            "mod_magazine": [
				"55d481904bdc2d8c2f8b456a",
				"55d482194bdc2d1d4e8b456b"
            ],
			"mod_charge": [
				"5648ac824bdc2ded0b8b457d"
            ]
        };
		DatabaseServer.tables.bots.types["followerkilla"].inventory.mods["59c6633186f7740cf0493bb9"].mod_handguard.push("handguard_ak_izhmash_rpk74m");
		DatabaseServer.tables.bots.types["followerkilla"].inventory.mods.handguard_ak_izhmash_rpk74m = {
			"mod_foregrip": [
				"5c7fc87d2e221644f31c0298",
				"59f8a37386f7747af3328f06",
				"5c87ca002e221600114cb150",
				"59fc48e086f77463b1118392",
				"5cf4fb76d7f00c065703d3ac",
				"5b057b4f5acfc4771e1bd3e9",
				"5c791e872e2216001219c40a",
				"558032614bdc2de7118b4585",
				"5f6340d3ca442212f4047eb2",
				"591af28e86f77414a27a9e1d",
				"5c1cd46f2e22164bef5cfedb",
				"5c1bc4812e22164bef5cfde7",
				"5c1bc5612e221602b5429350",
				"5c1bc5af2e221602b412949b",
				"5c1bc5fb2e221602b1779b32",
				"5c1bc7432e221602b412949d",
				"5c1bc7752e221602b1779b34"
            ]
        };
    }
	
	static Mira_M16A4_Support()
    {
		// untar
		DatabaseServer.tables.bots.types["untar"].inventory.equipment.FirstPrimaryWeapon.push("weapon_colt_m16a4_556x45");
		DatabaseServer.tables.bots.types["untar"].inventory.mods.weapon_colt_m16a4_556x45 = {
			"mod_pistol_grip": [
                "5cc9bcaed7f00c011c04e179",
                "55802f5d4bdc2dac148b458f",
                "55d4b9964bdc2d1d4e8b456e",
                "57c55efc2459772d2c6271e7"
            ],
            "mod_magazine": [
                "55d4887d4bdc2d962f8b4570",
                "5aaa5dfee5b5b000140293d3",
                "55802d5f4bdc2dac148b458e",
                "5c6d46132e221601da357d56"
            ],
            "mod_reciever": [
                "55d355e64bdc2d962f8b4569"
            ],
            "mod_stock": [
                "5649be884bdc2d79388b4577",
                "5c793fb92e221644f31bfb64",
                "591aef7986f774139d495f03"
            ],
            "mod_charge": [
                "55d44fd14bdc2d962f8b456e"
            ]
        };
    }
	
	static Carl_QHB_Support()
    {
		// untar
		DatabaseServer.tables.bots.types["untar"].inventory.equipment.FirstPrimaryWeapon.push("weapon_qhb_300blk");
		DatabaseServer.tables.bots.types["untar"].inventory.mods.weapon_qhb_300blk = {
			"mod_pistol_grip": [
                "5d15cf3bd7ad1a67e71518b2",
				"57af48872459771f0b2ebf11",
				"571659bb2459771fb2755a12",
				"5a339805c4a2826c6e06d73d"
            ],
            "mod_magazine": [
                "5d1340b3d7ad1a0b52682ed7",
                "5d1340cad7ad1a0b0b249869"
            ],
            "mod_reciever": [
                "receiver_qhb_standard"
            ],
            "mod_stock": [
                "stock_qhb_standard"
            ],
            "mod_charge": [
                "55d44fd14bdc2d962f8b456e"
            ]
        };
		DatabaseServer.tables.bots.types["untar"].inventory.mods.receiver_qhb_standard = {
			"mod_scope": [
                "570fd6c2d2720bc6458b457f",
                "570fd721d2720bc5458b4596",
                "58491f3324597764bc48fa02",
                "584924ec24597768f12ae244",
                "5b30b0dc5acfc400153b7124",
				"5d2da1e948f035477b1ce2ba",
                "5d2dc3e548f035404a1a4798",
                "558022b54bdc2dac148b458d"
            ],
            "mod_barrel": [
                "barrel_qhb_190mm_300blk",
				"barrel_qhb_260mm_300blk"
            ],
            "mod_handguard": [
                "handguard_qhb_q_mlok_6in",
				"handguard_qhb_q_mlok_12in"
            ],
            "mod_sight_rear": [
                "5fc0fa957283c4046c58147e"
            ]
        };
		DatabaseServer.tables.bots.types["untar"].inventory.mods.barrel_qhb_190mm_300blk = {
			"mod_muzzle": [
                "muzzle_q_cherry_bomb_300blk"
            ]
        };
		DatabaseServer.tables.bots.types["untar"].inventory.mods.barrel_qhb_260mm_300blk = {
			"mod_muzzle": [
                "muzzle_q_cherry_bomb_300blk"
            ]
        };
		DatabaseServer.tables.bots.types["untar"].inventory.mods.handguard_qhb_q_mlok_6in = {
			"mod_mount_000": [
                "5b7be47f5acfc400170e2dd2"
            ],
            "mod_mount_001": [
                "5b7be47f5acfc400170e2dd2"
            ],
            "mod_foregrip": [
                "57cffb66245977632f391a99",
				"57cffcd624597763133760c5",
				"5b7be4895acfc400170e2dd5"
            ],
            "mod_sight_front": [
                "5fc0fa362770a0045c59c677"
            ]
        };
		DatabaseServer.tables.bots.types["untar"].inventory.mods.handguard_qhb_q_mlok_12in = {
			"mod_mount_000": [
                "5b7be47f5acfc400170e2dd2"
            ],
            "mod_mount_001": [
                "5b7be47f5acfc400170e2dd2"
            ],
            "mod_mount_002": [
                "5b7be47f5acfc400170e2dd2"
            ],
            "mod_tactical_000": [
                "57fd23e32459772d0805bcf1",
				"544909bb4bdc2d6f028b4577",
				"5d10b49bd7ad1a1a560708b0",
				"5c06595c0db834001a66af6c"
            ],
            "mod_foregrip": [
                "57cffb66245977632f391a99",
				"57cffcd624597763133760c5",
				"5b7be4895acfc400170e2dd5"
            ],
            "mod_sight_front": [
                "5fc0fa362770a0045c59c677"
            ]
        };
		DatabaseServer.tables.bots.types["untar"].inventory.mods.muzzle_q_cherry_bomb_300blk = {
			"mod_muzzle": [
                "suppressor_qhb_standard_300blk"
            ]
        };
    }
	
	static Sam_M1014_Support()
	{
		DatabaseServer.tables.bots.types["untar"].inventory.equipment.FirstPrimaryWeapon.push("weapon_benelli_m1014_12g");
		DatabaseServer.tables.bots.types["untar"].inventory.mods.weapon_benelli_m1014_12g = {
			"mod_barrel": [
                "barrel_m1014_470mm"
            ],
            "mod_handguard": [
                "handguard_m1014"
            ],
            "mod_magazine": [
                "mag_m1014_magcap"
            ],
            "mod_stock": [
                "stock_m1014_buttstock"
            ],
            "mod_mount": [
                "570fd6c2d2720bc6458b457f",
                "570fd721d2720bc5458b4596",
                "58491f3324597764bc48fa02",
                "584924ec24597768f12ae244",
                "5b30b0dc5acfc400153b7124",
				"5d2da1e948f035477b1ce2ba"
            ]
        };
		DatabaseServer.tables.bots.types["untar"].inventory.mods.mag_m1014_magcap = {
			"cartridges": [
                "5d6e6772a4b936088465b17c",
                "5d6e6806a4b936088465b17e",
                "5d6e67fba4b9361bc73bc779",
                "560d5e524bdc2d25448b4571",
                "5d6e68a8a4b9360b6c0d54e2"
            ]
        };
	}
	
	static MacrossMX_M14_Support()
	{
		DatabaseServer.tables.bots.types["untar"].inventory.equipment.FirstPrimaryWeapon.push("M14");
		DatabaseServer.tables.bots.types["untar"].inventory.mods.M14 = {
			"mod_magazine": [
                "5aaf8a0be5b5b00015693243",
				"5addcce35acfc4001a5fc635"
            ],
            "mod_stock": [
                "5addc7005acfc4001669f275"
            ],
                "mod_barrel": [
                "5addbac75acfc400194dbc56"
            ],
                "mod_sight_rear": [
                "5abcbb20d8ce87001773e258"
            ],
                "mod_mount": [
                "5addbfe15acfc4001a5fc58b"
            ]
        };
	}
}

module.exports = MoreVariety;