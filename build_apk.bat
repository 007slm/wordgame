@echo off
chcp 65001 >nul
title 单词消消乐 - 一键构建 Android APK
echo ========================================================
echo       [单词消消乐] 正在自动构建 Android APK 安装包...
echo ========================================================

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0build_apk.ps1"

pause
