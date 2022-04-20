const AWS = require("aws-sdk");
const res = require("express/lib/response");

require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
});

const docDynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "tareas";

const getData = async () => {

  const params = {
    TableName: TABLE_NAME,
  };

  const notas = await docDynamo.scan(params).promise();

  console.log(notas);
  return (notas)

 
};
const saveData = async (nota) => {
  const params = {
    TableName: TABLE_NAME,
    Item: nota,
  };
 
   return  await docDynamo.put(params).promise();
  
};

module.exports =  {
  getData, saveData
};

//saveData(nota);
