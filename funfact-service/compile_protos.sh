#!/bin/bash

PROTO_DIR="../protos"
OUT_DIR="./protos"

mkdir -p $OUT_DIR

grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:$OUT_DIR \
  --grpc_out=grpc_js:$OUT_DIR \
  --proto_path=$PROTO_DIR \
  $PROTO_DIR/common.proto \
  $PROTO_DIR/funfact.proto
