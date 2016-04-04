let setLogScroll = (type) => {
  let selector = type ? `.logs.${type}` : '.logs',
      logs = document.querySelectorAll(selector);

  for (let i = 0; i < logs.length; i++) {
    let log = logs.item(i);
    log.scrollTop = log.scrollHeight;
  }
};

Template.logs.onCreated(() => {
  Template.instance().subscribe('logs', '44fe0b18-05c2-47d0-9353-1146b218ff36')
})

Template.logs.onRendered(() => {
  setLogScroll();
  Logs.find().observe({added: (doc) => {setLogScroll(doc.type)}})
})

Template.logs.helpers({
  logs(type) {
    let query = type == 'live' ? {} : {type: type},
        logs = Logs.find(query);

    if (logs) {
      return logs;
    }
  }
});
