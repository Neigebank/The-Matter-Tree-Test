addLayer("m", {
    name: "matter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
    }},
    color: "#9d59eb",
    requires: new ExpantaNum(10), // Can be a function that takes requirement increases into account
    resource: "matter", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
        if (hasUpgrade('m', 13)) mult = mult.times(upgradeEffect('m', 13))
        if (hasUpgrade('m', 31)) mult = mult.times(2)
        if (hasUpgrade('m', 32)) mult = mult.times(upgradeEffect('m', 32).matter)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for matter.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Humble Beginnings.",
            description: "Double point gain.",
            cost: new ExpantaNum(1),
        },
        12: {
            title: "More Matter.",
            description: "Matter boosts point gain.",
            cost: new ExpantaNum(3),
            unlocked() {if (hasUpgrade('m', 11)) {return true} else {return false}},
            effect() {if (hasUpgrade('m', 21)) {return ((player[this.layer].points.add(1).log10().mul(2)).add(1)).times(1.5)} else {return (player[this.layer].points.add(1).log10().mul(2)).add(1)}},
            effectDisplay() {return "×" + format(upgradeEffect(this.layer, this.id))},
        },
        13: {
            title: "Synergism.",
            description: "Points boost matter gain.",
            cost: new ExpantaNum(10),
            unlocked() {if (hasUpgrade('m', 12)) {return true} else {return false}},
            effect() {if (hasUpgrade('m', 21)) {return ((player.points.add(1).log10().div(2)).add(1)).times(1.5)} else {return (player.points.add(1).log10().div(2)).add(1)}},
            effectDisplay() {return "×" + format(upgradeEffect(this.layer, this.id))},
        },
        21: {
            title: "Booster.",
            description: "All first row upgrade effects are multiplied by ×1.5.",
            cost: new ExpantaNum(25),
            unlocked() {if (hasUpgrade('m', 13)) {return true} else {return false}},
        },
        22: {
            title: "Upgrade Powerer.",
            description: "Each upgrade boosts point gain by ×1.3.",
            cost: new ExpantaNum(100),
            unlocked() {if (hasUpgrade('m', 21)) {return true} else {return false}},
            effect() {return new ExpantaNum(1.3).pow(player[this.layer].upgrades.length)},
            effectDisplay() {return "×" + format(upgradeEffect(this.layer, this.id))},
        },
        23: {
            title: "Narcissism.",
            description: "Points boost themselves.",
            cost: new ExpantaNum(300),
            unlocked() {if (hasUpgrade('m', 22)) {return true} else {return false}},
            effect() {return player.points.pow(0.1).add(1)},
            effectDisplay() {return "×" + format(upgradeEffect(this.layer, this.id))},
        },
        31: {
            title: "New Concepts.",
            description: "Unlock your first buyable and double matter gain.",
            cost: new ExpantaNum(1000),
            unlocked() {if (hasUpgrade('m', 23)) {return true} else {return false}},
        },
        32: {
            title: "Time is Key.",
            description: "Time since last reset boosts points and matter.",
            cost: new ExpantaNum(5000),
            effect() {return {points: new ExpantaNum(Math.log10(player[this.layer].resetTime + 1) * 2 + 1), matter: new ExpantaNum(Math.log10(player[this.layer].resetTime + 1) + 1)}},
            fullDisplay() {return  "<h3>Time is Key.</h3><br>" + "<span>Time since last reset boosts points and matter.</span><br>" + "Effects: ×" + format(upgradeEffect(this.layer, this.id).points) + ", " + "×" + format(upgradeEffect(this.layer, this.id).matter) + "<br><br>Cost: " + "5,000" + " matter"},
            unlocked() {if (hasUpgrade('m', 31)) {return true} else {return false}},
        }
    },

    buyables: {
        11: {
            title: "Point Multipicator.",
            display() {return "<br>Triple point gain.<br><br><br>Cost formula: 1,000 × 8<sup style='font-size: 105%; line-height: 0px;'>x</sup><br>Cost: " + format(this.cost()) + "<br>Amount: " + getBuyableAmount(this.layer, this.id) + "<br>Currently: ×" + format(buyableEffect(this.layer, this.id))},
            cost() {return (new ExpantaNum(8)).pow(getBuyableAmount(this.layer, this.id)).mul(1000)},
            canAfford() {return player[this.layer].points.gte(this.cost())},
            buy() {player[this.layer].points = player[this.layer].points.sub(this.cost()); setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))},
            effect() {return (new ExpantaNum(3)).pow(getBuyableAmount(this.layer, this.id))},
            unlocked() {return hasUpgrade(this.layer, 31)}
        },
    },

    infoboxes: {
        lore: {
            title: "Introductions.",
            body() { return "The goal of this game is to make it reach incredibly high values, while at the same time progressing very gradually.<br><br><i>Hope you enjoy it.</i>" },
        },
    },
    layerShown(){return true}
})
