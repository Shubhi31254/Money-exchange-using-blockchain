const contractAddress = "0x5066802ef53422df24c5abc022e7c72468c81836";

const abi = [
  "function deposit() payable",
  "function withdraw(uint amount)",
  "function getBalance() view returns(uint)"
];

let provider;
let signer;
let contract;
let authMode = "login";

// ================= AUTH =================
function switchAuthMode() {
  authMode = authMode === "login" ? "signup" : "login";

  document.getElementById("authTitle").innerText =
    authMode === "login" ? "Login" : "Signup";

  document.getElementById("authSubmitBtn").innerText =
    authMode === "login" ? "Secure Login" : "Create Account";
}

function handleAuth() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("authMessage");

  if (!email.endsWith("@gmail.com")) {
    message.innerText = "Email must end with @gmail.com";
    return;
  }

  if (password.length < 8) {
    message.innerText = "Password must be at least 8 characters";
    return;
  }

  if (authMode === "signup") {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    message.innerText = "Signup successful! Please login.";
    switchAuthMode();
    return;
  }

  const savedEmail = localStorage.getItem("userEmail");
  const savedPassword = localStorage.getItem("userPassword");

  if (email === savedEmail && password === savedPassword) {
    window.location.href = "dashboard.html";
  } else {
    message.innerText = "Invalid credentials";
  }
}

function logout() {
  window.location.href = "index.html";
}

// ================= WALLET =================
async function connectWallet() {

  if (typeof window.ethereum === "undefined") {
    alert("MetaMask not installed");
    return;
  }

  try {
    provider = new ethers.BrowserProvider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    signer = await provider.getSigner();

    const address = await signer.getAddress();

    document.getElementById("wallet").innerText =
      "Wallet: " + address;

    contract = new ethers.Contract(contractAddress, abi, signer);

    document.getElementById("message").innerText =
      "Wallet Connected Successfully";

    getBalance();

  } catch (error) {
    console.log(error);
    alert("Wallet connection failed");
  }
}

// ================= DEPOSIT =================
async function deposit() {

  if (!contract) {
    alert("Connect wallet first");
    return;
  }

  const amount = prompt("Enter ETH amount to deposit:");

  if (!amount || isNaN(amount) || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  try {
    const tx = await contract.deposit({
      value: ethers.parseEther(amount)
    });

    await tx.wait();

    document.getElementById("message").innerText =
      "Deposit Successful";

    getBalance();

  } catch (error) {
    console.log(error);
    document.getElementById("message").innerText =
      "Deposit failed";
  }
}

// ================= WITHDRAW =================
async function withdraw() {

  if (!contract) {
    alert("Connect wallet first");
    return;
  }

  const amount = prompt("Enter ETH amount to withdraw:");

  if (!amount || isNaN(amount) || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  try {
    const tx = await contract.withdraw(
      ethers.parseEther(amount)
    );

    await tx.wait();

    document.getElementById("message").innerText =
      "Withdraw Successful";

    getBalance();

  } catch (error) {
    console.log(error);
    document.getElementById("message").innerText =
      "Withdraw failed";
  }
}

// ================= BALANCE =================
async function getBalance() {

  if (!contract) return;

  try {
    const balance = await contract.getBalance();

    document.getElementById("balance").innerText =
      "Balance: " + ethers.formatEther(balance) + " ETH";

  } catch (error) {
    console.log(error);
  }
}

// ================= SWAP =================
function calculateSwap() {
  const fromAmount = parseFloat(document.getElementById("fromAmount").value);

  if (!fromAmount || fromAmount <= 0) return;

  const estimatedRate = 24.5;

  document.getElementById("toAmount").value =
    (fromAmount * estimatedRate).toFixed(4);
}

// ================= MARKET DATA =================
async function loadMarketData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/solana"
    );

    const data = await response.json();

    document.getElementById("livePrice").innerText =
      "$" + data.market_data.current_price.usd;

    document.getElementById("volume").innerText =
      "$" + data.market_data.total_volume.usd.toLocaleString();

    document.getElementById("marketCap").innerText =
      "$" + data.market_data.market_cap.usd.toLocaleString();

  } catch (error) {
    console.log(error);
  }
}

// ================= AUTO LOAD =================
window.onload = function () {
  if (window.location.pathname.includes("dashboard.html")) {
    loadMarketData();
  }
};