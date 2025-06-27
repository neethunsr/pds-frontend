const contractABI = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "shopkeeper",
				type: "address",
			},
			{
				indexed: false,
				internalType: "string",
				name: "action",
				type: "string",
			},
			{
				indexed: false,
				internalType: "string",
				name: "item",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "quantity",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "timestamp",
				type: "uint256",
			},
		],
		name: "NewTransaction",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "action",
				type: "string",
			},
			{
				internalType: "string",
				name: "item",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "quantity",
				type: "uint256",
			},
		],
		name: "recordTransaction",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "admin",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "index",
				type: "uint256",
			},
		],
		name: "getTransaction",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "shopkeeper",
						type: "address",
					},
					{
						internalType: "string",
						name: "action",
						type: "string",
					},
					{
						internalType: "string",
						name: "item",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "quantity",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "timestamp",
						type: "uint256",
					},
				],
				internalType: "struct ShopTransaction.Transaction",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getTransactionCount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "transactions",
		outputs: [
			{
				internalType: "address",
				name: "shopkeeper",
				type: "address",
			},
			{
				internalType: "string",
				name: "action",
				type: "string",
			},
			{
				internalType: "string",
				name: "item",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "quantity",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "timestamp",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];
const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

const contract = new web3.eth.Contract(contractABI, contractAddress);
