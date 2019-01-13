pipeline {
		agent any
		stages {
				stage('Build') {
						steps {
								sh "npm install"
						}
				}
				stage('Test') {
						steps {
								sh "npm test"
						}
				}
				stage('Deploy') {
						steps {
								sh """
								ssh -o stricthostkeychecking=no root@47.95.118.133 "
                   source /etc/profile
									 cd /root/projects/wool-digger-api
                   git pull
                   npm install
									 pm2 reload wool-digger-api
								"
								"""
						}
				}
		}
}
