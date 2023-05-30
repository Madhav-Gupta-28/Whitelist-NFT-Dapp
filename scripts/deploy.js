const hre = require("hardhat");


// contract address -- > 0x4B55C44dBba1B8e11852AFDD50394cE66dD06D13

async function main() {
  const WhiteListNFt = await hre.ethers.getContractFactory("Whitelist")
  const whitelistnft =  await WhiteListNFt.deploy(10);
   whitelistnft.deployed()

   console.log('deployed on ' , whitelistnft.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
