// MoreFactions mod
Enabled = true; 						// true = enabled, false = disabled 				|| MoreFactions mod. Adds 3 new "PMC" factions. Affects Player Scav if PmcPlayerScav enabled.
Chances = 20;  							// 0-100											|| A chance of specific new faction group to spawn. 1 group per faction on a map.

// ScavVariety mod
Enabled = true; 						// true = enabled, false = disabled 				|| ScavVariety mod. Raiders/bosses have a small chance to replace regular scavs.
NewCustomFollowers = true;     			// true = enabled, false = disabled 				|| Adds new custom follower. Only followerKilla ATM.
FollowersInRaiderBotPool = true;		// true = enabled, false = disabled 				|| Adds boss' followers into ScavVariety's bot pool.
RaiderSpawnChance = 20; 				// 20 = 20% Raiders/Followers, 80% Scavs. 0-100		|| Raiders/Followers chance to replace regular Scavs.
BossSpawnChance = 1;   					// 1 = 1% Bosses, 99% Scavs. 0-100 					|| Bosses chance to replace regular Scavs.

// EnhancedPlayerScav
Enabled = true;  						// true = enabled, false = disabled 				|| EnhancedPlayerScav mod. Allows player's scav to spawn as some other bot.
"RaiderFollowersChance": 10,			// 10 = 10% Raider/Follower, 90% Scav. 0-100 		|| Scav vs Raider/Follower Generation Chance. ONLY FOR PLAYER SCAV
"PmcChance": 10,						// 10 = 10% PMC, 90% Scav. 0-100 					|| Scav vs PMC Generation Chance. ONLY FOR PLAYER SCAV
"BossChance": 1							// 1 = 1% Boss, 99% Scav. 0-100 					|| Scav vs Boss Generation Chance. ONLY FOR PLAYER SCAV

// BossesOnAllMaps mod
Enabled = true; 						// true = enabled, false = disabled 				|| BossesOnAllMaps mod. They will spawn on random locations. Might cause HUGE lag spikes on some maps (Worst offender is factory).
ReshalaChance = 19; 					// 19 = 19%. 0-100 									|| Reshala chance to spawn on other maps. Doesn't change the original's chance.
GluhkarChance = 21; 					// 21 = 21%. 0-100 									|| Gluhkar chance to spawn on other maps. Doesn't change the original's chance.
KillaChance = 19;   					// 19 = 19%. 0-100 									|| Killa chance to spawn on other maps. Doesn't change the original's chance.
ShturmanChance = 17; 					// 17 = 17%. 0-100 									|| Shturman chance to spawn on other maps. Doesn't change the original's chance.
SanitarChance = 19; 					// 19 = 19%. 0-100 									|| Sanitar chance to spawn on other maps. Doesn't change the original's chance.
RaiderSquadChance = 30; 				// 30 = 30%. 0-100 									|| Raider Squad chance to spawn on other maps. Only 1 squad per map squad.
CultistGroupChance = 14;    			// 14 = 14%. 0-100 									|| Cultist Group chance to spawn on other maps. Doesn't change the original's chance.

// CanSpawnOnFollowingMaps 				// true = enabled, false = disabled 				|| Adjust where additional bosses can spawn. Doesn't change default bosses.
"bigmap": false,						// Customs
"factory4_day": false,					// Factory Day
"factory4_night": false,				// Factory Night
"interchange": false,					// Interchange
"laboratory": false,					// Labs
"rezervbase": false,					// Reserve
"shoreline": false						// Shoreline
"woods": false							// Woods
	