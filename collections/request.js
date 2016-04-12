Requests = new Mongo.Collection("requests");

Requests.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
})

Requests.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
})
