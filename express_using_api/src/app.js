
const {Console} = require('console');
const { generateKey } = require('crypto');
const express = require('express')
const path = require('path');

const processIsraelData = require(path.join(__dirname, "./modules/processIsraelData.js"));

const app = express()
const port = 3000

const publicPath = path.join(__dirname, "../public")
app.use(express.static(publicPath));

app.set('view engine', 'ejs');

const templatesPath = path.join(__dirname, "../views");
app.set("views", templatesPath);

app.get('', (req, res) => {
  res.render('israel')
})



  app.get('/israel', async (req, res) => {
    if(!req.query.city){ res.render('israel')}
    else {if(req.query.city=='general'){res.send(await processIsraelData.getIsraelGeneralData());}
    else{ let cityData = await processIsraelData.findCity(req.query.city)    
      if (!cityData)
      {
       
        res.send("No results have been found");
      } else {
      
        res.send(await processIsraelData.getIsraelCityData(cityData));
      }
     }
     }
    }
    
  )

  // http://localhost:3000
  // http://localhost:3000/israel*

  
  app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  
})