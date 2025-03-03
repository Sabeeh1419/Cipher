function encryptRailFence(text, rails) {
    let fence = Array.from({ length: rails }, () => []);
    let direction = 1;
    let rail = 0;

    for (let char of text) {
        fence[rail].push(char);
        rail += direction;
        if (rail === rails - 1 || rail === 0) {
            direction *= -1;
        }
    }

    return fence.flat().join('');
}

function decryptRailFence(text, rails) {
    let fence = Array.from({ length: rails }, () => []);
    let direction = 1;
    let rail = 0;

    // Create the fence pattern
    for (let i = 0; i < text.length; i++) {
        fence[rail].push(null);
        rail += direction;
        if (rail === rails - 1 || rail === 0) {
            direction *= -1;
        }
    }

    // Fill the fence with the ciphertext
    let index = 0;
    for (let i = 0; i < rails; i++) {
        for (let j = 0; j < fence[i].length; j++) {
            if (fence[i][j] === null) {
                fence[i][j] = text[index++];
            }
        }
    }

    // Read the fence to get the plaintext
    let result = '';
    rail = 0;
    direction = 1;
    for (let i = 0; i < text.length; i++) {
        result += fence[rail].shift();
        rail += direction;
        if (rail === rails - 1 || rail === 0) {
            direction *= -1;
        }
    }

    return result;
}

function encrypt() {
    const message = document.getElementById('message').value;
    const rails = parseInt(document.getElementById('rails').value);
    if (!rails || rails < 2 || rails > 10) {
        alert("Number of rails must be between 2 and 10.");
        return;
    }
    const encryptedMessage = encryptRailFence(message, rails);
    document.getElementById('result').value = encryptedMessage;
}

function decrypt() {
    const message = document.getElementById('message').value;
    const rails = parseInt(document.getElementById('rails').value);
    if (!rails || rails < 2 || rails > 10) {
        alert("Number of rails must be between 2 and 10.");
        return;
    }
    const decryptedMessage = decryptRailFence(message, rails);
    document.getElementById('result').value = decryptedMessage;
}