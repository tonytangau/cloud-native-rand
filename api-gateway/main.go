package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	funfactpb "github.com/tonytangau/cloud-native-rand/protos/funfact"
	jokepb "github.com/tonytangau/cloud-native-rand/protos/joke"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"
)

func getRandomJokeHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		http.Error(w, "Could not connect to Joke Service", http.StatusInternalServerError)
		return
	}
	defer conn.Close()
	client := jokepb.NewJokeServiceClient(conn)
	resp, err := client.GetRandomJoke(context.Background(), &emptypb.Empty{})
	if err != nil {
		http.Error(w, "Error getting joke", http.StatusInternalServerError)
		return
	}
	fmt.Fprintln(w, resp.Joke)
}

func getRandomFunFactHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := grpc.Dial("localhost:50052", grpc.WithInsecure())
	if err != nil {
		http.Error(w, "Could not connect to Fun Fact Service", http.StatusInternalServerError)
		return
	}
	defer conn.Close()
	client := funfactpb.NewFunFactServiceClient(conn)
	resp, err := client.GetRandomFunFact(context.Background(), &emptypb.Empty{})
	if err != nil {
		http.Error(w, "Error getting fun fact", http.StatusInternalServerError)
		return
	}
	fmt.Fprintln(w, resp.Fact)
}

func main() {
	http.HandleFunc("/joke", getRandomJokeHandler)
	http.HandleFunc("/funfact", getRandomFunFactHandler)
	log.Println("API Gateway listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
