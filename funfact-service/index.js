const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../protos/funfact.proto');
const COMMON_PROTO_PATH = path.join(__dirname, '../protos/common.proto');

const packageDefinition = protoLoader.loadSync(
  [PROTO_PATH, COMMON_PROTO_PATH],
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const funfactProto = grpc.loadPackageDefinition(packageDefinition).funfact;

const funFacts = {
  science: ['Bananas are radioactive.'],
  history: ['In ancient Egypt, servants were smeared with honey to attract flies away from the pharaoh.'],
};

function getRandomFunFact(call, callback) {
  const allFacts = Object.values(funFacts).flat();
  const fact = allFacts[Math.floor(Math.random() * allFacts.length)];
  callback(null, { fact });
}

function getFunFactByCategory(call, callback) {
  const category = call.request.category;
  const facts = funFacts[category] || [];
  if (facts.length > 0) {
    const fact = facts[Math.floor(Math.random() * facts.length)];
    callback(null, { fact });
  } else {
    callback(null, { fact: 'No fun facts available for this category.' });
  }
}

function main() {
  const server = new grpc.Server();
  server.addService(funfactProto.FunFactService.service, {
    GetRandomFunFact: getRandomFunFact,
    GetFunFactByCategory: getFunFactByCategory,
  });
  const port = '0.0.0.0:50052';
  server.bindAsync(port, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log(`Fun Fact Service running at ${port}`);
  });
}

main();
