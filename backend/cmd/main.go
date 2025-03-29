package main

import (
	"fmt"

	"github.com/PwFaze/The-billionaire/config"
	"github.com/PwFaze/The-billionaire/internal/database"
	"github.com/PwFaze/The-billionaire/internal/router"
	"github.com/gin-gonic/gin"
)

func main() {
	conf, err := config.LoadConfig()

	if err != nil {
		panic(fmt.Sprintf("Error loading config: %v", err))
	}

	mongoDB, err := database.InitMongoDatabase(&conf.Db)

	if err != nil {
		panic(fmt.Sprintf("Error connecting mongo: %v", err))
	}

	r := router.NewRouter(gin.Default(), conf)

	r.Run(mongoDB)
}
