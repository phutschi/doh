UI.registerHelper('helper_time_elapsed', (date) => {
  // Returns the time in minutes between given datetime and current dateTime
  let now = moment(),
      diff = now.diff(date, 'minutes'),
      d = new ReactiveDict();

  d.set('diff', diff)

  Meteor.setInterval(() => {
    now = moment();
    d.set('diff', now.diff(date, 'minutes'));
  }, 1000 * 60)

  return d.get('diff');
})
