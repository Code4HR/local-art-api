local-art-api
=============

The API iArtNorfolk uses, providing read and write access to Norfolk public art data on OpenStreetMap.

original data sources
=====================
* [Downtown] (http://www.norfolkva.gov/cultural_affairs/public_art_downtown.xml)
* [Botanical Gardens] (http://www.norfolkva.gov/cultural_affairs/public_art_botanical_garden.xml)

installation
============
Dependencies
- Node
- Mongo

```bash
git clone git@github.com/<YOURUSER>/local-art-api
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

[Affero GPLv3] (https://www.gnu.org/licenses/agpl-3.0-standalone.html)

