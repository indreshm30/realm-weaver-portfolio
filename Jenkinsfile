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
sh 'node --loader ts-node/esm node_modules/vite/bin/vite.js build'
      }
    }
  }

  post {
    failure {
      echo '❌ Build failed!'
    }
    success {
      echo '✅ Build succeeded!'
    }
  }
}
