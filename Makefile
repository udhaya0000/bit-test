OUTPUT_DIR=./output/admarket

S3_BUCKET=None
YARN_CMD=yarn run build

ifeq ($(ENVIRONMENT), staging)
	S3_BUCKET=obmedia-admarket-stg
	YARN_CMD=yarn run build:staging
endif
ifeq ($(ENVIRONMENT), production)
	S3_BUCKET=obmedia-admarket-prod
	YARN_CMD=yarn run build
endif
ifeq ($(ENVIRONMENT), featuretest1)
	S3_BUCKET=obmedia-admarket-ft1
	YARN_CMD=yarn run build
endif
ifeq ($(ENVIRONMENT), featuretest2)
	S3_BUCKET=obmedia-admarket-ft2
	YARN_CMD=yarn run build
endif

build:
	yarn install
	yarn run build | echo 0
	yarn run build

publish:
	cd $(OUTPUT_DIR) && aws s3 cp --recursive . s3://$(S3_BUCKET)/ --acl public-read

