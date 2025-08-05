pipeline {
  agent any

  environment {
    DOCKER_IMAGE = 'indreshm/realm-weaver:latest'
  }

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE .'
      }
    }

    stage('Docker Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $DOCKER_IMAGE
          '''
        }
      }
    }
  }

  post {
    failure {
      echo '❌ Pipeline failed! Please check logs above.'
    }
    success {
      echo '✅ Pipeline completed successfully.'
    }
  }
}
