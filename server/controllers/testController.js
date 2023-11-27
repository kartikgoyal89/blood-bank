const testController = (req,res) => {
    res.status(200).send({
        message: "Test Router",
        success: true,
    });
};


module.exports = {testController};