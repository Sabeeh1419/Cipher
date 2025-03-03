function generateKey(length) {
    let key = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}

function encrypt() {
    const message = document.getElementById('message').value;
    let key = document.getElementById('key').value;

    // If key is empty, generate a random key
    if (!key) {
        key = generateKey(message.length);
        document.getElementById('key').value = key; // Display the generated key
    }

    if (message.length !== key.length) {
        alert("Message and key must be of the same length!");
        return;
    }

    let encryptedMessage = '';
    for (let i = 0; i < message.length; i++) {
        const charCode = message.charCodeAt(i) ^ key.charCodeAt(i);
        encryptedMessage += String.fromCharCode(charCode);
    }

    document.getElementById('result').value = encryptedMessage;
}

function decrypt() {
    const encryptedMessage = document.getElementById('message').value;
    const key = document.getElementById('key').value;

    if (!key) {
        alert("Key is required for decryption!");
        return;
    }

    if (encryptedMessage.length !== key.length) {
        alert("Encrypted message and key must be of the same length!");
        return;
    }

    let decryptedMessage = '';
    for (let i = 0; i < encryptedMessage.length; i++) {
        const charCode = encryptedMessage.charCodeAt(i) ^ key.charCodeAt(i);
        decryptedMessage += String.fromCharCode(charCode);
    }

    document.getElementById('result').value = decryptedMessage;
}