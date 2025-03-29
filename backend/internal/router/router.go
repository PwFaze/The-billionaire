package router

import (
	"fmt"

	"time"

	"github.com/PwFaze/The-billionaire/config"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

type Router struct {
	g    *gin.Engine
	conf *config.Config
}

func NewRouter(g *gin.Engine, conf *config.Config) *Router {
	return &Router{g, conf}
}

func (r *Router) Run(mongoDB *mongo.Database) {

	// CORS setting
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:3000"}
	corsConfig.AllowMethods = []string{"OPTIONS", "PATCH", "PUT", "GET", "POST", "DELETE"}
	corsConfig.AllowHeaders = []string{"Content-Type", "Authorization"} // Allow Authorization header
	corsConfig.ExposeHeaders = []string{"Content-Length"}
	corsConfig.AllowCredentials = true // If you are using cookies or Authorization header

	// Optional: Handle preflight cache
	corsConfig.MaxAge = 12 * time.Hour

	r.g.Use(cors.New(corsConfig))

	r.g.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "OK",
		})
	})

	// Swagger setting
	// docs.SwaggerInfo.BasePath = "/api/v1"
	// r.g.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	// versioning

	// setup
	r.g.Group("api")

	err := r.g.Run(":" + r.conf.App.Port)
	if err != nil {
		panic(fmt.Sprintf("Failed to run the server : %v", err))
	}
}
