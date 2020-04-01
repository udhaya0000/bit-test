pipeline {
  agent {
    label 'master'
  }

  tools {
    nodejs 'nodejs'
  }

  parameters {
    choice(name: 'DEPLOY', choices: ['no', 'yes'], description: 'Deploy after build?')
    choice(name: 'NOTIF', choices: ['yes', 'no'], description: 'Notify via slack?')
    choice(name: 'ENV_TO', choices: ['default', 'featuretest1', 'featuretest2'], description: 'Environment to deploy')
  }

  stages {
    stage ('Notify-start') {
      steps {
        script {
          if ("${NOTIF}" == "yes") {

            env.ENVIRONMENT = "undefined"
            if ("${BRANCH_NAME}" == "master"){
              env.ENVIRONMENT = "production"
            }
            if ("${BRANCH_NAME}" == "develop"){
              env.ENVIRONMENT = "staging"
            }

            slackSend (
              color: '#ffff00',
              channel: 'product-build-status',
              message: "2.0-web - Started \nBranch: ${env.BRANCH_NAME} \nEnvironment: ${env.ENVIRONMENT} \nChanges: \n$changeString \nUrl: ${env.build_url}"
            )
          }
        }
      }
    }

    stage ('Versions') {
      steps {
        sh '''
        node --version
        yarn --version
        '''
      }
    }

    stage ('Build') {
      steps {
        script {
          env.ENVIRONMENT = "undefined"
          if ("${BRANCH_NAME}" == "master"){
            env.ENVIRONMENT = "production"
          }
          if ("${BRANCH_NAME}" == "develop"){
            env.ENVIRONMENT = "staging"
          }
          if ("${ENV_TO}" != "default"){
            env.ENVIRONMENT = env.ENV_TO
          }
        }
        sh 'ENVIRONMENT=$ENVIRONMENT make build'
      }
    }

    stage ('Deploy') {
      steps {
        script {
          env.ENVIRONMENT = "undefined"
          if ("${BRANCH_NAME}" == "master"){
            env.ENVIRONMENT = "production"
          }
          if ("${BRANCH_NAME}" == "develop"){
            env.ENVIRONMENT = "staging"
          }
          if ("${ENV_TO}" != "default"){
            env.ENVIRONMENT = env.ENV_TO
          }
        }

        script {
          if( ("${ENV_TO}" == "default") && ("${BRANCH_NAME}" == "master" || "${BRANCH_NAME}" == "develop") ){
            sh 'ENVIRONMENT=$ENVIRONMENT make publish'
          }
          if( ("${DEPLOY}" == "yes") && ("${ENV_TO}" != "default") ) {
            sh 'ENVIRONMENT=$ENVIRONMENT make publish'
          }
        }
      }
    }
  }

  post {
    success {
      script {
        if ("${NOTIF}" == "yes") {
          slackSend (
            color: '#00ff00',
            channel: 'product-build-status',
            message: "2.0-web - Completed:  '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
          )
        }
      }
    }
    failure {
      script {
        if ("${NOTIF}" == "yes") {
          slackSend (
            color: '#ff0000',
            channel: 'product-build-status',
            message: "2.0-web - Failed:  '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
          )
        }
      }
    }
    always {
      cleanWs()
    }
  }
}

@NonCPS
def getChangeString() {
  MAX_MSG_LEN = 100
  def changeString = ""
  echo "Gathering SCM changes"
  def changeLogSets = currentBuild.rawBuild.changeSets
  for (int i = 0; i < changeLogSets.size(); i++) {
    def entries = changeLogSets[i].items
    for (int j = 0; j < entries.length; j++) {
      def entry = entries[j]
      truncated_msg = entry.msg.take(MAX_MSG_LEN)
      changeString += " - ${truncated_msg} [${entry.author}]\n"
    }
  }
  if (!changeString) {
    changeString = " - No new changes"
  }
  return changeString
} 

