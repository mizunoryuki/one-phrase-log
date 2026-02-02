package graph

import (
	"context"
	database "one-phrase-log/db"
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupTestDB(t *testing.T){
	var err error
	database.Db, err = gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		t.Fatalf("failed to connect database: %v",err)
	}
	database.Migrate()
}

func TestCreateSnippet(t *testing.T) {
	setupTestDB(t)
	resolver := &mutationResolver{&Resolver{}}
	ctx := context.Background()

	t.Run("正常に日記が作成されること", func(t *testing.T) {
		content := "テスト投稿"
		result, err := resolver.CreateSnippet(ctx, content)

		assert.NoError(t, err)
		assert.Equal(t, content, result.Content)
		assert.False(t, result.IsArchived)
		assert.NotEmpty(t, result.ID)
	})
}

func TestDeleteSnippet(t *testing.T) {
	setupTestDB(t)
	resolver := &mutationResolver{&Resolver{}}
	ctx := context.Background()

	// 作成
	content := "削除テスト用"
	created, err := resolver.CreateSnippet(ctx,content)
	if err != nil {
		t.Fatalf("failed to create test data:%v",err)
	}

	// 削除
	t.Run("日記が削除できること", func(t *testing.T) {
		result,err := resolver.DeleteSnippet(ctx,created.ID)
		assert.NoError(t, err)
		assert.Equal(t, created.ID, result,"削除されたIDが一致すること")
	})

	t.Run("存在しないIDを指定した場合にエラーになること", func(t *testing.T) {
		_, err := resolver.DeleteSnippet(ctx, "9999")
		assert.NoError(t, err)
	})
}

func TestUpdateAndToggle(t *testing.T){
	setupTestDB(t)
	mutResolver := &mutationResolver{&Resolver{}}
	queryResolver := &queryResolver{&Resolver{}}
	ctx := context.Background()

	s,_ := mutResolver.CreateSnippet(ctx,"編集前")

	t.Run("内容を編集できること",func(t *testing.T){
		updated, err := mutResolver.UpdateSnippet(ctx, s.ID, "編集後")
		assert.NoError(t, err)
		assert.Equal(t, "編集後", updated.Content)
	})

	t.Run("アーカイブを切り替えられること", func(t *testing.T) {
		toggled, err := mutResolver.ToggleArchive(ctx, s.ID)
		assert.NoError(t, err)
		assert.True(t, toggled.IsArchived)
	})

	t.Run("一覧で取得できること", func(t *testing.T) {
		list, err := queryResolver.Snippets(ctx)
		assert.NoError(t,err)
		assert.Len(t, list,1)
	})
}