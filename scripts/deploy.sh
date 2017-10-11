set -x
if [ $TRAVIS_BRANCH == 'master' ] ; then
    cd _site
    git init

    git remote add deploy "deploy@course-scheduler.me:/var/www"
    git config user.name "Travis CI"
    git config user.email "henry.teigar+travisCI@gmail.com"

    git add .
    git commit -m "Deploy"
    git push --force deploy master
else
    echo "Not deploying, since this branch isn't master."
fi