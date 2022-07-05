// Requiring express and body parser and initializing constant "app" & fetch API
const express = require("express");
const app = express();
const https = require('https');
const bodyParser = require("body-parser");
const util = require('util');
// Using body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));

//Sending index.html to browser when request is made
app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

  const apiKey = "5b0d9eacccf03bf296f7eab499416a0a7159c086";
  const url = "https://api.getgeoapi.com/v2/currency/list?api_key=" + apiKey + "&format=json"
  //Making get request to external API server
  https.get(url, function(response) {
    // console.log(response.statusCode);
    let data = "";
    // As the response comes back, the data is being grabbed and added one chunk at a time and we are adding it all together
    response.on("data", function(chunk) {
      data += chunk
    });

    //When all the data has been received
    response.on("end", function() {
      const currencyList = JSON.parse(data).currencies;




    })
    // Error handler
  }).on("error", function(error) {
    console.error(error)
  });
});



app.post("/", function(req, res) {

  const apiKey2 = "5b0d9eacccf03bf296f7eab499416a0a7159c086";
  const fromCurrency = "USD";
  const toCurrency = "NGN";
  const amountToConvert = (req.body.amountToConvert);


  const url2 = "https://api.getgeoapi.com/v2/currency/convert?api_key=" + apiKey2 + "&from=" + fromCurrency + "&to=" + toCurrency + "&amount=" + amountToConvert;

  https.get(url2, function(response) {
    console.log(response.statusCode);

    let data = "";
    // As the response comes back, the data is being grabbed and added one chunk at a time and we are adding it all together
    response.on("data", function(chunk) {
      data += chunk
    });


    response.on("end", function() {
      const currencyData = JSON.parse(data)


      if (response.statusCode === 200) {
        console.log(currencyData);


        res.write(`<p> Success ${fromCurrency} </p>`)
      } else {
        res.write("<p> Fail </p>")
      }


      res.send();
    })



  }).on('error', (e) => {
    console.error(e);
  });



})



/* Server running on port being hosted at and locally on 3000; with
message letting us know it is running successfully
*/
app.listen(process.env.PORT || 3000, function() {
  console.log("The server is running on Port 3000")
})







