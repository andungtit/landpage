export const planDestinations = [
  "Singapore",
  "Da Nang",
  "Bangkok",
  "Tokyo",
  "Seoul",
  "Ho Chi Minh City",
];

export const planGroups = [
  { key: "friends", title: "planFriends" },
  { key: "couple", title: "planCouple" },
  { key: "solo", title: "planSolo" },
];

export const planGroupNames = {
  friends: "shared plan",
  couple: "for two",
  solo: "just for you",
};

export const planLoadingSteps = [
  "planLoadingStep0",
  "planLoadingStep1",
  "planLoadingStep2",
  "planLoadingStep3",
];

// [title, copy(destination)] — giống plan-demo.js gốc
export const planLoadingMessages = [
  [
    "Checking OnePlan.",
    (destination) =>
      `Looking for a ready-made route with real places in ${destination}.`,
  ],
  [
    "Finding real places.",
    (destination) => `Matching places, addresses and photos in ${destination}.`,
  ],
  [
    "Putting the day together.",
    (destination) =>
      `Ordering the stops so your day in ${destination} flows well.`,
  ],
  [
    "Loading the details.",
    () => "Adding images, map links and useful notes to your route.",
  ],
];
