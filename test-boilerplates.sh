#!/bin/bash

# 🧪 Boilerplate Testing Script
# Tests all boilerplate projects without installing dependencies locally
# Uses Docker containers and isolated environments

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results
declare -A TEST_RESULTS
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to print colored output
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

# Function to test static HTML projects
test_static_project() {
    local project_path=$1
    local project_name=$2
    
    print_status "INFO" "Testing static project: $project_name"
    
    if [ -f "$project_path/index.html" ]; then
        # Check if HTML is valid
        if command -v tidy >/dev/null 2>&1; then
            if tidy -q "$project_path/index.html" >/dev/null 2>&1; then
                print_status "SUCCESS" "HTML validation passed for $project_name"
                TEST_RESULTS["$project_name"]="PASS"
                ((PASSED_TESTS++))
            else
                print_status "ERROR" "HTML validation failed for $project_name"
                TEST_RESULTS["$project_name"]="FAIL"
                ((FAILED_TESTS++))
            fi
        else
            # Basic check - file exists and is readable
            if [ -r "$project_path/index.html" ]; then
                print_status "SUCCESS" "Static files accessible for $project_name"
                TEST_RESULTS["$project_name"]="PASS"
                ((PASSED_TESTS++))
            else
                print_status "ERROR" "Static files not accessible for $project_name"
                TEST_RESULTS["$project_name"]="FAIL"
                ((FAILED_TESTS++))
            fi
        fi
    else
        print_status "ERROR" "No index.html found in $project_name"
        TEST_RESULTS["$project_name"]="FAIL"
        ((FAILED_TESTS++))
    fi
    ((TOTAL_TESTS++))
}

# Function to test Node.js projects with Docker
test_node_project() {
    local project_path=$1
    local project_name=$2
    
    print_status "INFO" "Testing Node.js project: $project_name"
    
    if [ -f "$project_path/package.json" ]; then
        # Create a temporary Dockerfile for testing
        cat > "$project_path/Dockerfile.test" << EOF
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build 2>/dev/null || echo "No build script"
EXPOSE 3000
CMD ["npm", "start"]
EOF
        
        # Build and test the Docker image
        if docker build -f "$project_path/Dockerfile.test" -t "test-$project_name" "$project_path" >/dev/null 2>&1; then
            print_status "SUCCESS" "Docker build successful for $project_name"
            TEST_RESULTS["$project_name"]="PASS"
            ((PASSED_TESTS++))
        else
            print_status "ERROR" "Docker build failed for $project_name"
            TEST_RESULTS["$project_name"]="FAIL"
            ((FAILED_TESTS++))
        fi
        
        # Clean up
        rm -f "$project_path/Dockerfile.test"
        docker rmi "test-$project_name" >/dev/null 2>&1 || true
    else
        print_status "ERROR" "No package.json found in $project_name"
        TEST_RESULTS["$project_name"]="FAIL"
        ((FAILED_TESTS++))
    fi
    ((TOTAL_TESTS++))
}

# Function to test React/Vite projects
test_react_project() {
    local project_path=$1
    local project_name=$2
    
    print_status "INFO" "Testing React project: $project_name"
    
    if [ -f "$project_path/package.json" ]; then
        # Create a temporary Dockerfile for React projects
        cat > "$project_path/Dockerfile.test" << EOF
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
EOF
        
        # Build and test the Docker image
        if docker build -f "$project_path/Dockerfile.test" -t "test-$project_name" "$project_path" >/dev/null 2>&1; then
            print_status "SUCCESS" "Docker build successful for $project_name"
            TEST_RESULTS["$project_name"]="PASS"
            ((PASSED_TESTS++))
        else
            print_status "ERROR" "Docker build failed for $project_name"
            TEST_RESULTS["$project_name"]="FAIL"
            ((FAILED_TESTS++))
        fi
        
        # Clean up
        rm -f "$project_path/Dockerfile.test"
        docker rmi "test-$project_name" >/dev/null 2>&1 || true
    else
        print_status "ERROR" "No package.json found in $project_name"
        TEST_RESULTS["$project_name"]="FAIL"
        ((FAILED_TESTS++))
    fi
    ((TOTAL_TESTS++))
}

# Function to test projects with existing Dockerfiles
test_docker_project() {
    local project_path=$1
    local project_name=$2
    
    print_status "INFO" "Testing Docker project: $project_name"
    
    if [ -f "$project_path/Dockerfile" ] || [ -f "$project_path/Dockerfile.dev" ]; then
        local dockerfile="Dockerfile"
        if [ -f "$project_path/Dockerfile.dev" ]; then
            dockerfile="Dockerfile.dev"
        fi
        
        # Build the Docker image
        if docker build -f "$project_path/$dockerfile" -t "test-$project_name" "$project_path" >/dev/null 2>&1; then
            print_status "SUCCESS" "Docker build successful for $project_name"
            TEST_RESULTS["$project_name"]="PASS"
            ((PASSED_TESTS++))
        else
            print_status "ERROR" "Docker build failed for $project_name"
            TEST_RESULTS["$project_name"]="FAIL"
            ((FAILED_TESTS++))
        fi
        
        # Clean up
        docker rmi "test-$project_name" >/dev/null 2>&1 || true
    else
        print_status "ERROR" "No Dockerfile found in $project_name"
        TEST_RESULTS["$project_name"]="FAIL"
        ((FAILED_TESTS++))
    fi
    ((TOTAL_TESTS++))
}

