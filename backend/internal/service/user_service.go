package service

import (
	"errors"
	"time"

	"github.com/PwFaze/The-billionaire/internal/model"
	"github.com/PwFaze/The-billionaire/internal/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type IUserService interface {
	RegisterUser(user *model.User) (*model.User, error)
	LoginUser(req *model.CreateOrLoginUserRequest) (*model.User, error)
	UpdateUser(userID primitive.ObjectID, updatedUser *model.User) (*model.User, error)
	GetUserByID(userID primitive.ObjectID) (*model.User, error)
}

type UserService struct {
	UserRepository repository.IUserRepository
}

func NewUserService(userRepository repository.IUserRepository) IUserService {
	return &UserService{
		UserRepository: userRepository,
	}
}

// RegisterUser handles the registration of a new user.
// It hashes the user's password and then stores the user in the database.
func (s *UserService) RegisterUser(user *model.User) (*model.User, error) {
	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}
	user.Password = string(hashedPassword)
	user.CreatedAt = time.Now().Unix()
	user.UpdatedAt = time.Now().Unix()

	// Create the user in the database
	createdUser, err := s.UserRepository.CreateUserData(user)
	if err != nil {
		return nil, err
	}

	return createdUser, nil
}

// LoginUser validates the user's credentials (username and password).
// It returns the user if credentials match.
func (s *UserService) LoginUser(req *model.CreateOrLoginUserRequest) (*model.User, error) {
	// Get user by username
	user, err := s.UserRepository.GetUserByUsername(req)
	if err != nil {
		return nil, err
	}

	// Compare the hashed password with the provided password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	return user, nil
}

// UpdateUser updates the user data based on the user ID and new data provided.
func (s *UserService) UpdateUser(userID primitive.ObjectID, updatedUser *model.User) (*model.User, error) {
	updatedUser.UpdatedAt = time.Now().Unix()
	return s.UserRepository.UpdateUserData(userID, updatedUser)
}

// GetUserByID retrieves the user data by their unique user ID.
func (s *UserService) GetUserByID(userID primitive.ObjectID) (*model.User, error) {
	return s.UserRepository.GetUserByID(userID)
}
