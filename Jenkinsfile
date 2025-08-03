pipeline {
  agent any

  environment {
    NODE_ENV = 'production'
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
