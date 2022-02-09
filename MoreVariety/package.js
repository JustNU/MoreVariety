class Mod
{
    constructor()
    {
		Logger.info("Loading: MoreVariety");
		ModLoader.onLoad["MoreVariety"] = require("./src/morevariety.js").onLoadMod;
    }
}

module.exports.Mod = new Mod();