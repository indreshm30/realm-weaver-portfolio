pipeline {
  agent any

  environment {
    PATH = "${env.PATH}:${WORKSPACE}/node_modules/.bin"
    DOCKER_IMAGE = "indreshm/realm-weaver:latest"
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
        sh 'docker build -t $DOCKER_IMAGE .'
      }
    }

    stage('Docker Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
          sh '''
            echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin
            docker push $DOCKER_IMAGE
          '''
        }
      }
    }
  }

  post {
    success {
      echo '✅ CI + Docker Build + Push completed!'
    }
    failure {
      echo '❌ Pipeline failed! Please check logs above.'
    }
  }
}
