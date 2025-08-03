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
        sh 'npm install'
      }
    }
stage('Build') {
  steps {
    sh '''
      npm install vite --save-dev
      npm run build
    '''
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
