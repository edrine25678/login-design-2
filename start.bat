@echo off
echo Starting Animated Login Form Preview Server...
start "" "http://localhost:8080/index.html"
python -m http.server 8080
pause

