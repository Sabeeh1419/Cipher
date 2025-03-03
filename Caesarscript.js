function caesarCipher(text, shift, action) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-z]/i)) {
            const code = text.charCodeAt(i);
            let shiftAmount = shift % 26; // Ensure shift is within 26 letters
            if (action === "decrypt") {
                shiftAmount = -shiftAmount; // Reverse shift for decryption
            }
            if (code >= 65 && code <= 90) { // Uppercase letters
                char = String.fromCharCode(((code - 65 + shiftAmount + 26) % 26) + 65);
            } else if (code >= 97 && code <= 122) { // Lowercase letters
                char = String.fromCharCode(((code - 97 + shiftAmount + 26) % 26) + 97);
            }
        }
        result += char;
    }
    return result;
}

function encrypt() {
    const message = document.getElementById('message').value;
    const shift = parseInt(document.getElementById('shift').value);
    if (!shift || shift < 1 || shift > 25) {
        alert("Shift value must be between 1 and 25.");
        return;
    }
    const encryptedMessage = caesarCipher(message, shift, "encrypt");
    document.getElementById('result').value = encryptedMessage;
}

function decrypt() {
    const message = document.getElementById('message').value;
    const shift = parseInt(document.getElementById('shift').value);
    if (!shift || shift < 1 || shift > 25) {
        alert("Shift value must be between 1 and 25.");
        return;
    }
    const decryptedMessage = caesarCipher(message, shift, "decrypt");
    document.getElementById('result').value = decryptedMessage;
}