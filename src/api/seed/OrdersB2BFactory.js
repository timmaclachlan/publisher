import { Factory } from "miragejs";
import faker from "@faker-js/faker";

const NOBOOKS = 10;

export const OrdersB2BFactory = Factory.extend({
  bookId() {
    function randomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return randomNum(1, NOBOOKS);
  },
  orderDate() {
    return faker.date.past(2);
  },
  dispatchedDate() {
    return faker.date.past(2);
  },
  amountReceived() {
    return faker.finance.amount(1, 100);
  },
  quantity() {
    return faker.datatype.number({min: 1, max: 100});
  },
  royaltyAuthor() {
    return faker.finance.amount(1, 30);
  },
  royaltyPublisher() {
    return faker.finance.amount(1, 30);
  },
  amountReceivedDate() {
    return faker.date.past(2);
  },
  source() {
    return faker.random.arrayElement(['PUB','VEA','POD','CS','ING'])
  },
  adjustedAmountReceived() {
    return faker.datatype.boolean();
  },
  adjustedRoyalty() {
    return faker.datatype.boolean();
  },
  salesMethod() {
    return faker.random.arrayElement(['INV','POD', null])
  },
  postage() {
    return faker.finance.amount(1, 10);
  },
  printingCost() {
    return faker.finance.amount(1, 10);
  },
  comment() {
    return faker.word.noun();
  },
  deleted() {
    return faker.datatype.boolean()
  }
});