const RankCalculationService = [
  {
    name: "Novice",
    image: "/assets/Novice.png",
    icon: "/assets/BlueRupee.png",
    minPoints: 0,
  },
  {
    name: "Apprentice",
    image: "/assets/Apprentice.png",
    icon: "/assets/RedRupee.png",
    reward: "Golden Leaves",
    minPoints: 50,
  },
  {
    name: "Master",
    image: "/assets/Master.png",
    icon: "/assets/PurpleRupee.png",
    reward: "Golden Crown",
    minPoints: 100,
  },
  { name: "Grandmaster", minPoints: 200 },
];

export default RankCalculationService;
