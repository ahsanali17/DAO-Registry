// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {


  let address1 = "0xCd55Cf96929064a924EEE9E2Ea53d802b5C7DcD9";

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy(address1);
  await token.deployed();

  const tokenAddress = token.address;

  console.log("Token address:", token.address);
  console.log("Sucessfully deployed token!");
  console.log("Beginnning deployment of Timelock");
  const Timelock = await ethers.getContractFactory("Token");
  const timelock = await Timelock.deploy(address1);
  await timelock.deployed();

  const timelockAddress = timelock.address;

  console.log("TimeLock address:", timelock.address);
  console.log("Sucessfully deployed Timelock!")

  const GovernorAlpha = await ethers.getContractFactory("GovernorAlpha");
  const governorAlpha = await GovernorAlpha.deploy();
  await governorAlpha.deployed();

  const governorAddress = governorAlpha.address;
  console.log("The governor address:", governorAddress);

  const MinimalProxy = await ethers.getContractFactory("ProxyFactory");
  const minimalProxy = await MinimalProxy.deploy(governorAddress);
  await minimalProxy.deployed();
  console.log("Minimal Proxy address:", minimalProxy.address);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
