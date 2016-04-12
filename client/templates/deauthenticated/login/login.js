Template.login.onCreated(() => {
  Template.instance().state = new ReactiveDict();
})

Template.login.helpers({
  validationError: () => {
    const instance = Template.instance();
    let validationError = instance.state.get('loginValidationError')

    return validationError ? validationError.message : null
  }
})

Template.login.events({
  'submit .form-signin': (e, instance) => {
    e.preventDefault();

    let userDoc = {
      username: document.getElementById('inputUsername').value,
      password: document.getElementById('inputPassword').value
    }

    Meteor.loginWithPassword(userDoc.username, userDoc.password, (e, r) => {
      e ? instance.state.set('loginValidationError', {message: e.reason}) : FlowRouter.go('home');
    })
  }
})
