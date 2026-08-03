export const dreamControlIntro = {
  whatItIs:
    "Dream control is the practice of intentionally influencing what happens once you're lucid — how you move, what you interact with, and how the dream unfolds around you.",
  howItDevelops:
    "It's highly personal. Some people find certain things come easily right away, while others take real practice. Most lucid dreamers describe it as something that develops gradually, not all at once.",
};

export type DreamControlTopic = {
  id: string;
  title: string;
  overview: string;
  whyExperiment: string;
  commonApproaches: string[];
  suggestions: string[];
  commonChallenges: string[];
  whatToExpect: string;
};

export const dreamControlTopics: DreamControlTopic[] = [
  {
    id: "movement",
    title: "Movement",
    overview:
      "How you move through a dream — walking, running, or something stranger — is often the first thing lucid dreamers experiment with.",
    whyExperiment:
      "Movement is a natural starting point because it's familiar, low-pressure, and easy to notice whether it 'worked' or not.",
    commonApproaches: [
      "Walking deliberately and noticing the sensation of each step.",
      "Trying an unusual form of movement, like gliding or floating slightly.",
      "Reaching toward something specific and moving purposefully toward it.",
    ],
    suggestions: [
      "Start with small, calm movements rather than anything sudden or dramatic.",
      "Pay attention to the sensation of moving, which some report helps keep the dream stable.",
    ],
    commonChallenges: [
      "Movement can feel sluggish or resistant, especially early in a dream.",
      "Trying to move too quickly or forcefully is sometimes reported to disrupt the dream.",
    ],
    whatToExpect:
      "How movement feels varies a lot between people and even between dreams. It tends to become easier with repeated, calm practice — there's no fixed timeline, and a dream that resists movement isn't a failure.",
  },
  {
    id: "flying",
    title: "Flying",
    overview:
      "Flying is one of the most commonly reported lucid dream experiences, and often one people specifically look forward to trying.",
    whyExperiment:
      "It's a classic example of doing something impossible in waking life, which makes it a popular way to test and enjoy lucidity.",
    commonApproaches: [
      "Starting with a small jump and letting it extend into floating or flight.",
      "Imagining a takeoff, like diving forward or pushing off the ground.",
      "Looking upward and forming a clear intention to rise.",
    ],
    suggestions: [
      "Approach it calmly rather than urgently — excitement is a commonly reported reason lucid dreams end early.",
      "If flight doesn't happen right away, a slower build (floating, then rising) is often easier than trying to fly instantly.",
    ],
    commonChallenges: [
      "Some dreamers report an initial 'gravity' that resists leaving the ground.",
      "Excitement at the idea of flying can itself cut the dream short.",
    ],
    whatToExpect:
      "Flying is often described as something that becomes more natural with practice. Not every attempt succeeds, and that's a normal part of experimenting with it — not a sign you're doing something wrong.",
  },
  {
    id: "dream-characters",
    title: "Dream Characters",
    overview:
      "Dream characters are the people (or other figures) that appear in a dream, and many lucid dreamers experiment with interacting with them.",
    whyExperiment:
      "Interacting with dream characters can feel like a meaningful, sometimes reflective part of a lucid dream, whether through simple conversation or more open-ended interaction.",
    commonApproaches: [
      "Approaching a dream character calmly and starting a conversation.",
      "Asking a dream character a question and observing how they respond.",
      "Simply observing a dream character's behavior without interacting.",
    ],
    suggestions: [
      "Treat dream characters with the same calm curiosity as the rest of the dream — there's no need to control the interaction.",
      "If a conversation feels strange or the character reacts unexpectedly, that's a commonly reported part of the experience.",
    ],
    commonChallenges: [
      "Dream characters can behave unpredictably or seem to have their own 'logic.'",
      "Some dreamers report characters becoming less responsive if the dreamer tries to force a specific reaction.",
    ],
    whatToExpect:
      "Interactions with dream characters vary widely and are often described as one of the more unpredictable parts of dream control. Approaching them with openness rather than a fixed expectation tends to be described as the more comfortable approach.",
  },
  {
    id: "location-changes",
    title: "Location Changes",
    overview:
      "Changing your location within a dream — teleporting, walking through a door into a new scene, or transforming the environment — is a commonly explored form of dream control.",
    whyExperiment:
      "It's often described as a natural extension of exploring a lucid dream once basic stability feels comfortable.",
    commonApproaches: [
      "Walking through a doorway while picturing a specific new location on the other side.",
      "Spinning gently and picturing a new scene before stopping.",
      "Closing your eyes briefly within the dream and picturing the desired location.",
    ],
    suggestions: [
      "Have a clear, simple destination in mind rather than something vague.",
      "Some dreamers report that spinning or a 'transition' technique (like a doorway) helps more than trying to change the scene instantly.",
    ],
    commonChallenges: [
      "The environment may only partially change, or blend with the current scene.",
      "Trying to force an instant change is sometimes reported to be harder than using a transition.",
    ],
    whatToExpect:
      "Location changes are often described as one of the trickier dream control skills to develop consistently. Partial or unexpected results are common and considered a normal part of practicing this.",
  },
  {
    id: "object-interaction",
    title: "Object Interaction",
    overview:
      "Creating, changing, or interacting with objects in a dream — like summoning something in your hand or altering an object's appearance — is another commonly explored area.",
    whyExperiment:
      "It offers a smaller-scale, often easier starting point for practicing intention compared to larger changes like flying or location shifts.",
    commonApproaches: [
      "Reaching out with an open hand and expecting an object to appear in it.",
      "Focusing on an existing object and trying to change one detail about it, like its color.",
      "Opening a container (a box, a door) and forming an intention about what's inside.",
    ],
    suggestions: [
      "Start with small, simple changes rather than complex ones.",
      "A calm, expectant attitude is often described as more effective than concentrating forcefully.",
    ],
    commonChallenges: [
      "Objects may appear differently than intended or not appear at all.",
      "Overthinking the details of an object is sometimes reported to make the attempt harder.",
    ],
    whatToExpect:
      "Object interaction is often one of the more approachable dream control skills, but results still vary. A partial or unexpected result is a normal part of experimenting, not a sign of doing it 'wrong.'",
  },
  {
    id: "setting-intentions",
    title: "Setting Intentions",
    overview:
      "Beyond any single skill, many lucid dreamers set a broader intention for what they want to explore or accomplish once lucid.",
    whyExperiment:
      "Having a loose plan is commonly reported to help make better use of a lucid dream, since it can be easy to forget what you wanted to try once you're actually in it.",
    commonApproaches: [
      "Deciding on one simple goal before sleep, like 'I want to try flying tonight.'",
      "Keeping a short mental list of a few things to try, in case the first doesn't work out.",
      "Revisiting an intention from earlier in the day once lucid, rather than deciding in the moment.",
    ],
    suggestions: [
      "Keep intentions simple and few — trying to remember a long list in a dream is commonly reported to be difficult.",
      "Pair this with reviewing your Dream Journal or Dream Incubation intention beforehand, since both already build the same habit.",
    ],
    commonChallenges: [
      "It's common to forget a planned intention once actually lucid, especially early on.",
      "Trying to accomplish too much in one dream can make it harder to focus on any one thing.",
    ],
    whatToExpect:
      "Remembering and following through on an intention tends to improve with the same kind of consistent, calm practice as everything else in dream control — occasional forgetfulness is a normal, common part of the process.",
  },
];