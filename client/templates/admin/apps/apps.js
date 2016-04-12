Template.adminApps.onCreated(() => {
  let self = Template.instance();

  self.state = new ReactiveDict();
  Tracker.autorun(() => {
    self.subscribe('apps')
    self.subscribe('users')
    self.state.set('userRoles', Roles.getRolesForUser(Meteor.userId()))
  });
})

Template.adminApps.helpers({
  apps: () => {
    return Apps.find();
  },
  isAuthorized: () => {
    let self = Template.instance();

    return self.state.get('userRoles') == 'administrators'
  },
  isAppOnline: (id) => {
    let app = Apps.findOne({_id: id})

    if (app) {
      return app.status.code === 200
    }
  },
  appOwner: (userId) => {
    let user = Meteor.users.findOne({_id: userId})

    return user ? user.username : '[user not found]'
  }
})

Template.adminApps.events({
  'click #contactApp': (e) => {
    let app = e.currentTarget.dataset.app;

    if (app) {
      Meteor.call('contactApp', app, (e, r) => {
        if (e) {
          alertify.notify(e, 'warning')
        } else if (r.code != 200) {
          alertify.notify(r.message, 'danger')
        } else {
          alertify.notify('Refreshed the App [200 - OK!]', 'success')
        }
      })
    }
  }
})
