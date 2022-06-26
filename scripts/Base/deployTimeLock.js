// Script that deploys the Token and Timelock base contracts provided the users address.
async function deployTimelock() {
  const interactor = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
     
  // Timelock Deployment
  const Timelock = await ethers.getContractFactory("TimeLock");
  const timelock = await Timelock.deploy(interactor);
  await timelock.deployed();
  
  const timelockAddress = timelock.address;
 
  console.log("TimeLock address:", timelockAddress); 
  console.log("Successfully deployed Timelock!")
 
}

deployTimelock()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });