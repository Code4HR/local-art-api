proxy-art
=========

a proxy for Norfolk Public Art collection hosted by the City of Norfolk and parses the feed from xml to json and enables CORS

data sources
=======
* [Downtown] (http://www.norfolkva.gov/cultural_affairs/public_art_downtown.xml)
* [Botanical Gardens] (http://www.norfolkva.gov/cultural_affairs/public_art_botanical_garden.xml)

installation
============
Dependencies
- Node
- Mongo

```bash
git clone git@github.com/<YOURUSER>/proxy-art
npm install
npm start
# Navigate to http://localhost:5555
```

import data
===========

````bash
mongoimport --collection exhibits --file data/exhibits.json --jsonArray
````


license
=======

[Apache 2.0] (https://www.apache.org/licenses/LICENSE-2.0)
