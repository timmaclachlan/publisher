import { Factory } from "miragejs";
import faker from "@faker-js/faker";

const NOAUTHORS = 10;

export const BookFactory = Factory.extend({
  price() {
    return faker.finance.amount(3, 10);
  },
  title() {
    const capitalize = (sentence) => {
      const words = sentence.split(" ");
      return words
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1);
        })
        .join(" ");
    };

    return capitalize(
      `${faker.word.adjective()} ${faker.word.adjective()} ${faker.word.noun()}`
    );
  },
  authorId() {
    function randomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //https://www.w3schools.com/js/js_random.asp
    return randomNum(3, NOAUTHORS);
  },
  publicationDate() {
    return faker.date.recent();
  },
  published() {
    return faker.random.arrayElement([true, false]);
  },
  stillSelling() {
    return faker.random.arrayElement([true, false]);
  },
  terminated() {
    return faker.random.arrayElement([true, false]);
  },
  matureContent() {
    return faker.random.arrayElement([true, false]);
  },
  onHold() { return faker.random.arrayElement([true, false]);  },
  genre() {
    return faker.random.arrayElement([
      "Sci-Fi",
      "Romance",
      "Comedy",
      "Non-Fiction",
    ]);
  },
  service() {  return faker.random.arrayElement(["EPPS", "PPS", "EPS"]); },
  isbn() {
    return "909-32-2232323"
  },
  printCost() { faker.finance.amount(1, 20)}
});
