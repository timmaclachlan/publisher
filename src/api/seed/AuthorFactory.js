import { Factory } from "miragejs";
import faker from "@faker-js/faker";

export const AuthorFactory = Factory.extend({
  realName() {
    return faker.name.findName();
  },
  penName() {
    return faker.name.findName();
  },
  email() {
    return faker.internet.email();
  },
  phoneNumber() {
    return faker.phone.phoneNumber();
  },
  location() {
    return faker.address.country();
  },
  website() {
    return faker.internet.url();
  },
  address1() {
    return faker.address.streetAddress();
  },
  address2() {
    return faker.address.streetName();
  },
  address3() {
    return faker.address.city();
  },
  address4() {
    return faker.address.state();
  },
  postCode() {
    return faker.address.zipCode();
  },
  sortCode() {
    return faker.finance.account(6);
  },
  accountNo() {
    return faker.finance.account(8);
  },
  iban() {
    return faker.finance.iban();
  },
  bic() {
    return faker.finance.bic();
  },
  retainedClient() {
    return faker.random.arrayElement([true, false]);
  },
  notes() {
    return faker.word.noun(10);
  },
  active() {
    return faker.random.arrayElement([true, false]);
  },
});