const hre = require("hardhat");


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
