@echo off

set backend_dir=..\src\
set frontend_dir=..\tourney\

if [%1] == [] (
	echo You must set a commit message on arg1
	goto eof
)

if [%2] == [] (
	echo Commit will be done on master branch, must have admin access...
	pause
	PUSHD ../
	git checkout master
	git branch
	goto continue
) 

if [%2] == [b] (
	echo Commit will be done on backend_changes branch
	pause
	PUSHD %backend_dir%
	git checkout backend_changes
	git branch
	goto continue
)

if [%2] == [f] (
	echo Commit will be done on frontend_changes branch
	pause
	PUSHD %frontend_dir%
	git checkout frontend_changes
	git branch
	goto continue
)

:continue

git status

git add .
git commit -m %1
git status
REM git push
POPD

:eof