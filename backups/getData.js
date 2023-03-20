const fs = require("fs");

const { sequelize } = require("../database/sqlServer/connection");
const { LoggedInUser } = require("../models/loggedInUser");
const OAuthTokens = require("../models/oAuthTokens");
const OAuthUsers = require("../models/oAuthUsers");
const OAuthClients = require("../models/oAuthClients");
const {
  FaultReportingCategories,
} = require("../models/faultReporting/categories/categories");
const { FaultReports } = require("../models/faultReporting/faultReporting");
const {
  FaultReportsImages,
} = require("../models/faultReporting/faultReportingImages");
const { Events } = require("../models/events/events");
const { EventsImages } = require("../models/events/eventsImages");
const { EventsPrices } = require("../models/events/eventsPrices");
const { Directories } = require("../models/directories/directories");
const {
  DirectoriesImages,
} = require("../models/directories/directoriesImages");
const { Models } = require("../models/models");
const { Locations } = require("../models/locations");
const { UsersModels } = require("../models/UsersModels");

(async function getData() {
  const array = [
    LoggedInUser,
    OAuthUsers,
    OAuthClients,
    OAuthTokens,
    FaultReportingCategories,
    FaultReports,
    FaultReportsImages,
    Events,
    EventsImages,
    EventsPrices,
    Directories,
    DirectoriesImages,
    Models,
    Locations,
    UsersModels,
  ];

  for (const item of array) {
    let data = await item.findAll({});

    let obj = {
      data,
    };

    let json = JSON.stringify(obj);
	
    fs.writeFileSync(`./backups/${item.tableName}.json`, json, "utf8");
    console.log(`File ${item.tableName} has been saved!`);

  }
  process.exit();
})();
