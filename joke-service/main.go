package main

import (
	"context"
	"log"
	"net"

	pb "github.com/tonytangau/cloud-native-rand/protos/joke"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"google.golang.org/protobuf/types/known/emptypb"
)

type server struct {
	pb.UnimplementedJokeServiceServer
	jokes map[string][]string
}

func (s *server) GetRandomJoke(ctx context.Context, in *emptypb.Empty) (*pb.JokeResponse, error) {
	// For simplicity, returning a hardcoded joke
	joke := "Why don't scientists trust atoms? Because they make up everything!"
	return &pb.JokeResponse{Joke: joke}, nil
}

func (s *server) GetJokeByCategory(ctx context.Context, in *pb.CategoryRequest) (*pb.JokeResponse, error) {
	category := in.Category
	jokes := s.jokes[category]
	if len(jokes) == 0 {
		return &pb.JokeResponse{Joke: "No jokes available for this category."}, nil
	}
	joke := jokes[0] // Simplified selection
	return &pb.JokeResponse{Joke: joke}, nil
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterJokeServiceServer(s, &server{
		jokes: map[string][]string{
			"science":    {"Why don't scientists trust atoms? Because they make up everything!"},
			"technology": {"Why do programmers prefer dark mode? Because light attracts bugs!"},
		},
	})
	// Register reflection service on gRPC server.
	reflection.Register(s)
	log.Printf("Joke Service listening on %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
