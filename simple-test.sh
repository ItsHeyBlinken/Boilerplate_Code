#!/bin/bash

# Simple Boilerplate Testing Script
# Tests projects without requiring Docker installation

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    local status=$1
    local message=$2
    case $status in
        "INFO") echo -e "${BLUE}ℹ️  $message${NC}" ;;
        "SUCCESS") echo -e "${GREEN}✅ $message${NC}" ;;
        "WARNING") echo -e "${YELLOW}⚠️  $message${NC}" ;;
        "ERROR") echo -e "${RED}❌ $message${NC}" ;;
    esac
}

# Test static HTML project
test_html_css_js() {
    print_status "INFO" "Testing HTML/CSS/JS boilerplate"
    
    local project_path="./boilerplate-library/html-css-js"
    
    if [ -f "$project_path/index.html" ]; then
        print_status "SUCCESS" "index.html exists"
        
        # Check if HTML has basic structure
        if grep -q "<!DOCTYPE html>" "$project_path/index.html"; then
            print_status "SUCCESS" "Valid HTML5 doctype found"
        else
            print_status "WARNING" "No HTML5 doctype found"
        fi
        
        if grep -q "<title>" "$project_path/index.html"; then
            print_status "SUCCESS" "Title tag found"
        else
            print_status "WARNING" "No title tag found"
        fi
        
        if [ -f "$project_path/styles.css" ]; then
            print_status "SUCCESS" "styles.css exists"
        else
            print_status "ERROR" "styles.css missing"
        fi
        
        if [ -f "$project_path/script.js" ]; then
            print_status "SUCCESS" "script.js exists"
        else
            print_status "ERROR" "script.js missing"
        fi
        
        if [ -f "$project_path/README.md" ]; then
            print_status "SUCCESS" "README.md exists"
        else
            print_status "WARNING" "README.md missing"
        fi
        
    else
        print_status "ERROR" "index.html not found"
    fi
}

# Test package.json validity
test_package_json() {
    local project_path=$1
    local project_name=$2
    
    if [ -f "$project_path/package.json" ]; then
        print_status "INFO" "Testing package.json for $project_name"
        
        # Check if it's valid JSON
        if command -v jq >/dev/null 2>&1; then
            if jq empty "$project_path/package.json" >/dev/null 2>&1; then
                print_status "SUCCESS" "Valid JSON in package.json"
                
                # Check for required fields
                if jq -e '.name' "$project_path/package.json" >/dev/null 2>&1; then
                    print_status "SUCCESS" "Package name defined"
                else
                    print_status "WARNING" "No package name defined"
                fi
                
                if jq -e '.version' "$project_path/package.json" >/dev/null 2>&1; then
                    print_status "SUCCESS" "Package version defined"
                else
                    print_status "WARNING" "No package version defined"
                fi
                
                if jq -e '.scripts' "$project_path/package.json" >/dev/null 2>&1; then
                    print_status "SUCCESS" "Scripts section exists"
                else
                    print_status "WARNING" "No scripts section"
                fi
                
            else
                print_status "ERROR" "Invalid JSON in package.json"
            fi
        else
            print_status "WARNING" "jq not installed - cannot validate JSON"
        fi
    else
        print_status "ERROR" "package.json not found in $project_name"
    fi
}

# Test TypeScript configuration
test_typescript_config() {
    local project_path=$1
    local project_name=$2
    
    if [ -f "$project_path/tsconfig.json" ]; then
        print_status "INFO" "Testing TypeScript config for $project_name"
        
        if command -v jq >/dev/null 2>&1; then
            if jq empty "$project_path/tsconfig.json" >/dev/null 2>&1; then
                print_status "SUCCESS" "Valid TypeScript configuration"
            else
                print_status "ERROR" "Invalid TypeScript configuration"
            fi
        else
            print_status "WARNING" "jq not installed - cannot validate TypeScript config"
        fi
    fi
}

# Test project structure
test_project_structure() {
    local project_path=$1
    local project_name=$2
    
    print_status "INFO" "Testing project structure for $project_name"
    
    local issues=0
    
    # Check for README
    if [ ! -f "$project_path/README.md" ]; then
        print_status "WARNING" "No README.md found"
        ((issues++))
    else
        print_status "SUCCESS" "README.md exists"
    fi
    
    # Check for .gitignore
    if [ ! -f "$project_path/.gitignore" ]; then
        print_status "WARNING" "No .gitignore found"
    else
        print_status "SUCCESS" ".gitignore exists"
    fi
    
    # Check for environment example files
    if [ -f "$project_path/.env.example" ]; then
        print_status "SUCCESS" ".env.example exists"
    fi
    
    if [ $issues -eq 0 ]; then
        print_status "SUCCESS" "Project structure looks good"
    else
        print_status "WARNING" "Some project structure issues found"
    fi
}

# Main testing function
main() {
    echo -e "${BLUE}🧪 Simple Boilerplate Testing Suite${NC}"
    echo "============================================="
    
    # Test static HTML project
    echo -e "\n${BLUE}📄 Testing Static HTML Project${NC}"
    echo "----------------------------------------"
    test_html_css_js
    
    # Test Node.js projects
    echo -e "\n${BLUE}🔧 Testing Node.js Projects${NC}"
    echo "----------------------------------------"
    
    local node_projects=(
        "express-api"
        "node-postgres"
        "stripe-integration"
        "mern-starter/server"
        "mern-starter/client"
        "crm-platform/server"
        "crm-platform/client"
        "ecommerce-platform/server"
        "ecommerce-platform/client"
        "nextjs-starter"
        "react-vite"
        "docker-node"
    )
    
    for project in "${node_projects[@]}"; do
        local project_path="./boilerplate-library/$project"
        local project_name=$(basename "$project")
        
        if [ -d "$project_path" ]; then
            echo -e "\n--- Testing $project_name ---"
            test_package_json "$project_path" "$project_name"
            test_typescript_config "$project_path" "$project_name"
            test_project_structure "$project_path" "$project_name"
        else
            print_status "WARNING" "Project directory not found: $project_path"
        fi
    done
    
    echo -e "\n${BLUE}📊 Testing Complete${NC}"
    echo "======================"
    print_status "SUCCESS" "Basic structure testing completed!"
    print_status "INFO" "For full functionality testing, use the Docker-based test script"
}

main "$@"