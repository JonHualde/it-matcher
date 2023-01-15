// You can then run docker-compose with the -f flag to specify the path to the docker-compose.yml file, like this:

// Copy code
docker-compose -f /api/docker-compose.yml up

// lint

// "lint": {
// "outputs": []
// },

"pipeline": {
"build": {
"outputs": ["dist/**", ".next/**"],
"dependsOn": ["^build"]
},
"test": {
"dependsOn": ["^build"],
"outputs": []
},
"dev": {
"cache": false
},
"deploy": {
"dependsOn": ["build", "test"],
"outputs": []
}
}

    "web#staging-deploy": {
      "env": [
        "NEXT_PUBLIC_AWS_S3_LINK=https://expert-matcher-s3-bucket.s3.eu-central-1.amazonaws.com",
        "NEXT_PUBLIC_API_URL=http://localhost:8000"
      ]
    },
    "web#production-deploy": {},
    "admin#staging-deploy": {},
    "admin#production-deploy": {},
    "api#staging-deploy": {},
    "api#production-deploy": {}

}
