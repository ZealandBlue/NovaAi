import { ethers } from 'hardhat';

async function main() {
  const Factory = await ethers.getContractFactory('TradingAuthorization');
  const contract = await Factory.deploy();
  await contract.deployed();
  console.log('TradingAuthorization deployed to:', contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
