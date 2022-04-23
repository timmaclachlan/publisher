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
    return faker.email.findName();
  },
  phoneNumber() {
    return faker.phone.phoneNumber();
  },
  location() {
    return faker.address.country();
  },
  address1() {
    return faker.address.address1();
  },
  address2() {
    return faker.address.address2();
  },
  address3() {
    return faker.address.address3();
  },
  address4() {
    return faker.address.address4();
  },
  postCode() {
    return faker.address.postCode();
  },
  sortCode() {
    return faker.finance.account(6);
  },
  accountNo() {
    return faker.finance.account(8);
  },
  retainedClient() {
    return faker.random.arrayElement([true, false]);
  },
  gender() {
    return faker.random.arrayElement(['M', 'F']);
  },
  notes() {
    return faker.word.noun(10);
  },
  active() {
    return faker.random.arrayElement([true, false]);
  },
});