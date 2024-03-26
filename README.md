# Copy .env.example thanh .env
Dien thong tin trong.env
# Gen private key va publickey
- cd vao keys
- openssl genrsa -out rsa-private-key.pem 2048
- openssl rsa -in rsa-private-key.pem -pubout -outform PEM -out rsa-public-key.pem

# npm install
# npm start