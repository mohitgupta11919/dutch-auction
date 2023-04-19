$(document).ready(function () {	
	
	let contract;
	let provider;
	async function initConnect() {

		provider = new ethers.providers.Web3Provider(window.ethereum)	
		signer = provider.getSigner();
		let contractAddress = "0x71faEB5e8FA61a51F572aE7763dB81d75bf00364";
		let abi = [
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "itemId",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "address",
						"name": "winner",
						"type": "address"
					}
				],
				"name": "AuctionCompleted",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "itemId",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "startPrice",
						"type": "uint256"
					}
				],
				"name": "AuctionStarted",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "itemId",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "sellingPrice",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "address",
						"name": "bidder",
						"type": "address"
					}
				],
				"name": "BidPlaced",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "itemId",
						"type": "uint256"
					}
				],
				"name": "CloseBid",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "itemId",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "reservePrice",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "startPrice",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "auctionEndTime",
						"type": "uint256"
					}
				],
				"name": "ItemCreated",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "itemId",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "address",
						"name": "bidder",
						"type": "address"
					}
				],
				"name": "SecretBidPlaced",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "itemId",
						"type": "uint256"
					}
				],
				"name": "SecretbiddingCompleted",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"name": "bidders",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "itemId",
						"type": "uint256"
					}
				],
				"name": "buy",
				"outputs": [],
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "reservePrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reductionRate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "auctionDuration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "regtime",
						"type": "uint256"
					}
				],
				"name": "createItem",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "deposit",
				"outputs": [],
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "itemId",
						"type": "uint256"
					}
				],
				"name": "getNoOfMembers",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "itemId",
						"type": "uint256"
					}
				],
				"name": "getPrice",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "_itemId",
						"type": "uint256"
					}
				],
				"name": "inductMember",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"name": "items",
				"outputs": [
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "reservePrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reductionRate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "auctionEndTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "highestBid",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "auctionStartTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "noOfMembers",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "noOfBidders",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "regTime",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "bidWinner",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"name": "members",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "itemId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "secretBid",
						"type": "uint256"
					}
				],
				"name": "placeSecretBid",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "itemId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "extraPrice",
						"type": "uint256"
					}
				],
				"name": "startBidding",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			}
		];
		contract = new ethers.Contract( contractAddress , abi , signer );
		
		//------------------------------------- METAMASK BOILERPPLATE------------------//
	
		window.ethereum.on('chainChanged', handleChainChanged);
		window.ethereum.on('accountsChanged', handleAccountsChanged);

		}

	
	function handleChainChanged(_chainId) {
	  // We recommend reloading the page, unless you must do otherwise
	  console.log("changed chain "+_chainId)
	}
	
	function handleAccountsChanged(accounts) {
	  // We recommend reloading the page, unless you must do otherwise
	  console.log("acccount changed "+ accounts)
	}
	
	const checkEvents = async()=>{
		contract.on("ItemCreated",(itemID, reservePrice,startPrice, auctionEndTime)=>{
			alert("Item ("+itemID+") created");
		})
		contract.on("AuctionStarted",(itemId,startPrice)=>{
			alert("Yay!! Auction Started ", reservePrice);
		})
		contract.on("SecretBidPlaced",(itemID, bidder)=>{
			alert("Secret Bid Placed");
		})
		contract.on("SecretbiddingCompleted",(itemID)=>{
			alert("Secret Biddinng Completed, good to start auction")
		})
		contract.on("AuctionCompleted",(itemID, winner)=>{
			alert("Auction is closed");
		})
		contract.on("BidPlaced",(itemID, sellingPrice, bidder)=>{
			alert("Yay!! Bid Placed");
		})
	};

	$("#connect").click(async function async() {
		initConnect();
		await provider.send("eth_requestAccounts", []);
		signer = provider.getSigner()
		$("#connect").text(await signer.getAddress());
	});


	$("#inductember").click(async function async() {
		await provider.send("eth_requestAccounts", []);
		signer = provider.getSigner();
		let status = await contract
			.electionStarted()
		$("#status").text(JSON.stringify(status));

	});

	$("#enroll").click(async function async() {
		console.log("add User")
			let itemId = $('#enrollForItem').val();
			await contract.inductMember(itemId);
		});

	$("#get_members").click(async function async() {
		console.log("add User")
			let itemId = $('#get_members_itemID').val();
			let tx = await contract.getNoOfMembers(itemId);
			let count = ethers.utils.arrayify( tx._hex )[0];
			$("#get_members").text("Number of members enrolled " + count);
		});
	

	$("#create_item").click(async function async() {
		console.log("yaha aaya")
			let reservePrice = $('#reservePrice').val();
			let regTime = $('#regtime').val();
			let auctionDuration = $('#auctionDuration').val();
			let reductionRate = $('#reductionRate').val();
			await contract.createItem(reservePrice, reductionRate, auctionDuration, regTime);
			checkEvents();
		});

	$("#place_bid").click(async function async() {
			let secretBid = $('#secret_bid_amount').val();
			let itemId = $('#itemId_for_bid').val();
			await contract.placeSecretBid(itemId,secretBid);
			checkEvents();
		});



		$("#start_auction").click(async function async() {
			let amountTobeAdded = $('#extra_amount').val();
			let itemId = $('#itemId_for_start_auction').val();
		    await contract.startBidding(itemId,amountTobeAdded);
			checkEvents();
			});

			$("#get_price").click(async function async() {
				let itemId = $('#itemID_get_price').val();
				let tx = await contract.getPrice(itemId);
				count = BigInt(tx._hex).toString();
			    $("#get_price").text("current Price " + count);
			});

			$("#buy").click(async function async() {
				let amount = $('#amount').val();
				let itemId = $('#buy_itemId').val();
				await contract.buy(itemId,{value:amount} );
				checkEvents();
			});
});
