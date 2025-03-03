function generateKey(length) {
    let key = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}

function encryptColumnarTransposition(message, key) {
    const keyLength = key.length;
    const messageLength = message.length;
    const rows = Math.ceil(messageLength / keyLength);

    // Create a grid
    let grid = Array.from({ length: rows }, () => Array(keyLength).fill(''));

    // Fill the grid row-wise
    let index = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < keyLength; col++) {
            if (index < messageLength) {
                grid[row][col] = message[index++];
            } else {
                grid[row][col] = ' '; // Fill with space if message is shorter
            }
        }
    }

    // Get the column order based on the key
    const keyOrder = getKeyOrder(key);

    // Read columns in the order of the key
    let encryptedMessage = '';
    for (let col of keyOrder) {
        for (let row = 0; row < rows; row++) {
            encryptedMessage += grid[row][col];
        }
    }

    return encryptedMessage.trim();
}

function decryptColumnarTransposition(message, key) {
    const keyLength = key.length;
    const messageLength = message.length;
    const rows = Math.ceil(messageLength / keyLength);

    // Get the column order based on the key
    const keyOrder = getKeyOrder(key);

    // Create a grid
    let grid = Array.from({ length: rows }, () => Array(keyLength).fill(''));

    // Calculate the number of characters in each column
    const charsPerColumn = Array(keyLength).fill(rows);
    const remainder = messageLength % keyLength;
    for (let i = 0; i < remainder; i++) {
        charsPerColumn[keyOrder[i]]++;
    }

    // Fill the grid column-wise
    let index = 0;
    for (let col of keyOrder) {
        for (let row = 0; row < charsPerColumn[col]; row++) {
            if (index < messageLength) {
                grid[row][col] = message[index++];
            }
        }
    }

    // Read the grid row-wise to get the original message
    let decryptedMessage = '';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < keyLength; col++) {
            decryptedMessage += grid[row][col];
        }
    }

    return decryptedMessage.trim();
}

function getKeyOrder(key) {
    // Create an array of objects with character and original index
    const keyArray = key.split('').map((char, index) => ({ char, index }));
    // Sort the array based on the character
    keyArray.sort((a, b) => a.char.localeCompare(b.char));
    // Extract the original indices in the sorted order
    return keyArray.map((item) => item.index);
}

function encrypt() {
    const message = document.getElementById('message').value;
    let key = document.getElementById('key').value;

    // If key is empty, generate a random key
    if (!key) {
        key = generateKey(message.length);
        document.getElementById('key').value = key; // Display the generated key
    }

    const encryptedMessage = encryptColumnarTransposition(message, key);
    document.getElementById('result').value = encryptedMessage;
}

function decrypt() {
    const message = document.getElementById('message').value;
    const key = document.getElementById('key').value;

    if (!key) {
        alert("Please enter a key.");
        return;
    }

    const decryptedMessage = decryptColumnarTransposition(message, key);
    document.getElementById('result').value = decryptedMessage;
}