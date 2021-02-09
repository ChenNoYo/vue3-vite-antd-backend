git pull
cd server
npm i
set "cmdStr=npm run api"
cmd /c %cmdStr%
cd  ../web
npm i
set "cmdStr=npm run build"
cmd /c %cmdStr%
