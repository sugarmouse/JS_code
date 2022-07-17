#!/bin/bash

# 执行对应的测试用例

dir=$1
filename=$2

path="../test/${dir}/${filename}.test.js"

./node_modules/.bin/jest "${path}"


