#!/bin/bash
echo "########### Loading data to Mongo DB ###########"
mongoimport --jsonArray --db zips --collection zips --file /tmp/data/zips.json
echo "########### Loading data to Mongo DB finished ###########"