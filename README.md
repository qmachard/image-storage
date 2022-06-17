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

<div align="center">
<div style="width: 111px; height:100px; margin: 20px auto;">
<svg class="banner_logo" fill="currentColor" viewBox="0 0 111 100">
    <g transform="translate(-665.000000, -149.000000)">
        <path d="M689.993332,199 C 689.993332,185.014021 701.535522,173.63773 715.721663,173.63773 C729.907803,173.63773 741.449993,185.014021 741.449993,199 C741.449993,212.984302 729.907803,224.360593 715.721663,224.360593 C701.535522,224.360593 689.993332,212.984302 689.993332,199 M763.503334,224.360593 L759.408102,224.360593 C763.870833,216.920636 766.443326,208.252985 766.443326,199 C766.443326,171.430565 743.690716,149 715.721663,149 C687.754311,149 665,171.430565 665,199 C665,226.569435 687.754311,249 715.721663,249 C715.886697,249 716.046627,248.98826 716.211661,248.98826 C716.293328,248.989937 716.373293,249 716.456661,249 L763.503334,249 C770.404148,249 776,243.483765 776,236.681135 C776,229.876828 770.404148,224.360593 763.503334,224.360593"></path>
    </g>
</svg>
</div>
This is a <a href="https://quentinmachard.fr/">Quentin Machard</a> project
</div>
