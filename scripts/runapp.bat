@echo off
cd  ..\src\TaekwonTourney.API
start cmd /k dotnet run
cd  ..\..\tourney
start cmd /k npm start