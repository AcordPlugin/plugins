import i18n from "@acord/i18n";

export const COLORS = {
  DANGER: "#eb3d47",
  SECONDARY: "#8a8e93",
  SUCCESS: "#3aa360",
  PRIMARY: "#5865f2"
};

export const BADGES = [
  // GLOBAL BADGES
  [
    ["e3b341", "4e5d94"],
    ()=>i18n.format("ACORD_ADMIN"),
    ["707309693449535599", "319862027571036161"]
  ],
  [
    ["00eeff", "0062a0"],
    ()=>i18n.format("ACORD_HELPER"),
    ["377839917738360834", "869163375236620288", "367333221811355648"]
  ],
  [
    ["059092", "f1c55e"],
    ()=>i18n.format("ACORD_EARLY_MEMBER"),
    ["267066635842486273", "983441418196484168", "311571540401455105", "761247209773203468", "408525958782517248", "851920176575152129", "932321435744096326", "326734988177440769", "390742058928701442"]
  ],
  [
    ["990b00", "ff7474"],
    ()=>i18n.format("ACORD_BANNED"),
    ["435026627907420161", "377135247004794880"]
  ],

  // CUSTOM BADGES

  // dirt
  [
    ["18191c", "18191c"],
    ()=>"ghost.",
    ["367333221811355648"] 
  ],
  // Eashion
  [
    ["ffffff", "111437"],
    ()=>"Eashion",
    ["267066635842486273"] 
  ],

  // Giveaway Winners
  [
    ["0f74e0", "e3f213"],
    ()=>"Adolf",
    ["978756406377320478"]
  ]
]