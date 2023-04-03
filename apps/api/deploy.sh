#!/bin/bash

# Get the current branch name
BRANCH=$(git symbolic-ref --short HEAD)

# Set the default stage to 'staging'
STAGE="staging"

# Check if the branch is 'main', and set the stage to 'production'
if [ "$BRANCH" == "main" ]; then
  STAGE="production"
fi

# Deploy using the appropriate stage
sls deploy --stage $STAGE
