const types = [
  { name: "water",
    double: ["fire", "ground", "rock"],
    half: ["water", "grass", "dragon"]
  },
  { name: "fire",
    double: ["grass", "ice", "bug"],
    half: ["water", "fire", "rock","dragon"]
  },
  { name: "normal",
    double: ["none"],
    half: ["rock"],
    zero: "ghost"
  },
  { name: "grass",
    double: ["water", "ground", "rock"],
    half: ["fire", "grass", "poison", "flying","bug","dragon"]
  },
  { name: "electric",
    double: ["water", "flying"],
    half: ["dragon", "electric", "grass"],
    zero: "ground"
  },
  { name: "ice",
    double: ["grass", "ground", "flying", "dragon"],
    half: ["ice", "water", "fire"]
  },
  { name: "fighting",
    double: ["normal", "ice", "rock"],
    half: ["psychic", "bug", "flying", "poison"],
    zero: "ghost"
  },
  { name: "poison",
    double: ["grass"],
    half: ["poison", "ground", "rock", "ghost"]
  },
  { name: "ground",
    double: ["fire", "electric", "rock", "poison"],
    half: ["grass", "bug"]
  },
  { name: "flying",
    double: ["grass", "fighting", "bug"],
    half: ["electric", "rock"]
  },
  { name: "psychic",
    double: ["fighting", "poison"],
    half: ["psychic"]
  },
  { name: "bug",
    double: ["grass", "psychic"],
    half: ["poison", "ghost", "flying", "fighting", "fire"]
  },
  { name: "rock",
    double: ["fire", "ice", "flying", "bug"],
    half: ["fighting", "ground"]
  },
  { name: "ghost",
    double: ["ghost", "psychic"],
    half: ["none"],
    zero: "normal"
  },
  { name: "dragon",
    double: ["dragon"],
    half: [ "none"]
  }
]

module.exports = types;