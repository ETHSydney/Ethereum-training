// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"members","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"member","outputs":[{"name":"joinDate","type":"uint256"},{"name":"exists","type":"bool"},{"name":"isSpecial","type":"bool"}],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "600060608181526101006040818152426080818152600160a081905260c081905260e0869052600160a060020a03331687526020818152938720928355828101805460ff191690911761ff001916909417909355600281018054868255818752928620949593949193909282019185506100949291505b808211156100f6578054600160a060020a0319168155600101610076565b5050905050600060005080548060010182818154818355818115116100fa578280526100fa907f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5639081019083015b808211156100f657600081556001016100e2565b5090565b50505060009283525060208220018054600160a060020a0319163317905560b99150819061012790396000f3606060405260e060020a60003504635daf08ca81146024578063e7d4539e146074575b005b609e6004356000805482908110156002575080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563015473ffffffffffffffffffffffffffffffffffffffff1681565b60a86004356001602081905260009182526040909120805491015460ff8082169161010090041683565b6060908152602090f35b606092835260809190915260a05280f3",
    unlinked_binary: "600060608181526101006040818152426080818152600160a081905260c081905260e0869052600160a060020a03331687526020818152938720928355828101805460ff191690911761ff001916909417909355600281018054868255818752928620949593949193909282019185506100949291505b808211156100f6578054600160a060020a0319168155600101610076565b5050905050600060005080548060010182818154818355818115116100fa578280526100fa907f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5639081019083015b808211156100f657600081556001016100e2565b5090565b50505060009283525060208220018054600160a060020a0319163317905560b99150819061012790396000f3606060405260e060020a60003504635daf08ca81146024578063e7d4539e146074575b005b609e6004356000805482908110156002575080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563015473ffffffffffffffffffffffffffffffffffffffff1681565b60a86004356001602081905260009182526040909120805491015460ff8082169161010090041683565b6060908152602090f35b606092835260809190915260a05280f3",
    address: "0x9c42610ece49d82b0183f5679e3d64b288fa84f0",
    generated_with: "2.0.9",
    contract_name: "Access"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Access error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("Access error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Access error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Access error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Access = Contract;
  }

})();
