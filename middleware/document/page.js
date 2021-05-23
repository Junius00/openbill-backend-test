const { Document } = require("../../models/Documents/Document");

const page = async function(req, res) {
    //take parameters from request
    const searchStr = req.body.searchQuery;
    const matchCase = req.body.searchMatchCase || false;
    let filterParams = req.body.filter || {};
    const sortParams = req.body.sort;

    const pageCount = req.body.pageCount || 10;
    const pageNo = req.body.pageNo || 1;

    //search the title using $regex (if any)
    if (searchStr && typeof searchStr == 'string') {
        if (searchStr.length > 0) {
            let regexObj = { '$regex': searchStr }
            if (!matchCase) regexObj['$options'] = 'i'

            filterParams['title'] = regexObj;
        }
    }

    docQuery = Document.find(filterParams);
    if (sortParams) docQuery.sort(sortParams);
    if (pageNo > 1) docQuery.skip(pageCount * (pageNo - 1));
    docQuery.limit(pageCount);

    let docExecError = false;
    let docResults = await docQuery.exec()
        .catch((err) => {
            docExecError = true;
            res.status(503).send(err);
        });
    
    if (!docResults) {
        if (!docExecError) res.status(400).send('BAD INPUT');
        return
    }


    res.status(200).json({ results: docResults });
}

module.exports = { page };