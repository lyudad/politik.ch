#!/bin/bash

set -e
export NODE_ENV='local'
# store app secrets
source ./environments/environment.${NODE_ENV}.sh

# npm run build
npm start