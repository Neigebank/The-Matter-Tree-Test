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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
            effect() {if (hasUpgrade('m', 21)) {return ((player[this.layer].points.add(1).log10().mul(2)).add(1)).times(1.5)} else {return (player[this.layer].points.add(1).log10().mul(2)).add(1)}},
            effectDisplay() {return "×" + format(upgradeEffect(this.layer, this.id))},
        },
        13: {
            title: "Synergism.",
            description: "Points boost matter gain.",
            cost: new ExpantaNum(10),
            effect() {if (hasUpgrade('m', 21)) {return ((player.points.add(1).log10().div(2)).add(1)).times(1.5)} else {return (player.points.add(1).log10().div(2)).add(1)}},
            effectDisplay() {return "×" + format(upgradeEffect(this.layer, this.id))},
        },
        21: {
            title: "Booster.",
            description: "All first row upgrade effects are multiplied by ×1.5.",
            cost: new ExpantaNum(25),
        },
        22: {
            title: "Upgrade Powerer.",
            description: "Each upgrade boosts point gain by ×1.3.",
            cost: new ExpantaNum(100),
            effect() {return new ExpantaNum(1.3).pow(player[this.layer].upgrades.length)},
            effectDisplay() {return "×" + format(upgradeEffect(this.layer, this.id))},
        },
        23: {
            title: "Narcissism.",
            description: "Points boost themselves.",
            cost: new ExpantaNum(300),
            effect() {return player.points.pow(0.1).add(1)},
            effectDisplay() {return "×" + format(upgradeEffect(this.layer, this.id))},
        }
    },
    layerShown(){return true}
})
