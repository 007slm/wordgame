[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ErrorActionPreference = "Stop"

Write-Host ">>> Starting Android APK Build..." -ForegroundColor Cyan

$WorkspaceRoot = $PSScriptRoot
if (-not $WorkspaceRoot) {
    $WorkspaceRoot = (Get-Location).Path
}

# 1. Detect JDK (优先选用支持 Java 21 的 JDK 24)
$PossibleJdks = @(
    "C:\Program Files\Java\jdk-24",
    "C:\Users\007sl\AppData\Local\Programs\Android Studio\jbr",
    "$env:LOCALAPPDATA\Programs\Android Studio\jbr",
    "C:\Program Files\Android\Android Studio\jbr",
    "C:\Program Files\Java\jdk-17"
)

$SelectedJavaHome = $null
foreach ($p in $PossibleJdks) {
    if (Test-Path "$p\bin\java.exe") {
        $SelectedJavaHome = $p
        break
    }
}

if (-not $SelectedJavaHome -and $env:JAVA_HOME) {
    if (Test-Path "$env:JAVA_HOME\bin\java.exe") {
        $SelectedJavaHome = $env:JAVA_HOME
    }
}

if ($SelectedJavaHome) {
    $env:JAVA_HOME = $SelectedJavaHome
    $env:Path = "$SelectedJavaHome\bin;" + $env:Path
    Write-Host "[OK] Using JDK: $SelectedJavaHome" -ForegroundColor Green
} else {
    Write-Host "[WARN] No JDK path detected, using system default java." -ForegroundColor Yellow
}

# 2. Detect Android SDK
$PossibleSdks = @(
    "C:\Users\007sl\AppData\Local\Android\Sdk",
    "$env:LOCALAPPDATA\Android\Sdk"
)
foreach ($sdk in $PossibleSdks) {
    if (Test-Path $sdk) {
        $env:ANDROID_HOME = $sdk
        $env:ANDROID_SDK_ROOT = $sdk
        Write-Host "[OK] Using Android SDK: $sdk" -ForegroundColor Green
        break
    }
}

# 3. Sync web assets
Write-Host ">>> Step 1/3: Syncing web assets to www/..." -ForegroundColor Cyan
if (-not (Test-Path "$WorkspaceRoot\www")) {
    New-Item -ItemType Directory -Path "$WorkspaceRoot\www" -Force | Out-Null
}
Copy-Item -Path "$WorkspaceRoot\index.html" -Destination "$WorkspaceRoot\www\" -Force
Copy-Item -Path "$WorkspaceRoot\css" -Destination "$WorkspaceRoot\www\" -Recurse -Force
Copy-Item -Path "$WorkspaceRoot\js" -Destination "$WorkspaceRoot\www\" -Recurse -Force

# 4. Sync to Capacitor
Write-Host ">>> Step 2/3: Syncing Capacitor Android container..." -ForegroundColor Cyan
Set-Location $WorkspaceRoot
npx cap sync android

# 5. Build with Gradle
Write-Host ">>> Step 3/3: Building Debug APK with Gradle..." -ForegroundColor Cyan
Set-Location "$WorkspaceRoot\android"
.\gradlew.bat assembleDebug

# 6. Export APK
$ApkSource = "$WorkspaceRoot\android\app\build\outputs\apk\debug\app-debug.apk"
$DistDir = "$WorkspaceRoot\dist-apk"

if (Test-Path $ApkSource) {
    if (-not (Test-Path $DistDir)) {
        New-Item -ItemType Directory -Path $DistDir -Force | Out-Null
    }
    $DestApk = "$DistDir\wordgame-debug.apk"
    Copy-Item -Path $ApkSource -Destination $DestApk -Force
    $ApkItem = Get-Item $DestApk
    $SizeMB = [math]::Round($ApkItem.Length / 1MB, 2)

    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "SUCCESS: Android APK build completed!" -ForegroundColor Green
    Write-Host "APK Location: $DestApk" -ForegroundColor Yellow
    Write-Host "File Size: $SizeMB MB" -ForegroundColor Yellow
    Write-Host "============================================================" -ForegroundColor Green
} else {
    Write-Host "ERROR: APK output not found at $ApkSource" -ForegroundColor Red
}

Set-Location $WorkspaceRoot
