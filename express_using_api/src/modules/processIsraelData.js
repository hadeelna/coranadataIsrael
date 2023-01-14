
const chalk = require('chalk');
const gotWrapper = require("./gotWrapper.js");


const urlDataPerCityIsrael = "https://datadashboardapi.health.gov.il/api/queries/spotlightPublic"
const urlGeneralInfected = "https://datadashboardapi.health.gov.il/api/queries/infectedPerDate"
const urlGeneralVaccinated = "https://datadashboardapi.health.gov.il/api/queries/vaccinated"

let dataPerCity;
let dataGeneralInfected;
let dataGeneralInfectedYesterday;
let dataGeneralVaccinated;


async function findCity(city)
{
    try {
  
        if (dataPerCity === undefined)
            await loadCityData();
        let index = dataPerCity.findIndex((item) => item.name == city);
        if (index > -1)
        {
            return dataPerCity[index];
        }
    
    } catch (err)
    {
        console.error(chalk.red.bgWhite('HTTP Request to MOH has failed. ' + err));
    }
    
}


async function loadCityData()
{
    try {
        dataPerCity = await gotWrapper.makeRequest(urlDataPerCityIsrael);
        if (dataPerCity.length === 0)
        {
            throw new Error("HTTP request has returned no results\nURL: " + urlDataPerCityIsrael);
        }
    } catch (err)
    {
        console.log(chalk.red.bgWhite("Something went wrong.\n") + err);
    }
}

async function loadGeneralData()
{
    try{
     
        if (dataGeneralInfected === undefined)
        {
            let dataGeneralInfectedAll = await gotWrapper.makeRequest(urlGeneralInfected);
            if (dataGeneralInfectedAll.length === 0)
            {
                throw new Error("HTTP request has returned no results\nURL: " + urlGeneralInfected);
            } else {
                dataGeneralInfected = dataGeneralInfectedAll[dataGeneralInfectedAll.length-1];
                dataGeneralInfectedYesterday = dataGeneralInfectedAll[dataGeneralInfectedAll.length-2];
            }
        }

        // load information about vaccinations
        if (dataGeneralVaccinated === undefined)
        {
            dataGeneralVaccinatedAll = await gotWrapper.makeRequest(urlGeneralVaccinated);
            if (dataGeneralVaccinatedAll.length === 0)
            {
                throw new Error("HTTP request has returned no results\nURL: " + urlGeneralVaccinated);
            } else {
                dataGeneralVaccinated = dataGeneralVaccinatedAll[dataGeneralVaccinatedAll.length-1];
            }
        }
    } catch (err)
    {
        console.log(chalk.red.bgWhite("Something went wrong.\n") + err);
    }
}

async function getIsraelGeneralData()
{
    await loadGeneralData();
    try {
       return "                   Date: " + dataGeneralInfected.date+  "\n"+
              "             Confirmed: " + dataGeneralInfected.sum + "\n" +
              "               New Sick: " + dataGeneralInfected.amount + "\n" +
              "   New Sick (yesterday): " + dataGeneralInfectedYesterday.amount + "\n" +
              "       Total Vaccinated: " + dataGeneralVaccinated.vaccinated_cum + "\n" +
              "Vaccinated Population %: " + dataGeneralVaccinated.vaccinated_population_perc + "\n" +
              "   Total Vaccinated 2nd: " + dataGeneralVaccinated.vaccinated_seconde_dose_cum + "\n" + 
              "   Total Vaccinated 2nd: " + dataGeneralVaccinated.vaccinated_third_dose_cum + "\n";
    } catch (err)
    {
        return chalk.red.bgWhite("Something went wrong. Cannot process Israel General data. \n") + err;
    }
}


function getIsraelCityData(cityData)
{
    try {
 
       return "              City: " + cityData.name+","+ 
              "       Active sick: " + cityData.activeSick +","+ 
              "       first Dose: " + cityData.firstDose+"%" +","+
              "       second Dose: " + cityData.secondDose+ "%"+","+
              "       third Dose: " + cityData.thirdDose+"%"  ;
    } catch (err)
    {
        return chalk.red.bgWhite("Something went wrong. Cannot process Israel city data. \n") + err;
    }
}


function reverse(s){
    return s.split("").reverse().join("");
}



module.exports = {
    findCity: findCity,
    getIsraelGeneralData: getIsraelGeneralData,
    getIsraelCityData: getIsraelCityData
}