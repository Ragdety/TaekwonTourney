@echo off

if [%1] == [] (
	echo You must set a commit message on arg1
	goto eof
)

call changes.bat %1 f

:eof