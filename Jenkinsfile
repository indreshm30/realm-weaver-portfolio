pipeline {
  agent any

  environment {
    NODE_ENV = 'production'
  }

  stages {
    stage('Use Node Docker Image') {
      steps {
        script {
          docker.image('node:20').inside {
            sh 'node -v'
            sh 'npm install'
            sh 'npm run build'
            sh 'ls -la dist || true'
          }
        }
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
