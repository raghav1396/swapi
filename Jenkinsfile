pipeline {
    agent any
    
    environment {
        if (params.env_name == 'uat') {
            AWS_REGION = '<AWS_REGION>'
            S3_BUCKET = '<s3-bucket-name>'
            DISTRIBUTION_ID = '<cloudfront-distribution-id>'
            REACT_APP_ENV = 'development'
        }
        else if (params.env_name == 'prod') {
            AWS_REGION = '<AWS_REGION>'
            S3_BUCKET = '<s3-bucket-name>'
            DISTRIBUTION_ID = '<cloudfront-distribution-id>'
            REACT_APP_ENV = 'production'
        } else {
            script {
                echo 'Exiting as env is not known'
                currentBuild.getRawBuild().getExecutor().interrupt(Result.FAILURE)
                sleep(1)
            }
        }
    }

    stages {

        stage('Build React App') {
            steps {
                script {
                    // Build the React application
                    sh "mkdir build"
                    sh "docker build -t swapi ."
                    sh "docker run -it --rm -v ./build:/app/dist swapi"
                }
            }
        }

        stage('Upload to S3') {
            steps {
                script {
                    // Copy the build files to the S3 bucket
                    sh '''
                        aws s3 sync build/ s3://$S3_BUCKET --delete
                    '''
                }
            }
        }

        stage('Invalidate CloudFront Cache') {
            steps {
                script {
                    // Invalidate CloudFront cache to update the content in the CDN
                    sh '''
                        aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}