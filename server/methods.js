import {createUser} from './modules/users';
import {createRequest, contactApp} from './modules/contact-apps';
import Future from 'fibers/future'

Meteor.methods({
  addUser: (doc) => {
    createUser(doc);
  },
  contactApp: (applicationId) => {
    let request = createRequest(applicationId);

    return request
  }
});
