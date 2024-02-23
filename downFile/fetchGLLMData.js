const axios = require('axios');
const { KeyAndApi } = require('./../constants');

async function fetchGLLMData() {
    try {
        const response = await axios.get(KeyAndApi.gllm);
        var GLLM = response.data.filter(item => (item.variant !== "" && item.variant !== null && item.ProductType !== "" && item.ProductType !== null));

        return GLLM.map(item => ({
            ...item,
            ProductType: item.ProductType.toLowerCase().trim().replace(/ /g, '').split(","),
            variant: item.variant.toLowerCase().trim().replace(/ /g, '').split(",")
        }));
    } catch (error) {
        console.log("---------------------------------------loi fetch gllm --------------------------------------------");
 return false
    }

}
module.exports = fetchGLLMData; 