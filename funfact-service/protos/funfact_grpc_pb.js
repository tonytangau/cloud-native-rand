// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var funfact_pb = require('./funfact_pb.js');
var common_pb = require('./common_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_common_CategoryRequest(arg) {
  if (!(arg instanceof common_pb.CategoryRequest)) {
    throw new Error('Expected argument of type common.CategoryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_common_CategoryRequest(buffer_arg) {
  return common_pb.CategoryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_funfact_FunFactResponse(arg) {
  if (!(arg instanceof funfact_pb.FunFactResponse)) {
    throw new Error('Expected argument of type funfact.FunFactResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_funfact_FunFactResponse(buffer_arg) {
  return funfact_pb.FunFactResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var FunFactServiceService = exports.FunFactServiceService = {
  getRandomFunFact: {
    path: '/funfact.FunFactService/GetRandomFunFact',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: funfact_pb.FunFactResponse,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_funfact_FunFactResponse,
    responseDeserialize: deserialize_funfact_FunFactResponse,
  },
  getFunFactByCategory: {
    path: '/funfact.FunFactService/GetFunFactByCategory',
    requestStream: false,
    responseStream: false,
    requestType: common_pb.CategoryRequest,
    responseType: funfact_pb.FunFactResponse,
    requestSerialize: serialize_common_CategoryRequest,
    requestDeserialize: deserialize_common_CategoryRequest,
    responseSerialize: serialize_funfact_FunFactResponse,
    responseDeserialize: deserialize_funfact_FunFactResponse,
  },
};

exports.FunFactServiceClient = grpc.makeGenericClientConstructor(FunFactServiceService);
