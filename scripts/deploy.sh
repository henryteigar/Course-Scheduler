#!/usr/bin/env bash
set -x
if [ $TRAVIS_BRANCH == 'master' ] ; then
    rm -rf .git
    rm -rf .gitignore
    git init

    git remote add deploy "deploy@course-scheduler.me:/var/www"
    git config user.name "Travis CI"
    git config user.email "travisCI@gmail.com"

    git add .
    git commit -m "Deploy"
    git push --force deploy master
else
    echo "Not deploying, since this branch isn't master."
fi