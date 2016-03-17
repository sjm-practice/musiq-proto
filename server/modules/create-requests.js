let requests = [
  {
    "player": "smarsh",
    "title": "Jeep's Blues",
    "videoId": "uUcEGOLfUTE",
    "status": musiqApp_STATUS_WAITING,
    "submittedBy": "smarsh",
    "created": new Date()
  },
  {
    "player": "smarsh",
    "title": "Mo' Horizons ~ Gonna Be [Ben Human Mix]",
    "videoId": "qzeaHQbg4uc",
    "status": musiqApp_STATUS_WAITING,
    "submittedBy": "smarsh",
    "created": new Date()
  },
  {
    "player": "smarsh",
    "title": "Taj Mahal - Shady Grove",
    "videoId": "oShuuDsXHQE",
    "status": musiqApp_STATUS_WAITING,
    "submittedBy": "smarsh",
    "created": new Date()
  },
  {
    "player": "joe",
    "title": "Dizzy Gillespie - Manteca (Funky Lowlives Extended Mix)",
    "videoId": "IOuysxKp2Ns",
    "status": musiqApp_STATUS_WAITING,
    "submittedBy": "smarsh",
    "created": new Date()
  }
];

let createRequests = () => {

  let requestCount = Requests.find().count();

  if (requestCount < 1) {
    for (let i = 0; i < requests.length; i++) {
      let request = requests[i];

      Requests.insert(request);
    }
  }
};

Modules.server.createRequests = createRequests;
