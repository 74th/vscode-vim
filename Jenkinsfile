pipeline {
  agent any
  stages {
    stage('npm install') {
      steps {
        sh 'npm install'
      }
    }
    stage('build') {
      steps {
        sh 'make build'
      }
    }
    stage('test') {
      steps {
        parallel(
          "test": {
            sh 'make test'
            
          },
          "telint": {
            sh 'make tslint'
            
          },
          "OriginalVimTest": {
            sh 'make testOriginalVim'
            
          }
        )
      }
    }
    stage('release') {
      steps {
        echo 'OK'
      }
    }
  }
}