go mod init github.com/tonytangau/cloud-native-rand/protos

protoc \
  --proto_path=protos \
  --go_out=. \
  --go-grpc_out=. \
  --go_opt=module=github.com/tonytangau/cloud-native-rand/protos \
  --go-grpc_opt=module=github.com/tonytangau/cloud-native-rand/protos \
  protos/common.proto \
  protos/joke.proto \
  protos/funfact.proto

go get github.com/tonytangau/cloud-native-rand/protos
go get google.golang.org/grpc
go get google.golang.org/protobuf