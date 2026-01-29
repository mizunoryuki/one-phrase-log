package database

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Db *gorm.DB

func InitDB() {
	log.Println("initialize DB")
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Tokyo",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)
	var err error

	// リトライ処理
	for i:=0; i < 5; i++ {
		Db,err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			break
		}
		log.Printf("connecting DB (%d/5)", i+1)
		time.Sleep(2 * time.Second)
	}
	if err != nil {
		log.Fatal("faild to connect DB:",err)
	}
	log.Printf("successfuly connected to DB")
}

type Snippet struct {
	ID			uint	`gorm:"primaryKey"`
	Content		string	`gorm:"not null"`
	IsArchived	bool	`gorm:"default:false"`
	CreatedAt	time.Time
}

func Migrate() {
	err := Db.AutoMigrate(&Snippet{})
	if err != nil {
		log.Printf("failed to migrate: %v",err)
	}else {
		log.Printf("successfuly connected to DB")
	}
}