const upperName = (req, res, next) => {
    const { name } = req.body;
    if (name) {
        req.body.name = name.split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.slice(1)).join(' ');
    }
    next();
}

module.exports = {
    upperName: upperName
}