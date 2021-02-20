git pull
cd  web
set "cmdStr=npm i"
cmd /c %cmdStr%
set "cmdStr=npm run build"
cmd /c %cmdStr%
cd ../server
set "cmdStr=npm i"
cmd /c %cmdStr%
set "cmdStr=npm run api"
cmd /c %cmdStr%


