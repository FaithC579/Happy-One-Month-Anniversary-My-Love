@echo off
cd /d "%~dp0"
echo Converting videos for web playback...
for %%f in (Video*.mp4) do (
    echo Converting %%f...
    ffmpeg -i "%%f" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 64k -movflags +faststart "%%~nf_web.mp4" -y
)
echo Done!
pause
