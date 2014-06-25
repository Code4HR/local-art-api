proxy-art
=========

a proxy for Norfolk Public Art collection hosted by the City of Norfolk and parses the feed from xml to json and enables CORS

data sources
=======
* [Downtown] (http://www.norfolkva.gov/cultural_affairs/public_art_downtown.xml)
* [Botanical Gardens] (http://www.norfolkva.gov/cultural_affairs/public_art_botanical_garden.xml)

installation
============
```
git clone git@github.com/<YOURUSER>/proxy-art
npm install
npm start
# Navigate to http://localhost:5555
```

import data
---
use command, mongoimport --collection exhibits --file data/exhibits.json --jsonArray


LICENSE
---

APACHE
