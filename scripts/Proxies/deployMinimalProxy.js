// This script will deploy the minimal proxy if provided the governor Address
async function deployMinimalProxy() {

  // Addresses of the deployed implementation contracts
  let tokenAddr = "0x4A1b24e5aD279658814E224ac53a6F313E71EE01";
  let timeLockAddr = "0xE90b59f217e22C9920c349baB2346b31434e807C";
  let govAddr = "0x2Bd8F50741578f17830E88b5588642A6cfF7B3d4";
  
  const MinimalProxy = await ethers.getContractFactory("ProxyFactory");
  const minimalProxy = await MinimalProxy.deploy(tokenAddr, timeLockAddr, govAddr);
  await minimalProxy.deployed();
  console.log("Minimal Proxy address:", minimalProxy.address);
  
}

deployMinimalProxy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });