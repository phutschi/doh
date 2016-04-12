let userRoutes = FlowRouter.group({
  triggersEnter: [(context, redirect) => {
    if (!Meteor.loggingIn || !Meteor.userId()) {
      FlowRouter.go('login')
    }
  }]
})

userRoutes.route('/', {
  name: 'home',
  action: () => {
    BlazeLayout.render('applicationLayout', {
      header: 'navbar',
      main: 'logs'
    });
  }
})

userRoutes.route('/admin/apps', {
  name: 'admin',
  action: () => {
    BlazeLayout.render('applicationLayout', {
      header: 'navbar',
      main: 'adminApps'
    })
  }
})

FlowRouter.route('/login', {
  name: 'login',
  action: () => {
    BlazeLayout.render('applicationLayout', {
      main: 'login'
    });
  }
})

FlowRouter.route('/logout', {
  name: 'logout',
  action: () => {
    Meteor.logout(() => {
      FlowRouter.go('login')
    });
  }
})

FlowRouter.route('/signup', {
  name: 'signup',
  action: () => {
    BlazeLayout.render('applicationLayout', {
      main: 'signup'
    });
  }
})
