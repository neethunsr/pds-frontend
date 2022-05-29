import Web3 from "web3";
window.ethereum.request({ method: "eth_requestAccounts" });

const web3 = new Web3(window.ethereum);


const address = '0x36fB397bEf608f78Ff5b86F4a9952BbaBcB18F09'

const abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "getShopkeeperAddresses",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_wheat",
          "type": "uint256"
        },
        {
          "name": "_rice",
          "type": "uint256"
        },
        {
          "name": "_kerosene",
          "type": "uint256"
        },
        {
          "name": "_shopkeeperAddress",
          "type": "address"
        }
      ],
      "name": "allocateResourceToShopkeeper",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        },
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_inventoryManagerAddress",
          "type": "address"
        },
        {
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "registerInventoryManager",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        },
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_individualRationCardID",
          "type": "uint256"
        },
        {
          "name": "_month",
          "type": "uint256"
        },
        {
          "name": "_wheat",
          "type": "uint256"
        },
        {
          "name": "_rice",
          "type": "uint256"
        },
        {
          "name": "_kerosene",
          "type": "uint256"
        }
      ],
      "name": "distributeToCustomers",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        },
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_shopkeeperAddress",
          "type": "address"
        },
        {
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "registerShopkeeper",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        },
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_categ",
          "type": "uint8"
        }
      ],
      "name": "getCategoryAllocationLimit",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_category",
          "type": "uint8"
        },
        {
          "name": "_wheat",
          "type": "uint256"
        },
        {
          "name": "_rice",
          "type": "uint256"
        },
        {
          "name": "_kerosene",
          "type": "uint256"
        }
      ],
      "name": "setCategoryAllocationLimits",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        },
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_shopkeeperAddress",
          "type": "address"
        }
      ],
      "name": "getShopkeeperDetails",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getInventoryManagerAddresses",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_individualRationCardID",
          "type": "uint256"
        }
      ],
      "name": "getIndividualDetails",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint8"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getIndividualRationCardIDs",
      "outputs": [
        {
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_inventoryManagerAddress",
          "type": "address"
        }
      ],
      "name": "getInventoryManagerDetails",
      "outputs": [
        {
          "name": "ipfsHash",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_individualRationCardID",
          "type": "uint256"
        },
        {
          "name": "_category",
          "type": "uint8"
        },
        {
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "registerIndividual",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        },
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "shopkeeperAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "ipfsHash",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "ShopkeeperRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "individualRationCardID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "category",
          "type": "uint8"
        },
        {
          "indexed": false,
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "IndividualRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "inventoryManagerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "ipfsHash",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "InventoryManagerRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "inventoryManagerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "shopkeeperAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "wheat",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "rice",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "kerosene",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "ResourceAllocatedToShopkeeper",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "",
          "type": "string"
        }
      ],
      "name": "CannotAllocateResourceToCustomer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "wheat",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "rice",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "kerosene",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "CategoryAllocationLimitsSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "customerRationID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "shopkeeperAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "month",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "wheat",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "rice",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "kerosene",
          "type": "uint256"
        }
      ],
      "name": "RationDistributedToCustomer",
      "type": "event"
    }
  ];

export default new web3.eth.Contract(abi, address);