# Function to check project structure
check_project_structure() {
    local project_path=$1
    local project_name=$2
    
    print_status "INFO" "Checking project structure: $project_name"
    
    local issues=0
    
    # Check for README
    if [ ! -f "$project_path/README.md" ]; then
        print_status "WARNING" "No README.md found in $project_name"
        ((issues++))
    fi
    
    # Check for package.json (if it's a Node.js project)
    if [ -f "$project_path/package.json" ]; then
        # Check if package.json is valid JSON
        if ! jq empty "$project_path/package.json" >/dev/null 2>&1; then
            print_status "ERROR" "Invalid package.json in $project_name"
            ((issues++))
        fi
        
        # Check for required scripts
        if ! jq -e '.scripts.dev' "$project_path/package.json" >/dev/null 2>&1; then
            print_status "WARNING" "No dev script in package.json for $project_name"
        fi
    fi
    
    # Check for TypeScript config
    if [ -f "$project_path/tsconfig.json" ]; then
        if ! jq empty "$project_path/tsconfig.json" >/dev/null 2>&1; then
            print_status "ERROR" "Invalid tsconfig.json in $project_name"
            ((issues++))
        fi
    fi
    
    if [ $issues -eq 0 ]; then
        print_status "SUCCESS" "Project structure looks good for $project_name"
        TEST_RESULTS["$project_name-structure"]="PASS"
        ((PASSED_TESTS++))
    else
        print_status "ERROR" "Project structure issues found in $project_name"
        TEST_RESULTS["$project_name-structure"]="FAIL"
        ((FAILED_TESTS++))
    fi
    ((TOTAL_TESTS++))
}

# Main testing function
main() {
    echo -e "${BLUE}🚀 Starting Boilerplate Testing Suite${NC}"
    echo "=================================================="
    
    # Check prerequisites
    if ! command -v docker >/dev/null 2>&1; then
        print_status "ERROR" "Docker is not installed. Please install Docker to run tests."
        exit 1
    fi
    
    if ! docker info >/dev/null 2>&1; then
        print_status "ERROR" "Docker daemon is not running. Please start Docker."
        exit 1
    fi
    
    print_status "INFO" "Docker is available and running"
    
    # Test static HTML projects
    echo -e "\n${BLUE}📄 Testing Static HTML Projects${NC}"
    echo "----------------------------------------"
    test_static_project "./boilerplate-library/html-css-js" "html-css-js"
    
    # Test React/Vite projects
    echo -e "\n${BLUE}⚛️  Testing React/Vite Projects${NC}"
    echo "----------------------------------------"
    test_react_project "./boilerplate-library/react-vite" "react-vite"
    test_react_project "./boilerplate-library/nextjs-starter" "nextjs-starter"
    
    # Test Node.js API projects
    echo -e "\n${BLUE}🔧 Testing Node.js API Projects${NC}"
    echo "----------------------------------------"
    test_node_project "./boilerplate-library/express-api" "express-api"
    test_node_project "./boilerplate-library/node-postgres" "node-postgres"
    test_node_project "./boilerplate-library/stripe-integration" "stripe-integration"
    
    # Test full-stack projects
    echo -e "\n${BLUE}🏗️  Testing Full-Stack Projects${NC}"
    echo "----------------------------------------"
    test_node_project "./boilerplate-library/mern-starter/server" "mern-starter-server"
    test_react_project "./boilerplate-library/mern-starter/client" "mern-starter-client"
    test_node_project "./boilerplate-library/crm-platform/server" "crm-platform-server"
    test_react_project "./boilerplate-library/crm-platform/client" "crm-platform-client"
    test_node_project "./boilerplate-library/ecommerce-platform/server" "ecommerce-platform-server"
    test_react_project "./boilerplate-library/ecommerce-platform/client" "ecommerce-platform-client"
    
    # Test Docker projects
    echo -e "\n${BLUE}🐳 Testing Docker Projects${NC}"
    echo "----------------------------------------"
    test_docker_project "./boilerplate-library/docker-node" "docker-node"
    
    # Check project structures
    echo -e "\n${BLUE}📋 Checking Project Structures${NC}"
    echo "----------------------------------------"
    for project_dir in ./boilerplate-library/*/; do
        if [ -d "$project_dir" ]; then
            project_name=$(basename "$project_dir")
            check_project_structure "$project_dir" "$project_name"
        fi
    done
    
    # Generate test report
    echo -e "\n${BLUE}📊 Test Results Summary${NC}"
    echo "=================================================="
    echo -e "Total Tests: ${BLUE}$TOTAL_TESTS${NC}"
    echo -e "Passed: ${GREEN}$PASSED_TESTS${NC}"
    echo -e "Failed: ${RED}$FAILED_TESTS${NC}"
    echo ""
    
    if [ $FAILED_TESTS -eq 0 ]; then
        print_status "SUCCESS" "All tests passed! 🎉"
        exit 0
    else
        print_status "ERROR" "Some tests failed. See details above."
        echo -e "\n${YELLOW}Failed Tests:${NC}"
        for test_name in "${!TEST_RESULTS[@]}"; do
            if [ "${TEST_RESULTS[$test_name]}" = "FAIL" ]; then
                echo -e "  ${RED}❌ $test_name${NC}"
            fi
        done
        exit 1
    fi
}

# Run the main function
main "$@"