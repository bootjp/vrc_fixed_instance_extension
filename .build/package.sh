#!/bin/bash

# run by project root

rm -rf ./dist/*
zip -jr ./dist/vrc_fixed_instance_extension.zip ./* -x'*.git*'
