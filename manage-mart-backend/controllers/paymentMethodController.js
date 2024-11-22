const paymentMethod = require("../models/paymentMethod");

const getAllPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await paymentMethod.findAll({
        order: [
            ['paymentMethodId', 'ASC']
        ]
    });
    res.status(200).json(paymentMethods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPaymentMethods,
};
