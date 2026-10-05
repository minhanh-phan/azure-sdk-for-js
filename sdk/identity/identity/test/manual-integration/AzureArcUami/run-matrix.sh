#!/usr/bin/env bash

set -euo pipefail

iptables -C OUTPUT -d 169.254.169.254 -j REJECT 2>/dev/null ||
  iptables -I OUTPUT 1 -d 169.254.169.254 -j REJECT
iptables -C OUTPUT -d 169.254.169.253 -j REJECT 2>/dev/null ||
  iptables -I OUTPUT 1 -d 169.254.169.253 -j REJECT

! curl --silent --max-time 3 \
  --header Metadata:true \
  "http://169.254.169.254/metadata/instance?api-version=2021-02-01"
! curl --silent --max-time 3 \
  --header Metadata:true \
  "http://169.254.169.253/metadata/instance?api-version=2021-02-01"

work_dir=/tmp/azure-identity-arc-mi-matrix
rm -rf "$work_dir"
mkdir -p "$work_dir"
cd "$work_dir"

export IDENTITY_ARC_MODE="$mode"
export IDENTITY_ARC_SAMI_OBJECT_ID="$samiObjectId"
export IDENTITY_ARC_SAMI_CLIENT_ID="$samiClientId"
export IDENTITY_ARC_UAMI_OBJECT_ID="${uamiObjectId:-}"
export IDENTITY_ARC_UAMI_CLIENT_ID="${uamiClientId:-}"
export IDENTITY_ARC_UAMI_RESOURCE_ID="${uamiResourceId:-}"

curl --fail --silent --show-error --location "$packageUrl" --output azure-identity.tgz
curl --fail --silent --show-error --location "$testUrl" --output matrix.js
npm init --yes >/dev/null
npm install ./azure-identity.tgz --no-audit --no-fund >/dev/null

node matrix.js
