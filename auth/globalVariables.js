let refreshTokens = [];
const modifyRefreshTokens = function(newArr) {
    refreshTokens = newArr;
}

let sessionTokens = {};
const modifySessionTokens = function(newDict) {
    sessionTokens = newDict;
}

module.exports = { refreshTokens, modifyRefreshTokens, sessionTokens, modifySessionTokens };

