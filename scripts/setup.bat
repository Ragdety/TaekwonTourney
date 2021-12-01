@echo off
cd  ..\src\TaekwonTourney.API
dotnet ef database update
cd  ..\..\tourney
npm install
