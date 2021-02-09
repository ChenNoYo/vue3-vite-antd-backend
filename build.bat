git pull
cd server
set "cmdStr=npm run api"
cmd /c %cmdStr%
cd  ../web
set "cmdStr=npm run build"
cmd /c %cmdStr%
