const modifyData = function(headers, dataId, modifier) {
    let i;
    let dataObj, j;
    for (i in headers) {
        for (j in headers[i].subData) {
            dataObj = headers[i].subData[j];
            if (dataObj._id == dataId) {
                headers[i].subData[j] = modifier(dataObj);
                if (!headers[i].subData[j]) headers[i].subData.splice(j, 1);

                return [true, headers];
            }
        }

        if (headers[i].subHeaders) {
            if (headers[i].subHeaders.length > 0) {
                const [ modified, subheaders ] = modifyData(headers[i].subHeaders, dataId, modifier);
                if (modified) {
                    headers[i].subHeaders = subheaders;
                    return [true, headers];
                }
            }
        }
    }

    return [false, []];
}

module.exports = { modifyData };