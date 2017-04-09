pipeline {
  agent any
  stages {
    stage('prepare') {
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
          "OriginalVimTest": {
            sh 'make testOriginalVim'
            
          }
        )
      }
    }
    stage('lint') {
      steps {
        echo 'OK'
        sh 'make tslint'
      }
    }
    stage('release') {
      steps {
        echo 'OK'
      }
    }
  }
}