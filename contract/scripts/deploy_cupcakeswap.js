/* eslint-disable @typescript-eslint/no-var-requires */
const { ethers, upgrades } = require("hardhat");
const fs = require("fs");

async function main() {
  const CupcakeSwap = await ethers.getContractFactory("CupcakeSwap");
  console.log("Deploying CupcakeSwap V1...");
  let cupcakeSwap = await upgrades.deployProxy(CupcakeSwap);
  await cupcakeSwap.deployed();
  console.log("CupcakeSwap V1 deployed to:", cupcakeSwap.address);

  let config = `export const cupcakeSwapAddress = "${cupcakeSwap.address}";`;
  let data = JSON.stringify(config);
  fs.writeFileSync("cupcakeSwapAddress.ts", JSON.parse(data));

  config = `{
    "cupcakeSwapAddress": ${cupcakeSwap.address}
  }`;
  data = JSON.stringify(config);
  fs.writeFileSync("cupcakeSwapAddress.json", JSON.parse(data));
}

main();
