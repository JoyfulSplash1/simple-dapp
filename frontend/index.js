const provider = new ethers.providers.Web3Provider(window.ethereum);
const greeterAddress = "0x85313F94032a471B2aACA7fb36574Bc68Fbca754"; 

const greeterABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "greet",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "name": "setGreeting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  async function main() {
    await provider.send("eth_requestAccounts", []);
    
    const signer = provider.getSigner();
    let greeting = document.getElementById("greeting");
    const greeterContract = new ethers.Contract(greeterAddress, greeterABI, signer);
    greeting.innerHTML = await greeterContract.greet();
}

async function setGreeting(e) {
    const signer = provider.getSigner();
    const greeterContract = new ethers.Contract(greeterAddress, greeterABI, signer);
    e.preventDefault();
    newGreeting = e.target.new_greeting.value;
    document.getElementById("status").innerHTML = "Loading...";
    tx = await greeterContract.setGreeting(newGreeting);
    document.getElementById("status").innerHTML = "Waiting for confirmation!";
    await tx.wait();
    location.reload();
}

if (window.ethereum) {
  main();
} else {
  alert("Please access from a web3 browser");
}