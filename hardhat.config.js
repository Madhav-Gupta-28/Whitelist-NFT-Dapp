require("dotenv").config()

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",

  networks:{
    "mumbai":{
      url:`https://polygon-mumbai.g.alchemy.com/v2/ZLz0I9YZCGNg1-G49JmtgMnnmPXvpwhm`,
      accounts:[process.env.PRIVATE_KEY],
      gas:"auto"
    }
  }
};
