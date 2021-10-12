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
  doReset(resettingLayer) {
    let keep = [];
    if (hasMilestone("A", 0) && resettingLayer == "A") keep.push("upgrades");
    if (hasMilestone("C", 2) && resettingLayer == "C") keep.push("upgrades");
    if (layers[resettingLayer].row > this.row) layerDataReset("E", keep);
  },

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
    if (hasUpgrade("A", 11)) mult = mult.times(2);
    if (hasUpgrade("A", 12)) mult = mult.times(2);
    if (hasMilestone("C", 0)) mult = mult.times(3);
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
      description: "Multiply Question gain by 2.5x.",
      cost: new Decimal(1),
      unlocked() {
        return player[this.layer].unlocked;
      }
    },
    12: {
      title: "How does microwaving a pizza help me learn js?",
      description: "Multiplies Question gain by 2x",
      cost: new Decimal(2),
      unlocked() {
        return hasUpgrade("E", 11);
      }
    },
    13: {
      title: "Variable? I hate math",
      description: "Multiplies Question gain by 2x",
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
      canAfford: false,
      unlocked() {
        return hasUpgrade("E", 21);
      }
    },
    23: {
      title: "Okay, now I need inspiration...",
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
      canAfford: false,
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
      canAfford: false,
      unlocked() {
        return hasUpgrade("E", 33);
      }
    },
    42: {
      title: "Oh, it already has mods?",
      description: "Almost there",
      cost: new Decimal(20),
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
      canAfford: false,
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
      canAfford: false,
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
      canAfford: false,
      type() {
        "ghost";
      },
      unlocked() {
        return hasUpgrade("E", 42);
      }
    }
  },
  tabFormat: {
    Enigmas: {
      // these are the names of the subtabs, whatever you put here is what appears on the button
      content: [
        "main-display",
        "prestige-button",
        "blank",
        "milestones",
        "blank",
        "blank",
        "upgrades" // all the stuff for the actual layer you're using
      ]
    },
    Answers: {
      embedLayer: "A",
      unlocked() {
        return (
          hasUpgrade("E", 52) ||
          hasUpgrade("A", 11) ||
          player.C.unlocked ||
          player.A.unlocked
        );
      },
      content: [
        "main-display",
        "prestige-button",
        "blank",
        "milestones",
        "blank",
        "blank",
        "upgrades",
        "buyables"// all the stuff for the actual layer you're using
      ]
    },
    Conundrums: {
      embedLayer: "C",
      unlocked() {
        return hasUpgrade("A", 13) || hasMilestone("C", 2) || player.C.unlocked;
      },
      content: [
        "main-display",
        "prestige-button",
        "blank",
        "milestones",
        "blank",
        "buyables",
        "blank",
        "upgrades" // all the stuff for the actual layer you're using
      ]
    }
  }
});
addLayer("A", {
  startData() {
    return {
      // startData is a function that returns default data for a layer.
      unlocked: false, // You can add more variables here to add them to your layer.
      points: new Decimal(0) // "points" is the internal name for the main resource of the layer.
    };
  },

  color: "#4BDC13", // The color for this layer, which affects many elements.
  resource: "Answers", // The name of this layer's main prestige resource.
  row: 1,
  position: 0,
  baseResource: "Enigmas", // The name of the resource your prestige gain is based on.
  baseAmount() {
    return player.E.points;
  }, // A function to return the current amount of baseResource.

  requires: new Decimal(30), // The amount of the base needed to  gain 1 of the prestige currency.
  // Also the amount required to unlock the layer.

  type: "normal", // Determines the formula used for calculating prestige currency.
  exponent: 0.5, // "normal" prestige gain is (currency^exponent).

  gainMult() {
    mult = new Decimal(1);
    if (hasMilestone("C", 1)) mult = mult.times(2);
    return mult;
  },
  gainExp() {
    // Returns your exponent to your gain of the prestige resource.
    return new Decimal(1);
  },
  doReset(resettingLayer) {
    let keep = [];
    if (hasMilestone("C", 2) && resettingLayer == "C") keep.push("upgrades");
    if (hasMilestone("C", 2) && resettingLayer == "C") keep.push("milestones");
    if (layers[resettingLayer].row > this.row) layerDataReset("A", keep);
  },
  layerShown() {
    return false;
  }, // Returns a bool for if this layer's node should be visible in the tree.

  upgrades: {
    11: {
      title: "Oh, it's called Javascript, not Java's Crypt.",
      description: "Multiply Question gain by 2x",
      cost: new Decimal(1),
      unlocked() {
        return hasUpgrade("E", 52) || player.A.points.gte(new Decimal(0));
      }
    },
    12: {
      title: "Microwaved Pizza is a person? Seriously?.",
      description: "Multiply E gain by 2x &...",
      cost: new Decimal(2),
      unlocked() {
        return hasUpgrade("A", 11);
      }
    },
    13: {
      title: "Variables are kinda easy.",
      description: "Good freaking luck",
      cost: new Decimal(3),
      effect() {},
      unlocked() {
        return hasUpgrade("A", 12);
      }
    },
    14: {
      title: "Microwaved Pizza is a person? Seriously?.",
      description: "Understand buyables",
      cost: new Decimal(100),
      unlocked() {
        return hasUpgrade("A", 13);
      }
    }
  },
  milestones: {
    0: {
      requirementDescription: "5 Answers",
      done() {
        return player[this.layer].best.gte(5);
      }, // Used to determine when to give the milestone
      effectDescription: "Keep Enigma upgrades on Answer reset"
    }
  }
});
addLayer("C", {
  name: "Conundrum", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: false,
      points: new Decimal(0)
    };
  },
  color: "#4BDC13",
  requires: new Decimal(100), // Can be a function that takes requirement increases into account
  resource: "Conundrums", // Name of prestige currency
  baseResource: "Enigmas", // Name of resource prestige is based on
  baseAmount() {
    return player.E.points;
  }, // Get the current amount of baseResource
  type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
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
  row: 2, // Row the layer is in on the tree (0 is the first row)
  layerShown() {
    return false;
  },
  milestones: {
    0: {
      requirementDescription: "1 Conundrum",
      done() {
        return player[this.layer].best.gte(1);
      }, // Used to determine when to give the milestone
      effectDescription:
        "Have a conundrum about the community, and begin to support it. The chaos makes your Enigma gain increase"
    },
    1: {
      requirementDescription: "2 Conundrums",
      done() {
        return player[this.layer].best.gte(2);
      }, // Used to determine when to give the milestone
      effectDescription:
        "I've been working in silence for too long. maybe I should get a playlist? It'd help me think clearer, maybe answer things quicker?"
    },
    2: {
      requirementDescription: "3 Conundrums",
      done() {
        return player[this.layer].best.gte(3);
      }, // Used to determine when to give the milestone
      effectDescription:
        "Just because these conundrums make me question my tactics doesn't mean I have to scap everything. <br> Keep enigma & answer progress on conundrum reset."
    }
  }
});
