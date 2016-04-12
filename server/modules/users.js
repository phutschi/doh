const _createUser = (doc) => {
  check(doc, {username: String, password: String, passwordConfirmation: String, email: String});

  if (_validateEmail(doc.email)) {
    let passwordValidation = _checkPasswords(doc.password, doc.passwordConfirmation);

    if (!passwordValidation.isLongEnough) {
      throw new Meteor.Error('password-too-short', 'The password is too short')
    } else if (!passwordValidation.passwordsDoMatch) {
      throw new Meteor.Error('password-dont-match', 'The passwords do not match')
    } else {
      let newUserId = Accounts.createUser(doc)

      return newUserId
    }
  } else {
    throw new Meteor.Error('email-validation-error', 'The email validation failed')
  }
}

const _validateEmail = (email) => {
  let emailRegex = new RegExp("^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$", "i");
  let isValidEmail = email.match(emailRegex);

  return isValidEmail != null;
}

const _checkPasswords = (password, passwordConfirmation) => {
  let securePasswordLength = Meteor.settings.private.securePasswordLength

  let validation = {
    isLongEnough: password.length >= securePasswordLength,
    passwordsDoMatch: password == passwordConfirmation
  }

  return validation
}

export const createUser = _createUser
