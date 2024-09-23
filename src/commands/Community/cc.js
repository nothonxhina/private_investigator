const { SlashCommandBuilder, ApplicationCommandOptionType } = require("discord.js");

const config = require("../../../config.json");
const authorizedUsers = [...config.beta_testers, ...config.owner];

const commandData = new SlashCommandBuilder()
  .setName("cc")
  .setDescription("Converts a set amount from one currency to another")
  .addStringOption((option) =>
    option
      .setName("b-currency")
      .setDescription("The base currency")
      .setRequired(true)
      .setAutocomplete(true)
  )
  .addStringOption((option) =>
    option
      .setName("t-currency")
      .setDescription("The target currency")
      .setRequired(true)
      .setAutocomplete(true)
  )
  .addNumberOption((option) =>
    option
      .setName("amount")
      .setDescription("The amount of the base currency that is to be exchanged to the target")
      .setRequired(true)
  )
  .toJSON();

module.exports = {
  data: {
    ...commandData,
    integration_types: [1],
    contexts: [0, 1, 2],
  },

  async autocomplete(interaction) {
    const value = interaction.options.getFocused().toLowerCase();
    let choices = [
      { name: "United Arab Emirate Dirham", value: "aed" },
      { name: "Afghan Afghani", value: "afn" },
      { name: "Albanian Lek", value: "all" },
      { name: "Armenian Dram", value: "amd" },
      { name: "Netherlands Antillian Guilder", value: "ang" },
      { name: "Angolan Kwanza", value: "aoa" },
      { name: "Argentine Peso", value: "ars" },
      { name: "Australian Dollar", value: "aud" },
      { name: "Aruban Florin", value: "awg" },
      { name: "Azerbaijani Manat", value: "azn" },
      { name: "Bosnia and Herzegovina Mark", value: "bam" },
      { name: "Barbados Dollar", value: "bbd" },
      { name: "Bangladeshi Taka", value: "bdt" },
      { name: "Bulgarian Lev", value: "bgn" },
      { name: "Bahraini Dinar", value: "bhd" },
      { name: "Burundian Franc", value: "bif" },
      { name: "Bermudian Dollar", value: "bmd" },
      { name: "Brunei Dollar", value: "bnd" },
      { name: "Bolivian Boliviano", value: "bob" },
      { name: "Brazilian Real", value: "brl" },
      { name: "Bahamian Dollar", value: "bsd" },
      { name: "Bhutanese Ngultrum", value: "btn" },
      { name: "Botswana Pula", value: "bwp" },
      { name: "Belarusian Ruble", value: "byn" },
      { name: "Belize Dollar", value: "bzd" },
      { name: "Canadian Dollar", value: "cad" },
      { name: "Congolese Franc", value: "cdf" },
      { name: "Swiss Franc", value: "chf" },
      { name: "Chilean Peso", value: "clp" },
      { name: "Chinese Renminbi", value: "cny" },
      { name: "Colombian Peso", value: "cop" },
      { name: "Costa Rican Colon", value: "crc" },
      { name: "Cuban Peso", value: "cup" },
      { name: "Cape Verdean Escudo", value: "cve" },
      { name: "Czech Koruna", value: "czk" },
      { name: "Djiboutian Franc", value: "djf" },
      { name: "Danish Krone", value: "dkk" },
      { name: "Dominican Peso", value: "dop" },
      { name: "Algerian Dinar", value: "dzd" },
      { name: "Egyptian Pound", value: "egp" },
      { name: "Eritrean Nakfa", value: "ern" },
      { name: "Ethiopian Birr", value: "etb" },
      { name: "Euro", value: "eur" },
      { name: "Fiji Dollar", value: "fjd" },
      { name: "Falkland Islands Pound", value: "fkp" },
      { name: "Faroese Króna", value: "fok" },
      { name: "Pound Sterling", value: "gbp" },
      { name: "Georgian Lari", value: "gel" },
      { name: "Guernsey Pound", value: "ggp" },
      { name: "Ghanaian Cedi", value: "ghs" },
      { name: "Gibraltar Pound", value: "gip" },
      { name: "Gambian Dalasi", value: "gmd" },
      { name: "Guinean Franc", value: "gnf" },
      { name: "Guatemalan Quetzal", value: "gtq" },
      { name: "Guyanese Dollar", value: "gyd" },
      { name: "Hong Kong Dollar", value: "hkd" },
      { name: "Honduran Lempira", value: "hnl" },
      { name: "Croatian Kuna", value: "hrk" },
      { name: "Haitian Gourde", value: "htg" },
      { name: "Hungarian Forint", value: "huf" },
      { name: "Indonesian Rupiah", value: "idr" },
      { name: "Israeli New Shekel", value: "ils" },
      { name: "Manx Pound", value: "imp" },
      { name: "Indian Rupee", value: "inr" },
      { name: "Iraqi Dinar", value: "iqd" },
      { name: "Iranian Rial", value: "irr" },
      { name: "Icelandic Króna", value: "isk" },
      { name: "Jersey Pound", value: "jep" },
      { name: "Jamaican Dollar", value: "jmd" },
      { name: "Jordanian Dinar", value: "jod" },
      { name: "Japanese Yen", value: "jpy" },
      { name: "Kenyan Shilling", value: "kes" },
      { name: "Kyrgyzstani Som", value: "kgs" },
      { name: "Cambodian Riel", value: "khr" },
      { name: "Kiribati Dollar", value: "kid" },
      { name: "Comorian Franc", value: "kmf" },
      { name: "South Korean Won", value: "krw" },
      { name: "Kuwaiti Dinar", value: "kwd" },
      { name: "Cayman Islands Dollar", value: "kyd" },
      { name: "Kazakhstani Tenge", value: "kzt" },
      { name: "Lao Kip", value: "lak" },
      { name: "Lebanese Pound", value: "lbp" },
      { name: "Sri Lanka Rupee", value: "lkr" },
      { name: "Liberian Dollar", value: "lrd" },
      { name: "Lesotho Loti", value: "lsl" },
      { name: "Libyan Dinar", value: "lyd" },
      { name: "Moroccan Dirham", value: "mad" },
      { name: "Moldovan Leu", value: "mdl" },
      { name: "Malagasy Ariary", value: "mga" },
      { name: "Macedonian Denar", value: "mkd" },
      { name: "Burmese Kyat", value: "mmk" },
      { name: "Mongolian Tögrög", value: "mnt" },
      { name: "Macanese Pataca", value: "mop" },
      { name: "Mauritanian Ouguiya", value: "mru" },
      { name: "Mauritian Rupee", value: "mur" },
      { name: "Maldivian Rufiyaa", value: "mvr" },
      { name: "Malawian Kwacha", value: "mwk" },
      { name: "Mexican Peso", value: "mxn" },
      { name: "Malaysian Ringgit", value: "myr" },
      { name: "Mozambican Metical", value: "mzn" },
      { name: "Namibian Dollar", value: "nad" },
      { name: "Nigerian Naira", value: "ngn" },
      { name: "Nicaraguan Córdoba", value: "nio" },
      { name: "Norwegian Krone", value: "nok" },
      { name: "Nepalese Rupee", value: "npr" },
      { name: "New Zealand Dollar", value: "nzd" },
      { name: "Omani Rial", value: "omr" },
      { name: "Panamanian Balboa", value: "pab" },
      { name: "Peruvian Sol", value: "pen" },
      { name: "Papua New Guinean Kina", value: "pgk" },
      { name: "Philippine Peso", value: "php" },
      { name: "Pakistani Rupee", value: "pkr" },
      { name: "Polish Złoty", value: "pln" },
      { name: "Paraguayan Guaraní", value: "pyg" },
      { name: "Qatari Riyal", value: "qar" },
      { name: "Romanian Leu", value: "ron" },
      { name: "Serbian Dinar", value: "rsd" },
      { name: "Russian Ruble", value: "rub" },
      { name: "Rwandan Franc", value: "rwf" },
      { name: "Saudi Riyal", value: "sar" },
      { name: "Solomon Islands Dollar", value: "sbd" },
      { name: "Seychellois Rupee", value: "scr" },
      { name: "Sudanese Pound", value: "sdg" },
      { name: "Swedish Krona", value: "sek" },
      { name: "Singapore Dollar", value: "sgd" },
      { name: "Saint Helena Pound", value: "shp" },
      { name: "Sierra Leonean Leone", value: "sle" },
      { name: "Somali Shilling", value: "sos" },
      { name: "Surinamese Dollar", value: "srd" },
      { name: "South Sudanese Pound", value: "ssp" },
      { name: "São Tomé and Príncipe Dobra", value: "stn" },
      { name: "Syrian Pound", value: "syp" },
      { name: "Eswatini Lilangeni", value: "szl" },
      { name: "Thai Baht", value: "thb" },
      { name: "Tajikistani Somoni", value: "tjs" },
      { name: "Turkmenistan Manat", value: "tmt" },
      { name: "Tunisian Dinar", value: "tnd" },
      { name: "Tongan Paʻanga", value: "top" },
      { name: "Turkish Lira", value: "try" },
      { name: "Trinidad and Tobago Dollar", value: "ttd" },
      { name: "Tuvaluan Dollar", value: "tvd" },
      { name: "New Taiwan Dollar", value: "twd" },
      { name: "Tanzanian Shilling", value: "tzs" },
      { name: "Ukrainian Hryvnia", value: "uah" },
      { name: "Ugandan Shilling", value: "ugx" },
      { name: "United States Dollar", value: "usd" },
      { name: "Uruguayan Peso", value: "uyu" },
      { name: "Uzbekistani So'm", value: "uzs" },
      { name: "Venezuelan Bolívar Soberano", value: "ves" },
      { name: "Vietnamese Đồng", value: "vnd" },
      { name: "Vanuatu Vatu", value: "vuv" },
      { name: "Samoan Tālā", value: "wst" },
      { name: "Central African CFA Franc", value: "xaf" },
      { name: "East Caribbean Dollar", value: "xcd" },
      { name: "Special Drawing Rights", value: "xdr" },
      { name: "West African CFA franc", value: "xof" },
      { name: "CFP Franc", value: "xpf" },
      { name: "Yemeni Rial", value: "yer" },
      { name: "South African Rand", value: "zar" },
      { name: "Zambian Kwacha", value: "zmw" },
      { name: "Zimbabwean Dollar", value: "zwl" }
    ]


    const filtered = choices
      .filter(
        (choice) =>
          choice.name.toLowerCase().includes(value) ||
          choice.value.toLowerCase().includes(value)
      )
      .slice(0, 25);

    if (!interaction) return;

    await interaction.respond(
      filtered.map((choice) => ({
        name: choice.name,
        value: choice.value,
      }))
    );
  },

  async execute(interaction) {
    await interaction.deferReply();

    const axios = require('axios')

    const baseCurrency = interaction.options.getString("b-currency");
    const targetCurrency = interaction.options.getString("t-currency")
    const amount = interaction.options.getNumber("amount")

    const capBase = baseCurrency.toUpperCase()
    const capTar = targetCurrency.toUpperCase()


    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/<authToken>/pair/${baseCurrency}/${targetCurrency}/${amount}`);
      //Get your authToken for the exchange rate API here: https://www.exchangerate-api.com/
      const conversionResult = response.data.conversion_result;

      await interaction.editReply({
        content: `${capBase} ${amount} is ${capTar} ${conversionResult}`,
      });

      console.log(`
---------------
Command: cc
Run by: ${interaction.user.username}, ${interaction.user.displayName} | ${interaction.user.id}
Time: ${new Date().toLocaleString()}
Command Response: ${capBase} ${amount} => ${capTar} ${conversionResult}
--------------`)
    } catch (error) {

      await interaction.editReply({
        content: `There was an error fetching the conversion rate: ${error.message}`,
      });
    }
  },
};