//
// var currencyOrder = [
//   'STN: ão Tomé and Príncipe dobra',
//   'XAG: Silver (troy ounce)',
//   'XAU: Gold (troy ounce)',
//   'PLN: Polish złoty',
//   'UGX: Ugandan shilling',
//   'GGP: Guernsey pound',
//   'MWK: Malawian kwacha',
//   'NAD: Namibian dollar',
//   'ALL: Albanian lek',
//   'BHD: Bahraini dinar',
//   'JEP: Jersey pound',
//   'BWP: Botswana pula',
//   'MRU: Mauritanian ouguiya',
//   'BMD: Bermudian dollar',
//   'MNT: Mongolian tögrög',
//   'FKP: Falkland Islands pound',
//   'PYG: Paraguayan guaraní',
//   'AUD: Australian dollar',
//   'KYD: Cayman Islands dollar',
//   'RWF: Rwandan franc',
//   'WST: Samoan tālā',
//   'SHP: Saint Helena pound',
//   'SOS: Somali shilling',
//   'SSP: South Sudanese pound',
//   'BIF: Burundian franc',
//   'SEK: Swedish krona',
//   'CUC: Cuban convertible peso',
//   'BTN: Bhutanese ngultrum',
//   'MOP: Macanese pataca',
//   'XDR: Special drawing rights',
//   'IMP: Manx pound',
//   'INR: Indian rupee',
//   'BYN: Belarusian ruble',
//   'BOB: Bolivian boliviano',
//   'SRD: Surinamese dollar',
//   'GEL: Georgian lari',
//   'ZWL: Zimbabwean dollar',
//   'EUR: Euro',
//   'BBD: Barbadian dollar',
//   'RSD: Serbian dinar',
//   'SDG: Sudanese pound',
//   'VND: Vietnamese đồng',
//   'VES: Venezuelan bolívar',
//   'ZMW: Zambian kwacha',
//   'KGS: Kyrgyzstani som',
//   'HUF: Hungarian forint',
//   'BND: Brunei dollar',
//   'BAM: Bosnia and Herzegovina convertible mark',
//   'CVE: Cape Verdean escudo',
//   'BGN: Bulgarian lev',
//   'NOK: Norwegian krone',
//   'BRL: Brazilian real',
//   'JPY: Japanese yen',
//   'HRK: Croatian kuna',
//   'HKD: Hong Kong dollar',
//   'ISK: Icelandic króna',
//   'IDR: Indonesian rupiah',
//   'KRW: South Korean won',
//   'KHR: Cambodian riel',
//   'XAF: Central African CFA franc',
//   'CHF: Swiss franc',
//   'MXN: Mexican peso',
//   'PHP: Philippine peso',
//   'RON: Romanian leu',
//   'RUB: Russian ruble',
//   'SGD: Singapore dollar',
//   'AED: United Arab Emirates dirham',
//   'KWD: Kuwaiti dinar',
//   'CAD: Canadian dollar',
//   'PKR: Pakistani rupee',
//   'CLP: Chilean peso',
//   'CNY: Renminbi',
//   'COP: Colombian peso',
//   'AOA: Angolan kwanza',
//   'KMF: Comorian franc',
//   'CRC: Costa Rican colón',
//   'CUP: Cuban peso',
//   'GNF: Guinean franc',
//   'NZD: New Zealand dollar',
//   'EGP: Egyptian pound',
//   'DJF: Djiboutian franc',
//   'ANG: Netherlands Antillean guilder',
//   'DOP: Dominican peso',
//   'JOD: Jordanian dinar',
//   'AZN: Azerbaijani manat',
//   'SVC: Salvadoran colón',
//   'NGN: Nigerian naira',
//   'ERN: Eritrean nakfa',
//   'SZL: Swazi lilangeni',
//   'DKK: Danish krone',
//   'ETB: Ethiopian birr',
//   'FJD: Fijian dollar',
//   'XPF: CFP franc',
//   'GMD: Gambian dalasi',
//   'AFN: Afghan afghani',
//   'GHS: Ghanaian cedi',
//   'GIP: Gibraltar pound',
//   'GTQ: Guatemalan quetzal',
//   'HNL: Honduran lempira',
//   'GYD: Guyanese dollar',
//   'HTG: Haitian gourde',
//   'XCD: Eastern Caribbean dollar',
//   'GBP: Pound sterling',
//   'AMD: Armenian dram',
//   'IRR: Iranian rial',
//   'JMD: Jamaican dollar',
//   'IQD: Iraqi dinar',
//   'KZT: Kazakhstani tenge',
//   'KES: Kenyan shilling',
//   'ILS: Israeli new shekel',
//   'LYD: Libyan dinar',
//   'LSL: Lesotho loti',
//   'LBP: Lebanese pound',
//   'LRD: Liberian dollar',
//   'AWG: Aruban florin',
//   'MKD: Macedonian denar',
//   'LAK: Lao kip',
//   'MGA: Malagasy ariary',
//   'ZAR: South African rand',
//   'MDL: Moldovan leu',
//   'MVR: Maldivian rufiyaa',
//   'MUR: Mauritian rupee',
//   'MMK: Burmese kyat',
//   'MAD: Moroccan dirham',
//   'XOF: West African CFA franc',
//   'MZN: Mozambican metical',
//   'MYR: Malaysian ringgit',
//   'OMR: Omani rial',
//   'NIO: Nicaraguan córdoba',
//   'NPR: Nepalese rupee',
//   'PAB: Panamanian balboa',
//   'PGK: Papua New Guinean kina',
//   'PEN: Peruvian sol',
//   'ARS: Argentine peso',
//   'SAR: Saudi riyal',
//   'QAR: Qatari riyal',
//   'SCR: Seychellois rupee',
//   'SLL: Sierra Leonean leone',
//   'LKR: Sri Lankan rupee',
//   'SBD: Solomon Islands dollar',
//   'VUV: Vanuatu vatu',
//   'USD: United States dollar',
//   'DZD: Algerian dinar',
//   'BDT: Bangladeshi taka',
//   'BSD: Bahamian dollar',
//   'BZD: Belize dollar',
//   'CDF: Congolese franc',
//   'UAH: Ukrainian hryvnia',
//   'YER: Yemeni rial',
//   'TMT: Turkmenistan manat',
//   'UZS: Uzbekistani soʻm',
//   'UYU: Uruguayan peso',
//   'CZK: Czech koruna',
//   'SYP: Syrian pound',
//   'TJS: Tajikistani somoni',
//   'TWD: New Taiwan dollar',
//   'TZS: Tanzanian shilling',
//   'TOP: Tongan paʻanga',
//   'TTD: Trinidad and Tobago dollar',
//   'THB: Thai baht',
//   'TRY: Turkish lira',
//   'TND: Tunisian dinar']
//
//   function alphabeticalOrder(arr){
//
//     return arr.sort(function(a,b){
//       return a === b ? 0 : a > b ? 1: -1;
//
//     });
//   }
//
// alphabeticalOrder(currencyOrder)
// console.log(util.inspect(currencyOrder, { maxArrayLength: null }))
// // console.log(currencyOrder)
