import faker from 'faker';
import Whitelist from '../../model/whitelist';
// import { createProfileMockPromise, removeAllResources } from './profile-mock';

const createWhitelistMockPromise = async () => {
  const mockData = {};

  const mockWhitelist = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    role: 'admin', 
    googleToken: faker.lorem.words(),
  };

  const whitelist = await new Whitelist(mockWhitelist).save();
  mockData.whiteList = whitelist; // HEY LOOK CAREFULLY AT WHITELIST, it's camel cased
  console.log('we got dat mockData my folks', JSON.stringify(mockData, null, 2));
  return mockData;
};

const removeWhitelistResources = () => {
  return Promise.all([
    Whitelist.remove({}),
    // removeAllResources(),
  ]);
};

export { createWhitelistMockPromise, removeWhitelistResources };
