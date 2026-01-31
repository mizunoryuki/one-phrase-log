//go:build tools

package tools

import (
	_ "github.com/99designs/gqlgen"
	_ "github.com/99designs/gqlgen/codegen/config"
	_ "github.com/99designs/gqlgen/internal/imports"
	_ "github.com/goccy/go-yaml"
	_ "github.com/urfave/cli/v3"
	_ "golang.org/x/tools/go/packages"
)