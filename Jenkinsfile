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
        sh 'npx vite build'
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
