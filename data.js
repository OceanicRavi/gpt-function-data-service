// data.js

let gptFunctions = [];
  
  const findFunctionById = (id) => gptFunctions.find(f => f.id === id);
  
  const addFunction = (newFunction) => {
    gptFunctions.push(newFunction);
    return newFunction;
  };
  
  const updateFunction = (id, updatedData) => {
    const index = gptFunctions.findIndex(f => f.id === id);
    if (index !== -1) {
      gptFunctions[index] = { ...gptFunctions[index], ...updatedData };
      return gptFunctions[index];
    }
    return null;
  };

  const deleteFunction = (id) => {
    const index = gptFunctions.findIndex(f => f.id === id);
    if (index !== -1) {
      gptFunctions.splice(index, 1);
      return true;
    }
    return false;
  };

  function mapInputToOutput(input) {
    const {
        name,
        description,
        lambdaFunction,
        parameters
    } = input;

    let outputParameters = {};
    let requiredParameters = [];
    parameters.forEach(param => {
        const { name, type, description, enum: enumValues, required } = param;
        outputParameters[name.trim()] = { type, description, enum: enumValues };
        if (required) {
            requiredParameters.push(name.trim());
        }
    });

    // Constructing the output
    let output = {
        type: "function",
        function: {
            name,
            description,
            lambdaFunction,
            parameters: {
                type: "object",
                properties: outputParameters,
                required: requiredParameters
            }
        }
    };

    return output;
  }

  const findAndMapFunctionById = (id) => {
    const foundFunction = findFunctionById(id);
    if (foundFunction) {
      return mapInputToOutput(foundFunction);
    }
    return null;
  };
  
  module.exports = {
    gptFunctions,
    findFunctionById,
    addFunction,
    updateFunction,
    deleteFunction,
    findAndMapFunctionById
  };
  