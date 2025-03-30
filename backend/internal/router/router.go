package router

import (
	"fmt"

	"time"

	"github.com/PwFaze/The-billionaire/config"
	"github.com/PwFaze/The-billionaire/internal/handler"
	"github.com/PwFaze/The-billionaire/internal/repository"
	"github.com/PwFaze/The-billionaire/internal/service"
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
	corsConfig.AllowOrigins = []string{"*"}                                                // Allow all origins
	corsConfig.AllowMethods = []string{"OPTIONS", "PATCH", "PUT", "GET", "POST", "DELETE"} // Allow common HTTP methods
	corsConfig.AllowHeaders = []string{"Content-Type", "Authorization"}                    // Allow required headers
	corsConfig.ExposeHeaders = []string{"Content-Length"}                                  // Expose content length
	corsConfig.AllowCredentials = true                                                     // Allow credentials (cookies, headers, etc.)

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
	v1 := r.g.Group("/api/v1")

	userRepository := repository.NewUserRepository(mongoDB, "users")
	userService := service.NewUserService(userRepository)
	userHandler := handler.NewUserHandler(userService)
	userRouter := v1.Group("user")

	userRouter.GET("/:userID", userHandler.GetUserByID)
	userRouter.POST("/", userHandler.RegisterUser)
	userRouter.POST("/login", userHandler.LoginUser)
	userRouter.POST("/:userID", userHandler.UpdateUser)
	err := r.g.Run(":" + r.conf.App.Port)
	if err != nil {
		panic(fmt.Sprintf("Failed to run the server : %v", err))
	}
}
