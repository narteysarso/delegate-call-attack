const {expect} = require("chai");
const {ethers} = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");

describe("Delegate call attack", function (){
    async function attackableSetupContracts(){
        const delegateAttackable = await ethers.getContractFactory("DelegateAttackable");
        const helperDelegateCallVulnerable = await ethers.getContractFactory("HelperDelegateCallVulnerable");
        const attacker = await ethers.getContractFactory("Attacker");

        const deployedHelperDelegateCallVulnerable = await helperDelegateCallVulnerable.deploy();
        const deployedDelegateAttackable = await delegateAttackable.deploy(deployedHelperDelegateCallVulnerable.address);
        const deployedAttacker = await attacker.deploy(deployedDelegateAttackable.address)

        return {deployedAttacker, deployedHelperDelegateCallVulnerable, deployedDelegateAttackable};
    }

    async function resitantSetupContracts(){
        const delegateResistant = await ethers.getContractFactory("DelegateResistant");
        const helperDelegateCallResistant = await ethers.getContractFactory("HelperDelegateCallAttackResistant");
        const attacker = await ethers.getContractFactory("Attacker");

        const deployedHelperDelegateCallResistant = await helperDelegateCallResistant.deploy();
        const deployedDelegateResistant = await delegateResistant.deploy(deployedHelperDelegateCallResistant.address);
        const deployedAttacker = await attacker.deploy(deployedDelegateResistant.address)

        return {deployedAttacker, deployedDelegateResistant};
    }

    it("Should successfully replace owner of delegateAttackable contract to he owner of attacker contract", async function () {
        const {deployedAttacker, deployedDelegateAttackable} = await loadFixture(attackableSetupContracts);

        await deployedAttacker.attack();

        expect(await deployedDelegateAttackable.helper()).to.equal(deployedAttacker.address);
        expect(await deployedDelegateAttackable.owner()).to.equal(deployedAttacker.address);

    });

    it("Delegate attack should fail", async function () {
        const {deployedAttacker, deployedDelegateResistant} = await loadFixture(resitantSetupContracts);

        await deployedAttacker.attack();

        expect(await deployedDelegateResistant.helper()).to.not.equal(deployedAttacker.address);
        expect(await deployedDelegateResistant.owner()).to.not.equal(deployedAttacker.address);

    })
})