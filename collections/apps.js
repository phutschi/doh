Apps = new Mongo.Collection("apps");

Apps.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
})

Apps.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
})
