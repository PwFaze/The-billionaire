package database

import (
	"context"
	"fmt"

	"github.com/PwFaze/The-billionaire/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func InitMongoDatabase(conf *config.DbConfig) (db *mongo.Database, err error) {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(conf.MongoURL))
	if err != nil {
		panic(fmt.Sprintf("Error connecting mongo: %v", err))
	}
	database := client.Database("TheBillionaire")
	return database, nil
}
