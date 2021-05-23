const headerTitleMatch = function(headers, title) {
    let headerObj, i;
    for (i in headers) {
        headerObj = headers[i];
        if (headerObj.title.trim().toLowerCase() == title.trim().toLowerCase()) return true;

        if (headerObj.subHeaders) {
            if (headerObj.subHeaders.length > 0) {
                if (headerTitleMatch(headerObj.subHeaders, title)) return true;
            }
        }
    }

    return false;
}

const modifySubHeader = function(headers, headerId, modifier) {
    let i;
    for (i in headers) {
        if (headers[i]._id == headerId) {
            headers[i] = modifier(headers[i]);
            if (!headers[i]) headers.splice(i, 1);
            
            return [true, headers];
        }

        if (headers[i].subHeaders) {
            if (headers[i].subHeaders.length > 0) {
                const [ modified, subheaders ] = modifySubHeader(headers[i].subHeaders, headerId, modifier);
                if (modified) {
                    headers[i].subHeaders = subheaders;
                    return [true, headers];
                }
            }
        }
            
    }

    return [ false, [] ];
}

module.exports = { headerTitleMatch, modifySubHeader }