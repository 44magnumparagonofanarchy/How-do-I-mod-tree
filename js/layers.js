addLayer("E", {
  name: "Enigma", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0)
    };
  },
  color: "#4BDC13",
  requires: new Decimal(0.10), // Can be a function that takes requirement increases into account
  resource: "Enigmas", // Name of prestige currency
  baseResource: "Questions", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  row: 0, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    {
      key: "e",
      description: "E: Reset for Enigma points",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      }
    }
  ],
  layerShown() {
    return true;
  },
  upgrades: {
    11: {
      title: "What is Java's Crypt?",
      description: "Multiply Question by 0.025x.",
      cost: new Decimal(1),
      unlocked() {
        return player[this.layer].unlocked;
      } 
    },
        12: {
      title: "",
      description: "",
      cost: new Decimal(),
      unlocked() {
        return hasUpgrade("E", 11 );
      } 
    },
            13: {
      title: "",
      description: "",
      cost: new Decimal(),
      unlocked() {
        return hasUpgrade("E", 11);
      } 
    },
            21: {
      title: "",
      description: "",
      cost: new Decimal(),
      unlocked() {
        return hasUpgrade("E", 11);
      } 
    },
            22: {
      title: "",
      description: "",
      cost: new Decimal(),
              style: {
    opacity: 0
},
      unlocked() {
        return hasUpgrade("E", 11);
      } 
    },
            23: {
      title: "",
      description: "",
      cost: new Decimal(),
      unlocked() {
        return hasUpgrade("E", 11);
      } 
    },
            31: {
      title: "",
      description: "",
      cost: new Decimal(),
              style: {
    opacity: 0
},
      unlocked() {
        return hasUpgrade("E", 11);
      } 
    },
            32: {
      title: "",
      description: "",
      cost: new Decimal(),
      unlocked() {
        return hasUpgrade("E", 17);
      } 
    },
            33: {
      title: "",
      description: "",
      cost: new Decimal(),
      unlocked() {
        return hasUpgrade("E", 18);
      } 
    },
    41: {
      title: "",
      description: "",
      cost: new Decimal(),
      style: {
    opacity: 0
},
      unlocked() {
        return hasUpgrade("E", 18);
      } 
    },
    42: {
      title: "",
      description: "",
      cost: new Decimal(),
      unlocked() {
        return hasUpgrade("E", 18);
      } 
    },
    43: {
      title: "",
      description: "",
      cost: new Decimal(),
      style: {
    opacity: 0
},
      unlocked() {
        return hasUpgrade("E", 18);
      } 
    },
    51: {
      title: "",
      description: "",
      cost: new Decimal(),
      style: {
    opacity: 0
},
      unlocked() {
        return hasUpgrade("E", 18);
      } 
    },
    52: {
      title: "",
      description: "",
      cost: new Decimal(),
      unlocked() {
        return hasUpgrade("E", 18);
      } 
    },
    53: {
      title: "",
      description: "",
      cost: new Decimal(),
      style: {
    opacity: 0
},
      unlocked() {
        return hasUpgrade("E", 18);
      } 
    },
  }
});
