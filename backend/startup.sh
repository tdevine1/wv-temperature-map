#!/usr/bin/env bash
# Install Python STAC & raster libs in the container
pip3 install --no-cache-dir \
  pystac-client \
  planetary-computer \
  rioxarray

# Now start your Node app
npm start
