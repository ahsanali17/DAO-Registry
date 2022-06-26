// This script will deploy the minimal proxy if provided the governor Address
async function deployMinimalProxy() {

  // Addresses of the deployed implementation contracts
  let tokenAddr = tokenAddress;
  let timeLockAddr = timeLockAddress;
  let govAddr = governorAddress;
  
  const MinimalProxy = await ethers.getContractFactory("ProxyFactory");
  const minimalProxy = await MinimalProxy.deploy(tokenAddr, timeLockAddr, govAddr);
  await minimalProxy.deployed();
  console.log("Minimal Proxy address:", minimalProxy.address);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });