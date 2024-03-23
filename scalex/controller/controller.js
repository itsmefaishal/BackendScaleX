const tokens = require("../model/tokens.model");

const getTokens = async (req, res) => {
  try {
    const token = await tokens.find({});
    res.status(200).json(token);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSpecificToken = async (req, res) => {
  try {
    const { id } = await req.params;
    const getTheToken = await tokens.findById(id);
    res.status(200).json(getTheToken);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const postToken = async (req, res) => {
  try {
    const { name, symbol, address, price, volume } = req.body;

    const newToken = new tokens({
      name: name,
      symbol: symbol,
      address: address,
      price: price,
      volume: volume,
    });

    await newToken.save();
    res.status(200).json(newToken);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateToken = async (req, res) => {
  try{

    const {id} = req.params;
    const token = await tokens.findByIdAndUpdate(id, req.body);

    if(!token){
      res.status(404).json({message : "Token does not exist"});
    }

    const updatedToken = await tokens.findById(id);
    res.status(200).json(updatedToken);

  }
  catch(error){
    res.status(500).json({message : error.message});
  }
}

const deleteToken = async (req, res) => {
  try{
    const {id} = req.params;
    const token = await tokens.findByIdAndDelete(id);
    const name = token.name;

    if(!name){
      res.status(404).json("Token does not exist");
    }

    res.status(200).json({message : "Token " + name + " deleted successfully"});
  }
  catch(error){
    console.error({message : error.message});
  }
}

module.exports = {
  getTokens,
  getSpecificToken,
  postToken,
  updateToken,
  deleteToken
};
