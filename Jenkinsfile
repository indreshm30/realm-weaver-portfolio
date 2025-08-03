pipeline {
  agent any

  environment {
    PATH = "${env.PATH}:${WORKSPACE}/node_modules/.bin"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Build') {
      steps {
        // Clean previous build artifacts just to be safe
        sh 'rm -rf dist .vite .vite-temp'
        sh 'npx vite build'
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker build -t realm-weaver:latest .'
      }
    }
  }

  post {
    success {
      echo '✅ Build succeeded!'
    }
    failure {
      echo '❌ Build failed!'
    }
  }
}
