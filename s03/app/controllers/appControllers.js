const data = require("../util/util");

module.exports.getData = (req,res) => {

    res.status(200).send(data)

}

module.exports.addData = (req,res) => {

    if(!req.body.hasOwnProperty("name")){
        return res.status(400).send("Incomplete Input: No Name");
    }

    if(!req.body.hasOwnProperty("description")){
        return res.status(400).send("Incomplete Input: No Description");
    }

    if(!req.body.hasOwnProperty("price")){
        return res.status(400).send("Incomplete Input: No Price");
    }

    if (req.body.name == data[0].name || req.body == data[1].name){
        return res.status(406).send("Duplicate items");
    }

    if(req.body.price < 100) {
        return res.status(400).send("Price is invalid")
    }

    data.push(req.body);
    return res.status(201).send(data[data.length-1]);
 
}

module.exports.updateData = (req,res) => {

    if(!req.body.hasOwnProperty("name")) {
        return res.status(400).send("Incomplete Input: No Name");

    }

    if(!req.body.hasOwnProperty("description")) {
            return res.status(400).send("Incomplete Input: No Description");

    }

    if(!req.body.hasOwnProperty("price")) {
            return res.status(400).send("Incomplete Input: No Price");

    }

    data[req.params.index] = req.body;
    res.status(200).send(data[req.params.index]);

}

module.exports.deleteData = (req,res) => {
    
    data.pop();
    res.status(200).send(data);
    
}