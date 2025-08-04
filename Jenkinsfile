pipeline {
  agent {
    docker {
      image 'node:18'
      args '-u root'
    }
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
