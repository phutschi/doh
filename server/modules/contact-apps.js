const _setAppSatus = (appId, statusCode, message) => {
  let app = Apps.findOne({applicationId: appId})

  if (statusCode != 200) {
    query = {status: {code: statusCode, message: message}}
  } else {
    query = {lastContact: new Date(), status: {code: statusCode, message: message}}
  }

  Apps.update({_id: app._id}, {$set: query})
}

const _connectApp = (appId) => {
  let app = Apps.findOne({applicationId: appId});

  if (!app) {
    throw new Meteor.Error('app-not-found', 'This App was not found')
  }

  let url = app.contactUrl
  let response = HTTP.get(url)

  if (response && response.statusCode != 200) {
    _setAppSatus(appId, response.statusCode, response.content)
    throw new Meteor.Error('app-error', response.content)
  } else {
    if (response.content === app.applicationId) {
      _setAppSatus(appId, 200, 'Ok')
    } else {
      _setAppSatus(appId, 400, 'App responded with wrong content')
    }
  }

  let status = _getAppStatus(appId)

  return status ? status : null;
}

const _getAppStatus = (appId) => {
  let app = Apps.findOne({applicationId: appId})

  return app ? app.status : null;
}

export const createRequest = _connectApp
