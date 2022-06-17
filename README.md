<h1 align="center">ImageStorage API</h1>

<div align="center">

![GitHub](https://img.shields.io/github/license/qmachard/image-storage)
[![GitHub stars](https://img.shields.io/github/stars/qmachard/image-storage)](https://github.com/qmachard/image-storage/stargazers)
[![Twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2Fqmachard%2Fimage-storage)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fqmachard%2Fimage-storage)

#### Host your own `images` and stay in control

</div>

Table of contents
=================
* [Features](#features)
* [Installation](#installation)
* [API](#api)

# Features

- Selfhostable
- [Simple upload API](#api)
- 100% file based - no database needed
- Change and resize your uploads just by editing the URL
- Securized by secret/public key pair
- Correctly rendered rotation

---

## Development roadmap

- [x] Upload file
- [x] Secret / public key pair authentication
- [ ] Duplicate detection

# Installation

## Requirements

* NodeJS v16.15+

## Quick Start

1. Clone or download project

```
$ git clone git@github.com:qmachard/image-storage.git
```

2. Create `.env`

```
# .env
PORT=3000
IMAGE_STORAGE=/path/to/directory
SECRET_KEY=change-it
```

3. Build and start project

```
$ yarn && yarn build
$ yarn start
```

4. Generate secret / public keys pair

```
$ node ./generateKey.js
```

6. You can use your API from port `3000`

http://localhost:3000

# API

## Upload Image

```
POST /images

+ Headers

X-API-SECRET=<secret from generateKey>
X-API-IV=<iv from generateKey>
X-API-TIMESTAMP=<timestamp from generateKey>

+ Body

Content-Disposition: form-data; name="image"; filename="IMG_E2355.jpg"

<content>

+ Response 201 (application/json)

{
  "url": "/images/3e61302a-42cc-4499-8587-5ddcea90f08e.jpeg",
  "filename": "3e61302a-42cc-4499-8587-5ddcea90f08e.jpeg",
  "mimetype": "image/jpeg"
}
```

## Get Image

```
GET /images/{filename.ext}{?w}{?h}

+ Headers

X-API-SECRET=<secret from generateKey>
X-API-IV=<iv from generateKey>
X-API-TIMESTAMP=<timestamp from generateKey>

+ Response 200 (image/jpeg)

<content>
```

### Query Params

| parameter | description               | default |
|-----------|---------------------------|---------|
| w         | Max with of image in px   | null    |
| h         | Max height of image in px | null    |

---

<div align="center">This is a <a href="https://quentinmachard.fr/">Quentin Machard</a> project</div>

