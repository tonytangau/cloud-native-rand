module github.com/tonytangau/cloud-native-rand/joke-service

go 1.23.2

replace github.com/tonytangau/cloud-native-rand/protos => ../protos

require (
	github.com/tonytangau/cloud-native-rand/protos v0.0.0-00010101000000-000000000000 // indirect
	golang.org/x/net v0.28.0 // indirect
	golang.org/x/sys v0.24.0 // indirect
	golang.org/x/text v0.17.0 // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20240814211410-ddb44dafa142 // indirect
	google.golang.org/grpc v1.67.1 // indirect
	google.golang.org/protobuf v1.35.1 // indirect
)
