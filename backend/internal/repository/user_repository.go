package repository

import (
	"context"
	"time"

	"github.com/PwFaze/The-billionaire/internal/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type IUserRepository interface {
	GetUserByID(userID primitive.ObjectID) (*model.User, error)
	CreateUserData(user *model.User) (*model.User, error)
	GetUserByUsername(req *model.CreateOrLoginUserRequest) (*model.User, error)
	UpdateUserData(userID primitive.ObjectID, updatedUser *model.User) (*model.User, error)
}

type UserRepository struct {
	UserCollection *mongo.Collection
}

func NewUserRepository(db *mongo.Database, collectionName string) IUserRepository {
	return &UserRepository{
		UserCollection: db.Collection(collectionName),
	}
}

func (u *UserRepository) CreateUserData(user *model.User) (*model.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()
	user.ID = primitive.NewObjectID()
	result, err := u.UserCollection.InsertOne(ctx, user)
	if err != nil {
		return nil, err
	}
	var newUser *model.User
	err = u.UserCollection.FindOne(ctx, bson.M{"_id": result.InsertedID}).Decode(&newUser)

	if err != nil {
		return nil, err
	}

	return newUser, nil
}

func (u *UserRepository) GetUserByID(userID primitive.ObjectID) (*model.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()

	var user *model.User

	err := u.UserCollection.FindOne(ctx, bson.M{"_id": userID}).Decode(&user)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (u *UserRepository) GetUserByUsername(req *model.CreateOrLoginUserRequest) (*model.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()

	var user *model.User

	err := u.UserCollection.FindOne(ctx, bson.M{"username": req.Username}).Decode(&user)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (u *UserRepository) UpdateUserData(userID primitive.ObjectID, updatedUser *model.User) (*model.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()
	data, err := bson.Marshal(updatedUser)
	if err != nil {
		return nil, err
	}
	var update bson.M
	err = bson.Unmarshal(data, &update)
	if err != nil {
		return nil, err
	}
	for key, value := range update {
		if value == "" || value == nil || key == "_id" {
			delete(update, key)
		}
	}

	filter := bson.M{"_id": userID}
	_, err = u.UserCollection.UpdateOne(ctx, filter, bson.M{"$set": update})
	if err != nil {
		return nil, err
	}

	var newUpdatedUser *model.User
	err = u.UserCollection.FindOne(ctx, filter).Decode(&newUpdatedUser)

	if err != nil {
		return nil, err
	}

	return newUpdatedUser, nil
}
