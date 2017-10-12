#!/usr/bin/env bash
openssl aes-256-cbc -K $encrypted_94466d3b2c72_key -iv $encrypted_94466d3b2c72_iv -in deploy-key.enc -out ~\/.ssh/deploy-key -d
rm deploy-key.enc
chmod 600 deploy-key
mv deploy-key ~/.ssh/id_rsa