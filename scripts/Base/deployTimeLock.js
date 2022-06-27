// Script that deploys the Token and Timelock base contracts provided the users address.
async function deployTimelock() {

  // Timelock Deployment
  const Timelock = await ethers.getContractFactory("Timelock");
  const timelock = await Timelock.deploy();
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