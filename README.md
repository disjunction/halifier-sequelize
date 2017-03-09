# halifier-sequelize

extension of halifier containing extra functionality
and helpers for integration with sequelize

## Features

* generation of HAL responses based on sequelize models
* building SQL queries based on `_listMeta` object
* a ready-to-go controller bound with sequelize model and providing basic HAL interface for fetching single or a list of entities

## Install

```
npm install --save halifier-sequelize
```

## Usage

```javascript
const sequelize = someFunction(/* setup connection, define models */)

const app = require('express')()

// halifier expects app dependencies to be injected into app.context
// as if it were koa
app.context = {sequelzie}

const {SequelizeHalController} = require('halifier-sequelize')

const peopleController = new SequelizeHalController(app, {
  model: sequilize.model('Human')
})
app.use('/people', peopleController.expressRouter())
```
