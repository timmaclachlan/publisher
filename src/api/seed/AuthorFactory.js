import { Factory } from "miragejs";
import faker from "@faker-js/faker";

export const AuthorFactory = Factory.extend({
  address() {
    return faker.address.streetAddress(true);
  },
  active() {
    return faker.random.arrayElement([true, false]);
  },
});