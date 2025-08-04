pipeline {
  agent {
    docker {
      image 'node:20-alpine'
      args '-u root'
    }
  }

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker build -t indreshm/realm-weaver:latest .'
      }
    }

    stage('Docker Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push indreshm/realm-weaver:latest
          '''
        }
      }
    }
  }

  post {
    failure {
      echo '❌ Pipeline failed! Please check logs above.'
    }
  }
}
