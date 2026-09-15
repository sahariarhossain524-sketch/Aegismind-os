#!/usr/bin/env bash
# AegisMind.OS - 1-Command Benchmark Runner for Judges
set -e

echo "=== Running AegisMind.OS Intel OpenVINO Benchmark Suite ==="
python3 benchmarks/benchmark_openvino.py || python benchmarks/benchmark_openvino.py
