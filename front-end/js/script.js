document.addEventListener('DOMContentLoaded', function () {
    function initializeEventListeners() {
        const connectWalletButton = document.getElementById('connect_wallet1');
        const walletConnectSection = document.querySelector('.wallet_connect');
        const closeButton = document.getElementById('close');
        const connectConfirm = document.getElementById('confirmButton');
        const walletAddressInput = document.getElementById('wallet_input');
        const privateKeyInput = document.getElementById('private_key_input');

        connectWalletButton.addEventListener('click', () => {
            walletConnectSection.style.display = 'flex';
        });

        connectConfirm.addEventListener('click', connectWallet); // Call connectWallet function on button click

        // Add keydown event listener to input fields
        walletAddressInput.addEventListener('keydown', function(event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent default form submission
                connectWallet(); // Call connectWallet function
            }
        });

        privateKeyInput.addEventListener('keydown', function(event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent default form submission
                connectWallet(); // Call connectWallet function
            }
        });

        function connectWallet() {
            const address = walletAddressInput.value;
            const privateKey = privateKeyInput.value;

            fetch('/connect-wallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address, privateKey }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    alert('Wallet connected successfully!');
                    window.location.href = `/profile?walletAddress=${address}`;
                } else {
                    alert('Failed to connect wallet: ' + data.error);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }

        const createWalletButton = document.getElementById('create_wallet1');
        const walletCreateSection = document.querySelector('.create_wallet');
        const confirmCreate = document.getElementById('generateWalletButton');
        const closeCreateButton = document.getElementById('close_create_wallet');
        const generatedWalletAddressInput = document.getElementById('generated_wallet_address');
        const generatedPrivateKeyInput = document.getElementById('generated_private_key');

        createWalletButton.addEventListener('click', () => {
            walletCreateSection.style.display = 'flex';
        });

        confirmCreate.addEventListener('click', () => {
            fetch('/generate-wallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                alert('Create wallet successfully!');
                generatedWalletAddressInput.value = data.address;
                generatedPrivateKeyInput.value = data.privateKey;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });

        closeButton.addEventListener('click', () => {
            walletConnectSection.style.display = 'none';
        });

        closeCreateButton.addEventListener('click', () => {
            walletCreateSection.style.display = 'none';
        });

        document.getElementById('changeDataButton').addEventListener('click', function() {
            document.querySelector('.changeDataForm').style.display = 'flex';
            document.querySelector('.profile').style.display = 'none';

        });
    };

    initializeEventListeners();
});
