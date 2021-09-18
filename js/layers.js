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
  requires: new Decimal(0.1), // Can be a function that takes requirement increases into account
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
    if (hasUpgrade("E", 32)) mult = mult.times(2);
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
      description: "Multiply Question gain by 0.025x.",
      cost: new Decimal(1),
      unlocked() {
        return player[this.layer].unlocked;
      }
    },
    12: {
      title: "How does microwaving a pizza help me learn js?",
      description: "Multiplies Question gain by 0.002x",
      cost: new Decimal(2),
      unlocked() {
        return hasUpgrade("E", 11);
      }
    },
    13: {
      title: "Variable? I hate math",
      description: "Multiplies Question gain by 0.002x",
      cost: new Decimal(4),
      unlocked() {
        return hasUpgrade("E", 12);
      }
    },
    21: {
      title: "Why's coding take so long?",
      description: "who knows? (unlock the next upgrade)",
      cost: new Decimal(5),
      unlocked() {
        return hasUpgrade("E", 13);
      }
    },
    22: {
      title: "ghost",
      description: "",
      cost: new Decimal(),
      style: {
        opacity: 0
      },
      unlocked() {
        return hasUpgrade("E", 21);
      }
    },
    23: {
      title: "Okay, now I need insparation...",
      description: "(Unlock the next 2 upgrades)",
      cost: new Decimal(10),
      unlocked() {
        return hasUpgrade("E", 21);
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
        return hasUpgrade("E", 23);
      }
    },
    32: {
      title: "What about an incremental?",
      description: "multiply E gain by 2",
      cost: new Decimal(10),
      unlocked() {
        return hasUpgrade("E", 23);
      }
    },
    33: {
      title: "What if I use this tree game and mod it?",
      description: "Unlock the next upgrade",
      cost: new Decimal(20),
      unlocked() {
        return hasUpgrade("E", 23);
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
        return hasUpgrade("E", 33);
      }
    },
    42: {
      title: "Oh, it already has mods?",
      description: "Almost there",
      cost: new Decimal(21),
      unlocked() {
        return hasUpgrade("E", 33);
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
        return hasUpgrade("E", 33);
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
        return hasUpgrade("E", 42);
      }
    },
    52: {
      title: "Okay, time to get to work... what's next?",
      description: "Start learning TMT, and gain answers.",
      cost: new Decimal(30),
      unlocked() {
        return hasUpgrade("E", 42);
      }
    },
    53: {
      title: "",
      description: "",
      cost: new Decimal(),
      style: {
        opacity: 0
      },
      type() {
        "ghost";
      },
      unlocked() {
        return hasUpgrade("E", 42);
      }
    }
  }
});
