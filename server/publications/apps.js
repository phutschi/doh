Meteor.publish('apps', () => {
  return Apps.find();
});
