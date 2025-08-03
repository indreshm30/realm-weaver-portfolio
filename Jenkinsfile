pipeline {
  agent any

  environment {
    NODE_ENV = 'production'
  }

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build Project') {
      steps {
        sh 'npm run build'
      }
    }

    stage('List Build Files') {
      steps {
        sh 'ls -la dist'
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
