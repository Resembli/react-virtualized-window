import { LoremIpsum } from "lorem-ipsum"

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 2,
  },
  wordsPerSentence: {
    max: 10,
    min: 3,
  },
})

export const chatData = Array.from({ length: 1000 }, () => {
  const isLeft = Math.random() < 0.5

  const numberOfSentences = Math.floor(Math.random() * 4) + 1

  return {
    message: lorem.generateSentences(Math.max(1, numberOfSentences - 1)),
    isLeft,
    numberOfSentences,
  }
})
