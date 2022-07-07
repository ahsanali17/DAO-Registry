import abi from './ABI/ProxyFactory.json';
import tokenAbi from './ABI/Token.json';
import timeLockAbi from './ABI/TimeLock.json';
import governorABI from './ABI/governor.json';

export const minimalProxyABI = abi;
export const minimalProxyContractAddress = "0xe18245a7C7f7ba06e3DC244B8cdC14AABcB16F8C" || "";

export const tokenABI = tokenAbi;
export const tokenContractAddress = "0x60f837eF613B0780f678Cce9D3626eFB6841F47B" || "";

export const timeLockABI = timeLockAbi;
export const timeLockContractAddress = '0x2039efe4Aa225820c5B4602Be059F3273dEa9E53' || "";

export const governorAlphaABI = governorABI;
export const governorAlphaContractAddress = '0x2F9A24FE15fE9C65D2bbE2EE6eEa281C2a3a979e' || ""